<script lang="ts" setup>
import { useDevice } from "@@/composables/useDevice"
import { useLayoutMode } from "@@/composables/useLayoutMode"
import { useAppStore } from "@/pinia/stores/app"
import { useSettingsStore } from "@/pinia/stores/settings"
import { AppMain, NavigationBar, Sidebar, TagsView } from "../components"

const { isMobile } = useDevice()

const { isLeft } = useLayoutMode()

const appStore = useAppStore()

const settingsStore = useSettingsStore()

const { showTagsView, fixedHeader } = storeToRefs(settingsStore)

/** Define the computed property layoutClasses to control the layout class names */
const layoutClasses = computed(() => {
  return {
    "hide-sidebar": !appStore.sidebar.opened,
    "open-sidebar": appStore.sidebar.opened,
    "without-animation": appStore.sidebar.withoutAnimation,
    "mobile": isMobile.value,
    "no-left": !isLeft.value
  }
})

/** Handle the event of clicking the mobile sidebar overlay */
function handleClickOutside() {
  appStore.closeSidebar(false)
}
</script>

<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- Mobile sidebar overlay -->
    <div v-if="layoutClasses.mobile && layoutClasses['open-sidebar']" class="drawer-bg" @click="handleClickOutside" />
    <!-- Left sidebar -->
    <Sidebar class="sidebar-container" />
    <!-- Main container -->
    <div :class="{ 'has-tags-view': showTagsView }" class="main-container">
      <!-- Header navigation bar and tags bar -->
      <div :class="{ 'fixed-header': fixedHeader }" class="layout-header">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
      <!-- Main page content -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@@/assets/styles/mixins.scss";
$transition-time: 0.35s;

.app-wrapper {
  @extend %clearfix;
  position: relative;
  width: 100%;
}

.drawer-bg {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 2001;
}

.sidebar-container {
  background-color: var(--v3-sidebar-menu-bg-color);
  transition: width $transition-time;
  width: var(--v3-sidebar-width);
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2002;
  overflow: hidden;
  border-right: var(--v3-sidebar-border-right);
}

.main-container {
  min-height: 100%;
  transition: margin-left $transition-time;
  margin-left: var(--v3-sidebar-width);
  position: relative;
}

.fixed-header {
  position: fixed !important;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--v3-sidebar-width));
  transition: width $transition-time;
}

.layout-header {
  position: relative;
  z-index: 9;
  background-color: var(--v3-header-bg-color);
  box-shadow: var(--v3-header-box-shadow);
  border-bottom: var(--v3-header-border-bottom);
}

.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.has-tags-view {
  .app-main {
    min-height: calc(100vh - var(--v3-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}

.hide-sidebar {
  .sidebar-container {
    width: var(--v3-sidebar-hide-width);
  }
  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }
  .fixed-header {
    width: calc(100% - var(--v3-sidebar-hide-width));
  }
}

// Adapt to mobile
.mobile {
  .sidebar-container {
    transition: transform $transition-time;
    width: var(--v3-sidebar-width);
  }
  .main-container {
    margin-left: 0px;
  }
  .fixed-header {
    width: 100%;
  }
  &.open-sidebar {
    position: fixed;
    top: 0;
  }
  &.hide-sidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - var(--v3-sidebar-width)), 0, 0);
    }
  }
  // Both mobile and top or hybrid layout mode
  &.no-left {
    .sidebar-container {
      background-color: var(--el-bg-color);
    }
  }
}

.without-animation {
  .sidebar-container,
  .main-container {
    transition: none;
  }
}
</style>
