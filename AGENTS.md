# Repository Guidelines

## Project Structure & Module Organization
- `apps/web-app`: Next.js storefront served on port 3000; primary APIs live under `app/api/*` (try `app/api/hello-world/route.ts`).
- `apps/docs`: Next.js docs portal on port 3001; mirrors UI patterns for reference content.
- `packages/ui`: Shared React component library consumed by both apps; update stories and props here first.
- `packages/tasks`: Trigger.dev v4 tasks stored in `src/trigger/*` and re-exported through `src/trigger/index.ts` and `src/index.ts`.
- `packages/eslint-config` & `packages/typescript-config`: Workspace presets; update once, consume via `extends` in each project.
- Roots like `trigger.config.ts`, `turbo.json`, and `pnpm-workspace.yaml` orchestrate build pipelines and task registration.

## Build, Test, and Development Commands
- `pnpm install`: Sync workspace deps (Node 18+, pnpm 9 required).
- `pnpm dev`: Start all apps via Turborepo; visit `http://localhost:3000` for the web app.
- `pnpm --filter web-app dev`: Focus development on the storefront only.
- `pnpm build`: Production build for every package and app.
- `pnpm lint` + `pnpm check-types`: Must pass before opening a PR.
- `pnpm run dev:triggers`: Launch Trigger.dev listener; hitting `/api/hello-world` streams a sample run.

## Coding Style & Naming Conventions
- TypeScript in strict mode; prefer ES modules with explicit `.js` extensions for NodeNext packages (e.g., `export * from "./trigger/index.js"`).
- Format with Prettier 3 (`pnpm format`) and respect workspace ESLint configuration (no warnings permitted).
- Naming: kebab-case for files, PascalCase for React components, camelCase for variables and functions.

## Testing Guidelines
- No suite yet; prefer Vitest + React Testing Library when adding tests.
- Co-locate specs as `*.test.ts` or `*.test.tsx` near the source; mock external services conservatively.
- Add a root `pnpm test` script when the first tests land and include it in CI.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`); reference scope when touching a specific package (e.g., `feat(tasks): ...`).
- PRs must describe rationale, implementation notes, validation steps, and include screenshots for UI changes.
- Link issues when available and confirm `pnpm lint` and `pnpm check-types` locally before pushing.

## Security & Configuration Tips
- Never commit secrets; rely on local `.env` files and Trigger.dev CLI auth.
- Keep `trigger.config.ts` lightweight: declare `project`, `dirs`, `maxDuration >= 5s`, and avoid heavy imports.
- Rotate API keys promptly and document setup steps in the docs app when onboarding new contributors.
