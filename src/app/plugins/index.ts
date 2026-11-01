import type { App } from "vue"
import { installPermissionDirective } from "@/features/access-control"
import { installSvgIcon } from "./svg-icon"

export function installPlugins(app: App) {
  installPermissionDirective(app)
  installSvgIcon(app)
}
