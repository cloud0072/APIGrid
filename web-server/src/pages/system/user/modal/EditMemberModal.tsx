import {Form, Input, Modal, Upload, UploadFile, UploadProps} from "antd";
import {t} from "@/utils/i18n";
import {useState} from "react";
import styles from '../style.module.less';
import {PlusOutlined} from "@ant-design/icons";

const EditMemberModal = ({setEditMemberModalOpen}: any) => {

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<any>('vertical');
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadProps: UploadProps = {
    listType: "picture-circle",
    fileList: fileList,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      console.log('beforeUpload', file)
      setFileList([...fileList, file]);
      return false;
    },
  }

  const onValuesChange = (e: any) => {
    // console.log('onValuesChange', e)
  }
  const handleOk = () => {
    return Promise.resolve().then(() => {
      setLoading(() => true)
      form.validateFields().then((values) => {
        setTimeout(() => {
          console.log('values', values);
          setLoading(() => false)
          setEditMemberModalOpen(false)
        }, 2000)
      })
    })
  }
  const handleCancel = () => {
    setEditMemberModalOpen(false)
  }
  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );
  return (<Modal
    title={<div className={styles.modalTitle}>{t.member_modal_title_create}</div>}
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
    <div className={styles.memberAvatarUpload}>
      <div className={styles.memberAvatarUploadWrapper}>
        <Upload {...uploadProps}>
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </div>
    </div>
    <Form
      layout={formLayout}
      form={form}
      onValuesChange={onValuesChange}
    >
      <Form.Item label={t.member_name} name={'member_name'}>
        <Input placeholder={t.common_placeholder_input + t.member_name}/>
      </Form.Item>
      <Form.Item label={t.mobile} name={'mobile'}>
        <Input placeholder={t.common_placeholder_input + t.mobile}/>
      </Form.Item>
    </Form>
  </Modal>);
}

export default EditMemberModal;
