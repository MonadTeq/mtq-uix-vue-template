<script lang="ts" setup>
export interface LabelProps {
  for?: string
}

defineProps<LabelProps>()
</script>

<template>
  <label :for="for" class="label">
    <slot />
  </label>
</template>

<style scoped>
.label {
  display: inline-block;
  margin-bottom: var(--space-1);
  font-size: var(--font-size-md);
  color: var(--color-text-regular);
}
</style>
