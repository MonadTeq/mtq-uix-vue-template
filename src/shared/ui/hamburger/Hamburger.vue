<script lang="ts" setup>
interface Props {
  isActive?: boolean
}

const { isActive = false } = defineProps<Props>()

const emit = defineEmits<{
  toggleClick: []
}>()

function toggleClick() {
  emit("toggleClick")
}
</script>

<template>
  <div class="hamburger" @click="toggleClick">
    <svg v-if="isActive" viewBox="0 0 24 24" width="20" height="20" class="icon" aria-hidden="true">
      <path fill="currentColor" d="M15 4l-8 8 8 8V4z" />
    </svg>
    <svg v-else viewBox="0 0 24 24" width="20" height="20" class="icon" aria-hidden="true">
      <path fill="currentColor" d="M9 4l8 8-8 8V4z" />
    </svg>
  </div>
</template>

<style scoped>
.hamburger {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon {
  color: var(--mtq-uix-hamburger-text-color);
}
</style>
