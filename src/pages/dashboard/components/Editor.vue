<script lang="ts" setup>
import SvgDashboard from "../images/dashboard.svg?component" // Functionality of the vite-svg-loader plugin
</script>

<template>
  <div class="app-container center">
    <SvgDashboard class="svg" />
    <p>Welcome to the Editor role home page</p>
  </div>
</template>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .svg {
    width: 600px;
    max-width: 100%;
  }
}
</style>
