-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."allocation_status" AS ENUM('pending', 'unallocated', 'allocated', 'partially_allocated', 'disputed', 'released');--> statement-breakpoint
CREATE TYPE "public"."charge_calculation_method" AS ENUM('percentage', 'flat', 'slab', 'tiered', 'hybrid');--> statement-breakpoint
CREATE TYPE "public"."charge_scope" AS ENUM('order', 'item', 'shipment', 'payout', 'payment');--> statement-breakpoint
CREATE TYPE "public"."charge_type" AS ENUM('commission', 'referral_fee', 'closing_fee', 'collection_fee', 'payment_gateway_fee', 'cod_fee', 'shipping_fee', 'logistics_fee', 'fulfillment_fee', 'storage_fee', 'pick_pack_fee', 'advertising_fee', 'promotion_fee', 'return_processing_fee', 'reverse_logistics_fee', 'cancellation_fee', 'penalty_fee', 'gst', 'tcs', 'tds', 'discount_subsidy', 'coupon_subsidy', 'packaging_cost', 'cogs', 'support_fee', 'settlement_adjustment', 'other');--> statement-breakpoint
CREATE TYPE "public"."claim_status" AS ENUM('draft', 'filed', 'approved', 'rejected', 'partial', 'expired');--> statement-breakpoint
CREATE TYPE "public"."claim_type" AS ENUM('safe_t', 'penalty_appeal', 'lost_in_transit', 'qc_damage', 'other');--> statement-breakpoint
CREATE TYPE "public"."cost_type" AS ENUM('advertising', 'shipping', 'logistics', 'freight_inward', 'freight_outward', 'cogs', 'manufacturing', 'packaging', 'commission', 'payment_gateway', 'cod', 'return_processing', 'reverse_logistics', 'penalty', 'gst', 'tcs', 'tds', 'discount', 'coupon', 'promotion', 'marketing', 'storage', 'collection_fee', 'closing_fee', 'fulfillment_fee', 'settlement_adjustment', 'salary', 'overhead', 'other');--> statement-breakpoint
CREATE TYPE "public"."data_upload_source" AS ENUM('manual', 'manual_csv', 'api', 'platform_api', 'sftp', 'integration', 's3_webhook', 'scheduled', 'other');--> statement-breakpoint
CREATE TYPE "public"."data_upload_status" AS ENUM('pending', 'received', 'parsing', 'processing', 'parsed', 'loaded', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."data_upload_type" AS ENUM('orders', 'order_items', 'payments', 'returns', 'charges', 'settlements', 'rate_cards', 'ads', 'inventory', 'costs', 'other');--> statement-breakpoint
CREATE TYPE "public"."financial_source" AS ENUM('calculated', 'manual', 'platform_feed', 'reconciliation', 'import');--> statement-breakpoint
CREATE TYPE "public"."fulfillment_channel" AS ENUM('fba', 'easy_ship', 'seller_fulfilled', 'flipkart_smart', 'third_party', 'self_ship', 'fbf', 'other');--> statement-breakpoint
CREATE TYPE "public"."fulfillment_status" AS ENUM('unfulfilled', 'partially_fulfilled', 'fulfilled', 'returned', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."ledger_entry_type" AS ENUM('order', 'sale', 'refund', 'fee', 'tax', 'tax_withholding', 'adjustment', 'promotion', 'payout', 'cost', 'other');--> statement-breakpoint
CREATE TYPE "public"."logi_dispute_status" AS ENUM('open', 'approved', 'rejected', 'partial', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."logi_dispute_type" AS ENUM('weight', 'rto', 'ndr', 'damage', 'lost', 'other');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('created', 'pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled', 'returned', 'partial');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('prepaid', 'cod', 'upi', 'net_banking', 'netbanking', 'card', 'wallet', 'other');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'processing', 'captured', 'settled', 'refunded', 'chargeback', 'failed', 'disputed', 'on_hold');--> statement-breakpoint
CREATE TYPE "public"."payout_schedule" AS ENUM('daily', 't_plus_2', 'weekly', 'fortnightly', 'monthly', 'adhoc', 'other');--> statement-breakpoint
CREATE TYPE "public"."pg_dispute_status" AS ENUM('open', 'won', 'lost', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."promotion_source" AS ENUM('seller', 'platform', 'shared');--> statement-breakpoint
CREATE TYPE "public"."reconciliation_reason" AS ENUM('commission_mismatch', 'fee_missing', 'tax_difference', 'fee_change', 'policy_change', 'data_missing', 'return_pending', 'payment_delay', 'rounding', 'other');--> statement-breakpoint
CREATE TYPE "public"."reconciliation_status" AS ENUM('matched', 'unmatched', 'reconciled', 'unreconciled', 'partial', 'manual_review', 'overpaid', 'underpaid', 'mismatch');--> statement-breakpoint
CREATE TYPE "public"."return_reason" AS ENUM('damaged', 'defective', 'wrong_item', 'customer_remorse', 'size_issue', 'quality_issue', 'delivery_failed', 'undelivered', 'address_issue', 'other');--> statement-breakpoint
CREATE TYPE "public"."return_status" AS ENUM('initiated', 'pickup_scheduled', 'in_transit', 'warehouse_received', 'received', 'qc_passed', 'qc_failed', 'approved', 'rejected', 'completed', 'refunded', 'closed');--> statement-breakpoint
CREATE TYPE "public"."return_type" AS ENUM('customer_return', 'rto', 'ndr', 'replacement', 'cancellation', 'other');--> statement-breakpoint
CREATE TYPE "public"."shipping_zone" AS ENUM('local', 'zonal', 'national', 'international', 'special');--> statement-breakpoint
CREATE TYPE "public"."stat_credit_type" AS ENUM('tcs_gst', 'tds_194o', 'other');--> statement-breakpoint
CREATE TYPE "public"."tax_section" AS ENUM('none', '194o', '206c1h', 'sec_52_tcs', 'sec_194o_tds', 'other');--> statement-breakpoint
CREATE TYPE "public"."tenant_platform_status" AS ENUM('draft', 'active', 'inactive', 'disabled');--> statement-breakpoint
CREATE TYPE "public"."tenant_status" AS ENUM('active', 'inactive', 'suspended', 'closed');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('owner', 'admin', 'analyst', 'viewer', 'member');--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"price_cents" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "data_upload_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_platform_id" uuid,
	"data_type" "data_upload_type" NOT NULL,
	"source" "data_upload_source" DEFAULT 'manual' NOT NULL,
	"status" "data_upload_status" DEFAULT 'pending' NOT NULL,
	"file_name" varchar(256) NOT NULL,
	"file_path" varchar(512),
	"file_checksum" varchar(256),
	"row_count" integer,
	"version" integer DEFAULT 1 NOT NULL,
	"raw_payload" jsonb,
	"notes" text,
	"metadata" jsonb,
	"source_metadata" jsonb,
	"processing_started_at" timestamp with time zone,
	"processing_completed_at" timestamp with time zone,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cost_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"order_id" uuid,
	"order_item_id" uuid,
	"payment_id" uuid,
	"order_return_id" uuid,
	"cost_type" "cost_type" NOT NULL,
	"amount" numeric(14, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"incurred_at" timestamp with time zone,
	"source" "financial_source" DEFAULT 'manual' NOT NULL,
	"charge_config_id" uuid,
	"upload_batch_id" uuid,
	"metadata" jsonb,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_charge_allocations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"charge_type" charge_type NOT NULL,
	"amount" numeric(14, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"source" "financial_source" DEFAULT 'calculated' NOT NULL,
	"charge_config_id" uuid,
	"upload_batch_id" uuid,
	"promotion_source" "promotion_source",
	"notes" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_adjustments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payment_id" uuid NOT NULL,
	"charge_type" charge_type NOT NULL,
	"amount" numeric(14, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"withholding_reference" varchar(128),
	"tax_section" "tax_section",
	"withholding_rate" numeric(7, 4),
	"is_tax_remitted" boolean DEFAULT false NOT NULL,
	"tax_remitted_at" timestamp with time zone,
	"filing_period" varchar(16),
	"tax_amount" numeric(14, 2) DEFAULT '0',
	"description" text,
	"raw_payload" jsonb,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_platform_id" uuid NOT NULL,
	"upload_batch_id" uuid,
	"payment_reference" varchar(128) NOT NULL,
	"settlement_reference" varchar(128),
	"payment_status" "payment_status" NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"payment_type" varchar(64),
	"payment_date" timestamp with time zone NOT NULL,
	"payout_date" timestamp with time zone,
	"settlement_period_start" timestamp with time zone,
	"settlement_period_end" timestamp with time zone,
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"gross_amount" numeric(14, 2) NOT NULL,
	"gross_settlement_amount" numeric(14, 2),
	"fee_amount" numeric(14, 2) DEFAULT '0',
	"tax_amount" numeric(14, 2) DEFAULT '0',
	"tcs_amount" numeric(14, 2) DEFAULT '0',
	"tds_amount" numeric(14, 2) DEFAULT '0',
	"adjustment_amount" numeric(14, 2) DEFAULT '0',
	"other_adjustments" numeric(14, 2) DEFAULT '0',
	"net_amount" numeric(14, 2) NOT NULL,
	"utr_number" varchar(64),
	"payout_batch_id" varchar(128),
	"payout_schedule" "payout_schedule",
	"payout_scheduled_date" timestamp with time zone,
	"bank_account_id" varchar(128),
	"bank_name" varchar(128),
	"ifsc_code" varchar(16),
	"account_number_last4" varchar(8),
	"metadata" jsonb,
	"raw_payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ledger_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_platform_id" uuid,
	"upload_batch_id" uuid,
	"order_id" uuid,
	"order_return_id" uuid,
	"payment_id" uuid,
	"entry_type" "ledger_entry_type" NOT NULL,
	"tax_section" "tax_section" DEFAULT 'none' NOT NULL,
	"source" "financial_source" DEFAULT 'import' NOT NULL,
	"is_credit" boolean DEFAULT true NOT NULL,
	"transaction_date" timestamp with time zone NOT NULL,
	"reference_number" varchar(128),
	"description" text,
	"amount" numeric(14, 2) NOT NULL,
	"tax_amount" numeric(14, 2) DEFAULT '0',
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"metadata" jsonb,
	"raw_payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"sku" varchar(128),
	"item_name" varchar(256),
	"quantity" integer DEFAULT 1 NOT NULL,
	"item_price" numeric(14, 2) NOT NULL,
	"item_discount" numeric(14, 2) DEFAULT '0',
	"cogs_amount" numeric(14, 2),
	"gst_rate" numeric(5, 2),
	"gst_amount" numeric(14, 2),
	"hsn_code" varchar(8),
	"cgst_amount" numeric(14, 2) DEFAULT '0',
	"sgst_amount" numeric(14, 2) DEFAULT '0',
	"igst_amount" numeric(14, 2) DEFAULT '0',
	"shipping_charge" numeric(14, 2),
	"fulfillment_fee" numeric(14, 2),
	"commission_fee" numeric(14, 2),
	"other_charges" numeric(14, 2),
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_order_allocations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payment_id" uuid NOT NULL,
	"order_id" uuid,
	"allocation_status" "allocation_status" DEFAULT 'allocated' NOT NULL,
	"allocated_amount" numeric(14, 2) NOT NULL,
	"fee_amount" numeric(14, 2) DEFAULT '0',
	"tax_amount" numeric(14, 2) DEFAULT '0',
	"notes" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pg_disputes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_platform_id" uuid,
	"payment_id" uuid,
	"gateway" varchar(64),
	"dispute_reference" varchar(128),
	"reason" varchar(128),
	"status" "pg_dispute_status" DEFAULT 'open' NOT NULL,
	"disputed_amount" numeric(14, 2),
	"fee_gst_amount" numeric(14, 2) DEFAULT '0',
	"filed_at" timestamp with time zone,
	"resolved_at" timestamp with time zone,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_returns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"order_id" uuid NOT NULL,
	"order_item_id" uuid,
	"tenant_platform_id" uuid,
	"upload_batch_id" uuid,
	"payment_id" uuid,
	"return_type" "return_type" DEFAULT 'customer_return' NOT NULL,
	"return_status" "return_status" DEFAULT 'initiated' NOT NULL,
	"return_reason" "return_reason",
	"reference_number" varchar(128),
	"rma_number" varchar(128),
	"initiated_at" timestamp with time zone,
	"pickup_scheduled_at" timestamp with time zone,
	"received_at" timestamp with time zone,
	"closed_at" timestamp with time zone,
	"customer_refund_amount" numeric(14, 2),
	"platform_refund_amount" numeric(14, 2),
	"forward_shipping_fee" numeric(14, 2),
	"reverse_shipping_fee" numeric(14, 2),
	"restocking_fee" numeric(14, 2),
	"penalty_fee" numeric(14, 2),
	"exchange_order_id" uuid,
	"refund_ratio" numeric(6, 4),
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"notes" text,
	"metadata" jsonb,
	"raw_payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platform_claims" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_platform_id" uuid,
	"order_id" uuid,
	"claim_type" "claim_type" NOT NULL,
	"claim_ref" varchar(128),
	"status" "claim_status" DEFAULT 'draft' NOT NULL,
	"claimed_amount" numeric(14, 2),
	"approved_amount" numeric(14, 2),
	"deadline_at" timestamp with time zone,
	"filed_at" timestamp with time zone,
	"resolved_at" timestamp with time zone,
	"evidence" jsonb,
	"notes" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_platform_id" uuid NOT NULL,
	"upload_batch_id" uuid,
	"external_order_id" varchar(128) NOT NULL,
	"order_date" timestamp with time zone NOT NULL,
	"order_status" "order_status" NOT NULL,
	"fulfillment_status" "fulfillment_status" DEFAULT 'unfulfilled' NOT NULL,
	"payment_status" "payment_status" DEFAULT 'pending' NOT NULL,
	"payment_method" "payment_method",
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"gross_amount" numeric(14, 2) NOT NULL,
	"discount_amount" numeric(14, 2) DEFAULT '0',
	"tax_amount" numeric(14, 2) DEFAULT '0',
	"shipping_amount" numeric(14, 2) DEFAULT '0',
	"cod_amount" numeric(14, 2),
	"net_receivable_amount" numeric(14, 2),
	"buyer_name" varchar(256),
	"buyer_email" varchar(256),
	"buyer_phone" varchar(32),
	"ship_to_name" varchar(256),
	"ship_to_phone" varchar(32),
	"ship_to_address_line1" text,
	"ship_to_address_line2" text,
	"ship_to_city" varchar(128),
	"ship_to_state" varchar(64),
	"ship_to_postal_code" varchar(12),
	"ship_to_country" varchar(64),
	"fulfillment_channel" "fulfillment_channel",
	"shipping_zone" "shipping_zone",
	"awb_number" varchar(64),
	"carrier_name" varchar(128),
	"actual_weight_grams" numeric(10, 2),
	"volumetric_weight_grams" numeric(10, 2),
	"distance_zone" varchar(32),
	"payment_due_date" timestamp with time zone,
	"shipment_date" timestamp with time zone,
	"delivery_date" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	"return_requested_at" timestamp with time zone,
	"metadata" jsonb,
	"raw_payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "logistics_disputes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_platform_id" uuid,
	"order_id" uuid,
	"awb_number" varchar(64),
	"dispute_type" "logi_dispute_type" NOT NULL,
	"status" "logi_dispute_status" DEFAULT 'open' NOT NULL,
	"claimed_amount" numeric(14, 2),
	"approved_amount" numeric(14, 2),
	"filed_at" timestamp with time zone,
	"resolved_at" timestamp with time zone,
	"evidence_url" text,
	"notes" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platforms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(64) NOT NULL,
	"name" varchar(128) NOT NULL,
	"payout_schedule" "payout_schedule",
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settlement_lines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_platform_id" uuid NOT NULL,
	"settlement_reference" varchar(128),
	"line_type" varchar(64) NOT NULL,
	"order_external_id" varchar(128),
	"amount" numeric(14, 2) NOT NULL,
	"tax_amount" numeric(14, 2) DEFAULT '0',
	"raw_payload" jsonb NOT NULL,
	"occurred_at" timestamp with time zone,
	"upload_batch_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reconciliation_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"run_id" uuid NOT NULL,
	"order_id" uuid,
	"order_item_id" uuid,
	"payment_id" uuid,
	"status" "reconciliation_status" NOT NULL,
	"reason" "reconciliation_reason",
	"variance_amount" numeric(14, 2),
	"variance_percentage" numeric(7, 4),
	"pending_amount" numeric(14, 2),
	"notes" text,
	"details" jsonb,
	"resolved_by" uuid,
	"resolved_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "statutory_credits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_platform_id" uuid,
	"credit_type" "stat_credit_type" NOT NULL,
	"period_month" integer NOT NULL,
	"period_year" integer NOT NULL,
	"source_ref" varchar(128),
	"credit_amount" numeric(14, 2) NOT NULL,
	"recognized_at" timestamp with time zone,
	"claimed_in_return" boolean DEFAULT false,
	"notes" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant_charge_tiers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"charge_config_id" uuid NOT NULL,
	"tier_min" numeric(14, 2),
	"tier_max" numeric(14, 2),
	"rate" numeric(10, 4),
	"flat_amount" numeric(14, 2),
	"priority" integer DEFAULT 1 NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant_platforms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"platform_id" uuid NOT NULL,
	"status" "tenant_platform_status" DEFAULT 'draft' NOT NULL,
	"display_name" varchar(128),
	"seller_identifier" varchar(128),
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"activated_at" timestamp with time zone,
	"deactivated_at" timestamp with time zone,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "user_role" DEFAULT 'viewer' NOT NULL,
	"invited_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(256) NOT NULL,
	"full_name" varchar(256),
	"phone_number" varchar(32),
	"is_active" boolean DEFAULT true NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_login_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "tenant_charge_configs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_platform_id" uuid NOT NULL,
	"charge_type" charge_type NOT NULL,
	"calculation_method" charge_calculation_method DEFAULT 'percentage' NOT NULL,
	"charge_scope" charge_scope DEFAULT 'order' NOT NULL,
	"product_category" varchar(256),
	"product_sub_category" varchar(256),
	"fulfillment_channel" "fulfillment_channel",
	"shipping_zone" "shipping_zone",
	"region" varchar(128),
	"min_weight_grams" numeric(10, 2),
	"max_weight_grams" numeric(10, 2),
	"rate" numeric(10, 4),
	"flat_amount" numeric(14, 2),
	"min_amount" numeric(14, 2),
	"max_amount" numeric(14, 2),
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"effective_from" timestamp with time zone NOT NULL,
	"effective_to" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"metadata" jsonb,
	"notes" text,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profitability_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_platform_id" uuid,
	"platform_id" uuid,
	"order_id" uuid,
	"reconciliation_run_id" uuid,
	"calculation_source" "financial_source" DEFAULT 'calculated' NOT NULL,
	"product_category" varchar(256),
	"fulfillment_channel" "fulfillment_channel",
	"campaign_identifier" varchar(128),
	"segment_key" varchar(128),
	"period_start" timestamp with time zone,
	"period_end" timestamp with time zone,
	"computed_by_job_id" varchar(128),
	"total_revenue" numeric(14, 2) NOT NULL,
	"total_discounts" numeric(14, 2) DEFAULT '0',
	"total_fees_before_tax" numeric(14, 2) DEFAULT '0',
	"fee_gst_amount" numeric(14, 2) DEFAULT '0',
	"shipping_cost" numeric(14, 2) DEFAULT '0',
	"cogs" numeric(14, 2) DEFAULT '0',
	"ad_spend" numeric(14, 2) DEFAULT '0',
	"other_costs" numeric(14, 2) DEFAULT '0',
	"total_cost" numeric(14, 2) NOT NULL,
	"net_profit" numeric(14, 2) NOT NULL,
	"profit_margin_percent" numeric(7, 4) NOT NULL,
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"calculated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"computed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(128) NOT NULL,
	"status" "tenant_status" DEFAULT 'active' NOT NULL,
	"industry" varchar(128),
	"gst_number" varchar(32),
	"gstin" varchar(15),
	"pan_number" varchar(10),
	"timezone" varchar(64) DEFAULT 'Asia/Kolkata' NOT NULL,
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "reconciliation_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_platform_id" uuid,
	"data_upload_batch_id" uuid,
	"triggered_by" uuid,
	"status" "reconciliation_status" DEFAULT 'manual_review' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"summary" jsonb,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "data_upload_batches" ADD CONSTRAINT "data_upload_batches_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_upload_batches" ADD CONSTRAINT "data_upload_batches_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_upload_batches" ADD CONSTRAINT "data_upload_batches_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cost_entries" ADD CONSTRAINT "cost_entries_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cost_entries" ADD CONSTRAINT "cost_entries_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cost_entries" ADD CONSTRAINT "cost_entries_order_item_id_order_items_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cost_entries" ADD CONSTRAINT "cost_entries_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cost_entries" ADD CONSTRAINT "cost_entries_order_return_id_order_returns_id_fk" FOREIGN KEY ("order_return_id") REFERENCES "public"."order_returns"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cost_entries" ADD CONSTRAINT "cost_entries_charge_config_id_tenant_charge_configs_id_fk" FOREIGN KEY ("charge_config_id") REFERENCES "public"."tenant_charge_configs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cost_entries" ADD CONSTRAINT "cost_entries_upload_batch_id_data_upload_batches_id_fk" FOREIGN KEY ("upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_charge_allocations" ADD CONSTRAINT "order_charge_allocations_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_charge_allocations" ADD CONSTRAINT "order_charge_allocations_charge_config_id_tenant_charge_configs" FOREIGN KEY ("charge_config_id") REFERENCES "public"."tenant_charge_configs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_charge_allocations" ADD CONSTRAINT "order_charge_allocations_upload_batch_id_data_upload_batches_id" FOREIGN KEY ("upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_adjustments" ADD CONSTRAINT "payment_adjustments_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_upload_batch_id_data_upload_batches_id_fk" FOREIGN KEY ("upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_upload_batch_id_data_upload_batches_id_fk" FOREIGN KEY ("upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_order_return_id_order_returns_id_fk" FOREIGN KEY ("order_return_id") REFERENCES "public"."order_returns"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_order_allocations" ADD CONSTRAINT "payment_order_allocations_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_order_allocations" ADD CONSTRAINT "payment_order_allocations_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pg_disputes" ADD CONSTRAINT "pg_disputes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pg_disputes" ADD CONSTRAINT "pg_disputes_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pg_disputes" ADD CONSTRAINT "pg_disputes_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_returns" ADD CONSTRAINT "order_returns_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_returns" ADD CONSTRAINT "order_returns_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_returns" ADD CONSTRAINT "order_returns_order_item_id_order_items_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_returns" ADD CONSTRAINT "order_returns_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_returns" ADD CONSTRAINT "order_returns_upload_batch_id_data_upload_batches_id_fk" FOREIGN KEY ("upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_returns" ADD CONSTRAINT "order_returns_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_returns" ADD CONSTRAINT "order_returns_exchange_order_id_orders_id_fk" FOREIGN KEY ("exchange_order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_claims" ADD CONSTRAINT "platform_claims_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_claims" ADD CONSTRAINT "platform_claims_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_claims" ADD CONSTRAINT "platform_claims_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_upload_batch_id_data_upload_batches_id_fk" FOREIGN KEY ("upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "logistics_disputes" ADD CONSTRAINT "logistics_disputes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "logistics_disputes" ADD CONSTRAINT "logistics_disputes_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "logistics_disputes" ADD CONSTRAINT "logistics_disputes_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settlement_lines" ADD CONSTRAINT "settlement_lines_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settlement_lines" ADD CONSTRAINT "settlement_lines_upload_batch_id_data_upload_batches_id_fk" FOREIGN KEY ("upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_entries" ADD CONSTRAINT "reconciliation_entries_run_id_reconciliation_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."reconciliation_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_entries" ADD CONSTRAINT "reconciliation_entries_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_entries" ADD CONSTRAINT "reconciliation_entries_order_item_id_order_items_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_entries" ADD CONSTRAINT "reconciliation_entries_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_entries" ADD CONSTRAINT "reconciliation_entries_resolved_by_users_id_fk" FOREIGN KEY ("resolved_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "statutory_credits" ADD CONSTRAINT "statutory_credits_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "statutory_credits" ADD CONSTRAINT "statutory_credits_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_charge_tiers" ADD CONSTRAINT "tenant_charge_tiers_charge_config_id_tenant_charge_configs_id_f" FOREIGN KEY ("charge_config_id") REFERENCES "public"."tenant_charge_configs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_platforms" ADD CONSTRAINT "tenant_platforms_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_platforms" ADD CONSTRAINT "tenant_platforms_platform_id_platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_members" ADD CONSTRAINT "tenant_members_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_members" ADD CONSTRAINT "tenant_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_members" ADD CONSTRAINT "tenant_members_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_charge_configs" ADD CONSTRAINT "tenant_charge_configs_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_charge_configs" ADD CONSTRAINT "tenant_charge_configs_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_charge_configs" ADD CONSTRAINT "tenant_charge_configs_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profitability_snapshots" ADD CONSTRAINT "profitability_snapshots_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profitability_snapshots" ADD CONSTRAINT "profitability_snapshots_platform_id_platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profitability_snapshots" ADD CONSTRAINT "profitability_snapshots_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profitability_snapshots" ADD CONSTRAINT "profitability_snapshots_tenant_platform_id_tenant_platforms_id_" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profitability_snapshots" ADD CONSTRAINT "profitability_snapshots_reconciliation_run_id_reconciliation_ru" FOREIGN KEY ("reconciliation_run_id") REFERENCES "public"."reconciliation_runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_runs" ADD CONSTRAINT "reconciliation_runs_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_runs" ADD CONSTRAINT "reconciliation_runs_tenant_platform_id_tenant_platforms_id_fk" FOREIGN KEY ("tenant_platform_id") REFERENCES "public"."tenant_platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_runs" ADD CONSTRAINT "reconciliation_runs_triggered_by_users_id_fk" FOREIGN KEY ("triggered_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_runs" ADD CONSTRAINT "reconciliation_runs_data_upload_batch_id_data_upload_batches_id" FOREIGN KEY ("data_upload_batch_id") REFERENCES "public"."data_upload_batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "data_upload_batches_tenant_idx" ON "data_upload_batches" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "data_upload_batches_tenant_platform_idx" ON "data_upload_batches" USING btree ("tenant_platform_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "cost_entries_order_item_idx" ON "cost_entries" USING btree ("order_item_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "cost_entries_order_return_idx" ON "cost_entries" USING btree ("order_return_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "cost_entries_tenant_idx" ON "cost_entries" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "cost_entries_type_idx" ON "cost_entries" USING btree ("cost_type" enum_ops);--> statement-breakpoint
CREATE INDEX "order_charge_allocations_charge_idx" ON "order_charge_allocations" USING btree ("charge_type" enum_ops);--> statement-breakpoint
CREATE INDEX "order_charge_allocations_order_idx" ON "order_charge_allocations" USING btree ("order_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payment_adjustments_payment_idx" ON "payment_adjustments" USING btree ("payment_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payment_adjustments_tax_section_idx" ON "payment_adjustments" USING btree ("tax_section" enum_ops);--> statement-breakpoint
CREATE INDEX "payments_payout_batch_idx" ON "payments" USING btree ("payout_batch_id" text_ops);--> statement-breakpoint
CREATE INDEX "payments_tenant_idx" ON "payments" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "payments_tenant_payment_key" ON "payments" USING btree ("tenant_id" text_ops,"tenant_platform_id" uuid_ops,"payment_reference" text_ops);--> statement-breakpoint
CREATE INDEX "payments_tenant_platform_idx" ON "payments" USING btree ("tenant_platform_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payments_utr_idx" ON "payments" USING btree ("utr_number" text_ops);--> statement-breakpoint
CREATE INDEX "ledger_entries_order_idx" ON "ledger_entries" USING btree ("order_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "ledger_entries_payment_idx" ON "ledger_entries" USING btree ("payment_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "ledger_entries_tax_section_idx" ON "ledger_entries" USING btree ("tax_section" enum_ops);--> statement-breakpoint
CREATE INDEX "ledger_entries_tenant_idx" ON "ledger_entries" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "ledger_entries_type_idx" ON "ledger_entries" USING btree ("entry_type" enum_ops);--> statement-breakpoint
CREATE INDEX "order_items_order_idx" ON "order_items" USING btree ("order_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payment_order_allocations_order_idx" ON "payment_order_allocations" USING btree ("order_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payment_order_allocations_payment_idx" ON "payment_order_allocations" USING btree ("payment_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "pg_disputes_payment_idx" ON "pg_disputes" USING btree ("payment_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "pg_disputes_status_idx" ON "pg_disputes" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "pg_disputes_tenant_idx" ON "pg_disputes" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "order_returns_order_idx" ON "order_returns" USING btree ("order_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "order_returns_order_item_idx" ON "order_returns" USING btree ("order_item_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "order_returns_status_idx" ON "order_returns" USING btree ("return_status" enum_ops);--> statement-breakpoint
CREATE INDEX "order_returns_tenant_idx" ON "order_returns" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "platform_claims_order_idx" ON "platform_claims" USING btree ("order_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "platform_claims_status_idx" ON "platform_claims" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "platform_claims_tenant_idx" ON "platform_claims" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "orders_tenant_idx" ON "orders" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "orders_tenant_order_key" ON "orders" USING btree ("tenant_id" uuid_ops,"tenant_platform_id" text_ops,"external_order_id" text_ops);--> statement-breakpoint
CREATE INDEX "orders_tenant_platform_idx" ON "orders" USING btree ("tenant_platform_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "logistics_disputes_order_idx" ON "logistics_disputes" USING btree ("order_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "logistics_disputes_status_idx" ON "logistics_disputes" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "logistics_disputes_tenant_idx" ON "logistics_disputes" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "platforms_code_key" ON "platforms" USING btree ("code" text_ops);--> statement-breakpoint
CREATE INDEX "settlement_lines_order_idx" ON "settlement_lines" USING btree ("order_external_id" text_ops);--> statement-breakpoint
CREATE INDEX "settlement_lines_settlement_idx" ON "settlement_lines" USING btree ("tenant_platform_id" text_ops,"settlement_reference" text_ops);--> statement-breakpoint
CREATE INDEX "settlement_lines_type_idx" ON "settlement_lines" USING btree ("line_type" text_ops);--> statement-breakpoint
CREATE INDEX "reconciliation_entries_run_idx" ON "reconciliation_entries" USING btree ("run_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "reconciliation_entries_status_idx" ON "reconciliation_entries" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "statutory_credits_tenant_period_idx" ON "statutory_credits" USING btree ("tenant_id" int4_ops,"period_year" int4_ops,"period_month" int4_ops);--> statement-breakpoint
CREATE INDEX "tenant_charge_tiers_charge_config_idx" ON "tenant_charge_tiers" USING btree ("charge_config_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "tenant_platforms_tenant_idx" ON "tenant_platforms" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_platforms_tenant_platform_key" ON "tenant_platforms" USING btree ("tenant_id" uuid_ops,"platform_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "tenant_members_tenant_idx" ON "tenant_members" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_members_tenant_user_key" ON "tenant_members" USING btree ("tenant_id" uuid_ops,"user_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_key" ON "users" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "tenant_charge_configs_fulfillment_idx" ON "tenant_charge_configs" USING btree ("tenant_platform_id" uuid_ops,"fulfillment_channel" enum_ops);--> statement-breakpoint
CREATE INDEX "tenant_charge_configs_product_category_idx" ON "tenant_charge_configs" USING btree ("tenant_platform_id" uuid_ops,"product_category" text_ops);--> statement-breakpoint
CREATE INDEX "tenant_charge_configs_shipping_zone_idx" ON "tenant_charge_configs" USING btree ("shipping_zone" enum_ops);--> statement-breakpoint
CREATE INDEX "tenant_charge_configs_tenant_platform_idx" ON "tenant_charge_configs" USING btree ("tenant_platform_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_charge_configs_unique_version" ON "tenant_charge_configs" USING btree ("tenant_platform_id" int4_ops,"charge_type" enum_ops,"version" enum_ops);--> statement-breakpoint
CREATE INDEX "profitability_snapshots_campaign_idx" ON "profitability_snapshots" USING btree ("campaign_identifier" text_ops);--> statement-breakpoint
CREATE INDEX "profitability_snapshots_order_idx" ON "profitability_snapshots" USING btree ("order_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "profitability_snapshots_period_idx" ON "profitability_snapshots" USING btree ("period_start" timestamptz_ops,"period_end" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "profitability_snapshots_run_idx" ON "profitability_snapshots" USING btree ("reconciliation_run_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "profitability_snapshots_segment_idx" ON "profitability_snapshots" USING btree ("segment_key" text_ops);--> statement-breakpoint
CREATE INDEX "profitability_snapshots_tenant_idx" ON "profitability_snapshots" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "profitability_snapshots_tenant_platform_idx" ON "profitability_snapshots" USING btree ("tenant_platform_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "reconciliation_runs_tenant_idx" ON "reconciliation_runs" USING btree ("tenant_id" uuid_ops);
*/