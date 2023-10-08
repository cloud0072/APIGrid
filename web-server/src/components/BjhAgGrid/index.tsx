import {createContext, useContext, useEffect, useMemo, useRef, useState} from "react";
import GridHeader from "@/components/BjhAgGrid/header";
import GridToolBar, {RowHeightItems} from "@/components/BjhAgGrid/toolbar";
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
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import {useQueryRecords} from "@/models/recordState";
import {useQueryDatasheet} from "@/models/datasheetState";
import {useParams} from "react-router-dom";

LicenseManager.prototype.validateLicense = () => true

export type Column = {
  fieldId: string,
  statType?: number,
  desc?: boolean,
  hidden?: boolean,
}

export type Field = {
  id: string,
  name: string,
  type: number,
  property?: {
    defaultValue?: string,
    precision?: number,
    symbolAlign?: number,
    options?: any[]
  }
}

export type View = {
  id: string,
  name: string,
  rowHeightLevel: number,
  frozenColumnCount: number,
  sortInfo?: Column[],
  groupInfo?: Column[],
  filterInfo?: Column[],
  columns: Column[],
}

export type ColDef = {
  sortIndex?: number,
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
  cellRenderer?: any
}

const rowIndexCol: ColDef[] = [{
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

const addFieldCol: ColDef[] = [{
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

const defaultColDef = {
  sortable: true,
  resizable: true,
  editable: true,
  lockPinned: true,
};

export const GridContext = createContext({
  rowData: [],
  fieldMap: {},
  setFieldMap: (fieldMap: any) => {
  },
  view: {},
  setView: (view: View) => {
  },
  views: [],
  setViews: (views: View[]) => {
  },
} as any);

const BjhAgGrid = () => {

  const gridRef = useRef<any>(null); // Optional - for accessing Grid's API
  const {nodeId} = useParams() as any;
  const {
    dstId, setDstId,
    viewId, setViewId,
    checkAll, setCheckAll,
    checkedList, setCheckedList,
    setRowData, setDatasheet,
    setIndeterminate
  } = useGrid();

  const {data: rowData, isLoading} = useQueryRecords(nodeId!);
  const {data: datasheet} = useQueryDatasheet(nodeId!);

  const {height} = useContext(LayoutContext);
  const gridStyle = useMemo<any>(() => ({height: `${height - 24 - 48}px`, width: '100%'}), [height]);

  const [fieldMap, setFieldMap] = useState<any>({});
  const [views, setViews] = useState<View[]>([]);
  const view = useMemo<View>(() => views?.find(v => v.id === viewId) ?? {} as any, [views, viewId]);

  const setView = (view: View) => {
    console.log('setView', view)
    setViews((views: View[]) => {
      return views.map(v => v.id === view.id ? view : v)
    })
  }

  const localColDefs = useMemo<ColDef[]>(() => {
    const local = view?.columns?.map(({fieldId, hidden}, index) => {
      const flag = view?.groupInfo?.find(col => col.fieldId === fieldId);
      const field = fieldMap[fieldId] as Field;
      return {
        ...defaultColDef,
        field: fieldId,
        hide: hidden || flag,
        headerName: field.name,
        rowGroup: flag,
        sortIndex: index + 1
      } as ColDef
    }) || [];
    return rowIndexCol.concat(local).concat(addFieldCol);
  }, [fieldMap, views])

  const rowHeight = useMemo(() => {
    const i = view ? view.rowHeightLevel : 0;
    return RowHeightItems[i].height;
  }, [view?.rowHeightLevel])

  const getId = (params: any) => params.data.recId;

  useEffect(() => {
    if (datasheet) {
      console.log('init datasheet', datasheet)
      const {views, fieldMap} = datasheet;
      setDatasheet(datasheet)
      setViews(views);
      setViewId(views?.[0]?.id)
      setFieldMap(fieldMap)
    }
  }, [datasheet])

  useEffect(() => {
    setRowData(rowData)
  }, [rowData])

  useEffect(() => {
    gridRef?.current?.api && gridRef?.current?.api?.resetRowHeights();
  }, [rowHeight])

  useEffect(() => {
    if (nodeId != dstId) {
      setDstId(nodeId)
    }
  }, [nodeId])

  useEffect(() => {
    setCheckAll(false)
  }, [dstId])

  useEffect(() => {
    setCheckedList(checkAll ? rowData : [])
  }, [checkAll])

  useEffect(() => {
    if (rowData?.length > 0) {
      if (checkedList.length === 0) {
        setCheckAll(false)
        setIndeterminate(false)
      } else if (checkedList.length < rowData.length) {
        setCheckAll(false)
        setIndeterminate(true)
      } else if (checkedList.length === rowData.length) {
        setCheckAll(true)
        setIndeterminate(false)
      }
    }
  }, [checkedList, rowData?.length])

  return (
    <div className="bjh-grid-body">
      <GridContext.Provider value={{
        rowData,
        fieldMap,
        setFieldMap,
        view,
        setView,
        views,
        setViews,
      }}>
        <GridToolBar/>

        <Spin spinning={isLoading}>
          <div className="ag-theme-alpine" style={gridStyle}>
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              rowData={rowData} // Row Data for Rows
              columnDefs={localColDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              getRowHeight={() => rowHeight}
              getRowId={getId}
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
