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

## Base UI components (`shared/ui`)

The `shared/ui` directory is a library of headless, themeable base primitives.
They wrap Element Plus behind a neutral API so the app never couples to
Element Plus prop names, and they are styled exclusively with semantic tokens.

Conventions:

- **Neutral variants** — `primary | secondary | ghost | danger` (and status
  variants `success | warning | info` where relevant). Never domain-specific
  (`approve-order`).
- **Sizes** — `sm | md | lg`. **States** — `disabled`, `loading`, `active` props,
  not variant values.
- **Zero business logic** — no routing, no fetching, no store access. A nav item
  takes `href`; an action emits an event.
- Import from the slice root only: `import { Button } from "@/shared/ui"`.

### How-to-use

#### Button

```vue
<script setup>
import { Button } from "@/shared/ui"
</script>

<template>
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
  <Button variant="ghost">Reset</Button>
  <Button variant="danger" :loading="saving" @click="save">Delete</Button>
  <Button href="/docs" variant="ghost">Docs</Button>
</template>
```

#### ButtonGroup

```vue
<ButtonGroup size="sm">
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Middle</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>
```

#### Badge

```vue
<Badge variant="success">Active</Badge>
<Badge variant="danger" shape="pill">3</Badge>
```

#### Breadcrumb

```vue
<Breadcrumb :items="[
  { label: 'Home', href: '/' },
  { label: 'Settings' }
]" />
```

#### Card

```vue
<Card title="Profile">
  <p>Content</p>
  <template #footer>
    <Button variant="primary">Save</Button>
  </template>
</Card>
```

#### Alert

```vue
<Alert variant="danger" title="Request failed" description="Please try again." />
<Alert variant="success" title="Saved" closable />
```

#### Spinner

```vue
<Spinner size="sm" />
<Spinner />
<Spinner variant="grow" size="lg" />
```

#### Progress

```vue
<Progress :value="60" />
<Progress :value="30" variant="warning" striped />
<Progress :value="80" variant="success" animated />
```

#### Nav / NavLink

```vue
<Nav>
  <NavLink href="/dashboard" active>Dashboard</NavLink>
  <NavLink href="/settings">Settings</NavLink>
  <NavLink disabled>Disabled</NavLink>
</Nav>
```

#### Tabs

```vue
<script setup>
import { ref } from "vue"
import { Tabs } from "@/shared/ui"

const active = ref("overview")
</script>

<template>
  <Tabs v-model="active" :items="[{ label: 'Overview', name: 'overview' }]">
    <template #overview>Overview content</template>
  </Tabs>
</template>
```

#### Pagination

```vue
<script setup>
import { ref } from "vue"
import { Pagination } from "@/shared/ui"

const page = ref(1)
</script>

<template>
  <Pagination v-model="page" :total="100" :page-size="10" />
</template>
```

#### ListGroup / ListGroupItem

```vue
<ListGroup>
  <ListGroupItem active>Item one</ListGroupItem>
  <ListGroupItem>Item two</ListGroupItem>
  <ListGroupItem disabled>Item three</ListGroupItem>
</ListGroup>
```

#### Modal

```vue
<script setup>
import { ref } from "vue"
import { Modal } from "@/shared/ui"

const open = ref(false)
</script>

<template>
  <Modal v-model="open" title="Confirm" size="sm">
    <p>Are you sure?</p>
    <template #footer>
      <Button variant="primary" @click="open = false">Confirm</Button>
    </template>
  </Modal>
</template>
```

#### Dropdown

```vue
<script setup>
import { Dropdown, Button } from "@/shared/ui"

const items = [
  { label: "Profile" },
  { label: "Settings" },
  { label: "Log out", divided: true }
]
</script>

<template>
  <Dropdown :items="items" @select="(item) => console.log(item.label)">
    <Button variant="secondary">Menu</Button>
  </Dropdown>
</template>
```

#### Tooltip

```vue
<Tooltip content="Add an item" placement="top">
  <Button variant="primary">+</Button>
</Tooltip>
```

#### Popover

```vue
<Popover title="Help" trigger="hover">
  <template #content>More details…</template>
  <Button variant="ghost">?</Button>
</Popover>
```

#### Accordion

```vue
<script setup>
import { ref } from "vue"
import { Accordion } from "@/shared/ui"

const open = ref("one")
</script>

<template>
  <Accordion
    v-model="open"
    :items="[{ title: 'One', name: 'one' }, { title: 'Two', name: 'two' }]"
  >
    <template #one>First panel</template>
    <template #two>Second panel</template>
  </Accordion>
</template>
```

#### Collapse

```vue
<script setup>
import { ref } from "vue"
import { Collapse } from "@/shared/ui"

const open = ref(["one"])
</script>

<template>
  <Collapse v-model="open" :items="[{ title: 'One', name: 'one' }]">
    <template #one>Panel content</template>
  </Collapse>
</template>
```

#### Toast

```vue
<script setup>
import { ref } from "vue"
import { Toast } from "@/shared/ui"

const visible = ref(true)
</script>

<template>
  <Toast :visible="visible" variant="success" @close="visible = false">
    Changes saved.
  </Toast>
</template>
```

#### Carousel

```vue
<Carousel :items="[{ name: 'a' }, { name: 'b' }]" :interval="3000">
  <template #default="{ item }">{{ item.name }}</template>
</Carousel>
```

#### Chip

```vue
<Chip variant="danger" dismissible @close="remove">Tag</Chip>
```

#### Placeholder

```vue
<Placeholder width="100%" height="1rem" />
<Placeholder width="50%" height="2rem" :animated="false" />
```

#### Form controls

```vue
<script setup>
import { ref } from "vue"
import { Checkbox, Input, InputGroup, Label, Radio, Range, Select, Textarea } from "@/shared/ui"

const name = ref("")
const bio = ref("")
const agreed = ref(false)
const plan = ref("pro")
const option = ref("a")
const volume = ref(50)
</script>

<template>
  <Label for="name">Name</Label>
  <Input id="name" v-model="name" placeholder="Your name" />

  <Label>Bio</Label>
  <Textarea v-model="bio" :rows="3" />

  <Checkbox v-model="agreed" label="I agree" />

  <Radio v-model="option" value="a" label="Option A" />

  <Select v-model="plan" :options="[{ label: 'Pro', value: 'pro' }]" />

  <Range v-model="volume" :min="0" :max="100" />

  <InputGroup>
    <template #prepend>@</template>
    <Input v-model="name" />
  </InputGroup>
</template>
```

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
