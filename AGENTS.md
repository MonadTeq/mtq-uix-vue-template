---
name: mtq-uix-fsd-full
description: >
  Project-wide FSD architecture skill for the MTQ UiX Vue.js design system.
  Enforces layer boundaries, per-slice structure, OpenAPI spec organization,
  two-tier token/scheme architecture, and dependency linting. Also handles
  one-time refactors (audit + restructure), docs localization, and API codegen
  setup. Use for: architecture audits, layer enforcement, slice restructure,
  API spec organization, theme/scheme architecture, "FSD + docs cleanup".
  Triggers on "full FSD skill", "architecture overhaul", "enforce boundaries",
  "design system restructure", "organize OpenAPI specs", "style scheme
  architecture".
disable-model-invocation: true
allowed-tools: Read Grep Glob Bash Write Edit
---

# Full FSD Refactor + API Specs + Style Schemes + Docs Localization

You are a senior frontend architect. Execute a complete, auditable refactor of a
Vue.js design system into Feature-Sliced Design (FSD), organize OpenAPI
specifications and codegen, set up a two-tier token/scheme style architecture,
then translate and remove Chinese-language documentation. Do NOT start moving
files before completing the audit and receiving explicit approval for flagged
items.

## Principles

Before starting Phase 0, read and internalize:

1. `ARCHITECTURE.md` at repo root — project-wide architecture principles.
   Follow its rules in addition to this skill. If it conflicts with this
   skill, STOP and ask the user which takes precedence.
2. `DEVELOPMENT.md` at repo root — development guidelines (naming, testing,
   commit conventions, code style). Apply them to every file you write.

If either file is missing, flag it in Phase 0 output and proceed without it —
do not fail the task. Do not assume their contents; read them explicitly.

## Target layers (top → bottom, may import only strictly lower layers)

1. `app` — entry, providers, plugins, router, global styles, layouts, themes
2. `pages` — documentation, demos
3. `widgets` — composite blocks (navigation, tags-view, settings-panel, app-main)
4. `features` — user scenarios (theme, color-mode, layout-mode, access-control,
   notifications, search)
5. `entities` — reusable UI entities with domain state (user, settings, app-ui,
   permission, tags-view)
6. `shared` — primitives, tokens, utils, API transport (imports only external packages)

## Hard dependency rules

- A layer imports ONLY strictly lower layers.
- NO sibling imports within the same layer (feature A ↛ feature B; entity Button ↛ entity Modal).
- NO upward imports (lower layers never import higher layers).
- `app` and `shared` are also slices: their internal segments may import each other freely.
- Use path aliases (`@/shared/ui`, `@/entities/button`). Forbid cross-layer `../../..` chains.
- `shared/ui` contains ZERO business logic. Variants neutral: `'primary' | 'secondary'`.
- Entities never import each other. Cross-entity composition via slots or at widget/feature level.
- Vue composables must not touch DOM directly (no `querySelector`, no element creation); accept targets via `MaybeRefOrGetter<EventTarget>`.
- `shared/api` contains transport and generated clients only. NO hand-written concrete endpoint logic — those belong in `slice/api/`. Generated code is exempt but must stay in `generated/`.

## Per-slice structure

Each entity/feature/widget uses segments: `ui/`, `model/` (types, state, variants), `api/` (if needed), `lib/` (if needed), and a single public `index.ts`. Internal files are NOT importable from outside the slice — only via the slice root.

## OpenAPI YAML storage standard (specs/)

- YAML files live in `specs/` at repo root, named by backend service boundary
  (`users.openapi.yaml`, not `entities-user.yaml`).
- `specs/` is git-tracked but excluded from ESLint, tsconfig, and bundler.
- `orval.config.ts` at repo root references `./specs/*.yaml` as `input.target`.
  One Orval project per backend service boundary, not per UI slice.
- Generated output goes to `src/shared/api/generated/`. Never edit manually —
  regeneration overwrites.
- `specs/README.md` documents owner and update process.
  `src/shared/api/generated/README.md` documents the regeneration command.
- Entity model is frontend-owned. If the model matches the OpenAPI response
  exactly, a type alias is acceptable; if it differs, transform in the slice
  `api/` segment or an adapter. Do NOT create transform layers purely for
  ceremony.
