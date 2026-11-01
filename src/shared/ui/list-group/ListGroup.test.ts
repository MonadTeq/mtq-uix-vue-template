import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import { ListGroup, ListGroupItem } from ".."

describe("list-group", () => {
  it("renders a list container", () => {
    const wrapper = mount(ListGroup, { slots: { default: () => "content" } })
    expect(wrapper.find("ul").classes()).toContain("list-group")
    expect(wrapper.find("ul").attributes("role")).toBe("list")
  })

  it("marks an item active", () => {
    const wrapper = mount(ListGroupItem, { props: { active: true }, slots: { default: () => "Item" } })
    expect(wrapper.classes()).toContain("list-group-item--active")
    expect(wrapper.text()).toBe("Item")
  })

  it("marks an item disabled", () => {
    const wrapper = mount(ListGroupItem, { props: { disabled: true }, slots: { default: () => "Item" } })
    expect(wrapper.classes()).toContain("list-group-item--disabled")
  })
})
