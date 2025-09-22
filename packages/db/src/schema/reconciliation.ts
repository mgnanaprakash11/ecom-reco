import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "owner",
  "admin",
  "analyst",
  "viewer",
]);

export const tenantStatusEnum = pgEnum("tenant_status", [
  "active",
  "inactive",
  "suspended",
]);

export const tenantPlatformStatusEnum = pgEnum("tenant_platform_status", [
  "draft",
  "active",
  "disabled",
]);

export const chargeCalculationMethodEnum = pgEnum("charge_calculation_method", [
  "percentage",
  "flat",
  "tiered",
  "hybrid",
]);

export const chargeScopeEnum = pgEnum("charge_scope", [
  "order",
  "item",
  "shipment",
  "payout",
]);

export const chargeTypeEnum = pgEnum("charge_type", [
  "commission",
  "referral_fee",
  "closing_fee",
  "collection_fee",
  "payment_gateway_fee",
  "cod_fee",
  "shipping_fee",
  "logistics_fee",
  "fulfillment_fee",
  "storage_fee",
  "pick_pack_fee",
  "advertising_fee",
  "promotion_fee",
  "return_processing_fee",
  "reverse_logistics_fee",
  "cancellation_fee",
  "penalty_fee",
  "gst",
  "tcs",
  "tds",
  "discount_subsidy",
  "coupon_subsidy",
  "packaging_cost",
  "cogs",
  "support_fee",
  "settlement_adjustment",
  "other",
]);

export const dataUploadTypeEnum = pgEnum("data_upload_type", [
  "orders",
  "payments",
  "returns",
  "charges",
  "ads",
  "inventory",
  "other",
]);

export const dataUploadSourceEnum = pgEnum("data_upload_source", [
  "manual",
  "api",
  "sftp",
  "integration",
]);

export const dataUploadStatusEnum = pgEnum("data_upload_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
  "partial",
]);

export const fulfillmentStatusEnum = pgEnum("fulfillment_status", [
  "unfulfilled",
  "partially_fulfilled",
  "fulfilled",
  "returned",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "processing",
  "settled",
  "failed",
  "disputed",
  "refunded",
  "on_hold",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "prepaid",
  "cod",
  "upi",
  "net_banking",
  "card",
  "wallet",
  "other",
]);

export const allocationStatusEnum = pgEnum("allocation_status", [
  "pending",
  "allocated",
  "partially_allocated",
  "disputed",
  "released",
]);

export const reconciliationStatusEnum = pgEnum("reconciliation_status", [
  "matched",
  "unmatched",
  "overpaid",
  "underpaid",
  "partial",
  "manual_review",
]);

export const reconciliationReasonEnum = pgEnum("reconciliation_reason", [
  "commission_mismatch",
  "fee_missing",
  "tax_difference",
  "return_pending",
  "payment_delay",
  "rounding",
  "other",
]);

export const financialSourceEnum = pgEnum("financial_source", [
  "calculated",
  "manual",
  "platform_feed",
  "reconciliation",
  "import",
]);

export const costTypeEnum = pgEnum("cost_type", [
  "advertising",
  "shipping",
  "logistics",
  "cogs",
  "packaging",
  "commission",
  "payment_gateway",
  "cod",
  "return_processing",
  "reverse_logistics",
  "penalty",
  "gst",
  "tcs",
  "tds",
  "discount",
  "coupon",
  "promotion",
  "storage",
  "collection_fee",
  "closing_fee",
  "fulfillment_fee",
  "settlement_adjustment",
  "other",
]);

export const tenants = pgTable(
  "tenants",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 128 }).notNull(),
    status: tenantStatusEnum("status").default("active").notNull(),
    industry: varchar("industry", { length: 128 }),
    gstNumber: varchar("gst_number", { length: 32 }),
    timezone: varchar("timezone", { length: 64 }).default("Asia/Kolkata").notNull(),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    slugIdx: uniqueIndex("tenants_slug_key").on(table.slug),
  })
);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 256 }).notNull(),
    fullName: varchar("full_name", { length: 256 }),
    phoneNumber: varchar("phone_number", { length: 32 }),
    isActive: boolean("is_active").default(true).notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_key").on(table.email),
  })
);

export const tenantMembers = pgTable(
  "tenant_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    userId: uuid("user_id").notNull().references(() => users.id),
    role: userRoleEnum("role").default("viewer").notNull(),
    invitedBy: uuid("invited_by").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    tenantUserIdx: uniqueIndex("tenant_members_tenant_user_key").on(
      table.tenantId,
      table.userId
    ),
    tenantIdx: index("tenant_members_tenant_idx").on(table.tenantId),
  })
);

