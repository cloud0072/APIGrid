import {useContext, useEffect, useState} from "react";
import {Checkbox, theme} from "antd";
import {GridContext} from '../index';
import IconFont from "@/components/IconFont";
import styles from '../header/style.module.less';

const RowIndexCell = ({node}: any) => {
  const {useToken} = theme;
  const {token} = useToken();

  const {checkAll, indeterminate, onSelectedRows} = useContext(GridContext);
  const [checked, setChecked] = useState(false)
  const onChange = () => {
    setChecked((oldValue) => {
      node.setSelected(!oldValue);
      onSelectedRows();
      return !oldValue
    })
  }

  // 全选控制行选
  useEffect(() => {
    if (!indeterminate) {
      setChecked(() => {
        // console.log('RowIndexCell oldValue', oldValue)
        node.setSelected(checkAll);
        return checkAll
      })
    }
  }, [checkAll, indeterminate])

  return (
    <div className={styles.rowIndex}>
      <div className={styles.rowIndexCheckbox}>
        <Checkbox onChange={onChange} checked={checked}/>
      </div>
      <div className={`${styles.rowIndexIcon} ${checked ?? styles.checked}`}>
        <IconFont type="adms-fangda" style={{color: token.colorTextSecondary}}/>
      </div>
    </div>
  )
}

export default RowIndexCell;
