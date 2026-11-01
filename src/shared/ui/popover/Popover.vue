<script lang="ts" setup>
export interface PopoverProps {
  title?: string
  placement?: "top" | "bottom" | "left" | "right"
  trigger?: "click" | "hover"
}

withDefaults(defineProps<PopoverProps>(), {
  placement: "bottom",
  trigger: "click"
})

defineSlots<{
  default?: () => unknown
  content?: () => unknown
}>()
</script>

<template>
  <el-popover :title="title" :placement="placement" :trigger="trigger">
    <template #reference>
      <slot />
    </template>
    <slot name="content" />
  </el-popover>
</template>
