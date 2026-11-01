<script lang="ts" setup>
import { checkPermission } from "@/features/access-control"
import { Badge, Button, Card } from "@/shared/ui"
import SwitchUser from "./components/SwitchUser.vue"
</script>

<template>
  <div class="app-container">
    <SwitchUser />
    <Card title="Permission directive v-permission example" shadow="never" class="margin-top-20">
      <div class="row">
        <Button v-permission="['admin']">
          admin
        </Button>
        <Button v-permission="['admin', 'editor']">
          admin and editor
        </Button>
        <Button v-permission="['permission:page-level']">
          permission:page-level
        </Button>
        <Button v-permission="['permission:page-level', 'permission:button-level']">
          permission:page-level and permission:button-level
        </Button>
      </div>
    </Card>
    <Card title="Permission function checkPermission example" shadow="never" class="margin-top-20">
      <p class="text-warning">
        Dynamically rendered DOM scenarios are not suitable for v-permission. In this case use v-if + checkPermission.
      </p>
      <div class="row margin-top-20">
        <Badge v-if="checkPermission(['admin'])" variant="secondary">
          v-if="checkPermission(['admin'])"
        </Badge>
        <Badge v-if="checkPermission(['admin', 'editor'])" variant="secondary">
          v-if="checkPermission(['admin', 'editor'])"
        </Badge>
        <Badge v-if="checkPermission(['permission:page-level'])" variant="secondary">
          v-if="checkPermission(['permission:page-level'])"
        </Badge>
        <Badge v-if="checkPermission(['permission:page-level', 'permission:button-level'])" variant="secondary">
          v-if="checkPermission(['permission:page-level', 'permission:button-level'])"
        </Badge>
      </div>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.margin-top-20 {
  margin-top: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.text-warning {
  color: var(--color-status-warning);
}
</style>
