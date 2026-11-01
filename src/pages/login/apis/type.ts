export interface LoginRequestData {
  /** admin or editor */
  username: "admin" | "editor"
  /** Password */
  password: string
  /** Captcha */
  code: string
}

export type CaptchaResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>
