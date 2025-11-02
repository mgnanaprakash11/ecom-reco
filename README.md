# Shopify Order Upload Portal

A minimal Supabase + Next.js workspace focused on two capabilities:

1. Authenticate merchants through Supabase Auth.
2. Upload Shopify order CSV exports into Supabase Storage while recording metadata in Postgres.

The repository uses pnpm workspaces and Turborepo to share configuration and Drizzle ORM types across packages.

## Directory Layout

```
apps/
  web-app/   # Next.js application (auth flows + /upload UI)
packages/
  db/        # Drizzle client + schema (order_uploads table)
  supabase/  # Supabase helpers reused by the app
  ui/        # Shared shadcn/ui components
  eslint-config & typescript-config/  # Workspace presets
```

## Getting Started

1. Install dependencies (Node 18+, pnpm 9):
   ```sh
   pnpm install
   ```
2. Copy environment variables and fill in your Supabase and Postgres details:
   ```sh
   cp apps/web-app/.env.example apps/web-app/.env.local
   ```
3. Start the Next.js app:
   ```sh
   pnpm --filter web-app dev
   ```

The web app runs on [http://localhost:3000](http://localhost:3000) with Supabase Auth-powered login/signup flows. After signing in, visit `/upload` to submit Shopify CSV files.

## Environment Variables

`apps/web-app/.env.example` documents the required variables. At a minimum you need:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
- Optionally override `NEXT_PUBLIC_SUPABASE_UPLOADS_BUCKET` (defaults to `order-uploads`)

Create the bucket inside Supabase Storage before testing uploads.

## Database Schema

`packages/db/src/schema/uploads.ts` defines the single `order_uploads` table:

| Column | Description |
| --- | --- |
| `id` | UUID primary key |
| `user_id` | Supabase Auth user responsible for the upload |
| `store_name` | Optional identifier for the Shopify store |
| `file_name`, `file_path`, `file_checksum` | Storage metadata |
| `notes`, `status`, `metadata` | Additional context and bucket info |
| `created_at` | Timestamp generated in Postgres |

Regenerate migrations after schema changes:

```sh
pnpm --filter @repo/db run generate
pnpm --filter @repo/db run push
```

## Upload Flow

1. Authenticated user submits a CSV via `/upload`.
2. A server action verifies the session, normalises metadata, and uploads the file to the Supabase bucket (defaults to `order-uploads`).
3. The upload metadata is stored in Postgres for auditing and downstream automation.
4. Recent uploads render beneath the form so users can confirm receipt.

## Development Scripts

Common workspace commands:

```sh
pnpm dev             # Start the Next.js app
pnpm lint            # Run eslint
pnpm check-types     # Run TypeScript in noEmit mode
pnpm format          # Format with Prettier
```

## Next Steps

- Add background processing (Vercel Workflows, Supabase Functions, etc.) once you are ready to parse the CSVs into raw tables.
- Extend `order_uploads` with status transitions (`processing`, `failed`, `completed`) as automation matures.
- Build a lightweight dashboard to filter uploads by store or date.
