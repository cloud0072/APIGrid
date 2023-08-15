import {Form, Input, Modal, Select, TreeSelect, Upload, UploadFile, UploadProps} from "antd";
import {t} from "@/utils/i18n";
import {useContext, useEffect, useState} from "react";
import styles from '../style.module.less';
import {PlusOutlined} from "@ant-design/icons";
import {UnitMemberApi} from "@/services/framework/UnitMember";
import {FileUploadApi} from "@/services/framework/FileUpload";
import {TeamTreeContext} from "@/pages/system/user";
import BaseAvatar from "@/components/BaseAvatar";

const EditMemberModal = ({userId, setOpen}: any) => {

  const {teamTree, listTeamMember} = useContext(TeamTreeContext);
  const [memberInfo, setMemberInfo] = useState<any>({});
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<any>('vertical');
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // init
  useEffect(() => {
    setLoading(true)
    UnitMemberApi.getTeamUserById(userId).then(response => {
      const teamIds = response.data?.teamIds?.split(',').map((id: string) => ({value: id})) || []
      setMemberInfo({...response.data, teamIds})
      form.setFieldsValue({...response.data, teamIds});
    }).finally(() => setLoading(false))
  }, [])

  const handleOk = () => {
    return Promise.resolve().then(() => {
      setLoading(true)
      form.validateFields().then((values) => {
        const teamIds = values.teamIds?.map((d: any) => d.value).join(',') || undefined
        const avatar = fileList[0] ? fileList[0].url : null;
        if (values.userId) {
          return UnitMemberApi.updateUnitUser({...values, teamIds, avatar});
        } else {
          return UnitMemberApi.registerUnitUser({...values, teamIds, avatar});
        }
      }).finally(() => {
        setOpen(() => false)
        setLoading(() => false)
        listTeamMember()
      })
    })
  }

  const handleCancel = () => {
    setOpen(false)
  }

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
      FileUploadApi.getPreSignedPutUrl({
        fileName: file.name,
        mimeType: file.type
      }).then(response => {
        const {putUrl, fileUrl, token} = response;
        if (putUrl) {
          FileUploadApi.upload(putUrl, file).then(() => {
            form.setFieldsValue({avatar: token})
            setFileList([...fileList, {...file, url: fileUrl}]);
          })
        } else {
          setFileList([...fileList, file]);
        }
      })
      return false;
    },
  }

  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  return (<Modal
    title={<div className={styles.modalTitle}>{t.user_modal_title_create}</div>}
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
        {(memberInfo.avatar || memberInfo.avatarColor) ? (<BaseAvatar {...memberInfo} size={100}/>) : (
          <Upload {...uploadProps}>
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        )}
      </div>
    </div>
    <Form
      layout={formLayout}
      form={form}
    >
      <Form.Item name={'userId'} hidden={true}>
        <Input/>
      </Form.Item>
      <Form.Item name={'username'} hidden={true}>
        <Input/>
      </Form.Item>
      <Form.Item label={t.user_nick_name} name={'nickName'}>
        <Input placeholder={t.common_placeholder_input + t.user_nick_name}/>
      </Form.Item>
      <Form.Item label={t.user_mobile} name={'mobile'}>
        <Input placeholder={t.common_placeholder_input + t.user_mobile}/>
      </Form.Item>
      <Form.Item label={t.user_email} name={'email'}>
        <Input placeholder={t.common_placeholder_input + t.user_email}/>
      </Form.Item>
      <Form.Item label={t.user_team} name={'teamIds'}>
        <TreeSelect
          style={{width: '100%'}}
          placeholder={t.common_placeholder_select + t.user_team}
          treeCheckable={true}
          treeCheckStrictly={true}
          showCheckedStrategy={TreeSelect.SHOW_ALL}
          treeDefaultExpandAll={true}
          treeData={teamTree}
        />
      </Form.Item>
    </Form>
  </Modal>);
}

export default EditMemberModal;
