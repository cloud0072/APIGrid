import React, {useMemo, useState} from "react";
import {Button, Checkbox, Form, Input, Popover, Select, Space} from "antd";
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import {getNewId} from "@/utils/idUtils";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import BjhDragItem from "@/components/BjhDragItem";
import BjhDragList from "@/components/BjhDragList";
import styles from './style.module.less'
import {MacScrollbar} from "mac-scrollbar";
import {FieldTypeOptions, View} from "@/components/BjhAgGrid/constants";

const EditFieldPopover = (props: any) => {
  const {open, onChange, column, children} = props;

  const {views, fieldMap, setDatasheet} = useGrid();
  const fieldInfo = useMemo(() => {
    const field = fieldMap?.[column?.colDef?.field];
    return field ? {
      fieldId: field.id,
      fieldName: field.name,
      fieldType: field.type,
      property: field.property
    } as any : undefined
  }, [column])

  const [form] = Form.useForm<any>();
  const fieldType = Form.useWatch('fieldType', form);

  const [localOpen, setLocalOpen] = useMergedState(false, {
    value: open,
    onChange: onChange
  })

  const [multi, setMulti] = useState<boolean>(fieldInfo?.property?.multi || false)

  const handleOpenChange = (e: any) => {
    // 只接受关闭事件 点击浮层关闭，打开需要手动打开
    if (!e) {
      setLocalOpen(e)
    }
  }

  const updateFieldMap = () => {
    const {fieldId, fieldName, fieldType, property} = form.getFieldsValue()
    const fieldProp = {};
    if (fieldType == 4 || fieldType == 6) {
      console.log('multi', multi)
      Object.assign(fieldProp, property, {multi})
    }
    const fId = fieldId || getNewId('fld');
    const nField = {[fId]: {id: fId, name: fieldName, type: fieldType, property: fieldProp}}
    const nFieldMap = Object.assign({}, fieldMap, nField);
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
    <div className={styles.popoverContent}>
      <MacScrollbar style={{maxHeight: '400px', marginBottom: '4px'}}>
        <Form form={form} layout="vertical" initialValues={fieldInfo}>
          <Form.Item name={'fieldId'} hidden>
            <Input/>
          </Form.Item>
          <Form.Item label={'名称'} name={'fieldName'}>
            <Input/>
          </Form.Item>
          <Form.Item label={'类型'} name={'fieldType'}>
            <Select options={FieldTypeOptions} disabled={!!fieldInfo}/>
          </Form.Item>

          {
            fieldType == 4 ?
              <>
                {/*<Form.Item noStyle name={['property', 'multi']}>*/}
                <div style={{marginBottom: '12px'}}>
                  <Checkbox checked={multi} onChange={(e) => setMulti(e.target.checked)}
                            defaultChecked={fieldInfo?.property?.multi}/>
                  <div style={{display: 'inline-block', marginLeft: '4px'}}>多选</div>
                </div>
                {/*</Form.Item>*/}
                <div className={styles.formItemLabel}>备选项</div>
                <Form.List name={['property', 'options']}>
                  {(fields, {add, remove, move}, {errors}) => (
                    <div style={{display: 'flex', flexDirection: 'column', rowGap: 2, marginBottom: '12px'}}>
                      <BjhDragList onDragEnd={(_: any, {from, to}: any) => move(from, to)} items={fields} idKey={'key'}>
                        {fields.map((field, index) => (
                          <BjhDragItem key={field.key} id={field.key} handle={true} className={'bjh-col-drag-item'}>
                            <div className={styles.selectItem}>
                              <Form.Item name={[field.name, 'id']} hidden={true}>
                                <Input/>
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, 'name']}
                                style={{width: '100%'}}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: false,
                                    message: "请输入选项内容.",
                                  },
                                ]}
                                noStyle
                              >
                                <Input placeholder={`请输入选项内容`}/>
                              </Form.Item>
                              <MinusCircleOutlined
                                className={styles.dynamicDeleteButton}
                                onClick={() => remove(field.name)}
                              />
                            </div>
                          </BjhDragItem>
                        ))}
                      </BjhDragList>
                      <Form.Item noStyle>
                        <div style={{height: '32px', padding: '4px 0'}}>
                          <Button size={'small'} type="text"
                                  onClick={() => add({id: getNewId('opt'), name: '选项' + (fields.length + 1)})}
                                  icon={<PlusOutlined/>}>添加</Button>
                        </div>
                        <Form.ErrorList errors={errors}/>
                      </Form.Item>
                    </div>
                  )}
                </Form.List>
              </> :
              null
          }

          {
            fieldType == 6 ?
              <div style={{marginBottom: '12px'}}>
                <Checkbox checked={multi} onChange={(e) => setMulti(e.target.checked)}
                          defaultChecked={fieldInfo?.property?.multi}/>
                <div style={{display: 'inline-block', marginLeft: '4px'}}>多选</div>
              </div> :
              null
          }
          {/*<Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>*/}
        </Form>
      </MacScrollbar>

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
}

export default EditFieldPopover;
