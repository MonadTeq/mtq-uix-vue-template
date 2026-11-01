<script lang="ts" setup>
import { Card } from "@/shared/ui"

const services = [
  { file: "users.openapi.yaml", service: "Users (current session)" },
  { file: "tables.openapi.yaml", service: "Tables (demo CRUD)" }
]

const steps = [
  "Edit the relevant <service>.openapi.yaml when the contract changes.",
  "Run pnpm codegen:api to regenerate clients.",
  "Consume generated clients via @/shared/api.",
  "Never hand-edit src/shared/api/generated/ — it is overwritten."
]
</script>

<template>
  <div class="app-container">
    <h1>API &amp; Codegen</h1>
    <p class="lead">
      OpenAPI specs live in <code>specs/</code> (one file per backend service).
      Orval generates TypeScript clients into
      <code>src/shared/api/generated/</code>.
    </p>

    <Card title="Specs" class="section">
      <ul class="list">
        <li v-for="service in services" :key="service.file" class="item">
          <code class="item__name">specs/{{ service.file }}</code>
          <span class="item__role">{{ service.service }}</span>
        </li>
      </ul>
    </Card>

    <Card title="Workflow" class="section">
      <ol class="list">
        <li v-for="step in steps" :key="step" class="item" v-html="step" />
      </ol>
    </Card>

    <Card title="Usage" class="section">
      <pre class="code">import { getUsersService } from "@/shared/api"

const { getCurrentUser } = getUsersService()
const { data } = await getCurrentUser()</pre>
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

.list {
  margin: 0;
  padding-left: var(--space-5);
}

.item {
  padding: var(--space-1) 0;
  color: var(--color-text-regular);
}

.item__name {
  color: var(--color-action-primary);
}

.item__role {
  margin-left: var(--space-2);
  color: var(--color-text-secondary);
}

.code {
  background-color: var(--color-surface-hover);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  overflow: auto;
}
</style>
