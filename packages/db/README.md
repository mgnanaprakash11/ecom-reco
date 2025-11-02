# Database Package (`@repo/db`)

This workspace package exposes the shared Drizzle ORM client and schema used by the Shopify order upload portal.

## Contents

- `src/schema/uploads.ts` – schema for the `order_uploads` table that records every CSV stored in Supabase.
- `src/client.ts` – Drizzle client wired to `DATABASE_URL`.
- `src/index.ts` – public exports for the client, schema, and common Drizzle helpers.
- `drizzle.config.ts` – configuration file for Drizzle Kit code generation.

## Table Overview

| Table | Purpose |
| --- | --- |
| `order_uploads` | Tracks each uploaded Shopify CSV (user, store name, storage path, checksum, notes, metadata, status). |

## Usage

```ts
import { db, orderUploads, eq } from "@repo/db";

const uploads = await db
  .select()
  .from(orderUploads)
  .where(eq(orderUploads.userId, userId));
```

## Migrations

Regenerate SQL artifacts after updating the schema:

```sh
pnpm --filter @repo/db run generate
```

Apply the migrations to your database:

```sh
pnpm --filter @repo/db run push
```

You can remove and regenerate the `drizzle/` directory as needed—Drizzle Kit outputs fresh SQL based on `src/schema`.
