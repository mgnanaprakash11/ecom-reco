# Database Package (`@repo/db`)

This package exposes the Drizzle ORM client and schema for the reconciliation platform. It models every stage of the Indian e-commerce payment lifecycle—tenant onboarding, marketplace fee configuration, ingestion pipelines, settlements, statutory taxes, disputes, and profitability analytics.

## Contents

- `src/schema/` – Drizzle schema definition (`reconciliation.ts`) with all enums, tables, and indices.
- `src/client.ts` – Factory for the Postgres client using Drizzle.
- `src/index.ts` – Re-exports client and schema for consumers.
- `drizzle/` – Generated SQL artifacts (migrations) when you run Drizzle Kit.
- `drizzle.config.ts` – Configuration for Drizzle Kit CLI (connection, out dir, schema path).

## Schema Overview

The schema is organised into functional areas:

### Tenancy & Access
- **tenants / users / tenant_members** – multi-tenant RBAC with GSTIN/PAN metadata.
- **platforms / tenant_platforms** – marketplace directory plus per-tenant seller linkage and payout schedules.

### Rate Cards & Rules
- **tenant_charge_configs / tenant_charge_tiers** – effective-dated commission and fee configurations with selectors for category, fulfilment channel, shipping zone, and weight slabs.

### Data Ingestion
- **data_upload_batches** – provenance for every import (orders, payments, settlements, rate cards, costs, etc.) including raw payload snapshots.
- **settlement_lines** – immutable vault of marketplace settlement lines for reconciliation replay.

### Orders & Returns
- **orders / order_items** – order facts with logistics details (AWB, weight, zone), GST splits per item, and raw payloads.
- **order_charge_allocations** – detailed fee allocations with promotion funding source (`seller`, `platform`, `shared`).
- **order_returns** – return/RTO/exchange lifecycle, refund ratios, and associated fees.

### Payments & Allocations
- **payments** – settlement batches with gross/net, fee/tax/TCS/TDS buckets, payout schedule, and banking identifiers.
- **payment_adjustments** – itemised deductions/credits (penalties, GST, tax withholdings) with remittance tracking.
- **payment_order_allocations** – many-to-many mapping of settlements to orders.
- **settlement_lines** – raw feed rows (order/fee/tax/promo/reimbursement) tied back to uploads.

### Reconciliation & Disputes
- **ledger_entries** – general ledger with `taxSection`, credit/debit flag, and source metadata.
- **reconciliation_runs / reconciliation_entries** – execution history and variance outcomes.
- **logistics_disputes** – weight/RTO/NDR/damage/loss disputes with SLA timestamps.
- **platform_claims** – SAFE-T, penalty appeals, and other reimbursement claims.
- **pg_disputes** – payment gateway chargebacks (Razorpay, Cashfree, PayU) with GST on dispute fees.

### Statutory & Profitability
- **statutory_credits** – monthly TCS/TDS credits (GST Sec. 52, Income-tax Sec. 194-O) with claim status and portal references.
- **cost_entries** – additional costs tied to orders/items/returns/payments (shipping, marketing, overhead, etc.).
- **profitability_snapshots** – computed revenue/cost/profit metrics with segment keys, campaign IDs, and fee GST separation.

## Usage

Import the client and schema where you need typed queries:

```ts
import { db, schema } from "@repo/db";

const orders = await db.select().from(schema.orders).limit(10);
```

## Migrations

Generate SQL after schema changes:

```sh
pnpm --filter db run generate
```

Apply migrations (e.g., in local dev):

```sh
pnpm --filter db run push
```

Open Drizzle Studio if you want to inspect data:

```sh
pnpm --filter db run studio
```

## Development Workflow

1. Update `src/schema/reconciliation.ts`.
2. Regenerate migrations with Drizzle Kit.
3. Review generated SQL in `drizzle/` and commit it alongside schema changes.
4. Document any backfill steps required for new columns/tables in your PR.

## Notes & Best Practices

- Keep `tenantId`/`tenantPlatformId` filters in application queries to enforce tenant isolation.
- Use `data_upload_batches` + `uploadBatchId` columns to trace data lineage in pipelines.
- Treat `order_charge_allocations` as the authoritative fee ledger; item-level fee fields are convenient mirrors for reporting.
- `settlement_lines.rawPayload` and other `raw_payload` columns should store the original platform row for audit replays.

For a deeper walkthrough of each table and business rule, see `src/schema/reconciliation.ts` (richly commented) or reach out to the data team.
