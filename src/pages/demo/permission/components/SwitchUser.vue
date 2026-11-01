<script lang="ts" setup>
import { useUserStore } from "@/entities/user"
import { Badge, Card, Radio } from "@/shared/ui"

const userStore = useUserStore()

const username = ref(userStore.username)

watch(username, (value) => {
  userStore.changeUser(value)
})
</script>

<template>
  <Card shadow="never">
    <div class="switch-user">
      <span>Switch user:</span>
      <div class="radios">
        <Radio v-model="username" label="editor" value="editor" />
        <Radio v-model="username" label="admin" value="admin" />
      </div>
    </div>
    <div class="roles">
      <span>Your roles:</span>
      <Badge v-for="role in userStore.roles" :key="role" variant="secondary">
        {{ role }}
      </Badge>
    </div>
    <div class="permissions">
      <span>Your permissions:</span>
      <Badge v-for="permission in userStore.permissions" :key="permission" variant="secondary">
        {{ permission }}
      </Badge>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.switch-user {
  display: flex;
  align-items: center;
}

.radios {
  display: inline-flex;
  gap: var(--space-3);
  margin-left: var(--space-3);
}

.roles {
  margin-top: 15px;
}

.permissions {
  margin-top: 15px;
  .roles :deep(.badge),
  :deep(.badge) {
    margin-right: 5px;
  }
}
</style>
