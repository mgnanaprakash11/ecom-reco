"use server";

import { createHash, randomUUID } from "crypto";
import { createClient as createSupabaseAuthClient } from "@/lib/supabase/server";
import { db, eq, schema } from "@repo/db";
import { createClient as createSupabaseServiceClient } from "@supabase/supabase-js";
import { start } from "workflow/api";

import { processOrdersWorkflow } from "@/app/workflows/process-orders";
import type { OrdersUploadPayload } from "@/lib/workflows/process-orders-upload";

const STORAGE_BUCKET = "reco-uploads";

export type UploadState = {
  status: "idle" | "success" | "error";
  message?: string;
  fileName?: string;
};

function createServiceRoleClient() {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const serviceKey =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SECRET_OR_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    "";

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase service role credentials are not configured. Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SECRET_KEY.",
    );
  }

  return createSupabaseServiceClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function uploadOrdersCsv(
  _prev: UploadState,
  formData: FormData,
): Promise<UploadState> {
  try {
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return { status: "error", message: "Please choose a CSV file to upload." };
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      return { status: "error", message: "Only .csv files are supported right now." };
    }

    const supabase = await createSupabaseAuthClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { status: "error", message: "You must be signed in to upload files." };
    }

    const membership = await db.query.tenantMembers.findFirst({
      columns: { tenantId: true },
      where: (tenantMembers, { eq }) => eq(tenantMembers.userId, user.id),
    });

    if (!membership) {
      return {
        status: "error",
        message: "No tenant membership found for your account. Contact an administrator to be granted access.",
      };
    }

    const tenantPlatformIdValue = formData.get("tenantPlatformId");
    let tenantPlatformId: string | null = null;

    if (tenantPlatformIdValue && typeof tenantPlatformIdValue === "string") {
      const platform = await db.query.tenantPlatforms.findFirst({
        columns: { id: true },
        where: (tenantPlatforms, { eq, and }) =>
          and(
            eq(tenantPlatforms.id, tenantPlatformIdValue),
            eq(tenantPlatforms.tenantId, membership.tenantId),
          ),
      });

      if (!platform) {
        return {
          status: "error",
          message: "Invalid platform selection.",
        };
      }

      tenantPlatformId = platform.id;
    }

    const notesValue = formData.get("notes");
    const notes = typeof notesValue === "string" && notesValue.trim().length > 0 ? notesValue.trim() : null;

    // Convert file to buffer once to avoid ArrayBuffer detachment issues
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const checksum = createHash("sha256").update(fileBuffer).digest("hex");

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const objectPath = `${membership.tenantId}/${timestamp}-${randomUUID()}-${safeName}`;

    const serviceClient = createServiceRoleClient();

    const { error: uploadError } = await serviceClient.storage
      .from(STORAGE_BUCKET)
      .upload(objectPath, fileBuffer, {
        cacheControl: "3600",
        contentType: file.type || "text/csv",
        upsert: false,
      });

    if (uploadError) {
      console.error("[uploadOrdersCsv] storage upload failed", uploadError);
      return {
        status: "error",
        message: "Failed to upload file. Please try again.",
      };
    }

    const batchId = randomUUID();

    await db
      .insert(schema.dataUploadBatches)
      .values({
        id: batchId,
        tenantId: membership.tenantId,
        tenantPlatformId,
        dataType: "orders",
        source: "manual_csv",
        status: "received",
        fileName: file.name,
        filePath: objectPath,
        fileChecksum: checksum,
        rawPayload: {
          size: file.size,
          contentType: file.type || "text/csv",
          originalName: file.name,
        },
        notes,
        metadata: null,
        sourceMetadata: { bucket: STORAGE_BUCKET },
        createdBy: user.id,
      });

    const payload: OrdersUploadPayload = {
      tenantId: membership.tenantId,
      dataUploadBatchId: batchId,
      bucket: STORAGE_BUCKET,
      filePath: objectPath,
      fileName: file.name,
      fileBase64:
        !process.env.VERCEL && process.env.NODE_ENV !== "production"
          ? fileBuffer.toString("base64")
          : undefined,
    };

    try {
      await start(processOrdersWorkflow, [payload]);
    } catch (workflowError) {
      console.error("[uploadOrdersCsv] failed to process/orders workflow", workflowError);

      const workflowMessage =
        workflowError instanceof Error && workflowError.message
          ? workflowError.message
          : "Workflow processing failed";

      await db
        .update(schema.dataUploadBatches)
        .set({ status: "failed", notes: workflowMessage })
        .where(eq(schema.dataUploadBatches.id, batchId));

      return {
        status: "error",
        message:
          "Upload saved but processing failed. Check server logs for details and retry.",
      };
    }

    return {
      status: "success",
      message: "Upload received successfully.",
      fileName: file.name,
    };
  } catch (error) {
    console.error("[uploadOrdersCsv] unexpected error", error);
    if (error instanceof Error && error.message.includes("Supabase service role credentials")) {
      return {
        status: "error",
        message:
          "Upload service is misconfigured. Contact support to set SUPABASE_URL and SUPABASE_SECRET_KEY.",
      };
    }

    return {
      status: "error",
      message: "Unexpected error while uploading. Please retry.",
    };
  }
}
