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
  <span class="select">
    <select v-model="model" class="select__field" :disabled="disabled">
      <option v-if="clearable" value="">Select</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
  </span>
</template>

<style scoped>
.select {
  display: inline-flex;
  width: 100%;
}

.select__field {
  flex: 1;
  width: 100%;
  padding: 6px 12px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-default);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: var(--font-size-md);
}

.select__field:focus {
  outline: none;
  border-color: var(--color-focus-ring);
}

.select__field:disabled {
  background-color: var(--color-surface-hover);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
</style>
