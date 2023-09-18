import {useQuery, useQueryClient} from '@tanstack/react-query';
import {atom, useAtomValue, useSetAtom} from 'jotai';
import {convertUserRoutesToMenus, getRouteSettingMap} from "@/utils";

const systemRoutes: any[] = [
  {
    name: 'user',
    path: '/system/user',
    meta: {title: '成员列表', icon: 'icon-user', noCache: false, type: 'system'},
    hidden: false,
    alwaysShow: false,
  },
  {
    name: 'role',
    path: '/system/role',
    meta: {title: '角色列表', icon: 'icon-key', noCache: false, type: 'system'},
    hidden: false,
    alwaysShow: false,
  },
]

const flowRoutes: any[] = [
  {
    name: 'flowItem',
    path: '/flow/item',
    meta: {title: '流程管理', icon: 'icon-branches', noCache: false, type: 'flow'},
    hidden: false,
    alwaysShow: false,
  },
  {
    name: 'flowInstance',
    path: '/flow/instance',
    meta: {title: '流程实例', icon: 'icon-expand', noCache: false, type: 'flow'},
    hidden: false,
    alwaysShow: false,
  },
]

const datasheetRoutes: any[] = [
  {
    name: 'datasheet',
    path: '/datasheet/:dstId',
    meta: {title: '表格列表', icon: 'icon-table', noCache: false, type: 'datasheet'},
    hidden: true,
    alwaysShow: false,
  },
  {
    name: 'form',
    path: '/form/:frmId',
    meta: {title: '智能表单', icon: 'icon-layout', noCache: false, type: 'datasheet'},
    hidden: true,
    alwaysShow: false,
  },
]

const dashboardRoutes: any[] = [
  {
    name: 'dashboard',
    path: '/dashboard/:dsbId',
    meta: {title: '表格列表', icon: 'icon-table', noCache: false, type: 'dashboard'},
    hidden: true,
    alwaysShow: false,
  },
]

const userRoutes: any[] = [
  {
    name: 'home',
    path: '/',
    meta: {title: '首页', icon: '', noCache: false},
    hidden: true,
    alwaysShow: false,
  },
  ...datasheetRoutes,
  ...dashboardRoutes,
  ...systemRoutes,
  ...flowRoutes
]

const initialStateQueryKey = ['global', 'initialState'];

const atomPermissions = atom<Set<string>>(new Set([]));
export const useSetAtomPermissions = () => useSetAtom(atomPermissions);
export const useAtomValuePermissions = () => useAtomValue(atomPermissions);

const atomKeepAliveRoutes = atom<string[]>([]);
export const useSetAtomKeepAliveRoutes = () => useSetAtom(atomKeepAliveRoutes);
export const useAtomValueKeepAliveRoutes = () => useAtomValue(atomKeepAliveRoutes);

export const useQueryInitialState = () => {
  const setAtomPermissions = useSetAtomPermissions();
  const setAtomKeepAliveRoutes = useSetAtomKeepAliveRoutes();

  return useQuery(
    initialStateQueryKey,
    async () => {
      // const [userInfo, userRoutes] = await Promise.all([sysGetUserInfo(), sysLoginGetRouters()]);
      const userInfo = {nickName: 'cloud0072', permissions: []}
      setAtomPermissions(new Set(userInfo.permissions));

      const routeSettingMap = getRouteSettingMap(userRoutes);
      setAtomKeepAliveRoutes(Object.keys(routeSettingMap).filter((i) => routeSettingMap[i].isKeepAlive));
      return {userInfo, routeSettingMap, menus: convertUserRoutesToMenus(userRoutes)};
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  );
};

export const useRefreshInitialState = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(initialStateQueryKey);
};
