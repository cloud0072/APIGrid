import {Dropdown, Space, Switch} from "antd";
import BjhDropdown from "@/components/BjhDropdown";
import {MacScrollbar} from "mac-scrollbar";
import BjhDragList from "@/components/BjhDragList";
import BjhDragItem from "@/components/BjhDragItem";
import BjhButton from "@/components/BjhButton";
import BjhSelect from "@/components/BjhDropdown/BjhSelect";
import IconFont from "@/components/IconFont";
import React, {useCallback, useMemo} from "react";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import styles from './style.module.less';
import RecordEditModal from "@/components/BjhAgGrid/toolbar/RecordEditModal";
import {useEditModal} from "@/components/BjhAgGrid/hooks/useEditModal";
import {Column, createMenuItems, RowHeightItems} from "@/components/BjhAgGrid/constants";
import FieldGroupMenu from "@/components/BjhAgGrid/toolbar/FieldGroupMenu";
import FieldFilterMenu from "@/components/BjhAgGrid/toolbar/FieldFilterMenu";

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
