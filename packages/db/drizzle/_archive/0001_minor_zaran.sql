CREATE SCHEMA IF NOT EXISTS "raw";
--> statement-breakpoint
CREATE TABLE "raw"."orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"data_upload_batch_id" uuid NOT NULL,
	"row_number" integer NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "raw"."orders" ADD CONSTRAINT "orders_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "raw"."orders" ADD CONSTRAINT "orders_data_upload_batch_id_data_upload_batches_id_fk" FOREIGN KEY ("data_upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "raw_orders_batch_row_idx" ON "raw"."orders" USING btree ("data_upload_batch_id","row_number");
