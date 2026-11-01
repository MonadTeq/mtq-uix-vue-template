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
</script>

<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item v-for="item in items" :key="item.name" :title="item.title" :name="item.name">
      <slot :name="item.name" :item="item" />
    </el-collapse-item>
  </el-collapse>
</template>
