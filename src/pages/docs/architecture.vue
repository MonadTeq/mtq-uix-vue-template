<script lang="ts" setup>
import { Badge, Card } from "@/shared/ui"

const layers = [
  { name: "app", role: "Entry point, router, plugins, providers, layout shell, global styles, themes" },
  { name: "pages", role: "Full pages: documentation, demos" },
  { name: "widgets", role: "Composite blocks composed of entities/features" },
  { name: "features", role: "User scenarios / business logic" },
  { name: "entities", role: "Domain state (stores) and data entities" },
  { name: "shared", role: "Primitives: API transport, utils, tokens, types, neutral UI, assets" }
]

const rules = [
  "A layer imports only strictly lower layers (widgets → features → entities → shared).",
  "No upward imports — lower layers never import higher layers.",
  "No sibling imports within the same layer.",
  "shared imports only external packages; it contains no business logic.",
  "shared/api is transport + generated clients only.",
  "Entities never import each other; cross-entity composition via slots or at widget/feature level.",
  "Path aliases are used everywhere (@/shared, @/entities, …); no ../../../ chains."
]
</script>

<template>
  <div class="app-container">
    <h1>Architecture</h1>
    <p class="lead">
      MTQ UiX Vue follows <strong>Feature-Sliced Design (FSD)</strong> — code is
      organized by business domain rather than technical role. Each module lives
      in one of six layers, and dependencies only flow downward.
    </p>

    <Card title="Layers" class="section">
      <ul class="layers">
        <li v-for="layer in layers" :key="layer.name" class="layer">
          <code class="layer__name">src/{{ layer.name }}</code>
          <span class="layer__role">{{ layer.role }}</span>
        </li>
      </ul>
    </Card>

    <Card title="Dependency rules" class="section">
      <ul>
        <li v-for="rule in rules" :key="rule" class="rule">
          {{ rule }}
        </li>
      </ul>
    </Card>

    <Card title="Boundary enforcement" class="section">
      <div class="inline">
        <Badge variant="primary">ESLint</Badge>
        <Badge variant="secondary">no-restricted-imports</Badge>
        <Badge variant="success">Steiger</Badge>
        <Badge variant="secondary">tsconfig paths</Badge>
      </div>
      <p class="hint">
        Run <code>npx steiger ./src</code> to verify the FSD boundaries.
      </p>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.lead {
  color: var(--color-text-regular);
  margin-bottom: var(--space-5);
}

.section {
  margin-bottom: var(--space-5);
}

.layers {
  list-style: none;
  margin: 0;
  padding: 0;
}

.layer {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border-default);
}

.layer__name {
  min-width: 140px;
  font-weight: 600;
  color: var(--color-action-primary);
}

.layer__role {
  color: var(--color-text-regular);
}

.rule {
  padding: var(--space-1) 0;
  color: var(--color-text-regular);
}

.inline {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.hint {
  margin-top: var(--space-3);
  color: var(--color-text-secondary);
}
</style>
