import {Access, PermissionDenied} from '@/components';
import MenuItem from '@/layouts/components/MenuItem';
import type {KeepAliveElements} from '@/layouts/components/TabsHeader';
import TabsHeader from '@/layouts/components/TabsHeader';
import {useAppConfig, useQueryInitialState} from '@/models';
import type {RouteSetting} from '@/utils';
import {ProLayout} from '@ant-design/pro-components';
import TabBarExtraContent from '@/layouts/components/TabBarExtraContent';
import type {FC} from 'react';
import {useMemo, useRef, useState} from 'react';
import {matchPath, Navigate, useLocation, useOutlet} from 'react-router-dom';
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import Logo from '@/assets/logo.svg';
// @ts-ignore
import {Transition} from "react-transition-group";
import './index.less';
import {useTheme} from "@/hooks/useTheme";

const Layouts: FC = () => {
  const {pathname} = useLocation();
  const element = useOutlet();
  // const navigate = useNavigate();

  const {data: initialState, isLoading, isError} = useQueryInitialState();
  if (isError) {
    return <Navigate to="/login" replace/>;
  }
  const routeSettingMap: Record<string, RouteSetting> = initialState?.routeSettingMap ?? {};

  const keepAliveElements = useRef<KeepAliveElements>({});
  const currRouteSettingsKey = Object.keys(routeSettingMap).find((key) => matchPath(key, pathname));
  const isKeepAlive = currRouteSettingsKey ? routeSettingMap[currRouteSettingsKey].isKeepAlive : false;
  if (isKeepAlive) {
    keepAliveElements.current[currRouteSettingsKey!] = element;
  }

  const [cacheKeyMap, setCacheKeyMap] = useState<Record<string, number>>({});
  const removeElementByKey = (key: string) => {
    if (keepAliveElements.current.hasOwnProperty(key)) {
      delete keepAliveElements.current[key];
      setCacheKeyMap((cacheKeyMap) => ({
        ...cacheKeyMap,
        [key]: Math.random(),
      }));
    }
  };
  const refreshElementByKey = (key: string) => {
    setCacheKeyMap((cacheKeyMap) => ({
      ...cacheKeyMap,
      [key]: Math.random(),
    }));
  };
  const appConfig = useAppConfig();
  const [collapsed, setCollapsed] = useState(true);

  const {themeMode, themeColors} = useTheme()
  const layoutToken = useMemo(() => {
    return {
      colorPrimary: themeColors.colorPrimary,
      colorSecondary: themeColors.colorSecondary,
      bgLayout: '#f5f5f5',
      pageContainer: {
        paddingBlockPageContainerContent: 0,
        paddingInlinePageContainerContent: 0,
      },
      header: {
        colorBgHeader: themeColors.colorBgMenu,
        colorHeaderTitle: 'hsla(0,0%,100%,.85)',
      },
      sider: {
        colorMenuBackground: themeColors.colorBgMenu,
        colorBgMenuItemSelected: themeColors.colorBgMenuItemSelected,
        colorMenuItemDivider: 'hsla(0,0%,100%,.08)',
        colorTextMenu: 'hsla(0,0%,100%,.85)',
        colorTextMenuActive: 'hsla(0,0%,100%,.85)',
        colorTextMenuItemHover: 'hsla(0,0%,100%,.85)',
        colorTextMenuSelected: 'hsla(0,0%,100%,.85)',
      }
    }
  }, [themeMode])

  return (
    <ProLayout
      layout="mix"
      loading={isLoading}
      location={{pathname}}
      menu={{loading: isLoading}}
      menuDataRender={() => initialState?.menus ?? []}
      menuItemRender={MenuItem}
      token={layoutToken}
      siderWidth={248}
      disableMobile
      collapsedButtonRender={false}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      headerTitleRender={() => (
        <Transition in={collapsed} timeout={300}>
          {(state: string) => (
            <div className={`bjh-header bjh-header-${state}`}>
              <a className="bjh-header-title">
                <img src={appConfig.logo || Logo} alt=""/>
                <Transition in={collapsed} timeout={300}>
                  <h1 className={`bjh-header-title-text bjh-header-title-text-${state}`}>{appConfig.title}</h1>
                </Transition>
              </a>
            </div>
          )}
        </Transition>
      )}
      headerContentRender={() => (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: layoutToken.colorSecondary,
          color: layoutToken?.sider?.colorTextMenu
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <div
              onClick={() => setCollapsed(!collapsed)}
              style={{
                cursor: 'pointer',
                fontSize: '16px',
                width: '44px',
                textAlign: 'center'
              }}
            >
              {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
            </div>
          </div>

          <TabBarExtraContent/>
        </div>
      )}
    >
      <TabsHeader
        currRouteSettings={currRouteSettingsKey ? routeSettingMap[currRouteSettingsKey] : undefined}
        refreshElementByKey={refreshElementByKey}
        removeElementByKey={removeElementByKey}
      />
      {!isLoading && (
        <Access accessible={!!currRouteSettingsKey} fallback={<PermissionDenied/>}>
          {Object.entries(keepAliveElements.current).map(([key, element]) => (
            <div key={`${key}_${cacheKeyMap?.[key] ?? '_'}`} hidden={!matchPath(key, pathname)}>
              {element}
            </div>
          ))}
          {!isKeepAlive && (
            <div key={`${currRouteSettingsKey}_${cacheKeyMap?.[currRouteSettingsKey!]}`}>
              {element}
            </div>
          )}
        </Access>
      )}
    </ProLayout>
  );
};

export default Layouts;
