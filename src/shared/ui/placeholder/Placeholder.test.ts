import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Placeholder from "./Placeholder.vue"

describe("placeholder", () => {
  it("renders with the presentation role and animated class", () => {
    const wrapper = mount(Placeholder)
    expect(wrapper.attributes("role")).toBe("presentation")
    expect(wrapper.classes()).toContain("placeholder--animated")
  })

  it("applies width and height styles", () => {
    const wrapper = mount(Placeholder, { props: { width: "50%", height: "2rem", animated: false } })
    expect(wrapper.attributes("style")).toContain("width: 50%")
    expect(wrapper.attributes("style")).toContain("height: 2rem")
    expect(wrapper.classes()).not.toContain("placeholder--animated")
  })
})
