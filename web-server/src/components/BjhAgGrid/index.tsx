import {useContext, useEffect, useMemo, useRef, useState} from "react";
import GridHeader from "@/components/BjhAgGrid/header";
import GridToolBar from "@/components/BjhAgGrid/toolbar";
import RowIndexCell from '@/components/BjhAgGrid/cell/RowIndexCell'
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
import {RecordApi} from "@/services/datasheet/Record";
import dayjs from "dayjs";
import {useQueryUsers} from "@/models/unitState";
import FileAssetEditor from "@/components/BjhAgGrid/cell/FileAssetEditor";
import FileAssetCell from "@/components/BjhAgGrid/cell/FileAssetCell";

LicenseManager.prototype.validateLicense = () => true
LicenseManager.prototype.isDisplayWatermark = () => false

export type Column = {
  fieldId: string,
  desc?: boolean,
  hidden?: boolean,
  statType?: number,
  width?: number,
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
  rowGroup?: boolean,
  suppressNavigable?: boolean,
  headerName?: string,
  cellClass?: string,
  pinned?: ("left" | "right"),
  lockPosition?: ("left" | "right"),
  cellRenderer?: any
}

export const defaultColDef = {
  sortable: true,
  resizable: true,
  editable: true,
  lockPinned: true,
};

const rowIndexCol: ColDef[] = [{
  field: "row_index",
  width: 80,
  editable: false,
  sortable: false,
  resizable: false,
  lockPinned: true,
  lockPosition: 'left',
  suppressNavigable: true,
  cellClass: 'no-focus-border',
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
  cellClass: 'no-focus-border'
}];
// public enum FieldType
export const FieldTypeOptions = [
  {value: 1, label: '单行文本'},
  {value: 10, label: '多行文本'},
  {value: 2, label: '数字'},
  {value: 3, label: '日期'},
  {value: 4, label: '选项'},
  {value: 5, label: '附件'},
  {value: 6, label: '成员'},
  {value: 11, label: '勾选'},
  {value: 20, label: '自增数字'},
  {value: 21, label: '创建时间'},
  {value: 22, label: '修改时间'},
  {value: 23, label: '创建人'},
  {value: 24, label: '修改人'},
]

const dateFormatter = (date: any) => dayjs(date).format('YYYY-MM-DD');

const getCellConf = (field: any, users?: any[]) => {
  const {type, property} = field;
  // if (type == 6 || type == 23 || type == 24) {
  //   const users = useAtomValueUsers();
  //   console.log('users', users)
  // }
  switch (type) {
    case 1:
      return {
        cellEditor: 'agTextCellEditor'
      }
    case 2:
      return {
        cellEditor: 'agNumberCellEditor'
      }
    case 3:
      return {
        cellEditor: 'agDateStringCellEditor',
        valueFormatter: (params: any) => params.value ? dateFormatter(params.value) : params.value
      }
    case 4:
      return {
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
          values: property?.options?.map((opt: any) => opt.id) || [],
          filterList: true,
          cellHeight: 32,
        },
        valueFormatter: (params: any) => property?.options?.find((opt: any) => opt.id === params.value)?.name,
      }
    case 5:
      return {
        valueFormatter: (params: any) => params.value ? params.value.join(',') : '',
        cellRenderer: FileAssetCell,
        cellEditor: FileAssetEditor,
      }
    case 6:
      return {
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
          values: users?.map((opt: any) => opt.id) || [],
          filterList: true,
          cellHeight: 32,
        },
        valueFormatter: (params: any) => users?.find((opt: any) => opt.id === params.value)?.name,
      }
    case 10:
      return {
        cellEditor: 'agLargeTextCellEditor',
        cellEditorPopup: true,
      }
    case 11:
      return {
        cellEditor: 'agCheckboxCellEditor',
        cellRenderer: 'agCheckboxCellRenderer'
      }
    case 20:
      return {
        editable: false,
      }
    case 21:
      return {
        editable: false,
        valueFormatter: (params: any) => dateFormatter(params.data.createTime)
      }
    case 22:
      return {
        editable: false,
        valueFormatter: (params: any) => dateFormatter(params.data.updateTime)
      }
    case 23:
      return {
        editable: false,
        valueFormatter: (params: any) => users?.find(u => u.id === params.data.createBy)?.name
      }
    case 24:
      return {
        editable: false,
        valueFormatter: (params: any) => users?.find(u => u.id === params.data.updateBy)?.name
      }
    default:
      return {}
  }
}

