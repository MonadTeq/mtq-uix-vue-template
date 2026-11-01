<script lang="ts" setup>
export interface TooltipProps {
  content: string
  placement?: "top" | "bottom" | "left" | "right"
}

withDefaults(defineProps<TooltipProps>(), {
  placement: "top"
})

defineSlots<{
  default?: () => unknown
}>()
</script>

<template>
  <span class="tooltip" :data-tooltip="content" :data-placement="placement">
    <slot />
  </span>
</template>

<style scoped>
.tooltip {
  position: relative;
  display: inline-flex;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  z-index: 1000;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  background-color: var(--color-text-primary);
  color: var(--color-surface-default);
  font-size: var(--font-size-sm);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.15s;
}

.tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}

.tooltip[data-placement="top"]::after {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 6px;
}

.tooltip[data-placement="bottom"]::after {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
}

.tooltip[data-placement="left"]::after {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 6px;
}

.tooltip[data-placement="right"]::after {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 6px;
}
</style>
