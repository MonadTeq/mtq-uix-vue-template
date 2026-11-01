import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Button from "./Button.vue"

describe("button", () => {
  it("renders slot content and emits click", async () => {
    const wrapper = mount(Button, {
      props: { variant: "primary" },
      slots: { default: () => "Save" },
      global: { stubs: { "el-button": { template: "<button><slot /></button>" } } }
    })
    expect(wrapper.text()).toContain("Save")
    await wrapper.find("button").trigger("click")
    expect(wrapper.emitted("click")).toHaveLength(1)
  })

  it("maps the ghost variant to a text button", () => {
    const wrapper = mount(Button, {
      props: { variant: "ghost" },
      global: { stubs: { "el-button": true } }
    })
    const btn = wrapper.findComponent({ name: "el-button" })
    expect(btn.props("text")).toBe(true)
  })

  it("maps the danger variant to a danger type", () => {
    const wrapper = mount(Button, {
      props: { variant: "danger" },
      global: { stubs: { "el-button": true } }
    })
    const btn = wrapper.findComponent({ name: "el-button" })
    expect(btn.props("type")).toBe("danger")
  })
})
