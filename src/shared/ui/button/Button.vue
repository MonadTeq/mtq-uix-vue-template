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

const isDisabled = computed(() => props.disabled || props.loading)

function onClick(event: MouseEvent) {
  if (isDisabled.value) return
  emit("click", event)
}
</script>

<template>
  <a
    v-if="href"
    class="button"
    :class="[`button--${variant}`, `button--${size}`, { 'button--disabled': isDisabled }]"
    :href="href"
    :aria-disabled="isDisabled || undefined"
    @click="onClick"
  >
    <span v-if="loading" class="button__spinner" aria-hidden="true" />
    <slot />
  </a>
  <button
    v-else
    class="button"
    :class="[`button--${variant}`, `button--${size}`, { 'button--disabled': isDisabled }]"
    :disabled="isDisabled"
    :type="type"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <span v-if="loading" class="button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-family: inherit;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s;
}

.button:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.button--sm {
  padding: 6px 12px;
  font-size: var(--font-size-sm);
}

.button--md {
  padding: 8px 16px;
  font-size: var(--font-size-md);
}

.button--lg {
  padding: 10px 20px;
  font-size: var(--font-size-lg);
}

.button--primary {
  background-color: var(--color-action-primary);
  border-color: var(--color-action-primary);
  color: var(--white);
}

.button--primary:hover {
  opacity: 0.9;
}

.button--secondary {
  background-color: var(--color-surface-default);
  border-color: var(--color-border-default);
  color: var(--color-text-regular);
}

.button--secondary:hover {
  background-color: var(--color-surface-hover);
}

.button--ghost {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-action-primary);
}

.button--ghost:hover {
  background-color: var(--color-surface-hover);
}

.button--danger {
  background-color: var(--color-action-danger);
  border-color: var(--color-action-danger);
  color: var(--white);
}

.button--danger:hover {
  opacity: 0.9;
}

.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.button__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: var(--radius-full);
  animation: button-spin 0.8s linear infinite;
}

@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
