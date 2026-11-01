import type { Directive } from "vue"

export {}

// Custom directives registered globally via app.directive need their TS types declared here to get type hints
declare module "vue" {
  export interface ComponentCustomProperties {
    vPermission: Directive<Element, string[]>
  }
}
