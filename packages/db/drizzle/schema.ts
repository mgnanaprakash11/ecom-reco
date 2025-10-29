import { pgTable, uuid, varchar, integer, timestamp, index, foreignKey, jsonb, text, numeric, boolean, uniqueIndex, pgSchema, bigint, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const raw = pgSchema("raw");
export const allocationStatus = pgEnum("allocation_status", ['pending', 'unallocated', 'allocated', 'partially_allocated', 'disputed', 'released'])
export const chargeCalculationMethod = pgEnum("charge_calculation_method", ['percentage', 'flat', 'slab', 'tiered', 'hybrid'])
export const chargeScope = pgEnum("charge_scope", ['order', 'item', 'shipment', 'payout', 'payment'])
export const chargeType = pgEnum("charge_type", ['commission', 'referral_fee', 'closing_fee', 'collection_fee', 'payment_gateway_fee', 'cod_fee', 'shipping_fee', 'logistics_fee', 'fulfillment_fee', 'storage_fee', 'pick_pack_fee', 'advertising_fee', 'promotion_fee', 'return_processing_fee', 'reverse_logistics_fee', 'cancellation_fee', 'penalty_fee', 'gst', 'tcs', 'tds', 'discount_subsidy', 'coupon_subsidy', 'packaging_cost', 'cogs', 'support_fee', 'settlement_adjustment', 'other'])
export const claimStatus = pgEnum("claim_status", ['draft', 'filed', 'approved', 'rejected', 'partial', 'expired'])
export const claimType = pgEnum("claim_type", ['safe_t', 'penalty_appeal', 'lost_in_transit', 'qc_damage', 'other'])
export const costType = pgEnum("cost_type", ['advertising', 'shipping', 'logistics', 'freight_inward', 'freight_outward', 'cogs', 'manufacturing', 'packaging', 'commission', 'payment_gateway', 'cod', 'return_processing', 'reverse_logistics', 'penalty', 'gst', 'tcs', 'tds', 'discount', 'coupon', 'promotion', 'marketing', 'storage', 'collection_fee', 'closing_fee', 'fulfillment_fee', 'settlement_adjustment', 'salary', 'overhead', 'other'])
export const dataUploadSource = pgEnum("data_upload_source", ['manual', 'manual_csv', 'api', 'platform_api', 'sftp', 'integration', 's3_webhook', 'scheduled', 'other'])
export const dataUploadStatus = pgEnum("data_upload_status", ['pending', 'received', 'parsing', 'processing', 'parsed', 'loaded', 'completed', 'failed'])
export const dataUploadType = pgEnum("data_upload_type", ['orders', 'order_items', 'payments', 'returns', 'charges', 'settlements', 'rate_cards', 'ads', 'inventory', 'costs', 'other'])
export const financialSource = pgEnum("financial_source", ['calculated', 'manual', 'platform_feed', 'reconciliation', 'import'])
export const fulfillmentChannel = pgEnum("fulfillment_channel", ['fba', 'easy_ship', 'seller_fulfilled', 'flipkart_smart', 'third_party', 'self_ship', 'fbf', 'other'])
export const fulfillmentStatus = pgEnum("fulfillment_status", ['unfulfilled', 'partially_fulfilled', 'fulfilled', 'returned', 'cancelled'])
export const ledgerEntryType = pgEnum("ledger_entry_type", ['order', 'sale', 'refund', 'fee', 'tax', 'tax_withholding', 'adjustment', 'promotion', 'payout', 'cost', 'other'])
export const logiDisputeStatus = pgEnum("logi_dispute_status", ['open', 'approved', 'rejected', 'partial', 'withdrawn'])
export const logiDisputeType = pgEnum("logi_dispute_type", ['weight', 'rto', 'ndr', 'damage', 'lost', 'other'])
export const orderStatus = pgEnum("order_status", ['created', 'pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled', 'returned', 'partial'])
export const paymentMethod = pgEnum("payment_method", ['prepaid', 'cod', 'upi', 'net_banking', 'netbanking', 'card', 'wallet', 'other'])
export const paymentStatus = pgEnum("payment_status", ['pending', 'processing', 'captured', 'settled', 'refunded', 'chargeback', 'failed', 'disputed', 'on_hold'])
export const payoutSchedule = pgEnum("payout_schedule", ['daily', 't_plus_2', 'weekly', 'fortnightly', 'monthly', 'adhoc', 'other'])
export const pgDisputeStatus = pgEnum("pg_dispute_status", ['open', 'won', 'lost', 'withdrawn'])
export const promotionSource = pgEnum("promotion_source", ['seller', 'platform', 'shared'])
export const reconciliationReason = pgEnum("reconciliation_reason", ['commission_mismatch', 'fee_missing', 'tax_difference', 'fee_change', 'policy_change', 'data_missing', 'return_pending', 'payment_delay', 'rounding', 'other'])
export const reconciliationStatus = pgEnum("reconciliation_status", ['matched', 'unmatched', 'reconciled', 'unreconciled', 'partial', 'manual_review', 'overpaid', 'underpaid', 'mismatch'])
export const returnReason = pgEnum("return_reason", ['damaged', 'defective', 'wrong_item', 'customer_remorse', 'size_issue', 'quality_issue', 'delivery_failed', 'undelivered', 'address_issue', 'other'])
export const returnStatus = pgEnum("return_status", ['initiated', 'pickup_scheduled', 'in_transit', 'warehouse_received', 'received', 'qc_passed', 'qc_failed', 'approved', 'rejected', 'completed', 'refunded', 'closed'])
export const returnType = pgEnum("return_type", ['customer_return', 'rto', 'ndr', 'replacement', 'cancellation', 'other'])
export const shippingZone = pgEnum("shipping_zone", ['local', 'zonal', 'national', 'international', 'special'])
export const statCreditType = pgEnum("stat_credit_type", ['tcs_gst', 'tds_194o', 'other'])
export const taxSection = pgEnum("tax_section", ['none', '194o', '206c1h', 'sec_52_tcs', 'sec_194o_tds', 'other'])
export const tenantPlatformStatus = pgEnum("tenant_platform_status", ['draft', 'active', 'inactive', 'disabled'])
export const tenantStatus = pgEnum("tenant_status", ['active', 'inactive', 'suspended', 'closed'])
export const userRole = pgEnum("user_role", ['owner', 'admin', 'analyst', 'viewer', 'member'])


export const products = pgTable("products", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 256 }).notNull(),
	priceCents: integer("price_cents").default(0).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const dataUploadBatches = pgTable("data_upload_batches", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	tenantPlatformId: uuid("tenant_platform_id"),
	dataType: dataUploadType("data_type").notNull(),
	source: dataUploadSource().default('manual').notNull(),
	status: dataUploadStatus().default('pending').notNull(),
	fileName: varchar("file_name", { length: 256 }).notNull(),
	filePath: varchar("file_path", { length: 512 }),
	fileChecksum: varchar("file_checksum", { length: 256 }),
	rowCount: integer("row_count"),
	version: integer().default(1).notNull(),
	rawPayload: jsonb("raw_payload"),
	notes: text(),
	metadata: jsonb(),
	sourceMetadata: jsonb("source_metadata"),
	processingStartedAt: timestamp("processing_started_at", { withTimezone: true, mode: 'string' }),
	processingCompletedAt: timestamp("processing_completed_at", { withTimezone: true, mode: 'string' }),
	createdBy: uuid("created_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("data_upload_batches_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("data_upload_batches_tenant_platform_idx").using("btree", table.tenantPlatformId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "data_upload_batches_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "data_upload_batches_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "data_upload_batches_created_by_users_id_fk"
		}),
]);

