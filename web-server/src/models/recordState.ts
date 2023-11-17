import {atom, useAtom} from "jotai";
import {RecordApi} from "@/services/datasheet/Record";

const atomLoading = atom<boolean>(false);
const atomRowData = atom<any[]>([]);
const atomPageSize = atom<number>(20);
const atomPageNum = atom<number>(1);

export const usePageInfo = () => {
  const [pageSize, setPageSize] = useAtom(atomPageSize)
  const [pageNum, setPageNum] = useAtom(atomPageNum)
  return {
    pageSize,
    setPageSize,
    pageNum,
    setPageNum,
  }
}

export const useQueryRecords = (dstId: string) => {
  const [rowData, setRowData] = useAtom(atomRowData);
  const [loading, setLoading] = useAtom(atomLoading);
  const {pageNum, pageSize} = usePageInfo()

  const handleGetRecords = async (params: any) => {
    setLoading(true)
    const response = await RecordApi(dstId).getPage({pageNum, pageSize, params})
    const data = response?.data?.content || []
    setRowData(data);
    setLoading(false)
    return data;
  }

  return {
    loading,
    pageNum,
    pageSize,
    rowData,
    handleGetRecords
  }
}