export const platforms = pgTable(
  "platforms",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: varchar("code", { length: 64 }).notNull(),
    name: varchar("name", { length: 128 }).notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true).notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    codeIdx: uniqueIndex("platforms_code_key").on(table.code),
  })
);

export const tenantPlatforms = pgTable(
  "tenant_platforms",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    platformId: uuid("platform_id").notNull().references(() => platforms.id),
    status: tenantPlatformStatusEnum("status").default("draft").notNull(),
    sellerIdentifier: varchar("seller_identifier", { length: 128 }),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    activatedAt: timestamp("activated_at", { withTimezone: true }),
    deactivatedAt: timestamp("deactivated_at", { withTimezone: true }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantPlatformIdx: uniqueIndex("tenant_platforms_tenant_platform_key").on(
      table.tenantId,
      table.platformId
    ),
    tenantIdx: index("tenant_platforms_tenant_idx").on(table.tenantId),
  })
);

export const tenantChargeConfigs = pgTable(
  "tenant_charge_configs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantPlatformId: uuid("tenant_platform_id")
      .notNull()
      .references(() => tenantPlatforms.id),
    chargeType: chargeTypeEnum("charge_type").notNull(),
    calculationMethod: chargeCalculationMethodEnum("calculation_method")
      .default("percentage")
      .notNull(),
    chargeScope: chargeScopeEnum("charge_scope").default("order").notNull(),
    rate: numeric("rate", { precision: 10, scale: 4 }),
    flatAmount: numeric("flat_amount", { precision: 14, scale: 2 }),
    minAmount: numeric("min_amount", { precision: 14, scale: 2 }),
    maxAmount: numeric("max_amount", { precision: 14, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    version: integer("version").default(1).notNull(),
    effectiveFrom: timestamp("effective_from", { withTimezone: true }).notNull(),
    effectiveTo: timestamp("effective_to", { withTimezone: true }),
    isActive: boolean("is_active").default(true).notNull(),
    metadata: jsonb("metadata"),
    notes: text("notes"),
    createdBy: uuid("created_by").references(() => users.id),
    updatedBy: uuid("updated_by").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantChargeVersionIdx: uniqueIndex(
      "tenant_charge_configs_unique_version"
    ).on(table.tenantPlatformId, table.chargeType, table.version),
    tenantPlatformIdx: index("tenant_charge_configs_tenant_platform_idx").on(
      table.tenantPlatformId
    ),
  })
);

export const tenantChargeTiers = pgTable(
  "tenant_charge_tiers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    chargeConfigId: uuid("charge_config_id")
      .notNull()
      .references(() => tenantChargeConfigs.id, { onDelete: "cascade" }),
    tierMin: numeric("tier_min", { precision: 14, scale: 2 }),
    tierMax: numeric("tier_max", { precision: 14, scale: 2 }),
    rate: numeric("rate", { precision: 10, scale: 4 }),
    flatAmount: numeric("flat_amount", { precision: 14, scale: 2 }),
    priority: integer("priority").default(1).notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    chargeConfigIdx: index("tenant_charge_tiers_charge_config_idx").on(
      table.chargeConfigId
    ),
  })
);