export const costEntries = pgTable("cost_entries", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	orderId: uuid("order_id"),
	orderItemId: uuid("order_item_id"),
	paymentId: uuid("payment_id"),
	orderReturnId: uuid("order_return_id"),
	costType: costType("cost_type").notNull(),
	amount: numeric({ precision: 14, scale:  2 }).notNull(),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	incurredAt: timestamp("incurred_at", { withTimezone: true, mode: 'string' }),
	source: financialSource().default('manual').notNull(),
	chargeConfigId: uuid("charge_config_id"),
	uploadBatchId: uuid("upload_batch_id"),
	metadata: jsonb(),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("cost_entries_order_item_idx").using("btree", table.orderItemId.asc().nullsLast().op("uuid_ops")),
	index("cost_entries_order_return_idx").using("btree", table.orderReturnId.asc().nullsLast().op("uuid_ops")),
	index("cost_entries_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("cost_entries_type_idx").using("btree", table.costType.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "cost_entries_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "cost_entries_order_id_orders_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.orderItemId],
			foreignColumns: [orderItems.id],
			name: "cost_entries_order_item_id_order_items_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "cost_entries_payment_id_payments_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.orderReturnId],
			foreignColumns: [orderReturns.id],
			name: "cost_entries_order_return_id_order_returns_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.chargeConfigId],
			foreignColumns: [tenantChargeConfigs.id],
			name: "cost_entries_charge_config_id_tenant_charge_configs_id_fk"
		}),
	foreignKey({
			columns: [table.uploadBatchId],
			foreignColumns: [dataUploadBatches.id],
			name: "cost_entries_upload_batch_id_data_upload_batches_id_fk"
		}),
]);

export const orderChargeAllocations = pgTable("order_charge_allocations", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orderId: uuid("order_id").notNull(),
	chargeType: chargeType("charge_type").notNull(),
	amount: numeric({ precision: 14, scale:  2 }).notNull(),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	source: financialSource().default('calculated').notNull(),
	chargeConfigId: uuid("charge_config_id"),
	uploadBatchId: uuid("upload_batch_id"),
	promotionSource: promotionSource("promotion_source"),
	notes: text(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("order_charge_allocations_charge_idx").using("btree", table.chargeType.asc().nullsLast().op("enum_ops")),
	index("order_charge_allocations_order_idx").using("btree", table.orderId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "order_charge_allocations_order_id_orders_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.chargeConfigId],
			foreignColumns: [tenantChargeConfigs.id],
			name: "order_charge_allocations_charge_config_id_tenant_charge_configs"
		}),
	foreignKey({
			columns: [table.uploadBatchId],
			foreignColumns: [dataUploadBatches.id],
			name: "order_charge_allocations_upload_batch_id_data_upload_batches_id"
		}),
]);

export const paymentAdjustments = pgTable("payment_adjustments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	paymentId: uuid("payment_id").notNull(),
	chargeType: chargeType("charge_type").notNull(),
	amount: numeric({ precision: 14, scale:  2 }).notNull(),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	withholdingReference: varchar("withholding_reference", { length: 128 }),
	taxSection: taxSection("tax_section"),
	withholdingRate: numeric("withholding_rate", { precision: 7, scale:  4 }),
	isTaxRemitted: boolean("is_tax_remitted").default(false).notNull(),
	taxRemittedAt: timestamp("tax_remitted_at", { withTimezone: true, mode: 'string' }),
	filingPeriod: varchar("filing_period", { length: 16 }),
	taxAmount: numeric("tax_amount", { precision: 14, scale:  2 }).default('0'),
	description: text(),
	rawPayload: jsonb("raw_payload"),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("payment_adjustments_payment_idx").using("btree", table.paymentId.asc().nullsLast().op("uuid_ops")),
	index("payment_adjustments_tax_section_idx").using("btree", table.taxSection.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "payment_adjustments_payment_id_payments_id_fk"
		}).onDelete("cascade"),
]);

