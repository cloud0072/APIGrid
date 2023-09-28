import {atom, useAtomValue, useSetAtom} from "jotai";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {DatasheetApi} from "@/services/datasheet/Datasheet";

const atomDatasheets = atom<any>({});
export const useSetAtomDatasheets = () => useSetAtom(atomDatasheets);
export const useAtomValueDatasheets = () => useAtomValue(atomDatasheets);

export const useQueryDatasheet = (dstId: string) => {
  const datasheets = useAtomValueDatasheets();
  const setDatasheets = useSetAtomDatasheets();

  return useQuery(
    ['datasheet', dstId],
    async () => {
      const response = await DatasheetApi.getByDstId(dstId)
      setDatasheets(Object.assign(datasheets, {dstId: response.data}));
      return datasheets.dstId
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )
}

export const useRefreshDatasheet = (dstId: string) => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(['datasheet', dstId]);
};
