import type { App } from "vue"
import { installSvgIcon } from "./svg-icon"

export function installPlugins(app: App) {
  installSvgIcon(app)
}
