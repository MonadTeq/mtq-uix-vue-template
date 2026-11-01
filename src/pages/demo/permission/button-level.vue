<script lang="ts" setup>
import { checkPermission } from "@@/utils/permission"
import SwitchUser from "./components/SwitchUser.vue"
</script>

<template>
  <div class="app-container">
    <SwitchUser />
    <el-card header="Permission directive v-permission example" shadow="never" class="margin-top-20">
      <el-button v-permission="['admin']">
        admin
      </el-button>
      <el-button v-permission="['admin', 'editor']">
        admin and editor
      </el-button>
      <el-button v-permission="['permission:page-level']">
        permission:page-level
      </el-button>
      <el-button v-permission="['permission:page-level', 'permission:button-level']">
        permission:page-level and permission:button-level
      </el-button>
    </el-card>
    <el-card header="Permission function checkPermission example" shadow="never" class="margin-top-20">
      <el-text type="warning" size="large">
        Element Plus's el-tab-pane and el-table-column and other dynamically rendered DOM scenarios are not suitable for v-permission
        In this case you can implement it via v-if + checkPermission
      </el-text>
      <el-tabs type="border-card" class="margin-top-20">
        <el-tab-pane v-if="checkPermission(['admin'])" label="admin">
          <el-tag size="large">
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['admin', 'editor'])" label="admin and editor">
          <el-tag size="large">
            v-if="checkPermission(['admin', 'editor'])"
          </el-tag>
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['permission:page-level'])" label="permission:page-level">
          <el-tag size="large">
            v-if="checkPermission(['permission:page-level'])"
          </el-tag>
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['permission:page-level', 'permission:button-level'])" label="permission:page-level and permission:button-level">
          <el-tag size="large">
            v-if="checkPermission(['permission:page-level', 'permission:button-level'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.margin-top-20 {
  margin-top: 20px;
}
</style>
