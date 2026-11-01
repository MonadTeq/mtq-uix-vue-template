<script lang="ts" setup>
export interface TabItem {
  label: string
  name: string
}

export interface TabsProps {
  items: TabItem[]
  modelValue?: string
  variant?: "default" | "card"
}

const props = withDefaults(defineProps<TabsProps>(), {
  variant: "default"
})

const model = defineModel<string>({ default: "" })

const activeName = computed(() => model.value || props.items[0]?.name || "")

function select(name: string) {
  model.value = name
}
</script>

<template>
  <div class="tabs" :class="`tabs--${variant}`">
    <div class="tabs__nav" role="tablist">
      <button
        v-for="item in items"
        :key="item.name"
        class="tabs__tab"
        :class="{ 'tabs__tab--active': activeName === item.name }"
        role="tab"
        :aria-selected="activeName === item.name"
        @click="select(item.name)"
      >
        {{ item.label }}
      </button>
    </div>
    <div
      v-for="item in items"
      v-show="activeName === item.name"
      :key="`panel-${item.name}`"
      class="tabs__panel"
      role="tabpanel"
    >
      <slot :name="item.name" :item="item" />
    </div>
  </div>
</template>

<style scoped>
.tabs__nav {
  display: flex;
  border-bottom: 1px solid var(--color-border-default);
}

.tabs__tab {
  padding: var(--space-2) var(--space-4);
  border: none;
  background: transparent;
  color: var(--color-text-regular);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-family: inherit;
}

.tabs__tab:hover {
  color: var(--color-action-primary);
}

.tabs__tab--active {
  color: var(--color-action-primary);
  border-bottom-color: var(--color-action-primary);
}

.tabs--card .tabs__nav {
  border-bottom: none;
  gap: var(--space-1);
}

.tabs--card .tabs__tab {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  background-color: var(--color-surface-hover);
  border-bottom: none;
}

.tabs--card .tabs__tab--active {
  background-color: var(--color-surface-default);
}

.tabs__panel {
  padding: var(--space-4);
  color: var(--color-text-regular);
}
</style>
