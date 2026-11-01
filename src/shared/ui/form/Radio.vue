<script lang="ts" setup>
export interface RadioProps {
  label?: string
  value: string | number | boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<RadioProps>(), {
  label: "",
  disabled: false
})

const model = defineModel<string | number | boolean>()

const checked = computed(() => model.value === props.value)

function onChange() {
  model.value = props.value
}
</script>

<template>
  <label class="radio" :class="{ 'radio--disabled': disabled }">
    <input
      type="radio"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      class="radio__input"
      @change="onChange"
    >
    <span class="radio__label">
      {{ label }}
      <slot />
    </span>
  </label>
</template>

<style scoped>
.radio {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-text-regular);
  cursor: pointer;
}

.radio__input {
  accent-color: var(--color-action-primary);
}

.radio--disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
</style>
