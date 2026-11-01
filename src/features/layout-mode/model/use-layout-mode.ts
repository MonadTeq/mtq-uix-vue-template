import { LayoutModeEnum } from "@/shared/constants"
import { useSettingsStore } from "@/entities/settings"

const settingsStore = useSettingsStore()

const isLeft = computed(() => settingsStore.layoutMode === LayoutModeEnum.Left)

const isTop = computed(() => settingsStore.layoutMode === LayoutModeEnum.Top)

const isLeftTop = computed(() => settingsStore.layoutMode === LayoutModeEnum.LeftTop)

function setLayoutMode(mode: LayoutModeEnum) {
  settingsStore.layoutMode = mode
}

/** Layout mode composable */
export function useLayoutMode() {
  return { isLeft, isTop, isLeftTop, setLayoutMode }
}
