import type { RouterHistory } from "vue-router"
import { createWebHashHistory, createWebHistory } from "vue-router"
import { DASHBOARD_PATH, REDIRECT_PATH } from "@/shared/constants/paths"

export { DASHBOARD_PATH, REDIRECT_PATH }

/** Router configuration */
interface RouterConfig {
  /**
   * @name Route mode
   * @description hash mode and html5 mode
   */
  history: RouterHistory
  /**
   * @name Whether to enable the dynamic route feature
   * @description 1. Once enabled, it requires backend cooperation: the query user details API returns the fields (roles / permissions) the current user can use to determine and load dynamic routes
   * @description 2. If the project doesn't need to show different pages based on different users, dynamic should be false
   */
  dynamic: boolean
  /**
   * @name Whether to enable caching for routes of three levels and above
   * @description 1. When enabled, route downgrading is performed (routes of three levels and above are converted to second-level routes)
   * @description 2. Since they are all converted to second-level routes, second-level and above routes with embedded child routes will become invalid
   */
  thirdLevelRouteCache: boolean
}

const VITE_ROUTER_HISTORY = import.meta.env.VITE_ROUTER_HISTORY

const VITE_PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH

export const routerConfig: RouterConfig = {
  history: VITE_ROUTER_HISTORY === "hash" ? createWebHashHistory(VITE_PUBLIC_PATH) : createWebHistory(VITE_PUBLIC_PATH),
  dynamic: true,
  thirdLevelRouteCache: false
}
