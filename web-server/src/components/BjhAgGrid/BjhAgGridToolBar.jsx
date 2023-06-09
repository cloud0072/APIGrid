import {Dropdown, Radio, Select, Space, Switch, theme} from "antd";
import IconFont from "@/components/IconFont";
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import BjhButton from "@/components/BjhButton";
import BjhDropdown from "@/components/BjhDropdown";
import BjhSelect from "@/components/BjhDropdown/BjhSelect";
import {GridCtx} from "@/components/BjhAgGrid/index";
import BjhDragList from "@/components/BjhDragList";
import BjhDragItem from "@/components/BjhDragItem";
import {MacScrollbar} from 'mac-scrollbar';
import {CheckOutlined} from "@ant-design/icons";
import classNames from "classnames";

const items = [
  {
    label: '紧凑',
    value: 34,
    icon: <IconFont type="ali-rightalignment"/>,
  },
  {
    label: '宽松',
    value: 50,
    icon: <IconFont type="ali-rightalignment"/>,
  },
  {
    label: '超大',
    value: 66,
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

const BjhAgGridToolBar = (props) => {
  // useEffect(() => {
  //   console.log('AgToolBar', props)
  // }, [props])

  const {useToken} = theme;
  const {token} = useToken()

  const gridCtx = useContext(GridCtx)
  useEffect(() => {
    // console.log('gridCtx.tableColumns', gridCtx?.tableColumns)
    // console.log('gridCtx.colDefsList', gridCtx?.colDefsList)
  }, [])

  const isFieldInGroup = useCallback((field) => {
    return !!gridCtx.colGroupsList.find(item => item.field === field)
  }, [gridCtx?.colGroupsList])

  const tableColumnsOptions = useMemo(() => {
    return gridCtx?.tableColumns.map(col => ({
      label: col.headerName,
      value: col.field,
      disabled: isFieldInGroup(col.field)
    }))
  }, [gridCtx?.tableColumns, gridCtx?.colGroupsList])

  const onMenuClick = (item) => {
    console.log('onMenuClick', item)
  }

  const onDragColDefsEnd = (items) => {
    // console.log('onDragColDefsEnd', items)
    gridCtx?.setColDefsList(() => items)
  }

  const onDragColGroupEnd = (items) => {
    console.log('onDragColGroupEnd', items)
    gridCtx?.setColGroupsList(() => items)
  }

  const onChangeColVisible = (col, checked) => {
    gridCtx?.setColDefsList((colDefs) => {
      return colDefs.map(item => {
        if (item.field === col.field) {
          return Object.assign(col, {hidden: !checked})
        }
        return item
      })
    })
  }

  const [addGroupOpen, setAddGroupOpen] = useState(false)

  const onAddGroupField = (field) => {
    const temp = gridCtx?.colGroupsList?.find(item => item.field === field);
    if (gridCtx?.colGroupsList && !temp) {
      gridCtx?.setColGroupsList((colGroups) => {
        return colGroups.concat([{
          field,
          direction: 'desc'
        }])
      })
      setAddGroupOpen(() => false)
    }
  }

  const onDelGroupField = (field) => {
    gridCtx?.setColGroupsList((colGroups) => {
      return colGroups.filter(col => col.field !== field)
    })
  }

  const onChangeGroupField = (col, value) => {
    gridCtx?.setColGroupsList((colGroups) => {
      return colGroups.map(item => {
        if (item.field === col.field) {
          return Object.assign(item, {field: value})
        }
        return item
      })
    })
  }

  const onChangeGroupSort = (col, value) => {
    gridCtx?.setColGroupsList((colGroups) => {
      return colGroups.map(item => {
        if (item.field === col.field) {
          return Object.assign(item, {direction: value})
        }
        return item
      })
    })
  }

  return (
    <div className="bjh-grid-option">
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
              <MacScrollbar style={{height: 200, padding: '0 8px'}}>
                <BjhDragList onDragEnd={onDragColDefsEnd} items={gridCtx?.colDefsList} idKey={'field'}>
                  {gridCtx?.colDefsList?.map(col => (
                    <BjhDragItem key={col['field']} id={col['field']} handle={true} className={'bjh-col-drag-item'}>
                      <>
                        <div style={{width: '100%'}}>
                          {col?.headerName}
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
                <BjhDragList onDragEnd={onDragColGroupEnd} items={gridCtx?.colGroupsList} idKey={'field'}>
                  {gridCtx?.colGroupsList?.map(col => (
                    <BjhDragItem key={col['field']} id={col['field']} handle={true} className={'bjh-group-drag-item'}>
                      <>
                        <Select
                          style={{width: '232px'}}
                          options={tableColumnsOptions}
                          value={col.field}
                          onChange={(value) => onChangeGroupField(col, value)}
                        />
                        <Radio.Group
                          optionType={'button'}
                          buttonStyle={'solid'}
                          value={col.direction}
                          onChange={({target: {value}}) => onChangeGroupSort(col, value)}
                        >
                          {groupSortItems.map(item => (
                            <Radio.Button value={item.value} key={item.value}>
                              <div style={{width: '80px', textAlign: 'center'}}>{item.label}</div>
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                        <BjhButton icon={'ant-close'} size={'small'} onClick={() => onDelGroupField(col.field)}/>
                      </>
                    </BjhDragItem>
                  ))}
                </BjhDragList>
                <BjhDropdown
                  open={addGroupOpen}
                  onClick={() => setAddGroupOpen((open) => !open)}
                  dropdownRender={() => (
                    <MacScrollbar style={{height: 200, padding: '0 8px'}}>
                      <div className="bjh-dropdown-select">
                        {tableColumnsOptions.map(option => (
                          <div
                            className={classNames({
                              'bjh-dropdown-select-option': true,
                              'bjh-selected': isFieldInGroup(option.value)
                            })}
                            key={option.value}
                            onClick={() => onAddGroupField(option.value)}
                          >
                            <div className="bjh-dropdown-select-option-content">
                              <div className="bjh-dropdown-select-option-content-title">
                                {option.label}
                              </div>
                            </div>
                            {
                              isFieldInGroup(option.value) &&
                              <div className="bjh-dropdown-select-option-action">
                                <CheckOutlined style={{color: token.colorPrimary}}/>
                              </div>
                            }
                          </div>
                        ))}
                      </div>
                    </MacScrollbar>
                  )}>
                  <div style={{display: 'flex', marginTop: '8px'}}>
                    <BjhButton text={'添加字段'} icon={'ant-plus'}/>
                  </div>
                </BjhDropdown>
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
                value={gridCtx?.rowHeight}
                items={items}
                onChange={(item) => gridCtx.setRowHeight(() => item.value)}
              />
            )}>
              <BjhButton icon="ant-colum-height"/>
            </BjhDropdown>
          </Space>
        </div>
        <div className="suffix"/>
      </div>
      <div className="bjh-grid-option-blank"/>
      <div className="bjh-grid-option-right">
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
      </div>
    </div>
  )
}

export default BjhAgGridToolBar;
