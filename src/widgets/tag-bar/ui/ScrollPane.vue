<script lang="ts" setup>
import type { RouterLink } from "vue-router"
import Screenfull from "@/shared/ui/screenfull"
import { useRouteListener } from "@/shared/lib"
import { useSettingsStore } from "@/entities/settings"

interface Props {
  tagRefs: InstanceType<typeof RouterLink>[] | null
}

const props = defineProps<Props>()

const route = useRoute()

const settingsStore = useSettingsStore()

const { listenerRouteChange } = useRouteListener()

/** Reference to the scrollbar container element */
const scrollbarRef = useTemplateRef("scrollbarRef")

/** Reference to the scrollbar content element */
const scrollbarContentRef = useTemplateRef("scrollbarContentRef")

/** Current distance of the scrollbar from the left */
let currentScrollLeft = 0

/** Scroll distance per step */
const translateDistance = 200

/** Triggered on scroll */
function onScroll(event: Event) {
  currentScrollLeft = (event.target as HTMLElement).scrollLeft
}

/** Triggered on mouse wheel scroll */
function wheelScroll({ deltaY }: WheelEvent) {
  if (deltaY.toString().startsWith("-")) {
    scrollTo("left")
  } else {
    scrollTo("right")
  }
}

/** Get the widths that may be needed */
function getWidth() {
  const scrollbarContentRefWidth = scrollbarContentRef.value!.clientWidth
  const scrollbarRefWidth = scrollbarRef.value!.clientWidth
  const lastDistance = scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft
  return { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance }
}

/** Scroll left or right */
function scrollTo(direction: "left" | "right", distance: number = translateDistance) {
  let scrollLeft = 0
  const { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance } = getWidth()
  if (scrollbarRefWidth > scrollbarContentRefWidth) return
  if (direction === "left") {
    scrollLeft = Math.max(0, currentScrollLeft - distance)
  } else {
    scrollLeft = Math.min(currentScrollLeft + distance, currentScrollLeft + lastDistance)
  }
  scrollbarRef.value!.scrollLeft = scrollLeft
}

/** Move to the target position */
function moveTo() {
  const tagRefs = props.tagRefs!
  for (let i = 0; i < tagRefs.length; i++) {
    // @ts-expect-error ignore
    if (route.path === tagRefs[i].$props.to.path) {
      // @ts-expect-error ignore
      const el: HTMLElement = tagRefs[i].$el
      const offsetWidth = el.offsetWidth
      const offsetLeft = el.offsetLeft
      const { scrollbarRefWidth } = getWidth()
      if (offsetLeft < currentScrollLeft) {
        const distance = currentScrollLeft - offsetLeft
        scrollTo("left", distance)
        return
      }
      const width = scrollbarRefWidth + currentScrollLeft - offsetWidth
      if (offsetLeft > width) {
        const distance = offsetLeft - width
        scrollTo("right", distance)
        return
      }
    }
  }
}

listenerRouteChange(() => {
  nextTick(moveTo)
})
</script>

<template>
  <div class="scroll-container">
    <button class="arrow left" title="Scroll tags left (clickable when exceeding the max width)" @click="scrollTo('left')">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M15 4l-8 8 8 8V4z" />
      </svg>
    </button>
    <div ref="scrollbarRef" class="scrollbar" @wheel.passive="wheelScroll" @scroll="onScroll">
      <div ref="scrollbarContentRef" class="scrollbar-content">
        <slot />
      </div>
    </div>
    <button class="arrow right" title="Scroll tags right (clickable when exceeding the max width)" @click="scrollTo('right')">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M9 4l8 8-8 8V4z" />
      </svg>
    </button>
    <Screenfull v-if="settingsStore.showScreenfull" :content="true" class="screenfull" />
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  user-select: none;
  display: flex;
  justify-content: space-between;
  .arrow {
    width: 40px;
    height: 100%;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--mtq-uix-tagsview-text-color);
    &.left {
      box-shadow: 5px 0 5px -6px var(--color-border-strong);
    }
    &.right {
      box-shadow: -5px 0 5px -6px var(--color-border-strong);
    }
  }
  .scrollbar {
    flex: 1;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    .scrollbar-content {
      display: inline-block;
    }
  }
  .screenfull {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
