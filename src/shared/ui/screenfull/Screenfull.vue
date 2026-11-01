<script lang="ts" setup>
import screenfull from "screenfull"
import { Dropdown, Tooltip } from "@/shared/ui"
import { message } from "@/shared/lib"

interface Props {
  /** The element to fullscreen; defaults to html */
  element?: string
  /** Tip shown to open fullscreen */
  openTips?: string
  /** Tip shown to exit fullscreen */
  exitTips?: string
  /** Whether to target only the content area */
  content?: boolean
}

const { element = "html", openTips = "Fullscreen", exitTips = "Exit Fullscreen", content = false } = defineProps<Props>()

const CONTENT_LARGE = "content-large"

const CONTENT_FULL = "content-full"

const classList = document.body.classList

// #region Fullscreen
const isEnabled = screenfull.isEnabled

const isFullscreen = ref<boolean>(false)

const fullscreenTips = computed(() => (isFullscreen.value ? exitTips : openTips))

const fullscreenSvgName = computed(() => (isFullscreen.value ? "fullscreen-exit" : "fullscreen"))

function handleFullscreenClick() {
  const dom = document.querySelector(element) || undefined
  isEnabled ? screenfull.toggle(dom) : message.warning("Your browser doesn't support this")
}

function handleFullscreenChange() {
  isFullscreen.value = screenfull.isFullscreen
  // Clear the relevant classes when exiting fullscreen
  isFullscreen.value || classList.remove(CONTENT_LARGE, CONTENT_FULL)
}

watchEffect(() => {
  if (isEnabled) {
    // Automatically run when the component mounts
    screenfull.on("change", handleFullscreenChange)
    // Automatically run when the component unmounts
    onWatcherCleanup(() => {
      screenfull.off("change", handleFullscreenChange)
    })
  }
})
// #endregion

// #region Content area
const isContentLarge = ref<boolean>(false)

const contentLargeTips = computed(() => (isContentLarge.value ? "Restore content area" : "Enlarge content area"))

const contentLargeSvgName = computed(() => (isContentLarge.value ? "fullscreen-exit" : "fullscreen"))

const dropdownItems = computed(() => [
  { label: contentLargeTips.value },
  { label: "Fullscreen content area" }
])

function handleContentLargeClick() {
  isContentLarge.value = !isContentLarge.value
  // Hide the unnecessary components when the content area is enlarged
  classList.toggle(CONTENT_LARGE, isContentLarge.value)
}

function handleContentFullClick() {
  // Cancel content area enlargement
  isContentLarge.value && handleContentLargeClick()
  // Hide the unnecessary components when the content area is fullscreen
  classList.add(CONTENT_FULL)
  // Enable fullscreen
  handleFullscreenClick()
}

function onSelect(_item: { label: string }, index: number) {
  index === 0 ? handleContentLargeClick() : handleContentFullClick()
}
// #endregion
</script>

<template>
  <div>
    <!-- Fullscreen -->
    <Tooltip v-if="!content" :content="fullscreenTips" placement="bottom">
      <SvgIcon :name="fullscreenSvgName" @click="handleFullscreenClick" class="svg-icon" />
    </Tooltip>
    <!-- Content area -->
    <Dropdown v-else :items="dropdownItems" @select="onSelect">
      <SvgIcon :name="contentLargeSvgName" class="svg-icon" />
    </Dropdown>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
