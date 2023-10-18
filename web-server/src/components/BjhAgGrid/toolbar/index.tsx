import {Button, Dropdown, message, Popover, Radio, Select, Space, Switch, theme, Tooltip} from "antd";
import BjhDropdown from "@/components/BjhDropdown";
import {MacScrollbar} from "mac-scrollbar";
import BjhDragList from "@/components/BjhDragList";
import BjhDragItem from "@/components/BjhDragItem";
import BjhButton from "@/components/BjhButton";
import BjhSelect from "@/components/BjhDropdown/BjhSelect";
import IconFont from "@/components/IconFont";
import React, {useCallback, useMemo} from "react";
import {Column, Field} from "@/components/BjhAgGrid";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import {DatasheetApi} from "@/services/datasheet/Datasheet";
import {SaveOutlined} from "@ant-design/icons";
import {throttle} from "lodash-es";

export const RowHeightItems = [
  {
    label: '紧凑',
    value: 0,
    height: 32,
    icon: <IconFont type="ali-rightalignment"/>,
  },
  {
    label: '标准',
    value: 1,
    height: 48,
    icon: <IconFont type="ali-rightalignment"/>,
  },
  {
    label: '宽松',
    value: 2,
    height: 64,
    icon: <IconFont type="ali-rightalignment"/>,
  },
  {
    label: '超大',
    value: 3,
    height: 96,
    icon: <IconFont type="ali-rightalignment"/>,
  },
]

const createMenuItems = [
  {
    key: '1',
    icon: <IconFont type="ant-edit"/>,
    label: '修改按钮名称'
  }
]

const groupSortItems = [
  {label: 'A → Z', value: 'asc'},
  {label: 'Z → A', value: 'desc'},
];

const GridToolbar = () => {

  const {useToken} = theme;
  const {token} = useToken();

  const {view, setView, fieldMap} = useGrid()

  const isFieldInGroup = useCallback((fieldId: string) => {
    return !!view.groupInfo?.find((item: Column) => item.fieldId === fieldId)
  }, [view])

  const getFieldName = useCallback((fieldId: string) => {
    const f = fieldMap?.[fieldId] as Field;
    return f?.name;
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

  const onDragGroupInfoEnd = (groupInfo: any) => {
    view.groupInfo = groupInfo
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

  const onClickGroupInfo = (fieldId?: any) => {
    const exists = view?.groupInfo?.find((item: Column) => item.fieldId === fieldId);
    if (!exists) {
      view.groupInfo = view.groupInfo ? view.groupInfo : []
      view.groupInfo.push({
        fieldId,
        desc: true
      })
    } else {
      view.groupInfo = view.groupInfo?.filter((col: Column) => col.fieldId !== fieldId)
    }
    setView(view);
  }

  const onChangeGroupField = (col: any, value: any) => {
    view.groupInfo = view.groupInfo?.map((item: any) => {
      if (item.fieldId === col.fieldId) {
        return Object.assign(item, {fieldId: value})
      }
      return item
    })
    setView(view);
  }

  const onChangeGroupSort = (col: any, value: any) => {
    view.groupInfo = view.groupInfo?.map((item: any) => {
      if (item.fieldId === col.fieldId) {
        return Object.assign(item, {desc: value})
      }
      return item
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
                <div className="bjh-dropdown-column-action">
                </div>
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
                        <div style={{flexShrink: 0, marginRight: '4px'}}>
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
              <div style={{padding: '0 8px'}}>
                <BjhDragList onDragEnd={onDragGroupInfoEnd} items={view?.groupInfo || []} idKey={'fieldId'}>
                  {view?.groupInfo?.map((col: Column) => (
                    <BjhDragItem key={col['fieldId']} id={col['fieldId']} handle={true}
                                 className={'bjh-group-drag-item'}>
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
                <div style={{display: 'flex', margin: '8px 0'}}>
                  <BjhButton text={'添加字段'} icon={'ant-plus'} onClick={() => onClickGroupInfo()}/>
                </div>
              </div>
            )}>
              <BjhButton text="分组" icon="ali-calculator"/>
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
                value={view.rowHeightLevel}
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
          {/*<Popover content={'保存设置'}>
            <Button
              type="text"
              onClick={handleSaveDst}
              icon={<SaveOutlined style={{color: token.colorPrimary}}/>}
            />
          </Popover>*/}
          <Dropdown.Button
            type="primary"
            icon={(<IconFont type="ant-down"/>)}
            menu={{
              items: createMenuItems,
              onClick: onMenuClick,
            }}
          >
            创建
          </Dropdown.Button>
        </Space>
      </div>
    </div>
  )
}

export default GridToolbar;
