<script lang="ts" setup>
import { Card, Input } from "@/shared/ui"

defineOptions({
  name: "Level3"
})

const text = ref("")
</script>

<template>
  <div class="app-container">
    <Card title="Third-level Route">
      <Input v-model="text" placeholder="Enter any characters to test caching" />
    </Card>
  </div>
</template>
