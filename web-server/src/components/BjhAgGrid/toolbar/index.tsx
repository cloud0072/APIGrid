import {Button, DatePicker, Dropdown, Input, InputNumber, Radio, Select, Space, Switch} from "antd";
import BjhDropdown from "@/components/BjhDropdown";
import {MacScrollbar} from "mac-scrollbar";
import BjhDragList from "@/components/BjhDragList";
import BjhDragItem from "@/components/BjhDragItem";
import BjhButton from "@/components/BjhButton";
import BjhSelect from "@/components/BjhDropdown/BjhSelect";
import IconFont from "@/components/IconFont";
import React, {useCallback, useMemo, useState} from "react";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import styles from './style.module.less';
import {useQueryRecords} from "@/models/recordState";
import {useQueryUsers} from "@/models/unitState";
import dayjs from "dayjs";
import {debounce} from "lodash-es";
import RecordEditModal from "@/components/BjhAgGrid/toolbar/RecordEditModal";
import {useEditModal} from "@/components/BjhAgGrid/hooks/useEditModal";
import {
  Column,
  createMenuItems,
  filterRelItems,
  findSuperType,
  getFilterSymbolItems, groupSortItems,
  RowHeightItems
} from "@/components/BjhAgGrid/constants";

const FieldFilterMenu = ({tableColumns}: any) => {
  const {dstId, view, fieldMap, setView, findFieldType} = useGrid();
  const [filterList, setFilterList] = useState<any[]>(view.filterInfo ? JSON.parse(JSON.stringify(view.filterInfo)) : [])

  const {data: users} = useQueryUsers();
  const userItems = users.map((u: any) => ({label: u.name, value: u.id}))

  const onClickFilterField = (fieldId?: string) => {
    const exists = filterList?.find((col: any) => col.fieldId === fieldId);
    if (!exists) {
      setFilterList(filterList => filterList.concat([{rel: 'and', fieldId, value: ''}]))
    } else {
      setFilterList(filterList => filterList?.filter((col: any) => col.fieldId !== fieldId))
    }
  }

  const onChangeFilterRel = (col: any, value: any) => {
    setFilterList(filterList?.map((item: any) => {
      return Object.assign(item, {rel: value})
    }))
  }

  const onChangeFilterField = (col: any, value: any) => {
    setFilterList(filterList?.map((item: any) => {
      if (item.fieldId === col.fieldId) {
        return Object.assign(item, {fieldId: value, symbol: null, value: null})
      }
      return item
    }))
  }

  const onChangeFilterSymbol = (col: any, value: any) => {
    setFilterList(filterList?.map((item: any) => {
      if (item.fieldId === col.fieldId) {
        return Object.assign(item, {symbol: value})
      }
      return item
    }))
  }

  const onChangeFilterValue = debounce((col: any, value: any) => {
    setFilterList(filterList?.map((item: any) => {
      if (item.fieldId === col.fieldId) {
        return Object.assign(item, {value: value})
      }
      return item
    }))
  }, 300);

  const {handleGetRecords} = useQueryRecords(dstId)
  const handleSubmit = () => {
    setView({...view, filterInfo: filterList});
    handleGetRecords(filterList)
  }

  return (
    <div style={{padding: '0 8px'}}>
      {filterList?.map((col: any, index) => {
        const type = findSuperType(findFieldType(col.fieldId));
        const symbolItems = getFilterSymbolItems(type);
        const onChange = (e: any) => {
          const v = e?.target?.value || e;
          const value = type == 'date' ? v?.format('YYYY-MM-DD') : v instanceof Array ? v.join(',') : v;
          onChangeFilterValue(col, value);
        }

        const InputValue = () => {
          switch (type) {
            case 'number':
              return <InputNumber
                className={styles.formInput}
                defaultValue={col.value ? Number(col.value) : undefined}
                onChange={onChange}
              />
            case 'date' :
              return <DatePicker
                className={styles.formInput}
                defaultValue={col.value ? dayjs(col.value) : undefined}
                onChange={onChange}
              />
            case 'member' :
              return <Select
                className={styles.formInput}
                defaultValue={col?.value?.split(',')}
                onChange={onChange}
                options={userItems}
              />
            case 'select' :
              const multi = fieldMap[col.fieldId]?.property?.multi || false;
              const items = fieldMap[col.fieldId]?.property?.options.map((opt: any) => ({
                value: opt.id,
                label: opt.name
              })) || []
              return <Select
                className={styles.formInput}
                defaultValue={col?.value?.split(',')}
                onChange={onChange}
                mode={multi ? 'multiple' : undefined}
                options={items}
              />
            case 'text':
              return <Input
                className={styles.formInput}
                defaultValue={col.value}
                onChange={onChange}
              />
            default:
              return null;
          }
        }
        return (
          <div className={styles.filterItem} key={col.fieldId || index}>
            <Select
              className={styles.filterBox}
              style={{width: '80px'}}
              options={filterRelItems}
              defaultValue={col.rel}
              disabled={index > 0}
              onChange={(value) => onChangeFilterRel(col, value)}
            />
            <Select
              className={styles.filterBox}
              style={{width: '120px'}}
              options={tableColumns}
              defaultValue={col.fieldId}
              placeholder={'列名'}
              onChange={(value) => onChangeFilterField(col, value)}
            />
            <Select
              className={styles.filterBox}
              style={{width: '120px'}}
              options={symbolItems}
              defaultValue={col.symbol}
              placeholder={'符号'}
              onChange={(value) => onChangeFilterSymbol(col, value)}
            />
            <InputValue/>
            <BjhButton icon={'ant-close'} size={'small'} onClick={() => onClickFilterField(col.fieldId)}/>
          </div>
        )
      })}
      <div className={styles.menuBottom}>
        <BjhButton text={'添加筛选'} icon={'ant-plus'} onClick={() => onClickFilterField()}/>
        <Button type={"primary"} onClick={() => handleSubmit()}>确认</Button>
      </div>
    </div>
  )
}

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

