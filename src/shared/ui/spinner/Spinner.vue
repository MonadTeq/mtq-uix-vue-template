<script lang="ts" setup>
export interface SpinnerProps {
  variant?: "border" | "grow"
  size?: "sm" | "md" | "lg"
}

withDefaults(defineProps<SpinnerProps>(), {
  variant: "border",
  size: "md"
})
</script>

<template>
  <span
    class="spinner"
    :class="[`spinner--${variant}`, `spinner--${size}`]"
    role="status"
    aria-label="Loading"
  />
</template>

<style scoped>
.spinner {
  display: inline-block;
  vertical-align: middle;
  border-radius: var(--radius-full);
}

.spinner--border {
  border: 2px solid var(--color-border-default);
  border-top-color: var(--color-action-primary);
  animation: spinner-rotate 0.8s linear infinite;
}

.spinner--grow {
  background-color: var(--color-action-primary);
  animation: spinner-grow 0.8s ease-in-out infinite;
}

.spinner--sm {
  width: 16px;
  height: 16px;
}

.spinner--md {
  width: 24px;
  height: 24px;
}

.spinner--lg {
  width: 32px;
  height: 32px;
}

@keyframes spinner-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinner-grow {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
