<script lang="ts" setup>
const show = ref(false)
</script>

<template>
  <div class="handle-button" @click="show = true">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.63l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.12.56-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.74 8.87a.5.5 0 0 0 .12.63l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.5.5 0 0 0-.12.63l1.92 3.32c.13.23.38.32.6.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.25.42.5.42h3.84c.25 0 .45-.18.5-.42l.36-2.54c.59-.24 1.12-.56 1.62-.94l2.39.96c.22.1.47.01.6-.22l1.92-3.32a.5.5 0 0 0-.12-.63l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"
      />
    </svg>
  </div>
  <Teleport to="body">
    <div v-if="show" class="drawer-overlay" @click.self="show = false">
      <aside class="drawer">
        <slot />
      </aside>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.handle-button {
  width: 40px;
  height: 48px;
  background-color: var(--mtq-uix-rightpanel-button-bg-color);
  color: var(--white);
  position: fixed;
  top: 45%;
  right: 0;
  border-radius: 6px 0 0 6px;
  z-index: 2000;
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 2100;
  background-color: rgba(0, 0, 0, 0.3);
}

.drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: var(--color-surface-default);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
}
</style>
