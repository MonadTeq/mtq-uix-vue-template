<script lang="ts" setup>
import { useFetchSelect } from "@/shared/lib"
import { Alert, Card, Select } from "@/shared/ui"
import { getSelectDataApi } from "./apis/use-fetch-select"

const { loading, options, value } = useFetchSelect({
  api: getSelectDataApi
})
</script>

<template>
  <div class="app-container">
    <Alert
      variant="primary"
      title="Example description"
      description="Automatically call the api via the composable to get the data the Select component needs and pass it to the Select component"
    />
    <Card title="Select example" shadow="never" class="card">
      <Select v-model="value" :options="options" :disabled="loading" />
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  margin-bottom: 20px;
}

.card {
  margin-bottom: 20px;
}
</style>
