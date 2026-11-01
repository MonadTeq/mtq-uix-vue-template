<script lang="ts" setup>
import { useWatermark } from "@/shared/lib"
import { Alert, Button, ButtonGroup, Card } from "@/shared/ui"

const localRef = useTemplateRef("localRef")

const { setWatermark, clearWatermark } = useWatermark(localRef)

const { setWatermark: setGlobalWatermark, clearWatermark: clearGlobalWatermark } = useWatermark()
</script>

<template>
  <div class="app-container">
    <Alert
      variant="primary"
      title="Example description"
      description="Enable or disable the watermark by calling the composable, supporting local, global, and custom styles, and built-in defense and adaptive features"
    />
    <Card title="Example" shadow="never">
      <div ref="localRef" class="local" />
      <template #footer>
        <ButtonGroup class="group">
          <Button variant="primary" @click="setWatermark('Local watermark', { color: '#409eff' })">
            Create local watermark
          </Button>
          <Button variant="secondary" @click="setWatermark('Local watermark without defense', { color: '#e6a23c', defense: false })">
            Create local watermark without defense
          </Button>
          <Button variant="danger" @click="clearWatermark">
            Clear local watermark
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="primary" @click="setGlobalWatermark('Global watermark', { color: '#409eff' })">
            Create global watermark
          </Button>
          <Button variant="secondary" @click="setGlobalWatermark('Global watermark without defense', { color: '#e6a23c', defense: false })">
            Create global watermark without defense
          </Button>
          <Button variant="danger" @click="clearGlobalWatermark">
            Clear global watermark
          </Button>
        </ButtonGroup>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.local {
  height: 35vh;
  border: 2px dashed var(--color-action-primary);
}

.group {
  margin-right: 12px;
  margin-bottom: 5px;
}
</style>
