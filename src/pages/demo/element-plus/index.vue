<script lang="ts" setup>
import type { CreateOrUpdateTableRequestData, TableData } from "@/shared/api/table-type"
import type { FormRules } from "element-plus"
import { createTableDataApi, deleteTableDataApi, getTableDataApi, updateTableDataApi } from "@/shared/api/table"
import { usePagination } from "@/shared/lib/use-pagination"
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"

defineOptions({
  // Name the current component
  name: "ElementPlus"
})

const loading = ref<boolean>(false)

const { paginationData, resetCurrentPage, watchPagination } = usePagination({
  callback: getTableData
})

// #region Create
const DEFAULT_FORM_DATA: CreateOrUpdateTableRequestData = {
  id: undefined,
  username: "",
  password: ""
}

const dialogVisible = ref<boolean>(false)

const formRef = useTemplateRef("formRef")

const formData = ref<CreateOrUpdateTableRequestData>(cloneDeep(DEFAULT_FORM_DATA))

const formRules: FormRules<CreateOrUpdateTableRequestData> = {
  username: [{ required: true, trigger: "blur", message: "Please enter username" }],
  password: [{ required: true, trigger: "blur", message: "Please enter password" }]
}

function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("Form validation failed")
      return
    }
    loading.value = true
    const api = formData.value.id === undefined ? createTableDataApi : updateTableDataApi
    api(formData.value).then(() => {
      ElMessage.success("Operation successful")
      dialogVisible.value = false
    }).finally(() => {
      loading.value = false
      getTableData()
    })
  })
}

function resetForm() {
  formRef.value?.clearValidate()
  formData.value = cloneDeep(DEFAULT_FORM_DATA)
}
// #endregion

// #region Delete
function handleDelete(row: TableData) {
  ElMessageBox.confirm(`Deleting user: ${row.username}, confirm deletion?`, "Prompt", {
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    type: "warning"
  }).then(() => {
    loading.value = true
    deleteTableDataApi(row.id).then(() => {
      ElMessage.success("Deleted successfully")
    }).finally(() => {
      loading.value = false
      getTableData()
    })
  })
}
// #endregion

// #region Update
function handleUpdate(row: TableData) {
  dialogVisible.value = true
  formData.value = cloneDeep(row)
}
// #endregion

// #region Read
const tableData = ref<TableData[]>([])

const searchFormRef = useTemplateRef("searchFormRef")

const searchData = reactive({
  username: "",
  phone: ""
})

function getTableData() {
  loading.value = true
  getTableDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    ...searchData
  }).then(({ data }) => {
    paginationData.total = data.total
    tableData.value = data.list
  }).catch(() => {
    tableData.value = []
  }).finally(() => {
    loading.value = false
  })
}

function handleSearch() {
  resetCurrentPage()
}

function resetSearch() {
  searchFormRef.value?.resetFields()
  handleSearch()
}
// #endregion

// Watch pagination parameter changes
watchPagination()
</script>

<template>
  <div class="app-container">
    <el-alert
      title="Data source"
      type="success"
      description="Online Mock provided by Apifox; the data is not real and is only for simple CRUD operation demonstration"
      show-icon
    />
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="Username">
          <el-input v-model="searchData.username" placeholder="Please enter" />
        </el-form-item>
        <el-form-item prop="phone" label="Phone">
          <el-input v-model="searchData.phone" placeholder="Please enter" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">
            Search
          </el-button>
          <el-button :icon="Refresh" @click="resetSearch">
            Reset
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">
            Add user
          </el-button>
          <el-button type="danger" :icon="Delete">
            Batch delete
          </el-button>
        </div>
        <div>
          <el-tooltip content="Download">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="Refresh current page">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="username" label="Username" align="center" />
          <el-table-column prop="roles" label="Role" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.roles === 'admin'" type="primary" effect="plain" disable-transitions>
                admin
              </el-tag>
              <el-tag v-else type="warning" effect="plain" disable-transitions>
                {{ scope.row.roles }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="Phone" align="center" />
          <el-table-column prop="email" label="Email" align="center" />
          <el-table-column prop="status" label="Status" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain" disable-transitions>
                Enabled
              </el-tag>
              <el-tag v-else type="danger" effect="plain" disable-transitions>
                Disabled
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="Created time" align="center" />
          <el-table-column fixed="right" label="Actions" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row as TableData)">
                Edit
              </el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row as TableData)">
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          v-model:current-page="paginationData.currentPage"
          v-model:page-size="paginationData.pageSize"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :layout="paginationData.layout"
          background
        />
      </div>
    </el-card>
    <!-- Create/Update -->
    <el-dialog
      v-model="dialogVisible"
      :title="formData.id === undefined ? 'Add user' : 'Edit user'"
      width="30%"
      @closed="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto">
        <el-form-item prop="username" label="Username">
          <el-input v-model="formData.username" placeholder="Please enter" />
        </el-form-item>
        <el-form-item v-if="formData.id === undefined" prop="password" label="Password">
          <el-input v-model="formData.password" placeholder="Please enter" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" :loading="loading" @click="handleCreateOrUpdate">
          Confirm
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-alert {
  margin-bottom: 20px;
}

.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
