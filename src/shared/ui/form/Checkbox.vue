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
  <label class="checkbox" :class="{ 'checkbox--disabled': disabled }">
    <input v-model="model" type="checkbox" class="checkbox__input" :disabled="disabled">
    <span class="checkbox__label">
      {{ label }}
      <slot />
    </span>
  </label>
</template>

<style scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-text-regular);
  cursor: pointer;
}

.checkbox__input {
  accent-color: var(--color-action-primary);
}

.checkbox--disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
</style>
