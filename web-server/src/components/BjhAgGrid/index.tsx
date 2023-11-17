import {useContext, useEffect, useMemo, useRef, useState} from "react";
import GridHeader from "@/components/BjhAgGrid/header";
import GridToolBar from "@/components/BjhAgGrid/toolbar";
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';

import 'ag-grid-enterprise';
import {LicenseManager} from 'ag-grid-enterprise';

import './style.less';
import {Spin} from "antd";
import {LayoutContext} from "@/layouts";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import {RecordApi} from "@/services/datasheet/Record";
import dayjs from "dayjs";
import {useQueryUsers} from "@/models/unitState";
import FileAssetEditor from "@/components/BjhAgGrid/cell/FileAssetEditor";
import FileAssetCell from "@/components/BjhAgGrid/cell/FileAssetCell";
import SelectCell from "@/components/BjhAgGrid/cell/SelectCell";
import SelectEditor from "@/components/BjhAgGrid/cell/SelectEditor";
import MemberCell from "@/components/BjhAgGrid/cell/MemberCell";
import MemberEditor from "@/components/BjhAgGrid/cell/MemberEditor";
import {useQueryRecords} from "@/models/recordState";
import {
  addFieldCol,
  ColDef,
  Column,
  defaultColDef,
  Field,
  getCellConf,
  rowIndexCol
} from "@/components/BjhAgGrid/constants";

LicenseManager.prototype.validateLicense = () => true
LicenseManager.prototype.isDisplayWatermark = () => false

const BjhAgGrid = () => {

  const gridRef = useRef<any>(null); // Optional - for accessing Grid's API
  const {
    dstId,
    checkAll, setCheckAll,
    checkedList, setCheckedList,
    view, setView,
    fieldMap,
    datasheet,
    setIndeterminate,
    rowHeight,
    setFieldVisible,
    setFieldWidth,
    handleSubmitDatasheet,
  } = useGrid();

  const {data: users} = useQueryUsers();

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

      console.log(`RecordApi update ${dstId} ${recId} ${fieldId}: ${value}`)
      RecordApi(dstId).updateBatch({type: 'fieldId', records})
    }
  }

  const {loading, rowData, handleGetRecords} = useQueryRecords(dstId)
  useEffect(() => {
    handleGetRecords(view?.filterInfo)
  }, [])

  useEffect(() => {
    gridRef?.current?.api && gridRef?.current?.api?.resetRowHeights();
  }, [rowHeight])

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

  useEffect(() => {
    handleSubmitDatasheet()
  }, [datasheet])

  return (
    <div className="bjh-grid-body">

      <GridToolBar/>

      <Spin spinning={loading}>
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
