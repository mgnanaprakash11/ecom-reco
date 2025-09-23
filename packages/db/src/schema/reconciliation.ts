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
  "member",
]);

export const tenantStatusEnum = pgEnum("tenant_status", [
  "active",
  "inactive",
  "suspended",
  "closed",
]);

export const tenantPlatformStatusEnum = pgEnum("tenant_platform_status", [
  "draft",
  "active",
  "inactive",
  "disabled",
]);

export const chargeCalculationMethodEnum = pgEnum("charge_calculation_method", [
  "percentage",
  "flat",
  "slab",
  "tiered",
  "hybrid",
]);

export const chargeScopeEnum = pgEnum("charge_scope", [
  "order",
  "item",
  "shipment",
  "payout",
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
  "payments",
  "returns",
  "charges",
  "settlements",
  "rate_cards",
  "ads",
  "inventory",
  "costs",
  "other",
]);

export const dataUploadSourceEnum = pgEnum("data_upload_source", [
  "manual",
  "manual_csv",
  "api",
  "platform_api",
  "sftp",
  "integration",
  "s3_webhook",
  "scheduled",
  "other",
]);

export const dataUploadStatusEnum = pgEnum("data_upload_status", [
  "pending",
  "received",
  "parsing",
  "processing",
  "parsed",
  "loaded",
  "completed",
  "failed",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "created",
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
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "processing",
  "captured",
  "settled",
  "refunded",
  "chargeback",
  "failed",
  "disputed",
  "on_hold",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "prepaid",
  "cod",
  "upi",
  "net_banking",
  "netbanking",
  "card",
  "wallet",
  "other",
]);

export const allocationStatusEnum = pgEnum("allocation_status", [
  "pending",
  "unallocated",
  "allocated",
  "partially_allocated",
  "disputed",
  "released",
]);

export const reconciliationStatusEnum = pgEnum("reconciliation_status", [
  "matched",
  "unmatched",
  "reconciled",
  "unreconciled",
  "partial",
  "manual_review",
  "overpaid",
  "underpaid",
  "mismatch",
]);

export const reconciliationReasonEnum = pgEnum("reconciliation_reason", [
  "commission_mismatch",
  "fee_missing",
  "tax_difference",
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
  "advertising",
  "shipping",
  "logistics",
  "freight_inward",
  "freight_outward",
  "cogs",
  "manufacturing",
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
  "marketing",
  "storage",
  "collection_fee",
  "closing_fee",
  "fulfillment_fee",
  "settlement_adjustment",
  "salary",
  "overhead",
  "other",
]);

export const returnTypeEnum = pgEnum("return_type", [
  "customer_return",
  "rto",
  "ndr",
  "replacement",
  "cancellation",
  "other",
]);

export const returnStatusEnum = pgEnum("return_status", [
  "initiated",
  "pickup_scheduled",
  "in_transit",
  "warehouse_received",
  "received",
  "qc_passed",
  "qc_failed",
  "approved",
  "rejected",
  "completed",
  "refunded",
  "closed",
]);

export const returnReasonEnum = pgEnum("return_reason", [
  "damaged",
  "defective",
  "wrong_item",
  "customer_remorse",
  "size_issue",
  "quality_issue",
  "delivery_failed",
  "undelivered",
  "address_issue",
  "other",
]);

export const fulfillmentChannelEnum = pgEnum("fulfillment_channel", [
  "fba",
  "easy_ship",
  "seller_fulfilled",
  "flipkart_smart",
  "third_party",
  "self_ship",
  "fbf",
  "other",
]);

export const shippingZoneEnum = pgEnum("shipping_zone", [
  "local",
  "zonal",
  "national",
  "international",
  "special",
]);

export const ledgerEntryTypeEnum = pgEnum("ledger_entry_type", [
  "order",
  "sale",
  "refund",
  "fee",
  "tax",
  "tax_withholding",
  "adjustment",
  "promotion",
  "payout",
  "cost",
  "other",
]);

