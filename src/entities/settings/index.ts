import type { Ref } from "vue"
import type { LayoutsConfig } from "@/shared/types"
import { LayoutModeEnum } from "@/shared/constants"
import { setLayoutsConfig, getLayoutsConfig } from "@/shared/lib"

/** Default configuration */
const DEFAULT_CONFIG: LayoutsConfig = {
  showSettings: true,
  layoutMode: LayoutModeEnum.Left,
  showTagsView: true,
  fixedHeader: true,
  showFooter: true,
  showLogo: true,
  showNotify: true,
  showThemeSwitch: true,
  showScreenfull: true,
  showSearchMenu: true,
  cacheTagsView: false,
  showWatermark: true,
  showGreyMode: false,
  showColorWeakness: false
}

/** Project configuration */
const layoutsConfig: LayoutsConfig = {
  ...DEFAULT_CONFIG,
  ...getLayoutsConfig(),
  showSettings: DEFAULT_CONFIG.showSettings
}

type SettingsStore = {
  // Use mapped types to iterate over the keys of the LayoutsConfig object
  [Key in keyof LayoutsConfig]: Ref<LayoutsConfig[Key]>
}

type SettingsStoreKey = keyof SettingsStore

export const useSettingsStore = defineStore("settings", () => {
  // State object
  const state = {} as SettingsStore

  // Iterate over the key-value pairs of the LayoutsConfig object
  for (const [key, value] of Object.entries(layoutsConfig)) {
    // Use type assertion to specify the type of key, wrap value in the ref function, and create a reactive variable
    const refValue = ref(value)
    // @ts-expect-error ignore
    state[key as SettingsStoreKey] = refValue
    // Watch each reactive variable
    watch(refValue, () => {
      // Cache
      const settings = getCacheData()
      setLayoutsConfig(settings)
    })
  }

  // Get the data to cache: convert the state object into a settings object
  const getCacheData = () => {
    const settings = {} as LayoutsConfig
    for (const [key, value] of Object.entries(state)) {
      // @ts-expect-error ignore
      settings[key as SettingsStoreKey] = value.value
    }
    return settings
  }

  return state
})
