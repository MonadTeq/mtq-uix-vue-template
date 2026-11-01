<script lang="ts" setup>
export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

defineProps<BreadcrumbProps>()
</script>

<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb__list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb__item">
        <a v-if="item.href" :href="item.href" class="breadcrumb__link">
          {{ item.label }}
        </a>
        <span v-else class="breadcrumb__current" aria-current="page">
          {{ item.label }}
        </span>
        <span v-if="index < items.length - 1" class="breadcrumb__separator" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb__item {
  display: inline-flex;
  align-items: center;
}

.breadcrumb__link {
  color: var(--color-text-secondary);
  text-decoration: none;
}

.breadcrumb__link:hover {
  color: var(--color-action-primary);
}

.breadcrumb__current {
  color: var(--color-text-regular);
}

.breadcrumb__separator {
  margin: 0 var(--space-2);
  color: var(--color-text-placeholder);
}
</style>
