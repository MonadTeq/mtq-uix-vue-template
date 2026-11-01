/** All API interface response data should conform to this format */
interface ApiResponseData<T> {
  code: number
  data: T
  message: string
}
