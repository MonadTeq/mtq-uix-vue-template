<script lang="ts" setup>
import { useFullscreenLoading } from "@/shared/lib"
import { getErrorApi, getSuccessApi } from "./apis/use-fullscreen-loading"

const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`

const options = {
  text: "An error is about to occur...",
  background: "#F56C6C20",
  svg,
  svgViewBox: "-10, -10, 50, 50"
}

async function querySuccess() {
  // Note:
  // 1. getSuccessApi is a function rather than a function call
  // 2. To pass arguments to the getSuccessApi function, do so in the parentheses that follow (the actual getSuccessApi call)
  const res = await useFullscreenLoading(getSuccessApi)([1, 2, 3])
  ElMessage.success(`${res.message}, parameters: ${res.data.list.toString()}`)
}

async function queryError() {
  try {
    await useFullscreenLoading(getErrorApi, options)()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}
</script>

<template>
  <div class="app-container">
    <el-alert
      title="Example description"
      type="primary"
      description="Pass the function to be executed to the composable so that the composable automatically turns on fullscreen loading, and automatically turns off loading after the function finishes executing"
      show-icon
    />
    <el-card header="Example" shadow="never">
      <el-button type="primary" @click="querySuccess">
        Query success
      </el-button>
      <el-button type="danger" @click="queryError">
        Query failure
      </el-button>
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
</style>
