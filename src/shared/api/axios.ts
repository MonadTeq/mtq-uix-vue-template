import type { AxiosInstance, AxiosRequestConfig } from "axios"
import { getToken } from "@/shared/lib"
import axios from "axios"
import { get, merge } from "lodash-es"

/** Callback invoked when a request is unauthorized (401). Registered by the app layer. */
let unauthorizedHandler: (() => void) | null = null

/** Register the handler to run when a request is unauthorized. */
export function setUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler
}

function handleUnauthorized() {
  unauthorizedHandler?.()
}

/** Create a request instance */
function createInstance() {
  // Create an axios instance named instance
  const instance = axios.create()
  // Request interceptor
  instance.interceptors.request.use(
    // Before sending
    config => config,
    // When sending fails
    error => Promise.reject(error)
  )
  // Response interceptor (can be adjusted according to specific business needs)
  instance.interceptors.response.use(
    (response) => {
      // apiData is the data returned by the api
      const apiData = response.data
      // Return binary data directly
      const responseType = response.config.responseType
      if (responseType === "blob" || responseType === "arraybuffer") return apiData
      // This code is the business code agreed with the backend
      const code = apiData.code
      // If there is no code, it means this is not an api developed by the project's backend
      if (code === undefined) {
        ElMessage.error("Not an API of this system")
        return Promise.reject(new Error("Not an API of this system"))
      }
      switch (code) {
        case 0:
          // This system uses code === 0 to indicate no business error
          return apiData
        case 401:
          // When the Token expires
          handleUnauthorized()
          return undefined
        default:
          // Not the correct code
          ElMessage.error(apiData.message || "Error")
          return Promise.reject(apiData)
      }
    },
    (error) => {
      // status is the HTTP status code
      const status = get(error, "response.status")
      const message = get(error, "response.data.message")
      switch (status) {
        case 400:
          error.message = "Bad request"
          break
        case 401:
          // When the Token expires
          error.message = message || "Unauthorized"
          handleUnauthorized()
          break
        case 403:
          error.message = message || "Forbidden"
          break
        case 404:
          error.message = "Request URL error"
          break
        case 408:
          error.message = "Request timeout"
          break
        case 500:
          error.message = "Internal server error"
          break
        case 501:
          error.message = "Not implemented"
          break
        case 502:
          error.message = "Bad gateway"
          break
        case 503:
          error.message = "Service unavailable"
          break
        case 504:
          error.message = "Gateway timeout"
          break
        case 505:
          error.message = "HTTP version not supported"
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return instance
}

/** Create the request method */
function createRequest(instance: AxiosInstance) {
  return <T>(config: AxiosRequestConfig): Promise<T> => {
    const token = getToken()
    // Default configuration
    const defaultConfig: AxiosRequestConfig = {
      // API address
      baseURL: import.meta.env.VITE_BASE_URL,
      // Request headers
      headers: {
        // Carry the Token
        "Authorization": token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json"
      },
      // Request body
      data: {},
      // Request timeout
      timeout: 5000,
      // Whether to carry Cookies in cross-origin requests
      withCredentials: false
    }
    // Merge the default configuration defaultConfig with the passed custom configuration config into mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return instance(mergeConfig)
  }
}

/** Instance used for requests */
const instance = createInstance()

/** Method used for requests */
export const request = createRequest(instance)
