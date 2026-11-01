<script lang="ts" setup>
import type { RouteRecordNameGeneric, RouteRecordRaw } from "vue-router"
import { isExternal, message, useDevice } from "@/shared/lib"
import { cloneDeep, debounce } from "lodash-es"
import { usePermissionStore } from "@/entities/permission"
import Footer from "./Footer.vue"
import Result from "./Result.vue"

/** Control the modal's visibility */
const modelValue = defineModel<boolean>({ required: true })

const router = useRouter()

const { isMobile } = useDevice()

const inputRef = useTemplateRef("inputRef")

const scrollbarRef = useTemplateRef("scrollbarRef")

const resultRef = useTemplateRef("resultRef")

const keyword = ref<string>("")

const result = shallowRef<RouteRecordRaw[]>([])

const activeRouteName = ref<RouteRecordNameGeneric | undefined>(undefined)

/** Whether the up or down key is pressed (used to resolve conflicts with the mouseenter event) */
const isPressUpOrDown = ref<boolean>(false)

/** Control the search dialog width */
const modalWidth = computed(() => (isMobile.value ? "80vw" : "40vw"))

/** Tree menus */
const menus = computed(() => cloneDeep(usePermissionStore().routes))

/** Search (debounced) */
const handleSearch = debounce(() => {
  const flatMenus = flatTree(menus.value)
  const _keywords = keyword.value.toLocaleLowerCase().trim()
  result.value = flatMenus.filter(menu => keyword.value ? menu.meta?.title?.toLocaleLowerCase().includes(_keywords) : false)
  const length = result.value?.length
  activeRouteName.value = length > 0 ? result.value[0].name : undefined
}, 500)

/** Flatten the tree menus into a one-dimensional array for menu search */
function flatTree(arr: RouteRecordRaw[], result: RouteRecordRaw[] = []) {
  arr.forEach((item) => {
    result.push(item)
    item.children && flatTree(item.children, result)
  })
  return result
}

/** Close the search dialog */
function handleClose() {
  modelValue.value = false
  setTimeout(() => {
    keyword.value = ""
    result.value = []
  }, 200)
}

/** Scroll based on the index position */
function scrollTo(index: number) {
  if (!resultRef.value || !scrollbarRef.value) return
  const scrollTop = resultRef.value.getScrollTop(index)
  scrollbarRef.value.scrollTop = scrollTop
}

/** Keyboard up key */
function handleUp() {
  isPressUpOrDown.value = true
  const { length } = result.value
  if (length === 0) return
  const index = result.value.findIndex(item => item.name === activeRouteName.value)
  if (index === 0) {
    const bottomName = result.value[length - 1].name
    if (activeRouteName.value === bottomName && length > 1) {
      activeRouteName.value = result.value[length - 2].name
      scrollTo(length - 2)
    } else {
      activeRouteName.value = bottomName
      scrollTo(length - 1)
    }
  } else {
    activeRouteName.value = result.value[index - 1].name
    scrollTo(index - 1)
  }
}

/** Keyboard down key */
function handleDown() {
  isPressUpOrDown.value = true
  const { length } = result.value
  if (length === 0) return
  const index = result.value.map(item => item.name).lastIndexOf(activeRouteName.value)
  if (index === length - 1) {
    const topName = result.value[0].name
    if (activeRouteName.value === topName && length > 1) {
      activeRouteName.value = result.value[1].name
      scrollTo(1)
    } else {
      activeRouteName.value = topName
      scrollTo(0)
    }
  } else {
    activeRouteName.value = result.value[index + 1].name
    scrollTo(index + 1)
  }
}

/** Keyboard enter key */
function handleEnter() {
  const { length } = result.value
  if (length === 0) return
  const name = activeRouteName.value
  const path = result.value.find(item => item.name === name)?.path
  if (path && isExternal(path)) return window.open(path, "_blank", "noopener, noreferrer")
  if (!name) return message.warning("Cannot enter this menu via search; please set a unique Name for the corresponding route")
  try {
    router.push({ name })
  } catch {
    return message.warning("This menu has required dynamic parameters and cannot be entered via search")
  }
  handleClose()
}

/** Release the up or down key */
function handleReleaseUpOrDown() {
  isPressUpOrDown.value = false
}

watch(modelValue, (value) => {
  if (value) nextTick(() => inputRef.value?.focus())
})
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="search-overlay" @click.self="handleClose">
      <div
        class="search-modal"
        :style="{ width: modalWidth }"
        @keydown.up="handleUp"
        @keydown.down="handleDown"
        @keydown.enter="handleEnter"
        @keydown.esc="handleClose"
        @keyup.up.down="handleReleaseUpOrDown"
      >
        <div class="search-input">
          <SvgIcon name="search" class="svg-icon" />
          <input ref="inputRef" v-model="keyword" placeholder="Search menus" class="search-field" @input="handleSearch">
        </div>
        <div v-if="result.length === 0" class="search-empty">No search results</div>
        <template v-else>
          <p>Search results</p>
          <div ref="scrollbarRef" class="search-results">
            <Result
              ref="resultRef"
              v-model="activeRouteName"
              :data="result"
              :is-press-up-or-down="isPressUpOrDown"
              @click="handleEnter"
            />
          </div>
        </template>
        <div class="search-footer">
          <Footer :total="result.length" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5vh;
  background-color: rgba(0, 0, 0, 0.4);
}

.search-modal {
  background-color: var(--color-surface-default);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.search-input {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-3);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  .svg-icon {
    font-size: 18px;
    color: var(--color-text-secondary);
  }
  .search-field {
    flex: 1;
    padding: 10px 0;
    border: none;
    background: transparent;
    color: var(--color-text-primary);
    font-size: var(--font-size-md);
    &:focus {
      outline: none;
    }
  }
}

.search-empty {
  padding: 60px 0;
  text-align: center;
  color: var(--color-text-secondary);
}

.search-results {
  max-height: 40vh;
  overflow-y: auto;
}

.search-footer {
  border-top: 1px solid var(--color-border-default);
  padding-top: var(--space-3);
  margin-top: var(--space-3);
}
</style>
