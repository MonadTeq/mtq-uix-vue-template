import type { WatchOptions } from "vue"

interface PaginationData {
  total?: number
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number
  layout?: string
}

interface UsePaginationOptions extends PaginationData {
  callback?: () => void
}

/** Default pagination parameters */
const DEFAULT_PAGINATION_DATA = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50],
  total: 0,
  layout: "total, sizes, prev, pager, next, jumper"
}

/** Pagination composable */
export function usePagination(options: UsePaginationOptions = {}) {
  const { callback, ...initPaginationData } = options

  // Merge pagination parameters
  const paginationData = reactive({ ...DEFAULT_PAGINATION_DATA, ...initPaginationData })

  // Change the current page number
  const handleCurrentChange = (value: number) => {
    paginationData.currentPage = value
  }

  // Change the number of items per page
  const handleSizeChange = (value: number) => {
    paginationData.pageSize = value
  }

  // Reset the current page number; execute the callback directly when already on the first page
  const resetCurrentPage = () => {
    paginationData.currentPage === 1 ? callback?.() : (paginationData.currentPage = 1)
  }

  // Watch pagination parameter changes and execute the callback
  const watchPagination = (options: WatchOptions = { immediate: true }) => {
    watch(
      [() => paginationData.currentPage, () => paginationData.pageSize],
      () => callback?.(),
      options
    )
  }

  return {
    paginationData,
    handleCurrentChange,
    handleSizeChange,
    resetCurrentPage,
    watchPagination
  }
}
