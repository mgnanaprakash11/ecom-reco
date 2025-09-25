import {
  pgSchema,
  uuid,
  jsonb,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { dataUploadBatches, tenants } from "./reconciliation.ts";

const raw = pgSchema("raw");

export const rawOrders = raw.table(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id, {
      onDelete: "cascade",
    }),
    dataUploadBatchId: uuid("data_upload_batch_id")
      .notNull()
      .references(() => dataUploadBatches.id, { onDelete: "cascade" }),
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
