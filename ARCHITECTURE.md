# Architecture

MTQ UiX Vue follows **Feature-Sliced Design (FSD)** — a frontend architecture that
organizes code by business domain rather than by technical role. This document
describes the layers, dependency rules, slice structure, API codegen, and style
scheme architecture.

## Layers

The `src` directory is split into six layers, ordered **top → bottom**:

| Layer | Responsibility | Examples |
|---|---|---|
| `app` | Entry point, router, plugins, providers, layout shell, global styles, themes | `main.ts`, `layouts`, `router`, `providers/pinia`, `styles/themes` |
| `pages` | Full pages: documentation, demos | `login`, `dashboard`, `demo` |
| `widgets` | Composite blocks composed of entities/features | `navigation`, `tag-bar`, `settings-panel`, `app-main` |
| `features` | User scenarios / business logic | `theme`, `access-control`, `search`, `notifications` |
| `entities` | Domain state (stores) and data entities | `user`, `settings`, `app-ui`, `permission`, `tags-view` |
| `shared` | Primitives: API transport, utils, tokens, types, neutral UI, assets | `api`, `lib`, `constants`, `types`, `ui`, `styles/tokens` |

## Hard dependency rules

- A layer imports **only strictly lower layers** (e.g. `widgets → features → entities → shared`).
- **No upward imports** — lower layers never import higher layers.
- **No sibling imports** within the same layer (`feature A ↛ feature B`, `entity Button ↛ entity Modal`).
- `app` and `shared` are also slices: their internal segments may import each other freely.
- `shared` imports **only external packages** — it contains no business logic.
- `shared/api` is transport + generated clients only. No hand-written concrete endpoint logic.
- Path aliases are used everywhere (`@/shared`, `@/entities`, `@/features`, `@/widgets`, `@/pages`, `@/app`). Forbid `../../../` chains.
- Entities never import each other. Cross-entity composition happens via slots or at widget/feature level.
- Vue composables must not touch the DOM directly (no `querySelector`, no element creation); accept targets via `MaybeRefOrGetter<EventTarget>`.

## Per-slice structure

Each entity/feature/widget uses segments:

```
slice/
├─ ui/        # presentational components
├─ model/     # types, state, variants
├─ api/       # API endpoints (if needed)
├─ lib/       # slice-internal helpers (if needed)
└─ index.ts   # single public entry point
```

Internal files are **not importable from outside the slice** — consumers import
only via the slice root (`index.ts`).

### When to add a segment

- `model/` — domain state (Pinia stores), types, variants.
- `api/` — endpoint functions for the slice (thin wrappers over `shared/api`).
- `ui/` — the components the slice renders.
- `lib/` — slice-scoped utilities that are not reused elsewhere.

Do **not** create empty segments or placeholder `index.ts` files to satisfy a
check. If a slice is empty, flag it for removal.

## Layer-by-layer

### `app`

- `main.ts` — creates the app, installs plugins/pinia/router, wires session and
  unauthorized handlers.
- `layouts` — the layout shell and its three modes (left / top / hybrid). It
  composes widgets via their public `index.ts`.
- `lib` — app-level utilities (e.g. dynamic document title).
- `plugins` — global components, custom directives (registration only; directive
  implementation lives in the owning feature).
- `providers` — the Pinia instance.
- `router` — routes, guards, helpers.
- `styles` — global styles, Element Plus/Vxe Table overrides, and theme schemes.

### `pages`

Full pages composed from widgets/features/entities. Page-specific data belongs
here (e.g. demo fixtures), not in `entities`.

### `widgets`

Composite blocks. They may import features, entities, and shared, but not other
widgets. The layout shell is composed in `app/layouts`, not inside widgets.

### `features`

User scenarios. A feature has business logic (`model/`) and/or UI (`ui/`). A
feature with neither a model nor a user action is a candidate for `shared`.

### `entities`

Reusable domain state (Pinia stores) and data entities. An entity must have
domain state (`model/`); a purely presentational component belongs in `shared/ui`.

### `shared`

- `api` — axios client, interceptors, custom mutator, and Orval-generated clients.
- `lib` — utilities and pure composables.
- `constants` — enums, cache keys, route paths.
- `types` — data contracts and ambient declarations.
- `ui` — neutral UI primitives (zero business logic; variants are neutral).
- `assets` — icons and images.
- `styles/tokens` — primitive design tokens (see below).

## API specs and codegen

OpenAPI 3.0 YAML files live in `specs/` at the repo root, one file per backend
service boundary (`users.openapi.yaml`, `tables.openapi.yaml`).

- `specs/` is git-tracked but excluded from ESLint, tsconfig, and the bundler.
- `orval.config.ts` references `./specs/*.yaml`; one Orval project per service.
- Orval generates clients into `src/shared/api/generated/`.
- **Never edit generated code manually** — regeneration overwrites it.
- Consumers import generated clients and models via `@/shared/api` (the root),
  never deep paths into `generated/`.

### Frontend model ownership

The entity model is frontend-owned:

- If the frontend model matches the OpenAPI response exactly, use a type alias.
- If it differs, transform in the slice `api/` segment or an adapter.
- Do **not** create transform layers purely for ceremony.

## Style scheme architecture (two-tier tokens)

### Tier 1 — primitive tokens (`shared/styles/tokens/`)

Raw values only: palette (`--blue-500`, `--navy-800`), spacing scale, radius.
Read-only reference layer. No scheme-specific values. Schemes never mutate
primitives.

### Tier 2 — semantic alias tokens (`app/styles/themes/`)

One file per scheme (`normal.css`, `dark.css`, `dark-blue.css`). Each defines a
`[data-theme="<name>"]` block mapping semantic names to primitives:

```css
[data-theme="dark"] {
  --color-action-primary: var(--blue-500);
  --color-surface-default: var(--dark-900);
}
```

- The only place schemes are defined. Domain slices must not define theme overrides.
- Semantic names express role, never value (`--color-surface-default`, not `--color-gray-light`).
- Every semantic token present in one scheme must exist in all schemes.

### Consumption

- `shared/ui` and `entities/*/ui` reference semantic tokens only
  (`var(--color-action-primary)`), never primitives directly (`var(--blue-600)`).
- Scheme switching toggles `data-theme` on the root element.
- Density/spacing is a separate axis (`data-density`), not mixed into `data-theme`.
- Import order in `app/styles/index.scss`: **primitives → themes → global**.

## Enforcement

- **ESLint** — `no-restricted-imports` with per-layer boundary patterns. Combine
  all patterns into a single block per file scope (later blocks silently
  override earlier ones).
- **tsconfig** — path aliases map `@/*` → `src/*`.
- **Steiger** — `steiger.config.js` with `@feature-sliced/steiger-plugin`
  (`fsd.configs.recommended`). Run `npx steiger ./src`.

## Naming conventions

- Components: PascalCase (`NavigationBar.vue`).
- Pages: kebab-case (`element-plus/index.vue`).
- Composables: camelCase with `use` prefix (`useTheme`, `use-device.ts`).
- Files: kebab-case (`use-theme.ts`, `cache-key.ts`).
- Slices: kebab-case (`access-control`, `settings-panel`).
- Props: camelCase in declaration, kebab-case in templates.
