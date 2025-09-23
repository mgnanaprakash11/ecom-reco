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

// ===== Existing enums from your schema (unchanged) =====
export const userRoleEnum = pgEnum("user_role", [
  "owner",
  "admin",
  "member",
]);

export const tenantStatusEnum = pgEnum("tenant_status", [
  "active",
  "suspended",
  "closed",
]);

export const tenantPlatformStatusEnum = pgEnum("tenant_platform_status", [
  "active",
  "inactive",
]);

export const chargeCalculationMethodEnum = pgEnum(
  "charge_calculation_method",
  ["percentage", "flat", "slab", "tiered"]
);

export const chargeScopeEnum = pgEnum("charge_scope", [
  "order",
  "item",
  "shipment",
  "payment",
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
  "order_items",
  "returns",
  "payments",
  "settlements",
  "rate_cards",
  "costs",
  "other",
]);

export const dataUploadSourceEnum = pgEnum("data_upload_source", [
  "manual_csv",
  "platform_api",
  "s3_webhook",
  "scheduled",
  "other",
]);

export const dataUploadStatusEnum = pgEnum("data_upload_status", [
  "received",
  "parsing",
  "parsed",
  "loaded",
  "failed",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "created",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
]);

export const fulfillmentStatusEnum = pgEnum("fulfillment_status", [
  "unfulfilled",
  "partially_fulfilled",
  "fulfilled",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "captured",
  "refunded",
  "chargeback",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "prepaid",
  "cod",
  "wallet",
  "upi",
  "netbanking",
  "card",
]);

export const allocationStatusEnum = pgEnum("allocation_status", [
  "unallocated",
  "partially_allocated",
  "allocated",
]);

export const reconciliationStatusEnum = pgEnum("reconciliation_status", [
  "unreconciled",
  "partial",
  "reconciled",
  "overpaid",
  "underpaid",
  "mismatch",
]);

export const reconciliationReasonEnum = pgEnum("reconciliation_reason", [
  "fee_change",
  "policy_change",
  "data_missing",
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
  "manufacturing",
  "packaging",
  "freight_inward",
  "freight_outward",
  "overhead",
  "marketing",
  "salary",
  "other",
]);

export const returnTypeEnum = pgEnum("return_type", [
  "customer_return",
  "rto",
  "ndr",
  "cancellation",
]);

export const returnStatusEnum = pgEnum("return_status", [
  "initiated",
  "pickup_scheduled",
  "in_transit",
  "received",
  "qc_passed",
  "qc_failed",
  "refunded",
  "closed",
]);

export const returnReasonEnum = pgEnum("return_reason", [
  "size_issue",
  "quality_issue",
  "damaged",
  "wrong_item",
  "customer_remorse",
  "undelivered",
  "address_issue",
  "other",
]);

export const fulfillmentChannelEnum = pgEnum("fulfillment_channel", [
  "self_ship",
  "easy_ship",
  "fba",
  "fbf",
  "third_party",
]);

export const shippingZoneEnum = pgEnum("shipping_zone", [
  "local",
  "zonal",
  "national",
  "special",
]);

export const ledgerEntryTypeEnum = pgEnum("ledger_entry_type", [
  "sale",
  "fee",
  "tax",
  "refund",
  "adjustment",
  "payout",
  "cost",
  "other",
]);

export const taxSectionEnum = pgEnum("tax_section", [
  "none",
  "sec_52_tcs",
  "sec_194o_tds",
]);

export const payoutScheduleEnum = pgEnum("payout_schedule", [
  "t_plus_2",
  "weekly",
  "fortnightly",
  "other",
]);

// ===== New enums for India-specific fidelity =====
export const statCreditTypeEnum = pgEnum("stat_credit_type", [
  "tcs_gst",
  "tds_194o",
  "other",
]);

export const logiDisputeTypeEnum = pgEnum("logi_dispute_type", [
  "weight",
  "rto",
  "ndr",
  "damage",
  "lost",
  "other",
]);

export const logiDisputeStatusEnum = pgEnum("logi_dispute_status", [
  "open",
  "approved",
  "rejected",
  "partial",
  "withdrawn",
]);

