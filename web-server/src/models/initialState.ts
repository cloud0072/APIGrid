import {useQuery, useQueryClient} from '@tanstack/react-query';
import {atom, useAtomValue, useSetAtom} from 'jotai';
import {convertUserRoutesToMenus, getRouteSettingMap} from "@/utils";

const userRoutes: any[] = [
  {
    name: 'home',
    path: '/',
    component: '',
    meta: {title: '首页', icon: '', noCache: false},
    hidden: true,
    alwaysShow: false,
    children: undefined
  },
  {
    name: 'user',
    path: '/system/user',
    component: '',
    meta: {title: '成员列表', icon: 'icon-user', noCache: false},
    hidden: false,
    alwaysShow: false,
    children: undefined
  },
  {
    name: 'role',
    path: '/system/role',
    component: '',
    meta: {title: '角色列表', icon: 'icon-key', noCache: false},
    hidden: false,
    alwaysShow: false,
    children: undefined
  },
  {
    name: 'datasheet',
    path: '/datasheet/:dstId',
    component: '',
    meta: {title: '表格列表', icon: 'icon-table', noCache: false},
    hidden: false,
    alwaysShow: false,
    children: undefined
  },
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
