import {LockOutlined, SafetyCertificateOutlined, UserOutlined} from '@ant-design/icons';
import {ProFormGroup, ProFormText} from '@ant-design/pro-components';
import type {FC} from 'react';

const FormLoginByPwd: FC = () => {
  return (
    <>
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined/>,
        }}
        placeholder="admin"
        initialValue="admin"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined/>,
        }}
        placeholder="admin"
        initialValue="admin"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      />

      {/*<ProFormGroup>
        <ProFormText
          width={160}
          name="code"
          placeholder="请输入验证码"
          fieldProps={{
            size: 'large',
            prefix: <SafetyCertificateOutlined />,
          }}
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
        />
      </ProFormGroup>*/}
    </>
  );
};

export default FormLoginByPwd;
