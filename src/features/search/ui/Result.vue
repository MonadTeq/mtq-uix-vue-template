<script lang="ts" setup>
import type { RouteRecordNameGeneric, RouteRecordRaw } from "vue-router"

interface Props {
  data: RouteRecordRaw[]
  isPressUpOrDown: boolean
}

const props = defineProps<Props>()

/** The selected menu */
const modelValue = defineModel<RouteRecordNameGeneric | undefined>({ required: true })

const resultItemRefs = useTemplateRef<HTMLDivElement[]>("resultItemRefs")

const scrollbarHeight = ref<number>(0)

/** Menu styles */
function itemStyle(item: RouteRecordRaw) {
  const flag = item.name === modelValue.value
  return {
    background: flag ? "var(--el-color-primary)" : "",
    color: flag ? "var(--white)" : ""
  }
}

/** Mouse enter */
function handleMouseenter(item: RouteRecordRaw) {
  // If the up or down key and the mouseenter event take effect at the same time, the up/down keys take precedence and the assignment logic of this function is not executed
  if (props.isPressUpOrDown) return
  modelValue.value = item.name
}

/** Calculate the visible scroll area height */
function getScrollbarHeight() {
  // el-scrollbar max-height="40vh"
  scrollbarHeight.value = Number((window.innerHeight * 0.4).toFixed(1))
}

/** Calculate the distance to the top based on the index */
function getScrollTop(index: number) {
  const currentRef = resultItemRefs.value?.[index]
  if (!currentRef) return 0
  // 128 = the sum of two result-item heights (56 + 56 = 112) and the top/bottom margins (8 + 8 = 16)
  const scrollTop = currentRef.offsetTop + 128
  return scrollTop > scrollbarHeight.value ? scrollTop - scrollbarHeight.value : 0
}

// Add the window resize event listener before the component mounts
onBeforeMount(() => {
  window.addEventListener("resize", getScrollbarHeight)
})

// Calculate the visible scroll area height immediately when the component mounts
onMounted(() => {
  getScrollbarHeight()
})

// Remove the window resize event listener before the component unmounts
onBeforeUnmount(() => {
  window.removeEventListener("resize", getScrollbarHeight)
})

defineExpose({ getScrollTop })
</script>

<template>
  <!-- The outer div cannot be removed; it is used to receive the parent component's click event -->
  <div>
    <div
      v-for="(item, index) in props.data"
      :key="index"
      ref="resultItemRefs"
      class="result-item"
      :style="itemStyle(item)"
      @mouseenter="handleMouseenter(item)"
    >
      <SvgIcon v-if="item.meta?.svgIcon" :name="item.meta.svgIcon" class="svg-icon" />
      <component v-else-if="item.meta?.elIcon" :is="item.meta.elIcon" class="el-icon" />
      <span class="result-item-title">
        {{ item.meta?.title }}
      </span>
      <SvgIcon v-if="modelValue && modelValue === item.name" name="keyboard-enter" class="svg-icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/shared/styles/mixins.scss";

.result-item {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 15px;
  margin-bottom: 8px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  cursor: pointer;
  .svg-icon {
    min-width: 1em;
    font-size: 18px;
  }
  .el-icon {
    width: 1em;
    font-size: 18px;
  }
  &-title {
    flex: 1;
    margin-left: 12px;
    @extend %ellipsis;
  }
}
</style>
