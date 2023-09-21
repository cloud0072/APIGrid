import type {FC} from 'react';
import {createContext, useEffect, useMemo, useRef, useState} from 'react';
import {matchPath, Navigate, useLocation, useOutlet} from 'react-router-dom';

import {Access, PermissionDenied} from '@/components';
import HeaderContent from "@/layouts/components/HeaderContent";
import HeaderTitle from "@/layouts/components/HeaderTitle";
import MenuItem from '@/layouts/components/MenuItem';
import type {KeepAliveElements} from '@/layouts/components/TabsHeader';
import {ProLayout} from '@ant-design/pro-components';
import {useQueryInitialState} from '@/models';
import type {RouteSetting} from '@/utils';
import {useTheme} from "@/hooks/useTheme";
import {debounce} from "lodash-es";

import './index.less';
import MenuHeader from "@/layouts/components/MenuHeader";
import MenuNodeRender from "@/layouts/components/MenuNodePanel/MenuNodeRender";

export type sizeType = {
  clientHeight: number,
  clientWidth: number,
  height: number,
  width: number,
}

export const LayoutContext = createContext({
  height: 0,
  width: 0,
  clientHeight: 0,
  clientWidth: 0,
  collapsed: false,
  setCollapsed: () => {
  },
  menuType: '',
  setMenuType: () => {
  },
} as any)

const Layouts: FC = () => {
  const {data: initialState, isLoading, isError} = useQueryInitialState();
  if (isError) {
    return <Navigate to="/login" replace/>;
  }
  const {pathname} = useLocation();
  const element = useOutlet();
  // const navigate = useNavigate()
  const {layoutToken} = useTheme()

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
  const [menuType, setMenuType] = useState('');
  const menuData = useMemo(() => {
    const menus = initialState?.menus ?? [];
    return menus.filter(m => m.type === menuType);
  }, [menuType, initialState])

  const [frameSize, setFrameSize] = useState<sizeType>({
    clientHeight: 0,
    clientWidth: 0,
    height: 0,
    width: 0,
  })

  useEffect(() => {
    const getPageSize = debounce(() => {
      const {clientHeight, clientWidth} = document.documentElement;
      const frameSize = {
        clientHeight,
        clientWidth,
        height: clientHeight - 56, //head 56 + padding 12 * 2
        width: clientWidth - 248, // menu 248 + padding 12 * 2
      };
      setFrameSize(() => frameSize)
      // console.log('getPageSize', frameSize);
    }, 50);
    getPageSize()
    window.addEventListener('resize', getPageSize)
    return () => window.removeEventListener('resize', getPageSize)
  }, [])
  return (
    <LayoutContext.Provider value={{menuType, setMenuType, collapsed, setCollapsed, ...frameSize}}>
      <ProLayout
        fixedHeader={false}
        layout="mix"
        location={{pathname}}
        loading={isLoading}
        menu={{loading: isLoading}}
        menuDataRender={() => menuData}
        menuHeaderRender={MenuHeader}
        menuItemRender={MenuItem}
        menuExtraRender={MenuNodeRender}
        headerTitleRender={HeaderTitle}
        headerContentRender={HeaderContent}
        token={layoutToken}
        siderWidth={248}
        disableMobile
        collapsedButtonRender={false}
        collapsed={collapsed}
        onCollapse={setCollapsed}
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
    </LayoutContext.Provider>
  );
};

export default Layouts;