- Consumers import generated code via `@/shared/api` root, never deep paths.

## Style scheme architecture (two-tier tokens)

**Tier 1 — primitive tokens (`shared/styles/tokens/`)**
- Raw values only: palette (`--blue-500`), spacing scale, typography, radius.
- Read-only reference layer. No scheme-specific values. Schemes never mutate
  primitives.

**Tier 2 — semantic alias tokens (per scheme in `app/styles/themes/`)**
- One file per scheme. Each defines `[data-theme="<name>"]` blocks mapping
  semantic names to primitives (`--color-action-primary: var(--blue-600)`).
- The ONLY place schemes are defined. Domain slices MUST NOT define theme overrides.
- Semantic names express role, never value (`--color-surface-default`, not
  `--color-gray-light`).

**Consumption**
- `shared/ui` and `entities/*/ui` reference semantic alias tokens only
  (`var(--color-action-primary)`), never primitives directly (`var(--blue-600)`).
- Scheme switching toggles `data-theme` on the root element.
- Density/spacing is a separate axis (`data-density`), NOT mixed into `data-theme`.
- Every semantic token present in one scheme MUST exist in all schemes.
- Optional: CSS `@layer` to control cascade (`@layer tokens.theme, components`).

## Workflow (execute in order)

If a phase fails irrecoverably, STOP and report. Do NOT proceed to later phases
on a broken base.

### Phase 0 — Inventory and classification audit (NO file moves)

0. Read `ARCHITECTURE.md` and `DEVELOPMENT.md` (see Principles). If either is
   missing, flag it and proceed without it.
1. Scan the repo. Produce a mapping table: every module → target layer/slice/segment.
2. Run the **pre-refactor audit checks** below. Flag every ambiguous case.
3. Present the table and flagged items. **STOP and wait for approval.**

### Phase 1 — Baseline

Confirm tests/lint/build pass. Record current public API surface of every slice.

### Phase 2 — Execute bottom-up

Refactor `shared` → `entities` → `features` → `widgets` → `pages` → `app`.
One slice at a time. For each moved module: update imports to aliases,
create/adjust public `index.ts`, delete old location, run tests and lint.

### Phase 3 — API spec organization

1. Move OpenAPI YAML files to `specs/`, renamed by backend service boundary.
2. Create `orval.config.ts`, one project per service.
3. Configure `output.schemas` to `./src/shared/api/generated/<service>-model`.
4. Exclude `specs/` from ESLint and tsconfig.
5. Add `codegen:api` script.
6. Run codegen; verify compilation.
7. Audit consumers: rewrite deep imports into `generated/` to `@/shared/api`.
8. Audit entity models: where the model differs from the OpenAPI response,
   introduce a frontend model + transform in `api/`. Where it matches exactly,
   a type alias is fine — do NOT add ceremony transforms.
9. Write `specs/README.md` and `src/shared/api/generated/README.md`.

### Phase 4 — Style scheme setup

Apply the Style scheme architecture above. Concrete steps:

1. Verify `shared/styles/tokens/` holds primitives only; move scheme values to `app/styles/themes/`.
2. Verify each scheme has exactly one file with a `[data-theme="<name>"]` block. Flag missing schemes and orphan blocks.
3. Rewrite direct primitive references in `shared/ui` and `entities/*/ui` to semantic aliases.
4. Verify `app/styles/index.css` composes primitives BEFORE schemes BEFORE global styles — check actual `@import` / `@use` order, not just presence.
5. Verify scheme switching toggles `data-theme` on the root element.
6. If density/spacing modes exist, separate into `data-density`.
7. If scheme files already exist in another format, map them to the new structure and remove duplicates — do not leave two sources of truth.

