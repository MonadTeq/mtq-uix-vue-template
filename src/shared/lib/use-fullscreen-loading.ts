import type { LoadingOptions } from "element-plus"

interface UseFullscreenLoading {
  <T extends (...args: Parameters<T>) => ReturnType<T>>(
    fn: T,
    options?: LoadingOptions
  ): (...args: Parameters<T>) => Promise<ReturnType<T>>
}

interface LoadingInstance {
  close: () => void
}

const DEFAULT_OPTIONS = {
  lock: true,
  text: "Loading..."
}

/**
 * @name Fullscreen loading composable
 * @description Pass in a function fn; add a "fullscreen" Loading during its execution
 * @param fn The function to execute
 * @param options LoadingOptions
 * @returns Returns a new function that returns a Promise
 */
export const useFullscreenLoading: UseFullscreenLoading = (fn, options = {}) => {
  let loadingInstance: LoadingInstance
  return async (...args) => {
    try {
      loadingInstance = ElLoading.service({ ...DEFAULT_OPTIONS, ...options })
      return await fn(...args)
    } finally {
      loadingInstance.close()
    }
  }
}
