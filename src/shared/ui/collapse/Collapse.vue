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

const activeNames = computed(() => model.value.length ? model.value : [props.items[0]?.name || ""])
</script>

<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item v-for="item in items" :key="item.name" :title="item.title" :name="item.name">
      <slot :name="item.name" :item="item" />
    </el-collapse-item>
  </el-collapse>
</template>
