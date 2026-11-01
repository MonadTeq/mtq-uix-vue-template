<script lang="ts" setup>
import { message, useFullscreenLoading } from "@/shared/lib"
import { Alert, Button, Card } from "@/shared/ui"
import { getErrorApi, getSuccessApi } from "./apis/use-fullscreen-loading"

const options = {
  text: "An error is about to occur..."
}

async function querySuccess() {
  const res = await useFullscreenLoading(getSuccessApi)([1, 2, 3])
  message.success(`${res.message}, parameters: ${res.data.list.toString()}`)
}

async function queryError() {
  try {
    await useFullscreenLoading(getErrorApi, options)()
  } catch (error) {
    message.error((error as Error).message)
  }
}
</script>

<template>
  <div class="app-container">
    <Alert
      variant="primary"
      title="Example description"
      description="Pass the function to be executed to the composable so that the composable automatically turns on fullscreen loading, and automatically turns off loading after the function finishes executing"
    />
    <Card title="Example" shadow="never">
      <div class="row">
        <Button variant="primary" @click="querySuccess">
          Query success
        </Button>
        <Button variant="danger" @click="queryError">
          Query failure
        </Button>
      </div>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  gap: var(--space-2);
}
</style>
