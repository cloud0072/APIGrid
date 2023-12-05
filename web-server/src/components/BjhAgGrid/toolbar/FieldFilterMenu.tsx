import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import React, {useEffect, useImperativeHandle, useMemo, useState} from "react";
import {useQueryUsers} from "@/models/unitState";
import {debounce} from "lodash-es";
import {useQueryRecords} from "@/models/recordState";
import {filterRelItems, findSuperType, getFilterSymbolItems} from "@/components/BjhAgGrid/constants";
import {Button, DatePicker, Form, Input, InputNumber, Select} from "antd";
import styles from "@/components/BjhAgGrid/toolbar/style.module.less";
import dayjs from "dayjs";
import BjhButton from "@/components/BjhButton";

const FilterForm = React.forwardRef(({col, key, userItems, tableColumns}: any, ref) => {
  const {fieldMap, findFieldType} = useGrid();
  const [form] = Form.useForm();

  const type = findSuperType(findFieldType(col.fieldId));
  const symbolItems = getFilterSymbolItems(type);

  const getFormValue = () => {
    return form.getFieldsValue(true);
  }

  useImperativeHandle(ref, () => {
    return {
      getFormValue
    }
  })

  const InputValue = () => useMemo(() => {
    switch (type) {
      case 'number':
        return <InputNumber
          className={styles.formInput}
          defaultValue={col.value ? Number(col.value) : undefined}
        />
      case 'date' :
        return <DatePicker
          className={styles.formInput}
          defaultValue={col.value ? dayjs(col.value) : undefined}
        />
      case 'member' :
        return <Select
          className={styles.formInput}
          defaultValue={col?.value?.split(',')}
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
          mode={multi ? 'multiple' : undefined}
          options={items}
        />
      case 'text':
        return <Input
          className={styles.formInput}
          defaultValue={col.value}
        />
      default:
        return null;
    }
  },[type])

  return (
    <div className={styles.filterItem}>
      <Form
        labelCol={{span: 6}}
        wrapperCol={{span: 18}}
        form={form}
        name="dynamic_form_complex"
        style={{maxWidth: 600}}
        autoComplete="off"
        initialValues={{filterInfo: [{}]}}
      >
        <Form.Item name={'rel'}>
          <Select
            className={styles.filterBox}
            style={{width: '80px'}}
            options={filterRelItems}
            disabled={key > 0}
          />
        </Form.Item>
        <Form.Item name={'fieldId'}>
          <Select
            className={styles.filterBox}
            style={{width: '120px'}}
            options={tableColumns}
            placeholder={'列名'}
          />
        </Form.Item>
        <Form.Item name={'symbol'}>
          <Select
            className={styles.filterBox}
            style={{width: '120px'}}
            options={symbolItems}
            defaultValue={col.symbol}
            placeholder={'符号'}
          />
        </Form.Item>
        <Form.Item name={'value'}>
          <InputValue/>
        </Form.Item>
      </Form>
    </div>
  )
})

const FieldFilterMenu = ({tableColumns}: any) => {
  const {dstId, view, setView} = useGrid();
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
  }

  useEffect(() => {
    handleGetRecords()
  }, [view?.filterInfo])

  return (
    <div style={{padding: '0 8px'}}>
      {filterList?.map((col: any, index) => {
        col.ref = React.createRef();
        return <FilterForm ref={col.ref} key={index} userItems={userItems} tableColumns={tableColumns}/>
      })}
      <div className={styles.menuBottom}>
        <BjhButton text={'添加筛选'} icon={'ant-plus'} onClick={() => onClickFilterField()}/>
        <Button type={"primary"} onClick={() => handleSubmit()}>确认</Button>
      </div>
    </div>
  )
}

export default FieldFilterMenu
