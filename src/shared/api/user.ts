import type * as Users from "./user-type"
import { request } from "@/shared/api/axios"

/** Get the current logged-in user's details */
export function getCurrentUserApi() {
  return request<Users.CurrentUserResponseData>({
    url: "users/me",
    method: "get"
  })
}
