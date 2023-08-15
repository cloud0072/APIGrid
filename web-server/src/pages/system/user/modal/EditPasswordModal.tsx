import styles from "@/pages/system/user/style.module.less";
import {t} from "@/utils/i18n";
import {Form, Input, Modal, TreeSelect} from "antd";
import {useEffect, useState} from "react";
import {useQueryInitialState} from "@/models";
import {UnitMemberApi} from "@/services/framework/UnitMember";

const EditPasswordModal = (props: any) => {
  const {userId, setOpen} = props;

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<any>('vertical');
  const [loading, setLoading] = useState<boolean>(false);
  const {data} = useQueryInitialState();

  // init
  useEffect(() => {
    setLoading(true)
    UnitMemberApi.getTeamUserById(userId).then(response => {
      console.log('userInfo', data);
      form.setFieldsValue({...response.data});
    }).finally(() => setLoading(false))
  }, [])

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('handleOk', values)
    })
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }
  return <Modal
    title={<div className={styles.modalTitle}>{t.user_modal_title_resetpwd}</div>}
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
    >
      <Form.Item name={'userId'} hidden={true}>
        <Input/>
      </Form.Item>
      <Form.Item label={t.user_nick_name} name={'nickName'}>
        <Input placeholder={t.common_placeholder_input + t.user_nick_name} disabled={true}/>
      </Form.Item>
      {
        <Form.Item label={t.user_old_pwd} name={'password'}>
          <Input type={'password'} placeholder={t.common_placeholder_input + t.user_old_pwd}/>
        </Form.Item>
      }
      <Form.Item label={t.user_new_pwd} name={'newPwd'}>
        <Input type={'password'} placeholder={t.common_placeholder_input + t.user_new_pwd}/>
      </Form.Item>
    </Form>
  </Modal>
}

export default EditPasswordModal;
