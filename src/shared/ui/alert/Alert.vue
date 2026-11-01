<script lang="ts" setup>
export interface AlertProps {
  variant?: "primary" | "success" | "warning" | "danger" | "info"
  title?: string
  description?: string
  closable?: boolean
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: "primary"
})

const emit = defineEmits<{
  (e: "close"): void
}>()

const visible = ref(true)

function onClose() {
  visible.value = false
  emit("close")
}
</script>

<template>
  <div v-if="visible" class="alert" :class="`alert--${variant}`" role="alert">
    <div class="alert__body">
      <div v-if="title" class="alert__title">{{ title }}</div>
      <div v-if="description || $slots.default" class="alert__description">
        <slot>{{ description }}</slot>
      </div>
    </div>
    <button v-if="closable" class="alert__close" aria-label="Close" @click="onClose">×</button>
  </div>
</template>

<style scoped>
.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
}

.alert--primary {
  background-color: var(--color-surface-hover);
  border-color: var(--color-border-default);
}

.alert--success {
  background-color: color-mix(in srgb, var(--color-status-success) 12%, transparent);
  border-color: var(--color-status-success);
}

.alert--warning {
  background-color: color-mix(in srgb, var(--color-status-warning) 12%, transparent);
  border-color: var(--color-status-warning);
}

.alert--danger {
  background-color: color-mix(in srgb, var(--color-action-danger) 12%, transparent);
  border-color: var(--color-action-danger);
}

.alert--info {
  background-color: color-mix(in srgb, var(--color-status-info) 12%, transparent);
  border-color: var(--color-status-info);
}

.alert__body {
  flex: 1;
}

.alert__title {
  color: var(--color-text-primary);
  font-weight: 500;
  margin-bottom: var(--space-1);
}

.alert__description {
  color: var(--color-text-regular);
}

.alert__close {
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: 1;
  cursor: pointer;
}
</style>