export const dataUploadBatches = pgTable(
  "data_upload_batches",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(
      () => tenantPlatforms.id
    ),
    dataType: dataUploadTypeEnum("data_type").notNull(),
    source: dataUploadSourceEnum("source").default("manual").notNull(),
    status: dataUploadStatusEnum("status").default("pending").notNull(),
    fileName: varchar("file_name", { length: 256 }).notNull(),
    filePath: varchar("file_path", { length: 512 }),
    fileChecksum: varchar("file_checksum", { length: 256 }),
    rowCount: integer("row_count"),
    version: integer("version").default(1).notNull(),
    metadata: jsonb("metadata"),
    sourceMetadata: jsonb("source_metadata"),
    processingStartedAt: timestamp("processing_started_at", { withTimezone: true }),
    processingCompletedAt: timestamp("processing_completed_at", { withTimezone: true }),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("data_upload_batches_tenant_idx").on(table.tenantId),
    tenantPlatformIdx: index("data_upload_batches_tenant_platform_idx").on(
      table.tenantPlatformId
    ),
  })
);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id")
      .notNull()
      .references(() => tenantPlatforms.id),
    uploadBatchId: uuid("upload_batch_id")
      .references(() => dataUploadBatches.id),
    externalOrderId: varchar("external_order_id", { length: 128 }).notNull(),
    orderDate: timestamp("order_date", { withTimezone: true }).notNull(),
    orderStatus: orderStatusEnum("order_status").notNull(),
    fulfillmentStatus: fulfillmentStatusEnum("fulfillment_status")
      .default("unfulfilled")
      .notNull(),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    grossAmount: numeric("gross_amount", { precision: 14, scale: 2 }).notNull(),
    discountAmount: numeric("discount_amount", { precision: 14, scale: 2 }).default(
      "0"
    ),
    taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
    shippingAmount: numeric("shipping_amount", { precision: 14, scale: 2 }).default(
      "0"
    ),
    codAmount: numeric("cod_amount", { precision: 14, scale: 2 }),
    netReceivableAmount: numeric("net_receivable_amount", {
      precision: 14,
      scale: 2,
    }),
    buyerName: varchar("buyer_name", { length: 256 }),
    buyerEmail: varchar("buyer_email", { length: 256 }),
    buyerPhone: varchar("buyer_phone", { length: 32 }),
    paymentDueDate: timestamp("payment_due_date", { withTimezone: true }),
    shipmentDate: timestamp("shipment_date", { withTimezone: true }),
    deliveryDate: timestamp("delivery_date", { withTimezone: true }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    returnRequestedAt: timestamp("return_requested_at", { withTimezone: true }),
    metadata: jsonb("metadata"),
    rawPayload: jsonb("raw_payload"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    tenantIdx: index("orders_tenant_idx").on(table.tenantId),
    tenantPlatformIdx: index("orders_tenant_platform_idx").on(
      table.tenantPlatformId
    ),
    orderUniqueIdx: uniqueIndex("orders_tenant_order_key").on(
      table.tenantId,
      table.tenantPlatformId,
      table.externalOrderId
    ),
  })
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id").notNull().references(() => orders.id, {
      onDelete: "cascade",
    }),
    sku: varchar("sku", { length: 128 }),
    itemName: varchar("item_name", { length: 256 }),
    quantity: integer("quantity").default(1).notNull(),
    itemPrice: numeric("item_price", { precision: 14, scale: 2 }).notNull(),
    itemDiscount: numeric("item_discount", { precision: 14, scale: 2 }).default(
      "0"
    ),
    cogsAmount: numeric("cogs_amount", { precision: 14, scale: 2 }),
    gstRate: numeric("gst_rate", { precision: 5, scale: 2 }),
    gstAmount: numeric("gst_amount", { precision: 14, scale: 2 }),
    shippingCharge: numeric("shipping_charge", { precision: 14, scale: 2 }),
    fulfillmentFee: numeric("fulfillment_fee", { precision: 14, scale: 2 }),
    commissionFee: numeric("commission_fee", { precision: 14, scale: 2 }),
    otherCharges: numeric("other_charges", { precision: 14, scale: 2 }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("order_items_order_idx").on(table.orderId),
  })
);

export const orderChargeAllocations = pgTable(
  "order_charge_allocations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id").notNull().references(() => orders.id, {
      onDelete: "cascade",
    }),
    chargeType: chargeTypeEnum("charge_type").notNull(),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    source: financialSourceEnum("source").default("calculated").notNull(),
    chargeConfigId: uuid("charge_config_id").references(
      () => tenantChargeConfigs.id
    ),
    uploadBatchId: uuid("upload_batch_id").references(
      () => dataUploadBatches.id
    ),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("order_charge_allocations_order_idx").on(table.orderId),
    chargeIdx: index("order_charge_allocations_charge_idx").on(
      table.chargeType
    ),
  })
);

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id")
      .notNull()
      .references(() => tenantPlatforms.id),
    uploadBatchId: uuid("upload_batch_id")
      .references(() => dataUploadBatches.id),
    paymentReference: varchar("payment_reference", { length: 128 }).notNull(),
    settlementReference: varchar("settlement_reference", { length: 128 }),
    paymentStatus: paymentStatusEnum("payment_status").notNull(),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    paymentType: varchar("payment_type", { length: 64 }),
    paymentDate: timestamp("payment_date", { withTimezone: true }).notNull(),
    settlementPeriodStart: timestamp("settlement_period_start", {
      withTimezone: true,
    }),
    settlementPeriodEnd: timestamp("settlement_period_end", {
      withTimezone: true,
    }),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    grossAmount: numeric("gross_amount", { precision: 14, scale: 2 }).notNull(),
    feeAmount: numeric("fee_amount", { precision: 14, scale: 2 }).default("0"),
    taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
    adjustmentAmount: numeric("adjustment_amount", {
      precision: 14,
      scale: 2,
    }).default("0"),
    netAmount: numeric("net_amount", { precision: 14, scale: 2 }).notNull(),
    metadata: jsonb("metadata"),
    rawPayload: jsonb("raw_payload"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("payments_tenant_idx").on(table.tenantId),
    tenantPlatformIdx: index("payments_tenant_platform_idx").on(
      table.tenantPlatformId
    ),
    paymentUniqueIdx: uniqueIndex("payments_tenant_payment_key").on(
      table.tenantId,
      table.tenantPlatformId,
      table.paymentReference
    ),
  })
);

