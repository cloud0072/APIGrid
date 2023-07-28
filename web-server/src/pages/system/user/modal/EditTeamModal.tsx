import {Form, Input, Modal} from "antd";
import {t} from "@/utils/i18n";
import React, {useState} from "react";
import styles from '../style.module.less';
import {UnitTeamApi} from "@/services/framework/UnitTeam";

const EditTeamModal = ({setEditTeamModalOpen, current}: any) => {

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<any>('vertical');
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    return Promise.resolve().then(() => {
      setLoading(() => true)
      form.validateFields().then((values) => {
        // setTimeout(() => {
        //   console.log('values', values);
        //   setLoading(() => false)
        //   setEditTeamModalOpen(false)
        // }, 2000)
        if (current.type === 'add') {
          return UnitTeamApi.insert(values)
        } else {
          return UnitTeamApi.updateById(values)
        }
      }).finally(() => {
        setLoading(() => false)
        setEditTeamModalOpen(false)
      })
    })
  }
  const handleCancel = () => {
    setEditTeamModalOpen(false)
  }

  return (<Modal
    title={<div
      className={styles.modalTitle}>{current.type === 'add' ? t.team_modal_title_create : t.team_modal_title_update}</div>}
    width={800}
    open={true}
    onOk={handleOk}
    onCancel={handleCancel}
    cancelText={t.common_modal_cancel}
    okText={t.common_modal_confirm}
    confirmLoading={loading}
    maskClosable
    centered
  >
    <Form
      layout={formLayout}
      form={form}
      initialValues={current}
    >
      {current.parentTeamName && (
        <Form.Item label={t.team_parent_name} name={'parentTeamName'}>
          <Input disabled={true}/>
        </Form.Item>
      )}
      <Form.Item name={'id'} hidden={true}>
        <Input/>
      </Form.Item>
      <Form.Item name={'parentId'} hidden={true}>
        <Input/>
      </Form.Item>
      <Form.Item label={t.team_name} name={'teamName'}>
        <Input placeholder={t.common_placeholder_input + t.team_name}/>
      </Form.Item>
    </Form>
  </Modal>);
};

// export default React.forwardRef(EditTeamModal);
export default EditTeamModal;