export const claimTypeEnum = pgEnum("claim_type", [
  "safe_t",
  "penalty_appeal",
  "lost_in_transit",
  "qc_damage",
  "other",
]);

export const claimStatusEnum = pgEnum("claim_status", [
  "draft",
  "filed",
  "approved",
  "rejected",
  "partial",
  "expired",
]);

export const promotionSourceEnum = pgEnum("promotion_source", [
  "seller",
  "platform",
  "shared",
]);

export const pgDisputeStatusEnum = pgEnum("pg_dispute_status", [
  "open",
  "won",
  "lost",
  "withdrawn",
]);

// ===== Tenancy & platforms =====
export const tenants = pgTable(
  "tenants",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 128 }).notNull(),
    gstin: varchar("gstin", { length: 15 }),
    pan: varchar("pan", { length: 10 }),
    status: tenantStatusEnum("status").default("active").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantNameIdx: uniqueIndex("tenants_name_idx").on(table.name),
  })
);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 256 }).notNull(),
    name: varchar("name", { length: 128 }),
    role: userRoleEnum("role").default("member").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userEmailIdx: uniqueIndex("users_email_idx").on(table.email),
  })
);

export const tenantMembers = pgTable(
  "tenant_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    userId: uuid("user_id").notNull().references(() => users.id),
    role: userRoleEnum("role").default("member").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantUserIdx: uniqueIndex("tenant_user_idx").on(table.tenantId, table.userId),
  })
);

export const platforms = pgTable(
  "platforms",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: varchar("code", { length: 32 }).notNull(), // amazon, flipkart, myntra, ajio, shopify
    name: varchar("name", { length: 64 }).notNull(),
    payoutSchedule: payoutScheduleEnum("payout_schedule"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    platformCodeIdx: uniqueIndex("platforms_code_idx").on(table.code),
  })
);

export const tenantPlatforms = pgTable(
  "tenant_platforms",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    platformId: uuid("platform_id").notNull().references(() => platforms.id),
    displayName: varchar("display_name", { length: 128 }),
    sellerId: varchar("seller_id", { length: 128 }), // marketplace seller id / shop domain
    status: tenantPlatformStatusEnum("status").default("active").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantPlatformUnique: uniqueIndex("tenant_platform_unique").on(
      table.tenantId,
      table.platformId,
      table.sellerId
    ),
  })
);

// ===== Rate cards / charge configs =====
export const tenantChargeConfigs = pgTable(
  "tenant_charge_configs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantPlatformId: uuid("tenant_platform_id")
      .notNull()
      .references(() => tenantPlatforms.id),
    chargeType: chargeTypeEnum("charge_type").notNull(),
    calculationMethod: chargeCalculationMethodEnum("calculation_method").notNull(),
    scope: chargeScopeEnum("scope").notNull(),
    productCategory: varchar("product_category", { length: 256 }),
    productSubCategory: varchar("product_sub_category", { length: 256 }),
    fulfillmentChannel: fulfillmentChannelEnum("fulfillment_channel"),
    shippingZone: shippingZoneEnum("shipping_zone"),
    region: varchar("region", { length: 128 }),
    minWeightGrams: numeric("min_weight_grams", { precision: 10, scale: 2 }),
    maxWeightGrams: numeric("max_weight_grams", { precision: 10, scale: 2 }),
    rate: numeric("rate", { precision: 10, scale: 4 }),
    flatAmount: numeric("flat_amount", { precision: 14, scale: 2 }),
    minAmount: numeric("min_amount", { precision: 14, scale: 2 }),
    maxAmount: numeric("max_amount", { precision: 14, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    version: integer("version").default(1).notNull(),
    effectiveFrom: timestamp("effective_from", { withTimezone: true }).notNull(),
    effectiveTo: timestamp("effective_to", { withTimezone: true }),
    notes: text("notes"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantChargeCfgIdx: index("tenant_charge_configs_idx").on(
      table.tenantPlatformId,
      table.chargeType,
      table.calculationMethod
    ),
    productCategoryIdx: index(
      "tenant_charge_configs_product_category_idx"
    ).on(table.tenantPlatformId, table.productCategory),
    fulfillmentChannelIdx: index(
      "tenant_charge_configs_fulfillment_idx"
    ).on(table.tenantPlatformId, table.fulfillmentChannel),
    shippingZoneIdx: index(
      "tenant_charge_configs_shipping_zone_idx"
    ).on(table.shippingZone),
  })
);

export const tenantChargeTiers = pgTable(
  "tenant_charge_tiers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    chargeConfigId: uuid("charge_config_id")
      .notNull()
      .references(() => tenantChargeConfigs.id, { onDelete: "cascade" }),
    tierMin: numeric("tier_min", { precision: 14, scale: 4 }),
    tierMax: numeric("tier_max", { precision: 14, scale: 4 }),
    tierRate: numeric("tier_rate", { precision: 10, scale: 4 }),
    flatAmount: numeric("flat_amount", { precision: 14, scale: 2 }),
    notes: text("notes"),
  },
  (table) => ({
    chargeTierIdx: index("tenant_charge_tiers_cfg_idx").on(
      table.chargeConfigId
    ),
  })
);

