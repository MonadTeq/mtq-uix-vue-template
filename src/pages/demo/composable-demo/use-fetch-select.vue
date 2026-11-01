<script lang="ts" setup>
import { useFetchSelect } from "@/shared/lib/use-fetch-select"
import { getSelectDataApi } from "./apis/use-fetch-select"

const { loading, options, value } = useFetchSelect({
  api: getSelectDataApi
})
</script>

<template>
  <div class="app-container">
    <el-alert
      title="Example description"
      type="primary"
      description="Automatically call the api via the composable to get the data the Select component needs and pass it to the Select component"
      show-icon
    />
    <el-card header="Select example" shadow="never" v-loading="loading">
      <el-select v-model="value" filterable>
        <el-option v-for="(item, index) in options" v-bind="item" :key="index" placeholder="Please select" />
      </el-select>
    </el-card>
    <el-card header="Select V2 example (choose this component if the data volume is too large)" shadow="never" v-loading="loading">
      <el-select-v2 v-model="value" :options="options" filterable placeholder="Please select" />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-alert {
  margin-bottom: 20px;
}

.el-card {
  margin-bottom: 20px;
}
</style>