export const taxSectionEnum = pgEnum("tax_section", [
  "none",
  "194o",
  "206c1h",
  "sec_52_tcs",
  "sec_194o_tds",
  "other",
]);

export const payoutScheduleEnum = pgEnum("payout_schedule", [
  "daily",
  "t_plus_2",
  "weekly",
  "fortnightly",
  "monthly",
  "adhoc",
  "other",
]);

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

export const tenants = pgTable(
  "tenants",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 128 }).notNull(),
    status: tenantStatusEnum("status").default("active").notNull(),
    industry: varchar("industry", { length: 128 }),
    gstNumber: varchar("gst_number", { length: 32 }),
    gstin: varchar("gstin", { length: 15 }),
    panNumber: varchar("pan_number", { length: 10 }),
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
    payoutSchedule: payoutScheduleEnum("payout_schedule"),
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
    displayName: varchar("display_name", { length: 128 }),
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
    rawPayload: jsonb("raw_payload"),
    notes: text("notes"),
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
    uploadBatchId: uuid("upload_batch_id").references(() => dataUploadBatches.id),
    externalOrderId: varchar("external_order_id", { length: 128 }).notNull(),
    orderDate: timestamp("order_date", { withTimezone: true }).notNull(),
    orderStatus: orderStatusEnum("order_status").notNull(),
    fulfillmentStatus: fulfillmentStatusEnum("fulfillment_status")
      .default("unfulfilled")
      .notNull(),
    paymentStatus: paymentStatusEnum("payment_status").default("pending").notNull(),
    paymentMethod: paymentMethodEnum("payment_method"),
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
    shipToName: varchar("ship_to_name", { length: 256 }),
    shipToPhone: varchar("ship_to_phone", { length: 32 }),
    shipToAddressLine1: text("ship_to_address_line1"),
    shipToAddressLine2: text("ship_to_address_line2"),
    shipToCity: varchar("ship_to_city", { length: 128 }),
    shipToState: varchar("ship_to_state", { length: 64 }),
    shipToPostalCode: varchar("ship_to_postal_code", { length: 12 }),
    shipToCountry: varchar("ship_to_country", { length: 64 }),
    fulfillmentChannel: fulfillmentChannelEnum("fulfillment_channel"),
    shippingZone: shippingZoneEnum("shipping_zone"),
    awbNumber: varchar("awb_number", { length: 64 }),
    carrierName: varchar("carrier_name", { length: 128 }),
    actualWeightGrams: numeric("actual_weight_grams", { precision: 10, scale: 2 }),
    volumetricWeightGrams: numeric("volumetric_weight_grams", {
      precision: 10,
      scale: 2,
    }),
    distanceZone: varchar("distance_zone", { length: 32 }),
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
    hsnCode: varchar("hsn_code", { length: 8 }),
    cgstAmount: numeric("cgst_amount", { precision: 14, scale: 2 }).default("0"),
    sgstAmount: numeric("sgst_amount", { precision: 14, scale: 2 }).default("0"),
    igstAmount: numeric("igst_amount", { precision: 14, scale: 2 }).default("0"),
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
    promotionSource: promotionSourceEnum("promotion_source"),
    notes: text("notes"),
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

