/** Project title */
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE ?? "V3 Admin Vite"

/** Dynamic title */
const dynamicTitle = ref<string>("")

/** Set the title */
function setTitle(title?: string) {
  dynamicTitle.value = title ? `${VITE_APP_TITLE} | ${title}` : VITE_APP_TITLE
}

/** Title composable */
export function useTitle(doc: Document = document) {
  // Watch title changes
  watch(dynamicTitle, (value, oldValue) => {
    if (doc && value !== oldValue) {
      doc.title = value
    }
  })

  return { setTitle }
}
