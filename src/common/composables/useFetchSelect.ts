type OptionValue = string | number

/** Data format required by Select */
interface SelectOption {
  value: OptionValue
  label: string
  disabled?: boolean
}

/** API response format */
type ApiData = ApiResponseData<SelectOption[]>

/** Input parameter format; for now you only need to pass the api function */
interface FetchSelectProps {
  api: () => Promise<ApiData>
}

/** Dropdown select composable */
export function useFetchSelect(props: FetchSelectProps) {
  const { api } = props

  const loading = ref<boolean>(false)

  const options = ref<SelectOption[]>([])

  const value = ref<OptionValue>("")

  // Call the API to fetch data
  const loadData = () => {
    loading.value = true
    options.value = []
    api().then((res) => {
      options.value = res.data
    }).finally(() => {
      loading.value = false
    })
  }

  onMounted(() => {
    loadData()
  })

  return { loading, options, value }
}
