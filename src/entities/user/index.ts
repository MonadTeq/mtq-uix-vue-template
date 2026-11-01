import { getCurrentUserApi } from "./api/user"
import { setToken as _setToken, getToken, removeToken } from "@/shared/lib"

/** Handler invoked when the user logs out. Registered by the app layer. */
let logoutHandler: (() => void) | null = null

/** Register the handler to run when the user logs out. */
export function setLogoutHandler(handler: () => void) {
  logoutHandler = handler
}

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")

  const roles = ref<string[]>([])

  const permissions = ref<string[]>([])

  const username = ref<string>("")

  const isGotUserInfo = ref<boolean>(false)

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
    logoutHandler?.()
  }

  // Reset the Token
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
    permissions.value = []
    isGotUserInfo.value = false
  }

  return { token, roles, permissions, username, isGotUserInfo, setToken, getInfo, changeUser, logout, resetToken }
})
