import { reactive } from "vue"

export type FeedbackType = "success" | "error" | "warning" | "info"

export interface MessageItem {
  id: number
  type: FeedbackType
  text: string
}

export interface NotificationItem {
  id: number
  type: FeedbackType
  title: string
  message: string
}

export interface ConfirmOptions {
  title: string
  message: string
  confirmText: string
  cancelText: string
}

interface FeedbackState {
  messages: MessageItem[]
  notifications: NotificationItem[]
  confirmVisible: boolean
  confirmOptions: ConfirmOptions
  confirmResolver: ((value: boolean) => void) | null
  loadingVisible: boolean
  loadingText: string
}

const state = reactive<FeedbackState>({
  messages: [],
  notifications: [],
  confirmVisible: false,
  confirmOptions: { title: "", message: "", confirmText: "Confirm", cancelText: "Cancel" },
  confirmResolver: null,
  loadingVisible: false,
  loadingText: ""
})

let seed = 0

function dismissMessage(id: number) {
  const index = state.messages.findIndex(item => item.id === id)
  if (index >= 0) state.messages.splice(index, 1)
}

function dismissNotification(id: number) {
  const index = state.notifications.findIndex(item => item.id === id)
  if (index >= 0) state.notifications.splice(index, 1)
}

function pushMessage(type: FeedbackType, text: string) {
  const item = { id: ++seed, type, text }
  state.messages.push(item)
  setTimeout(() => dismissMessage(item.id), 3000)
}

/** Toast-style message API (replaces ElMessage). */
export const message = {
  success: (text: string) => pushMessage("success", text),
  error: (text: string) => pushMessage("error", text),
  warning: (text: string) => pushMessage("warning", text),
  info: (text: string) => pushMessage("info", text)
}

/** Notification API (replaces ElNotification). */
export function notification(options: { title: string; message?: string; type?: FeedbackType; duration?: number }) {
  const item: NotificationItem = {
    id: ++seed,
    type: options.type ?? "info",
    title: options.title,
    message: options.message ?? ""
  }
  state.notifications.push(item)
  const duration = options.duration ?? 4000
  if (duration > 0) setTimeout(() => dismissNotification(item.id), duration)
}

/** Promise-based confirm dialog (replaces ElMessageBox.confirm). */
export function confirm(options: { title?: string; message: string; confirmText?: string; cancelText?: string }): Promise<boolean> {
  state.confirmOptions = {
    title: options.title ?? "Prompt",
    message: options.message,
    confirmText: options.confirmText ?? "Confirm",
    cancelText: options.cancelText ?? "Cancel"
  }
  state.confirmVisible = true
  return new Promise(resolve => {
    state.confirmResolver = resolve
  })
}

export function resolveConfirm(value: boolean) {
  state.confirmVisible = false
  state.confirmResolver?.(value)
  state.confirmResolver = null
}

/** Fullscreen loading API (replaces ElLoading.service). */
export const loading = {
  service(options?: { text?: string }) {
    state.loadingText = options?.text ?? "Loading..."
    state.loadingVisible = true
    return {
      close: () => {
        state.loadingVisible = false
      }
    }
  }
}

export function useFeedbackState() {
  return state
}
