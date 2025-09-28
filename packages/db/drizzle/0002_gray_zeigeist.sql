ALTER TABLE "raw"."orders_processing_logs" ALTER COLUMN "rows_loaded" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "raw"."orders_processing_logs" ALTER COLUMN "rows_loaded" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "raw"."orders_processing_logs" ALTER COLUMN "reported_row_count" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "raw"."orders_processing_logs" ALTER COLUMN "status" SET DATA TYPE "public"."data_upload_status" USING "status"::"public"."data_upload_status";--> statement-breakpoint
ALTER TABLE "raw"."orders_processing_logs" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "raw"."orders_processing_logs" ALTER COLUMN "processed_at" DROP DEFAULT;