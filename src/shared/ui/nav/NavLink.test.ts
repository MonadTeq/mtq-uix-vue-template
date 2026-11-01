import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import NavLink from "./NavLink.vue"

describe("nav-link", () => {
  it("renders an anchor with aria-current when active", () => {
    const wrapper = mount(NavLink, { props: { href: "/home", active: true }, slots: { default: () => "Home" } })
    expect(wrapper.attributes("aria-current")).toBe("page")
    expect(wrapper.classes()).toContain("nav-link--active")
  })

  it("sets aria-disabled and prevents click when disabled", async () => {
    const wrapper = mount(NavLink, { props: { disabled: true }, slots: { default: () => "Disabled" } })
    expect(wrapper.attributes("aria-disabled")).toBe("true")
    await wrapper.trigger("click")
    expect(wrapper.emitted("click")).toBeUndefined()
  })
})
