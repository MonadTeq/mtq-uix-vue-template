<script lang="ts" setup>
export interface TextareaProps {
  placeholder?: string
  disabled?: boolean
  rows?: number
}

withDefaults(defineProps<TextareaProps>(), {
  rows: 3
})

const model = defineModel<string>({ default: "" })
</script>

<template>
  <textarea
    v-model="model"
    class="textarea"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows"
  />
</template>

<style scoped>
.textarea {
  width: 100%;
  padding: 6px 12px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-default);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: var(--font-size-md);
  resize: vertical;
  transition: border-color 0.2s;
}

.textarea::placeholder {
  color: var(--color-text-placeholder);
}

.textarea:focus {
  outline: none;
  border-color: var(--color-focus-ring);
}

.textarea:disabled {
  background-color: var(--color-surface-hover);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
</style>