To find primitive-token violations in step 3, run:

    rg -o 'var\(--[a-z]+-[0-9]+\)' src/shared/ui/ src/entities/*/ui/ | sort -u

Any `<hue>-<scale>` reference in UI is a violation.

### Phase 5 — Add enforcement

- Configure ESLint `no-restricted-imports` with explicit layer/sibling boundary
  patterns and custom error messages. Combine ALL patterns into a SINGLE block
  per file scope — later blocks silently override earlier ones.
- Configure `tsconfig` paths for aliases; exclude `specs/`.
- Install and configure Steiger: `npm i -D steiger @feature-sliced/steiger-plugin`,
  create `steiger.config.js` with `...fsd.configs.recommended`. Run
  `npx steiger ./src` and resolve all violations.

### Phase 6 — Documentation localization (Chinese → English)

1. Scan for CJK characters (`\u4e00-\u9fff`) in Markdown (prose >30% CJK),
   JSDoc/comments in source, and `.txt`/`.rst`/`.adoc` docs.
2. **Exclude**: i18n locales (`zh-CN.json`, `locales/zh/**`), test fixtures,
   generated/vendored files, lockfiles, `specs/` YAML.
3. Translate approved docs to English. Preserve code blocks, commands, paths,
   config keys, URLs, API names, Markdown structure verbatim.
4. Write English replacement at the same path (or in place for comments).
5. Verify: re-scan for CJK; confirm clean outside excluded paths.
6. Delete Chinese originals only after English replacement is verified.

### Phase 7 — Final verification

Full build + test + typecheck + lint + Steiger + codegen must pass. Additionally:

- Smoke-test scheme switching (Playwright/Cypress or manual): toggle
  `data-theme` on the root, assert at least one computed color changed.
- Smoke-test density axis if present.

Produce:
- Diff summary.
- List of public API changes (breaking changes documented).
- List of unenforceable rules with explanation.

## Pre-refactor audit checks (run in Phase 0)

| # | Check | How to detect | Action |
|---|-------|---------------|--------|
| 1 | Duplicate slice names across layers | `rg -l 'export' src/*/{widgets,entities}/<name>` compare | Flag; verify direction is higher → lower |
| 2 | Misfiled feature | No `model/`, no user action | Propose `shared/lib` or `shared/ui` |
| 3 | Misfiled entity | No `model/` with domain state | Propose `shared/ui` |
| 4 | Sibling imports | `rg "@/widgets/" src/widgets/` etc. for each layer | Flag every hit |
| 5 | `shared/api` domain leakage | `rg '/api/\|endpoints' src/shared/api/ --glob '!**/generated/**'` | Move to `slice/api/` |
| 6 | `shared/ui` business logic | `rg "variant.*'(approve\|order\|reject)'" src/shared/ui/` | Neutralize |
| 7 | Oversized widgets | Count sub-dirs in `widgets/*/ui/`; >3 distinct areas | Propose splitting |
| 8 | Import depth violations | `rg "from '\.\./\.\./\.\./" src/ --glob '!**/node_modules/**'` | Must use aliases |
| 9 | Side-effect misfiling | Feature reacting to router | Propose `app` |
| 10 | Missing public API | Slice without `index.ts` | Add `index.ts` (but see Constraint on empty files) |
| 11 | Page-specific data in entities | `rg '@/pages/' src/entities/` cross-check usage | Move to `pages/<page>/` |
| 12 | UI primitives inside widgets | Neutral components in `widgets/*/ui/` | Move to `shared/ui` |
| 13 | Directive registration path | Impl in feature, registration in `app/plugins` | Verify direction |
| 14 | Public API bypass in pages | `rg "@/features/[^']+/ui/\|@/entities/[^']+/model/" src/pages/` | Rewrite through slice root |
| 15 | `app/layouts` composition | `rg "@/widgets/[^']+/ui/" src/app/layouts/` | Import via widget `index.ts` |
| 16 | OpenAPI YAML location | `find . -name '*.openapi.yaml' -not -path './specs/*'` | Move and rename |
| 17 | Raw OpenAPI types in entity model | `rg 'from .@/shared/api/generated' src/entities/*/model/` | Frontend model + transform, unless exact match |
| 18 | Generated code edited manually | `git diff --stat src/shared/api/generated/` vs codegen | Regenerate; flag |
| 19 | Codegen spec drift | `find specs -newer src/shared/api/generated -name '*.yaml'` | Run codegen |
| 20 | Scheme values in primitives | `rg '\[data-theme=\|--color-(surface\|text\|action\|border)-' src/shared/styles/tokens/` | Move to `app/styles/themes/` |
| 21 | Primitive tokens used directly in UI | `rg -o 'var\(--[a-z]+-[0-9]+\)' src/shared/ui/ src/entities/*/ui/ \| sort -u` | Rewrite to semantic alias |
| 22 | Theme overrides outside themes dir | `rg '\[data-theme=' src/ --glob '!src/app/styles/themes/**'` | Flag; consolidate |
| 23 | Density mixed into theme | `rg -U '\[data-theme=[^\]]+\][^{]*\{[^}]*data-density' src/` | Separate axes |
| 24 | Scheme token coverage gap | Parse `[data-theme="default"]` tokens; diff against other schemes | Add missing tokens to all schemes |

## Constraints

- **No file moves before Phase 0 approval.** Flagged items resolved by user.
- **If a phase fails irrecoverably, STOP and report** — do not proceed on a broken base.
- Do NOT create empty `index.ts`, empty slices, or placeholder files purely to
  satisfy a check. If a slice is empty, flag it for removal.
- No new runtime dependencies unless strictly necessary; justify.
- No behavior/props/events changes unless a rule forces it — document as breaking.
- Preserve existing tests; relocate alongside slices; keep green.
- Do not translate code, identifiers, config keys, UI strings, or `specs/` YAML.
- Do not delete a Chinese doc before English replacement is verified.
- Do not hand-edit `shared/api/generated/` — regenerate instead.
- Schemes defined ONLY in `app/styles/themes/`; components use semantic tokens only.
- Commit/PR scope: per layer, per slice, or per phase where possible.

## Gotchas

- Agents move files immediately. Force the audit table first.
- `widgets/layout` split is good; the trap is `app/layouts` reaching into widget
  internals — enforce public `index.ts`.
- Layer-name collisions (`widgets/tags-view` + `entities/tags-view`) are
  legitimate; only the direction matters (higher → lower).
- `entities/table` holding demo fixtures is page-specific data — move to `pages/demo/`.
- `shared/api` with concrete endpoints is domain leakage; generated clients are the exception.
- ESLint `no-restricted-imports` blocks do NOT merge — one block per file scope.
- Steiger is in beta; pin a version and review output before gating CI.
- Orval regeneration overwrites `generated/` — never hand-edit; add CI diff check.
- `README.zh.md` + `README.md` pairs: don't delete Chinese until English is verified.
- Locale files look like docs but are runtime data — deleting breaks the app.
- YAML in `src/` passes through bundler/linters unexpectedly — keep `specs/` at root.
- Components referencing primitive tokens (`var(--blue-600)`) break when schemes
  switch — semantic alias tokens are mandatory for themability.
- Scheme values leaked into `shared/styles/tokens/` makes primitives
  scheme-dependent — defeats the two-tier design.
- Mixing density into `data-theme` makes the two axes inseparable — separate
  `data-density`.
- A new semantic token added to only one scheme silently inherits from `:root`
  or falls back to nothing — every scheme must declare every token.
- Import order in `app/styles/index.css` matters: schemes AFTER primitives,
  global AFTER schemes. Wrong order = silent cascade bugs.
- If existing scheme files already exist in another format, keeping both
  creates two sources of truth — map and remove duplicates.

## Deliverables

1. **Audit report** — mapping table with every flagged item and proposed action.
2. **Refactored repository** — FSD layers, aliases, public APIs, old locations removed.
3. **API spec setup** — `specs/` by service, `orval.config.ts`, `codegen:api`
   script, `specs/README.md` (owner/update process),
   `src/shared/api/generated/README.md` (regeneration command), generated
   output compiling.
4. **Style scheme setup** — `shared/styles/tokens/` primitives only,
   `app/styles/themes/` one file per scheme, components on semantic tokens,
   switching via `data-theme`, density separated if present, import order
   verified, legacy scheme files mapped and removed.
5. **Enforcement config** — ESLint + `tsconfig` paths + Steiger committed.
6. **Documentation localization** — English replacements, CJK rescan clean,
   Chinese originals deleted.
7. **Verification report** — build/test/typecheck/lint/Steiger/codegen results,
   scheme-switch smoke test result, breaking changes list, unenforceable rules
   with explanation.