<script lang="ts" setup>
import { ref } from "vue"
import { Alert, Badge, Button, Card, Progress, Spinner, Tabs } from "@/shared/ui"

const tabs = [
  { label: "Overview", name: "overview" },
  { label: "Buttons", name: "buttons" },
  { label: "Feedback", name: "feedback" }
]

const activeTab = ref("overview")

const loading = ref(false)
</script>

<template>
  <div class="app-container">
    <Card title="UI Primitives">
      <Alert variant="success" title="Shared UI library" description="Base primitives built on semantic tokens." class="mb" />

      <Tabs v-model="activeTab" :items="tabs">
        <template #overview>
          <div class="row">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge shape="pill">Pill</Badge>
          </div>
          <div class="row">
            <Spinner size="sm" />
            <Spinner />
            <Spinner variant="grow" size="lg" />
          </div>
          <Progress :value="60" />
          <Progress :value="30" variant="warning" striped />
        </template>
        <template #buttons>
          <div class="row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button :loading="loading" @click="loading = !loading">
              Toggle loading
            </Button>
          </div>
        </template>
        <template #feedback>
          <Alert variant="primary" title="Info" />
          <Alert variant="warning" title="Warning" />
          <Alert variant="danger" title="Danger" />
        </template>
      </Tabs>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: center;
  margin-bottom: var(--space-4);
}

.mb {
  margin-bottom: var(--space-4);
}
</style>
