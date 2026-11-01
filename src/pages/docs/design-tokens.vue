<script lang="ts" setup>
import { Card } from "@/shared/ui"

const primitives = [
  { name: "--blue-500", value: "#409eff" },
  { name: "--teal-500", value: "#00bb99" },
  { name: "--green-500", value: "#67c23a" },
  { name: "--yellow-500", value: "#e6a23c" },
  { name: "--red-500", value: "#f56c6c" },
  { name: "--navy-800", value: "#001b44" },
  { name: "--dark-900", value: "#141414" },
  { name: "--gray-400", value: "#909399" },
  { name: "--space-4", value: "16px" },
  { name: "--radius-md", value: "4px" },
  { name: "--font-size-md", value: "14px" }
]

const semantic = [
  { name: "--color-action-primary", role: "Primary action color" },
  { name: "--color-action-secondary", role: "Secondary action color" },
  { name: "--color-action-danger", role: "Destructive action color" },
  { name: "--color-status-success", role: "Success status" },
  { name: "--color-status-warning", role: "Warning status" },
  { name: "--color-surface-default", role: "Default surface" },
  { name: "--color-surface-hover", role: "Hovered surface" },
  { name: "--color-text-primary", role: "Primary text" },
  { name: "--color-border-default", role: "Default border" },
  { name: "--color-focus-ring", role: "Focus outline" }
]
</script>

<template>
  <div class="app-container">
    <h1>Design Tokens</h1>
    <p class="lead">
      Styling uses a <strong>two-tier token system</strong>: raw primitive tokens
      (Tier 1) and semantic alias tokens (Tier 2). Components consume only
      semantic tokens, so switching schemes never breaks the UI.
    </p>

    <Card title="Tier 1 — Primitive tokens (shared/styles/tokens)" class="section">
      <p class="hint">Raw values only. No scheme-specific values.</p>
      <ul class="token-list">
        <li v-for="token in primitives" :key="token.name" class="token">
          <code class="token__name">{{ token.name }}</code>
          <span class="token__value">{{ token.value }}</span>
        </li>
      </ul>
    </Card>

    <Card title="Tier 2 — Semantic alias tokens (app/styles/themes)" class="section">
      <p class="hint">
        One file per scheme, each declaring a <code>[data-theme="…"]</code> block.
        Every semantic token must exist in every scheme.
      </p>
      <ul class="token-list">
        <li v-for="token in semantic" :key="token.name" class="token">
          <code class="token__name">{{ token.name }}</code>
          <span class="token__value">{{ token.role }}</span>
        </li>
      </ul>
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

.hint {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.token-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.token {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-1) 0;
  border-bottom: 1px solid var(--color-border-default);
}

.token__name {
  min-width: 220px;
  color: var(--color-action-primary);
}

.token__value {
  color: var(--color-text-regular);
}
</style>
