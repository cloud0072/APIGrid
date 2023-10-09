import React, {useMemo} from "react";
import {Button, Form, Input, Popover, Select, Space} from "antd";
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import {getNewId} from "@/utils/idUtils";
import {View} from "@/components/BjhAgGrid";

const {Item} = Form

//     TEXT(1),        //文本
//     NUMBER(2),      //数字
//     DATETIME(3),    //日期
//     SELECT(4),      //选项
//     FILE(5),        //附件
//     MEMBER(6),      //成员
// //    LINK(7),      //关联
// //    LOOKUP(8),    //引用
// //    CALC(9),      //公式
//     NOT_SUPPORT(99),//未知
export const FieldTypeOptions = [
  {value: 1, label: '文本'},
  {value: 2, label: '数字'},
  {value: 3, label: '日期'},
  {value: 4, label: '选项'},
  {value: 5, label: '附件'},
]

const EditFieldPopover = (props: any) => {
  const {open, onChange, column, children} = props;

  const {views, fieldMap, setDatasheet} = useGrid();
  const fieldInfo = useMemo(() => {
    const field = fieldMap?.[column?.colDef?.field];
    return field ? {
      fieldId: field.id,
      fieldName: field.name,
      fieldType: field.type
    } as any : undefined
  }, [column])

  const [form] = Form.useForm<any>();

  const [localOpen, setLocalOpen] = useMergedState(false, {
    value: open,
    onChange: onChange
  })

  const handleOpenChange = (e: any) => {
    // 只接受关闭事件 点击浮层关闭，打开需要手动打开
    if (!e) {
      setLocalOpen(e)
    }
  }

  const updateFieldMap = () => {
    const {fieldId, fieldName, fieldType} = form.getFieldsValue()
    const fId = fieldId || getNewId('fld');
    const nFieldMap = Object.assign({}, fieldMap, {[fId]: {id: fId, name: fieldName, type: fieldType}});
    const nViews = !fieldId ? views?.map((v: View) => {
      v.columns.push({fieldId: fId})
      return v;
    }) : undefined;

    setDatasheet((prev: any) => Object.assign({}, prev, {fieldMap: nFieldMap, views: (nViews ?? views)}));
  }

  const handleOk = () => {
    updateFieldMap()
    setLocalOpen(false)
  }

  const handleCancel = () => {
    setLocalOpen(false)
  }

  const titleRender = (
    <div>{fieldInfo ? '编辑字段' : '新增字段'}</div>
  )

  const contentRender = (
    <div style={{minWidth: '280px'}}>
      <Form form={form} layout="vertical" initialValues={fieldInfo}>
        <Item name={'fieldId'} hidden>
          <Input/>
        </Item>
        <Item label={'名称'} name={'fieldName'}>
          <Input/>
        </Item>
        <Item label={'类型'} name={'fieldType'}>
          <Select options={FieldTypeOptions} disabled={!!fieldInfo}/>
        </Item>
      </Form>
      <Space>
        <Button onClick={handleOk} type={'primary'}>确认</Button>
        <Button onClick={handleCancel}>取消</Button>
      </Space>
    </div>
  )

  return (
    <Popover
      open={localOpen}
      onOpenChange={handleOpenChange}
      trigger={['click']}
      placement={'bottomLeft'}
      showArrow={false}
      title={titleRender}
      content={contentRender}
    >
      {children}
    </Popover>
  )
};

export default EditFieldPopover;
