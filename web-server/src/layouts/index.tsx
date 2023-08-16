import {Access, PermissionDenied} from '@/components';
import MenuItem from '@/layouts/components/MenuItem';
import type {KeepAliveElements} from '@/layouts/components/TabsHeader';
// import TabsHeader from '@/layouts/components/TabsHeader';
import {useQueryInitialState} from '@/models';
import type {RouteSetting} from '@/utils';
import {ProLayout} from '@ant-design/pro-components';
import TabBarExtraContent from '@/layouts/components/TabBarExtraContent';
import type {FC} from 'react';
import {createContext, useEffect, useMemo, useRef, useState} from 'react';
import {matchPath, Navigate, useLocation, useOutlet} from 'react-router-dom';
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import Logo from '../../public/logo.svg';
// @ts-ignore
import {Transition} from "react-transition-group";
import './index.less';
import {useTheme} from "@/hooks/useTheme";
import {debounce} from "lodash-es";
import env from "@/models/env";

export type sizeType = {
  clientHeight: number,
  clientWidth: number,
  height: number,
  width: number,
}

export const ResizeContext = createContext({
  clientHeight: 0,
  clientWidth: 0,
  height: 0,
  width: 0,
});

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
  // const removeElementByKey = (key: string) => {
  //   if (keepAliveElements.current.hasOwnProperty(key)) {
  //     delete keepAliveElements.current[key];
  //     setCacheKeyMap((cacheKeyMap) => ({
  //       ...cacheKeyMap,
  //       [key]: Math.random(),
  //     }));
  //   }
  // };
  // const refreshElementByKey = (key: string) => {
  //   setCacheKeyMap((cacheKeyMap) => ({
  //     ...cacheKeyMap,
  //     [key]: Math.random(),
  //   }));
  // };
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
        // 展开时样式
        colorMenuBackground: themeColors.colorBgMenu,
        colorBgMenuItemSelected: themeColors.colorBgMenuItemSelected,
        // 折叠时的样式
        colorBgMenuItemCollapsedElevated: themeColors.colorBgMenu,
        colorBgMenuItemCollapsedSelected: themeColors.colorBgMenuItemSelected,
        colorBgMenuItemCollapsedHover: 'hsla(0,0%,100%,.85)',
        colorMenuItemDivider: 'hsla(0,0%,100%,.08)',
        colorTextMenu: 'hsla(0,0%,100%,.85)',
        colorTextMenuActive: 'hsla(0,0%,100%,.85)',
        colorTextMenuItemHover: 'hsla(0,0%,100%,.85)',
        colorTextMenuSelected: 'hsla(0,0%,100%,.85)',
      }
    }
  }, [themeMode])

  const [pageSize, setPageSize] = useState<sizeType>({
    clientHeight: 0,
    clientWidth: 0,
    height: 0,
    width: 0,
  })

  useEffect(() => {
    const getPageSize = debounce(() => {
      const {clientHeight, clientWidth} = document.documentElement;
      const pageSize = {
        clientHeight,
        clientWidth,
        height: clientHeight - 56, //head 56 + padding 12 * 2
        width: clientWidth - 248, // menu 248 + padding 12 * 2
      };
      setPageSize(() => pageSize)
      // console.log('getPageSize', pageSize);
    }, 50);
    getPageSize()
    window.addEventListener('resize', getPageSize)
    return () => window.removeEventListener('resize', getPageSize)
  }, [])

  return (
    <ResizeContext.Provider value={pageSize}>
      <ProLayout
        layout="mix"
        fixedHeader={false}
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
                  <img src={env.VITE_APP_LOGO || Logo} alt=""/>
                  <Transition in={collapsed} timeout={300}>
                    <h1 className={`bjh-header-title-text bjh-header-title-text-${state}`}>{env.VITE_APP_TITLE}</h1>
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
        {/*<TabsHeader
        currRouteSettings={currRouteSettingsKey ? routeSettingMap[currRouteSettingsKey] : undefined}
        refreshElementByKey={refreshElementByKey}
        removeElementByKey={removeElementByKey}
      />*/}
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
    </ResizeContext.Provider>
  );
};

export default Layouts;
