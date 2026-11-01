import type { RouteRecordRaw } from "vue-router"
import { createRouter } from "vue-router"
import { DASHBOARD_PATH, REDIRECT_PATH, routerConfig } from "@/app/router/config"
import { registerNavigationGuard } from "@/app/router/guard"
import { flatMultiLevelRoutes } from "./helper"

const Layouts = () => import("@/app/layouts/index.vue")

/**
 * @name Constant routes
 * @description Except for hidden pages such as redirect/403/404/login, other pages should set a unique Name property
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: REDIRECT_PATH,
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/pages/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/pages/error/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/pages/error/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    redirect: DASHBOARD_PATH,
    children: [
      {
        path: "dashboard",
        component: () => import("@/pages/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "Home",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/demo",
    component: Layouts,
    redirect: "/demo/ui-primitives",
    name: "Demo",
    meta: {
      title: "Demos"
    },
    children: [
      {
        path: "ui-primitives",
        component: () => import("@/pages/demo/ui-primitives/index.vue"),
        name: "UIPrimitives",
        meta: {
          title: "UI Primitives"
        }
      },
      {
        path: "level2",
        component: () => import("@/pages/demo/level2/index.vue"),
        redirect: "/demo/level2/level3",
        name: "Level2",
        meta: {
          title: "Second-level Route",
          alwaysShow: true
        },
        children: [
          {
            path: "level3",
            component: () => import("@/pages/demo/level2/level3/index.vue"),
            name: "Level3",
            meta: {
              title: "Third-level Route",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "composable-demo",
        redirect: "/demo/composable-demo/use-fetch-select",
        name: "ComposableDemo",
        meta: {
          title: "Composables"
        },
        children: [
          {
            path: "use-fetch-select",
            component: () => import("@/pages/demo/composable-demo/use-fetch-select.vue"),
            name: "UseFetchSelect",
            meta: {
              title: "useFetchSelect"
            }
          },
          {
            path: "use-fullscreen-loading",
            component: () => import("@/pages/demo/composable-demo/use-fullscreen-loading.vue"),
            name: "UseFullscreenLoading",
            meta: {
              title: "useFullscreenLoading"
            }
          },
          {
            path: "use-watermark",
            component: () => import("@/pages/demo/composable-demo/use-watermark.vue"),
            name: "UseWatermark",
            meta: {
              title: "useWatermark"
            }
          }
        ]
      }
    ]
  },
  {
    path: "/docs",
    component: Layouts,
    redirect: "/docs/architecture",
    name: "Docs",
    meta: {
      title: "Documentation"
    },
    children: [
      {
        path: "architecture",
        component: () => import("@/pages/docs/architecture.vue"),
        name: "DocsArchitecture",
        meta: {
          title: "Architecture"
        }
      },
      {
        path: "design-tokens",
        component: () => import("@/pages/docs/design-tokens.vue"),
        name: "DocsDesignTokens",
        meta: {
          title: "Design Tokens"
        }
      },
      {
        path: "style-schemes",
        component: () => import("@/pages/docs/style-schemes.vue"),
        name: "DocsStyleSchemes",
        meta: {
          title: "Style Schemes"
        }
      },
      {
        path: "api-codegen",
        component: () => import("@/pages/docs/api-codegen.vue"),
        name: "DocsApiCodegen",
        meta: {
          title: "API & Codegen"
        }
      }
    ]
  },
  {
    path: "/link",
    meta: {
      title: "Docs Links"
    },
    children: [
      {
        path: "https://juejin.cn/post/7445151895121543209",
        component: () => {},
        name: "Link1",
        meta: {
          title: "Chinese Docs"
        }
      },
      {
        path: "https://juejin.cn/column/7207659644487139387",
        component: () => {},
        name: "Link2",
        meta: {
          title: "Beginner Tutorial"
        }
      },
      {
        path: "https://juejin.cn/column/7046214632771420196",
        component: () => {},
        name: "Link3",
        meta: {
          title: "Related News"
        }
      }
    ]
  }
]

/**
 * @name Dynamic routes
 * @description Used to hold routes that have permissions (roles / permissions properties)
 * @description Must have a unique Name property
 */
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layouts,
    redirect: "/permission/page-level",
    name: "Permission",
    meta: {
      title: "Permission Demo",
      alwaysShow: true
    },
    children: [
      {
        path: "page-level",
        component: () => import("@/pages/demo/permission/page-level.vue"),
        name: "PermissionPageLevel",
        meta: {
          title: "Page Level",
          // Set roles in the route to control access
          roles: ["admin"],
          // Set permission identifiers in the route to control access
          permissions: ["permission:page-level"]
        }
      },
      {
        path: "button-level",
        component: () => import("@/pages/demo/permission/button-level.vue"),
        name: "PermissionButtonLevel",
        meta: {
          title: "Button Level",
          // If not set, access to the page is unrestricted
          roles: undefined,
          // Set permission identifiers in the route to control access
          permissions: ["permission:button-level"]
        }
      }
    ]
  }
]

/** Router instance */
export const router = createRouter({
  history: routerConfig.history,
  routes: routerConfig.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

/** Reset the router */
export function resetRouter() {
  try {
    // Note: all dynamic routes must have a Name property, otherwise they may not be fully reset cleanly
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && (meta.roles?.length || meta.permissions?.length)) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // Forcing a browser refresh also works, but the interaction experience is not great
    location.reload()
  }
}

// Register the route navigation guard
registerNavigationGuard(router)
