import { DeviceEnum, SIDEBAR_CLOSED, SIDEBAR_OPENED } from "@/shared/constants/app-key"
import { getSidebarStatus, setSidebarStatus } from "@/shared/lib/local-storage"

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