// ===== Upload batches for raw files =====
export const dataUploadBatches = pgTable(
  "data_upload_batches",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(() => tenantPlatforms.id),
    uploadType: dataUploadTypeEnum("upload_type").notNull(),
    source: dataUploadSourceEnum("source").notNull(),
    status: dataUploadStatusEnum("status").default("received").notNull(),
    fileName: varchar("file_name", { length: 256 }),
    fileUrl: text("file_url"),
    rawPayload: jsonb("raw_payload"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    uploadIdx: index("data_upload_batches_idx").on(
      table.tenantId,
      table.uploadType,
      table.status
    ),
  })
);

// ===== Orders & Items =====
export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id")
      .notNull()
      .references(() => tenantPlatforms.id),
    uploadBatchId: uuid("upload_batch_id").references(() => dataUploadBatches.id),
    externalOrderId: varchar("external_order_id", { length: 128 }).notNull(),
    orderDate: timestamp("order_date", { withTimezone: true }).notNull(),
    orderStatus: orderStatusEnum("order_status").notNull(),
    fulfillmentStatus: fulfillmentStatusEnum("fulfillment_status")
      .default("unfulfilled")
      .notNull(),
    paymentStatus: paymentStatusEnum("payment_status").default("pending").notNull(),
    paymentMethod: paymentMethodEnum("payment_method"),

    // Order-level amounts (currency: INR default)
    grossAmount: numeric("gross_amount", { precision: 14, scale: 2 }).notNull(),
    discountAmount: numeric("discount_amount", { precision: 14, scale: 2 }).default("0"),
    taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
    shippingAmount: numeric("shipping_amount", { precision: 14, scale: 2 }).default("0"),
    codAmount: numeric("cod_amount", { precision: 14, scale: 2 }),
    netReceivableAmount: numeric("net_receivable_amount", { precision: 14, scale: 2 }),

    // Buyer & shipping
    buyerName: varchar("buyer_name", { length: 256 }),
    buyerEmail: varchar("buyer_email", { length: 256 }),
    buyerPhone: varchar("buyer_phone", { length: 32 }),
    shipToName: varchar("ship_to_name", { length: 256 }),
    shipToAddress1: text("ship_to_address1"),
    shipToAddress2: text("ship_to_address2"),
    shipToCity: varchar("ship_to_city", { length: 128 }),
    shipToState: varchar("ship_to_state", { length: 64 }),
    shipToPincode: varchar("ship_to_pincode", { length: 12 }),
    shipToCountry: varchar("ship_to_country", { length: 64 }),

    // Existing flags
    fulfillmentChannel: fulfillmentChannelEnum("fulfillment_channel"),
    shippingZone: shippingZoneEnum("shipping_zone"),

    // Logistics & weights (NEW)
    awbNumber: varchar("awb_number", { length: 64 }),
    carrierName: varchar("carrier_name", { length: 64 }),
    actualWeightGrams: numeric("actual_weight_g", { precision: 10, scale: 2 }),
    volumetricWeightGrams: numeric("volumetric_weight_g", { precision: 10, scale: 2 }),
    distanceZone: varchar("distance_zone", { length: 32 }),

    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    notes: text("notes"),
    metadata: jsonb("metadata"),
    rawPayload: jsonb("raw_payload"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    orderUnique: uniqueIndex("orders_unique_idx").on(
      table.tenantPlatformId,
      table.externalOrderId
    ),
    orderDateIdx: index("orders_date_idx").on(table.orderDate),
  })
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    sku: varchar("sku", { length: 128 }),
    itemName: varchar("item_name", { length: 256 }),
    quantity: integer("quantity").default(1).notNull(),
    itemPrice: numeric("item_price", { precision: 14, scale: 2 }).notNull(),
    itemDiscount: numeric("item_discount", { precision: 14, scale: 2 }).default("0"),
    cogsAmount: numeric("cogs_amount", { precision: 14, scale: 2 }),

    // Tax detail per line (NEW)
    hsnCode: varchar("hsn_code", { length: 8 }),
    cgstAmount: numeric("cgst_amount", { precision: 14, scale: 2 }).default("0"),
    sgstAmount: numeric("sgst_amount", { precision: 14, scale: 2 }).default("0"),
    igstAmount: numeric("igst_amount", { precision: 14, scale: 2 }).default("0"),

    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    orderItemIdx: index("order_items_order_idx").on(table.orderId),
    orderSkuIdx: index("order_items_sku_idx").on(table.sku),
  })
);

