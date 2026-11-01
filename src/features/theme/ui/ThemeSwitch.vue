<script lang="ts" setup>
import { useTheme } from "../model/use-theme"

const { themeList, activeThemeName, setTheme } = useTheme()

const open = ref(false)
</script>

<template>
  <div class="theme-switch">
    <div class="trigger" title="Theme mode" @click="open = !open">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
      </svg>
    </div>
    <ul v-if="open" class="menu">
      <li
        v-for="theme in themeList"
        :key="theme.name"
        class="menu-item"
        :class="{ disabled: activeThemeName === theme.name }"
        @click="(e: MouseEvent) => { setTheme(e, theme.name); open = false }"
      >
        {{ theme.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.theme-switch {
  position: relative;
}

.trigger {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  min-width: 160px;
  margin: var(--space-1) 0 0;
  padding: var(--space-1) 0;
  list-style: none;
  background-color: var(--color-surface-overlay);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.menu-item {
  padding: var(--space-2) var(--space-4);
  color: var(--color-text-regular);
  cursor: pointer;
  white-space: nowrap;
}

.menu-item:hover {
  background-color: var(--color-surface-hover);
}

.menu-item.disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
</style>
