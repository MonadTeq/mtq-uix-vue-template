<script lang="ts" setup>
export interface NavProps {
  variant?: "default" | "tabs" | "pills"
}

withDefaults(defineProps<NavProps>(), {
  variant: "default"
})
</script>

<template>
  <nav class="nav" :class="`nav--${variant}`" role="navigation">
    <slot />
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  list-style: none;
}
</style>
