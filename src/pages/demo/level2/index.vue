<script lang="ts" setup>
import { Card } from "@/shared/ui"
</script>

<template>
  <div class="app-container">
    <h4>
      <span>
        The caching feature for third-level and above routes is disabled by default; open it in this config file if needed:
      </span>
      <a
        class="link"
        href="https://github.com/un-pany/v3-admin-vite/blob/main/src/router/config.ts"
        target="_blank"
      >
        src/router/config.ts
      </a>
    </h4>
    <Card title="Second-level Route">
      <router-view />
    </Card>
  </div>
</template>

<style lang="scss" scoped>
h4 {
  display: flex;
  align-items: center;
}

.link {
  font-size: 18px;
}
</style>
