<script lang="ts" setup>
export interface CheckboxProps {
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<CheckboxProps>(), {
  label: ""
})

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <el-checkbox v-model="model" :disabled="disabled">
    {{ label }}
    <slot />
  </el-checkbox>
</template>