export const payments = pgTable("payments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	tenantPlatformId: uuid("tenant_platform_id").notNull(),
	uploadBatchId: uuid("upload_batch_id"),
	paymentReference: varchar("payment_reference", { length: 128 }).notNull(),
	settlementReference: varchar("settlement_reference", { length: 128 }),
	paymentStatus: paymentStatus("payment_status").notNull(),
	paymentMethod: paymentMethod("payment_method").notNull(),
	paymentType: varchar("payment_type", { length: 64 }),
	paymentDate: timestamp("payment_date", { withTimezone: true, mode: 'string' }).notNull(),
	payoutDate: timestamp("payout_date", { withTimezone: true, mode: 'string' }),
	settlementPeriodStart: timestamp("settlement_period_start", { withTimezone: true, mode: 'string' }),
	settlementPeriodEnd: timestamp("settlement_period_end", { withTimezone: true, mode: 'string' }),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	grossAmount: numeric("gross_amount", { precision: 14, scale:  2 }).notNull(),
	grossSettlementAmount: numeric("gross_settlement_amount", { precision: 14, scale:  2 }),
	feeAmount: numeric("fee_amount", { precision: 14, scale:  2 }).default('0'),
	taxAmount: numeric("tax_amount", { precision: 14, scale:  2 }).default('0'),
	tcsAmount: numeric("tcs_amount", { precision: 14, scale:  2 }).default('0'),
	tdsAmount: numeric("tds_amount", { precision: 14, scale:  2 }).default('0'),
	adjustmentAmount: numeric("adjustment_amount", { precision: 14, scale:  2 }).default('0'),
	otherAdjustments: numeric("other_adjustments", { precision: 14, scale:  2 }).default('0'),
	netAmount: numeric("net_amount", { precision: 14, scale:  2 }).notNull(),
	utrNumber: varchar("utr_number", { length: 64 }),
	payoutBatchId: varchar("payout_batch_id", { length: 128 }),
	payoutSchedule: payoutSchedule("payout_schedule"),
	payoutScheduledDate: timestamp("payout_scheduled_date", { withTimezone: true, mode: 'string' }),
	bankAccountId: varchar("bank_account_id", { length: 128 }),
	bankName: varchar("bank_name", { length: 128 }),
	ifscCode: varchar("ifsc_code", { length: 16 }),
	accountNumberLast4: varchar("account_number_last4", { length: 8 }),
	metadata: jsonb(),
	rawPayload: jsonb("raw_payload"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("payments_payout_batch_idx").using("btree", table.payoutBatchId.asc().nullsLast().op("text_ops")),
	index("payments_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("payments_tenant_payment_key").using("btree", table.tenantId.asc().nullsLast().op("text_ops"), table.tenantPlatformId.asc().nullsLast().op("uuid_ops"), table.paymentReference.asc().nullsLast().op("text_ops")),
	index("payments_tenant_platform_idx").using("btree", table.tenantPlatformId.asc().nullsLast().op("uuid_ops")),
	index("payments_utr_idx").using("btree", table.utrNumber.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "payments_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "payments_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.uploadBatchId],
			foreignColumns: [dataUploadBatches.id],
			name: "payments_upload_batch_id_data_upload_batches_id_fk"
		}),
]);

export const ledgerEntries = pgTable("ledger_entries", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	tenantPlatformId: uuid("tenant_platform_id"),
	uploadBatchId: uuid("upload_batch_id"),
	orderId: uuid("order_id"),
	orderReturnId: uuid("order_return_id"),
	paymentId: uuid("payment_id"),
	entryType: ledgerEntryType("entry_type").notNull(),
	taxSection: taxSection("tax_section").default('none').notNull(),
	source: financialSource().default('import').notNull(),
	isCredit: boolean("is_credit").default(true).notNull(),
	transactionDate: timestamp("transaction_date", { withTimezone: true, mode: 'string' }).notNull(),
	referenceNumber: varchar("reference_number", { length: 128 }),
	description: text(),
	amount: numeric({ precision: 14, scale:  2 }).notNull(),
	taxAmount: numeric("tax_amount", { precision: 14, scale:  2 }).default('0'),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	metadata: jsonb(),
	rawPayload: jsonb("raw_payload"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("ledger_entries_order_idx").using("btree", table.orderId.asc().nullsLast().op("uuid_ops")),
	index("ledger_entries_payment_idx").using("btree", table.paymentId.asc().nullsLast().op("uuid_ops")),
	index("ledger_entries_tax_section_idx").using("btree", table.taxSection.asc().nullsLast().op("enum_ops")),
	index("ledger_entries_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("ledger_entries_type_idx").using("btree", table.entryType.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "ledger_entries_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "ledger_entries_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.uploadBatchId],
			foreignColumns: [dataUploadBatches.id],
			name: "ledger_entries_upload_batch_id_data_upload_batches_id_fk"
		}),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "ledger_entries_order_id_orders_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.orderReturnId],
			foreignColumns: [orderReturns.id],
			name: "ledger_entries_order_return_id_order_returns_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "ledger_entries_payment_id_payments_id_fk"
		}).onDelete("set null"),
]);

export const orderItems = pgTable("order_items", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orderId: uuid("order_id").notNull(),
	sku: varchar({ length: 128 }),
	itemName: varchar("item_name", { length: 256 }),
	quantity: integer().default(1).notNull(),
	itemPrice: numeric("item_price", { precision: 14, scale:  2 }).notNull(),
	itemDiscount: numeric("item_discount", { precision: 14, scale:  2 }).default('0'),
	cogsAmount: numeric("cogs_amount", { precision: 14, scale:  2 }),
	gstRate: numeric("gst_rate", { precision: 5, scale:  2 }),
	gstAmount: numeric("gst_amount", { precision: 14, scale:  2 }),
	hsnCode: varchar("hsn_code", { length: 8 }),
	cgstAmount: numeric("cgst_amount", { precision: 14, scale:  2 }).default('0'),
	sgstAmount: numeric("sgst_amount", { precision: 14, scale:  2 }).default('0'),
	igstAmount: numeric("igst_amount", { precision: 14, scale:  2 }).default('0'),
	shippingCharge: numeric("shipping_charge", { precision: 14, scale:  2 }),
	fulfillmentFee: numeric("fulfillment_fee", { precision: 14, scale:  2 }),
	commissionFee: numeric("commission_fee", { precision: 14, scale:  2 }),
	otherCharges: numeric("other_charges", { precision: 14, scale:  2 }),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("order_items_order_idx").using("btree", table.orderId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "order_items_order_id_orders_id_fk"
		}).onDelete("cascade"),
]);

