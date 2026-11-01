<script lang="ts" setup>
import type { TableResponseData } from "@/shared/api"
import type { ElMessageBoxOptions } from "element-plus"
import type { VxeFormInstance, VxeFormProps, VxeGridInstance, VxeGridProps, VxeModalInstance, VxeModalProps } from "vxe-table"
import { getTablesService } from "@/shared/api"

defineOptions({
  // Name the current component
  name: "VxeTable"
})

const tablesService = getTablesService()

// #region vxe-grid
interface RowMeta {
  id: number
  username: string
  roles: string
  phone: string
  email: string
  status: boolean
  createTime: string
  /** Property automatically added by vxe-table */
  _VXE_ID?: string
}

const xGridDom = useTemplateRef<VxeGridInstance>("xGridDom")

const xGridOpt: VxeGridProps = reactive({
  loading: true,
  autoResize: true,
  /** Pagination configuration */
  pagerConfig: {
    align: "right"
  },
  /** Form configuration */
  formConfig: {
    items: [
      {
        field: "username",
        itemRender: {
          name: "VxeInput",
          props: {
            placeholder: "Username",
            clearable: true
          }
        }
      },
      {
        field: "phone",
        itemRender: {
          name: "VxeInput",
          props: {
            placeholder: "Phone",
            clearable: true
          }
        }
      },
      {
        itemRender: {
          name: "VxeButtonGroup",
          options: [
            {
              type: "submit",
              content: "Search",
              status: "primary",
              icon: "vxe-icon-search"
            },
            {
              type: "reset",
              content: "Reset",
              icon: "vxe-icon-refresh"
            }
          ]
        }
      }
    ]
  },
  /** Toolbar configuration */
  toolbarConfig: {
    refresh: true,
    custom: true,
    slots: {
      buttons: "toolbar-btns"
    }
  },
  /** Custom column configuration */
  customConfig: {
    /** Whether to allow column selection */
    checkMethod: ({ column }) => !["username"].includes(column.field)
  },
  /** Column configuration */
  columns: [
    {
      type: "checkbox",
      width: "50px"
    },
    {
      field: "username",
      title: "Username"
    },
    {
      field: "roles",
      title: "Role",
      slots: {
        default: "role-column"
      }
    },
    {
      field: "phone",
      title: "Phone"
    },
    {
      field: "email",
      title: "Email"
    },
    {
      field: "status",
      title: "Status",
      slots: {
        default: "status-column"
      }
    },
    {
      field: "createTime",
      title: "Created time"
    },
    {
      title: "Actions",
      width: "150px",
      fixed: "right",
      showOverflow: false,
      slots: {
        default: "row-operate"
      }
    }
  ],
  /** Data proxy configuration (based on the Promise API) */
  proxyConfig: {
    /** Enable dynamic sequence number proxy */
    seq: true,
    /** Whether to proxy the form */
    form: true,
    /** Whether to auto-load; defaults to true */
    autoLoad: true,
    props: {
      total: "total"
    },
    ajax: {
      query: ({ page, form }) => {
        xGridOpt.loading = true
        crudStore.clearTable()
        return new Promise((resolve) => {
          let total = 0
          let result: RowMeta[] = []
          // Load data
          const callback = (res: TableResponseData) => {
            if (res?.data) {
              // Total count
              total = res.data.total
              // List data
              result = res.data.list
            }
            xGridOpt.loading = false
            // The return value has format requirements; see the vxe-table official documentation for details
            resolve({ total, result })
          }
          // Parameters required by the API
          const params = {
            username: form.username || "",
            phone: form.phone || "",
            size: page.pageSize,
            currentPage: page.currentPage
          }
          // Call the API
          tablesService.getTables(params).then(callback).catch(callback)
        })
      }
    }
  }
})
// #endregion

// #region vxe-modal
const xModalDom = useTemplateRef<VxeModalInstance>("xModalDom")

const xModalOpt: VxeModalProps = reactive({
  title: "",
  showClose: true,
  escClosable: true,
  maskClosable: true,
  beforeHideMethod: () => {
    xFormDom.value?.clearValidate()
    return Promise.resolve()
  }
})
// #endregion

// #region vxe-form
const xFormDom = useTemplateRef<VxeFormInstance>("xFormDom")

const xFormOpt: VxeFormProps = reactive({
  span: 24,
  titleWidth: "100px",
  loading: false,
  /** Whether to show the title colon */
  titleColon: false,
  /** Form data */
  data: {
    username: "",
    password: ""
  },
  /** Item list */
  items: [
    {
      field: "username",
      title: "Username",
      itemRender: {
        name: "$input",
        props: {
          placeholder: "Please enter"
        }
      }
    },
    {
      field: "password",
      title: "Password",
      itemRender: {
        name: "$input",
        props: {
          placeholder: "Please enter"
        }
      }
    },
    {
      align: "right",
      itemRender: {
        name: "$buttons",
        children: [
          {
            props: {
              content: "Cancel"
            },
            events: {
              click: () => xModalDom.value?.close()
            }
          },
          {
            props: {
              type: "submit",
              content: "Confirm",
              status: "primary"
            },
            events: {
              click: () => crudStore.onSubmitForm()
            }
          }
        ]
      }
    }
  ],
  /** Validation rules */
  rules: {
    username: [
      {
        required: true,
        validator: ({ itemValue }) => {
          switch (true) {
            case !itemValue:
              return new Error("Please enter")
            case !itemValue.trim():
              return new Error("Spaces are invalid")
          }
        }
      }
    ],
    password: [
      {
        required: true,
        validator: ({ itemValue }) => {
          switch (true) {
            case !itemValue:
              return new Error("Please enter")
            case !itemValue.trim():
              return new Error("Spaces are invalid")
          }
        }
      }
    ]
  }
})
// #endregion

