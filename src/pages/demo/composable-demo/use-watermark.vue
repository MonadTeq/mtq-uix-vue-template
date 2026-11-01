<script lang="ts" setup>
import { useWatermark } from "@@/composables/useWatermark"

const localRef = useTemplateRef("localRef")

const { setWatermark, clearWatermark } = useWatermark(localRef)

const { setWatermark: setGlobalWatermark, clearWatermark: clearGlobalWatermark } = useWatermark()
</script>

<template>
  <div class="app-container">
    <el-alert
      title="Example description"
      type="primary"
      description="Enable or disable the watermark by calling the composable, supporting local, global, and custom styles (color, opacity, font size, font, tilt angle, etc.), and built-in defense (against deletion and hiding) and adaptive features"
      show-icon
    />
    <el-card header="Example" shadow="never">
      <div ref="localRef" class="local" />
      <template #footer>
        <el-button-group>
          <el-button type="primary" @click="setWatermark('Local watermark', { color: '#409eff' })">
            Create local watermark
          </el-button>
          <el-button type="warning" @click="setWatermark('Local watermark without defense', { color: '#e6a23c', defense: false })">
            Create local watermark without defense
          </el-button>
          <el-button type="danger" @click="clearWatermark">
            Clear local watermark
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary" @click="setGlobalWatermark('Global watermark', { color: '#409eff' })">
            Create global watermark
          </el-button>
          <el-button type="warning" @click="setGlobalWatermark('Global watermark without defense', { color: '#e6a23c', defense: false })">
            Create global watermark without defense
          </el-button>
          <el-button type="danger" @click="clearGlobalWatermark">
            Clear global watermark
          </el-button>
        </el-button-group>
      </template>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-alert {
  margin-bottom: 20px;
}

.el-card {
  margin-bottom: 20px;
}

.local {
  height: 35vh;
  border: 2px dashed var(--el-color-primary);
}

.el-button-group {
  margin-right: 12px;
  margin-bottom: 5px;
}
</style>
