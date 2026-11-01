<script lang="ts" setup>
export interface ButtonGroupProps {
  size?: "sm" | "md" | "lg"
}

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  size: "md"
})

const elSize = computed(() => {
  switch (props.size) {
    case "sm":
      return "small"
    case "lg":
      return "large"
    default:
      return "default"
  }
})
</script>

<template>
  <el-button-group :size="elSize">
    <slot />
  </el-button-group>
</template>
