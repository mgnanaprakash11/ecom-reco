import { createClient } from "@supabase/supabase-js";

import { db as sharedDb, eq } from "@repo/db";
import { dataUploadBatches, rawOrders, rawShopifyOrders } from "@repo/db/schema";

const GITHUB_API_URL = process.env.GITHUB_API_URL ?? "https://api.github.com";
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const GITHUB_WORKFLOW = process.env.GITHUB_DBT_WORKFLOW ?? "run-dbt.yml";
const GITHUB_WORKFLOW_REF =
  process.env.GITHUB_DBT_WORKFLOW_REF ?? process.env.GITHUB_REF ?? "main";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? process.env.GITHUB_ACTIONS_TOKEN;

const CHUNK_SIZE = 500;

const SHOPIFY_HEADER_NORMALIZER = (value: string) => value.trim().toLowerCase();

export const SHOPIFY_ORDER_HEADERS = [
  "Name",
  "Email",
  "Financial Status",
  "Paid at",
  "Fulfillment Status",
  "Fulfilled at",
  "Accepts Marketing",
  "Currency",
  "Subtotal",
  "Shipping",
  "Taxes",
  "Total",
  "Discount Code",
  "Discount Amount",
  "Shipping Method",
  "Created at",
  "Lineitem quantity",
  "Lineitem name",
  "Lineitem price",
  "Lineitem compare at price",
  "Lineitem sku",
  "Lineitem requires shipping",
  "Lineitem taxable",
  "Lineitem fulfillment status",
  "Billing Name",
  "Billing Street",
  "Billing Address1",
  "Billing Address2",
  "Billing Company",
  "Billing City",
  "Billing Zip",
  "Billing Province",
  "Billing Country",
  "Billing Phone",
  "Shipping Name",
  "Shipping Street",
  "Shipping Address1",
  "Shipping Address2",
  "Shipping Company",
  "Shipping City",
  "Shipping Zip",
  "Shipping Province",
  "Shipping Country",
  "Shipping Phone",
  "Notes",
  "Note Attributes",
  "Cancelled at",
  "Payment Method",
  "Payment Reference",
  "Refunded Amount",
  "Vendor",
  "Outstanding Balance",
  "Employee",
  "Location",
  "Device ID",
  "Id",
  "Tags",
  "Risk Level",
  "Source",
  "Lineitem discount",
  "Tax 1 Name",
  "Tax 1 Value",
  "Tax 2 Name",
  "Tax 2 Value",
  "Tax 3 Name",
  "Tax 3 Value",
  "Tax 4 Name",
  "Tax 4 Value",
  "Tax 5 Name",
  "Tax 5 Value",
  "Phone",
  "Receipt Number",
  "Duties",
  "Billing Province Name",
  "Shipping Province Name",
  "Payment ID",
  "Payment Terms Name",
  "Next Payment Due At",
  "Payment References",
] as const;

type ShopifyOrderHeader = (typeof SHOPIFY_ORDER_HEADERS)[number];

type RawShopifyOrderInsert = typeof rawShopifyOrders.$inferInsert;

const SHOPIFY_ORDER_HEADER_MAP: Record<
  ShopifyOrderHeader,
  keyof RawShopifyOrderInsert
