import {useQuery, useQueryClient} from '@tanstack/react-query';
import {atom, useAtomValue, useSetAtom} from 'jotai';
import {convertUserRoutesToMenus, getRouteSettingMap} from "@/utils";
import {MenuNodeApi} from "@/services/framework/MenuNode";

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
    name: 'flowConfig',
    path: '/flow/config',
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
    meta: {title: '智能表格', icon: 'icon-table', noCache: false, type: 'datasheet'},
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
  {
    name: 'dashboard',
    path: '/dashboard/:dsbId',
    meta: {title: '仪表盘', icon: 'icon-dashboard', noCache: false, type: 'datasheet'},
    hidden: true,
    alwaysShow: false,
  },
  {
    name: 'folder',
    path: '/folder/:fodId',
    meta: {title: '目录', icon: 'icon-folder', noCache: false, type: 'datasheet'},
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
  ...systemRoutes,
  ...flowRoutes
]

export interface MenuNode {
  key: string,
  value: string,
  title?: string,
  meta?: any,
  children?: MenuNode[],
}

const initialStateQueryKey = ['global', 'initialState'];

const atomPermissions = atom<Set<string>>(new Set([]));
export const useSetAtomPermissions = () => useSetAtom(atomPermissions);
export const useAtomValuePermissions = () => useAtomValue(atomPermissions);

const atomKeepAliveRoutes = atom<string[]>([]);
export const useSetAtomKeepAliveRoutes = () => useSetAtom(atomKeepAliveRoutes);
export const useAtomValueKeepAliveRoutes = () => useAtomValue(atomKeepAliveRoutes);

const atomMenuNodes = atom<MenuNode[]>([]);
export const useSetAtomMenuNodes = () => useSetAtom(atomMenuNodes);
export const useAtomValueMenuNodes = () => useAtomValue(atomMenuNodes);

export const useQueryInitialState = () => {
  const setPermissions = useSetAtomPermissions();
  const setKeepAliveRoutes = useSetAtomKeepAliveRoutes();
  const setMenuNodes = useSetAtomMenuNodes();

  return useQuery(
    initialStateQueryKey,
    async () => {
      const [userNodes] = await Promise.all([MenuNodeApi.getNodeTree()])
      // console.log('userNodes.data', userNodes.data)
      setMenuNodes(userNodes.data);

      // const [userInfo, userRoutes] = await Promise.all([sysGetUserInfo(), sysLoginGetRouters()]);
      const userInfo = {nickName: 'cloud0072', permissions: []}
      setPermissions(new Set(userInfo.permissions));

      const routeSettingMap = getRouteSettingMap(userRoutes);
      setKeepAliveRoutes(Object.keys(routeSettingMap).filter((i) => routeSettingMap[i].isKeepAlive));

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
