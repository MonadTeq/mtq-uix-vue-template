<script lang="ts" setup>
defineSlots<{
  default?: () => unknown
}>()
</script>

<template>
  <ul class="list-group" role="list">
    <slot />
  </ul>
</template>

<style scoped>
.list-group {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
}
</style>
