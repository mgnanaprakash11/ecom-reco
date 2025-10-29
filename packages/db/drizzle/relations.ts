import { relations } from "drizzle-orm/relations";
import { tenants, dataUploadBatches, tenantPlatforms, users, costEntries, orders, orderItems, payments, orderReturns, tenantChargeConfigs, orderChargeAllocations, paymentAdjustments, ledgerEntries, paymentOrderAllocations, pgDisputes, platformClaims, logisticsDisputes, settlementLines, reconciliationRuns, reconciliationEntries, statutoryCredits, tenantChargeTiers, platforms, tenantMembers, profitabilitySnapshots, ordersInRaw, shopifyOrdersInRaw } from "./schema";

export const dataUploadBatchesRelations = relations(dataUploadBatches, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [dataUploadBatches.tenantId],
		references: [tenants.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [dataUploadBatches.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	user: one(users, {
		fields: [dataUploadBatches.createdBy],
		references: [users.id]
	}),
	costEntries: many(costEntries),
	orderChargeAllocations: many(orderChargeAllocations),
	payments: many(payments),
	ledgerEntries: many(ledgerEntries),
	orderReturns: many(orderReturns),
	orders: many(orders),
	settlementLines: many(settlementLines),
	reconciliationRuns: many(reconciliationRuns),
	ordersInRaws: many(ordersInRaw),
	shopifyOrdersInRaws: many(shopifyOrdersInRaw),
}));

export const tenantsRelations = relations(tenants, ({many}) => ({
	dataUploadBatches: many(dataUploadBatches),
	costEntries: many(costEntries),
	payments: many(payments),
	ledgerEntries: many(ledgerEntries),
	pgDisputes: many(pgDisputes),
	orderReturns: many(orderReturns),
	platformClaims: many(platformClaims),
	orders: many(orders),
	logisticsDisputes: many(logisticsDisputes),
	statutoryCredits: many(statutoryCredits),
	tenantPlatforms: many(tenantPlatforms),
	tenantMembers: many(tenantMembers),
	profitabilitySnapshots: many(profitabilitySnapshots),
	reconciliationRuns: many(reconciliationRuns),
	ordersInRaws: many(ordersInRaw),
	shopifyOrdersInRaws: many(shopifyOrdersInRaw),
}));

export const tenantPlatformsRelations = relations(tenantPlatforms, ({one, many}) => ({
	dataUploadBatches: many(dataUploadBatches),
	payments: many(payments),
	ledgerEntries: many(ledgerEntries),
	pgDisputes: many(pgDisputes),
	orderReturns: many(orderReturns),
	platformClaims: many(platformClaims),
	orders: many(orders),
	logisticsDisputes: many(logisticsDisputes),
	settlementLines: many(settlementLines),
	statutoryCredits: many(statutoryCredits),
	tenant: one(tenants, {
		fields: [tenantPlatforms.tenantId],
		references: [tenants.id]
	}),
	platform: one(platforms, {
		fields: [tenantPlatforms.platformId],
		references: [platforms.id]
	}),
	tenantChargeConfigs: many(tenantChargeConfigs),
	profitabilitySnapshots: many(profitabilitySnapshots),
	reconciliationRuns: many(reconciliationRuns),
}));

export const usersRelations = relations(users, ({many}) => ({
	dataUploadBatches: many(dataUploadBatches),
	reconciliationEntries: many(reconciliationEntries),
	tenantMembers_userId: many(tenantMembers, {
		relationName: "tenantMembers_userId_users_id"
	}),
	tenantMembers_invitedBy: many(tenantMembers, {
		relationName: "tenantMembers_invitedBy_users_id"
	}),
	tenantChargeConfigs_createdBy: many(tenantChargeConfigs, {
		relationName: "tenantChargeConfigs_createdBy_users_id"
	}),
	tenantChargeConfigs_updatedBy: many(tenantChargeConfigs, {
		relationName: "tenantChargeConfigs_updatedBy_users_id"
	}),
	reconciliationRuns: many(reconciliationRuns),
}));

