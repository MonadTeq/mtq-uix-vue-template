import type { Handler } from "mitt"
import type { RouteLocationNormalizedGeneric } from "vue-router"
import mitt from "mitt"

/** Callback function type */
type Callback = (route: RouteLocationNormalizedGeneric) => void

const emitter = mitt()

const key = Symbol("ROUTE_CHANGE")

let latestRoute: RouteLocationNormalizedGeneric

/** Set the latest route info and trigger the route change event */
export function setRouteChange(to: RouteLocationNormalizedGeneric) {
  // Trigger the event
  emitter.emit(key, to)
  // Cache the latest route info
  latestRoute = to
}

/**
 * @name Subscribe to route changes composable
 * @description 1. Watching routes with watch alone wastes rendering performance
 * @description 2. Prefer this publish/subscribe pattern for distribution management
 */
export function useRouteListener() {
  // Collection of callback functions
  const callbackList: Callback[] = []

  // Listen to route changes (optionally execute immediately)
  const listenerRouteChange = (callback: Callback, immediate = false) => {
    // Cache the callback function
    callbackList.push(callback)
    // Listen to the event
    emitter.on(key, callback as Handler)
    // Optionally execute the callback function once immediately
    immediate && latestRoute && callback(latestRoute)
  }

  // Remove the route change event listener
  const removeRouteListener = (callback: Callback) => {
    emitter.off(key, callback as Handler)
  }

  // Remove the listener before the component is destroyed
  onBeforeUnmount(() => {
    callbackList.forEach(removeRouteListener)
  })

  return { listenerRouteChange, removeRouteListener }
}