export const paymentOrderAllocations = pgTable("payment_order_allocations", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	paymentId: uuid("payment_id").notNull(),
	orderId: uuid("order_id"),
	allocationStatus: allocationStatus("allocation_status").default('allocated').notNull(),
	allocatedAmount: numeric("allocated_amount", { precision: 14, scale:  2 }).notNull(),
	feeAmount: numeric("fee_amount", { precision: 14, scale:  2 }).default('0'),
	taxAmount: numeric("tax_amount", { precision: 14, scale:  2 }).default('0'),
	notes: text(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("payment_order_allocations_order_idx").using("btree", table.orderId.asc().nullsLast().op("uuid_ops")),
	index("payment_order_allocations_payment_idx").using("btree", table.paymentId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "payment_order_allocations_payment_id_payments_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "payment_order_allocations_order_id_orders_id_fk"
		}).onDelete("set null"),
]);

export const pgDisputes = pgTable("pg_disputes", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	tenantPlatformId: uuid("tenant_platform_id"),
	paymentId: uuid("payment_id"),
	gateway: varchar({ length: 64 }),
	disputeReference: varchar("dispute_reference", { length: 128 }),
	reason: varchar({ length: 128 }),
	status: pgDisputeStatus().default('open').notNull(),
	disputedAmount: numeric("disputed_amount", { precision: 14, scale:  2 }),
	feeGstAmount: numeric("fee_gst_amount", { precision: 14, scale:  2 }).default('0'),
	filedAt: timestamp("filed_at", { withTimezone: true, mode: 'string' }),
	resolvedAt: timestamp("resolved_at", { withTimezone: true, mode: 'string' }),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("pg_disputes_payment_idx").using("btree", table.paymentId.asc().nullsLast().op("uuid_ops")),
	index("pg_disputes_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("pg_disputes_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "pg_disputes_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "pg_disputes_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "pg_disputes_payment_id_payments_id_fk"
		}).onDelete("set null"),
]);

export const orderReturns = pgTable("order_returns", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	orderId: uuid("order_id").notNull(),
	orderItemId: uuid("order_item_id"),
	tenantPlatformId: uuid("tenant_platform_id"),
	uploadBatchId: uuid("upload_batch_id"),
	paymentId: uuid("payment_id"),
	returnType: returnType("return_type").default('customer_return').notNull(),
	returnStatus: returnStatus("return_status").default('initiated').notNull(),
	returnReason: returnReason("return_reason"),
	referenceNumber: varchar("reference_number", { length: 128 }),
	rmaNumber: varchar("rma_number", { length: 128 }),
	initiatedAt: timestamp("initiated_at", { withTimezone: true, mode: 'string' }),
	pickupScheduledAt: timestamp("pickup_scheduled_at", { withTimezone: true, mode: 'string' }),
	receivedAt: timestamp("received_at", { withTimezone: true, mode: 'string' }),
	closedAt: timestamp("closed_at", { withTimezone: true, mode: 'string' }),
	customerRefundAmount: numeric("customer_refund_amount", { precision: 14, scale:  2 }),
	platformRefundAmount: numeric("platform_refund_amount", { precision: 14, scale:  2 }),
	forwardShippingFee: numeric("forward_shipping_fee", { precision: 14, scale:  2 }),
	reverseShippingFee: numeric("reverse_shipping_fee", { precision: 14, scale:  2 }),
	restockingFee: numeric("restocking_fee", { precision: 14, scale:  2 }),
	penaltyFee: numeric("penalty_fee", { precision: 14, scale:  2 }),
	exchangeOrderId: uuid("exchange_order_id"),
	refundRatio: numeric("refund_ratio", { precision: 6, scale:  4 }),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	notes: text(),
	metadata: jsonb(),
	rawPayload: jsonb("raw_payload"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("order_returns_order_idx").using("btree", table.orderId.asc().nullsLast().op("uuid_ops")),
	index("order_returns_order_item_idx").using("btree", table.orderItemId.asc().nullsLast().op("uuid_ops")),
	index("order_returns_status_idx").using("btree", table.returnStatus.asc().nullsLast().op("enum_ops")),
	index("order_returns_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "order_returns_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "order_returns_order_id_orders_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.orderItemId],
			foreignColumns: [orderItems.id],
			name: "order_returns_order_item_id_order_items_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "order_returns_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.uploadBatchId],
			foreignColumns: [dataUploadBatches.id],
			name: "order_returns_upload_batch_id_data_upload_batches_id_fk"
		}),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "order_returns_payment_id_payments_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.exchangeOrderId],
			foreignColumns: [orders.id],
			name: "order_returns_exchange_order_id_orders_id_fk"
		}),
]);

export const platformClaims = pgTable("platform_claims", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	tenantPlatformId: uuid("tenant_platform_id"),
	orderId: uuid("order_id"),
	claimType: claimType("claim_type").notNull(),
	claimRef: varchar("claim_ref", { length: 128 }),
	status: claimStatus().default('draft').notNull(),
	claimedAmount: numeric("claimed_amount", { precision: 14, scale:  2 }),
	approvedAmount: numeric("approved_amount", { precision: 14, scale:  2 }),
	deadlineAt: timestamp("deadline_at", { withTimezone: true, mode: 'string' }),
	filedAt: timestamp("filed_at", { withTimezone: true, mode: 'string' }),
	resolvedAt: timestamp("resolved_at", { withTimezone: true, mode: 'string' }),
	evidence: jsonb(),
	notes: text(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("platform_claims_order_idx").using("btree", table.orderId.asc().nullsLast().op("uuid_ops")),
	index("platform_claims_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("platform_claims_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "platform_claims_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "platform_claims_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "platform_claims_order_id_orders_id_fk"
		}),
]);

