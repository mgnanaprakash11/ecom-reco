import {
  pgSchema,
  uuid,
  jsonb,
  integer,
  timestamp,
  index,
  text,
  bigint,
} from "drizzle-orm/pg-core";

import {
  dataUploadBatches,
  dataUploadStatusEnum,
  tenants,
} from "./reconciliation.ts";

const raw = pgSchema("raw");

export const rawOrders = raw.table(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id, {
      onDelete: "cascade",
      name: "orders_tenant_id_tenants_id_fk",
    }),
    dataUploadBatchId: uuid("data_upload_batch_id")
      .notNull()
      .references(() => dataUploadBatches.id, {
        onDelete: "cascade",
        name: "orders_data_upload_batch_id_data_upload_batches_id_fk",
      }),
    rowNumber: integer("row_number").notNull(),
    payload: jsonb("payload").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    batchRowIdx: index("raw_orders_batch_row_idx").on(
      table.dataUploadBatchId,
      table.rowNumber,
    ),
  }),
);

export const rawOrdersProcessingLogs = raw.table("orders_processing_logs", {
  dataUploadBatchId: uuid("data_upload_batch_id"),
  tenantId: uuid("tenant_id"),
  rowsLoaded: bigint("rows_loaded", { mode: "number" }),
  reportedRowCount: integer("reported_row_count"),
  status: dataUploadStatusEnum("status"),
  processingStartedAt: timestamp("processing_started_at", { withTimezone: true }),
  processingCompletedAt: timestamp("processing_completed_at", { withTimezone: true }),
  lastRowCreatedAt: timestamp("last_row_created_at", { withTimezone: true }),
  processedAt: timestamp("processed_at", { withTimezone: true }),
  dbtInvocationId: text("dbt_invocation_id"),
  triggeredBy: text("triggered_by"),
   errorMessage: text("error_message").default("none"),
  additionalInfo: jsonb("additional_info").$default(null),
});
