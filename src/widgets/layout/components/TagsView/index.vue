<script lang="ts" setup>
import type { RouteLocationNormalizedGeneric, RouteRecordRaw, RouterLink } from "vue-router"
import type { TagView } from "@/shared/types/tag-view"
import { useRouteListener } from "@/shared/lib/use-route-listener"
import { Close } from "@element-plus/icons-vue"
import path from "path-browserify"
import { usePermissionStore } from "@/entities/permission"
import { useTagsViewStore } from "@/entities/tags-view"
import { DASHBOARD_PATH, REDIRECT_PATH } from "@/shared/constants/paths"
import ScrollPane from "./ScrollPane.vue"

const router = useRouter()

const route = useRoute()

const tagsViewStore = useTagsViewStore()

const permissionStore = usePermissionStore()

const { listenerRouteChange } = useRouteListener()

/** Array of references to tag page component elements */
const tagRefs = useTemplateRef<InstanceType<typeof RouterLink>[]>("tagRefs")

/** Right-click menu state */
const visible = ref(false)

/** Top position of the right-click menu */
const top = ref(0)

/** Left position of the right-click menu */
const left = ref(0)

/** The tag page currently being right-clicked */
const selectedTag = ref<TagView>({})

/** Affixed tag pages */
let affixTags: TagView[] = []

/** Determine whether a tag page is active */
function isActive(tag: TagView) {
  return tag.path === route.path
}

/** Determine whether a tag page is affixed */
function isAffix(tag: TagView) {
  return tag.meta?.affix
}

/** Filter out the affixed tag pages */
function filterAffixTags(routes: RouteRecordRaw[], basePath = "/") {
  const tags: TagView[] = []
  routes.forEach((route) => {
    if (isAffix(route)) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      tags.push(...childTags)
    }
  })
  return tags
}

/** Initialize the tag pages */
function initTags() {
  affixTags = filterAffixTags(permissionStore.routes)
  for (const tag of affixTags) {
    // Must have a name property
    tag.name && tagsViewStore.addVisitedView(tag)
  }
}

/** Add a tag page */
function addTags(route: RouteLocationNormalizedGeneric) {
  if (route.name) {
    tagsViewStore.addVisitedView(route)
    tagsViewStore.addCachedView(route)
  }
}

/** Refresh the tag page currently being right-clicked */
function refreshSelectedTag(view: TagView) {
  tagsViewStore.delCachedView(view)
  router.replace({ path: `${REDIRECT_PATH}${view.path}`, query: view.query })
}

/** Close the tag page currently being right-clicked */
function closeSelectedTag(view: TagView) {
  tagsViewStore.delVisitedView(view)
  tagsViewStore.delCachedView(view)
  isActive(view) && toLastView(tagsViewStore.visitedViews, view)
}

/** Close other tag pages */
function closeOthersTags() {
  const fullPath = selectedTag.value.fullPath
  if (fullPath !== route.path && fullPath !== undefined) {
    router.push(fullPath)
  }
  tagsViewStore.delOthersVisitedViews(selectedTag.value)
  tagsViewStore.delOthersCachedViews(selectedTag.value)
}

/** Close all tag pages */
function closeAllTags(view: TagView) {
  tagsViewStore.delAllVisitedViews()
  tagsViewStore.delAllCachedViews()
  if (affixTags.some(tag => tag.path === route.path)) return
  toLastView(tagsViewStore.visitedViews, view)
}

/** Jump to the last tag page */
function toLastView(visitedViews: TagView[], view: TagView) {
  const latestView = visitedViews.slice(-1)[0]
  const fullPath = latestView?.fullPath
  if (fullPath !== undefined) {
    router.push(fullPath)
  } else {
    // If all TagsView are closed, redirect to the home page by default
    if (view.path === DASHBOARD_PATH) {
      // Reload the home page
      router.push({ path: `${REDIRECT_PATH}${view.path}`, query: view.query })
    } else {
      router.push("/")
    }
  }
}

/** Open the right-click menu panel */
function openMenu(tag: TagView, e: MouseEvent) {
  const menuMinWidth = 100
  // Current page width
  const offsetWidth = document.body.offsetWidth
  // Maximum left margin of the panel
  const maxLeft = offsetWidth - menuMinWidth
  // Distance of the panel from the mouse pointer
  const left15 = e.clientX + 10
  left.value = left15 > maxLeft ? maxLeft : left15
  top.value = e.clientY
  // Show the panel
  visible.value = true
  // Update the tag page currently being right-clicked
  selectedTag.value = tag
}

/** Close the right-click menu panel */
function closeMenu() {
  visible.value = false
}

watch(visible, (value) => {
  value ? document.body.addEventListener("click", closeMenu) : document.body.removeEventListener("click", closeMenu)
})

initTags()

// Listen to route changes
listenerRouteChange((route) => {
  addTags(route)
}, true)
</script>

<template>
  <div class="tags-view-container">
    <ScrollPane class="tags-view-wrapper" :tag-refs="tagRefs">
      <router-link
        v-for="tag in tagsViewStore.visitedViews"
        :key="tag.path"
        ref="tagRefs"
        :class="{ active: isActive(tag) }"
        class="tags-view-item"
        draggable="false"
        :to="{ path: tag.path, query: tag.query }"
        @click.middle="!isAffix(tag) && closeSelectedTag(tag)"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.meta?.title }}
        <el-icon v-if="!isAffix(tag)" :size="12" @click.prevent.stop="closeSelectedTag(tag)">
          <Close />
        </el-icon>
      </router-link>
    </ScrollPane>
    <ul v-show="visible" class="contextmenu" :style="{ left: `${left}px`, top: `${top}px` }">
      <li @click="refreshSelectedTag(selectedTag)">
        Refresh
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        Close
      </li>
      <li @click="closeOthersTags">
        Close others
      </li>
      <li @click="closeAllTags(selectedTag)">
        Close all
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: var(--v3-tagsview-height);
  width: 100%;
  color: var(--v3-tagsview-text-color);
  overflow: hidden;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      height: 26px;
      border: 1px solid var(--v3-tagsview-tag-border-color);
      border-radius: var(--v3-tagsview-tag-border-radius);
      background-color: var(--v3-tagsview-tag-bg-color);
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      &:first-of-type {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 5px;
      }
      &.active {
        background-color: var(--v3-tagsview-tag-active-bg-color);
        color: var(--v3-tagsview-tag-active-text-color);
        border-color: var(--v3-tagsview-tag-active-border-color);
      }
      .el-icon {
        margin-left: 5px;
        margin-right: 1px;
        border-radius: 50%;
        &:hover {
          background-color: var(--v3-tagsview-tag-icon-hover-bg-color);
          color: var(--v3-tagsview-tag-icon-hover-color);
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    z-index: 3000;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    color: var(--v3-tagsview-contextmenu-text-color);
    background-color: var(--v3-tagsview-contextmenu-bg-color);
    box-shadow: var(--v3-tagsview-contextmenu-box-shadow);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        color: var(--v3-tagsview-contextmenu-hover-text-color);
        background-color: var(--v3-tagsview-contextmenu-hover-bg-color);
      }
    }
  }
}
</style>
