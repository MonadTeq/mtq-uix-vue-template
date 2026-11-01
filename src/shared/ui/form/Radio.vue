<script lang="ts" setup>
export interface RadioProps {
  label?: string
  value: string | number | boolean
  disabled?: boolean
}

withDefaults(defineProps<RadioProps>(), {
  label: "",
  disabled: false
})

const model = defineModel<string | number | boolean>()
</script>

<template>
  <el-radio :value="value" :disabled="disabled">
    {{ label }}
    <slot />
  </el-radio>
</template>
