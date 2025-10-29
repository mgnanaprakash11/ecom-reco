# Repository Guidelines

## Project Structure & Module Organization
- `apps/web-app`: Next.js storefront served on port 3000; `app/upload` hosts the CSV ingestion UI and server actions.
- `apps/docs`: Contributor knowledge base running on port 3001.
- `apps/web-app/app/workflows` & `apps/web-app/lib/workflows`: Vercel Workflows definitions and shared ingestion helpers for CSV parsing and downstream automation.
- `packages/db`: Drizzle schema definitions in `src/schema`, migrations in `drizzle/`, and typed clients.
- Shared utilities live in `packages/ui`, `packages/supabase`, `packages/typescript-config`, and `packages/eslint-config`.

## Build, Test & Development Commands
- `pnpm install`: Bootstrap the workspace (requires Node 18+ and pnpm 9).
- `pnpm dev`: Start both frontend apps; scope with `pnpm --filter web-app dev` or `pnpm --filter docs dev` for individual targets.
- Quality gates: `pnpm lint`, `pnpm check-types`, `pnpm build`, `pnpm format`.
- Database sync: `pnpm --filter @repo/db run generate` then `pnpm --filter @repo/db run push`.

## Coding Style & Naming Conventions
- TypeScript everywhere with strict mode enabled; use ESM and explicit file extensions in NodeNext modules.
- File names: kebab-case; React components: PascalCase; variables/functions: camelCase.
- Format with Prettier 3 (`pnpm format`) and keep Drizzle schema definitions deterministic for clean diffs.

## Testing Guidelines
- Use Vitest + React Testing Library; co-locate specs as `*.test.ts(x)` beside source files.
- Prioritize coverage for `/upload` flows, CSV parsing edge cases, and workflow transitions.
- Integrate suites into the forthcoming root `pnpm test` script; list executed tests in PR validation notes.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (e.g., `feat(tasks): trigger dbt workflow`, `fix(db): add raw orders migration`).
- PRs must state rationale, summarize implementation details, list validation commands (include `pnpm lint` and `pnpm check-types`), and add screenshots or recordings for UI changes.

## Security & Configuration Tips
- Never commit secrets; store local values in `.env.local` and rely on Vercel project secrets for shared environments.
- Confirm the Supabase `reco-uploads` bucket exists before testing uploads.
- Grant the Vercel Workflows integration access to GitHub and keep workflow secrets (`DBT_*`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`) current.
