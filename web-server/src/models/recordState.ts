import {atom, useAtomValue, useSetAtom} from "jotai";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {DatasheetApi} from "@/services/datasheet/Datasheet";
import {RecordApi} from "@/services/datasheet/Record";
import {useState} from "react";

const atomRecords = atom<any>({});
export const useSetAtomRecords = () => useSetAtom(atomRecords);
export const useAtomValueRecords = () => useAtomValue(atomRecords);

export const useQueryRecords = (dstId: string) => {
  const setRecords = useSetAtomRecords();
  const records = useAtomValueRecords();

  return useQuery(
    ['record', dstId],
    async () => {
      const response = await RecordApi(dstId).getList()
      setRecords(Object.assign(records, {dstId: response.data}));
      return records.dstId
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )
}

export const useRefreshRecord = (dstId: string) => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(['datasheet', dstId]);
};
