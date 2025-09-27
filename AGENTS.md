# Repository Guidelines

## Project Structure & Module Organization
- `apps/web-app`: Next.js storefront (port 3000). `app/upload` hosts the CSV ingestion UI and server actions.
- `apps/docs`: Contributor knowledge base (port 3001).
- `packages/tasks`: Trigger.dev worker tasks inside `src/trigger`; orchestrates CSV parsing and downstream automation.
- `packages/db`: Drizzle schema (`src/schema`), migrations (`drizzle/`), and typed client exports.
- Shared utilities: `packages/ui`, `packages/supabase`, `packages/typescript-config`, and `packages/eslint-config`.

## Build, Test & Development Commands
- `pnpm install`: bootstrap workspace (Node 18+, pnpm 9).
- `pnpm dev`: launch both apps; scope with `pnpm --filter web-app dev` or `pnpm --filter docs dev`.
- `pnpm --filter @repo/tasks dev`: start the Trigger.dev worker (needs `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
- `pnpm lint`, `pnpm check-types`, `pnpm build`, and `pnpm format`: required gates before pushing.
- Database migrations: `pnpm --filter @repo/db run generate` then `run push` to sync Postgres.

## Coding Style & Naming Conventions
- TypeScript strict across packages; use ESM with explicit file extensions in NodeNext modules.
- Naming: kebab-case files, PascalCase React components, camelCase variables/functions.
- Format with Prettier 3 and keep Drizzle schema definitions deterministic for consistent diffs.

## Testing Guidelines
- Vitest + React Testing Library; co-locate specs as `*.test.ts(x)` beside source files.
- Add coverage around `/upload` UI, parsing edge cases, and task status transitions. Integrate suites into the future root `pnpm test` runner.

## Automation & dbt Integration
- `process-orders-upload` loads CSV rows into `raw.orders` then dispatches `.github/workflows/run-dbt.yml` via GitHub Actions.
- Worker environment: `GITHUB_REPOSITORY`, `GITHUB_ACTIONS_TOKEN`, optional `GITHUB_DBT_WORKFLOW` and `GITHUB_DBT_WORKFLOW_REF`.
- Repository secrets required by the workflow: `DBT_HOST`, `DBT_PORT`, `DBT_DATABASE`, `DBT_USER`, `DBT_PASSWORD`, `DBT_SCHEMA`, `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- Monitor run status in GitHub Actions; successful dispatch updates `data_upload_batches.metadata.githubWorkflow`.

## Commit & Pull Request Guidelines
- Use Conventional Commits (e.g., `feat(tasks): trigger dbt workflow`, `fix(db): add raw orders migration`).
- PRs must list rationale, implementation notes, validation commands (`pnpm lint`, `pnpm check-types`, pertinent tests), and screenshots/recordings for UI-facing changes.

## Security & Configuration Tips
- Never commit secrets; use `.env.local` locally and repository secrets/Trigger.dev config in shared environments.
- Confirm the Supabase `reco-uploads` bucket exists before testing uploads.
- Replace schema edits with Drizzle migrations and keep Trigger.dev CLI authenticated (`pnpm dlx trigger.dev@latest login`).
