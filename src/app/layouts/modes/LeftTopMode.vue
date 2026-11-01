<script lang="ts" setup>
import { useAppStore } from "@/entities/app-ui"
import { useSettingsStore } from "@/entities/settings"
import { AppMain } from "@/widgets/app-main"
import { Logo, NavigationBar, Sidebar } from "@/widgets/navigation"
import { TagsView } from "@/widgets/tag-bar"

const appStore = useAppStore()

const settingsStore = useSettingsStore()

const { showTagsView, showLogo } = storeToRefs(settingsStore)

/** Define the computed property layoutClasses to control the layout class names */
const layoutClasses = computed(() => {
  return {
    "hide-sidebar": !appStore.sidebar.opened
  }
})
</script>

<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- Header navigation bar and tags bar -->
    <div class="fixed-header layout-header">
      <Logo v-if="showLogo" :collapse="false" class="logo" />
      <div class="content">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
    </div>
    <!-- Main container -->
    <div :class="{ 'has-tags-view': showTagsView }" class="main-container">
      <!-- Left sidebar -->
      <Sidebar class="sidebar-container" />
      <!-- Main page content -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/shared/styles/mixins.scss";
$transition-time: 0.35s;

.app-wrapper {
  @extend %clearfix;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
  display: flex;
  .logo {
    flex: none;
    width: var(--mtq-uix-sidebar-width);
  }
  .content {
    flex: 1;
    overflow: hidden;
  }
}

.layout-header {
  background-color: var(--mtq-uix-header-bg-color);
  box-shadow: var(--mtq-uix-header-box-shadow);
  border-bottom: var(--mtq-uix-header-border-bottom);
}

.main-container {
  min-height: 100%;
}

.sidebar-container {
  background-color: var(--color-surface-default);
  transition: width $transition-time;
  width: var(--mtq-uix-sidebar-width);
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: var(--mtq-uix-sidebar-border-right);
  padding-top: var(--mtq-uix-navigationbar-height);
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--mtq-uix-navigationbar-height);
  padding-left: var(--mtq-uix-sidebar-width);
  height: 100vh;
  overflow: auto;
}

.hide-sidebar {
  .sidebar-container {
    width: var(--mtq-uix-sidebar-hide-width);
  }
  .app-main {
    padding-left: var(--mtq-uix-sidebar-hide-width);
  }
}

.has-tags-view {
  .sidebar-container {
    padding-top: var(--mtq-uix-header-height);
  }
  .app-main {
    padding-top: var(--mtq-uix-header-height);
  }
}
</style>
