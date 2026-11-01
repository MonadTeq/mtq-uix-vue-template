<script lang="ts" setup>
import { useDevice } from "@/shared/lib"
import { useLayoutMode } from "@/features/layout-mode"
import { useAppStore } from "@/entities/app-ui"
import { usePermissionStore } from "@/entities/permission"
import { useSettingsStore } from "@/entities/settings"
import Logo from "./Logo.vue"
import Item from "./Item.vue"

const { isMobile } = useDevice()

const { isLeft, isTop } = useLayoutMode()

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const settingsStore = useSettingsStore()

const noHiddenRoutes = computed(() => permissionStore.routes.filter(item => !item.meta?.hidden))

const isCollapse = computed(() => !appStore.sidebar.opened)

const isLogo = computed(() => isLeft.value && settingsStore.showLogo)
</script>

<template>
  <div
    class="sidebar"
    :class="{ 'has-logo': isLogo, 'is-collapse': isCollapse, 'is-horizontal': isTop && !isMobile }"
  >
    <Logo v-if="isLogo" :collapse="isCollapse" />
    <div class="sidebar__scroll">
      <ul class="sidebar__menu">
        <Item
          v-for="noHiddenRoute in noHiddenRoutes"
          :key="noHiddenRoute.path"
          :item="noHiddenRoute"
          :base-path="noHiddenRoute.path"
        />
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
}

.has-logo .sidebar__scroll {
  height: calc(100% - var(--mtq-uix-header-height));
}

.sidebar__scroll {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar__menu {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Horizontal (top) mode */
.sidebar.is-horizontal .sidebar__scroll {
  height: var(--mtq-uix-navigationbar-height);
  overflow: visible;
}

.sidebar.is-horizontal .sidebar__menu {
  display: flex;
  align-items: center;
  height: 100%;
}

.sidebar.is-horizontal :deep(.menu-item),
.sidebar.is-horizontal :deep(.menu-sub) {
  position: relative;
}

.sidebar.is-horizontal :deep(.menu-item__link),
.sidebar.is-horizontal :deep(.menu-sub__title) {
  height: var(--mtq-uix-navigationbar-height);
  padding: 0 12px;
}

.sidebar.is-horizontal :deep(.menu-sub__children) {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  background-color: var(--mtq-uix-sidebar-menu-bg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.sidebar.is-horizontal :deep(.menu-sub__arrow) {
  display: none;
}

/* Collapse (icon-only) mode */
.sidebar.is-collapse :deep(.menu-item__title) {
  display: none;
}

.sidebar.is-collapse :deep(.menu-item__link),
.sidebar.is-collapse :deep(.menu-sub__title) {
  justify-content: center;
  padding: 0;
}

.sidebar.is-collapse :deep(.menu-item__icon) {
  margin-right: 0;
}

.sidebar.is-collapse :deep(.menu-sub__arrow) {
  display: none;
}

.sidebar.is-collapse :deep(.menu-sub__children) {
  position: absolute;
  left: 100%;
  top: 0;
  min-width: 160px;
  background-color: var(--mtq-uix-sidebar-menu-bg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.sidebar.is-collapse :deep(.menu-sub) {
  position: relative;
}

.sidebar.is-collapse :deep(.menu-sub:hover > .menu-sub__children) {
  display: block;
}
</style>
