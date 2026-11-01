<script lang="ts" setup>
import Notify from "@/features/notifications"
import Screenfull from "@/shared/ui/screenfull"
import SearchMenu from "@/features/search"
import ThemeSwitch from "@/features/theme"
import { useDevice } from "@/shared/lib"
import { useLayoutMode } from "@/features/layout-mode"
import { Dropdown } from "@/shared/ui"
import { useAppStore } from "@/entities/app-ui"
import { useSettingsStore } from "@/entities/settings"
import { useUserStore } from "@/entities/user"
import Hamburger from "@/shared/ui/hamburger"
import Breadcrumb from "./Breadcrumb.vue"
import Sidebar from "./Sidebar.vue"

const { isMobile } = useDevice()

const { isTop } = useLayoutMode()

const appStore = useAppStore()

const userStore = useUserStore()

const settingsStore = useSettingsStore()

const { showNotify, showThemeSwitch, showScreenfull, showSearchMenu } = storeToRefs(settingsStore)

const userMenuItems = [
  { label: "GitHub" },
  { label: "Gitee" },
  { label: "AtomGit" },
  { label: "Log out", divided: true }
]

const USER_LINKS = [
  "https://github.com/un-pany/v3-admin-vite",
  "https://gitee.com/un-pany/v3-admin-vite",
  "https://atomgit.com/un-pany/v3-admin-vite"
]

function onUserSelect(_item: { label: string }, index: number) {
  if (index < USER_LINKS.length) {
    window.open(USER_LINKS[index], "_blank", "noopener,noreferrer")
  } else {
    userStore.logout()
  }
}

/** Toggle the sidebar */
function toggleSidebar() {
  appStore.toggleSidebar(false)
}
</script>

<template>
  <div class="navigation-bar">
    <Hamburger
      v-if="!isTop || isMobile"
      :is-active="appStore.sidebar.opened"
      class="hamburger"
      @toggle-click="toggleSidebar"
    />
    <Breadcrumb v-if="!isTop || isMobile" class="breadcrumb" />
    <Sidebar v-if="isTop && !isMobile" class="sidebar" />
    <div class="right-menu">
      <SearchMenu v-if="showSearchMenu" class="right-menu-item" />
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <Notify v-if="showNotify" class="right-menu-item" />
      <Dropdown :items="userMenuItems" @select="onUserSelect">
        <div class="right-menu-item user">
          <span class="avatar">{{ userStore.username.charAt(0) }}</span>
          <span>{{ userStore.username }}</span>
        </div>
      </Dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--mtq-uix-navigationbar-height);
  overflow: hidden;
  color: var(--mtq-uix-navigationbar-text-color);
  display: flex;
  justify-content: space-between;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    flex: 1;
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .sidebar {
    flex: 1;
    min-width: 0px;
  }
  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    &-item {
      height: 20px;
      margin: 0 10px;
      cursor: pointer;
      &:last-child {
        margin-left: 20px;
      }
    }
    .user {
      display: flex;
      align-items: center;
      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: var(--color-action-primary);
        color: var(--white);
        font-size: 14px;
      }
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
