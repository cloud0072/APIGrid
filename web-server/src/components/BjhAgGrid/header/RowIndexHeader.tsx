import {Checkbox} from "antd";
import React from "react";
import styles from '../header/style.module.less';
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import {useEditModal} from "@/components/BjhAgGrid/hooks/useEditModal";
import {IHeaderParams} from "ag-grid-community";

const RowIndexHeader = (params: IHeaderParams ) => {
  const {api} = params;
  const {indeterminate, setIndeterminate, checkAll, setCheckAll} = useGrid();

  const onCheckedChange = () => {
    if (checkAll) {
      api.deselectAll()
    } else {
      api.selectAll()
    }
    setCheckAll(!checkAll)
    setIndeterminate(false);
  }

  return (
    <div className={styles.rowIndex}>
      <div className={styles.rowIndexCheckbox}>
        <Checkbox checked={checkAll} indeterminate={indeterminate} onChange={onCheckedChange}/>
      </div>
    </div>
  )
}

export default RowIndexHeader;
