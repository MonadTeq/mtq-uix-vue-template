<script lang="ts" setup>
defineSlots<{
  prepend?: () => unknown
  default?: () => unknown
  append?: () => unknown
}>()
</script>

<template>
  <div class="input-group">
    <span v-if="$slots.prepend" class="input-group__addon">
      <slot name="prepend" />
    </span>
    <div class="input-group__body">
      <slot />
    </div>
    <span v-if="$slots.append" class="input-group__addon">
      <slot name="append" />
    </span>
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  width: 100%;
}

.input-group__addon {
  display: flex;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-surface-hover);
  border: 1px solid var(--color-border-default);
  color: var(--color-text-regular);
}

.input-group__addon:first-child {
  border-right: none;
  border-radius: var(--radius-md) 0 0 var(--radius-md);
}

.input-group__addon:last-child {
  border-left: none;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.input-group__body {
  flex: 1;
}
</style>