export const orders = pgTable("orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	tenantPlatformId: uuid("tenant_platform_id").notNull(),
	uploadBatchId: uuid("upload_batch_id"),
	externalOrderId: varchar("external_order_id", { length: 128 }).notNull(),
	orderDate: timestamp("order_date", { withTimezone: true, mode: 'string' }).notNull(),
	orderStatus: orderStatus("order_status").notNull(),
	fulfillmentStatus: fulfillmentStatus("fulfillment_status").default('unfulfilled').notNull(),
	paymentStatus: paymentStatus("payment_status").default('pending').notNull(),
	paymentMethod: paymentMethod("payment_method"),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	grossAmount: numeric("gross_amount", { precision: 14, scale:  2 }).notNull(),
	discountAmount: numeric("discount_amount", { precision: 14, scale:  2 }).default('0'),
	taxAmount: numeric("tax_amount", { precision: 14, scale:  2 }).default('0'),
	shippingAmount: numeric("shipping_amount", { precision: 14, scale:  2 }).default('0'),
	codAmount: numeric("cod_amount", { precision: 14, scale:  2 }),
	netReceivableAmount: numeric("net_receivable_amount", { precision: 14, scale:  2 }),
	buyerName: varchar("buyer_name", { length: 256 }),
	buyerEmail: varchar("buyer_email", { length: 256 }),
	buyerPhone: varchar("buyer_phone", { length: 32 }),
	shipToName: varchar("ship_to_name", { length: 256 }),
	shipToPhone: varchar("ship_to_phone", { length: 32 }),
	shipToAddressLine1: text("ship_to_address_line1"),
	shipToAddressLine2: text("ship_to_address_line2"),
	shipToCity: varchar("ship_to_city", { length: 128 }),
	shipToState: varchar("ship_to_state", { length: 64 }),
	shipToPostalCode: varchar("ship_to_postal_code", { length: 12 }),
	shipToCountry: varchar("ship_to_country", { length: 64 }),
	fulfillmentChannel: fulfillmentChannel("fulfillment_channel"),
	shippingZone: shippingZone("shipping_zone"),
	awbNumber: varchar("awb_number", { length: 64 }),
	carrierName: varchar("carrier_name", { length: 128 }),
	actualWeightGrams: numeric("actual_weight_grams", { precision: 10, scale:  2 }),
	volumetricWeightGrams: numeric("volumetric_weight_grams", { precision: 10, scale:  2 }),
	distanceZone: varchar("distance_zone", { length: 32 }),
	paymentDueDate: timestamp("payment_due_date", { withTimezone: true, mode: 'string' }),
	shipmentDate: timestamp("shipment_date", { withTimezone: true, mode: 'string' }),
	deliveryDate: timestamp("delivery_date", { withTimezone: true, mode: 'string' }),
	cancelledAt: timestamp("cancelled_at", { withTimezone: true, mode: 'string' }),
	returnRequestedAt: timestamp("return_requested_at", { withTimezone: true, mode: 'string' }),
	metadata: jsonb(),
	rawPayload: jsonb("raw_payload"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("orders_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("orders_tenant_order_key").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops"), table.tenantPlatformId.asc().nullsLast().op("text_ops"), table.externalOrderId.asc().nullsLast().op("text_ops")),
	index("orders_tenant_platform_idx").using("btree", table.tenantPlatformId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "orders_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "orders_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.uploadBatchId],
			foreignColumns: [dataUploadBatches.id],
			name: "orders_upload_batch_id_data_upload_batches_id_fk"
		}),
]);

export const logisticsDisputes = pgTable("logistics_disputes", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	tenantPlatformId: uuid("tenant_platform_id"),
	orderId: uuid("order_id"),
	awbNumber: varchar("awb_number", { length: 64 }),
	disputeType: logiDisputeType("dispute_type").notNull(),
	status: logiDisputeStatus().default('open').notNull(),
	claimedAmount: numeric("claimed_amount", { precision: 14, scale:  2 }),
	approvedAmount: numeric("approved_amount", { precision: 14, scale:  2 }),
	filedAt: timestamp("filed_at", { withTimezone: true, mode: 'string' }),
	resolvedAt: timestamp("resolved_at", { withTimezone: true, mode: 'string' }),
	evidenceUrl: text("evidence_url"),
	notes: text(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("logistics_disputes_order_idx").using("btree", table.orderId.asc().nullsLast().op("uuid_ops")),
	index("logistics_disputes_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("logistics_disputes_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "logistics_disputes_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "logistics_disputes_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "logistics_disputes_order_id_orders_id_fk"
		}).onDelete("cascade"),
]);

export const platforms = pgTable("platforms", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	code: varchar({ length: 64 }).notNull(),
	name: varchar({ length: 128 }).notNull(),
	payoutSchedule: payoutSchedule("payout_schedule"),
	description: text(),
	isActive: boolean("is_active").default(true).notNull(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("platforms_code_key").using("btree", table.code.asc().nullsLast().op("text_ops")),
]);

export const settlementLines = pgTable("settlement_lines", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantPlatformId: uuid("tenant_platform_id").notNull(),
	settlementReference: varchar("settlement_reference", { length: 128 }),
	lineType: varchar("line_type", { length: 64 }).notNull(),
	orderExternalId: varchar("order_external_id", { length: 128 }),
	amount: numeric({ precision: 14, scale:  2 }).notNull(),
	taxAmount: numeric("tax_amount", { precision: 14, scale:  2 }).default('0'),
	rawPayload: jsonb("raw_payload").notNull(),
	occurredAt: timestamp("occurred_at", { withTimezone: true, mode: 'string' }),
	uploadBatchId: uuid("upload_batch_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("settlement_lines_order_idx").using("btree", table.orderExternalId.asc().nullsLast().op("text_ops")),
	index("settlement_lines_settlement_idx").using("btree", table.tenantPlatformId.asc().nullsLast().op("text_ops"), table.settlementReference.asc().nullsLast().op("text_ops")),
	index("settlement_lines_type_idx").using("btree", table.lineType.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "settlement_lines_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.uploadBatchId],
			foreignColumns: [dataUploadBatches.id],
			name: "settlement_lines_upload_batch_id_data_upload_batches_id_fk"
		}),
]);

