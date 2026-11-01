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
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in items" :key="index" :to="item.href">
      {{ item.label }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