const GridToolbar = () => {

  const {view, fieldMap, setView} = useGrid()
  const {handleEdit} = useEditModal();
  const isFieldInGroup = useCallback((fieldId: string) => {
    return !!view.groupInfo?.find((item: Column) => item.fieldId === fieldId)
  }, [view])

  const getFieldName = useCallback((fieldId: string) => {
    return fieldMap?.[fieldId]?.name;
  }, [fieldMap])

  const tableColumns = useMemo(() => {
    return view?.columns?.map((col: Column) => ({
      label: getFieldName(col.fieldId),
      value: col.fieldId,
      disabled: isFieldInGroup(col.fieldId)
    }))
  }, [view, fieldMap])

  const onMenuClick = (item: any) => {
    console.log('onMenuClick', item)
  }

  const onDragColumnsEnd = (columns: any) => {
    view.columns = columns
    setView(view)
  }

  const onChangeColVisible = (col: any, checked: any) => {
    view.columns = view?.columns?.map((c: Column) => {
      if (col.fieldId === c.fieldId) {
        return Object.assign(col, {hidden: !checked})
      }
      return c
    })
    setView(view);
  }

  const setRowHeightLevel = (rowHeightLevel: number) => {
    view.rowHeightLevel = rowHeightLevel;
    setView(view);
  }

  return (
    <div className="bjh-grid-option">
      {/*{contextHolder}*/}
      <div className="bjh-grid-option-left">
        <div className="prefix"/>
        <div className="content">
          <Space size="small">
            <BjhDropdown trigger="click" titleRender={() => (
              <div className="bjh-dropdown-column-title">
                <div className="bjh-dropdown-column-name">
                  字段设置
                </div>
                <div className="bjh-dropdown-column-action"/>
              </div>
            )} dropdownRender={() => (
              <MacScrollbar style={{minHeight: 200, padding: '0 8px'}}>
                <BjhDragList onDragEnd={onDragColumnsEnd} items={view?.columns} idKey={'fieldId'}>
                  {view?.columns?.map((col: any) => (
                    <BjhDragItem key={col['fieldId']} id={col['fieldId']} handle={true} className={'bjh-col-drag-item'}>
                      <>
                        <div style={{width: '100%'}}>
                          {getFieldName(col?.fieldId)}
                        </div>
                        <div className={styles.filterBox} style={{marginRight: '4px'}}>
                          <Switch
                            size={"small"}
                            checked={!col.hidden}
                            onChange={(checked) => onChangeColVisible(col, checked)}
                          />
                        </div>
                      </>
                    </BjhDragItem>
                  ))}
                </BjhDragList>
              </MacScrollbar>
            )}>
              <BjhButton text="字段" icon="ali-set"/>
            </BjhDropdown>

            <BjhDropdown trigger="click" width={540} titleRender={() => (
              <div className="bjh-dropdown-column-title">
                <div className="bjh-dropdown-column-name">
                  分组设置
                </div>
                <div className="bjh-dropdown-column-action">
                </div>
              </div>
            )} dropdownRender={() => (
              <FieldGroupMenu tableColumns={tableColumns}/>
            )}>
              <BjhButton text="分组" icon="ali-calculator"/>
            </BjhDropdown>

            <BjhDropdown trigger="click" width={540} titleRender={() => (
              <div className="bjh-dropdown-column-title">
                <div className="bjh-dropdown-column-name">
                  筛选设置
                </div>
                <div className="bjh-dropdown-column-action">
                </div>
              </div>
            )} dropdownRender={() => (
              <FieldFilterMenu tableColumns={tableColumns}/>
            )}>
              <BjhButton text="筛选" icon="ali-search"/>
            </BjhDropdown>

            <BjhDropdown trigger="click" titleRender={() => (
              <div className="bjh-dropdown-column-title">
                <div className="bjh-dropdown-column-name">
                  单元格行高
                </div>
                <div className="bjh-dropdown-column-action">
                </div>
              </div>
            )} dropdownRender={() => (
              <BjhSelect
                value={view?.rowHeightLevel}
                items={RowHeightItems}
                onChange={(item: any) => setRowHeightLevel(item.value)}
              />
            )}>
              <BjhButton text="行高" icon="ant-colum-height"/>
            </BjhDropdown>
          </Space>
        </div>
        <div className="suffix"/>
      </div>
      <div className="bjh-grid-option-blank"/>
      <div className="bjh-grid-option-right">
        <Space>
          <Dropdown.Button
            type="primary"
            icon={(<IconFont type="ant-down"/>)}
            menu={{
              items: createMenuItems,
              onClick: onMenuClick,
            }}
            onClick={handleEdit}
          >
            创建
          </Dropdown.Button>
        </Space>
      </div>
      <RecordEditModal/>
    </div>
  )
}

export default GridToolbar;