const BjhAgGrid = () => {

  const gridRef = useRef<any>(null); // Optional - for accessing Grid's API
  const {nodeId} = useParams() as any;
  const {
    dstId, setDstId,
    viewId, setViewId,
    checkAll, setCheckAll,
    checkedList, setCheckedList,
    rowData, setRowData,
    view, setView,
    fieldMap,
    datasheet, setDatasheet,
    setIndeterminate,
    rowHeight,
    setFieldVisible,
    setFieldWidth,
    handleSaveDst
  } = useGrid();

  const {data: rowList, isLoading} = useQueryRecords(nodeId!);
  const {data: dstMeta} = useQueryDatasheet(nodeId!);
  const {data: users} = useQueryUsers();

  const [loaded, setLoaded] = useState<boolean>(false);

  const {height} = useContext(LayoutContext);
  const gridStyle = useMemo<any>(() => ({height: `${height - 24 - 48}px`, width: '100%'}), [height]);

  const colDefs = useMemo<ColDef[]>(() => {
    const local = view?.columns?.map((column, index) => {
      const {fieldId, hidden, width} = column;
      const flag = !!view?.groupInfo?.find(col => col.fieldId === fieldId);
      const field = fieldMap[fieldId] as Field;
      const cellConf = getCellConf(field, users);
      return {
        field: fieldId,
        width: width || 160,
        hide: hidden || flag,
        headerName: field.name,
        sortIndex: index + 1,
        rowGroup: flag,
        ...cellConf
      } as ColDef
    }) || [];
    return rowIndexCol.concat(local).concat(addFieldCol);
  }, [datasheet])

  const handleColumnMoved = (e: any) => {
    const {finished, toIndex, column} = e
    if (column && finished) {
      const columns = JSON.parse(JSON.stringify(view.columns)) as Column[]
      const index = columns.findIndex(col => col.fieldId === column.colId);
      const col = columns[index];
      columns.splice(index, 1);
      columns.splice(toIndex - 1, 0, col);
      setView(Object.assign({}, view, {columns}))
    }
  }

  const handleColumnVisible = (e: any) => {
    const {visible, column} = e
    if (column) {
      setFieldVisible(column.colId, !visible)
    }
  }

  const handleColumnResized = (e: any) => {
    const {finished, column} = e
    if (column && finished) {
      setFieldWidth(column.colId, column.actualWidth)
    }
  }

  const handleCellValueChanged = (e: any) => {
    const {column, data, value} = e;
    // TODO: 发送给后端计算，然后获取新的行数据替换旧数据
    if (column) {
      const fieldId = column.colId as string;
      const recId = data.recId;
      const records = [{recId, [fieldId]: value}]

      console.log(`RecordApi update ${nodeId} ${recId} ${fieldId}: ${value}`)
      RecordApi(nodeId).updateBatch({type: 'fieldId', records})
    }
  }

  useEffect(() => {
    if (dstMeta) {
      console.log('init datasheet', dstMeta)
      const {views} = dstMeta;
      // const hasUsers = Object.keys(fieldMap)
      //   .map(key => fieldMap[key])
      //   .filter(field => [6, 23, 24].indexOf(field.type) >= 0).length > 0;
      // if (hasUsers) {
      // }
      setDatasheet(() => {
        setTimeout(() => {
          setLoaded(true)
        }, 100)
        return dstMeta
      })
      setViewId(views?.[0]?.id)
    }
  }, [dstMeta])

  useEffect(() => {
    if (loaded) {
      handleSaveDst()
    }
  }, [datasheet])

  useEffect(() => {
    setRowData(rowList)
  }, [rowList])

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

      <GridToolBar/>

      <Spin spinning={isLoading}>
        <div className="ag-theme-alpine" style={gridStyle}>
          <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={colDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            getRowHeight={() => rowHeight}
            getRowId={(params: any) => params.data.recId}
            onColumnMoved={handleColumnMoved}
            onColumnVisible={handleColumnVisible}
            onColumnResized={handleColumnResized}
            onCellValueChanged={handleCellValueChanged}
            rowSelection='multiple' // Options - allows click selection of rows
            groupDisplayType={'multipleColumns'}
            suppressRowClickSelection={true}
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            components={{agColumnHeader: GridHeader}}
          />
        </div>
      </Spin>
    </div>
  );
};

export default BjhAgGrid;
