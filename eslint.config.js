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
    ignores: ["*/skills", "specs/**", "src/shared/api/generated/**"]
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
  },
  // FSD layer boundary enforcement (top → bottom: app > pages > widgets > features > entities > shared)
  {
    name: "fsd/shared",
    files: ["src/shared/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app/**", "@/pages/**", "@/widgets/**", "@/features/**", "@/entities/**"],
              message: "The shared layer must not import upper layers"
            }
          ]
        }
      ]
    }
  },
  {
    name: "fsd/entities",
    files: ["src/entities/**"],
    ignores: ["src/entities/user/**", "src/entities/permission/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/**", "@/widgets/**", "@/pages/**", "@/app/**"],
              message: "The entities layer must not import upper layers"
            }
          ]
        }
      ]
    }
  },
  {
    name: "fsd/entities-router-coupled",
    files: ["src/entities/permission/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/**", "@/widgets/**", "@/pages/**"],
              message: "The entities layer must not import upper layers"
            }
          ]
        }
      ]
    }
  },
  {
    name: "fsd/features",
    files: ["src/features/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/widgets/**", "@/pages/**", "@/app/**"],
              message: "The features layer must not import upper layers"
            }
          ]
        }
      ]
    }
  },
  {
    name: "fsd/widgets",
    files: ["src/widgets/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/pages/**", "@/app/**"],
              message: "The widgets layer must not import upper layers"
            }
          ]
        }
      ]
    }
  },
  {
    name: "fsd/pages",
    files: ["src/pages/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app/**"],
              message: "The pages layer must not import the app layer"
            }
          ]
        }
      ]
    }
  }
)
