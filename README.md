# Ecom Reco Monorepo

A Turborepo workspace powering the multi-tenant reconciliation platform for Indian marketplaces. It combines two Next.js surfaces, a shared Drizzle/Postgres data layer, Trigger.dev automations, and reusable UI packages for rapid agent onboarding.

## Repository Structure

```
apps/
  web-app/      # Customer-facing reconciliation UI (Next.js, port 3000)
  docs/         # Contributor handbook + onboarding guides (Next.js, port 3001)
packages/
  db/           # Drizzle schema, client, and SQL migrations (Postgres)
  tasks/        # Trigger.dev tasks (process uploads, background jobs)
  ui/           # Shared component library (shadcn/ui)
  supabase/     # Supabase browser/server helpers
  eslint-config & typescript-config/  # Workspace presets
```

Workspace-level coordinators live at `pnpm-workspace.yaml`, `turbo.json`, and `trigger.config.ts`.

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
   These variables are required by the upload API, Supabase storage, and Trigger.dev worker.

## Running Locally

- Run both Next.js apps:
  ```sh
  pnpm dev
  ```
  or focus on one surface: `pnpm --filter web-app dev`, `pnpm --filter docs dev`.
- Start the Trigger.dev worker (requires env vars above):
  ```sh
  pnpm --filter @repo/tasks dev
  ```
- Common quality gates:
  ```sh
  pnpm lint
  pnpm check-types
  pnpm format
  ```

## Upload & Reconciliation Pipeline

1. Authenticated users visit `/upload` and submit marketplace CSV exports.
2. The server action saves the file to the Supabase `reco-uploads` bucket, records a `data_upload_batches` row, and triggers `process-orders-upload` via Trigger.dev.
3. The task downloads the CSV, parses it, writes each row into the `raw.orders` table (JSONB payload per row), and—on success—dispatches the GitHub Actions dbt workflow to continue processing (`received → parsing → loaded → processing`).

Use the Supabase dashboard or Drizzle Studio (`pnpm --filter @repo/db run studio`) to inspect uploads and raw data.

## GitHub Actions dbt Workflow

- Workflow file: `.github/workflows/run-dbt.yml`. It runs `dbt run --select raw_orders+` (and tests) on demand via `workflow_dispatch`.
- Trigger.dev dispatches the workflow automatically once a batch lands in `raw.orders`. You can also run it manually from the Actions tab.
- Required repository secrets: `DBT_HOST`, `DBT_PORT`, `DBT_DATABASE`, `DBT_USER`, `DBT_PASSWORD`, `DBT_SCHEMA`, `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- Worker environment variables: `GITHUB_REPOSITORY` (`owner/repo`), `GITHUB_ACTIONS_TOKEN` (PAT with `workflow` scope), optional `GITHUB_DBT_WORKFLOW` (defaults to `run-dbt.yml`) and `GITHUB_DBT_WORKFLOW_REF` (defaults to `main`).
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
- Trigger.dev worker requires a logged-in CLI session (`pnpm dlx trigger.dev@latest login`) and the same env variables as the web app.
- If Turbopack cannot resolve `@repo/*`, ensure `pnpm install` completed and the target package is listed under the consuming app’s dependencies.

Happy reconciling!
