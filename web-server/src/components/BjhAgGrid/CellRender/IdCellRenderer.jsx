import {useContext, useEffect, useState} from "react";
import {Checkbox, theme} from "antd";
import {GridCtx} from '../index';
import IconFont from "@/components/IconFont";

const IdCellRenderer = (props) => {
  const grid = useContext(GridCtx);
  const {useToken} = theme;
  const {token} = useToken();

  const [active, setActive] = useState(false)
  const [checked, setChecked] = useState(false)

  const onChange = () => {
    setChecked((oldValue) => {
      // console.log('IdCellRenderer oldValue', oldValue)
      props.node.setSelected(!oldValue);
      return !oldValue
    })
  }
  const onMouseOver = (e) => {
    setActive(true)
    // console.log('onMouseEnter', e)
  }
  const onMouseLeave = (e) => {
    setActive(false)
    // console.log('onMouseLeave', e)
  }

  // 全选控制行选
  useEffect(() => {
    setChecked(() => {
      // console.log('IdCellRenderer oldValue', oldValue)
      props.node.setSelected(grid.checkAll);
      return grid.checkAll
    })
  }, [grid.checkAll])

  //控制半选
  useEffect(() => {
    const count = props.api.getSelectedNodes().length;
    const pageSize = props.api.paginationGetPageSize();
    const indeterminate = !!count && count < pageSize;
    // console.log(`props.api.getSelectedNodes(): `, props.api.getSelectedNodes())
    // console.log(`count: ${count}, pagesSize: ${pageSize}, indeterminate: ${indeterminate}`)
    grid?.setIndeterminate(() => {
      return indeterminate
    })
  }, [checked])
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
