import {ICellRendererParams} from "ag-grid-community";
import React, {useEffect, useMemo, useState} from "react";
import {Tag} from "antd";
import styles from "@/components/BjhAgGrid/cell/style.module.less";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import SelectTag from "@/components/datasheet/SelectTag";

const SelectCell = React.forwardRef((props: ICellRendererParams, ref) => {
  const [localValue, setLocalValue] = useState<any[]>([]);
  const {fieldMap} = useGrid();

  const options = useMemo(() => {
    const {property} = fieldMap[props.colDef?.field as string]
    return property?.options || []
  }, [fieldMap])

  useEffect(() => {
    if (!props.value || props.value.length < 1) {
      return
    }
    const value = props.value.map((v: string) => options.find((opt: any) => opt.id == v)).filter((opt: any) => !!opt)
    setLocalValue(value)
  }, [])

  return (
    <div className={styles.selectContainer} style={{margin: '0 -5px'}}>
      {localValue.map(i =>
        <div className={styles.item} key={i.id}>
          <SelectTag deletable={false} name={i.name} id={i.id}/>
        </div>
      )}
    </div>
  )
})

export default SelectCell;
