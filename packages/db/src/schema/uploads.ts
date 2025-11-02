import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const orderUploads = pgTable("order_uploads", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  storeName: text("store_name"),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileChecksum: text("file_checksum"),
  notes: text("notes"),
  status: text("status").notNull().default("received"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type OrderUpload = typeof orderUploads.$inferSelect;
export type NewOrderUpload = typeof orderUploads.$inferInsert;
