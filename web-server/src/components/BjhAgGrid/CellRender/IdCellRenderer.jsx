import {useContext, useEffect, useState} from "react";
import {Checkbox, theme} from "antd";
import {GridContext} from '../index';
import IconFont from "@/components/IconFont";

const IdCellRenderer = (props) => {
  const {node} = props;
  const {useToken} = theme;
  const {token} = useToken();

  const [active, setActive] = useState(false)
  const onMouseOver = (e) => {
    setActive(true)
  }
  const onMouseLeave = (e) => {
    setActive(false)
  }

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
        // console.log('IdCellRenderer oldValue', oldValue)
        node.setSelected(checkAll);
        return checkAll
      })
    }
  }, [checkAll, indeterminate])

  return (
    <div className="bjh-row-index" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <div className="bjh-row-index-checkbox">
        <Checkbox onChange={onChange} checked={checked}/>
      </div>
      {(active || checked) && <div className="bjh-row-index-icon">
        <IconFont type="adms-fangda" style={{color: token.colorTextSecondary}}/>
      </div>}
    </div>
  )
}

export default IdCellRenderer;
