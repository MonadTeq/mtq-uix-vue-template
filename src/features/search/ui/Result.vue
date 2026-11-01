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
    background: flag ? "var(--color-action-primary)" : "",
    color: flag ? "var(--white)" : ""
  }
}

/** Mouse enter */
function handleMouseenter(item: RouteRecordRaw) {
  if (props.isPressUpOrDown) return
  modelValue.value = item.name
}

/** Calculate the visible scroll area height */
function getScrollbarHeight() {
  scrollbarHeight.value = Number((window.innerHeight * 0.4).toFixed(1))
}

/** Calculate the distance to the top based on the index */
function getScrollTop(index: number) {
  const currentRef = resultItemRefs.value?.[index]
  if (!currentRef) return 0
  const scrollTop = currentRef.offsetTop + 128
  return scrollTop > scrollbarHeight.value ? scrollTop - scrollbarHeight.value : 0
}

onBeforeMount(() => {
  window.addEventListener("resize", getScrollbarHeight)
})

onMounted(() => {
  getScrollbarHeight()
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", getScrollbarHeight)
})

defineExpose({ getScrollTop })
</script>

<template>
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
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  cursor: pointer;
  .svg-icon {
    min-width: 1em;
    font-size: 18px;
  }
  &-title {
    flex: 1;
    margin-left: 12px;
    @extend %ellipsis;
  }
}
</style>
