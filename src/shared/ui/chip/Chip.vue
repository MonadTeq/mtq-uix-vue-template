<script lang="ts" setup>
export interface ChipProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
  dismissible?: boolean
}

withDefaults(defineProps<ChipProps>(), {
  variant: "secondary",
  dismissible: false
})

const emit = defineEmits<{
  (e: "close"): void
}>()
</script>

<template>
  <span class="chip" :class="`chip--${variant}`">
    <slot />
    <button v-if="dismissible" class="chip__close" aria-label="Remove" @click="emit('close')">×</button>
  </span>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 2px 10px;
  font-size: var(--font-size-sm);
  line-height: 1.6;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
}

.chip--primary {
  background-color: var(--color-action-primary);
  color: var(--white);
}

.chip--secondary {
  background-color: var(--color-surface-hover);
  color: var(--color-text-regular);
}

.chip--success {
  background-color: var(--color-status-success);
  color: var(--white);
}

.chip--warning {
  background-color: var(--color-status-warning);
  color: var(--white);
}

.chip--danger {
  background-color: var(--color-action-danger);
  color: var(--white);
}

.chip__close {
  border: none;
  background: transparent;
  color: inherit;
  font-size: var(--font-size-md);
  line-height: 1;
  cursor: pointer;
  opacity: 0.7;
}

.chip__close:hover {
  opacity: 1;
}
</style>