export const costEntriesRelations = relations(costEntries, ({one}) => ({
	tenant: one(tenants, {
		fields: [costEntries.tenantId],
		references: [tenants.id]
	}),
	order: one(orders, {
		fields: [costEntries.orderId],
		references: [orders.id]
	}),
	orderItem: one(orderItems, {
		fields: [costEntries.orderItemId],
		references: [orderItems.id]
	}),
	payment: one(payments, {
		fields: [costEntries.paymentId],
		references: [payments.id]
	}),
	orderReturn: one(orderReturns, {
		fields: [costEntries.orderReturnId],
		references: [orderReturns.id]
	}),
	tenantChargeConfig: one(tenantChargeConfigs, {
		fields: [costEntries.chargeConfigId],
		references: [tenantChargeConfigs.id]
	}),
	dataUploadBatch: one(dataUploadBatches, {
		fields: [costEntries.uploadBatchId],
		references: [dataUploadBatches.id]
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	costEntries: many(costEntries),
	orderChargeAllocations: many(orderChargeAllocations),
	ledgerEntries: many(ledgerEntries),
	orderItems: many(orderItems),
	paymentOrderAllocations: many(paymentOrderAllocations),
	orderReturns_orderId: many(orderReturns, {
		relationName: "orderReturns_orderId_orders_id"
	}),
	orderReturns_exchangeOrderId: many(orderReturns, {
		relationName: "orderReturns_exchangeOrderId_orders_id"
	}),
	platformClaims: many(platformClaims),
	tenant: one(tenants, {
		fields: [orders.tenantId],
		references: [tenants.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [orders.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	dataUploadBatch: one(dataUploadBatches, {
		fields: [orders.uploadBatchId],
		references: [dataUploadBatches.id]
	}),
	logisticsDisputes: many(logisticsDisputes),
	reconciliationEntries: many(reconciliationEntries),
	profitabilitySnapshots: many(profitabilitySnapshots),
}));

export const orderItemsRelations = relations(orderItems, ({one, many}) => ({
	costEntries: many(costEntries),
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id]
	}),
	orderReturns: many(orderReturns),
	reconciliationEntries: many(reconciliationEntries),
}));

export const paymentsRelations = relations(payments, ({one, many}) => ({
	costEntries: many(costEntries),
	paymentAdjustments: many(paymentAdjustments),
	tenant: one(tenants, {
		fields: [payments.tenantId],
		references: [tenants.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [payments.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	dataUploadBatch: one(dataUploadBatches, {
		fields: [payments.uploadBatchId],
		references: [dataUploadBatches.id]
	}),
	ledgerEntries: many(ledgerEntries),
	paymentOrderAllocations: many(paymentOrderAllocations),
	pgDisputes: many(pgDisputes),
	orderReturns: many(orderReturns),
	reconciliationEntries: many(reconciliationEntries),
}));

export const orderReturnsRelations = relations(orderReturns, ({one, many}) => ({
	costEntries: many(costEntries),
	ledgerEntries: many(ledgerEntries),
	tenant: one(tenants, {
		fields: [orderReturns.tenantId],
		references: [tenants.id]
	}),
	order_orderId: one(orders, {
		fields: [orderReturns.orderId],
		references: [orders.id],
		relationName: "orderReturns_orderId_orders_id"
	}),
	orderItem: one(orderItems, {
		fields: [orderReturns.orderItemId],
		references: [orderItems.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [orderReturns.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	dataUploadBatch: one(dataUploadBatches, {
		fields: [orderReturns.uploadBatchId],
		references: [dataUploadBatches.id]
	}),
	payment: one(payments, {
		fields: [orderReturns.paymentId],
		references: [payments.id]
	}),
	order_exchangeOrderId: one(orders, {
		fields: [orderReturns.exchangeOrderId],
		references: [orders.id],
		relationName: "orderReturns_exchangeOrderId_orders_id"
	}),
}));

export const tenantChargeConfigsRelations = relations(tenantChargeConfigs, ({one, many}) => ({
	costEntries: many(costEntries),
	orderChargeAllocations: many(orderChargeAllocations),
	tenantChargeTiers: many(tenantChargeTiers),
	tenantPlatform: one(tenantPlatforms, {
		fields: [tenantChargeConfigs.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	user_createdBy: one(users, {
		fields: [tenantChargeConfigs.createdBy],
		references: [users.id],
		relationName: "tenantChargeConfigs_createdBy_users_id"
	}),
	user_updatedBy: one(users, {
		fields: [tenantChargeConfigs.updatedBy],
		references: [users.id],
		relationName: "tenantChargeConfigs_updatedBy_users_id"
	}),
}));

export const orderChargeAllocationsRelations = relations(orderChargeAllocations, ({one}) => ({
	order: one(orders, {
		fields: [orderChargeAllocations.orderId],
		references: [orders.id]
	}),
	tenantChargeConfig: one(tenantChargeConfigs, {
		fields: [orderChargeAllocations.chargeConfigId],
		references: [tenantChargeConfigs.id]
	}),
	dataUploadBatch: one(dataUploadBatches, {
		fields: [orderChargeAllocations.uploadBatchId],
		references: [dataUploadBatches.id]
	}),
}));

export const paymentAdjustmentsRelations = relations(paymentAdjustments, ({one}) => ({
	payment: one(payments, {
		fields: [paymentAdjustments.paymentId],
		references: [payments.id]
	}),
}));

export const ledgerEntriesRelations = relations(ledgerEntries, ({one}) => ({
	tenant: one(tenants, {
		fields: [ledgerEntries.tenantId],
		references: [tenants.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [ledgerEntries.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	dataUploadBatch: one(dataUploadBatches, {
		fields: [ledgerEntries.uploadBatchId],
		references: [dataUploadBatches.id]
	}),
	order: one(orders, {
		fields: [ledgerEntries.orderId],
		references: [orders.id]
	}),
	orderReturn: one(orderReturns, {
		fields: [ledgerEntries.orderReturnId],
		references: [orderReturns.id]
	}),
	payment: one(payments, {
		fields: [ledgerEntries.paymentId],
		references: [payments.id]
	}),
}));

export const paymentOrderAllocationsRelations = relations(paymentOrderAllocations, ({one}) => ({
	payment: one(payments, {
		fields: [paymentOrderAllocations.paymentId],
		references: [payments.id]
	}),
	order: one(orders, {
		fields: [paymentOrderAllocations.orderId],
		references: [orders.id]
	}),
}));

export const pgDisputesRelations = relations(pgDisputes, ({one}) => ({
	tenant: one(tenants, {
		fields: [pgDisputes.tenantId],
		references: [tenants.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [pgDisputes.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	payment: one(payments, {
		fields: [pgDisputes.paymentId],
		references: [payments.id]
	}),
}));

export const platformClaimsRelations = relations(platformClaims, ({one}) => ({
	tenant: one(tenants, {
		fields: [platformClaims.tenantId],
		references: [tenants.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [platformClaims.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	order: one(orders, {
		fields: [platformClaims.orderId],
		references: [orders.id]
	}),
}));

export const logisticsDisputesRelations = relations(logisticsDisputes, ({one}) => ({
	tenant: one(tenants, {
		fields: [logisticsDisputes.tenantId],
		references: [tenants.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [logisticsDisputes.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	order: one(orders, {
		fields: [logisticsDisputes.orderId],
		references: [orders.id]
	}),
}));

export const settlementLinesRelations = relations(settlementLines, ({one}) => ({
	tenantPlatform: one(tenantPlatforms, {
		fields: [settlementLines.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	dataUploadBatch: one(dataUploadBatches, {
		fields: [settlementLines.uploadBatchId],
		references: [dataUploadBatches.id]
	}),
}));

export const reconciliationEntriesRelations = relations(reconciliationEntries, ({one}) => ({
	reconciliationRun: one(reconciliationRuns, {
		fields: [reconciliationEntries.runId],
		references: [reconciliationRuns.id]
	}),
	order: one(orders, {
		fields: [reconciliationEntries.orderId],
		references: [orders.id]
	}),
	orderItem: one(orderItems, {
		fields: [reconciliationEntries.orderItemId],
		references: [orderItems.id]
	}),
	payment: one(payments, {
		fields: [reconciliationEntries.paymentId],
		references: [payments.id]
	}),
	user: one(users, {
		fields: [reconciliationEntries.resolvedBy],
		references: [users.id]
	}),
}));

export const reconciliationRunsRelations = relations(reconciliationRuns, ({one, many}) => ({
	reconciliationEntries: many(reconciliationEntries),
	profitabilitySnapshots: many(profitabilitySnapshots),
	tenant: one(tenants, {
		fields: [reconciliationRuns.tenantId],
		references: [tenants.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [reconciliationRuns.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	user: one(users, {
		fields: [reconciliationRuns.triggeredBy],
		references: [users.id]
	}),
	dataUploadBatch: one(dataUploadBatches, {
		fields: [reconciliationRuns.dataUploadBatchId],
		references: [dataUploadBatches.id]
	}),
}));

export const statutoryCreditsRelations = relations(statutoryCredits, ({one}) => ({
	tenant: one(tenants, {
		fields: [statutoryCredits.tenantId],
		references: [tenants.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [statutoryCredits.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
}));

export const tenantChargeTiersRelations = relations(tenantChargeTiers, ({one}) => ({
	tenantChargeConfig: one(tenantChargeConfigs, {
		fields: [tenantChargeTiers.chargeConfigId],
		references: [tenantChargeConfigs.id]
	}),
}));

export const platformsRelations = relations(platforms, ({many}) => ({
	tenantPlatforms: many(tenantPlatforms),
	profitabilitySnapshots: many(profitabilitySnapshots),
}));

export const tenantMembersRelations = relations(tenantMembers, ({one}) => ({
	tenant: one(tenants, {
		fields: [tenantMembers.tenantId],
		references: [tenants.id]
	}),
	user_userId: one(users, {
		fields: [tenantMembers.userId],
		references: [users.id],
		relationName: "tenantMembers_userId_users_id"
	}),
	user_invitedBy: one(users, {
		fields: [tenantMembers.invitedBy],
		references: [users.id],
		relationName: "tenantMembers_invitedBy_users_id"
	}),
}));

export const profitabilitySnapshotsRelations = relations(profitabilitySnapshots, ({one}) => ({
	tenant: one(tenants, {
		fields: [profitabilitySnapshots.tenantId],
		references: [tenants.id]
	}),
	platform: one(platforms, {
		fields: [profitabilitySnapshots.platformId],
		references: [platforms.id]
	}),
	order: one(orders, {
		fields: [profitabilitySnapshots.orderId],
		references: [orders.id]
	}),
	tenantPlatform: one(tenantPlatforms, {
		fields: [profitabilitySnapshots.tenantPlatformId],
		references: [tenantPlatforms.id]
	}),
	reconciliationRun: one(reconciliationRuns, {
		fields: [profitabilitySnapshots.reconciliationRunId],
		references: [reconciliationRuns.id]
	}),
}));

export const ordersInRawRelations = relations(ordersInRaw, ({one}) => ({
	tenant: one(tenants, {
		fields: [ordersInRaw.tenantId],
		references: [tenants.id]
	}),
	dataUploadBatch: one(dataUploadBatches, {
		fields: [ordersInRaw.dataUploadBatchId],
		references: [dataUploadBatches.id]
	}),
}));

export const shopifyOrdersInRawRelations = relations(shopifyOrdersInRaw, ({one}) => ({
	tenant: one(tenants, {
		fields: [shopifyOrdersInRaw.tenantId],
		references: [tenants.id]
	}),
	dataUploadBatch: one(dataUploadBatches, {
		fields: [shopifyOrdersInRaw.dataUploadBatchId],
		references: [dataUploadBatches.id]
	}),
}));