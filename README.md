# Ecom Reco Monorepo

This repository contains the full codebase for the multi-tenant Indian e-commerce reconciliation platform. It is a Turborepo-managed monorepo with Next.js storefronts, shared UI packages, and a Drizzle-based Postgres data layer purpose-built for order/payment reconciliation, fee modelling, and profitability analytics across marketplaces (Amazon, Flipkart, Myntra, Ajio, D2C gateways, etc.).

## Repository Structure

```
apps/
  web-app/        # Next.js storefront + reconciliation UI
  docs/           # Documentation site with shared UI patterns
packages/
  db/             # Drizzle ORM schema and database client
  tasks/          # Trigger.dev tasks for automated workflows
  ui/             # Shared component library
  eslint-config/  # Workspace ESLint preset
  typescript-config/ # Shared tsconfig bases
```

Key configuration lives at the repo root (`pnpm-workspace.yaml`, `turbo.json`, `trigger.config.ts`).

## Getting Started

1. **Install dependencies**
   ```sh
   pnpm install
   ```
2. **Run everything in dev mode**
   ```sh
   pnpm dev        # spins up all apps via Turborepo
   ```
   Or focus on a single app:
   ```sh
   pnpm --filter web-app dev
   ```
3. **Database**
   - Connection details are managed inside `packages/db` (see [packages/db/README.md](packages/db/README.md)).
   - Generate migrations with `pnpm --filter db run generate` once you adjust the schema.

4. **Quality gates**
   ```sh
   pnpm lint
   pnpm check-types
   ```

## Development Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Runs all apps with Turborepo dev server |
| `pnpm build` | Builds every package and application |
| `pnpm format` | Formats the codebase with Prettier |
| `pnpm lint` | Runs ESLint using the shared config |
| `pnpm check-types` | Performs strict TypeScript checks |
| `pnpm run dev:triggers` | Starts Trigger.dev listener for task runs |

## Database Schema Highlights

- Multi-tenant design with per-platform configuration, effective-dated charge rules, and upload provenance.
- Comprehensive reconciliation domain tables covering orders, payments, settlements, statutory credits, logistics disputes, platform claims, and profitability snapshots.
- Purpose-built enums for Indian marketplaces (TCS/TDS, COD fees, fulfilment channels, shipping zones, dispute states). 

For a detailed walk-through of every table and recommended workflows, read [packages/db/README.md](packages/db/README.md).

## Contributing

- Follow Conventional Commits (`feat:`, `fix:`, `chore:`, etc.). Use scopes like `feat(db): ...` when touching specific packages.
- Always run `pnpm lint` and `pnpm check-types` before opening a PR.
- For schema changes, generate Drizzle migrations (`pnpm --filter db run generate`) and document backfill steps in your PR description.

## Additional Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

Happy reconciling!
