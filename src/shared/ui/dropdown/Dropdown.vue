<script lang="ts" setup>
export interface DropdownItem {
  label: string
  disabled?: boolean
  divided?: boolean
}

export interface DropdownProps {
  items: DropdownItem[]
  variant?: "primary" | "secondary"
}

withDefaults(defineProps<DropdownProps>(), {
  variant: "secondary"
})

const emit = defineEmits<{
  (e: "select", item: DropdownItem, index: number): void
}>()

defineSlots<{
  default?: () => unknown
}>()

const root = ref<HTMLElement>()
const open = ref(false)

function toggle() {
  open.value = !open.value
}

function select(item: DropdownItem, index: number) {
  open.value = false
  emit("select", item, index)
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
  <div ref="root" class="dropdown">
    <div class="dropdown__trigger" @click="toggle">
      <slot />
    </div>
    <ul v-if="open" class="dropdown__menu" role="menu">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="dropdown__item"
        :class="{ 'dropdown__item--disabled': item.disabled, 'dropdown__item--divided': item.divided }"
        role="menuitem"
        :aria-disabled="item.disabled || undefined"
        @click="!item.disabled && select(item, index)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown__trigger {
  cursor: pointer;
}

.dropdown__menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 120px;
  margin: var(--space-1) 0 0;
  padding: var(--space-1) 0;
  list-style: none;
  background-color: var(--color-surface-overlay);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.dropdown__item {
  padding: var(--space-2) var(--space-4);
  color: var(--color-text-regular);
  cursor: pointer;
  white-space: nowrap;
}

.dropdown__item:hover {
  background-color: var(--color-surface-hover);
}

.dropdown__item--disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.dropdown__item--divided {
  border-top: 1px solid var(--color-border-default);
}
</style>
