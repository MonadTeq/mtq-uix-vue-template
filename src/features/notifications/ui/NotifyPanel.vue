<script lang="ts" setup>
import type { NotifyItem } from "./type"
import { Button, Popover } from "@/shared/ui"
import { message } from "@/shared/lib"
import { messageData, notifyData, todoData } from "./data"
import List from "./List.vue"

type TabName = "Notifications" | "Messages" | "Todos"

interface DataItem {
  name: TabName
  type: "primary" | "success" | "warning" | "danger" | "info"
  list: NotifyItem[]
}

/** Current badge value */
const badgeValue = computed(() => data.value.reduce((sum, item) => sum + item.list.length, 0))

/** Maximum badge value */
const badgeMax = 99

/** Current Tab */
const activeName = ref<TabName>("Notifications")

/** All data */
const data = ref<DataItem[]>([
  { name: "Notifications", type: "primary", list: notifyData },
  { name: "Messages", type: "danger", list: messageData },
  { name: "Todos", type: "warning", list: todoData }
])

const activeList = computed(() => data.value.find(item => item.name === activeName.value)?.list ?? [])

function handleHistory() {
  message.success(`Jump to the ${activeName.value} history page`)
}
</script>

<template>
  <div class="notify">
    <Popover placement="bottom" trigger="click">
      <div class="notify-trigger" title="Notifications">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
          />
        </svg>
        <span v-if="badgeValue > 0" class="badge">{{ badgeValue > badgeMax ? `${badgeMax}+` : badgeValue }}</span>
      </div>
      <template #content>
        <div class="notify-panel">
          <div class="notify-tabs">
            <button
              v-for="item in data"
              :key="item.name"
              class="notify-tab"
              :class="{ active: activeName === item.name }"
              @click="activeName = item.name"
            >
              {{ item.name }}
              <span class="badge">{{ item.list.length > badgeMax ? `${badgeMax}+` : item.list.length }}</span>
            </button>
          </div>
          <div class="notify-list">
            <List :data="activeList" />
          </div>
          <div class="notify-history">
            <Button variant="ghost" @click="handleHistory">
              View {{ activeName }} history
            </Button>
          </div>
        </div>
      </template>
    </Popover>
  </div>
</template>

<style lang="scss" scoped>
.notify-trigger {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  margin-left: 4px;
  border-radius: 9px;
  background-color: var(--color-action-danger);
  color: var(--white);
  font-size: 12px;
}

.notify-panel {
  width: 330px;
}

.notify-tabs {
  display: flex;
  border-bottom: 1px solid var(--color-border-default);
  margin-bottom: var(--space-3);
}

.notify-tab {
  flex: 1;
  padding: var(--space-2);
  border: none;
  background: transparent;
  color: var(--color-text-regular);
  cursor: pointer;
  font-family: inherit;
}

.notify-tab.active {
  color: var(--color-action-primary);
  border-bottom: 2px solid var(--color-action-primary);
}

.notify-list {
  max-height: 400px;
  overflow-y: auto;
}

.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--color-border-default);
  margin-top: 12px;
}
</style>
