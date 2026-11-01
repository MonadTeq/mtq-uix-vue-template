<script lang="ts" setup>
export interface InputProps {
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: "sm" | "md" | "lg"
}

const props = withDefaults(defineProps<InputProps>(), {
  size: "md"
})

const model = defineModel<string>({ default: "" })

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
  <el-input
    v-model="model"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :size="elSize"
  />
</template>
