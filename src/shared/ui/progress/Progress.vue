<script lang="ts" setup>
export interface ProgressProps {
  value?: number
  variant?: "primary" | "success" | "warning" | "danger"
  striped?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  variant: "primary"
})

const clamped = computed(() => Math.min(100, Math.max(0, props.value)))
</script>

<template>
  <div
    class="progress"
    role="progressbar"
    :aria-valuenow="clamped"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="progress__track">
      <div
        class="progress__bar"
        :class="[
          `progress__bar--${variant}`,
          { 'progress__bar--striped': striped || animated, 'progress__bar--animated': animated }
        ]"
        :style="{ width: `${clamped}%` }"
      />
    </div>
    <span class="progress__text">{{ clamped }}%</span>
  </div>
</template>

<style scoped>
.progress {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.progress__track {
  flex: 1;
  height: 8px;
  background-color: var(--color-surface-hover);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress__bar {
  height: 100%;
  border-radius: var(--radius-full);
  background-color: var(--color-action-primary);
  transition: width 0.3s;
}

.progress__bar--success {
  background-color: var(--color-status-success);
}

.progress__bar--warning {
  background-color: var(--color-status-warning);
}

.progress__bar--danger {
  background-color: var(--color-action-danger);
}

.progress__bar--striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.progress__bar--animated {
  animation: progress-stripes 1s linear infinite;
}

.progress__text {
  min-width: 3em;
  text-align: right;
  font-size: var(--font-size-sm);
  color: var(--color-text-regular);
}

@keyframes progress-stripes {
  to {
    background-position: 1rem 0;
  }
}
</style>
