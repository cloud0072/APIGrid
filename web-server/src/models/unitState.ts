import {atom, useAtomValue, useSetAtom} from "jotai";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {UnitUserApi} from "@/services/framework/UnitUser";

const key = ['global', 'users']

const atomUsers = atom<any[]>([]);
export const useSetAtomUsers = () => useSetAtom(atomUsers);
export const useAtomValueUsers = () => useAtomValue(atomUsers);

export const useQueryUsers = () => {
  const setUsers = useSetAtomUsers();
  // const users = useAtomValueUsers();

  return useQuery(
    key,
    async () => {
      const response = await UnitUserApi.getUserOptions()
      setUsers(response.data);
      return response.data
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )
}

export const useRefreshUser = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(key);
};
