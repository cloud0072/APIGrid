import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
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
import {useQueryDatasheet} from "@/models/datasheetState";
import {useParams} from "react-router-dom";
import {useQueryRecords} from "@/models/recordState";

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
  checkAll: false,
  setCheckAll: (bol: boolean) => {
  },
  indeterminate: false,
  setIndeterminate: (bol: boolean) => {
  },
  checkedList: [],
  onSelectedRows: () => {
  },
  rowHeightLevel: 1,
  setRowHeightLevel: (height: number) => {
  },
  rowData: [],
  fieldMap: {},
  createFieldMap: () => {
  },
  updateFieldMap: () => {
  },
  removeFieldMap: () => {
  },
  view: {},
  setView: (view: View) => {
  },
} as any);
// getTableInfo
const BjhAgGrid = () => {


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

  const {nodeId: dstId} = useParams();
  const {data: rowData, isLoading} = useQueryRecords(dstId!);
  const {data: datasheet} = useQueryDatasheet(dstId!);
  const [viewId, setViewId] = useState<string>('');
  const [views, setViews] = useState<View[]>([]);
  const [fieldMap, setFieldMap] = useState<any>({});
  useEffect(() => {
    if (datasheet) {
      console.log('on datasheet', datasheet)
      setViews(datasheet?.views);
      setViewId(datasheet?.views[0]?.id)
      setFieldMap(datasheet?.fieldMap)
    }
  }, [datasheet])

  const view = useMemo<View>(() => {
    return views?.find(v => v.id === viewId) ?? {} as any;
  }, [views, viewId]);
  const {
    rowHeightLevel,
    columns,
    groupInfo
  } = view;
  const setView = (view: View) => {
    console.log('setView', view)
    setViews((views: View[]) => {
      return views.map(v => v.id === view.id ? view : v)
    })
  }

  const {height} = useContext(LayoutContext);
  const gridStyle = useMemo<any>(() => ({height: `${height - 24 - 48}px`, width: '100%'}), [height]);

  const localColDefs = useMemo<ColDef[]>(() => {
    const local = columns?.map(({fieldId, hidden}, index) => {
      const flag = !!groupInfo?.find(col => col.fieldId === fieldId);
      const field = fieldMap[fieldId] as Field;
      return {
        field: fieldId,
        rowGroup: flag,
        hide: hidden || flag,
        headerName: field.name,
        sortIndex: index + 1,
        ...defaultColDef
      }
    }) || [];
    return rowIndexCol.concat(local).concat(addFieldCol);
  }, [fieldMap, views])

  const rowHeight = useMemo(() => {
    const i = rowHeightLevel >= 0 ? rowHeightLevel : 0;
    // console.log('rowHeight', RowHeightItems[i].height);
    return RowHeightItems[i].height;
  }, [rowHeightLevel])

  useEffect(() => {
    // console.log(`rowHeight:${rowHeight}`)
    gridRef?.current?.api && gridRef?.current?.api?.resetRowHeights();
  }, [rowHeight])

  const createFieldMap = useCallback((fieldInfo: Field) => {
    setFieldMap(Object.assign(fieldMap, fieldInfo))
    setViews(views?.map(v => {
      v.columns.push({fieldId: fieldInfo.id})
      return v;
    }))
  }, [views, viewId, fieldMap])
  const updateFieldMap = useCallback((fieldInfo: Field) => {
    setFieldMap(Object.assign(fieldMap, fieldInfo))
  }, [views, viewId])
  const removeFieldMap = useCallback((fieldId: string) => {
    delete fieldMap[fieldId]
    setFieldMap(fieldMap)
    setViews(views?.map(v => {
      v.columns = v.columns.filter(f => f.fieldId != fieldId)
      return v;
    }))
  }, [views, viewId])

  const getId = (params: any) => params.data.recId;

  return (
    <div className="bjh-grid-body">
      <GridContext.Provider value={{
        checkAll,
        setCheckAll,
        indeterminate,
        setIndeterminate,
        checkedList,
        onSelectedRows,
        rowData,
        fieldMap,
        createFieldMap,
        removeFieldMap,
        updateFieldMap,
        view,
        setView,
      }}>
        <GridToolBar/>

        <Spin spinning={isLoading}>
          <div className="ag-theme-alpine" style={gridStyle}>
            {datasheet ? <AgGridReact
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
            /> : null}
          </div>
        </Spin>
      </GridContext.Provider>
    </div>
  );
};

export default BjhAgGrid;
