import { task } from "@trigger.dev/sdk";
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";

import { dataUploadBatches, rawOrders } from "@repo/db/schema";

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

      await db
        .update(dataUploadBatches)
        .set({
          status: "loaded",
          rowCount: rows.length,
          processingCompletedAt: finishedAt,
          updatedAt: finishedAt,
        })
        .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));

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

      await db
        .update(dataUploadBatches)
        .set({ status: "failed", notes: message })
        .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));

      throw error;
    }
  },
});
