import {ICellEditorParams} from "ag-grid-community";
import React, {useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {Button, Space} from "antd";
import styles from "@/components/BjhAgGrid/cell/style.module.less";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import BjhDropdown from "@/components/BjhDropdown";
import BjhSelect from "@/components/BjhDropdown/BjhSelect";
import SelectTag from "@/components/datasheet/SelectTag";
import {useQueryUsers} from "@/models/unitState";
import UnitTag from "@/components/datasheet/UnitTag";

const MemberEditor = React.forwardRef((props: ICellEditorParams, ref) => {
  const [editing, setEditing] = useState<boolean>(true);
  const [localValue, setLocalValue] = useState<any[]>([]);
  const refContainer = useRef<HTMLDivElement>(null);

  const {fieldMap} = useGrid();
  const multi = useMemo(() => {
    const {property} = fieldMap[props.colDef?.field as string]
    return property?.multi;
  }, [fieldMap])

  const {data: users} = useQueryUsers();
  const options = useMemo(() => {
    return users || [];
  }, [users])

  const items = useMemo(() => options.map((opt: any) => ({
    value: opt.id,
    label: <UnitTag deletable={false} {...opt} title={opt.name}/>
  })), [options])

  const getValue = (): any => {
    return localValue.map((opt: any) => opt.id);
  }

  const handleClick = (key: any) => {
    const opt = options.find((opt: any) => opt.id == key)
    if (multi) {
      setLocalValue(prev => prev.find(i => i.id == opt.id) ? prev.filter((i: any) => i.id != opt.id) : prev.concat([opt]))
    } else {
      setLocalValue([opt])
    }
  }

  const handleOk = () => {
    setEditing(false)
  }

  const handleCancel = () => {
    // setLocalValue(props.value && props.value instanceof Array ? props.value : [])
    setEditing(false)
  }

  useEffect(() => {
    if (!props.value || props.value.length < 1) {
      return
    }
    const value = props.value.map((v: string) => options.find((opt: any) => opt.id == v)).filter((opt: any) => !!opt)
    setLocalValue(value)
  }, [])

  // useEffect(() => {
  //   console.log('localValue', localValue)
  // }, [localValue])

  useEffect(() => {
    if (!editing) {
      props.stopEditing();
    }
  }, [editing]);

  useImperativeHandle(ref, () => {
    return {
      getValue,
    };
  });

  const dropdownRender = () => (
    <div className={styles.selectDropdown}>
      <div className={styles.selectList}>
        <BjhSelect
          value={localValue.map(i => i.id)}
          items={items}
          onChange={(item: any) => handleClick(item.value)}
        />
      </div>
      <div className={styles.selectBottom}>
        <div className={styles.selectBottomRight}>
          <Space>
            <Button size={'small'} onClick={handleOk} type={'primary'}>确认</Button>
            <Button size={'small'} onClick={handleCancel}>取消</Button>
          </Space>
        </div>
      </div>
    </div>
  )

  return (
    <BjhDropdown
      trigger={['click']}
      dropdownRender={dropdownRender}
      width={220}
    >
      <div ref={refContainer} className={styles.selectContainer} style={{margin: '0 2px'}}>
        {localValue.map(i =>
          <div className={styles.item} key={i.id}>
            <UnitTag deletable={true} {...i} title={i.name} onClose={() => handleClick(i.id)}/>
          </div>
        )}
      </div>
    </BjhDropdown>
  )
});

export default MemberEditor;
