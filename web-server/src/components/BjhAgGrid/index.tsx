import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import GridHeader from "@/components/BjhAgGrid/header";
import GridToolBar from "@/components/BjhAgGrid/toolbar";
import RowIndexCell from '@/components/BjhAgGrid/cell/RowIndexCell'
import AddFieldCell from "@/components/BjhAgGrid/cell/AddFieldCell";
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';

import 'ag-grid-enterprise';
import {LicenseManager} from 'ag-grid-enterprise';

import './style.less';
import {Spin} from "antd";
import {LayoutContext} from "@/layouts";

LicenseManager.prototype.validateLicense = () => true

type FieldConfig = {
  field?: string,
  width?: number,
  editable?: boolean,
  resizable?: boolean,
  sortable?: boolean,
  lockPinned?: boolean,
  hide?: boolean,
  suppressNavigable?: boolean,
  headerName?: string,
  cellClass?: string,
  pinned?: ("left" | "right"),
  lockPosition?: ("left" | "right"),
  cellRenderer?: React.FC
}

const rowIndexCol: FieldConfig[] = [{
  field: "row_index",
  width: 80,
  editable: false,
  resizable: false,
  lockPinned: true,
  pinned: "left",
  suppressNavigable: true,
  cellClass: 'no-border',
  cellRenderer: RowIndexCell
}];

const addFieldCol: FieldConfig[] = [{
  field: "add_field",
  width: 80,
  editable: false,
  resizable: false,
  sortable: false,
  lockPinned: true,
  lockPosition: 'right',
  suppressNavigable: true,
  cellClass: 'no-border',
  cellRenderer: AddFieldCell
}];

// let rowHeight = 34;

export const GridContext = createContext({
  checkAll: false,
  indeterminate: false,
  checkedList: [],
  rowHeight: 34,
  tableColumns: [],
  rowData: [],
  colDefsList: [],
  colGroupsList: [],
  setCheckAll: (bol: boolean) => {
  },
  setIndeterminate: (bol: boolean) => {
  },
  onSelectedRows: () => {
  },
  setRowHeight: (height: number) => {
  },
  setTableColumns: (data: any[]) => {
  },
  setRowData: (data: any[]) => {
  },
  setColDefsList: (data: any[]) => {
  },
  setColGroupsList: (data: any[]) => {
  },
} as any);

const BjhAgGrid = ({getTableInfo, loadData, getRowId}: any) => {
  const gridRef = useRef<any>(null); // Optional - for accessing Grid's API

  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const onSelectedRows = () => {
    const api = gridRef.current?.api;
    const selectedRows = api?.getSelectedRows();
    const pageSize = api?.paginationGetPageSize();
    setCheckedList(() => selectedRows);
    if (selectedRows.length === 0) {
      setCheckAll(false)
      setIndeterminate(false)
    } else if (selectedRows.length < pageSize) {
      setCheckAll(false)
      setIndeterminate(true)
    } else if (selectedRows.length === pageSize) {
      setCheckAll(true)
      setIndeterminate(false)
    }
  }

  const [rowData, setRowData] = useState<any[]>([]);
  const [tableInfo, setTableInfo] = useState<any[]>([]);
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  const [spinning, setSpinning] = useState<boolean>(false);

  const {height} = useContext(LayoutContext);
  const gridStyle = useMemo<any>(() => ({height: `${height - 24 - 48}px`, width: '100%'}), [height]);
  // const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), [])
  // console.log('gridStyle', gridStyle)

  const [colDefsList, setColDefsList] = useState<FieldConfig[]>([]);
  const [colGroupsList, setColGroupsList] = useState<FieldConfig[]>([]);
  const defaultColDef = useMemo<FieldConfig>(() => ({
    sortable: true,
    resizable: true,
    editable: true,
    lockPinned: true,
  }), []);
  const localColDefs = useMemo<FieldConfig[]>(() => {
    const local = colDefsList
      .filter(col => !col.hide)
      .map((col, index) => {
        const flag = !!colGroupsList.find(gi => gi.field === col.field);
        const i = colGroupsList.findIndex(gi => gi.field === col.field);
        return Object.assign(col, {rowGroup: flag, hide: flag, i: (i - colGroupsList.length || index)})
      })
      .sort((o1, o2) => o1.i - o2.i)
      .map(col => {
        // @ts-ignore
        delete col.i
        return col;
      })
    // console.log('localColDefs', local)
    return rowIndexCol.concat(local).concat(addFieldCol);
  }, [colDefsList, colGroupsList])

  const [rowHeight, setRowHeight] = useState(34)
  useEffect(() => {
    // console.log(`rowHeight:${rowHeight}`)
    gridRef.current.api && gridRef.current.api.resetRowHeights();
  }, [rowHeight])

  const getRowHeight = useCallback(() => {
    return rowHeight;
  }, [rowHeight])

  const getId = (params: any) => params.data.id;

  // 页面加载
  // 1 获取tableInfo
  useEffect(() => {
    getTableInfo().then((response: any) => {
      setTableInfo((info) => response.tableInfo || info)
      setTableColumns(() => response.tableColumns || [])

      const currentView = response.viewList.find((view: any) => view.lastOpen || view.viewId === '1');
      setColDefsList(() => currentView?.colDefsList || [])
      setColGroupsList(() => currentView?.colGroupsList || [])
    })
  }, [])

  const getRowData = () => {
    const start = Date.now()
    setSpinning(true)
    loadData().then((response: any) => {
      setRowData(() => response)
    }).finally(() => {
      setSpinning(false)
      const msg = `请求加载完毕,耗时:${Date.now() - start}毫秒`;
      console.log(msg);
    })
  }

  useEffect(() => {
    if (gridRef && loadData) {
      getRowData();
    }
  }, [gridRef])

  return (
    <div className="bjh-grid-body">
      <GridContext.Provider value={{
        checkAll,
        setCheckAll,
        indeterminate,
        setIndeterminate,
        rowHeight,
        setRowHeight,
        tableColumns,
        setTableColumns,
        rowData,
        setRowData,
        colDefsList,
        setColDefsList,
        colGroupsList,
        setColGroupsList,
        checkedList,
        onSelectedRows,
      }}>
        <GridToolBar/>

        <Spin spinning={spinning}>
          <div className="ag-theme-alpine" style={gridStyle}>
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              rowData={rowData} // Row Data for Rows
              columnDefs={localColDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              getRowHeight={getRowHeight}
              getRowId={getRowId || getId}
              rowSelection='multiple' // Options - allows click selection of rows
              groupDisplayType={'multipleColumns'}
              suppressRowClickSelection={true}
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              components={{agColumnHeader: GridHeader}}
            />
          </div>
        </Spin>
      </GridContext.Provider>
    </div>
  );
};

export default BjhAgGrid;