export const orderChargeAllocations = pgTable(
  "order_charge_allocations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    chargeType: chargeTypeEnum("charge_type").notNull(),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    source: financialSourceEnum("source").default("calculated").notNull(),
    chargeConfigId: uuid("charge_config_id").references(() => tenantChargeConfigs.id),
    uploadBatchId: uuid("upload_batch_id").references(() => dataUploadBatches.id),

    // Promotion funding split (NEW)
    promotionSource: promotionSourceEnum("promotion_source"),

    notes: text("notes"),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    orderChargeIdx: index("order_charge_allocations_order_idx").on(table.orderId, table.chargeType),
  })
);

export const orderReturns = pgTable(
  "order_returns",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    orderItemId: uuid("order_item_id").references(() => orderItems.id, { onDelete: "set null" }),
    tenantPlatformId: uuid("tenant_platform_id").references(() => tenantPlatforms.id),
    uploadBatchId: uuid("upload_batch_id").references(() => dataUploadBatches.id),
    paymentId: uuid("payment_id").references(() => payments.id, { onDelete: "set null" }),

    returnType: returnTypeEnum("return_type").default("customer_return").notNull(),
    returnStatus: returnStatusEnum("return_status").default("initiated").notNull(),
    returnReason: returnReasonEnum("return_reason"),

    referenceNumber: varchar("reference_number", { length: 128 }),
    rmaNumber: varchar("rma_number", { length: 128 }),
    initiatedAt: timestamp("initiated_at", { withTimezone: true }),
    pickupScheduledAt: timestamp("pickup_scheduled_at", { withTimezone: true }),
    receivedAt: timestamp("received_at", { withTimezone: true }),
    closedAt: timestamp("closed_at", { withTimezone: true }),

    customerRefundAmount: numeric("customer_refund_amount", { precision: 14, scale: 2 }),
    platformRefundAmount: numeric("platform_refund_amount", { precision: 14, scale: 2 }),
    forwardShippingFee: numeric("forward_shipping_fee", { precision: 14, scale: 2 }),
    reverseShippingFee: numeric("reverse_shipping_fee", { precision: 14, scale: 2 }),
    restockingFee: numeric("restocking_fee", { precision: 14, scale: 2 }),
    penaltyFee: numeric("penalty_fee", { precision: 14, scale: 2 }),

    // Exchanges & partials (NEW)
    exchangeOrderId: uuid("exchange_order_id").references(() => orders.id),
    refundRatio: numeric("refund_ratio", { precision: 6, scale: 4 }),

    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    notes: text("notes"),
    metadata: jsonb("metadata"),
    rawPayload: jsonb("raw_payload"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    orderReturnIdx: index("order_returns_order_idx").on(table.orderId, table.returnStatus),
  })
);

