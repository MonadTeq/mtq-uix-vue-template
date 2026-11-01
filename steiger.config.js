import { defineConfig } from "steiger"
import fsd from "@feature-sliced/steiger-plugin"

export default defineConfig([
  ...fsd.configs.recommended,
  {
    ignores: ["src/shared/api/generated/**"]
  },
  {
    files: ["./src/**"],
    rules: {
      // Opinionated rules outside the required FSD enforcement scope.
      // Kept off: slices may be flat (single-file stores) or reference-based,
      // and segment names follow common FSD conventions.
      "fsd/insignificant-slice": "off",
      "fsd/no-segmentless-slices": "off",
      "fsd/segments-by-purpose": "off"
    }
  },
  {
    files: ["./src/shared/assets/**", "./src/shared/styles/**"],
    rules: {
      // Assets and style mixins are resources, not importable code modules.
      "fsd/public-api": "off"
    }
  }
])