export const paymentAdjustments = pgTable(
  "payment_adjustments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    paymentId: uuid("payment_id").notNull().references(() => payments.id, {
      onDelete: "cascade",
    }),
    chargeType: chargeTypeEnum("charge_type").notNull(),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    paymentIdx: index("payment_adjustments_payment_idx").on(table.paymentId),
  })
);

export const paymentOrderAllocations = pgTable(
  "payment_order_allocations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    paymentId: uuid("payment_id").notNull().references(() => payments.id, {
      onDelete: "cascade",
    }),
    orderId: uuid("order_id").references(() => orders.id, {
      onDelete: "set null",
    }),
    allocationStatus: allocationStatusEnum("allocation_status")
      .default("allocated")
      .notNull(),
    allocatedAmount: numeric("allocated_amount", {
      precision: 14,
      scale: 2,
    }).notNull(),
    feeAmount: numeric("fee_amount", { precision: 14, scale: 2 }).default("0"),
    taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
    notes: text("notes"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    paymentIdx: index("payment_order_allocations_payment_idx").on(
      table.paymentId
    ),
    orderIdx: index("payment_order_allocations_order_idx").on(table.orderId),
  })
);

export const reconciliationRuns = pgTable(
  "reconciliation_runs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id")
      .references(() => tenantPlatforms.id),
    dataUploadBatchId: uuid("data_upload_batch_id").references(
      () => dataUploadBatches.id
    ),
    triggeredBy: uuid("triggered_by").references(() => users.id),
    status: reconciliationStatusEnum("status").default("manual_review").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    summary: jsonb("summary"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("reconciliation_runs_tenant_idx").on(table.tenantId),
  })
);

export const reconciliationEntries = pgTable(
  "reconciliation_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    runId: uuid("run_id").notNull().references(() => reconciliationRuns.id, {
      onDelete: "cascade",
    }),
    orderId: uuid("order_id").references(() => orders.id, {
      onDelete: "set null",
    }),
    paymentId: uuid("payment_id").references(() => payments.id, {
      onDelete: "set null",
    }),
    status: reconciliationStatusEnum("status").notNull(),
    reason: reconciliationReasonEnum("reason"),
    varianceAmount: numeric("variance_amount", { precision: 14, scale: 2 }),
    variancePercentage: numeric("variance_percentage", {
      precision: 7,
      scale: 4,
    }),
    pendingAmount: numeric("pending_amount", { precision: 14, scale: 2 }),
    notes: text("notes"),
    details: jsonb("details"),
    resolvedBy: uuid("resolved_by").references(() => users.id),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    runIdx: index("reconciliation_entries_run_idx").on(table.runId),
    statusIdx: index("reconciliation_entries_status_idx").on(table.status),
  })
);

export const costEntries = pgTable(
  "cost_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    orderId: uuid("order_id").references(() => orders.id, {
      onDelete: "set null",
    }),
    paymentId: uuid("payment_id").references(() => payments.id, {
      onDelete: "set null",
    }),
    costType: costTypeEnum("cost_type").notNull(),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    incurredAt: timestamp("incurred_at", { withTimezone: true }),
    source: financialSourceEnum("source").default("manual").notNull(),
    chargeConfigId: uuid("charge_config_id").references(
      () => tenantChargeConfigs.id
    ),
    uploadBatchId: uuid("upload_batch_id").references(
      () => dataUploadBatches.id
    ),
    metadata: jsonb("metadata"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("cost_entries_tenant_idx").on(table.tenantId),
    costTypeIdx: index("cost_entries_type_idx").on(table.costType),
  })
);

export const profitabilitySnapshots = pgTable(
  "profitability_snapshots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    orderId: uuid("order_id").references(() => orders.id, {
      onDelete: "set null",
    }),
    reconciliationRunId: uuid("reconciliation_run_id").references(
      () => reconciliationRuns.id
    ),
    calculationSource: financialSourceEnum("calculation_source")
      .default("calculated")
      .notNull(),
    totalRevenue: numeric("total_revenue", { precision: 14, scale: 2 }).notNull(),
    totalCost: numeric("total_cost", { precision: 14, scale: 2 }).notNull(),
    netProfit: numeric("net_profit", { precision: 14, scale: 2 }).notNull(),
    profitMarginPercent: numeric("profit_margin_percent", {
      precision: 7,
      scale: 4,
    }).notNull(),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    calculatedAt: timestamp("calculated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("profitability_snapshots_tenant_idx").on(table.tenantId),
    orderIdx: index("profitability_snapshots_order_idx").on(table.orderId),
  })
);
