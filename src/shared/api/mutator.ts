import type { AxiosRequestConfig } from "axios"
import { request } from "./axios"

export const customMutator = <T>(config: AxiosRequestConfig): Promise<T> => {
  return request<T>(config)
}
