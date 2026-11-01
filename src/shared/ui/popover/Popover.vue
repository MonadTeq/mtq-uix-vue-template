<script lang="ts" setup>
export interface PopoverProps {
  title?: string
  placement?: "top" | "bottom" | "left" | "right"
  trigger?: "click" | "hover"
}

const props = withDefaults(defineProps<PopoverProps>(), {
  placement: "bottom",
  trigger: "click"
})

defineSlots<{
  default?: () => unknown
  content?: () => unknown
}>()

const root = ref<HTMLElement>()
const open = ref(false)

function toggle() {
  if (props.trigger === "click") open.value = !open.value
}

function onEnter() {
  if (props.trigger === "hover") open.value = true
}

function onLeave() {
  if (props.trigger === "hover") open.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener("click", onDocumentClick))
onBeforeUnmount(() => document.removeEventListener("click", onDocumentClick))
</script>

<template>
  <span ref="root" class="popover" @click="toggle" @mouseenter="onEnter" @mouseleave="onLeave">
    <span class="popover__reference">
      <slot />
    </span>
    <span v-if="open" class="popover__panel" :data-placement="placement" role="tooltip">
      <span v-if="title" class="popover__title">{{ title }}</span>
      <span class="popover__content">
        <slot name="content" />
      </span>
    </span>
  </span>
</template>

<style scoped>
.popover {
  position: relative;
  display: inline-flex;
}

.popover__reference {
  display: inline-flex;
}

.popover__panel {
  position: absolute;
  z-index: 1000;
  min-width: 160px;
  padding: var(--space-3);
  background-color: var(--color-surface-overlay);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.popover__panel[data-placement="top"] {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 6px;
}

.popover__panel[data-placement="bottom"] {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
}

.popover__panel[data-placement="left"] {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 6px;
}

.popover__panel[data-placement="right"] {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 6px;
}

.popover__title {
  display: block;
  margin-bottom: var(--space-2);
  color: var(--color-text-primary);
  font-weight: 500;
}

.popover__content {
  color: var(--color-text-regular);
}
</style>
