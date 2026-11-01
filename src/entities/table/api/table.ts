import type * as Tables from "../model/table-type"
import { request } from "@/shared/api"

/** Create */
export function createTableDataApi(data: Tables.CreateOrUpdateTableRequestData) {
  return request({
    url: "tables",
    method: "post",
    data
  })
}

/** Delete */
export function deleteTableDataApi(id: number) {
  return request({
    url: `tables/${id}`,
    method: "delete"
  })
}

/** Update */
export function updateTableDataApi(data: Tables.CreateOrUpdateTableRequestData) {
  return request({
    url: "tables",
    method: "put",
    data
  })
}

/** Read */
export function getTableDataApi(params: Tables.TableRequestData) {
  return request<Tables.TableResponseData>({
    url: "tables",
    method: "get",
    params
  })
}
