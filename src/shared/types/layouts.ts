import type { LayoutModeEnum } from "@/shared/constants"

/** Project configuration type */
export interface LayoutsConfig {
  /** Whether to show the settings button and panel */
  showSettings: boolean
  /** Layout mode */
  layoutMode: LayoutModeEnum
  /** Whether to show the tags bar */
  showTagsView: boolean
  /** Whether to show the Logo */
  showLogo: boolean
  /** Whether to fix the Header */
  fixedHeader: boolean
  /** Whether to show the footer */
  showFooter: boolean
  /** Whether to show message notifications */
  showNotify: boolean
  /** Whether to show the theme switch button */
  showThemeSwitch: boolean
  /** Whether to show the fullscreen button */
  showScreenfull: boolean
  /** Whether to show the search button */
  showSearchMenu: boolean
  /** Whether to cache the tags bar */
  cacheTagsView: boolean
  /** Enable the system watermark */
  showWatermark: boolean
  /** Whether to show gray mode */
  showGreyMode: boolean
  /** Whether to show color weakness mode */
  showColorWeakness: boolean
}