export const reconciliationEntries = pgTable("reconciliation_entries", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	runId: uuid("run_id").notNull(),
	orderId: uuid("order_id"),
	orderItemId: uuid("order_item_id"),
	paymentId: uuid("payment_id"),
	status: reconciliationStatus().notNull(),
	reason: reconciliationReason(),
	varianceAmount: numeric("variance_amount", { precision: 14, scale:  2 }),
	variancePercentage: numeric("variance_percentage", { precision: 7, scale:  4 }),
	pendingAmount: numeric("pending_amount", { precision: 14, scale:  2 }),
	notes: text(),
	details: jsonb(),
	resolvedBy: uuid("resolved_by"),
	resolvedAt: timestamp("resolved_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("reconciliation_entries_run_idx").using("btree", table.runId.asc().nullsLast().op("uuid_ops")),
	index("reconciliation_entries_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.runId],
			foreignColumns: [reconciliationRuns.id],
			name: "reconciliation_entries_run_id_reconciliation_runs_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "reconciliation_entries_order_id_orders_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.orderItemId],
			foreignColumns: [orderItems.id],
			name: "reconciliation_entries_order_item_id_order_items_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "reconciliation_entries_payment_id_payments_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.resolvedBy],
			foreignColumns: [users.id],
			name: "reconciliation_entries_resolved_by_users_id_fk"
		}),
]);

export const statutoryCredits = pgTable("statutory_credits", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	tenantPlatformId: uuid("tenant_platform_id"),
	creditType: statCreditType("credit_type").notNull(),
	periodMonth: integer("period_month").notNull(),
	periodYear: integer("period_year").notNull(),
	sourceRef: varchar("source_ref", { length: 128 }),
	creditAmount: numeric("credit_amount", { precision: 14, scale:  2 }).notNull(),
	recognizedAt: timestamp("recognized_at", { withTimezone: true, mode: 'string' }),
	claimedInReturn: boolean("claimed_in_return").default(false),
	notes: text(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("statutory_credits_tenant_period_idx").using("btree", table.tenantId.asc().nullsLast().op("int4_ops"), table.periodYear.asc().nullsLast().op("int4_ops"), table.periodMonth.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "statutory_credits_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "statutory_credits_tenant_platform_id_tenant_platforms_id_fk"
		}),
]);

export const tenantChargeTiers = pgTable("tenant_charge_tiers", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	chargeConfigId: uuid("charge_config_id").notNull(),
	tierMin: numeric("tier_min", { precision: 14, scale:  2 }),
	tierMax: numeric("tier_max", { precision: 14, scale:  2 }),
	rate: numeric({ precision: 10, scale:  4 }),
	flatAmount: numeric("flat_amount", { precision: 14, scale:  2 }),
	priority: integer().default(1).notNull(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("tenant_charge_tiers_charge_config_idx").using("btree", table.chargeConfigId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.chargeConfigId],
			foreignColumns: [tenantChargeConfigs.id],
			name: "tenant_charge_tiers_charge_config_id_tenant_charge_configs_id_f"
		}).onDelete("cascade"),
]);

export const tenantPlatforms = pgTable("tenant_platforms", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	platformId: uuid("platform_id").notNull(),
	status: tenantPlatformStatus().default('draft').notNull(),
	displayName: varchar("display_name", { length: 128 }),
	sellerIdentifier: varchar("seller_identifier", { length: 128 }),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	activatedAt: timestamp("activated_at", { withTimezone: true, mode: 'string' }),
	deactivatedAt: timestamp("deactivated_at", { withTimezone: true, mode: 'string' }),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("tenant_platforms_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("tenant_platforms_tenant_platform_key").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops"), table.platformId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "tenant_platforms_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.platformId],
			foreignColumns: [platforms.id],
			name: "tenant_platforms_platform_id_platforms_id_fk"
		}),
]);

export const tenantMembers = pgTable("tenant_members", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	userId: uuid("user_id").notNull(),
	role: userRole().default('viewer').notNull(),
	invitedBy: uuid("invited_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("tenant_members_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("tenant_members_tenant_user_key").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops"), table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "tenant_members_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "tenant_members_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.invitedBy],
			foreignColumns: [users.id],
			name: "tenant_members_invited_by_users_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: varchar({ length: 256 }).notNull(),
	fullName: varchar("full_name", { length: 256 }),
	phoneNumber: varchar("phone_number", { length: 32 }),
	isActive: boolean("is_active").default(true).notNull(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	lastLoginAt: timestamp("last_login_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	uniqueIndex("users_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
]);

export const tenantChargeConfigs = pgTable("tenant_charge_configs", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantPlatformId: uuid("tenant_platform_id").notNull(),
	chargeType: chargeType("charge_type").notNull(),
	calculationMethod: chargeCalculationMethod("calculation_method").default('percentage').notNull(),
	chargeScope: chargeScope("charge_scope").default('order').notNull(),
	productCategory: varchar("product_category", { length: 256 }),
	productSubCategory: varchar("product_sub_category", { length: 256 }),
	fulfillmentChannel: fulfillmentChannel("fulfillment_channel"),
	shippingZone: shippingZone("shipping_zone"),
	region: varchar({ length: 128 }),
	minWeightGrams: numeric("min_weight_grams", { precision: 10, scale:  2 }),
	maxWeightGrams: numeric("max_weight_grams", { precision: 10, scale:  2 }),
	rate: numeric({ precision: 10, scale:  4 }),
	flatAmount: numeric("flat_amount", { precision: 14, scale:  2 }),
	minAmount: numeric("min_amount", { precision: 14, scale:  2 }),
	maxAmount: numeric("max_amount", { precision: 14, scale:  2 }),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	version: integer().default(1).notNull(),
	effectiveFrom: timestamp("effective_from", { withTimezone: true, mode: 'string' }).notNull(),
	effectiveTo: timestamp("effective_to", { withTimezone: true, mode: 'string' }),
	isActive: boolean("is_active").default(true).notNull(),
	metadata: jsonb(),
	notes: text(),
	createdBy: uuid("created_by"),
	updatedBy: uuid("updated_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("tenant_charge_configs_fulfillment_idx").using("btree", table.tenantPlatformId.asc().nullsLast().op("uuid_ops"), table.fulfillmentChannel.asc().nullsLast().op("enum_ops")),
	index("tenant_charge_configs_product_category_idx").using("btree", table.tenantPlatformId.asc().nullsLast().op("uuid_ops"), table.productCategory.asc().nullsLast().op("text_ops")),
	index("tenant_charge_configs_shipping_zone_idx").using("btree", table.shippingZone.asc().nullsLast().op("enum_ops")),
	index("tenant_charge_configs_tenant_platform_idx").using("btree", table.tenantPlatformId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("tenant_charge_configs_unique_version").using("btree", table.tenantPlatformId.asc().nullsLast().op("int4_ops"), table.chargeType.asc().nullsLast().op("enum_ops"), table.version.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "tenant_charge_configs_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "tenant_charge_configs_created_by_users_id_fk"
		}),
	foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [users.id],
			name: "tenant_charge_configs_updated_by_users_id_fk"
		}),
]);

