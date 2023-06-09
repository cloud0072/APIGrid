import {createContext, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import BjhAgGridHeader from "@/components/BjhAgGrid/BjhAgGridHeader";
import BjhAgGridToolBar from "@/components/BjhAgGrid/BjhAgGridToolBar";

import IdCellRenderer from './CellRender/IdCellRenderer'

import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';

import './style.less';
import {message, Spin} from "antd";
import {useResize} from "@/hooks/useResize";

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
export const GridCtx = createContext({
  checkAll: false,
  setCheckAll: undefined,
  indeterminate: true,
  setIndeterminate: undefined,
  rowHeight: 34,
  setRowHeight: undefined,
  tableColumns: [],
  setTableColumns: undefined,
  rowData: [],
  setRowData: undefined,
  colDefsList: [],
  setColDefsList: undefined,
  colGroupsList: [],
  setColGroupsList: undefined,
});

const BjhAgGrid = (props) => {
  const gridRef = useRef(null); // Optional - for accessing Grid's API
  const [rowHeight, setRowHeight] = useState(34)
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [tableInfo, setTableInfo] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [colDefsList, setColDefsList] = useState([]);
  const [colGroupsList, setColGroupsList] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const {pageSize} = useResize();
  const gridStyle = useMemo(() => ({height: `${pageSize.height - 48}px`, width: '100%'}), [pageSize]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    editable: true,
    lockPinned: true,
  }), []);

  const localColDefs = useMemo(() => {
    const local = indexCol.concat(colDefsList)
      .filter(col => !col.hidden)
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
    console.log('localColDefs', local)
    return local;
  }, [colDefsList, colGroupsList])

  useEffect(() => {
    // console.log(`rowHeight:${rowHeight}`)
    gridRef.current.api && gridRef.current.api.resetRowHeights();
  }, [rowHeight])

  const getRowHeight = useCallback(() => {
    return rowHeight;
  }, [rowHeight])

  const getRowId = params => params.data.id;

  // 页面加载
  // 1 获取tableInfo
  useEffect(() => {
    props.getTableInfo().then(response => {
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
    props.loadData().then(response => {
      setRowData(() => response)
    }).finally(() => {
      setSpinning(false)
      const end = Date.now()
      message.success(`请求加载完毕,耗时:${end - start}毫秒`, 6)
    })
  }

  useEffect(() => {
    if (gridRef && props.loadData) {
      getRowData();
    }
  }, [gridRef])

  return (
    <div className="bjh-grid-body">
      <GridCtx.Provider value={{
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
              getRowId={props.getRowId || getRowId}
              rowSelection='multiple' // Options - allows click selection of rows
              groupDisplayType={'multipleColumns'}
              suppressRowClickSelection={true}
              // suppressCellFocus={true}
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              components={{agColumnHeader: BjhAgGridHeader}}
            />
          </div>
        </Spin>
      </GridCtx.Provider>
    </div>
  );
};

export default BjhAgGrid;
