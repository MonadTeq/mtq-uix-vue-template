<script lang="ts" setup>
import type { NotifyItem } from "./type"
import { Badge, Card } from "@/shared/ui"

interface Props {
  data: NotifyItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <div v-if="props.data.length === 0" class="empty">No data</div>
  <Card v-else v-for="(item, index) in props.data" :key="index" shadow="never" class="card-container">
    <template #header>
      <div class="card-header">
        <div>
          <span>
            <span class="card-title">{{ item.title }}</span>
            <Badge v-if="item.extra" :variant="item.status">{{ item.extra }}</Badge>
          </span>
          <div class="card-time">
            {{ item.datetime }}
          </div>
        </div>
        <div v-if="item.avatar" class="card-avatar">
          <img :src="item.avatar" width="34">
        </div>
      </div>
    </template>
    <div class="card-body">
      {{ item.description ?? "No Data" }}
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.empty {
  padding: 40px 0;
  text-align: center;
  color: var(--color-text-secondary);
}

.card-container {
  margin-bottom: 10px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-title {
      font-weight: bold;
      margin-right: 10px;
    }
    .card-time {
      font-size: 12px;
      color: var(--color-text-secondary);
    }
    .card-avatar {
      display: flex;
      align-items: center;
    }
  }
  .card-body {
    font-size: 12px;
  }
}
</style>
