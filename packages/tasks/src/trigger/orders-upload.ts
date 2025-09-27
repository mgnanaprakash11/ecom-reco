import { task } from "@trigger.dev/sdk";
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";

import { dataUploadBatches, rawOrders } from "@repo/db/schema";

const GITHUB_API_URL = process.env.GITHUB_API_URL ?? "https://api.github.com";
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const GITHUB_WORKFLOW = process.env.GITHUB_DBT_WORKFLOW ?? "run-dbt.yml";
const GITHUB_WORKFLOW_REF =
  process.env.GITHUB_DBT_WORKFLOW_REF ?? process.env.GITHUB_REF ?? "main";
const GITHUB_TOKEN = process.env.GITHUB_ACTIONS_TOKEN ?? process.env.GITHUB_TOKEN;

const CHUNK_SIZE = 500;

function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to process uploads.");
  }

  const sql = postgres(databaseUrl, { prepare: false });
  return drizzle(sql);
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

type GithubWorkflowDispatchInput = {
  tenantId: string;
  dataUploadBatchId: string;
  fileName: string;
  rowCount: number;
};

type GithubWorkflowMetadata = {
  repository: string;
  workflow: string;
  ref: string;
  dispatchedAt: string;
  inputs: Record<string, string>;
};

function assertGithubConfig() {
  if (!GITHUB_REPOSITORY) {
    throw new Error(
      "GITHUB_REPOSITORY is required (format: owner/repo) to dispatch dbt workflow.",
    );
  }

  if (!GITHUB_TOKEN) {
    throw new Error(
      "GITHUB_ACTIONS_TOKEN (or GITHUB_TOKEN) is required to call GitHub API.",
    );
  }
}

async function dispatchGithubWorkflow(
  input: GithubWorkflowDispatchInput,
): Promise<GithubWorkflowMetadata> {
  assertGithubConfig();

  const dispatchedAt = new Date().toISOString();
  const inputs = {
    batch_id: input.dataUploadBatchId,
    tenant_id: input.tenantId,
    file_name: input.fileName,
    row_count: input.rowCount.toString(),
    dispatched_at: dispatchedAt,
  } satisfies Record<string, string>;

  const url = `${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/actions/workflows/${GITHUB_WORKFLOW}/dispatches`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "ecom-reco-trigger-worker",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      ref: GITHUB_WORKFLOW_REF,
      inputs,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `GitHub workflow dispatch failed (${response.status} ${response.statusText}): ${errorText}`,
    );
  }

  return {
    repository: GITHUB_REPOSITORY!,
    workflow: GITHUB_WORKFLOW,
    ref: GITHUB_WORKFLOW_REF,
    dispatchedAt,
    inputs,
  } satisfies GithubWorkflowMetadata;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let currentField = "";
  let currentRow: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === "\"") {
      if (inQuotes && text[i + 1] === "\"") {
        currentField += "\"";
        i += 1;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      currentRow.push(currentField);
      currentField = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && text[i + 1] === "\n") {
        i += 1;
      }
      currentRow.push(currentField);
      rows.push(currentRow);
      currentRow = [];
      currentField = "";
      continue;
    }

    currentField += char;
  }

  currentRow.push(currentField);
  rows.push(currentRow);

  return rows.filter((row) =>
    row.some((cell) => cell.trim().length > 0),
  );
}

type OrdersUploadPayload = {
  tenantId: string;
  dataUploadBatchId: string;
  bucket: string;
  filePath: string;
  fileName: string;
};

export const processOrdersUploadTask = task({
  id: "process-orders-upload",
  run: async (payload: OrdersUploadPayload) => {
    const startedAt = new Date();

    console.log("[process-orders-upload] starting", {
      batchId: payload.dataUploadBatchId,
      tenantId: payload.tenantId,
      fileName: payload.fileName,
    });

    const db = getDb();

    await db
      .update(dataUploadBatches)
      .set({ status: "parsing", processingStartedAt: startedAt })
      .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));

    const supabase = getSupabaseClient();

    try {
      const { data, error } = await supabase.storage
        .from(payload.bucket)
        .download(payload.filePath);

      if (error || !data) {
        throw error ?? new Error("Failed to download CSV file from storage.");
      }

      const csvBuffer = Buffer.from(await data.arrayBuffer());
      const csvText = csvBuffer.toString("utf-8");

      const matrix = parseCsv(csvText);

      if (matrix.length === 0) {
        await db
          .update(dataUploadBatches)
          .set({
            status: "failed",
            notes: "CSV file is empty or missing header row.",
            processingCompletedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));

        return {
          rowsInserted: 0,
          batchId: payload.dataUploadBatchId,
          fileName: payload.fileName,
        };
      }

      const [headerRow, ...dataRows] = matrix as [string[], ...string[][]];
      const headers = headerRow.map((cell, index) => {
        const trimmed = cell.trim();
        return trimmed.length > 0 ? trimmed : `column_${index + 1}`;
      });

      const records = dataRows.map((row) => {
        const record: Record<string, string> = {};
        headers.forEach((header, index) => {
          record[header] = (row[index] ?? "").trim();
        });
        return record;
      });

      const rows = records.map((record, index) => ({
        tenantId: payload.tenantId,
        dataUploadBatchId: payload.dataUploadBatchId,
        rowNumber: index + 1,
        payload: record,
      }));

      // Replace any existing rows for idempotency
      await db
        .delete(rawOrders)
        .where(eq(rawOrders.dataUploadBatchId, payload.dataUploadBatchId));

      for (const chunk of chunkArray(rows, CHUNK_SIZE)) {
        await db.insert(rawOrders).values(chunk);
      }

      const finishedAt = new Date();

      console.log("[process-orders-upload] csv parsed", {
        batchId: payload.dataUploadBatchId,
        rowsInserted: rows.length,
      });

      await db
        .update(dataUploadBatches)
        .set({
          status: "loaded",
          rowCount: rows.length,
          processingCompletedAt: finishedAt,
          updatedAt: finishedAt,
        })
        .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));

      try {
        const workflowUpdatedAt = new Date();
        const workflowMeta = await dispatchGithubWorkflow({
          tenantId: payload.tenantId,
          dataUploadBatchId: payload.dataUploadBatchId,
          fileName: payload.fileName,
          rowCount: rows.length,
        });

        console.log("[process-orders-upload] workflow dispatched", workflowMeta);

        await db
          .update(dataUploadBatches)
          .set({
            status: "processing",
            metadata: {
              githubWorkflow: workflowMeta,
            },
            updatedAt: workflowUpdatedAt,
          })
          .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));
      } catch (error) {
        const message =
          error instanceof Error && error.message
            ? error.message
            : "Failed to dispatch GitHub workflow.";

        await db
          .update(dataUploadBatches)
          .set({ status: "failed", notes: message, updatedAt: new Date() })
          .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));

        throw error;
      }

      return {
        rowsInserted: rows.length,
        batchId: payload.dataUploadBatchId,
        fileName: payload.fileName,
      };
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Unhandled error while processing upload.";

      console.error("[process-orders-upload] failed", {
        batchId: payload.dataUploadBatchId,
        tenantId: payload.tenantId,
        error: message,
      });

      await db
        .update(dataUploadBatches)
        .set({ status: "failed", notes: message })
        .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));

      throw error;
    }
  },
});