export const orderReturns = pgTable(
  "order_returns",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    orderId: uuid("order_id").notNull().references(() => orders.id, {
      onDelete: "cascade",
    }),
    orderItemId: uuid("order_item_id").references(() => orderItems.id, {
      onDelete: "set null",
    }),
    tenantPlatformId: uuid("tenant_platform_id").references(() => tenantPlatforms.id),
    uploadBatchId: uuid("upload_batch_id").references(() => dataUploadBatches.id),
    paymentId: uuid("payment_id").references(() => payments.id, {
      onDelete: "set null",
    }),
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
    tenantIdx: index("order_returns_tenant_idx").on(table.tenantId),
    orderIdx: index("order_returns_order_idx").on(table.orderId),
    orderItemIdx: index("order_returns_order_item_idx").on(table.orderItemId),
    statusIdx: index("order_returns_status_idx").on(table.returnStatus),
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
    payoutDate: timestamp("payout_date", { withTimezone: true }),
    settlementPeriodStart: timestamp("settlement_period_start", {
      withTimezone: true,
    }),
    settlementPeriodEnd: timestamp("settlement_period_end", {
      withTimezone: true,
    }),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    grossAmount: numeric("gross_amount", { precision: 14, scale: 2 }).notNull(),
    grossSettlementAmount: numeric("gross_settlement_amount", { precision: 14, scale: 2 }),
    feeAmount: numeric("fee_amount", { precision: 14, scale: 2 }).default("0"),
    taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
    tcsAmount: numeric("tcs_amount", { precision: 14, scale: 2 }).default("0"),
    tdsAmount: numeric("tds_amount", { precision: 14, scale: 2 }).default("0"),
    adjustmentAmount: numeric("adjustment_amount", {
      precision: 14,
      scale: 2,
    }).default("0"),
    otherAdjustments: numeric("other_adjustments", { precision: 14, scale: 2 }).default("0"),
    netAmount: numeric("net_amount", { precision: 14, scale: 2 }).notNull(),
    utrNumber: varchar("utr_number", { length: 64 }),
    payoutBatchId: varchar("payout_batch_id", { length: 128 }),
    payoutSchedule: payoutScheduleEnum("payout_schedule"),
    payoutScheduledDate: timestamp("payout_scheduled_date", { withTimezone: true }),
    bankAccountId: varchar("bank_account_id", { length: 128 }),
    bankName: varchar("bank_name", { length: 128 }),
    ifscCode: varchar("ifsc_code", { length: 16 }),
    accountNumberLast4: varchar("account_number_last4", { length: 8 }),
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
    utrIdx: index("payments_utr_idx").on(table.utrNumber),
    payoutBatchIdx: index("payments_payout_batch_idx").on(table.payoutBatchId),
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
    withholdingReference: varchar("withholding_reference", { length: 128 }),
    taxSection: taxSectionEnum("tax_section"),
    withholdingRate: numeric("withholding_rate", { precision: 7, scale: 4 }),
    isTaxRemitted: boolean("is_tax_remitted").default(false).notNull(),
    taxRemittedAt: timestamp("tax_remitted_at", { withTimezone: true }),
    filingPeriod: varchar("filing_period", { length: 16 }),
    taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
    description: text("description"),
    rawPayload: jsonb("raw_payload"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    paymentIdx: index("payment_adjustments_payment_idx").on(table.paymentId),
    taxSectionIdx: index("payment_adjustments_tax_section_idx").on(
      table.taxSection
    ),
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

export const ledgerEntries = pgTable(
  "ledger_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(() => tenantPlatforms.id),
    uploadBatchId: uuid("upload_batch_id").references(() => dataUploadBatches.id),
    orderId: uuid("order_id").references(() => orders.id, {
      onDelete: "set null",
    }),
    orderReturnId: uuid("order_return_id").references(() => orderReturns.id, {
      onDelete: "set null",
    }),
    paymentId: uuid("payment_id").references(() => payments.id, {
      onDelete: "set null",
    }),
    entryType: ledgerEntryTypeEnum("entry_type").notNull(),
    taxSection: taxSectionEnum("tax_section").default("none").notNull(),
    source: financialSourceEnum("source").default("import").notNull(),
    isCredit: boolean("is_credit").default(true).notNull(),
    transactionDate: timestamp("transaction_date", { withTimezone: true }).notNull(),
    referenceNumber: varchar("reference_number", { length: 128 }),
    description: text("description"),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    metadata: jsonb("metadata"),
    rawPayload: jsonb("raw_payload"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("ledger_entries_tenant_idx").on(table.tenantId),
    typeIdx: index("ledger_entries_type_idx").on(table.entryType),
    taxSectionIdx: index("ledger_entries_tax_section_idx").on(
      table.taxSection
    ),
    orderIdx: index("ledger_entries_order_idx").on(table.orderId),
    paymentIdx: index("ledger_entries_payment_idx").on(table.paymentId),
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
    orderItemId: uuid("order_item_id").references(() => orderItems.id, {
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
    orderItemId: uuid("order_item_id").references(() => orderItems.id, {
      onDelete: "set null",
    }),
    paymentId: uuid("payment_id").references(() => payments.id, {
      onDelete: "set null",
    }),
    orderReturnId: uuid("order_return_id").references(() => orderReturns.id, {
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
    orderItemIdx: index("cost_entries_order_item_idx").on(table.orderItemId),
    orderReturnIdx: index("cost_entries_order_return_idx").on(table.orderReturnId),
  })
);

export const profitabilitySnapshots = pgTable(
  "profitability_snapshots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(() => tenantPlatforms.id),
    platformId: uuid("platform_id").references(() => platforms.id),
    orderId: uuid("order_id").references(() => orders.id, {
      onDelete: "set null",
    }),
    reconciliationRunId: uuid("reconciliation_run_id").references(
      () => reconciliationRuns.id
    ),
    calculationSource: financialSourceEnum("calculation_source")
      .default("calculated")
      .notNull(),
    productCategory: varchar("product_category", { length: 256 }),
    fulfillmentChannel: fulfillmentChannelEnum("fulfillment_channel"),
    campaignIdentifier: varchar("campaign_identifier", { length: 128 }),
    segmentKey: varchar("segment_key", { length: 128 }),
    periodStart: timestamp("period_start", { withTimezone: true }),
    periodEnd: timestamp("period_end", { withTimezone: true }),
    computedByJobId: varchar("computed_by_job_id", { length: 128 }),
    totalRevenue: numeric("total_revenue", { precision: 14, scale: 2 }).notNull(),
    totalDiscounts: numeric("total_discounts", { precision: 14, scale: 2 }).default("0"),
    totalFeesBeforeTax: numeric("total_fees_before_tax", { precision: 14, scale: 2 }).default("0"),
    feeGstAmount: numeric("fee_gst_amount", { precision: 14, scale: 2 }).default("0"),
    shippingCost: numeric("shipping_cost", { precision: 14, scale: 2 }).default("0"),
    cogs: numeric("cogs", { precision: 14, scale: 2 }).default("0"),
    adSpend: numeric("ad_spend", { precision: 14, scale: 2 }).default("0"),
    otherCosts: numeric("other_costs", { precision: 14, scale: 2 }).default("0"),
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
    computedAt: timestamp("computed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("profitability_snapshots_tenant_idx").on(table.tenantId),
    orderIdx: index("profitability_snapshots_order_idx").on(table.orderId),
    tenantPlatformIdx: index("profitability_snapshots_tenant_platform_idx").on(
      table.tenantPlatformId
    ),
    reconciliationRunIdx: index("profitability_snapshots_run_idx").on(
      table.reconciliationRunId
    ),
    segmentIdx: index("profitability_snapshots_segment_idx").on(table.segmentKey),
    campaignIdx: index("profitability_snapshots_campaign_idx").on(
      table.campaignIdentifier
    ),
    periodIdx: index("profitability_snapshots_period_idx").on(
      table.periodStart,
      table.periodEnd
    ),
  })
);


export const statutoryCredits = pgTable(
  "statutory_credits",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(
      () => tenantPlatforms.id
    ),
    creditType: statCreditTypeEnum("credit_type").notNull(),
    periodMonth: integer("period_month").notNull(),
    periodYear: integer("period_year").notNull(),
    sourceRef: varchar("source_ref", { length: 128 }),
    creditAmount: numeric("credit_amount", { precision: 14, scale: 2 }).notNull(),
    recognizedAt: timestamp("recognized_at", { withTimezone: true }),
    claimedInReturn: boolean("claimed_in_return").default(false),
    notes: text("notes"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantPeriodIdx: index("statutory_credits_tenant_period_idx").on(
      table.tenantId,
      table.periodYear,
      table.periodMonth
    ),
  })
);

export const logisticsDisputes = pgTable(
  "logistics_disputes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(
      () => tenantPlatforms.id
    ),
    orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }),
    awbNumber: varchar("awb_number", { length: 64 }),
    disputeType: logiDisputeTypeEnum("dispute_type").notNull(),
    status: logiDisputeStatusEnum("status").default("open").notNull(),
    claimedAmount: numeric("claimed_amount", { precision: 14, scale: 2 }),
    approvedAmount: numeric("approved_amount", { precision: 14, scale: 2 }),
    filedAt: timestamp("filed_at", { withTimezone: true }),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    evidenceUrl: text("evidence_url"),
    notes: text("notes"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("logistics_disputes_tenant_idx").on(table.tenantId),
    orderIdx: index("logistics_disputes_order_idx").on(table.orderId),
    statusIdx: index("logistics_disputes_status_idx").on(table.status),
  })
);

