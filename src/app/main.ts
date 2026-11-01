/* eslint-disable perfectionist/sort-imports */

// core
import { pinia } from "@/app/providers/pinia"
import { resetRouter, router } from "@/app/router"
import { installPlugins } from "@/app/plugins"
import { setUnauthorizedHandler } from "@/shared/api"
import { setLogoutHandler, useUserStore } from "@/entities/user"
import { useSettingsStore } from "@/entities/settings"
import { useTagsViewStore } from "@/entities/tags-view"
import App from "@/app/App.vue"
// css
import "normalize.css"
import "nprogress/nprogress.css"
import "@/app/styles/index.scss"

// Create the app instance
const app = createApp(App)

// Install plugins (global components, custom directives, etc.)
installPlugins(app)

// Install pinia and router
app.use(pinia).use(router)

// Register the handler for unauthorized API requests
setUnauthorizedHandler(() => useUserStore().logout())

// Register the logout orchestration (reset token, routes and tags bar, then redirect)
setLogoutHandler(() => {
  const settingsStore = useSettingsStore()
  const tagsViewStore = useTagsViewStore()
  resetRouter()
  if (!settingsStore.cacheTagsView) {
    tagsViewStore.delAllVisitedViews()
    tagsViewStore.delAllCachedViews()
  }
  router.replace("/login")
})

// Mount the app once the router is ready
router.isReady().then(() => {
  app.mount("#app")
})
