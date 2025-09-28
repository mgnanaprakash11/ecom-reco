ALTER TABLE "order_charge_allocations" DROP CONSTRAINT "order_charge_allocations_charge_config_id_tenant_charge_configs";
--> statement-breakpoint
ALTER TABLE "order_charge_allocations" DROP CONSTRAINT "order_charge_allocations_upload_batch_id_data_upload_batches_id";
--> statement-breakpoint
ALTER TABLE "profitability_snapshots" DROP CONSTRAINT "profitability_snapshots_tenant_platform_id_tenant_platforms_id_";
--> statement-breakpoint
ALTER TABLE "profitability_snapshots" DROP CONSTRAINT "profitability_snapshots_reconciliation_run_id_reconciliation_ru";
--> statement-breakpoint
ALTER TABLE "reconciliation_runs" DROP CONSTRAINT "reconciliation_runs_data_upload_batch_id_data_upload_batches_id";
--> statement-breakpoint
ALTER TABLE "tenant_charge_tiers" DROP CONSTRAINT "tenant_charge_tiers_charge_config_id_tenant_charge_configs_id_f";
--> statement-breakpoint
ALTER TABLE "order_charge_allocations" ADD CONSTRAINT "order_charge_allocations_charge_config_id_tenant_charge_configs_id_fk" FOREIGN KEY ("charge_config_id") REFERENCES "public"."tenant_charge_configs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_charge_allocations" ADD CONSTRAINT "order_charge_allocations_upload_batch_id_data_upload_batches_id_fk" FOREIGN KEY ("upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profitability_snapshots" ADD CONSTRAINT "profitability_snapshots_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profitability_snapshots" ADD CONSTRAINT "profitability_snapshots_reconciliation_run_id_reconciliation_runs_id_fk" FOREIGN KEY ("reconciliation_run_id") REFERENCES "public"."reconciliation_runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_runs" ADD CONSTRAINT "reconciliation_runs_data_upload_batch_id_data_upload_batches_id_fk" FOREIGN KEY ("data_upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_charge_tiers" ADD CONSTRAINT "tenant_charge_tiers_charge_config_id_tenant_charge_configs_id_fk" FOREIGN KEY ("charge_config_id") REFERENCES "public"."tenant_charge_configs"("id") ON DELETE cascade ON UPDATE no action;