// ===== Payments & allocations =====
export const payments = pgTable(
  "payments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(() => tenantPlatforms.id),
    uploadBatchId: uuid("upload_batch_id").references(() => dataUploadBatches.id),

    settlementReference: varchar("settlement_reference", { length: 128 }),
    payoutDate: timestamp("payout_date", { withTimezone: true }),
    grossSettlementAmount: numeric("gross_settlement_amount", { precision: 14, scale: 2 }),
    tcsAmount: numeric("tcs_amount", { precision: 14, scale: 2 }).default("0"),
    tdsAmount: numeric("tds_amount", { precision: 14, scale: 2 }).default("0"),
    otherAdjustments: numeric("other_adjustments", { precision: 14, scale: 2 }).default("0"),

    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    rawPayload: jsonb("raw_payload"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    paymentsIdx: index("payments_idx").on(table.tenantId, table.payoutDate),
  })
);

export const paymentAdjustments = pgTable(
  "payment_adjustments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    paymentId: uuid("payment_id").notNull().references(() => payments.id, { onDelete: "cascade" }),
    type: ledgerEntryTypeEnum("type").notNull(),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
    description: text("description"),
    rawPayload: jsonb("raw_payload"),
  },
  (table) => ({
    paymentAdjIdx: index("payment_adjustments_idx").on(table.paymentId, table.type),
  })
);

export const paymentOrderAllocations = pgTable(
  "payment_order_allocations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    paymentId: uuid("payment_id").notNull().references(() => payments.id, { onDelete: "cascade" }),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    allocatedAmount: numeric("allocated_amount", { precision: 14, scale: 2 }).notNull(),
    allocationStatus: allocationStatusEnum("allocation_status").default("allocated").notNull(),
  },
  (table) => ({
    payOrdAllocIdx: index("payment_order_allocations_idx").on(table.paymentId, table.orderId),
  })
);

// ===== Ledger & reconciliation =====
export const ledgerEntries = pgTable(
  "ledger_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(() => tenantPlatforms.id),

    entryType: ledgerEntryTypeEnum("entry_type").notNull(),
    orderId: uuid("order_id").references(() => orders.id),
    paymentId: uuid("payment_id").references(() => payments.id),

    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),

    taxSection: taxSectionEnum("tax_section").default("none").notNull(),
    notes: text("notes"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    ledgerIdx: index("ledger_entries_idx").on(table.tenantId, table.entryType, table.createdAt),
  })
);

export const reconciliationRuns = pgTable(
  "reconciliation_runs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(() => tenantPlatforms.id),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    status: reconciliationStatusEnum("status").default("unreconciled").notNull(),
    reason: reconciliationReasonEnum("reason"),
    notes: text("notes"),
    params: jsonb("params"),
  },
  (table) => ({
    reconRunIdx: index("reconciliation_runs_idx").on(table.tenantId, table.startedAt),
  })
);

export const reconciliationEntries = pgTable(
  "reconciliation_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    runId: uuid("run_id").notNull().references(() => reconciliationRuns.id, { onDelete: "cascade" }),
    orderId: uuid("order_id").references(() => orders.id),
    paymentId: uuid("payment_id").references(() => payments.id),
    status: reconciliationStatusEnum("status").notNull(),
    reason: reconciliationReasonEnum("reason"),
    expectedAmount: numeric("expected_amount", { precision: 14, scale: 2 }),
    actualAmount: numeric("actual_amount", { precision: 14, scale: 2 }),
    deltaAmount: numeric("delta_amount", { precision: 14, scale: 2 }),
    details: jsonb("details"),
  },
  (table) => ({
    reconEntryIdx: index("reconciliation_entries_idx").on(table.runId, table.status),
  })
);

// ===== Costing & profitability =====
export const costEntries = pgTable(
  "cost_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    orderId: uuid("order_id").references(() => orders.id),
    orderItemId: uuid("order_item_id").references(() => orderItems.id),
    costType: costTypeEnum("cost_type").notNull(),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    costIdx: index("cost_entries_idx").on(table.tenantId, table.costType),
  })
);

