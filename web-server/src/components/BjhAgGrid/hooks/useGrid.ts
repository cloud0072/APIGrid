import {atom, useAtom} from "jotai";
import {useEffect} from "react";

const atomDatasheet = atom<any>({})
const atomRowData = atom<any[]>([])
const atomDstId = atom<string>('')
const atomViewId = atom<string>('')
const atomIndeterminate = atom<boolean>(false)
const atomCheckAll = atom<boolean>(false)
const atomCheckedList = atom<any[]>([])

export const useGrid = () => {

  const [datasheet, setDatasheet] = useAtom(atomDatasheet);
  const [rowData, setRowData] = useAtom(atomRowData);
  const [dstId, setDstId] = useAtom(atomDstId);
  const [viewId, setViewId] = useAtom(atomViewId);
  const [indeterminate, setIndeterminate] = useAtom(atomIndeterminate);
  const [checkAll, setCheckAll] = useAtom(atomCheckAll);
  const [checkedList, setCheckedList] = useAtom(atomCheckedList);

  return {
    dstId, setDstId,
    rowData, setRowData,
    datasheet, setDatasheet,
    viewId, setViewId,
    indeterminate, setIndeterminate,
    checkAll, setCheckAll,
    checkedList, setCheckedList,
  }
}
