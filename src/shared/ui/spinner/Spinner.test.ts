import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Spinner from "./Spinner.vue"

describe("spinner", () => {
  it("renders with the status role and border variant", () => {
    const wrapper = mount(Spinner)
    expect(wrapper.attributes("role")).toBe("status")
    expect(wrapper.classes()).toContain("spinner--border")
    expect(wrapper.classes()).toContain("spinner--md")
  })

  it("applies the grow variant and size classes", () => {
    const wrapper = mount(Spinner, { props: { variant: "grow", size: "lg" } })
    expect(wrapper.classes()).toContain("spinner--grow")
    expect(wrapper.classes()).toContain("spinner--lg")
  })
})
