import {Checkbox} from "antd";
import React, {useContext} from "react";
import {GridContext} from "@/components/BjhAgGrid";
import styles from '../header/style.module.less';

const RowIndexHeader = ({api}: any) => {

  const {indeterminate, setIndeterminate, checkAll, setCheckAll} = useContext(GridContext);

  const onCheckedChange = () => {
    setCheckAll(!checkAll)
    setIndeterminate(false);
    if (checkAll) {
      api.deselectAll()
    } else {
      api.selectAll()
    }
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
