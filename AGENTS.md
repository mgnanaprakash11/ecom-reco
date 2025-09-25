# Repository Guidelines

## Project Structure & Module Organization
- `apps/web-app`: customer storefront (Next.js) with API routes under `app/api/*`; see `app/api/hello-world/route.ts` for Trigger.dev patterns.
- `apps/docs`: documentation surface (Next.js) used for onboarding and contributor notes.
- `packages/ui`: shared component library with colocated stories; keep exports tidy and reusable.
- `packages/tasks`: Trigger.dev jobs in `src/trigger/*`, re-exported via `src/index.ts` for discovery.
- Workspace config lives in `packages/eslint-config`, `packages/typescript-config`, `turbo.json`, and `pnpm-workspace.yaml`.

## Build, Test, and Development Commands
- `pnpm install`: hydrate dependencies (Node 18+, pnpm 9).
- `pnpm dev`: run both apps; use `pnpm --filter web-app dev` or `pnpm --filter docs dev` for focused work.
- `pnpm build`: generate production bundles.
- `pnpm lint` / `pnpm check-types`: enforce ESLint + TypeScript gates before commits.
- `pnpm run dev:triggers`: stream Trigger.dev jobs against `/api/hello-world` while iterating on workflows.

## Coding Style & Naming Conventions
- TypeScript strict mode with ESM; use kebab-case for files, PascalCase components, camelCase functions/variables.
- Format via Prettier 3 (`pnpm format`); treat any ESLint warning as a failure.
- Keep NodeNext exports explicit with `.js` endings; prefer concise, well-named React props.

## Testing Guidelines
- Use Vitest with React Testing Library; co-locate tests as `*.test.ts` or `*.test.tsx` beside sources.
- Aim for meaningful component/task coverage; mock external services sparingly.
- Run suites with the upcoming `pnpm test` (wire your additions the same way); document gaps in PRs.

## Commit & Pull Request Guidelines
- Follow Conventional Commits, e.g., `feat(tasks): schedule webhook` or `fix(ui): align button spacing`.
- PRs should explain rationale, implementation details, and validation steps (`pnpm lint`, `pnpm check-types`, relevant screenshots).
- Reference issues, note Trigger.dev impacts, and capture onboarding updates in `apps/docs` when workflows change.

## Security & Configuration Tips
- Keep secrets in `.env.local` files; never commit credentials or Trigger.dev tokens.
- Ensure `trigger.config.ts` lists correct `project`, job directories, and `maxDuration >= 5s`.
- Document new setup requirements in `apps/docs` so future agents stay aligned.
