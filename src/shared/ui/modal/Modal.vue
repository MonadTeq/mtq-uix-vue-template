<script lang="ts" setup>
export interface ModalProps {
  title?: string
  size?: "sm" | "md" | "lg"
  dismissible?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  size: "md",
  dismissible: true
})

const model = defineModel<boolean>({ default: false })

const width = computed(() => {
  switch (props.size) {
    case "sm":
      return "400px"
    case "lg":
      return "70%"
    default:
      return "50%"
  }
})

defineSlots<{
  default?: () => unknown
  footer?: () => unknown
}>()
</script>

<template>
  <el-dialog
    v-model="model"
    :title="title"
    :width="width"
    :show-close="dismissible"
    :close-on-click-modal="dismissible"
  >
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
