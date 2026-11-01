const MAX_MOBILE_WIDTH = 992

/** Device detection composable (pure viewport check, no global state) */
export function useDevice(win: Window = window) {
  const isMobile = ref(win.innerWidth - 1 < MAX_MOBILE_WIDTH)

  const isDesktop = computed(() => !isMobile.value)

  const handleResize = () => {
    isMobile.value = win.innerWidth - 1 < MAX_MOBILE_WIDTH
  }

  onMounted(() => win.addEventListener("resize", handleResize))
  onBeforeUnmount(() => win.removeEventListener("resize", handleResize))

  return { isMobile, isDesktop }
}
