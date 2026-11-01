<script lang="ts" setup>
export interface CardProps {
  title?: string
  shadow?: "always" | "hover" | "never"
}

withDefaults(defineProps<CardProps>(), {
  shadow: "always"
})

defineSlots<{
  header?: () => unknown
  default?: () => unknown
  footer?: () => unknown
}>()
</script>

<template>
  <div class="card" :class="`card--${shadow}`">
    <div v-if="title || $slots.header" class="card__header">
      <slot name="header">{{ title }}</slot>
    </div>
    <div class="card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-surface-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.card--always {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card--hover:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.card--never {
  box-shadow: none;
}

.card__header {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border-default);
  color: var(--color-text-primary);
  font-weight: 500;
}

.card__body {
  padding: var(--space-4);
  color: var(--color-text-regular);
}

.card__footer {
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-border-default);
}
</style>
