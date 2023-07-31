import {useQuery, useQueryClient} from '@tanstack/react-query';
import {atom, useAtomValue, useSetAtom} from 'jotai';
import {convertUserRoutesToMenus, getRouteSettingMap, RouteSetting} from "@/utils";
import {menus} from "@/routes";

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

      const routeSettingMap = getRouteSettingMap(menus);
      setAtomKeepAliveRoutes(Object.keys(routeSettingMap).filter((i) => routeSettingMap[i].isKeepAlive));
      return {userInfo, routeSettingMap, menus: convertUserRoutesToMenus(menus)};
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
