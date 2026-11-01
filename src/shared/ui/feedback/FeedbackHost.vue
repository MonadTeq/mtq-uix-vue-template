<script lang="ts" setup>
import { resolveConfirm, useFeedbackState } from "@/shared/lib/feedback"

const state = useFeedbackState()
</script>

<template>
  <Teleport to="body">
    <!-- Toast messages -->
    <div class="feedback-messages">
      <TransitionGroup name="feedback-message">
        <div v-for="item in state.messages" :key="item.id" class="feedback-message" :class="`feedback-message--${item.type}`">
          {{ item.text }}
        </div>
      </TransitionGroup>
    </div>

    <!-- Notifications -->
    <div class="feedback-notifications">
      <TransitionGroup name="feedback-notification">
        <div v-for="item in state.notifications" :key="item.id" class="feedback-notification" :class="`feedback-notification--${item.type}`">
          <div class="feedback-notification__title">{{ item.title }}</div>
          <div v-if="item.message" class="feedback-notification__message">{{ item.message }}</div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Confirm dialog -->
    <div v-if="state.confirmVisible" class="feedback-confirm-overlay">
      <div class="feedback-confirm" role="dialog" aria-modal="true">
        <div class="feedback-confirm__title">{{ state.confirmOptions.title }}</div>
        <div class="feedback-confirm__message">{{ state.confirmOptions.message }}</div>
        <div class="feedback-confirm__actions">
          <button class="feedback-confirm__btn" @click="resolveConfirm(false)">
            {{ state.confirmOptions.cancelText }}
          </button>
          <button class="feedback-confirm__btn feedback-confirm__btn--primary" @click="resolveConfirm(true)">
            {{ state.confirmOptions.confirmText }}
          </button>
        </div>
      </div>
    </div>

    <!-- Fullscreen loading -->
    <div v-if="state.loadingVisible" class="feedback-loading">
      <span class="feedback-loading__spinner" aria-hidden="true" />
      <span class="feedback-loading__text">{{ state.loadingText }}</span>
    </div>
  </Teleport>
</template>

<style scoped>
.feedback-messages {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.feedback-message {
  padding: 8px 16px;
  border-radius: var(--radius-md);
  background-color: var(--color-surface-overlay);
  border: 1px solid var(--color-border-default);
  color: var(--color-text-regular);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.feedback-message--success { border-left: 3px solid var(--color-status-success); }
.feedback-message--error { border-left: 3px solid var(--color-action-danger); }
.feedback-message--warning { border-left: 3px solid var(--color-status-warning); }
.feedback-message--info { border-left: 3px solid var(--color-status-info); }

.feedback-notifications {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 320px;
}

.feedback-notification {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-overlay);
  border: 1px solid var(--color-border-default);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.feedback-notification__title {
  color: var(--color-text-primary);
  font-weight: 500;
  margin-bottom: var(--space-1);
}

.feedback-notification__message {
  color: var(--color-text-regular);
  font-size: var(--font-size-sm);
}

.feedback-confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.feedback-confirm {
  width: 360px;
  max-width: calc(100vw - 2rem);
  padding: var(--space-4);
  background-color: var(--color-surface-default);
  border-radius: var(--radius-md);
}

.feedback-confirm__title {
  color: var(--color-text-primary);
  font-weight: 500;
  margin-bottom: var(--space-2);
}

.feedback-confirm__message {
  color: var(--color-text-regular);
  margin-bottom: var(--space-4);
}

.feedback-confirm__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
}

.feedback-confirm__btn {
  padding: 6px 16px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-default);
  color: var(--color-text-regular);
  cursor: pointer;
}

.feedback-confirm__btn--primary {
  background-color: var(--color-action-primary);
  border-color: var(--color-action-primary);
  color: var(--white);
}

.feedback-loading {
  position: fixed;
  inset: 0;
  z-index: 4000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  background-color: rgba(0, 0, 0, 0.4);
  color: var(--white);
}

.feedback-loading__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: var(--radius-full);
  animation: feedback-spin 0.8s linear infinite;
}

.feedback-loading__text {
  font-size: var(--font-size-md);
}

@keyframes feedback-spin {
  to { transform: rotate(360deg); }
}

.feedback-message-enter-active,
.feedback-message-leave-active,
.feedback-notification-enter-active,
.feedback-notification-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.feedback-message-enter-from,
.feedback-message-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.feedback-notification-enter-from,
.feedback-notification-leave-to {
  opacity: 0;
  transform: translateX(16px);
}
</style>
