import { getCurrentUserApi } from "@@/apis/users"
import { setToken as _setToken, getToken, removeToken } from "@@/utils/local-storage"
import { pinia } from "@/pinia"
import { resetRouter, router } from "@/router"
import { useSettingsStore } from "./settings"
import { useTagsViewStore } from "./tags-view"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")

  const roles = ref<string[]>([])

  const permissions = ref<string[]>([])

  const username = ref<string>("")

  const isGotUserInfo = ref<boolean>(false)

  const tagsViewStore = useTagsViewStore()

  const settingsStore = useSettingsStore()

  // Set the Token
  const setToken = (value: string) => {
    _setToken(value)
    token.value = value
  }

  // Get user details
  const getInfo = async () => {
    const { data } = await getCurrentUserApi()
    username.value = data.username
    roles.value = data.roles ?? []
    permissions.value = data.permissions ?? []
    // Prevent the route guard logic from entering an infinite loop
    isGotUserInfo.value = true
  }

  // Simulate user changes
  const changeUser = (value: string) => {
    const newToken = `token-${value}`
    token.value = newToken
    _setToken(newToken)
    // Use a page refresh instead of re-logging in
    location.reload()
  }

  // Log out
  const logout = () => {
    resetToken()
    resetRouter()
    resetTagsView()
    // Redirect to the login page
    router.replace("/login")
  }

  // Reset the Token
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
    permissions.value = []
    isGotUserInfo.value = false
  }

  // Reset Visited Views and Cached Views
  const resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { token, roles, permissions, username, isGotUserInfo, setToken, getInfo, changeUser, logout, resetToken }
})

/**
 * @description In an SPA app, this can be used to access the store before the pinia instance is activated
 * @description In an SSR app, this can be used to access the store outside of setup
 */
export function useUserStoreOutside() {
  return useUserStore(pinia)
}