// #region CRUD
const crudStore = reactive({
  /** Form type; true means update, false means create */
  isUpdate: true,
  /** Load table data */
  commitQuery: () => xGridDom.value?.commitProxy("query"),
  /** Clear table data */
  clearTable: () => xGridDom.value?.reloadData([]),
  /** Show the modal on click */
  onShowModal: (row?: RowMeta) => {
    if (row) {
      crudStore.isUpdate = true
      xModalOpt.title = "Edit user"
      // Assign value
      xFormOpt.data.username = row.username
    } else {
      crudStore.isUpdate = false
      xModalOpt.title = "Add user"
    }
    // Disable the form item
    const props = xFormOpt.items?.[0]?.itemRender?.props
    props && (props.disabled = crudStore.isUpdate)
    xModalDom.value?.open()
    nextTick(() => {
      !crudStore.isUpdate && xFormDom.value?.reset()
      xFormDom.value?.clearValidate()
    })
  },
  /** Confirm and save */
  onSubmitForm: () => {
    if (xFormOpt.loading) return
    xFormDom.value?.validate((errMap) => {
      if (errMap) return
      xFormOpt.loading = true
      const callback = () => {
        xFormOpt.loading = false
        xModalDom.value?.close()
        ElMessage.success("Operation successful")
        !crudStore.isUpdate && crudStore.afterInsert()
        crudStore.commitQuery()
      }
      if (crudStore.isUpdate) {
        // Simulate a successful update API call
        setTimeout(callback, 1000)
      } else {
        // Simulate a successful create API call
        setTimeout(callback, 1000)
      }
    })
  },
  /** Whether to jump to the last page after creating */
  afterInsert: () => {
    const pager = xGridDom.value?.getProxyInfo()?.pager
    if (pager) {
      const currentTotal = pager.currentPage * pager.pageSize
      if (currentTotal === pager.total) {
        ++pager.currentPage
      }
    }
  },
  /** Delete */
  onDelete: (row: RowMeta) => {
    const tip = `Confirm <strong style="color: var(--el-color-danger);"> delete </strong> user <strong style="color: var(--el-color-primary);"> ${row.username} </strong> ?`
    const config: ElMessageBoxOptions = {
      type: "warning",
      showClose: true,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Confirm",
      dangerouslyUseHTMLString: true
    }
    ElMessageBox.confirm(tip, "Prompt", config).then(() => {
      tablesService.deleteTable(row.id).then(() => {
        ElMessage.success("Deleted successfully")
        crudStore.afterDelete()
        crudStore.commitQuery()
      })
    })
  },
  /** Whether to return to the previous page after deleting */
  afterDelete: () => {
    const tableData: RowMeta[] = xGridDom.value!.getData()
    const pager = xGridDom.value?.getProxyInfo()?.pager
    if (pager && pager.currentPage > 1 && tableData.length === 1) {
      --pager.currentPage
    }
  },
  /** More custom methods */
  moreFn: () => {}
})
// #endregion
</script>

<template>
  <div class="app-container">
    <el-alert
      title="Data source"
      type="success"
      description="Online Mock provided by Apifox; the data is not real and is only for simple CRUD operation demonstration"
      show-icon
    />
    <el-alert
      title="Note"
      type="warning"
      description="The Vxe Table version corresponding to this example is compatible up to 4.6.25"
      show-icon
    />
    <!-- Table -->
    <vxe-grid ref="xGridDom" v-bind="xGridOpt">
      <!-- Left button list -->
      <template #toolbar-btns>
        <vxe-button status="primary" icon="vxe-icon-add" @click="crudStore.onShowModal()">
          Add user
        </vxe-button>
        <vxe-button status="danger" icon="vxe-icon-delete">
          Batch delete
        </vxe-button>
      </template>
      <!-- Role column -->
      <template #role-column="{ row, column }">
        <el-tag
          :type="row[column.field] === 'admin' ? 'primary' : 'warning'"
          effect="plain"
        >
          {{ row[column.field] }}
        </el-tag>
      </template>
      <!-- Status column -->
      <template #status-column="{ row, column }">
        <el-tag
          :type="row[column.field] ? 'success' : 'danger'"
          effect="plain"
        >
          {{ row[column.field] ? "Enabled" : "Disabled" }}
        </el-tag>
      </template>
      <!-- Actions -->
      <template #row-operate="{ row }">
        <el-button link type="primary" @click="crudStore.onShowModal(row)">
          Edit
        </el-button>
        <el-button link type="danger" @click="crudStore.onDelete(row)">
          Delete
        </el-button>
      </template>
    </vxe-grid>
    <!-- Modal -->
    <vxe-modal ref="xModalDom" v-bind="xModalOpt">
      <!-- Form -->
      <vxe-form ref="xFormDom" v-bind="xFormOpt" />
    </vxe-modal>
  </div>
</template>

<style lang="scss" scoped>
.el-alert {
  margin-bottom: 20px;
}
</style>
