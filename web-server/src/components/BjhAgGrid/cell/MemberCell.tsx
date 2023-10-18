import {ICellRendererParams} from "ag-grid-community";
import React, {useEffect, useMemo, useState} from "react";
import {Tag} from "antd";
import styles from "@/components/BjhAgGrid/cell/style.module.less";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import SelectTag from "@/components/datasheet/SelectTag";
import {useQueryUsers} from "@/models/unitState";
import UnitTag from "@/components/datasheet/UnitTag";

const MemberCell = React.forwardRef((props: ICellRendererParams, ref) => {
  const [localValue, setLocalValue] = useState<any[]>([]);

  const {data: users} = useQueryUsers();
  const options = useMemo(() => {
    return users || []
  }, [users])

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
          <UnitTag deletable={false} {...i} title={i.name}/>
        </div>
      )}
    </div>
  )
})

export default MemberCell;
