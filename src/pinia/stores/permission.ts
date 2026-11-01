import type { RouteRecordRaw } from "vue-router"
import { pinia } from "@/pinia"
import { constantRoutes, dynamicRoutes } from "@/router"
import { routerConfig } from "@/router/config"
import { flatMultiLevelRoutes } from "@/router/helper"

interface UserPermissionInfo {
  roles: string[]
  permissions: string[]
}

function hasPermission(userPermissionInfo: UserPermissionInfo, route: RouteRecordRaw) {
  const routeRoles = route.meta?.roles
  const routePermissions = route.meta?.permissions
  const hasRoles = routeRoles !== undefined
  const hasPermissions = routePermissions !== undefined
  if (!hasRoles && !hasPermissions) return true
  const matchedRole = routeRoles?.some(role => userPermissionInfo.roles.includes(role)) ?? false
  const matchedPermission = routePermissions?.some(permission => userPermissionInfo.permissions.includes(permission)) ?? false
  return matchedRole || matchedPermission
}

function filterDynamicRoutes(routes: RouteRecordRaw[], userPermissionInfo: UserPermissionInfo) {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(userPermissionInfo, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterDynamicRoutes(tempRoute.children, userPermissionInfo)
      }
      res.push(tempRoute)
    }
  })
  return res
}

export const usePermissionStore = defineStore("permission", () => {
  // Accessible routes
  const routes = ref<RouteRecordRaw[]>([])

  // Dynamic routes with access permission
  const addRoutes = ref<RouteRecordRaw[]>([])

  // Generate accessible Routes based on roles and permissions (accessible routes = constant routes + dynamic routes with access permission)
  const setRoutes = (userPermissionInfo: UserPermissionInfo) => {
    const accessedRoutes = filterDynamicRoutes(dynamicRoutes, userPermissionInfo)
    set(accessedRoutes)
  }

  // All routes = all constant routes + all dynamic routes
  const setAllRoutes = () => {
    set(dynamicRoutes)
  }

  // Unified setting
  const set = (accessedRoutes: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(accessedRoutes)
    addRoutes.value = routerConfig.thirdLevelRouteCache ? flatMultiLevelRoutes(accessedRoutes) : accessedRoutes
  }

  return { routes, addRoutes, setRoutes, setAllRoutes }
})

/**
 * @description In an SPA app, this can be used to access the store before the pinia instance is activated
 * @description In an SSR app, this can be used to access the store outside of setup
 */
export function usePermissionStoreOutside() {
  return usePermissionStore(pinia)
}
