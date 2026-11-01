import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Button from "./Button.vue"

describe("button", () => {
  it("renders slot content and emits click", async () => {
    const wrapper = mount(Button, {
      props: { variant: "primary" },
      slots: { default: () => "Save" }
    })
    expect(wrapper.text()).toContain("Save")
    await wrapper.find("button").trigger("click")
    expect(wrapper.emitted("click")).toHaveLength(1)
  })

  it("maps the ghost variant to a ghost class", () => {
    const wrapper = mount(Button, { props: { variant: "ghost" } })
    expect(wrapper.classes()).toContain("button--ghost")
  })

  it("maps the danger variant to a danger class", () => {
    const wrapper = mount(Button, { props: { variant: "danger" } })
    expect(wrapper.classes()).toContain("button--danger")
  })
})
