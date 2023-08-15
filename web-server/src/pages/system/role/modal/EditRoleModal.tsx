import {Form, Input, Modal} from "antd";
import {t} from "@/utils/i18n";
import React, {useContext, useState} from "react";
import styles from '../style.module.less';
import {UnitTeamApi} from "@/services/framework/UnitTeam";
import {TeamTreeContext} from "@/pages/system/user";
import {RoleMemberContext} from "@/pages/system/role";
import {UnitRoleApi} from "@/services/framework/UnitRole";

const EditRoleModal = ({setEditRoleModalOpen, current}: any) => {

  const {listUnitRole} = useContext(RoleMemberContext);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<any>('vertical');
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    return Promise.resolve().then(() => {
      setLoading(() => true)
      form.validateFields().then((values) => {
        if (current.type === 'add') {
          return UnitRoleApi.insert(values)
        } else {
          return UnitRoleApi.updateById(values)
        }
      }).finally(() => {
        setLoading(() => false)
        setEditRoleModalOpen(() => false)
        listUnitRole()
      })
    })
  }
  const handleCancel = () => {
    setEditRoleModalOpen(false)
  }

  const TitleRender = () => (
    <div className={styles.modalTitle}>
      {current.type === 'add' ? t.role_modal_title_create : t.role_modal_title_update}
    </div>
  )

  return (<Modal
    title={<TitleRender/>}
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
      <Form.Item name={'id'} hidden={true}>
        <Input/>
      </Form.Item>
      <Form.Item label={t.role_name} name={'roleName'}>
        <Input placeholder={t.common_placeholder_input + t.role_name}/>
      </Form.Item>
      {
        current.type === 'add' &&
        <Form.Item label={t.role_sort} name={'sortNum'}>
          <Input placeholder={t.common_placeholder_input + t.role_sort}/>
        </Form.Item>
      }
    </Form>
  </Modal>);
};

// export default React.forwardRef(EditTeamModal);
export default EditRoleModal;
