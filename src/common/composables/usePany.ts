function initStarNotification() {
  setTimeout(() => {
    ElNotification({
      title: "Powered by love!",
      type: "success",
      message: h(
        "div",
        null,
        [
          h("div", null, "All source code is free and open source. If it helps you, please give it a Star!"),
          h("a", { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite" }, "Click to visit")
        ]
      ),
      duration: 0,
      position: "bottom-right"
    })
  }, 0)
}

function initStoreNotification() {
  setTimeout(() => {
    ElNotification({
      title: "Lazy service?",
      type: "warning",
      message: h(
        "div",
        null,
        [
          h("div", null, "Don't want to do it yourself but want to remove TS or other modules? There's a lazy package too!"),
          h("a", { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite/issues/225" }, "Click to get")
        ]
      ),
      duration: 0,
      position: "bottom-right"
    })
  }, 500)
}

function initMobileNotification() {
  setTimeout(() => {
    ElNotification({
      title: "Mobile",
      type: "primary",
      message: h(
        "div",
        null,
        [
          h("div", null, "If you have mobile H5 requirements, try the new open-source template MobVue"),
          h("a", { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/mobvue" }, "Click to view")
        ]
      ),
      duration: 0,
      position: "bottom-right"
    })
  }, 1000)
}

/** The author's little touch */
export function usePany() {
  return { initStarNotification, initStoreNotification, initMobileNotification }
}
