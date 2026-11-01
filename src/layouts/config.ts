import { LayoutModeEnum } from "@@/constants/app-key"
import { getLayoutsConfig } from "@@/utils/local-storage"

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

/** Default configuration */
const DEFAULT_CONFIG: LayoutsConfig = {
  showSettings: true,
  layoutMode: LayoutModeEnum.Left,
  showTagsView: true,
  fixedHeader: true,
  showFooter: true,
  showLogo: true,
  showNotify: true,
  showThemeSwitch: true,
  showScreenfull: true,
  showSearchMenu: true,
  cacheTagsView: false,
  showWatermark: true,
  showGreyMode: false,
  showColorWeakness: false
}

/** Project configuration */
export const layoutsConfig: LayoutsConfig = {
  ...DEFAULT_CONFIG,
  ...getLayoutsConfig(),
  showSettings: DEFAULT_CONFIG.showSettings
}
