# dbt Project (Supabase Postgres)

Set `DBT_PROFILES_DIR` to this folder when running dbt locally.

Examples:

- Install deps: `DBT_PROFILES_DIR=./data/dbt dbt deps`
- Run models: `DBT_PROFILES_DIR=./data/dbt dbt run`
- Test models: `DBT_PROFILES_DIR=./data/dbt dbt test`

Environment variables used by `profiles.yml`:

- `DBT_HOST`, `DBT_PORT` (default 5432)
- `DBT_USER`, `DBT_PASSWORD`
- `DBT_DBNAME`
- `DBT_SCHEMA` (e.g. `analytics`)

Map from Supabase `DATABASE_URL` if needed.
