import type { App } from "vue"
import VXETable from "vxe-table" // https://vxetable.cn/#/start/install

// Global default parameters
VXETable.setConfig({
  // Global size
  size: "medium",
  // Global zIndex starting value; if the project's z-index style values are too large, set this larger accordingly to avoid being covered
  zIndex: 9999,
  // Version number; useful for some features with data caching, and incrementing the version number can reset the data
  version: 0,
  // Global loading tip text; if null, no text is shown
  loadingText: null,
  table: {
    showHeader: true,
    showOverflow: "tooltip",
    showHeaderOverflow: "tooltip",
    autoResize: true,
    // stripe: false,
    border: "inner",
    // round: false,
    emptyText: "No data",
    rowConfig: {
      isHover: true,
      isCurrent: true,
      // Field name of the unique primary key of row data
      keyField: "_VXE_ID"
    },
    columnConfig: {
      resizable: false
    },
    align: "center",
    headerAlign: "center"
  },
  pager: {
    // size: "medium",
    // Matching styles
    perfect: false,
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [10, 20, 50],
    layouts: ["Total", "PrevJump", "PrevPage", "Number", "NextPage", "NextJump", "Sizes", "FullJump"]
  },
  modal: {
    minWidth: 500,
    minHeight: 400,
    lockView: true,
    mask: true,
    // duration: 3000,
    // marginSize: 20,
    dblclickZoom: false,
    showTitleOverflow: true,
    transfer: true,
    draggable: false
  }
})

export function installVxeTable(app: App) {
  // Full import of the Vxe Table component
  app.use(VXETable)
}
