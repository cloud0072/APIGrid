import {atom, useAtom} from "jotai";
import {RecordApi} from "@/services/datasheet/Record";
import {useParams} from "react-router-dom";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";

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
  const {view} = useGrid()

  const handleGetRecords = async () => {
    setLoading(true)
    const response = await RecordApi(dstId).getPage({pageNum, pageSize, params: view?.filterInfo})
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
