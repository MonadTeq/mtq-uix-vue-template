<script lang="ts" setup>
export interface NavLinkProps {
  href?: string
  active?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<NavLinkProps>(), {
  href: "#"
})

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void
}>()
</script>

<template>
  <a
    class="nav-link"
    :class="{ 'nav-link--active': active, 'nav-link--disabled': disabled }"
    :href="disabled ? undefined : href"
    :aria-current="active ? 'page' : undefined"
    :aria-disabled="disabled || undefined"
    @click.prevent="!disabled && emit('click', $event)"
  >
    <slot />
  </a>
</template>

<style scoped>
.nav-link {
  display: inline-block;
  padding: var(--space-2) var(--space-3);
  color: var(--color-text-regular);
  text-decoration: none;
  border-radius: var(--radius-md);
}

.nav-link:hover {
  color: var(--color-action-primary);
}

.nav-link--active {
  color: var(--color-action-primary);
}

.nav-link--disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
}
</style>
