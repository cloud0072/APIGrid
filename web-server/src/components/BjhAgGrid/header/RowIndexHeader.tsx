import {Checkbox} from "antd";
import React, {useContext} from "react";
import {GridContext} from "@/components/BjhAgGrid";

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
    <div className="bjh-index-header">
      <div className="bjh-row-index">
        <div className="bjh-row-index-checkbox">
          <Checkbox checked={checkAll} indeterminate={indeterminate} onChange={onCheckedChange}/>
        </div>
      </div>
    </div>
  )
}

export default RowIndexHeader;
