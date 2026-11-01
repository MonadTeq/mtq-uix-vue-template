<script lang="ts" setup>
import { useDevice } from "@/features/device/model/use-device"
import { useLayoutMode } from "@/features/layout-mode/model/use-layout-mode"
import { useWatermark } from "@/shared/lib/use-watermark"
import { getCssVar, setCssVar } from "@/shared/lib/css"
import { useSettingsStore } from "@/entities/settings"
import { RightPanel, Settings } from "./components"
import { useResize } from "./composables/use-resize"
import LeftMode from "./modes/LeftMode.vue"
import LeftTopMode from "./modes/LeftTopMode.vue"
import TopMode from "./modes/TopMode.vue"

// Layout responsive behavior
useResize()

const { setWatermark, clearWatermark } = useWatermark()

const { isMobile } = useDevice()

const { isLeft, isTop, isLeftTop } = useLayoutMode()

const settingsStore = useSettingsStore()

const { showSettings, showTagsView, showWatermark } = storeToRefs(settingsStore)

// #region When the tags bar is hidden, remove its height so that the Logo component height and the Header area height stay consistent
const cssVarName = "--v3-tagsview-height"

const v3TagsviewHeight = getCssVar(cssVarName)

watchEffect(() => {
  showTagsView.value ? setCssVar(cssVarName, v3TagsviewHeight) : setCssVar(cssVarName, "0px")
})
// #endregion

// Enable or disable the system watermark
watchEffect(() => {
  showWatermark.value ? setWatermark(import.meta.env.VITE_APP_TITLE) : clearWatermark()
})
</script>

<template>
  <div>
    <!-- Left mode -->
    <LeftMode v-if="isLeft || isMobile" />
    <!-- Top mode -->
    <TopMode v-else-if="isTop" />
    <!-- Hybrid mode -->
    <LeftTopMode v-else-if="isLeftTop" />
    <!-- Right settings panel -->
    <RightPanel v-if="showSettings">
      <Settings />
    </RightPanel>
  </div>
</template>
