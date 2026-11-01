<script lang="ts" setup>
import { Card } from "@/shared/ui"
import SwitchUser from "./components/SwitchUser.vue"
</script>

<template>
  <div class="app-container">
    <SwitchUser />
    <Card shadow="never" class="content">
      This page is only visible to the admin role or the permission:page-level permission; after switching users, you will not be able to enter this page
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 20px;
}
</style>
