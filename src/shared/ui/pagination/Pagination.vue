<script lang="ts" setup>
export interface PaginationProps {
  modelValue?: number
  total: number
  pageSize?: number
  size?: "sm" | "md" | "lg"
}

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  size: "md"
})

const model = defineModel<number>({ default: 1 })

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const pages = computed(() => {
  const count = totalPages.value
  const current = model.value
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1)
  const set = new Set<number>([1, count, current - 1, current, current + 1])
  return [...set].filter(p => p >= 1 && p <= count).sort((a, b) => a - b)
})

function go(page: number) {
  if (page < 1 || page > totalPages.value) return
  model.value = page
}
</script>

<template>
  <nav class="pagination" :class="`pagination--${size}`" aria-label="Pagination">
    <button class="pagination__btn" :disabled="model <= 1" @click="go(model - 1)">‹</button>
    <template v-for="page in pages" :key="page">
      <button
        class="pagination__btn"
        :class="{ 'pagination__btn--active': model === page }"
        @click="go(page)"
      >
        {{ page }}
      </button>
    </template>
    <button class="pagination__btn" :disabled="model >= totalPages" @click="go(model + 1)">›</button>
    <span class="pagination__total">Total {{ total }}</span>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.pagination__btn {
  min-width: 2em;
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--color-border-default);
  background-color: var(--color-surface-default);
  color: var(--color-text-regular);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.pagination__btn:hover:not(:disabled) {
  color: var(--color-action-primary);
  border-color: var(--color-action-primary);
}

.pagination__btn--active {
  background-color: var(--color-action-primary);
  border-color: var(--color-action-primary);
  color: var(--white);
}

.pagination__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination__total {
  margin-left: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.pagination--sm .pagination__btn {
  padding: 2px 6px;
  font-size: var(--font-size-sm);
}

.pagination--lg .pagination__btn {
  padding: 8px 12px;
  font-size: var(--font-size-lg);
}
</style>
