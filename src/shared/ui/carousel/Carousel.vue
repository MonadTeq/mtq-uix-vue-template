<script lang="ts" setup>
export interface CarouselItem {
  name: string
}

export interface CarouselProps {
  items: CarouselItem[]
  interval?: number
  arrows?: boolean
}

withDefaults(defineProps<CarouselProps>(), {
  interval: 3000,
  arrows: true
})

defineSlots<{
  default?: (props: { item: CarouselItem; index: number }) => unknown
}>()
</script>

<template>
  <el-carousel :interval="interval" :arrow="arrows ? 'always' : 'never'" height="200px">
    <el-carousel-item v-for="(item, index) in items" :key="item.name">
      <slot :item="item" :index="index" />
    </el-carousel-item>
  </el-carousel>
</template>
