import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import BjhAgGridHeader from "@/components/BjhAgGrid/BjhAgGridHeader";
import BjhAgGridToolBar from "@/components/BjhAgGrid/BjhAgGridToolBar";

import IdCellRenderer from './CellRender/IdCellRenderer'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {LicenseManager} from 'ag-grid-enterprise';

import './style.less';
import {Spin} from "antd";
import {LayoutContext} from "@/layouts";

LicenseManager.prototype.validateLicense = () => true

const indexCol = [{
  field: "index",
  width: 80,
  editable: false,
  resizable: false,
  lockPinned: true,
  pinned: "left",
  suppressNavigable: true,
  cellClass: 'no-border',
  cellRenderer: IdCellRenderer
}];

// let rowHeight = 34;
export const voidFC = () => {
};
export const GridContext = createContext({
  checkAll: false,
  setCheckAll: voidFC,
  indeterminate: false,
  setIndeterminate: voidFC,
  checkedList: [],
  onSelectedRows: voidFC,
  rowHeight: 34,
  setRowHeight: voidFC,
  tableColumns: [],
  setTableColumns: voidFC,
  rowData: [],
  setRowData: voidFC,
  colDefsList: [],
  setColDefsList: voidFC,
  colGroupsList: [],
  setColGroupsList: voidFC,
});

const BjhAgGrid = ({getTableInfo, loadData, getRowId}) => {
  const gridRef = useRef(null); // Optional - for accessing Grid's API

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

  const [rowData, setRowData] = useState([]);
  const [tableInfo, setTableInfo] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [spinning, setSpinning] = useState(false);

  const {height} = useContext(LayoutContext);
  const gridStyle = useMemo(() => ({height: `${height - 24 - 48}px`, width: '100%'}), [height]);
  // const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), [])
  // console.log('gridStyle', gridStyle)

  const [colDefsList, setColDefsList] = useState([]);
  const [colGroupsList, setColGroupsList] = useState([]);
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    editable: true,
    lockPinned: true,
  }), []);
  const localColDefs = useMemo(() => {
    const local = indexCol.concat(colDefsList)
      .filter(col => !col.hide)
      .map((col, index) => {
        const flag = !!colGroupsList.find(gi => gi.field === col.field);
        const i = colGroupsList.findIndex(gi => gi.field === col.field);
        return Object.assign(col, {rowGroup: flag, hide: flag, i: (i - colGroupsList.length || index)})
      })
      .sort((o1, o2) => o1.i - o2.i)
      .map(col => {
        delete col.i
        return col;
      })
    // console.log('localColDefs', local)
    return local;
  }, [colDefsList, colGroupsList])

  const [rowHeight, setRowHeight] = useState(34)
  useEffect(() => {
    // console.log(`rowHeight:${rowHeight}`)
    gridRef.current.api && gridRef.current.api.resetRowHeights();
  }, [rowHeight])

  const getRowHeight = useCallback(() => {
    return rowHeight;
  }, [rowHeight])

  const getId = params => params.data.id;

  // 页面加载
  // 1 获取tableInfo
  useEffect(() => {
    getTableInfo().then(response => {
      setTableInfo((info) => response.tableInfo || info)
      setTableColumns(() => response.tableColumns || [])

      const currentView = response.viewList.find(view => view.lastOpen || view.viewId === '1');
      setColDefsList(() => currentView?.colDefsList || [])
      setColGroupsList(() => currentView?.colGroupsList || [])
    })
  }, [])

  const getRowData = () => {
    const start = Date.now()
    setSpinning(true)
    loadData().then(response => {
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
        checkedList,
        onSelectedRows,
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
      }}>
        <BjhAgGridToolBar/>

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
              // suppressCellFocus={true}
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              components={{agColumnHeader: BjhAgGridHeader}}
            />
          </div>
        </Spin>
      </GridContext.Provider>
    </div>
  );
};

export default BjhAgGrid;