export const profitabilitySnapshots = pgTable(
  "profitability_snapshots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    orderId: uuid("order_id").references(() => orders.id),
    grossRevenue: numeric("gross_revenue", { precision: 14, scale: 2 }),
    totalDiscounts: numeric("total_discounts", { precision: 14, scale: 2 }),
    totalFeesBeforeTax: numeric("total_fees_before_tax", { precision: 14, scale: 2 }),
    feeGstAmount: numeric("fee_gst_amount", { precision: 14, scale: 2 }),
    shippingCost: numeric("shipping_cost", { precision: 14, scale: 2 }),
    cogs: numeric("cogs", { precision: 14, scale: 2 }),
    adSpend: numeric("ad_spend", { precision: 14, scale: 2 }),
    otherCosts: numeric("other_costs", { precision: 14, scale: 2 }),
    netProfit: numeric("net_profit", { precision: 14, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    computedAt: timestamp("computed_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    profitIdx: index("profitability_snapshots_idx").on(table.tenantId, table.computedAt),
  })
);

// ===== NEW: Statutory credits (TCS/TDS), Logistics disputes, Platform claims, Settlement lines, PG disputes =====
export const statutoryCredits = pgTable("statutory_credits", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  tenantPlatformId: uuid("tenant_platform_id").references(() => tenantPlatforms.id),
  creditType: statCreditTypeEnum("credit_type").notNull(),
  periodMonth: integer("period_month").notNull(),
  periodYear: integer("period_year").notNull(),
  sourceRef: varchar("source_ref", { length: 128 }), // GSTR-8 ARN / 26AS row id
  creditAmount: numeric("credit_amount", { precision: 14, scale: 2 }).notNull(),
  recognizedAt: timestamp("recognized_at", { withTimezone: true }),
  claimedInReturn: boolean("claimed_in_return").default(false),
  notes: text("notes"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const logisticsDisputes = pgTable("logistics_disputes", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }),
  awbNumber: varchar("awb_number", { length: 64 }),
  disputeType: logiDisputeTypeEnum("dispute_type").notNull(),
  claimedAmount: numeric("claimed_amount", { precision: 14, scale: 2 }),
  approvedAmount: numeric("approved_amount", { precision: 14, scale: 2 }),
  status: logiDisputeStatusEnum("status").default("open").notNull(),
  filedAt: timestamp("filed_at", { withTimezone: true }),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  evidenceUrl: text("evidence_url"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const platformClaims = pgTable("platform_claims", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  tenantPlatformId: uuid("tenant_platform_id").references(() => tenantPlatforms.id),
  orderId: uuid("order_id").references(() => orders.id),
  claimType: claimTypeEnum("claim_type").notNull(),
  claimRef: varchar("claim_ref", { length: 128 }), // platform case id (e.g., SAFE-T)
  claimedAmount: numeric("claimed_amount", { precision: 14, scale: 2 }),
  approvedAmount: numeric("approved_amount", { precision: 14, scale: 2 }),
  status: claimStatusEnum("status").default("draft"),
  deadlineAt: timestamp("deadline_at", { withTimezone: true }),
  evidence: jsonb("evidence"),
  notes: text("notes"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const settlementLines = pgTable("settlement_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantPlatformId: uuid("tenant_platform_id").notNull().references(() => tenantPlatforms.id),
  settlementReference: varchar("settlement_reference", { length: 128 }),
  lineType: varchar("line_type", { length: 64 }), // order, fee, tax, adjustment, promo, reimbursement
  orderExternalId: varchar("order_external_id", { length: 128 }),
  amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
  taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
  raw: jsonb("raw").notNull(), // immutable raw line from settlement
  occurredAt: timestamp("occurred_at", { withTimezone: true }),
  uploadBatchId: uuid("upload_batch_id").references(() => dataUploadBatches.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const pgDisputes = pgTable("pg_disputes", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  paymentId: uuid("payment_id").references(() => payments.id, { onDelete: "set null" }),
  gateway: varchar("gateway", { length: 32 }), // razorpay, cashfree, payu
  disputeRef: varchar("dispute_ref", { length: 128 }),
  reason: varchar("reason", { length: 128 }),
  status: pgDisputeStatusEnum("status").default("open"),
  disputedAmount: numeric("disputed_amount", { precision: 14, scale: 2 }),
  feeGstAmount: numeric("fee_gst_amount", { precision: 14, scale: 2 }).default("0"),
  filedAt: timestamp("filed_at", { withTimezone: true }),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
