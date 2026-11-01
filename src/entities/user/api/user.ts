import { getUsersService } from "@/shared/api"

/** Get the current logged-in user's details */
export function getCurrentUserApi() {
  return getUsersService().getCurrentUser()
}
