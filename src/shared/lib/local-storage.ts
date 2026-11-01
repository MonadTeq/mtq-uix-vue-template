// Unified handling of localStorage

import type { ThemeName } from "@/shared/types"
import type { SidebarClosed, SidebarOpened } from "@/shared/constants"
import type { LayoutsConfig } from "@/shared/types"
import type { TagView } from "@/shared/types"
import { CacheKey } from "@/shared/constants"

// #region Token
export function getToken() {
  return localStorage.getItem(CacheKey.TOKEN)
}

export function setToken(token: string) {
  localStorage.setItem(CacheKey.TOKEN, token)
}

export function removeToken() {
  localStorage.removeItem(CacheKey.TOKEN)
}
// #endregion

// #region System layout configuration
export function getLayoutsConfig() {
  const json = localStorage.getItem(CacheKey.CONFIG_LAYOUT)
  return json ? (JSON.parse(json) as LayoutsConfig) : null
}

export function setLayoutsConfig(settings: LayoutsConfig) {
  localStorage.setItem(CacheKey.CONFIG_LAYOUT, JSON.stringify(settings))
}

export function removeLayoutsConfig() {
  localStorage.removeItem(CacheKey.CONFIG_LAYOUT)
}
// #endregion

// #region Sidebar status
export function getSidebarStatus() {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}

export function setSidebarStatus(sidebarStatus: SidebarOpened | SidebarClosed) {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}
// #endregion

// #region The theme name currently being applied
export function getActiveThemeName() {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName | null
}

export function setActiveThemeName(themeName: ThemeName) {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}
// #endregion

// #region Tags bar
export function getVisitedViews() {
  const json = localStorage.getItem(CacheKey.VISITED_VIEWS)
  return JSON.parse(json ?? "[]") as TagView[]
}

export function setVisitedViews(views: TagView[]) {
  views.forEach((view) => {
    // Delete unnecessary properties to prevent JSON.stringify from hitting circular references
    delete view.matched
    delete view.redirectedFrom
  })
  localStorage.setItem(CacheKey.VISITED_VIEWS, JSON.stringify(views))
}

export function getCachedViews() {
  const json = localStorage.getItem(CacheKey.CACHED_VIEWS)
  return JSON.parse(json ?? "[]") as string[]
}

export function setCachedViews(views: string[]) {
  localStorage.setItem(CacheKey.CACHED_VIEWS, JSON.stringify(views))
}
// #endregion
