<script lang="ts" setup>
import Modal from "./Modal.vue"

/** Control the modal's visibility */
const visible = ref<boolean>(false)

/** Open the modal */
function handleOpen() {
  visible.value = true
}
</script>

<template>
  <div>
    <div class="search-trigger" title="Search menus" @click="handleOpen">
      <SvgIcon name="search" class="svg-icon" />
    </div>
    <Modal v-model="visible" />
  </div>
</template>

<style lang="scss" scoped>
.search-trigger {
  cursor: pointer;
}

.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
