CREATE SCHEMA IF NOT EXISTS "raw";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raw"."orders" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "tenant_id" uuid NOT NULL,
    "data_upload_batch_id" uuid NOT NULL,
    "row_number" integer NOT NULL,
    "payload" jsonb NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "raw"."orders"
  ADD CONSTRAINT IF NOT EXISTS "raw_orders_tenant_fk"
  FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade;
--> statement-breakpoint
ALTER TABLE "raw"."orders"
  ADD CONSTRAINT IF NOT EXISTS "raw_orders_batch_fk"
  FOREIGN KEY ("data_upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE cascade;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "raw_orders_batch_row_idx"
  ON "raw"."orders" ("data_upload_batch_id", "row_number");
