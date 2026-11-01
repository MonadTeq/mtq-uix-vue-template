export interface CreateOrUpdateTableRequestData {
  id?: number
  username: string
  password?: string
}

export interface TableRequestData {
  /** Current page number */
  currentPage: number
  /** Query size */
  size: number
  /** Query parameter: username */
  username?: string
  /** Query parameter: phone number */
  phone?: string
}

export interface TableData {
  createTime: string
  email: string
  id: number
  phone: string
  roles: string
  status: boolean
  username: string
}

export type TableResponseData = ApiResponseData<{
  list: TableData[]
  total: number
}>
