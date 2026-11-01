<script lang="ts" setup>
export interface ButtonGroupProps {
  size?: "sm" | "md" | "lg"
}

withDefaults(defineProps<ButtonGroupProps>(), {
  size: "md"
})
</script>

<template>
  <div class="button-group" :class="`button-group--${size}`" role="group">
    <slot />
  </div>
</template>

<style scoped>
.button-group {
  display: inline-flex;
}

.button-group :deep(.button) {
  border-radius: 0;
}

.button-group :deep(.button:first-child) {
  border-radius: var(--radius-md) 0 0 var(--radius-md);
}

.button-group :deep(.button:last-child) {
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.button-group :deep(.button + .button) {
  margin-left: -1px;
}
</style>
