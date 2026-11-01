import type { Router } from "vue-router"
import { setRouteChange } from "@/shared/lib"
import { useTitle } from "@/app/lib/use-title"
import { getToken } from "@/shared/lib"
import NProgress from "nprogress"
import { usePermissionStore } from "@/entities/permission"
import { useUserStore } from "@/entities/user"
import { routerConfig } from "@/app/router/config"
import { isWhiteList } from "@/app/router/whitelist"

NProgress.configure({ showSpinner: false })

const { setTitle } = useTitle()

const LOGIN_PATH = "/login"

export function registerNavigationGuard(router: Router) {
  // Global before guard
  router.beforeEach(async (to, _from) => {
    NProgress.start()
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    // If not logged in
    if (!getToken()) {
      // If in the login-free whitelist, enter directly
      if (isWhiteList(to)) return true
      // Other pages without access permission will be redirected to the login page
      return `${LOGIN_PATH}?redirect=${encodeURIComponent(to.fullPath)}`
    }
    // If already logged in and about to enter the Login page, redirect to the home page
    if (to.path === LOGIN_PATH) return "/"
    // If the user has already obtained their permission info
    if (userStore.isGotUserInfo) return true
    // Otherwise, fetch the permission info again
    try {
      await userStore.getInfo()
      // Note: roles and permissions must be arrays! For example: ["admin"] or ["permission:page-level"]
      const { roles, permissions } = userStore
      // Generate accessible Routes
      routerConfig.dynamic ? permissionStore.setRoutes({ roles, permissions }) : permissionStore.setAllRoutes()
      // Add the "dynamic routes with access permission" to the Router
      permissionStore.addRoutes.forEach(route => router.addRoute(route))
      // Set replace: true, so navigation will not leave a history record
      return { ...to, replace: true }
    } catch (error) {
      // If any error occurs during the process, reset the Token directly and redirect to the login page
      userStore.resetToken()
      ElMessage.error((error as Error).message || "Route guard error")
      return LOGIN_PATH
    }
  })

  // Global after hook
  router.afterEach((to) => {
    setRouteChange(to)
    setTitle(to.meta.title)
    NProgress.done()
  })
}
