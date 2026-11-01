import { DeviceEnum } from "@/shared/constants/app-key"
import { useAppStore } from "@/entities/app-ui"

const appStore = useAppStore()

const isMobile = computed(() => appStore.device === DeviceEnum.Mobile)

const isDesktop = computed(() => appStore.device === DeviceEnum.Desktop)

/** Device type composable */
export function useDevice() {
  return { isMobile, isDesktop }
}
