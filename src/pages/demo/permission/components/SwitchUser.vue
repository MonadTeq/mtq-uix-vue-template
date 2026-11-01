<script lang="ts" setup>
import { useUserStore } from "@/entities/user"

const userStore = useUserStore()

const username = ref(userStore.username)

watch(username, (value) => {
  userStore.changeUser(value)
})
</script>

<template>
  <el-card shadow="never">
    <div class="switch-user">
      <span>Switch user:</span>
      <el-radio-group v-model="username">
        <el-radio-button label="editor" value="editor" />
        <el-radio-button label="admin" value="admin" />
      </el-radio-group>
    </div>
    <div class="roles">
      <span>Your roles:</span>
      <el-tag v-for="(role, index) in userStore.roles" :key="index" effect="plain" size="large">
        {{ role }}
      </el-tag>
    </div>
    <div class="permissions">
      <span>Your permissions:</span>
      <el-tag v-for="(permission, index) in userStore.permissions" :key="index" effect="plain" size="large">
        {{ permission }}
      </el-tag>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.switch-user {
  display: flex;
  align-items: center;
}

.roles {
  margin-top: 15px;
}

.permissions {
  margin-top: 15px;
  .el-tag {
    margin-right: 5px;
  }
}
</style>
