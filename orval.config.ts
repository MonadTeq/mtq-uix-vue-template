import { defineConfig } from "orval"

export default defineConfig({
  users: {
    input: {
      target: "./specs/users.openapi.yaml"
    },
    output: {
      mode: "single",
      client: "axios",
      target: "./src/shared/api/generated/users.ts",
      schemas: "./src/shared/api/generated/users-model",
      override: {
        mutator: {
          path: "./src/shared/api/mutator.ts",
          name: "customMutator"
        }
      }
    }
  },
  tables: {
    input: {
      target: "./specs/tables.openapi.yaml"
    },
    output: {
      mode: "single",
      client: "axios",
      target: "./src/shared/api/generated/tables.ts",
      schemas: "./src/shared/api/generated/tables-model",
      override: {
        mutator: {
          path: "./src/shared/api/mutator.ts",
          name: "customMutator"
        }
      }
    }
  }
})
