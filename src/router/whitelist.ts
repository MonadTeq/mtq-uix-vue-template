import type { RouteLocationNormalizedGeneric, RouteRecordNameGeneric } from "vue-router"

/** Login-free whitelist (matches route path) */
const whiteListByPath: string[] = ["/login"]

/** Login-free whitelist (matches route name) */
const whiteListByName: RouteRecordNameGeneric[] = []

/** Determine whether it is in the whitelist */
export function isWhiteList(to: RouteLocationNormalizedGeneric) {
  // Matching either path or name is sufficient
  return whiteListByPath.includes(to.path) || whiteListByName.includes(to.name)
}
