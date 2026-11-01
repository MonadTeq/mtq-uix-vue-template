import type { Ref } from "vue"
import type { LayoutsConfig } from "@/layouts/config"
import { setLayoutsConfig } from "@@/utils/local-storage"
import { layoutsConfig } from "@/layouts/config"
import { pinia } from "@/pinia"

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

/**
 * @description In an SPA app, this can be used to access the store before the pinia instance is activated
 * @description In an SSR app, this can be used to access the store outside of setup
 */
export function useSettingsStoreOutside() {
  return useSettingsStore(pinia)
}
