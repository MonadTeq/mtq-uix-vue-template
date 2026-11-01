<script lang="ts" setup>
export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
}

withDefaults(defineProps<SelectProps>(), {
  placeholder: "Select",
  clearable: true
})

const model = defineModel<string | number>()
</script>

<template>
  <el-select v-model="model" :placeholder="placeholder" :disabled="disabled" :clearable="clearable">
    <el-option
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
  </el-select>
</template>
