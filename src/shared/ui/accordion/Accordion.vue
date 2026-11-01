<script lang="ts" setup>
export interface AccordionItem {
  title: string
  name: string
}

export interface AccordionProps {
  items: AccordionItem[]
  modelValue?: string
}

const props = defineProps<AccordionProps>()

const model = defineModel<string>({ default: "" })

const activeName = computed(() => model.value || props.items[0]?.name || "")

function toggle(name: string) {
  model.value = model.value === name ? "" : name
}
</script>

<template>
  <div class="accordion">
    <div v-for="item in items" :key="item.name" class="accordion__item">
      <button
        class="accordion__header"
        :aria-expanded="activeName === item.name"
        @click="toggle(item.name)"
      >
        <span>{{ item.title }}</span>
        <span class="accordion__icon" aria-hidden="true">▾</span>
      </button>
      <div v-show="activeName === item.name" class="accordion__body">
        <slot :name="item.name" :item="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.accordion__item + .accordion__item {
  border-top: 1px solid var(--color-border-default);
}

.accordion__header {
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

.accordion__header:hover {
  background-color: var(--color-surface-hover);
}

.accordion__icon {
  transition: transform 0.2s;
}

.accordion__header[aria-expanded="true"] .accordion__icon {
  transform: rotate(180deg);
}

.accordion__body {
  padding: var(--space-4);
  color: var(--color-text-regular);
}
</style>
