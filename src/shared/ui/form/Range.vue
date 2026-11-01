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
  <el-slider v-model="model" :min="min" :max="max" :step="step" :disabled="disabled" />
</template>
