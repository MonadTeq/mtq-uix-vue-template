/**
 * @description All examples in this file demonstrate the most basic usage of Vitest
 * @link https://cn.vitest.dev/api
 * @api describe: creates a scope
 * @api test/it: defines a set of methods about test expectations; it receives a test name and a function containing test expectations
 * @api expect: used to create assertions
 * @api toBe: can be used to assert that primitive types are equal, or that objects share the same reference
 * @api toEqual: asserts that the actual value equals the received value or has the same structure (if it's an object, compares them recursively)
 */

import { describe, expect, it } from "vitest"

const author1 = {
  name: "pany",
  email: "939630029@qq.com",
  url: "https://github.com/pany-ang"
}

const author2 = {
  name: "pany",
  email: "939630029@qq.com",
  url: "https://github.com/pany-ang"
}

describe("Fill in the scope name here", () => {
  it("Test primitive data types", () => {
    expect(1 + 1).toBe(2)
  })

  it("Test reference types", () => {
    expect(author1).toEqual(author2)
  })
})
