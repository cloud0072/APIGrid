import React, {useMemo} from "react";
import dayjs from "dayjs";
import styles from "@/components/BjhAgGrid/toolbar/style.module.less";
import {Checkbox, DatePicker, Form, Input, InputNumber, Modal, Select} from "antd";
import {useEditModal} from "@/components/BjhAgGrid/hooks/useEditModal";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import {findSuperType} from "@/components/BjhAgGrid/constants";
import {useQueryUsers} from "@/models/unitState";
import useFileAsset from "@/components/BjhAgGrid/hooks/useFileAsset";

const FileUploadItem = (props: any) => {
  const {
    UploadRender,
  } = useFileAsset({
    value: props.defaultValue,
    onChange: props.onChange,
    hideAction: true
  })

  return (
    <UploadRender />
  )
}

const RecordEditModal = () => {
  const {view, fieldMap} = useGrid();
  const {record, setRecord, openModal, handleClose, handleOk} = useEditModal();
  const [form] = Form.useForm();

  const {data: users} = useQueryUsers();
  const userItems = users?.map((u: any) => ({label: u.name, value: u.id}));

  const fields = useMemo(() => {
    return view.columns
      .filter(col => !col.hidden)
      .map(col => fieldMap[col.fieldId])
  }, [view, fieldMap]);

  const isMulti = (fieldId: string) => {
    return fieldMap[fieldId]?.property?.multi || false;
  }

  const selectItems = (fieldId: string) => {
    return fieldMap[fieldId]?.property?.options.map((opt: any) => ({
      value: opt.id,
      label: opt.name
    })) || []
  }

  return (
    <Modal
      title={record?._id ? '修改' : '创建'}
      open={openModal}
      onOk={handleOk}
      onCancel={handleClose}
      maskClosable={false}
      width={800}
    >
      <Form layout={'vertical'} form={form}>
        {fields.map((f, i) => {
          const {id: fieldId, name, type: fieldType} = f;
          const value = record?.[fieldId];
          const type = findSuperType(fieldType);

          const onChange = (e: any) => {
            const v = e?.target?.value || e;
            setRecord((r: any) => {
              // 不需要转换json格式 v instanceof Array ? v.join(',') :
              const nVal = type == 'date' ? v?.format('YYYY-MM-DD') : v;
              return Object.assign(r, {[fieldId]: nVal});
            })
          };
          // 成员/选择
          const InputValue = () => {
            switch (fieldType) {
              case 1:
                return <Input
                  className={styles.formInput}
                  defaultValue={value}
                  onChange={onChange}
                />
              case 10:
                return <Input.TextArea
                  className={styles.formInput}
                  defaultValue={value}
                  onChange={onChange}
                />
              case 2:
              case 20:
                return <InputNumber
                  className={styles.formInput}
                  defaultValue={value ? Number(value) : undefined}
                  onChange={onChange}
                  disabled={fieldType == 20}
                />
              case 3 :
              case 21 :
              case 22 :
                return <DatePicker
                  className={styles.formInput}
                  defaultValue={value ? dayjs(value) : undefined}
                  onChange={onChange}
                  disabled={fieldType == 21 || fieldType == 22}
                />
              case 4:
                // 选择
                return <Select
                  className={styles.formInput}
                  defaultValue={value}
                  onChange={onChange}
                  options={selectItems(fieldId)}
                  mode={isMulti(fieldId) ? 'multiple' : undefined}
                />
              case 5 :
                return (
                  <FileUploadItem
                    className={styles.formInput}
                    defaultValue={value}
                    onChange={onChange}
                  />
                )
              case 6 :
              case 23 :
              case 24 :
                return <Select
                  className={styles.formInput}
                  defaultValue={value}
                  onChange={onChange}
                  options={userItems}
                  mode={isMulti(fieldId) ? 'multiple' : undefined}
                  disabled={fieldType == 23 || fieldType == 24}
                />
              case 11 :
                return <Checkbox
                  className={styles.formInput}
                  defaultChecked={value}
                  onChange={onChange}
                />
              default:
                return null;
            }
          };
          return (
            <Form.Item label={name} name={fieldId} key={i}>
              <InputValue/>
            </Form.Item>
          )
        })}
      </Form>
    </Modal>
  )
};

export default RecordEditModal;
