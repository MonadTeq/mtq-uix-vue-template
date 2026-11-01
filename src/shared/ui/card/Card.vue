<script lang="ts" setup>
export interface CardProps {
  title?: string
  shadow?: "always" | "hover" | "never"
}

const props = withDefaults(defineProps<CardProps>(), {
  shadow: "always"
})

defineSlots<{
  header?: () => unknown
  default?: () => unknown
  footer?: () => unknown
}>()
</script>

<template>
  <el-card :shadow="props.shadow">
    <template v-if="title || $slots.header" #header>
      <slot name="header">
        {{ title }}
      </slot>
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-card>
</template>
