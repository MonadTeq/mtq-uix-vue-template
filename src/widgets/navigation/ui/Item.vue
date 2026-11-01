<script lang="ts" setup>
import type { RouteRecordRaw } from "vue-router"
import { isExternal } from "@/shared/lib"
import path from "path-browserify"
import Link from "./Link.vue"

interface Props {
  item: RouteRecordRaw
  basePath?: string
}

const props = withDefaults(defineProps<Props>(), { basePath: "" })

const route = useRoute()

const alwaysShowRootMenu = computed(() => props.item.meta?.alwaysShow)

const showingChildren = computed(() => props.item.children?.filter(child => !child.meta?.hidden) ?? [])

const showingChildNumber = computed(() => showingChildren.value.length)

const theOnlyOneChild = computed(() => {
  switch (showingChildNumber.value) {
    case 1:
      return showingChildren.value[0]
    case 0:
      return { ...props.item, path: "" }
    default:
      return null
  }
})

function resolvePath(routePath: string) {
  if (isExternal(routePath)) return routePath
  if (isExternal(props.basePath)) return props.basePath
  return path.resolve(props.basePath, routePath)
}

const isLeaf = computed(() => !alwaysShowRootMenu.value && theOnlyOneChild.value && !theOnlyOneChild.value.children)

const leafPath = computed(() => resolvePath(theOnlyOneChild.value?.path ?? ""))

const parentPath = computed(() => resolvePath(props.item.path))

const currentPath = computed(() => (route.meta.activeMenu as string) || route.path)

const isActive = computed(() => (isLeaf.value ? currentPath.value === leafPath.value : currentPath.value.startsWith(`${parentPath.value}/`)))

const hasActiveChild = computed(() => currentPath.value.startsWith(`${parentPath.value}/`))

const open = ref(hasActiveChild.value)

function toggleOpen() {
  open.value = !open.value
}
</script>

<template>
  <li v-if="isLeaf && theOnlyOneChild && theOnlyOneChild.meta" class="menu-item" :class="{ 'menu-item--active': isActive }">
    <Link :to="leafPath" class="menu-item__link">
      <SvgIcon v-if="theOnlyOneChild.meta.svgIcon" :name="theOnlyOneChild.meta.svgIcon" class="menu-item__icon" />
      <span v-else-if="theOnlyOneChild.meta.title" class="menu-item__icon menu-item__icon--text">{{ theOnlyOneChild.meta.title.charAt(0) }}</span>
      <span v-if="theOnlyOneChild.meta.title" class="menu-item__title">{{ theOnlyOneChild.meta.title }}</span>
    </Link>
  </li>
  <li v-else class="menu-sub" :class="{ 'menu-sub--active': hasActiveChild, 'menu-sub--open': open }">
    <button class="menu-sub__title" :aria-expanded="open" @click="toggleOpen">
      <SvgIcon v-if="item.meta?.svgIcon" :name="item.meta.svgIcon" class="menu-item__icon" />
      <span v-else-if="item.meta?.title" class="menu-item__icon menu-item__icon--text">{{ item.meta.title.charAt(0) }}</span>
      <span v-if="item.meta?.title" class="menu-item__title">{{ item.meta.title }}</span>
      <span class="menu-sub__arrow" aria-hidden="true">▾</span>
    </button>
    <ul v-show="open" class="menu-sub__children">
      <Item
        v-for="child in showingChildren"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </ul>
  </li>
</template>

<style lang="scss" scoped>
@import "@/shared/styles/mixins.scss";

.menu-item,
.menu-sub {
  list-style: none;
}

.menu-item__link,
.menu-sub__title {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--mtq-uix-sidebar-menu-item-height);
  padding: 0 16px;
  color: var(--mtq-uix-sidebar-menu-text-color);
  text-decoration: none;
  cursor: pointer;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
}

.menu-item__link:hover,
.menu-sub__title:hover {
  background-color: var(--mtq-uix-sidebar-menu-hover-bg-color);
}

.menu-item--active > .menu-item__link {
  color: var(--mtq-uix-sidebar-menu-active-text-color);
}

.menu-sub--active > .menu-sub__title {
  color: var(--mtq-uix-sidebar-menu-active-text-color);
}

.menu-item__icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.menu-item__icon--text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 12px;
}

.menu-item__title {
  @extend %ellipsis;
  flex: 1;
  text-align: left;
}

.menu-sub__arrow {
  transition: transform 0.2s;
}

.menu-sub--open > .menu-sub__title .menu-sub__arrow {
  transform: rotate(180deg);
}

.menu-sub__children {
  margin: 0;
  padding: 0;
}
</style>
