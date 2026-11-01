<script lang="ts" setup>
import { useGreyAndColorWeakness } from "@@/composables/useGreyAndColorWeakness"
import { usePany } from "@@/composables/usePany"
import { useTheme } from "@@/composables/useTheme"
import zhCn from "element-plus/es/locale/lang/zh-cn" // Element Plus Chinese language pack

const { initTheme } = useTheme()

const { initGreyAndColorWeakness } = useGreyAndColorWeakness()

const { initStarNotification, initStoreNotification, initMobileNotification } = usePany()

// Initialize the theme
initTheme()

// Initialize gray mode and color weakness mode
initGreyAndColorWeakness()

// #region Initialize notifications
initStarNotification()

initStoreNotification()

initMobileNotification()
// #endregion
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
