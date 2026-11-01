<script lang="ts" setup>
export interface AlertProps {
  variant?: "primary" | "success" | "warning" | "danger" | "info"
  title?: string
  description?: string
  closable?: boolean
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: "primary"
})

const elType = computed(() => {
  switch (props.variant) {
    case "primary":
      return "primary"
    case "success":
      return "success"
    case "warning":
      return "warning"
    case "danger":
      return "error"
    default:
      return "info"
  }
})
</script>

<template>
  <el-alert :type="elType" :title="title" :description="description" :closable="closable">
    <slot />
  </el-alert>
</template>
