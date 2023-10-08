import {useContext, useEffect, useState} from "react";
import {Checkbox, theme} from "antd";
import IconFont from "@/components/IconFont";
import styles from '../header/style.module.less';
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import {ICellRendererParams} from "ag-grid-community";

const RowIndexCell = (params: ICellRendererParams) => {
  const {node, data} = params;
  const {useToken} = theme;
  const {token} = useToken();

  const {checkAll, indeterminate, setCheckedList} = useGrid();
  const [checked, setChecked] = useState(false)

  // 单选控制
  const onChange = (e: any) => {
    const checked = e.target.checked
    node.setSelected(checked);
    setChecked(checked)
    setCheckedList(prev => checked ? prev.concat([data]) : prev.filter(i => i._id != data._id))
  }

  // 全选控制行选
  useEffect(() => {
    if (!indeterminate) {
      node.setSelected(checkAll);
      setChecked(checkAll)
    }
  }, [checkAll, indeterminate])

  return (
    <div className={styles.rowIndex}>
      <div className={styles.rowIndexCheckbox}>
        <Checkbox checked={checked} onChange={onChange}/>
      </div>
      <div className={`${styles.rowIndexIcon} ${checked ?? styles.checked}`}>
        <IconFont type="adms-fangda" style={{color: token.colorTextSecondary}}/>
      </div>
    </div>
  )
}

export default RowIndexCell;
