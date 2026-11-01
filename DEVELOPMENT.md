# Development

This document covers environment setup, the command set, and the day-to-day
workflows for MTQ UiX Vue.

## Requirements

- `node` 20.19+ or 22.12+ (use the latest stable where possible)
- `pnpm` 10+ (the project is pnpm-managed)

## Environment setup

```bash
# Install dependencies
pnpm i

# Start the development server
pnpm dev
```

The dev server runs on port `3333` by default and opens the browser automatically.

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Type-check (`vue-tsc`) and build for production |
| `pnpm build:staging` | Build for the staging environment |
| `pnpm preview` | Preview the production build (run `pnpm build` first) |
| `pnpm lint` | Lint and format |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm exec vue-tsc --noEmit` | Type-check only |
| `pnpm codegen:api` | Regenerate API clients from `specs/` (Orval) |
| `npx steiger ./src` | Run the FSD architecture boundary check |

## Definition of done

Before considering a change complete, ensure:

1. `pnpm build` passes (type-check + production build).
2. `pnpm test` passes.
3. `pnpm lint` passes (where the toolchain allows it).
4. `npx steiger ./src` reports "No problems found" for architecture changes.

## API workflow

OpenAPI specs live in `specs/`, one file per backend service.

1. Edit the relevant `<service>.openapi.yaml` when the contract changes.
2. Regenerate clients:

   ```bash
   pnpm codegen:api
   ```

3. Consume generated clients via `@/shared/api`:

   ```ts
   import { getUsersService } from "@/shared/api"

   const { getCurrentUser } = getUsersService()
   ```

4. Never hand-edit `src/shared/api/generated/` — regeneration overwrites it.

### Frontend model ownership

- Exact match to the OpenAPI response → type alias.
- Different shape → transform in the slice `api/` segment; no ceremony transforms.

## Theme / style scheme workflow

Primitive tokens live in `shared/styles/tokens/`; semantic schemes live in
`app/styles/themes/` (one file per scheme, `[data-theme]` scoped).

- Add a new scheme → add `<name>.css` with a `[data-theme="<name>"]` block
  declaring **every** semantic token (all schemes must declare the same set).
- Change a color → edit the primitive in `shared/styles/tokens/`, not the scheme.
- Switch schemes at runtime via the `data-theme` attribute on the root element
  (handled by `features/theme`).
- Keep the import order in `app/styles/index.scss`: primitives → themes → global.
- Components reference semantic tokens only (`var(--color-action-primary)`),
  never primitives (`var(--blue-600)`).

## Feature-Sliced Design workflow

When adding or moving code, respect the layer boundaries:

1. Identify the layer (see [ARCHITECTURE.md](ARCHITECTURE.md)).
2. Create the slice with its segments (`ui/`, `model/`, `api/`, `lib/`) and a
   single public `index.ts`.
3. Import via aliases and the slice root only — no deep paths, no `../../../`.
4. Run `npx steiger ./src` and resolve `fsd/forbidden-imports`,
   `fsd/public-api`, and `fsd/import-locality` violations.

## Commit guidelines

Format: `type: message` (space after the colon).

- `feat` — new feature
- `fix` — bug fix
- `perf` — performance improvement
- `refactor` — code refactoring
- `docs` — documentation and comments
- `types` — type-related changes
- `test` — unit tests
- `ci` — continuous integration, workflows
- `revert` — revert changes
- `chore` — chores (update dependencies, modify configuration)

Rules:

- Prefer a personal branch; do not code directly on the main branch.
- No automatic commits unless explicitly instructed.
- Ensure code passes lint and unit tests before committing.
- Keep commits small and related.

## Conventions

- Use `@` → `src` and layer aliases (`@/shared`, `@/entities`, `@/features`,
  `@/widgets`, `@/pages`, `@/app`). No relative cross-layer imports.
- Components use `<script setup lang="ts">` with the Composition API.
- Prefer `ref` over `reactive` for reactive variables.
- Composables must not touch the DOM directly; accept targets via
  `MaybeRefOrGetter<EventTarget>`.
- `v-for` requires a unique `key`; avoid `v-if` + `v-for` on the same element.
- Use Scoped CSS; use CSS variables for themeable values.
- Use ESLint for linting/formatting (Prettier is disabled).

## Testing

Unit tests live under `tests/`, colocated by slice where relevant, and run with
Vitest + happy-dom.

```bash
pnpm test
```
