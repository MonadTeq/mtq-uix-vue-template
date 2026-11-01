<script lang="ts" setup>
export interface ListGroupItemProps {
  active?: boolean
  disabled?: boolean
}

withDefaults(defineProps<ListGroupItemProps>(), {
  active: false,
  disabled: false
})
</script>

<template>
  <li
    class="list-group-item"
    :class="{ 'list-group-item--active': active, 'list-group-item--disabled': disabled }"
    role="listitem"
  >
    <slot />
  </li>
</template>

<style scoped>
.list-group-item {
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-default);
  color: var(--color-text-regular);
  border-bottom: 1px solid var(--color-border-default);
}

.list-group-item:last-child {
  border-bottom: none;
}

.list-group-item--active {
  background-color: var(--color-action-primary);
  color: var(--white);
}

.list-group-item--disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
}
</style>