export const profitabilitySnapshots = pgTable("profitability_snapshots", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	tenantPlatformId: uuid("tenant_platform_id"),
	platformId: uuid("platform_id"),
	orderId: uuid("order_id"),
	reconciliationRunId: uuid("reconciliation_run_id"),
	calculationSource: financialSource("calculation_source").default('calculated').notNull(),
	productCategory: varchar("product_category", { length: 256 }),
	fulfillmentChannel: fulfillmentChannel("fulfillment_channel"),
	campaignIdentifier: varchar("campaign_identifier", { length: 128 }),
	segmentKey: varchar("segment_key", { length: 128 }),
	periodStart: timestamp("period_start", { withTimezone: true, mode: 'string' }),
	periodEnd: timestamp("period_end", { withTimezone: true, mode: 'string' }),
	computedByJobId: varchar("computed_by_job_id", { length: 128 }),
	totalRevenue: numeric("total_revenue", { precision: 14, scale:  2 }).notNull(),
	totalDiscounts: numeric("total_discounts", { precision: 14, scale:  2 }).default('0'),
	totalFeesBeforeTax: numeric("total_fees_before_tax", { precision: 14, scale:  2 }).default('0'),
	feeGstAmount: numeric("fee_gst_amount", { precision: 14, scale:  2 }).default('0'),
	shippingCost: numeric("shipping_cost", { precision: 14, scale:  2 }).default('0'),
	cogs: numeric({ precision: 14, scale:  2 }).default('0'),
	adSpend: numeric("ad_spend", { precision: 14, scale:  2 }).default('0'),
	otherCosts: numeric("other_costs", { precision: 14, scale:  2 }).default('0'),
	totalCost: numeric("total_cost", { precision: 14, scale:  2 }).notNull(),
	netProfit: numeric("net_profit", { precision: 14, scale:  2 }).notNull(),
	profitMarginPercent: numeric("profit_margin_percent", { precision: 7, scale:  4 }).notNull(),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	calculatedAt: timestamp("calculated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	computedAt: timestamp("computed_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("profitability_snapshots_campaign_idx").using("btree", table.campaignIdentifier.asc().nullsLast().op("text_ops")),
	index("profitability_snapshots_order_idx").using("btree", table.orderId.asc().nullsLast().op("uuid_ops")),
	index("profitability_snapshots_period_idx").using("btree", table.periodStart.asc().nullsLast().op("timestamptz_ops"), table.periodEnd.asc().nullsLast().op("timestamptz_ops")),
	index("profitability_snapshots_run_idx").using("btree", table.reconciliationRunId.asc().nullsLast().op("uuid_ops")),
	index("profitability_snapshots_segment_idx").using("btree", table.segmentKey.asc().nullsLast().op("text_ops")),
	index("profitability_snapshots_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("profitability_snapshots_tenant_platform_idx").using("btree", table.tenantPlatformId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "profitability_snapshots_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.platformId],
			foreignColumns: [platforms.id],
			name: "profitability_snapshots_platform_id_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "profitability_snapshots_order_id_orders_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "profitability_snapshots_tenant_platform_id_tenant_platforms_id_"
		}),
	foreignKey({
			columns: [table.reconciliationRunId],
			foreignColumns: [reconciliationRuns.id],
			name: "profitability_snapshots_reconciliation_run_id_reconciliation_ru"
		}),
]);

export const tenants = pgTable("tenants", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 256 }).notNull(),
	slug: varchar({ length: 128 }).notNull(),
	status: tenantStatus().default('active').notNull(),
	industry: varchar({ length: 128 }),
	gstNumber: varchar("gst_number", { length: 32 }),
	gstin: varchar({ length: 15 }),
	panNumber: varchar("pan_number", { length: 10 }),
	timezone: varchar({ length: 64 }).default('Asia/Kolkata').notNull(),
	currency: varchar({ length: 3 }).default('INR').notNull(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	uniqueIndex("tenants_slug_key").using("btree", table.slug.asc().nullsLast().op("text_ops")),
]);

export const reconciliationRuns = pgTable("reconciliation_runs", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	tenantPlatformId: uuid("tenant_platform_id"),
	dataUploadBatchId: uuid("data_upload_batch_id"),
	triggeredBy: uuid("triggered_by"),
	status: reconciliationStatus().default('manual_review').notNull(),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
	summary: jsonb(),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("reconciliation_runs_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "reconciliation_runs_tenant_id_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.tenantPlatformId],
			foreignColumns: [tenantPlatforms.id],
			name: "reconciliation_runs_tenant_platform_id_tenant_platforms_id_fk"
		}),
	foreignKey({
			columns: [table.triggeredBy],
			foreignColumns: [users.id],
			name: "reconciliation_runs_triggered_by_users_id_fk"
		}),
	foreignKey({
			columns: [table.dataUploadBatchId],
			foreignColumns: [dataUploadBatches.id],
			name: "reconciliation_runs_data_upload_batch_id_data_upload_batches_id"
		}),
]);

