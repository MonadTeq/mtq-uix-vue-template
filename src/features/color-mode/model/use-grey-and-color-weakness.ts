import { useSettingsStore } from "@/entities/settings"

const GREY_MODE = "grey-mode"

const COLOR_WEAKNESS = "color-weakness"

/** Initialize */
function initGreyAndColorWeakness(root: HTMLElement = document.documentElement) {
  const settingsStore = useSettingsStore()
  watchEffect(() => {
    root.classList.toggle(GREY_MODE, settingsStore.showGreyMode)
    root.classList.toggle(COLOR_WEAKNESS, settingsStore.showColorWeakness)
  })
}

/** Gray mode and color weakness mode composable */
export function useGreyAndColorWeakness() {
  return { initGreyAndColorWeakness }
}
