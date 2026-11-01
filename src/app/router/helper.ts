import type { Router, RouteRecordNormalized, RouteRecordRaw } from "vue-router"
import { cloneDeep, omit } from "lodash-es"
import { createRouter } from "vue-router"
import { routerConfig } from "./config"

/** Route downgrading (convert routes of three levels and above to second-level routes) */
export function flatMultiLevelRoutes(routes: RouteRecordRaw[]) {
  const routesMirror = cloneDeep(routes)
  routesMirror.forEach((route) => {
    // If the route is a three-level or above route, downgrade it
    isMultipleRoute(route) && promoteRouteLevel(route)
  })
  return routesMirror
}

/** Determine whether the route level is greater than 2 */
function isMultipleRoute(route: RouteRecordRaw) {
  const children = route.children
  // As long as one child route has a children length greater than 0, it is a three-level or above route
  if (children?.length) return children.some(child => child.children?.length)
  return false
}

/** Generate a second-level route */
function promoteRouteLevel(route: RouteRecordRaw) {
  // Create a router instance to obtain all route info of the currently passed route
  let router: Router | null = createRouter({
    history: routerConfig.history,
    routes: [route]
  })
  const routes = router.getRoutes()
  // Use the route info obtained above in the addToChildren function to update route's children
  addToChildren(routes, route.children || [], route)
  router = null
  // After converting to second-level routes, remove children from all child routes
  route.children = route.children?.map(item => omit(item, "children") as RouteRecordRaw)
}

/** Add the given child routes to the specified route module */
function addToChildren(routes: RouteRecordNormalized[], children: RouteRecordRaw[], routeModule: RouteRecordRaw) {
  children.forEach((child) => {
    const route = routes.find(item => item.name === child.name)
    if (route) {
      // Initialize routeModule's children
      routeModule.children = routeModule.children || []
      // If routeModule's children property doesn't contain the route, add it
      if (!routeModule.children.includes(route)) {
        routeModule.children.push(route)
      }
      // If the child route has its own child routes, recursively call this function to add them too
      if (child.children?.length) {
        addToChildren(routes, child.children, routeModule)
      }
    }
  })
}
