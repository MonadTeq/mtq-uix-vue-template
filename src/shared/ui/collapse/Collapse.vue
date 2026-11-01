<script lang="ts" setup>
export interface CollapseItem {
  title: string
  name: string
}

export interface CollapseProps {
  items: CollapseItem[]
  modelValue?: string[]
}

const props = defineProps<CollapseProps>()

const model = defineModel<string[]>({ default: () => [] })

const activeNames = computed(() => (model.value.length ? model.value : [props.items[0]?.name || ""]))

function toggle(name: string) {
  const next = new Set(model.value)
  next.has(name) ? next.delete(name) : next.add(name)
  model.value = [...next]
}
</script>

<template>
  <div class="collapse">
    <div v-for="item in items" :key="item.name" class="collapse__item">
      <button
        class="collapse__header"
        :aria-expanded="activeNames.includes(item.name)"
        @click="toggle(item.name)"
      >
        <span>{{ item.title }}</span>
        <span class="collapse__icon" aria-hidden="true">▾</span>
      </button>
      <div v-show="activeNames.includes(item.name)" class="collapse__body">
        <slot :name="item.name" :item="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.collapse {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.collapse__item + .collapse__item {
  border-top: 1px solid var(--color-border-default);
}

.collapse__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: none;
  background-color: var(--color-surface-default);
  color: var(--color-text-primary);
  font-family: inherit;
  cursor: pointer;
}

.collapse__header:hover {
  background-color: var(--color-surface-hover);
}

.collapse__icon {
  transition: transform 0.2s;
}

.collapse__header[aria-expanded="true"] .collapse__icon {
  transform: rotate(180deg);
}

.collapse__body {
  padding: var(--space-4);
  color: var(--color-text-regular);
}
</style>
