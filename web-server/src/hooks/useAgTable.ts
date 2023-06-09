import {useCallback, useEffect, useState} from "react";

export const useAgTable = (options: any) => {
  // const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([])
  const [rowData, setRowData] = useState<any[]>([]);
  const [rowHeight, setRowHeight] = useState(34)
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkedAll, setCheckedAll] = useState<boolean>(false)
  const [checkedRows, setCheckedRows] = useState<any[]>([])
  const [spinning, setSpinning] = useState<boolean>(false);
  const [tableConfig, setTableConfig] = useState<any>({})

  const getRowHeight = useCallback(() => {
    return rowHeight;
  }, [rowHeight])

  const getRowId = (params: any) => params.data.id;

  const loadTableConfig = async () => {
    const config = await options?.loadTableConfig()
    setTableConfig(() => config)
  }

  const loadData = async () => {
    const data = await tableConfig.loadData()
    setRowData(() => data)
  }

  useEffect(() => {
    loadTableConfig()
  }, [])

  useEffect(() => {
    loadData()
  }, [tableConfig.loadData])

  return {
    checkedAll,
    checkedRows,
    indeterminate,
    rowData,
    rowHeight,
    tableConfig,
    spinning,
    // set
    setCheckedAll,
    setCheckedRows,
    setIndeterminate,
    setRowData,
    setRowHeight,
    setTableConfig,
    setSpinning,
    // func
    getRowId,
    getRowHeight,
  }
}
