/** Focus composable */
export function useFocus() {
  // Whether it has focus
  const isFocus = ref<boolean>(false)

  // Lose focus
  const handleBlur = () => {
    isFocus.value = false
  }

  // Gain focus
  const handleFocus = () => {
    isFocus.value = true
  }

  return { isFocus, handleBlur, handleFocus }
}
