<script lang="ts" setup>
import type { RouteRecordNameGeneric, RouteRecordRaw } from "vue-router"
import { useDevice } from "@@/composables/useDevice"
import { isExternal } from "@@/utils/validate"
import { cloneDeep, debounce } from "lodash-es"
import { usePermissionStore } from "@/pinia/stores/permission"
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
  // Select the first search result by default
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
  // Delay processing to prevent the user from seeing the data reset
  setTimeout(() => {
    keyword.value = ""
    result.value = []
  }, 200)
}

/** Scroll based on the index position */
function scrollTo(index: number) {
  if (!resultRef.value) return
  const scrollTop = resultRef.value.getScrollTop(index)
  // Manually control the el-scrollbar scrolling and set the distance of the scrollbar to the top
  scrollbarRef.value?.setScrollTop(scrollTop)
}

/** Keyboard up key */
function handleUp() {
  isPressUpOrDown.value = true
  const { length } = result.value
  if (length === 0) return
  // Get the position where this name first appears in the menus
  const index = result.value.findIndex(item => item.name === activeRouteName.value)
  // If already at the top
  if (index === 0) {
    const bottomName = result.value[length - 1].name
    // If the top and bottom bottomName are the same and the length is greater than 1, jump one more position (resolves the issue where the up key fails when the first and last names are the same)
    if (activeRouteName.value === bottomName && length > 1) {
      activeRouteName.value = result.value[length - 2].name
      scrollTo(length - 2)
    } else {
      // Jump to the bottom
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
  // Get the position where this name last appears in the menus (resolves the issue where the down key fails when two consecutive names are the same)
  const index = result.value.map(item => item.name).lastIndexOf(activeRouteName.value)
  // If already at the bottom
  if (index === length - 1) {
    const topName = result.value[0].name
    // If the bottom and top topName are the same and the length is greater than 1, jump one more position (resolves the issue where the down key fails when the first and last names are the same)
    if (activeRouteName.value === topName && length > 1) {
      activeRouteName.value = result.value[1].name
      scrollTo(1)
    } else {
      // Jump to the top
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
  if (!name) return ElMessage.warning("Cannot enter this menu via search; please set a unique Name for the corresponding route")
  try {
    router.push({ name })
  } catch {
    return ElMessage.warning("This menu has required dynamic parameters and cannot be entered via search")
  }
  handleClose()
}

/** Release the up or down key */
function handleReleaseUpOrDown() {
  isPressUpOrDown.value = false
}
</script>

<template>
  <el-dialog
    v-model="modelValue"
    :before-close="handleClose"
    :width="modalWidth"
    top="5vh"
    class="search-modal-private"
    append-to-body
    @opened="inputRef?.focus()"
    @closed="inputRef?.blur()"
    @keydown.up="handleUp"
    @keydown.down="handleDown"
    @keydown.enter="handleEnter"
    @keyup.up.down="handleReleaseUpOrDown"
  >
    <el-input ref="inputRef" v-model="keyword" placeholder="Search menus" size="large" clearable @input="handleSearch">
      <template #prefix>
        <SvgIcon name="search" class="svg-icon" />
      </template>
    </el-input>
    <el-empty v-if="result.length === 0" description="No search results" :image-size="100" />
    <template v-else>
      <p>Search results</p>
      <el-scrollbar ref="scrollbarRef" max-height="40vh" always>
        <Result
          ref="resultRef"
          v-model="activeRouteName"
          :data="result"
          :is-press-up-or-down="isPressUpOrDown"
          @click="handleEnter"
        />
      </el-scrollbar>
    </template>
    <template #footer>
      <Footer :total="result.length" />
    </template>
  </el-dialog>
</template>

<style lang="scss">
.search-modal-private {
  .svg-icon {
    font-size: 18px;
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__footer {
    border-top: 1px solid var(--el-border-color);
    padding-top: var(--el-dialog-padding-primary);
  }
}
</style>