> = {
  Name: "name",
  Email: "email",
  "Financial Status": "financialStatus",
  "Paid at": "paidAt",
  "Fulfillment Status": "fulfillmentStatus",
  "Fulfilled at": "fulfilledAt",
  "Accepts Marketing": "acceptsMarketing",
  Currency: "currency",
  Subtotal: "subtotal",
  Shipping: "shipping",
  Taxes: "taxes",
  Total: "total",
  "Discount Code": "discountCode",
  "Discount Amount": "discountAmount",
  "Shipping Method": "shippingMethod",
  "Created at": "orderCreatedAt",
  "Lineitem quantity": "lineitemQuantity",
  "Lineitem name": "lineitemName",
  "Lineitem price": "lineitemPrice",
  "Lineitem compare at price": "lineitemCompareAtPrice",
  "Lineitem sku": "lineitemSku",
  "Lineitem requires shipping": "lineitemRequiresShipping",
  "Lineitem taxable": "lineitemTaxable",
  "Lineitem fulfillment status": "lineitemFulfillmentStatus",
  "Billing Name": "billingName",
  "Billing Street": "billingStreet",
  "Billing Address1": "billingAddress1",
  "Billing Address2": "billingAddress2",
  "Billing Company": "billingCompany",
  "Billing City": "billingCity",
  "Billing Zip": "billingZip",
  "Billing Province": "billingProvince",
  "Billing Country": "billingCountry",
  "Billing Phone": "billingPhone",
  "Shipping Name": "shippingName",
  "Shipping Street": "shippingStreet",
  "Shipping Address1": "shippingAddress1",
  "Shipping Address2": "shippingAddress2",
  "Shipping Company": "shippingCompany",
  "Shipping City": "shippingCity",
  "Shipping Zip": "shippingZip",
  "Shipping Province": "shippingProvince",
  "Shipping Country": "shippingCountry",
  "Shipping Phone": "shippingPhone",
  Notes: "notes",
  "Note Attributes": "noteAttributes",
  "Cancelled at": "cancelledAt",
  "Payment Method": "paymentMethod",
  "Payment Reference": "paymentReference",
  "Refunded Amount": "refundedAmount",
  Vendor: "vendor",
  "Outstanding Balance": "outstandingBalance",
  Employee: "employee",
  Location: "location",
  "Device ID": "deviceId",
  Id: "shopifyOrderId",
  Tags: "tags",
  "Risk Level": "riskLevel",
  Source: "source",
  "Lineitem discount": "lineitemDiscount",
  "Tax 1 Name": "tax1Name",
  "Tax 1 Value": "tax1Value",
  "Tax 2 Name": "tax2Name",
  "Tax 2 Value": "tax2Value",
  "Tax 3 Name": "tax3Name",
  "Tax 3 Value": "tax3Value",
  "Tax 4 Name": "tax4Name",
  "Tax 4 Value": "tax4Value",
  "Tax 5 Name": "tax5Name",
  "Tax 5 Value": "tax5Value",
  Phone: "phone",
  "Receipt Number": "receiptNumber",
  Duties: "duties",
  "Billing Province Name": "billingProvinceName",
  "Shipping Province Name": "shippingProvinceName",
  "Payment ID": "paymentId",
  "Payment Terms Name": "paymentTermsName",
  "Next Payment Due At": "nextPaymentDueAt",
  "Payment References": "paymentReferences",
};

export type OrdersUploadPayload = {
  tenantId: string;
  dataUploadBatchId: string;
  bucket: string;
  filePath: string;
  fileName: string;
  fileBase64?: string;
};

export type ProcessOrdersUploadResult = {
  rowsInserted: number;
  shopifyRowsInserted: number;
  batchId: string;
  fileName: string;
};

const SHOPIFY_HEADER_MIN_MATCH_RATIO = 0.9;

export function isShopifyOrdersHeaders(headers: string[]): boolean {
  if (headers.length === 0) {
    return false;
  }

  const normalizedIncoming = headers.map(SHOPIFY_HEADER_NORMALIZER);
  const incomingSet = new Set(normalizedIncoming);

  const matches = SHOPIFY_ORDER_HEADERS.filter((expected) =>
    incomingSet.has(SHOPIFY_HEADER_NORMALIZER(expected)),
  );

  const matchRatio = matches.length / SHOPIFY_ORDER_HEADERS.length;

  return matchRatio >= SHOPIFY_HEADER_MIN_MATCH_RATIO;
}

function getDb() {
  // Use the shared database instance from @repo/db to avoid version conflicts
  return sharedDb;
}