export const platformClaims = pgTable(
  "platform_claims",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(
      () => tenantPlatforms.id
    ),
    orderId: uuid("order_id").references(() => orders.id),
    claimType: claimTypeEnum("claim_type").notNull(),
    claimRef: varchar("claim_ref", { length: 128 }),
    status: claimStatusEnum("status").default("draft").notNull(),
    claimedAmount: numeric("claimed_amount", { precision: 14, scale: 2 }),
    approvedAmount: numeric("approved_amount", { precision: 14, scale: 2 }),
    deadlineAt: timestamp("deadline_at", { withTimezone: true }),
    filedAt: timestamp("filed_at", { withTimezone: true }),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    evidence: jsonb("evidence"),
    notes: text("notes"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("platform_claims_tenant_idx").on(table.tenantId),
    statusIdx: index("platform_claims_status_idx").on(table.status),
    orderIdx: index("platform_claims_order_idx").on(table.orderId),
  })
);

export const settlementLines = pgTable(
  "settlement_lines",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantPlatformId: uuid("tenant_platform_id")
      .notNull()
      .references(() => tenantPlatforms.id),
    settlementReference: varchar("settlement_reference", { length: 128 }),
    lineType: varchar("line_type", { length: 64 }).notNull(),
    orderExternalId: varchar("order_external_id", { length: 128 }),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    taxAmount: numeric("tax_amount", { precision: 14, scale: 2 }).default("0"),
    rawPayload: jsonb("raw_payload").notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true }),
    uploadBatchId: uuid("upload_batch_id").references(() => dataUploadBatches.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    settlementIdx: index("settlement_lines_settlement_idx").on(
      table.tenantPlatformId,
      table.settlementReference
    ),
    orderIdx: index("settlement_lines_order_idx").on(table.orderExternalId),
    lineTypeIdx: index("settlement_lines_type_idx").on(table.lineType),
  })
);

export const pgDisputes = pgTable(
  "pg_disputes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    tenantPlatformId: uuid("tenant_platform_id").references(
      () => tenantPlatforms.id
    ),
    paymentId: uuid("payment_id").references(() => payments.id, {
      onDelete: "set null",
    }),
    gateway: varchar("gateway", { length: 64 }),
    disputeReference: varchar("dispute_reference", { length: 128 }),
    reason: varchar("reason", { length: 128 }),
    status: pgDisputeStatusEnum("status").default("open").notNull(),
    disputedAmount: numeric("disputed_amount", { precision: 14, scale: 2 }),
    feeGstAmount: numeric("fee_gst_amount", { precision: 14, scale: 2 }).default("0"),
    filedAt: timestamp("filed_at", { withTimezone: true }),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("pg_disputes_tenant_idx").on(table.tenantId),
    paymentIdx: index("pg_disputes_payment_idx").on(table.paymentId),
    statusIdx: index("pg_disputes_status_idx").on(table.status),
  })
);
