import type * as Users from "./type"
import { request } from "@/http/axios"

/** Get the current logged-in user's details */
export function getCurrentUserApi() {
  return request<Users.CurrentUserResponseData>({
    url: "users/me",
    method: "get"
  })
}
