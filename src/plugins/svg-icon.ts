import type { App } from "vue"
import SvgIcon from "~virtual/svg-component"

export function installSvgIcon(app: App) {
  // Register the SvgIcon component
  app.component("SvgIcon", SvgIcon)
}
