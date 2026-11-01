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
</script>

<template>
  <el-tabs v-model="activeName" :type="variant === 'card' ? 'border-card' : ''">
    <el-tab-pane v-for="item in items" :key="item.name" :label="item.label" :name="item.name">
      <slot :name="item.name" :item="item" />
    </el-tab-pane>
  </el-tabs>
</template>
