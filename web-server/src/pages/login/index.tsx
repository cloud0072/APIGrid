import {useRefreshInitialState} from '@/models';
import Actions from '@/pages/login/components/Actions';
import FormLoginByPhone from '@/pages/login/components/FormLoginByPhone';
import FormLoginByPwd from '@/pages/login/components/FormLoginByPwd';
import {sysUserLogin} from '@/services/framework/Login';
import {setToken, StorageType} from '@/utils';
import {LoginFormPage, ProFormCheckbox} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import type {FC} from 'react';
import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

enum LoginType {
  MOBILE = 'MOBILE',
  USERNAME = 'USERNAME',
}

const PageLogin: FC = () => {
  const [loginType, setLoginType] = useState<LoginType>(LoginType.USERNAME);

  const refreshInitialState = useRefreshInitialState();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLoginSuccess = async (autoLogin: boolean, token: string) => {
    setToken(autoLogin ? StorageType.LOCAL_STORAGE : StorageType.SESSION_STORAGE, `Bearer ${token}`);

    await refreshInitialState();

    navigate(searchParams.get('redirect') ?? '/');
  };

  const loginByUsername = async (autoLogin: boolean, data: any) => {

    const {token} = await sysUserLogin({...data, code: ''}, {secure: false});

    await handleLoginSuccess(autoLogin, token);
  };

  const submit = async (e: any) => {
    try {
      const {autoLogin, ...formData} = e;

      if (loginType === LoginType.MOBILE) {
        return;
      }

      if (loginType === LoginType.USERNAME) {
        await loginByUsername(autoLogin, formData);
        return;
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    if (searchParams.get('msg')) {
      message.error(searchParams.get('msg'));
    }
  }, []);

  return (
    <div className="h-[100vh]">
      <LoginFormPage<any>
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="APIGrid"
        subTitle="智慧连接中心"
        actions={<Actions/>}
        onFinish={submit}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          items={[
            {
              label: '账号密码登录',
              key: LoginType.USERNAME,
            },
            {
              label: '手机号登录',
              key: LoginType.MOBILE,
            },
          ]}
        />

        {loginType === LoginType.USERNAME && (
          <FormLoginByPwd/>
        )}

        {loginType === LoginType.MOBILE && <FormLoginByPhone/>}

        <ProFormCheckbox name="autoLogin">自动登录</ProFormCheckbox>
      </LoginFormPage>
    </div>
  );
};

export default PageLogin;
