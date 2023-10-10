import type {FC} from 'react';
import {useEffect, useState} from "react";
import {useLogout} from '@/hooks';
import {useQueryInitialState} from '@/models';
import {BgColorsOutlined, LogoutOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Avatar, Button, Dropdown, Modal, Space, theme} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useTheme} from "@/hooks/useTheme";
import {layoutThemeList} from "@/utils/theme";
import IconFont from "@/components/IconFont";
import styles from './style.module.less';

enum MenuKey {
  PROFILE = 'PROFILE',
  THEME = 'THEME',
  LOGOUT = 'LOGOUT',
}

const items: MenuProps['items'] = [
  {
    key: MenuKey.PROFILE,
    label: '个人中心',
    icon: <ProfileOutlined/>,
  },
  {
    key: MenuKey.THEME,
    label: '主题颜色',
    icon: <BgColorsOutlined/>,
  },
  {
    type: 'divider',
  },
  {
    key: MenuKey.LOGOUT,
    label: '退出登录',
    icon: <LogoutOutlined/>,
  },
];

const Index: FC = () => {
  const {data} = useQueryInitialState();

  const navigate = useNavigate();

  const logout = useLogout();

  const {themeMode, setThemeMode} = useTheme()
  const [themeModalOpen, setThemeModalOpen] = useState<boolean>(false)
  const [oldTheme, setOldTheme] = useState<string>(themeMode)
  const handleThemeModal = (open: boolean) => {
    if (open) {
      setOldTheme(themeMode)
    }
    setThemeModalOpen(open)
  }
  const onCancelTheme = () => {
    setThemeMode(oldTheme)
    setThemeModalOpen(false)
  }

  const handleMenuClick = async (key: MenuKey) => {
    if (key === MenuKey.LOGOUT) {
      await logout();
      return;
    }

    if (key === MenuKey.PROFILE) {
      navigate('/settings');
      return;
    }

    if (key === MenuKey.THEME) {
      handleThemeModal(true)
      return;
    }
  };

  useEffect(() => {
    console.log('data?.userInfo?.avatar', data?.userInfo?.avatar)
  }, [data])

  return (
    <>
      <Dropdown menu={{items, onClick: ({key}) => handleMenuClick(key as MenuKey)}} placement="bottom" arrow>
        <div className={styles.userName}>
          <Avatar src={data?.userInfo?.avatar} size="small"/>
          <span style={{color: 'white', marginInline: '8px'}}>{data?.userInfo?.nickName ?? ''}</span>
        </div>
      </Dropdown>
      <Modal
        title="外观和配色"
        width='494px'
        style={{bottom: 60}}
        open={themeModalOpen}
        onOk={() => handleThemeModal(false)}
        onCancel={onCancelTheme}
      >
        <div className={'theme-color'}>
          <div className={'theme-color-title'}>配色</div>
          <div className={'theme-color-list'}>
            {layoutThemeList.map(item => (
              <div
                className={'theme-color-block'}
                key={item.mode}
                style={{backgroundColor: item.colorPrimary}}
                onClick={() => setThemeMode(item.mode)}
              >
                {themeMode === item.mode && (
                  <IconFont type="ali-success-fill"/>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Index;
