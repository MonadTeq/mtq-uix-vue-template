import type { Ref } from "vue"
import { debounce } from "lodash-es"

/** Default configuration */
const DEFAULT_CONFIG = {
  /** Defense (enabled by default; can prevent the watermark from being deleted or hidden, but may cause performance loss) */
  defense: true,
  /** Text color */
  color: "#c0c4cc",
  /** Text opacity */
  opacity: 0.5,
  /** Text font size */
  size: 16,
  /** Text font */
  family: "serif",
  /** Text tilt angle */
  angle: -20,
  /** Width occupied by one watermark (larger value means lower watermark density) */
  width: 300,
  /** Height occupied by one watermark (larger value means lower watermark density) */
  height: 200
}

type DefaultConfig = typeof DEFAULT_CONFIG

interface Observer {
  watermarkElMutationObserver?: MutationObserver
  parentElMutationObserver?: MutationObserver
  parentElResizeObserver?: ResizeObserver
}

/**
 * @name Watermark composable
 * @description 1. You can optionally pass in a container element to mount the watermark; default is body
 * @description 2. Watermark defense is implemented to effectively prevent others from opening the console to delete or hide the watermark
 */
export function useWatermark(parentEl: Ref<HTMLElement | null> = ref<HTMLElement>(document.body), doc: Document = document) {
  // Backup text
  let backupText: string

  // Final configuration
  let mergeConfig: DefaultConfig

  // Watermark element
  let watermarkEl: HTMLElement | null = null

  // Observer
  const observer: Observer = {
    watermarkElMutationObserver: undefined,
    parentElMutationObserver: undefined,
    parentElResizeObserver: undefined
  }

  // Set the watermark
  const setWatermark = (text: string, config: Partial<DefaultConfig> = {}) => {
    if (!parentEl.value) return console.warn("Please call the setWatermark method after the DOM is mounted")
    // Backup text
    backupText = text
    // Merge configuration
    mergeConfig = { ...DEFAULT_CONFIG, ...config }
    // Create or update the watermark element
    watermarkEl ? updateWatermarkEl() : createWatermarkEl()
    // Listen to changes of the watermark element and the container element
    addElListener(parentEl.value)
  }

  // Create the watermark element
  const createWatermarkEl = () => {
    const isBody = parentEl.value!.tagName.toLowerCase() === doc.body.tagName.toLowerCase()
    const watermarkElPosition = isBody ? "fixed" : "absolute"
    const parentElPosition = isBody ? "" : "relative"
    watermarkEl = doc.createElement("div")
    watermarkEl.style.pointerEvents = "none"
    watermarkEl.style.top = "0"
    watermarkEl.style.left = "0"
    watermarkEl.style.position = watermarkElPosition
    watermarkEl.style.zIndex = "99999"
    const { clientWidth, clientHeight } = parentEl.value!
    updateWatermarkEl({ width: clientWidth, height: clientHeight })
    // Set the watermark container to relative positioning
    parentEl.value!.style.position = parentElPosition
    // Append the watermark element to the watermark container
    parentEl.value!.appendChild(watermarkEl)
  }

  // Update the watermark element
  const updateWatermarkEl = (
    options: Partial<{
      width: number
      height: number
    }> = {}
  ) => {
    if (!watermarkEl) return
    backupText && (watermarkEl.style.background = `url(${createBase64()}) left top repeat`)
    options.width && (watermarkEl.style.width = `${options.width}px`)
    options.height && (watermarkEl.style.height = `${options.height}px`)
  }

  // Create the base64 image
  const createBase64 = () => {
    const { color, opacity, size, family, angle, width, height } = mergeConfig
    const canvasEl = doc.createElement("canvas")
    canvasEl.width = width
    canvasEl.height = height
    const ctx = canvasEl.getContext("2d")
    if (ctx) {
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      ctx.font = `${size}px ${family}`
      ctx.rotate((Math.PI / 180) * angle)
      ctx.fillText(backupText, 0, height / 2)
    }
    return canvasEl.toDataURL()
  }

  // Clear the watermark
  const clearWatermark = () => {
    if (!parentEl.value || !watermarkEl) return
    // Remove listeners on the watermark element and the container element
    removeListener()
    // Remove the watermark element
    try {
      parentEl.value.removeChild(watermarkEl)
    } catch {
      // For example, when defense is disabled, the user opens the console and deletes this element
      console.warn("The watermark element no longer exists; please create it again")
    } finally {
      watermarkEl = null
    }
  }

  // Refresh the watermark (called when defense is enabled)
  const updateWatermark = debounce(() => {
    clearWatermark()
    createWatermarkEl()
    addElListener(parentEl.value!)
  }, 100)

  // Listen to changes of the watermark element and the container element (DOM changes & DOM size changes)
  const addElListener = (targetNode: HTMLElement) => {
    // Determine whether defense is enabled
    if (mergeConfig.defense) {
      // Prevent adding listeners repeatedly
      if (!observer.watermarkElMutationObserver && !observer.parentElMutationObserver) {
        // Listen to DOM changes
        addMutationListener(targetNode)
      }
    } else {
      // No mutation listening is needed when defense is disabled
      removeListener("mutation")
    }
    // Prevent adding listeners repeatedly
    if (!observer.parentElResizeObserver) {
      // Listen to DOM size changes
      addResizeListener(targetNode)
    }
  }

  // Remove listeners on the watermark element and the container element; the argument can specify which listener to remove, and omitting it removes all listeners by default
  const removeListener = (kind: "mutation" | "resize" | "all" = "all") => {
    // Remove the mutation listener
    if (kind === "mutation" || kind === "all") {
      observer.watermarkElMutationObserver?.disconnect()
      observer.watermarkElMutationObserver = undefined
      observer.parentElMutationObserver?.disconnect()
      observer.parentElMutationObserver = undefined
    }
    // Remove the resize listener
    if (kind === "resize" || kind === "all") {
      observer.parentElResizeObserver?.disconnect()
      observer.parentElResizeObserver = undefined
    }
  }

  // Listen to DOM changes
  const addMutationListener = (targetNode: HTMLElement) => {
    // Callback executed when a mutation is observed
    const mutationCallback = debounce((mutationList: MutationRecord[]) => {
      // Watermark defense (prevents users from manually deleting the watermark element or hiding the watermark via CSS)
      mutationList.forEach(
        debounce((mutation: MutationRecord) => {
          switch (mutation.type) {
            case "attributes":
              mutation.target === watermarkEl && updateWatermark()
              break
            case "childList":
              mutation.removedNodes.forEach((item) => {
                item === watermarkEl && targetNode.appendChild(watermarkEl)
              })
              break
          }
        }, 100)
      )
    }, 100)
    // Create an observer instance and pass in the callback
    observer.watermarkElMutationObserver = new MutationObserver(mutationCallback)
    observer.parentElMutationObserver = new MutationObserver(mutationCallback)
    // Start observing the target node with the above configuration
    observer.watermarkElMutationObserver.observe(watermarkEl!, {
      // Observe whether the target node's attributes change; defaults to true
      attributes: true,
      // Observe whether the target node's child nodes are added or removed; defaults to false
      childList: false,
      // Whether to extend observation to all descendant nodes; defaults to false
      subtree: false
    })
    observer.parentElMutationObserver.observe(targetNode, {
      attributes: false,
      childList: true,
      subtree: false
    })
  }

  // Listen to DOM size changes
  const addResizeListener = (targetNode: HTMLElement) => {
    // Update the whole watermark's size when the targetNode element's size changes
    const resizeCallback = debounce(() => {
      const { clientWidth, clientHeight } = targetNode
      updateWatermarkEl({ width: clientWidth, height: clientHeight })
    }, 500)
    // Create an observer instance and pass in the callback
    observer.parentElResizeObserver = new ResizeObserver(resizeCallback)
    // Start observing the target node
    observer.parentElResizeObserver.observe(targetNode)
  }

  // Remove the watermark and various listeners before the component unmounts
  onBeforeUnmount(() => {
    clearWatermark()
  })

  return { setWatermark, clearWatermark }
}
