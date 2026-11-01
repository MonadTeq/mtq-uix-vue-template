<script lang="ts" setup>
export interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
  shape?: "rounded" | "pill"
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: "primary",
  shape: "rounded"
})

const elType = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "info"
    default:
      return props.variant
  }
})
</script>

<template>
  <el-tag :type="elType" :round="shape === 'pill'">
    <slot />
  </el-tag>
</template>
