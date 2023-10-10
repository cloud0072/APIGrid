import React, {useEffect, useState} from "react";
import {ICellRendererParams} from "ag-grid-community";
import './cell.less';
import {Input} from "antd";

const TextFieldCell = (params: ICellRendererParams) => {
  const {value, column, colDef, api} = params;
  const [editing, setEditing] = useState<boolean>(false);
  useEffect(() => {
    console.log('TextFieldCell', colDef)
  }, [])
  const handleChange = (e: any) => {
    console.log('params', params)
  }
  return (
    <div className={'bjh-text-field'}>
      {
        editing ?
          <Input defaultValue={value} onChange={handleChange}/> :
          <span>{value}</span>
      }
    </div>
  )
}

export default TextFieldCell;
