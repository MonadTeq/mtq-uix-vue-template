import type * as ElementPlusIconsVue from "@element-plus/icons-vue"
import type { SvgName } from "~virtual/svg-component"
import "vue-router"

export {}

type ElementPlusIconsName = keyof typeof ElementPlusIconsVue

declare module "vue-router" {
  interface RouteMeta {
    /**
     * @description Set the name displayed for this route in the sidebar and breadcrumb
     */
    title?: string
    /**
     * @description Set the icon for this route; remember to import the svg into src/common/assets/icons
     */
    svgIcon?: SvgName
    /**
     * @description Set the icon for this route by directly using an Element Plus Icon (when set together with svgIcon, svgIcon takes precedence)
     */
    elIcon?: ElementPlusIconsName
    /**
     * @description Defaults to false; when set to true, the route will not appear in the sidebar
     */
    hidden?: boolean
    /**
     * @description Set the roles that can access this route; multiple roles can be stacked
     */
    roles?: string[]
    /**
     * @description Set the permission identifiers that can access this route; multiple permission identifiers can be stacked
     */
    permissions?: string[]
    /**
     * @description Defaults to true; if set to false, it will not be shown in the breadcrumb
     */
    breadcrumb?: boolean
    /**
     * @description Defaults to false; if set to true, it will be pinned in the tags-view
     */
    affix?: boolean
    /**
     * @description When a route has only 1 non-hidden child route declared in its children property and that child route is a leaf node, that child route will be displayed as the parent route in the sidebar
     * @description When there is more than 1, it will revert to nested mode
     * @description If you want to always show the parent route regardless of the count, set alwaysShow: true on the parent route
     */
    alwaysShow?: boolean
    /**
     * @description Example: activeMenu: "/xxx/xxx",
     * @description When this property is set and the route is entered, the sidebar item corresponding to the activeMenu property will be highlighted
     * @description This property is suitable for routes with the hidden: true property
     */
    activeMenu?: string
    /**
     * @description Whether to cache this route's page
     * @description Defaults to false; true means caching is needed, in which case both the route and the page need a consistent Name set
     */
    keepAlive?: boolean
  }

  // When a route's redirect property is set to "noRedirect", the route is shown in the breadcrumb as plain text (not clickable)
}
