import { DeviceEnum, SIDEBAR_CLOSED, SIDEBAR_OPENED } from "@@/constants/app-key"
import { getSidebarStatus, setSidebarStatus } from "@@/utils/local-storage"
import { pinia } from "@/pinia"

interface Sidebar {
  opened: boolean
  withoutAnimation: boolean
}

/** Set the sidebar status local cache */
function handleSidebarStatus(opened: boolean) {
  opened ? setSidebarStatus(SIDEBAR_OPENED) : setSidebarStatus(SIDEBAR_CLOSED)
}

export const useAppStore = defineStore("app", () => {
  // Sidebar status
  const sidebar: Sidebar = reactive({
    opened: getSidebarStatus() !== SIDEBAR_CLOSED,
    withoutAnimation: false
  })

  // Device type
  const device = ref<DeviceEnum>(DeviceEnum.Desktop)

  // Watch the sidebar opened state
  watch(
    () => sidebar.opened,
    (opened) => {
      handleSidebarStatus(opened)
    }
  )

  // Toggle the sidebar
  const toggleSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
  }

  // Close the sidebar
  const closeSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }

  // Toggle the device type
  const toggleDevice = (value: DeviceEnum) => {
    device.value = value
  }

  return { device, sidebar, toggleSidebar, closeSidebar, toggleDevice }
})

/**
 * @description In an SPA app, this can be used to access the store before the pinia instance is activated
 * @description In an SSR app, this can be used to access the store outside of setup
 */
export function useAppStoreOutside() {
  return useAppStore(pinia)
}
