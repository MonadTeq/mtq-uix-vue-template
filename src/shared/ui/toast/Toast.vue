<script lang="ts" setup>
export interface ToastProps {
  variant?: "primary" | "success" | "warning" | "danger"
  visible?: boolean
  dismissible?: boolean
}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: "primary",
  visible: false,
  dismissible: true
})

const emit = defineEmits<{
  (e: "close"): void
}>()

const elType = computed(() => {
  switch (props.variant) {
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
  <div v-if="visible" class="toast" role="status">
    <el-icon class="toast__icon">
      <slot name="icon" />
    </el-icon>
    <div class="toast__content">
      <slot />
    </div>
    <button v-if="dismissible" class="toast__close" aria-label="Close" @click="emit('close')">
      ×
    </button>
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-default);
  color: var(--color-text-regular);
  border: 1px solid var(--color-border-default);
  border-left: 4px solid var(--color-action-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--el-box-shadow-light, 0 0 12px rgba(0, 0, 0, 0.12));
}

.toast__content {
  flex: 1;
}

.toast__close {
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  cursor: pointer;
}
</style>
