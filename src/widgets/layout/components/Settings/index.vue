<script lang="ts" setup>
import { useLayoutMode } from "@/features/layout-mode/model/use-layout-mode"
import { removeLayoutsConfig } from "@/shared/lib/local-storage"
import { Refresh } from "@element-plus/icons-vue"
import { useSettingsStore } from "@/entities/settings"
import SelectLayoutMode from "./SelectLayoutMode.vue"

const { isLeft } = useLayoutMode()

const settingsStore = useSettingsStore()

// Use storeToRefs to keep the extracted properties reactive
const {
  showTagsView,
  showLogo,
  fixedHeader,
  showFooter,
  showNotify,
  showThemeSwitch,
  showScreenfull,
  showSearchMenu,
  cacheTagsView,
  showWatermark,
  showGreyMode,
  showColorWeakness
} = storeToRefs(settingsStore)

/** Define the switch settings */
const switchSettings = {
  "Show tags bar": showTagsView,
  "Show Logo": showLogo,
  "Fix Header": fixedHeader,
  "Show footer": showFooter,
  "Show notifications": showNotify,
  "Show theme switch": showThemeSwitch,
  "Show fullscreen": showScreenfull,
  "Show search": showSearchMenu,
  "Cache tags bar": cacheTagsView,
  "Enable watermark": showWatermark,
  "Show gray mode": showGreyMode,
  "Show color weakness": showColorWeakness
}

// In non-left modes, the Header is always a fixed layout
watchEffect(() => {
  !isLeft.value && (fixedHeader.value = true)
})

/** Reset the project configuration */
function resetLayoutsConfig() {
  removeLayoutsConfig()
  location.reload()
}
</script>

<template>
  <div class="setting-container">
    <h4>Layout configuration</h4>
    <SelectLayoutMode />
    <el-divider />
    <h4>Feature configuration</h4>
    <div v-for="(settingValue, settingName, index) in switchSettings" :key="index" class="setting-item">
      <span class="setting-name">{{ settingName }}</span>
      <el-switch v-model="settingValue.value" :disabled="!isLeft && settingName === 'Fix Header'" />
    </div>
    <el-button type="danger" :icon="Refresh" @click="resetLayoutsConfig">
      Reset
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/shared/styles/mixins.scss";

.setting-container {
  padding: 20px;
  .setting-item {
    font-size: 14px;
    color: var(--el-text-color-regular);
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting-name {
      @extend %ellipsis;
    }
  }
  .el-button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
