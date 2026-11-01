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
  <el-input v-model="model" type="textarea" :placeholder="placeholder" :disabled="disabled" :rows="rows" />
</template>
