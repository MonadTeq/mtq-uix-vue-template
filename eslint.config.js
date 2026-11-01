import antfu from "@antfu/eslint-config"

// For more custom configuration, see the repository: https://github.com/antfu/eslint-config
export default antfu(
  {
    // Use external formatters to format css, html, markdown and other files
    formatters: true,
    // Enable style rules
    stylistic: {
      // Indent level
      indent: 2,
      // Quote style 'single' | 'double'
      quotes: "double",
      // Whether to enable semicolons
      semi: false
    },
    // Files to ignore
    ignores: ["*/skills"]
  },
  {
    // Rules that apply to all files
    rules: {
      // vue
      "vue/block-order": ["error", { order: ["script", "template", "style"] }],
      "vue/attributes-order": "off",
      // ts
      "ts/no-use-before-define": "off",
      // node
      "node/prefer-global/process": "off",
      // style
      "style/comma-dangle": ["error", "never"],
      "style/brace-style": ["error", "1tbs"],
      // regexp
      "regexp/no-unused-capturing-group": "off",
      // other
      "no-console": "off",
      "no-debugger": "off",
      "symbol-description": "off",
      "antfu/if-newline": "off",
      "unicorn/no-instanceof-builtins": "off"
    }
  }
)
