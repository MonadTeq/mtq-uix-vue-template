<script lang="ts" setup>
export interface CarouselItem {
  name: string
}

export interface CarouselProps {
  items: CarouselItem[]
  interval?: number
  arrows?: boolean
}

const props = withDefaults(defineProps<CarouselProps>(), {
  interval: 3000,
  arrows: true
})

defineSlots<{
  default?: (props: { item: CarouselItem; index: number }) => unknown
}>()

const active = ref(0)

function prev() {
  active.value = (active.value - 1 + props.items.length) % props.items.length
}

function next() {
  active.value = (active.value + 1) % props.items.length
}

let timer: ReturnType<typeof setInterval> | undefined

function start() {
  if (!props.interval || props.items.length <= 1) return
  stop()
  timer = setInterval(next, props.interval)
}

function stop() {
  if (timer) clearInterval(timer)
  timer = undefined
}

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <div class="carousel" @mouseenter="stop" @mouseleave="start">
    <div class="carousel__track">
      <div
        v-for="(item, index) in items"
        v-show="active === index"
        :key="item.name"
        class="carousel__slide"
      >
        <slot :item="item" :index="index" />
      </div>
    </div>
    <button v-if="arrows && items.length > 1" class="carousel__arrow carousel__arrow--prev" aria-label="Previous" @click="prev">‹</button>
    <button v-if="arrows && items.length > 1" class="carousel__arrow carousel__arrow--next" aria-label="Next" @click="next">›</button>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
}

.carousel__track {
  height: 200px;
}

.carousel__slide {
  height: 100%;
}

.carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--radius-full);
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: var(--font-size-lg);
  cursor: pointer;
}

.carousel__arrow--prev {
  left: var(--space-3);
}

.carousel__arrow--next {
  right: var(--space-3);
}
</style>
