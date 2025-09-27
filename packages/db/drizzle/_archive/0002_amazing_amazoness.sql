CREATE SCHEMA IF NOT EXISTS "raw";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raw"."orders_processing_logs" (
	"data_upload_batch_id" uuid,
	"tenant_id" uuid,
	"rows_loaded" integer DEFAULT 0,
	"reported_row_count" integer DEFAULT 0,
	"status" text DEFAULT 'loaded',
	"processing_started_at" timestamp with time zone,
	"processing_completed_at" timestamp with time zone,
	"last_row_created_at" timestamp with time zone,
	"processed_at" timestamp with time zone DEFAULT now(),
	"dbt_invocation_id" text,
	"triggered_by" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "orders_processing_logs_batch_idx" ON "raw"."orders_processing_logs" ("data_upload_batch_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "orders_processing_logs_processed_at_idx" ON "raw"."orders_processing_logs" ("processed_at");
