<script lang="ts" setup>
export interface DropdownItem {
  label: string
  disabled?: boolean
  divided?: boolean
}

export interface DropdownProps {
  items: DropdownItem[]
  variant?: "primary" | "secondary"
}

withDefaults(defineProps<DropdownProps>(), {
  variant: "secondary"
})

const emit = defineEmits<{
  (e: "select", item: DropdownItem, index: number): void
}>()

defineSlots<{
  default?: () => unknown
}>()
</script>

<template>
  <el-dropdown trigger="click" @command="emit('select', $event.item, $event.index)">
    <slot />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in items"
          :key="index"
          :disabled="item.disabled"
          :divided="item.divided"
          :command="{ item, index }"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
