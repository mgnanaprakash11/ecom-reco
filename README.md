# Ecom Reco Monorepo

A Turborepo workspace powering the multi-tenant reconciliation platform for Indian marketplaces. It combines two Next.js surfaces, a shared Drizzle/Postgres data layer, Vercel Workflows automations, and reusable UI packages for rapid agent onboarding.

## Repository Structure

```
apps/
  web-app/      # Customer-facing reconciliation UI (Next.js, port 3000)
  docs/         # Contributor handbook + onboarding guides (Next.js, port 3001)
packages/
  db/           # Drizzle schema, client, and SQL migrations (Postgres)
  ui/           # Shared component library (shadcn/ui)
  supabase/     # Supabase browser/server helpers
  eslint-config & typescript-config/  # Workspace presets
apps/web-app/
  app/workflows/   # Vercel Workflow definitions
  lib/workflows/   # Shared ingestion helpers used by Workflows
```

Workspace-level coordinators live at `pnpm-workspace.yaml` and `turbo.json`.

## Environment Setup

1. Install dependencies (Node 18+, pnpm 9):
   ```sh
   pnpm install
   ```
2. Populate `.env.local` / `.env` with:
   ```sh
   DATABASE_URL=postgres://...
   NEXT_PUBLIC_SUPABASE_URL=https://...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_URL=https://...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
  These variables are required by the upload API, Supabase storage, and Vercel Workflows.

## Running Locally

- Run both Next.js apps:
  ```sh
  pnpm dev
  ```
  or focus on one surface: `pnpm --filter web-app dev`, `pnpm --filter docs dev`.
- Common quality gates:
  ```sh
  pnpm lint
  pnpm check-types
  pnpm format
  ```

Background ingestion runs through Vercel Workflows; once deployed, uploads enqueue the workflow automatically. For local dry-runs you can invoke the workflow handler via unit tests or by calling the `workflow/api` `start` helper inside scripts.

## Upload & Reconciliation Pipeline

1. Authenticated users visit `/upload` and submit marketplace CSV exports.
2. The server action saves the file to the Supabase `reco-uploads` bucket, records a `data_upload_batches` row, and enqueues `process-orders-workflow` via Vercel Workflows.
3. The workflow downloads the CSV, parses it, writes each row into the `raw.orders` table (JSONB payload per row) and the structured `raw.shopify_orders` table, and—on success—dispatches the GitHub Actions dbt workflow to continue processing (`received → parsing → loaded → processing`).

Use the Supabase dashboard or Drizzle Studio (`pnpm --filter @repo/db run studio`) to inspect uploads and raw data.

## GitHub Actions dbt Workflow

- Workflow file: `.github/workflows/run-dbt.yml`. It runs `dbt run --select raw_orders+` (and tests) on demand via `workflow_dispatch`.
- The Vercel workflow dispatches the job automatically once a batch finishes loading into the raw schema. You can also run it manually from the Actions tab.
- Required repository secrets: `DBT_HOST`, `DBT_PORT`, `DBT_DATABASE`, `DBT_USER`, `DBT_PASSWORD`, `DBT_SCHEMA`, `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- Workflow environment variables: `GITHUB_REPOSITORY` (`owner/repo`), `GITHUB_ACTIONS_TOKEN` (PAT with `workflow` scope), optional `GITHUB_DBT_WORKFLOW` (defaults to `run-dbt.yml`) and `GITHUB_DBT_WORKFLOW_REF` (defaults to `main`).
- Successful dispatch updates `data_upload_batches.metadata.githubWorkflow`; watch the GitHub Actions run logs for dbt output and lint/test results.

## Database & Migrations

- Schema lives in `packages/db/src/schema`. New tables require a Drizzle migration:
  ```sh
  pnpm --filter @repo/db run generate
  pnpm --filter @repo/db run push
  ```
- SQL output resides in `packages/db/drizzle`. Always commit the generated migration and `meta/_journal.json` updates.

## Testing & Conventions

- Tests: Vitest + React Testing Library; co-locate as `*.test.ts(x)` beside source files. Wire new suites into the upcoming `pnpm test` before merging.
- Code style: TypeScript strict, ESM with explicit extensions, kebab-case filenames, PascalCase components, camelCase functions.
- Commits: Conventional Commits with scopes (`feat(tasks): ...`, `fix(db): ...`). PRs should include rationale, validation commands, and screenshots for UI changes.

## Troubleshooting Checklist

- Upload failures usually stem from missing env vars or Supabase bucket permissions—confirm the `reco-uploads` bucket exists and service-role key is present.
- Verify that the Vercel project has the workflow integration enabled and that environment variables match the local `.env` when running uploads.
- If Turbopack cannot resolve `@repo/*`, ensure `pnpm install` completed and the target package is listed under the consuming app’s dependencies.

Happy reconciling!
