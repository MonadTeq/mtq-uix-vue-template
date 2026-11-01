import type * as Auth from "./type"
import { request } from "@/http/axios"

/** Get the login captcha */
export function getCaptchaApi() {
  return request<Auth.CaptchaResponseData>({
    url: "auth/captcha",
    method: "get"
  })
}

/** Log in and return the Token */
export function loginApi(data: Auth.LoginRequestData) {
  return request<Auth.LoginResponseData>({
    url: "auth/login",
    method: "post",
    data
  })
}
