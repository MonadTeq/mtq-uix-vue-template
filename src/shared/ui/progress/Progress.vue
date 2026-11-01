<script lang="ts" setup>
export interface ProgressProps {
  value?: number
  variant?: "primary" | "success" | "warning" | "danger"
  striped?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  variant: "primary"
})

const elStatus = computed(() => {
  switch (props.variant) {
    case "success":
      return "success"
    case "warning":
      return "warning"
    case "danger":
      return "exception"
    default:
      return undefined
  }
})
</script>

<template>
  <el-progress
    :percentage="value"
    :status="elStatus"
    :striped="striped || animated"
    :striped-flow="animated"
  />
</template>
