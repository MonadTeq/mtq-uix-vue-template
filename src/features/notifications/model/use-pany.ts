import { notification } from "@/shared/lib"

function initStarNotification() {
  setTimeout(() => {
    notification({
      title: "Powered by love!",
      type: "success",
      message: "All source code is free and open source. If it helps you, please give it a Star!",
      duration: 5000
    })
  }, 0)
}

function initStoreNotification() {
  setTimeout(() => {
    notification({
      title: "Lazy service?",
      type: "warning",
      message: "Don't want to do it yourself but want to remove TS or other modules? There's a lazy package too!",
      duration: 5000
    })
  }, 500)
}

function initMobileNotification() {
  setTimeout(() => {
    notification({
      title: "Mobile",
      type: "info",
      message: "If you have mobile H5 requirements, try the new open-source template MobVue",
      duration: 5000
    })
  }, 1000)
}

/** The author's little touch */
export function usePany() {
  return { initStarNotification, initStoreNotification, initMobileNotification }
}
