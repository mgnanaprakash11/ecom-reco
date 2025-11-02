"use server";

import { createHash, randomUUID } from "crypto";

import { createClient as createSupabaseAuthClient } from "@/lib/supabase/server";
import { db, orderUploads } from "@repo/db";
import { createClient as createSupabaseServiceClient } from "@supabase/supabase-js";

export const ORDER_UPLOADS_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_UPLOADS_BUCKET ??
  process.env.SUPABASE_UPLOADS_BUCKET ??
  "order-uploads";

const STORAGE_BUCKET = ORDER_UPLOADS_BUCKET;

export type UploadState = {
  status: "idle" | "success" | "error";
  message?: string;
  fileName?: string;
};

function createServiceRoleClient() {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SECRET_OR_SERVICE_ROLE_KEY ??
    "";

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase service credentials are missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
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
      return { status: "error", message: "Only .csv files are supported." };
    }

    const supabase = await createSupabaseAuthClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { status: "error", message: "You must be signed in to upload files." };
    }

    const storeNameInput = formData.get("storeName");
    const storeName =
      typeof storeNameInput === "string" && storeNameInput.trim().length > 0
        ? storeNameInput.trim()
        : null;

    const notesInput = formData.get("notes");
    const notes =
      typeof notesInput === "string" && notesInput.trim().length > 0
        ? notesInput.trim()
        : null;

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const checksum = createHash("sha256").update(fileBuffer).digest("hex");

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const objectPath = `${user.id}/${timestamp}-${randomUUID()}-${safeName}`;

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
        message: "Failed to upload file to storage. Please retry.",
      };
    }

    const uploadId = randomUUID();

    await db.insert(orderUploads).values({
      id: uploadId,
      userId: user.id,
      storeName,
      fileName: file.name,
      filePath: objectPath,
      fileChecksum: checksum,
      notes,
      status: "received",
      metadata: {
        size: file.size,
        contentType: file.type || "text/csv",
        bucket: STORAGE_BUCKET,
      },
    });

    return {
      status: "success",
      message: "Upload received successfully.",
      fileName: file.name,
    };
  } catch (error) {
    console.error("[uploadOrdersCsv] unexpected error", error);

    if (
      error instanceof Error &&
      error.message.includes("Supabase service credentials")
    ) {
      return {
        status: "error",
        message:
          "Supabase service credentials are missing. Ask an administrator to configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      };
    }

    return {
      status: "error",
      message: "Unexpected error while uploading. Please retry.",
    };
  }
}
