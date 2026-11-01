<script lang="ts" setup>
import { useGreyAndColorWeakness } from "@/features/color-mode/model/use-grey-and-color-weakness"
import { usePany } from "@/features/notifications/model/use-pany"
import { useTheme } from "@/features/theme/model/use-theme"
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
