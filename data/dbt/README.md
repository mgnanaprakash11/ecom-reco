# Ecom Reco dbt Project

This dbt project models the Supabase/Postgres warehouse that powers analytics and reconciliation dashboards. It materialises staged views, dimensional marts, and operational logs derived from raw uploads.

## Prerequisites
- Python 3.11+
- `dbt-postgres` installed (via `pip install dbt-postgres` or managed virtualenv)
- Network access to the analytics Postgres database (Supabase instance)
- Environment variables for database credentials:
  - `DBT_HOST`
  - `DBT_PORT` (defaults to `5432` if omitted)
  - `DBT_USER`
  - `DBT_PASSWORD`
  - `DBT_DBNAME`
  - `DBT_SCHEMA` (defaults to `public` if omitted)

The `profiles.yml` file is configured to read these variables. No secrets are committed to the repo.

## Local Setup
1. From the repository root, create and activate a virtual environment:
   ```sh
   python -m venv .venv
   source .venv/bin/activate
   pip install --upgrade pip
   pip install dbt-postgres
   ```
2. Export the required environment variables. For Supabase, you can extract these from `DATABASE_URL`:
   ```sh
   export DBT_HOST=aws-0.ap-southeast-1.pooler.supabase.com
   export DBT_PORT=6543
   export DBT_USER=postgres.your-service-role
   export DBT_PASSWORD=********
   export DBT_DBNAME=postgres
   export DBT_SCHEMA=analytics
   ```
   Tip: `packages/supabase/src/env.ts` documents the keys used elsewhere in the monorepo.
3. Set the `DBT_PROFILES_DIR` to this folder (dbt uses it automatically once exported):
   ```sh
   export DBT_PROFILES_DIR=$(pwd)/data/dbt
   ```
4. (Optional) Install git hooks to prevent secrets from being committed: `pnpm dlx lefthook install`.

## Common Commands
All commands assume you are in the repository root with the environment variables exported.

| Task | Command |
| --- | --- |
| Install dbt dependencies | `dbt deps` |
| Compile SQL without running | `dbt compile` |
| Run selected models | `dbt run --select stg_products+` |
| Run tests on recent models | `dbt test --select dim_products` |
| Build everything (run + test) | `dbt build` |
| Clean artifacts (`target/`, `dbt_packages/`) | `dbt clean` |

## Model Structure
- **Sources** (`models/sources.yml`) reference the application schema (`app.*`) and raw ingestion schema (`raw.*`).
- **Staging layer** (`models/staging/`) normalises source tables into analytics-friendly views.
- **Marts** (`models/marts/`) provide business-ready dimensional tables. Example: `dim_products` exposes pricing history.
- **Operational logs** (`models/logs/`) aggregate ingestion telemetry. `orders_processing_logs` materialises as a table and powers dashboards/alerts.

The default materialisation is `view`, with overrides where persistence is required (e.g., the logs table).

## Testing Locally
1. Ensure the ingestion pipeline has loaded sample data. You can trigger an upload via the web app (`apps/web-app/app/upload`) or insert seed rows using Drizzle migrations.
2. Execute the model run and tests:
   ```sh
   dbt build
   ```
   - `dbt run` will rebuild staging views and marts.
   - `dbt test` asserts data quality on the selected models (add tests in `models/**/schema.yml`).
3. Inspect results:
   - Logs: `target/run_results.json` & `target/run/` contain compiled SQL and runtime metadata.
   - Database: query the `stg` and `marts` schemas in Supabase or your Postgres client to verify changes.

## Debugging Tips
- Use `dbt debug` to validate connectivity if runs fail.
- Pass `--profiles-dir ./data/dbt` explicitly when scripting outside the repo root.
- Override the target schema temporarily by exporting `DBT_SCHEMA=sandbox_gnana` before running tasks.
- Reset the environment with `dbt clean` if you change dependencies or switch databases.

## CI Integration
Vercel Workflows dispatch the GitHub Actions workflow (`.github/workflows/run-dbt.yml`) after CSV ingestion completes. The workflow sets the same environment variables and invokes `dbt build`. Ensure the following secrets exist in GitHub:
- `DBT_HOST`, `DBT_PORT`, `DBT_DATABASE`, `DBT_USER`, `DBT_PASSWORD`, `DBT_SCHEMA`
- `DATABASE_URL` (for auxiliary scripts)
- `SUPABASE_SERVICE_ROLE_KEY`

Successful runs update `data_upload_batches.metadata.githubWorkflow` with the Actions run URL for traceability.