function getSupabaseClient() {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const serviceKey =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SECRET_OR_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    "";

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase credentials. Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SECRET_KEY.",
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
      "User-Agent": "ecom-reco-workflows",
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

export async function processOrdersUpload(
  payload: OrdersUploadPayload,
): Promise<ProcessOrdersUploadResult> {
  console.info(
    "[processOrdersUpload:start]",
    JSON.stringify({
      batchId: payload.dataUploadBatchId,
      hasInlineBuffer: Boolean(payload.fileBase64),
      bucket: payload.bucket,
      filePath: payload.filePath,
    }),
  );
  const startedAt = new Date();
  const db = getDb();

  await db
    .update(dataUploadBatches)
    .set({ status: "parsing", processingStartedAt: startedAt })
    .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));
  const supabase = payload.fileBase64 ? null : getSupabaseClient();

  try {
    let csvBuffer: Buffer;

    if (payload.fileBase64) {
      csvBuffer = Buffer.from(payload.fileBase64, "base64");
      console.info(
        "[processOrdersUpload] using inline buffer",
        payload.dataUploadBatchId,
        csvBuffer.byteLength,
      );
    } else {
      const { data, error } = await supabase!
        .storage.from(payload.bucket)
        .download(payload.filePath);

      if (error || !data) {
        console.error(
          "[processOrdersUpload] download failed",
          payload.dataUploadBatchId,
          error,
        );
        throw error ?? new Error("Failed to download CSV file from storage.");
      }

      const arrayBuffer = await data.arrayBuffer();
      console.info(
        "[processOrdersUpload] downloaded buffer",
        payload.dataUploadBatchId,
        arrayBuffer.byteLength,
      );
      csvBuffer = Buffer.from(arrayBuffer);
    }
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
        shopifyRowsInserted: 0,
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

    let shopifyRowsInserted = 0;

    const normalizedHeaderLookup = new Map(
      headers.map((header) => [
        SHOPIFY_HEADER_NORMALIZER(header),
        header,
      ] as const),
    );

    if (isShopifyOrdersHeaders(headers)) {
      const shopifyRows: RawShopifyOrderInsert[] = records.map((record, index) => {
        const base: RawShopifyOrderInsert = {
          tenantId: payload.tenantId,
          dataUploadBatchId: payload.dataUploadBatchId,
          rowNumber: index + 1,
        };

        for (const header of SHOPIFY_ORDER_HEADERS) {
          const column = SHOPIFY_ORDER_HEADER_MAP[header];
          const sourceKey = normalizedHeaderLookup.get(
            SHOPIFY_HEADER_NORMALIZER(header),
          );
          const value = sourceKey ? record[sourceKey] : undefined;
          (base as Record<string, unknown>)[column] =
            value && value.length > 0 ? value : null;
        }

        return base;
      });

      await db
        .delete(rawShopifyOrders)
        .where(eq(rawShopifyOrders.dataUploadBatchId, payload.dataUploadBatchId));

      for (const chunk of chunkArray(shopifyRows, CHUNK_SIZE)) {
        await db.insert(rawShopifyOrders).values(chunk);
      }

      shopifyRowsInserted = shopifyRows.length;
    }

    const rows = records.map((record, index) => ({
      tenantId: payload.tenantId,
      dataUploadBatchId: payload.dataUploadBatchId,
      rowNumber: index + 1,
      payload: record,
    }));

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

    const shouldDispatchGithub = GITHUB_REPOSITORY && GITHUB_TOKEN;

    if (shouldDispatchGithub) {
      try {
        const workflowUpdatedAt = new Date();
        const workflowMeta = await dispatchGithubWorkflow({
          tenantId: payload.tenantId,
          dataUploadBatchId: payload.dataUploadBatchId,
          fileName: payload.fileName,
          rowCount: rows.length,
        });

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
          .set({
            status: "failed",
            notes: message,
            updatedAt: new Date(),
          })
          .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));

        throw error;
      }
    } else {
      await db
        .update(dataUploadBatches)
        .set({
          status: "loaded",
          metadata: {
            githubWorkflow: null,
          },
          updatedAt: new Date(),
        })
        .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));
    }

    console.info(
      "[processOrdersUpload] rows loaded",
      payload.dataUploadBatchId,
      rows.length,
      shopifyRowsInserted,
    );

    return {
      rowsInserted: rows.length,
      shopifyRowsInserted,
      batchId: payload.dataUploadBatchId,
      fileName: payload.fileName,
    };
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Unhandled error while processing upload.";

    console.error(
      "[processOrdersUpload] error",
      payload.dataUploadBatchId,
      message,
      error,
    );

    await db
      .update(dataUploadBatches)
      .set({ status: "failed", notes: message })
      .where(eq(dataUploadBatches.id, payload.dataUploadBatchId));

    throw error;
  }
}
