<script lang="ts" setup>
import { useGreyAndColorWeakness } from "@/features/color-mode"
import { usePany } from "@/features/notifications"
import { useTheme } from "@/features/theme"
import { FeedbackHost } from "@/shared/ui"

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
  <router-view />
  <FeedbackHost />
</template>
