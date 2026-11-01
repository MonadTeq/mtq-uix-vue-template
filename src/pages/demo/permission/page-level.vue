<script lang="ts" setup>
import SwitchUser from "./components/SwitchUser.vue"
</script>

<template>
  <div class="app-container">
    <SwitchUser />
    <el-card shadow="never" class="content">
      This page is only visible to the admin role or the permission:page-level permission; after switching users, you will not be able to enter this page
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 20px;
}
</style>
