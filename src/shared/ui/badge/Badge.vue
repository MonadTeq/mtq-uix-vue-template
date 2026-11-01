<script lang="ts" setup>
export interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
  shape?: "rounded" | "pill"
}

withDefaults(defineProps<BadgeProps>(), {
  variant: "primary",
  shape: "rounded"
})
</script>

<template>
  <span class="badge" :class="[`badge--${variant}`, `badge--${shape}`]">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: var(--font-size-sm);
  line-height: 1.6;
  border: 1px solid transparent;
}

.badge--rounded {
  border-radius: var(--radius-sm);
}

.badge--pill {
  border-radius: var(--radius-full);
}

.badge--primary {
  background-color: var(--color-action-primary);
  color: var(--white);
}

.badge--secondary {
  background-color: var(--color-surface-hover);
  color: var(--color-text-regular);
}

.badge--success {
  background-color: var(--color-status-success);
  color: var(--white);
}

.badge--warning {
  background-color: var(--color-status-warning);
  color: var(--white);
}

.badge--danger {
  background-color: var(--color-action-danger);
  color: var(--white);
}

.badge--info {
  background-color: var(--color-status-info);
  color: var(--white);
}
</style>
