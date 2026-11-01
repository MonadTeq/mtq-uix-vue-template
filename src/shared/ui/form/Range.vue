<script lang="ts" setup>
export interface RangeProps {
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

withDefaults(defineProps<RangeProps>(), {
  min: 0,
  max: 100,
  step: 1
})

const model = defineModel<number>({ default: 0 })
</script>

<template>
  <input v-model="model" type="range" class="range" :min="min" :max="max" :step="step" :disabled="disabled">
</template>

<style scoped>
.range {
  width: 100%;
  accent-color: var(--color-action-primary);
}

.range:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
