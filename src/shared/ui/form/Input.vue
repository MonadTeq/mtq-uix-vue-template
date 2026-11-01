<script lang="ts" setup>
export interface InputProps {
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: "sm" | "md" | "lg"
}

withDefaults(defineProps<InputProps>(), {
  size: "md"
})

const model = defineModel<string>({ default: "" })
</script>

<template>
  <span class="input" :class="`input--${size}`">
    <input
      v-model="model"
      class="input__field"
      :placeholder="placeholder"
      :disabled="disabled"
    >
    <button v-if="clearable && model" class="input__clear" aria-label="Clear" @click="model = ''">×</button>
  </span>
</template>

<style scoped>
.input {
  position: relative;
  display: inline-flex;
  width: 100%;
}

.input__field {
  flex: 1;
  width: 100%;
  padding: 6px 12px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-default);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: var(--font-size-md);
  transition: border-color 0.2s;
}

.input__field::placeholder {
  color: var(--color-text-placeholder);
}

.input__field:focus {
  outline: none;
  border-color: var(--color-focus-ring);
}

.input__field:disabled {
  background-color: var(--color-surface-hover);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.input--sm .input__field {
  padding: 2px 8px;
  font-size: var(--font-size-sm);
}

.input--lg .input__field {
  padding: 10px 16px;
  font-size: var(--font-size-lg);
}

.input__clear {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
}
</style>
