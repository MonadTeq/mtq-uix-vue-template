<script lang="ts" setup>
export interface ChipProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
  dismissible?: boolean
}

const props = withDefaults(defineProps<ChipProps>(), {
  variant: "secondary",
  dismissible: false
})

const emit = defineEmits<{
  (e: "close"): void
}>()

const elType = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "info"
    case "success":
      return "success"
    case "warning":
      return "warning"
    case "danger":
      return "danger"
    default:
      return "primary"
  }
})
</script>

<template>
  <el-tag :type="elType" :closable="dismissible" @close="emit('close')">
    <slot />
  </el-tag>
</template>
