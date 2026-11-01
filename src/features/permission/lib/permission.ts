import { isArray } from "@/shared/lib/validate"
import { useUserStore } from "@/entities/user"

/** Global permission check function, similar to the v-permission permission directive */
export function checkPermission(rolesOrPermissions: string[]): boolean {
  if (isArray(rolesOrPermissions) && rolesOrPermissions.length > 0) {
    const { roles, permissions } = useUserStore()
    return roles.some(role => rolesOrPermissions.includes(role)) || permissions.some(permission => rolesOrPermissions.includes(permission))
  } else {
    console.error("The parameter must be an array with length greater than 0, e.g. checkPermission(['admin', 'permission:button-level'])")
    return false
  }
}
