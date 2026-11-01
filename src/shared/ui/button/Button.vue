<script lang="ts" setup>
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  href?: string
  type?: "button" | "submit" | "reset"
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  type: "button"
})

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void
}>()

const elType = computed(() => {
  switch (props.variant) {
    case "primary":
      return "primary"
    case "secondary":
      return "default"
    case "danger":
      return "danger"
    default:
      return "default"
  }
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
  <el-button
    :type="elType"
    :size="elSize"
    :disabled="disabled"
    :loading="loading"
    :text="variant === 'ghost'"
    :native-type="type"
    :tag="href ? 'a' : 'button'"
    :href="href"
    @click="emit('click', $event)"
  >
    <slot />
  </el-button>
</template>
