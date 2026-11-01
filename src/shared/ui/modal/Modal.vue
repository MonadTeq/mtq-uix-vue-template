<script lang="ts" setup>
export interface ModalProps {
  title?: string
  size?: "sm" | "md" | "lg"
  dismissible?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  size: "md",
  dismissible: true
})

const model = defineModel<boolean>({ default: false })

const width = computed(() => {
  switch (props.size) {
    case "sm":
      return "400px"
    case "lg":
      return "70%"
    default:
      return "50%"
  }
})

defineSlots<{
  default?: () => unknown
  footer?: () => unknown
}>()

function close() {
  if (props.dismissible) model.value = false
}

function onOverlayClick() {
  if (props.dismissible) model.value = false
}
</script>

<template>
  <Teleport to="body">
    <div v-if="model" class="modal-overlay" @click.self="onOverlayClick">
      <div class="modal" :style="{ width }" role="dialog" aria-modal="true">
        <header class="modal__header">
          <span class="modal__title">{{ title }}</span>
          <button v-if="dismissible" class="modal__close" aria-label="Close" @click="close">×</button>
        </header>
        <div class="modal__body">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="modal__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface-default);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border-default);
}

.modal__title {
  color: var(--color-text-primary);
  font-weight: 500;
}

.modal__close {
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: 1;
  cursor: pointer;
}

.modal__body {
  padding: var(--space-4);
  overflow: auto;
  color: var(--color-text-regular);
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-border-default);
}
</style>
