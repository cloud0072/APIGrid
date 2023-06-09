import {useQuery, useQueryClient} from '@tanstack/react-query';
import {atom, useAtomValue, useSetAtom} from 'jotai';
import {convertUserRoutesToMenus, getRouteSettingMap, RouteSetting} from "@/utils";
import {RouterVo} from "@/services/system/data-contracts";

const initialStateQueryKey = ['global', 'initialState'];

const atomPermissions = atom<Set<string>>(new Set([]));
export const useSetAtomPermissions = () => useSetAtom(atomPermissions);
export const useAtomValuePermissions = () => useAtomValue(atomPermissions);

const atomKeepAliveRoutes = atom<string[]>([]);
export const useSetAtomKeepAliveRoutes = () => useSetAtom(atomKeepAliveRoutes);
export const useAtomValueKeepAliveRoutes = () => useAtomValue(atomKeepAliveRoutes);

export const routes: RouterVo[] = [
  {
    name: 'test',
    path: '/demo',
    component: '',
    meta: {title: '演示菜单', icon: '', noCache: false},
    hidden: false,
    alwaysShow: false,
    children: [
      {
        name: 'demo',
        path: '/demo/demo',
        component: '',
        meta: {title: 'Demo', icon: '', noCache: false},
        hidden: false,
        alwaysShow: false,
      },
      {
        name: 'tree',
        path: '/demo/tree',
        component: '',
        meta: {title: 'Tree', icon: '', noCache: false},
        hidden: false,
        alwaysShow: false,
      }
    ]
  },
  {
    name: 'user',
    path: '/system/user',
    component: '',
    meta: {title: '用户列表', icon: '', noCache: false},
    hidden: false,
    alwaysShow: false,
    children: undefined
  }
]

export const useQueryInitialState = () => {
  const setAtomPermissions = useSetAtomPermissions();
  const setAtomKeepAliveRoutes = useSetAtomKeepAliveRoutes();

  return useQuery(
    initialStateQueryKey,
    async () => {
      // const [userInfo, userRoutes] = await Promise.all([sysLoginGetInfo(), sysLoginGetRouters()]);
      const userInfo = {nickName: '', permissions: ['demo', '/demo/demo']}
      setAtomPermissions(new Set(userInfo.permissions));

      const routeSettingMap = getRouteSettingMap(routes);
      setAtomKeepAliveRoutes(Object.keys(routeSettingMap).filter((i) => routeSettingMap[i].isKeepAlive));
      return {userInfo, routeSettingMap, menus: convertUserRoutesToMenus(routes)};
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
