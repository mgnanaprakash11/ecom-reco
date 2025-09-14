# Repository Guidelines

## Project Structure & Module Organization
- `apps/web-app`: Next.js app (port 3000). API example: `app/api/hello-world/route.ts`.
- `apps/docs`: Next.js docs app (port 3001).
- `packages/ui`: Shared React UI components.
- `packages/eslint-config`, `packages/typescript-config`: Workspace lint/TS presets.
- `packages/tasks`: Trigger.dev V4 tasks. Tasks live in `src/trigger/*` and are exported via `src/trigger/index.ts` and `src/index.ts`.
- `trigger.config.ts`: Trigger.dev config (project ref, task dirs, retries, `maxDuration`).

## Build, Test, and Development Commands
- Root dev (all apps): `pnpm dev`
- Web only: `pnpm --filter web-app dev`
- Build all: `pnpm build`
- Lint all: `pnpm lint`
- Type check all: `pnpm check-types`
- Trigger.dev dev server: `pnpm run dev:triggers` (registers tasks, streams runs)
- Example: visit `http://localhost:3000/api/hello-world` while the dev server runs to trigger `hello-world`.

## Coding Style & Naming Conventions
- TypeScript, strict mode. Prettier 3 for formatting; run `pnpm format` before PRs.
- ESLint workspace presets in `packages/eslint-config` (no warnings allowed in CI).
- Module resolution: NodeNext/Bundler. For NodeNext packages (e.g., `packages/tasks`), use explicit `.js` extensions in relative imports inside `.ts` files (example: `export * from "./trigger/index.js"`).
- File names: kebab-case for files, PascalCase for React components, camelCase for variables/functions.

## Testing Guidelines
- No test framework configured yet. Prefer Vitest + React Testing Library.
- Name tests `*.test.ts` or `*.test.tsx` colocated with sources.
- Add a root `test` script and run via `pnpm test` when introduced.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (examples in history: `feat(create-turbo): ...`).
- Keep PRs small and focused; include:
  - Summary, rationale, and scope of change
  - Screenshots for UI changes
  - How to validate (commands/URLs)
- PR must pass `pnpm lint` and `pnpm check-types`.

## Security & Configuration Tips
- Do not commit secrets. Configure env locally; Trigger.dev auth happens via CLI.
- `trigger.config.ts` requires: `project`, `dirs`, and `maxDuration` (>= 5s). Avoid importing heavy libraries in this file to keep builds fast.
- Node >= 18 and pnpm 9 are required.
