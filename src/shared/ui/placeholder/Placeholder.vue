<script lang="ts" setup>
export interface PlaceholderProps {
  width?: string
  height?: string
  animated?: boolean
}

withDefaults(defineProps<PlaceholderProps>(), {
  width: "100%",
  height: "1rem",
  animated: true
})
</script>

<template>
  <span
    class="placeholder"
    :class="{ 'placeholder--animated': animated }"
    :style="{ width, height }"
    role="presentation"
  />
</template>

<style scoped>
.placeholder {
  display: inline-block;
  background-color: var(--color-surface-hover);
  border-radius: var(--radius-md);
}

.placeholder--animated {
  animation: placeholder-pulse 1.5s ease-in-out infinite;
}

@keyframes placeholder-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
