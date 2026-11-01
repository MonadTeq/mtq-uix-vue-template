<script lang="ts" setup>
defineOptions({
  name: "Level3"
})

const text = ref("")
</script>

<template>
  <div class="app-container">
    <el-card header="Third-level Route">
      <el-input v-model="text" placeholder="Enter any characters to test caching" />
    </el-card>
  </div>
</template>
