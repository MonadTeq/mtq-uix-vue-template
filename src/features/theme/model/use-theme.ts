import type { ThemeName } from "@/shared/types"
import { setCssVar } from "@/shared/lib"
import { getActiveThemeName, setActiveThemeName } from "@/shared/lib"

const DEFAULT_THEME_NAME = "normal"

interface ThemeList {
  title: string
  name: ThemeName
}

/** Theme list */
const themeList: ThemeList[] = [
  {
    title: "Default",
    name: DEFAULT_THEME_NAME
  },
  {
    title: "Dark",
    name: "dark"
  },
  {
    title: "Deep Blue",
    name: "dark-blue"
  }
]

/** The theme name currently being applied */
const activeThemeName = ref<ThemeName>(getActiveThemeName() || DEFAULT_THEME_NAME)

/** Set the theme */
function setTheme({ clientX, clientY }: MouseEvent, value: ThemeName, doc: Document = document, win: Window = window) {
  const maxRadius = Math.hypot(
    Math.max(clientX, win.innerWidth - clientX),
    Math.max(clientY, win.innerHeight - clientY)
  )
  setCssVar("--v3-theme-x", `${clientX}px`)
  setCssVar("--v3-theme-y", `${clientY}px`)
  setCssVar("--v3-theme-r", `${maxRadius}px`)
  const handler = () => {
    activeThemeName.value = value
  }
  doc.startViewTransition ? doc.startViewTransition(handler) : handler()
}

/** Apply the scheme via the data-theme attribute */
function applyTheme(value: ThemeName, doc: Document = document) {
  doc.documentElement.setAttribute("data-theme", value)
}

/** Initialize */
function initTheme(doc: Document = document) {
  // Use watchEffect to collect side effects
  watchEffect(() => {
    const value = activeThemeName.value
    applyTheme(value, doc)
    setActiveThemeName(value)
  })
}

/** Theme composable */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
