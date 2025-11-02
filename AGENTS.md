# Repository Guidelines

## Project Structure & Module Organization
- `apps/web-app`: Next.js surface (port 3000) with Supabase-authenticated login/sign-up flows and the Shopify CSV upload experience under `app/upload`.
- `packages/db`: Drizzle schema + client (`order_uploads` table) under `src/schema`, migrations generated into `drizzle/`.
- Shared utilities live in `packages/ui`, `packages/supabase`, `packages/typescript-config`, and `packages/eslint-config`.

## Build, Test & Development Commands
- `pnpm install`: bootstrap the workspace (requires Node 18+ and pnpm 9).
- `pnpm --filter web-app dev`: start the Next.js app locally.
- Quality gates: `pnpm lint`, `pnpm check-types`, `pnpm format`.
- Database sync: `pnpm --filter @repo/db run generate` followed by `pnpm --filter @repo/db run push`.

## Coding Style & Naming Conventions
- TypeScript everywhere with strict mode enabled; use ESM and explicit file extensions in NodeNext modules.
- File names: kebab-case; React components: PascalCase; variables/functions: camelCase.
- Format with Prettier 3 (`pnpm format`) and keep Drizzle schema definitions deterministic for clean diffs.

## Testing Guidelines
- Use Vitest + React Testing Library; co-locate specs as `*.test.ts(x)` beside source files.
- Prioritise coverage for `/upload` flows, CSV validation, and storage/database integration boundaries.
- Integrate suites into the forthcoming root `pnpm test` script; list executed tests in PR validation notes.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (e.g., `feat(upload): add notes field`, `fix(auth): improve error handling`).
- PRs must state rationale, summarise implementation details, list validation commands (`pnpm lint`, `pnpm check-types`), and add screenshots or recordings for UI changes.

## Security & Configuration Tips
- Never commit secrets; store local values in `.env.local` and rely on Vercel/Supabase project secrets for shared environments.
- Create the Supabase storage bucket defined by `NEXT_PUBLIC_SUPABASE_UPLOADS_BUCKET` (defaults to `order-uploads`) before testing uploads.
- Grant the Supabase service-role key minimal privileges and rotate it regularly.
