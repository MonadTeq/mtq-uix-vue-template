<script lang="ts" setup>
import { useLayoutMode } from "@/features/layout-mode"
import { LayoutModeEnum } from "@/shared/constants"

const { isLeft, isTop, isLeftTop, setLayoutMode } = useLayoutMode()
</script>

<template>
  <div class="select-layout-mode">
    <div class="layout-mode left" :class="{ active: isLeft }" title="Left mode" @click="setLayoutMode(LayoutModeEnum.Left)">
      <div class="mode-aside" />
      <div class="mode-col">
        <div class="mode-header" />
        <div class="mode-body" />
      </div>
    </div>
    <div class="layout-mode top" :class="{ active: isTop }" title="Top mode" @click="setLayoutMode(LayoutModeEnum.Top)">
      <div class="mode-header" />
      <div class="mode-body" />
    </div>
    <div class="layout-mode left-top" :class="{ active: isLeftTop }" title="Hybrid mode" @click="setLayoutMode(LayoutModeEnum.LeftTop)">
      <div class="mode-header" />
      <div class="mode-row">
        <div class="mode-aside" />
        <div class="mode-body" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-layout-mode {
  display: flex;
  justify-content: space-between;
}

.layout-mode {
  width: 60px;
  flex-grow: 0;
  overflow: hidden;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  &:hover {
    border: 2px solid var(--color-action-primary);
  }
}

.active {
  border: 2px solid var(--color-action-primary);
}

.mode-header {
  height: 12px;
  background-color: var(--color-surface-hover);
}

.mode-aside {
  width: 16px;
  background-color: var(--color-action-primary);
}

.mode-body {
  flex: 1;
  background-color: var(--color-surface-page);
}

.mode-col,
.mode-row {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mode-row {
  flex-direction: row;
}

.left,
.left-top {
  .mode-header {
    background-color: var(--color-surface-hover);
  }
}

.top {
  .mode-header {
    background-color: var(--color-action-primary);
  }
}
</style>
