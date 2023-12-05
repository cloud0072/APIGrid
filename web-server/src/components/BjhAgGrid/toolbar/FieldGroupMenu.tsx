import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import React, {useState} from "react";
import {Column, groupSortItems} from "@/components/BjhAgGrid/constants";
import BjhDragList from "@/components/BjhDragList";
import BjhDragItem from "@/components/BjhDragItem";
import {Button, Radio, Select} from "antd";
import BjhButton from "@/components/BjhButton";
import styles from "@/components/BjhAgGrid/toolbar/style.module.less";

const FieldGroupMenu = ({tableColumns}: any) => {
  const {view, setView} = useGrid()
  const [groupList, setGroupList] = useState(view?.groupInfo || []);

  const onDragGroupInfoEnd = (groupInfo: any) => {
    setGroupList(groupInfo)
  }

  const onClickGroupInfo = (fieldId?: any) => {
    const exists = groupList.find((item: Column) => item.fieldId === fieldId);
    if (!exists) {
      setGroupList(groupList.concat([{fieldId, desc: true}]));
    } else {
      setGroupList(groupList.filter((col: Column) => col.fieldId !== fieldId));
    }
  }

  const onChangeGroupField = (col: any, value: any) => {
    setGroupList(groupList.map((item: any) => {
      if (item.fieldId === col.fieldId) {
        return Object.assign(item, {fieldId: value})
      }
      return item
    }))
  }

  const onChangeGroupSort = (col: any, value: any) => {
    setGroupList(groupList.map((item: any) => {
      if (item.fieldId === col.fieldId) {
        return Object.assign(item, {desc: value})
      }
      return item
    }))
  }
  const handleSubmit = () => {
    setView({...view, groupInfo: groupList});
  }
  return (
    <div style={{padding: '0 8px'}}>
      <BjhDragList onDragEnd={onDragGroupInfoEnd} items={groupList} idKey={'fieldId'}>
        {groupList.map((col: Column) => (
          <BjhDragItem
            key={col['fieldId']}
            id={col['fieldId']}
            handle={true}
            className={'bjh-group-drag-item'}
          >
            <>
              <Select
                style={{width: '232px'}}
                options={tableColumns}
                value={col.fieldId}
                placeholder={'请选择要分组的列'}
                onChange={(value) => onChangeGroupField(col, value)}
              />
              <Radio.Group
                optionType={'button'}
                buttonStyle={'solid'}
                value={col.desc}
                onChange={({target: {value}}) => onChangeGroupSort(col, value)}
              >
                {groupSortItems.map(item => (
                  <Radio.Button value={item.value} key={item.value}>
                    <div style={{width: '80px', textAlign: 'center'}}>{item.label}</div>
                  </Radio.Button>
                ))}
              </Radio.Group>
              <BjhButton icon={'ant-close'} size={'small'} onClick={() => onClickGroupInfo(col.fieldId)}/>
            </>
          </BjhDragItem>
        ))}
      </BjhDragList>
      <div className={styles.menuBottom}>
        <BjhButton text={'添加分组'} icon={'ant-plus'} onClick={() => onClickGroupInfo()}/>
        <Button type={"primary"} onClick={() => handleSubmit()}>确认</Button>
      </div>
    </div>
  )
}

export default FieldGroupMenu;
