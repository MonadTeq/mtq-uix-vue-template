import type { App, Directive } from "vue"
import { isArray } from "@/shared/lib/validate"
import { useUserStore } from "@/entities/user"

/**
 * @name Permission directive
 * @description Similar in functionality to the permission check function checkPermission
 */
const permission: Directive = {
  mounted(el, binding) {
    const { value: rolesOrPermissions } = binding
    const { roles, permissions } = useUserStore()
    if (isArray(rolesOrPermissions) && rolesOrPermissions.length > 0) {
      const hasPermission = roles.some(role => rolesOrPermissions.includes(role)) || permissions.some(permission => rolesOrPermissions.includes(permission))
      hasPermission || el.parentNode?.removeChild(el)
    } else {
      throw new Error(`The parameter must be an array with length greater than 0, e.g. v-permission="['admin', 'permission:button-level']"`)
    }
  }
}

export function installPermissionDirective(app: App) {
  app.directive("permission", permission)
}
