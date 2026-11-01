import { useRouteListener } from "@/shared/lib/use-route-listener"
import { DeviceEnum } from "@/shared/constants/app-key"
import { useAppStore } from "@/entities/app-ui"

/** Following Bootstrap's responsive design, the maximum mobile width is set to 992 */
const MAX_MOBILE_WIDTH = 992

/**
 * @name Browser width change composable
 * @description Change the Layout according to browser width changes
 */
export function useResize(win: Window = window, doc: Document = document) {
  const appStore = useAppStore()

  const { listenerRouteChange } = useRouteListener()

  // Used to determine whether the current device is mobile
  const isMobile = () => {
    const rect = doc.body.getBoundingClientRect()
    return rect.width - 1 < MAX_MOBILE_WIDTH
  }

  // Used to handle window resize events
  const resizeHandler = () => {
    if (!doc.hidden) {
      const _isMobile = isMobile()
      appStore.toggleDevice(_isMobile ? DeviceEnum.Mobile : DeviceEnum.Desktop)
      _isMobile && appStore.closeSidebar(true)
    }
  }

  // Listen to route changes and adjust the layout according to the device type
  listenerRouteChange(() => {
    if (appStore.device === DeviceEnum.Mobile && appStore.sidebar.opened) {
      appStore.closeSidebar(false)
    }
  })

  // Add the window resize event listener before the component mounts
  onBeforeMount(() => {
    win.addEventListener("resize", resizeHandler)
  })

  // After the component mounts, determine the device type based on the window size and adjust the layout
  onMounted(() => {
    if (isMobile()) {
      appStore.toggleDevice(DeviceEnum.Mobile)
      appStore.closeSidebar(true)
    }
  })

  // Remove the window resize event listener before the component unmounts
  onBeforeUnmount(() => {
    win.removeEventListener("resize", resizeHandler)
  })
}
