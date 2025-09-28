# Architecture Overview

This monorepo delivers an end-to-end ecommerce reconciliation platform composed of two Next.js applications, shared TypeScript packages, a Trigger.dev worker for asynchronous ingestion, and a dbt analytics layer running on Supabase Postgres. Turborepo and pnpm orchestrate builds across the workspace.

## High-Level System
- **Customer UI (`apps/web-app`)**: Multi-tenant Next.js (App Router) experience for onboarding, upload workflows, and admin views.
- **Contributor Docs (`apps/docs`)**: Next.js-powered handbook that shares UI primitives and configuration with the main app.
- **Background Worker (`packages/tasks`)**: Trigger.dev tasks ingest raw CSV uploads, persist records with Drizzle ORM, and dispatch analytics workflows.
- **Data Platform (`packages/db` + Supabase)**: Shared Drizzle schema/migrations targeting a Supabase-managed Postgres instance with object storage buckets.
- **Analytics (`data/dbt`)**: dbt models build dimensional marts and operational observability tables after ingestion completes.
- **Shared Libraries (`packages/ui`, `packages/supabase`, etc.)**: Provide design system components, Supabase helpers, linting, and TypeScript config.

## Data Flow Lifecycle
1. **Upload**: Authenticated users submit marketplace CSVs via `/upload`. A server action (`apps/web-app/app/upload/actions.ts`) validates membership and persists metadata to `data_upload_batches`.
2. **Storage**: Files are stored in the Supabase `reco-uploads` bucket using a service-role client. Checksums and metadata are recorded for idempotency.
3. **Task Dispatch**: The Trigger.dev SDK enqueues `process-orders-upload` with the tenant, batch, and object path.
4. **Parsing & Persistence**: The worker downloads the CSV, parses rows (`packages/tasks/src/trigger/orders-upload.ts`), and writes canonicalised JSON payloads into `raw.orders` through Drizzle. Batch status transitions (`received → parsing → loaded`) are updated in Postgres.
5. **Analytics Trigger**: Upon successful load, the worker dispatches the GitHub Actions workflow (`run-dbt.yml`) to execute the dbt project. Workflow metadata is echoed back into `data_upload_batches.metadata.githubWorkflow`.
6. **dbt Transformation**: dbt builds staging views (`stg` schema), marts (`marts` schema), and operational logs to power dashboards and SLA tracking (`orders_processing_logs` table).
7. **Consumption**: Future dashboard surfaces and downstream automations query the marts layer, while Trigger.dev can schedule follow-on tasks based on dbt outputs.

## Application Surfaces
- **Next.js App Router**: Pages, layouts, and server actions live under `apps/web-app/app`. Supabase auth helpers (`packages/supabase`) inject session-aware clients. UI components draw from `packages/ui` (shadcn-based) to keep branding consistent.
- **Docs Portal**: `apps/docs` reuses the design system to host contributor onboarding and runbooks. It ships independently but shares lint/TS configs via Turborepo pipelines.

## Backend & Data Layer
- **Drizzle ORM**: `packages/db/src/schema` defines product catalogs, tenant onboarding, upload lifecycle enums, and raw ingestion tables. Migrations under `packages/db/drizzle` are generated via `pnpm --filter @repo/db run generate` and applied with `run push`.
- **Supabase Postgres**: Acts as the primary OLTP and analytics store. Service-role keys are required for both web actions and Trigger.dev tasks; user-facing requests authenticate via Supabase auth helpers. Object storage hosts raw CSV uploads.
- **Typed Clients**: `packages/db` exports a typed Drizzle client consumed by apps and workers, ensuring schema changes stay in sync across the monorepo.

## Automation & Analytics
- **Trigger.dev**: Configured in `trigger.config.ts`, the worker (`pnpm --filter @repo/tasks dev`) listens for ingestion jobs. It handles chunked inserts, idempotency (replace-by-batch), and GitHub workflow dispatch with retry-friendly errors.
- **GitHub Actions**: The `run-dbt.yml` workflow runs `dbt build` using repository secrets (`DBT_*`, `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`). Trigger.dev passes contextual payloads (batch id, tenant id) for auditability.
- **dbt Project**: Located at `data/dbt`, the project transforms raw uploads into analytics-ready marts. Staging and marts default to view materialisation; `orders_processing_logs` is materialised as a table for operational insights. Tests should accompany models via `schema.yml` definitions.

## Shared Tooling & Conventions
- **Monorepo Management**: `turbo.json` orchestrates build/lint/type pipelines; `pnpm-workspace.yaml` wires package scopes. All code is TypeScript (NodeNext, strict mode).
- **UI & DX Packages**: `packages/ui` centralises React components; `packages/eslint-config` and `packages/typescript-config` enforce workspace-wide standards. Utilities live in `packages/supabase` for server/client Supabase access.
- **Testing**: Vitest + React Testing Library for UI, with emphasis on `/upload` flows and Trigger.dev task transitions. dbt tests should validate data quality in marts.

## Local Development Topology
- Run the main surfaces with `pnpm dev` (web + docs) and the worker via `pnpm --filter @repo/tasks dev`.
- Supabase credentials must be present in `.env.local` for apps and in the shell for dbt (`DBT_HOST`, etc.).
- Trigger.dev CLI authentication (`pnpm dlx trigger.dev@latest login`) is required before scheduling tasks locally.
- To verify end-to-end ingestion: upload a CSV → confirm `raw.orders` rows via Drizzle Studio or Supabase → run `dbt build` (see `data/dbt/README.md`) → inspect marts/logs.

This architecture balances rapid UI iteration with reliable background processing and analytics, while keeping all TypeScript-facing packages typed and reusable across surfaces.

