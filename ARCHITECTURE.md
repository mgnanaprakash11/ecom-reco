# Architecture Overview

This repository is intentionally small: a single Next.js surface for authentication and manual Shopify order uploads, backed by Supabase for auth, storage, and Postgres.

## Components

- **Web App (`apps/web-app`)** – Next.js (App Router) project with Supabase Auth pages and the `/upload` workflow.
- **Database Package (`packages/db`)** – Drizzle ORM client and the `order_uploads` table schema.
- **Shared Utilities (`packages/ui`, `packages/supabase`, configs)** – shadcn/ui components plus workspace lint/TypeScript presets.

## Data Flow

1. User signs in via Supabase Auth (email/password).
2. Server action at `/upload` validates the session, normalises metadata, and streams the CSV to a Supabase Storage bucket (`order-uploads` by default).
3. Upload metadata is recorded in Postgres (`order_uploads`) with checksum, notes, and bucket path for future processing.
4. The UI renders the 10 most recent uploads for the signed-in user to confirm receipt.

## Extending the System

- Add background processing (Vercel Workflows, Supabase Edge Functions, etc.) to parse CSV rows into additional tables.
- Introduce status transitions (`processing`, `failed`, `completed`) on `order_uploads` as automation matures.
- Layer dashboards or APIs that query `order_uploads` to surface uptake metrics or trigger follow-on tasks.

The current codebase intentionally avoids multi-tenant abstractions, dbt projects, or workflow dispatchers so you can build on a clean foundation focused on auth + uploads.
