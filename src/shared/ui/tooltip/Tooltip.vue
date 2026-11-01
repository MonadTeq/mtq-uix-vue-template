<script lang="ts" setup>
export interface TooltipProps {
  content: string
  placement?: "top" | "bottom" | "left" | "right"
}

withDefaults(defineProps<TooltipProps>(), {
  placement: "top"
})

defineSlots<{
  default?: () => unknown
}>()
</script>

<template>
  <el-tooltip :content="content" :placement="placement" effect="dark">
    <slot />
  </el-tooltip>
</template>
