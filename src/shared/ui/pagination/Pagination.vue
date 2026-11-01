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

const elSize = computed(() => {
  switch (props.size) {
    case "sm":
      return "small"
    case "lg":
      return "large"
    default:
      return "default"
  }
})
</script>

<template>
  <el-pagination
    v-model:current-page="model"
    :page-size="pageSize"
    :total="total"
    :size="elSize"
    layout="prev, pager, next, total"
    background
  />
</template>