export const ordersInRaw = raw.table("orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	dataUploadBatchId: uuid("data_upload_batch_id").notNull(),
	rowNumber: integer("row_number").notNull(),
	payload: jsonb().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("raw_orders_batch_row_idx").using("btree", table.dataUploadBatchId.asc().nullsLast().op("int4_ops"), table.rowNumber.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "orders_tenant_id_tenants_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.dataUploadBatchId],
			foreignColumns: [dataUploadBatches.id],
			name: "orders_data_upload_batch_id_data_upload_batches_id_fk"
		}).onDelete("cascade"),
]);

export const ordersProcessingLogsInRaw = raw.table("orders_processing_logs", {
	dataUploadBatchId: uuid("data_upload_batch_id"),
	tenantId: uuid("tenant_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	rowsLoaded: bigint("rows_loaded", { mode: "number" }),
	reportedRowCount: integer("reported_row_count"),
	status: dataUploadStatus(),
	processingStartedAt: timestamp("processing_started_at", { withTimezone: true, mode: 'string' }),
	processingCompletedAt: timestamp("processing_completed_at", { withTimezone: true, mode: 'string' }),
	lastRowCreatedAt: timestamp("last_row_created_at", { withTimezone: true, mode: 'string' }),
	processedAt: timestamp("processed_at", { withTimezone: true, mode: 'string' }),
	dbtInvocationId: text("dbt_invocation_id"),
	triggeredBy: text("triggered_by"),
	errorMessage: text("error_message").default('none'),
	additionalInfo: jsonb("additional_info"),
});

export const shopifyOrdersInRaw = raw.table("shopify_orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	dataUploadBatchId: uuid("data_upload_batch_id").notNull(),
	rowNumber: integer("row_number").notNull(),
	name: text(),
	email: text(),
	financialStatus: text("financial_status"),
	paidAt: text("paid_at"),
	fulfillmentStatus: text("fulfillment_status"),
	fulfilledAt: text("fulfilled_at"),
	acceptsMarketing: text("accepts_marketing"),
	currency: text(),
	subtotal: text(),
	shipping: text(),
	taxes: text(),
	total: text(),
	discountCode: text("discount_code"),
	discountAmount: text("discount_amount"),
	shippingMethod: text("shipping_method"),
	orderCreatedAt: text("order_created_at"),
	lineitemQuantity: text("lineitem_quantity"),
	lineitemName: text("lineitem_name"),
	lineitemPrice: text("lineitem_price"),
	lineitemCompareAtPrice: text("lineitem_compare_at_price"),
	lineitemSku: text("lineitem_sku"),
	lineitemRequiresShipping: text("lineitem_requires_shipping"),
	lineitemTaxable: text("lineitem_taxable"),
	lineitemFulfillmentStatus: text("lineitem_fulfillment_status"),
	billingName: text("billing_name"),
	billingStreet: text("billing_street"),
	billingAddress1: text("billing_address1"),
	billingAddress2: text("billing_address2"),
	billingCompany: text("billing_company"),
	billingCity: text("billing_city"),
	billingZip: text("billing_zip"),
	billingProvince: text("billing_province"),
	billingCountry: text("billing_country"),
	billingPhone: text("billing_phone"),
	shippingName: text("shipping_name"),
	shippingStreet: text("shipping_street"),
	shippingAddress1: text("shipping_address1"),
	shippingAddress2: text("shipping_address2"),
	shippingCompany: text("shipping_company"),
	shippingCity: text("shipping_city"),
	shippingZip: text("shipping_zip"),
	shippingProvince: text("shipping_province"),
	shippingCountry: text("shipping_country"),
	shippingPhone: text("shipping_phone"),
	notes: text(),
	noteAttributes: text("note_attributes"),
	cancelledAt: text("cancelled_at"),
	paymentMethod: text("payment_method"),
	paymentReference: text("payment_reference"),
	refundedAmount: text("refunded_amount"),
	vendor: text(),
	outstandingBalance: text("outstanding_balance"),
	employee: text(),
	location: text(),
	deviceId: text("device_id"),
	shopifyOrderId: text("shopify_order_id"),
	tags: text(),
	riskLevel: text("risk_level"),
	source: text(),
	lineitemDiscount: text("lineitem_discount"),
	tax1Name: text("tax_1_name"),
	tax1Value: text("tax_1_value"),
	tax2Name: text("tax_2_name"),
	tax2Value: text("tax_2_value"),
	tax3Name: text("tax_3_name"),
	tax3Value: text("tax_3_value"),
	tax4Name: text("tax_4_name"),
	tax4Value: text("tax_4_value"),
	tax5Name: text("tax_5_name"),
	tax5Value: text("tax_5_value"),
	phone: text(),
	receiptNumber: text("receipt_number"),
	duties: text(),
	billingProvinceName: text("billing_province_name"),
	shippingProvinceName: text("shipping_province_name"),
	paymentId: text("payment_id"),
	paymentTermsName: text("payment_terms_name"),
	nextPaymentDueAt: text("next_payment_due_at"),
	paymentReferences: text("payment_references"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("raw_shopify_orders_batch_row_idx").using("btree", table.dataUploadBatchId.asc().nullsLast().op("int4_ops"), table.rowNumber.asc().nullsLast().op("int4_ops")),
	index("raw_shopify_orders_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "shopify_orders_tenant_id_tenants_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.dataUploadBatchId],
			foreignColumns: [dataUploadBatches.id],
			name: "shopify_orders_data_upload_batch_id_data_upload_batches_id_fk"
		}).onDelete("cascade"),
]);
