<script lang="ts" setup>
import { useLayoutMode } from "@/features/layout-mode"
import { removeLayoutsConfig } from "@/shared/lib"
import { Button } from "@/shared/ui"
import { useSettingsStore } from "@/entities/settings"
import SelectLayoutMode from "./SelectLayoutMode.vue"

const { isLeft } = useLayoutMode()

const settingsStore = useSettingsStore()

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
    <hr class="divider">
    <h4>Feature configuration</h4>
    <div v-for="(settingValue, settingName, index) in switchSettings" :key="index" class="setting-item">
      <span class="setting-name">{{ settingName }}</span>
      <input v-model="settingValue.value" type="checkbox" class="setting-switch" :disabled="!isLeft && settingName === 'Fix Header'">
    </div>
    <Button variant="danger" class="reset" @click="resetLayoutsConfig">
      Reset
    </Button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/shared/styles/mixins.scss";

.setting-container {
  padding: 20px;
  .divider {
    border: none;
    border-top: 1px solid var(--color-border-default);
    margin: 16px 0;
  }
  .setting-item {
    font-size: 14px;
    color: var(--color-text-regular);
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting-name {
      @extend %ellipsis;
    }
  }
  .setting-switch {
    accent-color: var(--color-action-primary);
  }
  .reset {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
