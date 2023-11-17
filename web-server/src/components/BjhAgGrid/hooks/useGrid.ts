import {atom, useAtom} from "jotai";
import {Column, Field, View, RowHeightItems} from "@/components/BjhAgGrid/constants";
import {isEqual, throttle} from "lodash-es";
import {DatasheetApi} from "@/services/datasheet/Datasheet";
import {App} from "antd";

const atomDatasheet = atom<any>({})
const atomDstId = atom<string>('')
const atomViewId = atom<string>('')
const atomCheckedList = atom<any[]>([])
const atomCheckAll = atom<boolean>(false)
const atomIndeterminate = atom<boolean>(false)

const atomFieldMap = atom<any>((get) => {
  const dst = get(atomDatasheet);
  return dst.fieldMap;
})
const atomViews = atom<View[]>((get) => {
  const dst = get(atomDatasheet);
  return dst.views;
})
const atomView = atom<View>((get) => {
  const dst = get(atomDatasheet);
  const viewId = get(atomViewId);
  return dst?.views?.find((v: View) => v.id === viewId);
})

/**
 * 方法体中必须get基础atom,不能多级调用, 否则不能响应变化
 */
const atomRowHeight = atom<number>((get) => {
  const dst = get(atomDatasheet);
  const viewId = get(atomViewId);
  const view = dst.views?.find((v: View) => v.id === viewId);
  const i = view ? view.rowHeightLevel : 0;
  return RowHeightItems[i].height;
})

export const useGrid = () => {
  /**
   * 当前dst, 未持久化保存
   */
  const [datasheet, setDatasheet] = useAtom(atomDatasheet);
  const [dstId, setDstId] = useAtom(atomDstId);
  const [viewId, setViewId] = useAtom(atomViewId);
  const [indeterminate, setIndeterminate] = useAtom(atomIndeterminate);
  const [checkAll, setCheckAll] = useAtom(atomCheckAll);
  const [checkedList, setCheckedList] = useAtom(atomCheckedList);
  const [fieldMap] = useAtom(atomFieldMap)
  const [views] = useAtom(atomViews)
  const [view] = useAtom(atomView)
  const [rowHeight] = useAtom(atomRowHeight)

  const {message} = App.useApp()

  const setView = (val: View) => {
    if (!isEqual(val, views.find(v => v.id == val.id))) {
      const nVal = views.map((v: View) => v.id === val.id ? val : v);
      setDatasheet((prev: any) => Object.assign({}, prev, {views: nVal}))
    }
  }

  const setFieldVisible = (fieldId: string, hidden: boolean) => {
    const columns = view?.columns?.map((col: Column) => {
      return fieldId === col.fieldId ? Object.assign(col, {hidden: hidden}) : col
    })
    setView(Object.assign({}, view, {columns}));
  }

  const setFieldWidth = (fieldId: string, width: number) => {
    const columns = view?.columns?.map((col: Column) => {
      return fieldId === col.fieldId ? Object.assign(col, {width}) : col
    })
    setView(Object.assign({}, view, {columns}));
  }

  const findFieldType = (fieldId: string) => {
    if (!fieldId) {
      return null;
    }
    const f = fieldMap?.[fieldId] as Field;
    return f.type;
  }

  const handleSubmitDatasheet = throttle(() => {
    if (datasheet.dstId) {
      DatasheetApi.updateByDstId(datasheet).then((response: any) => {
        return response.code == 200 ? null : message.error('保存失败');
      })
    }
  }, 1000, {trailing: false})

  return {
    dstId, setDstId,
    datasheet, setDatasheet,
    viewId, setViewId,
    indeterminate, setIndeterminate,
    checkAll, setCheckAll,
    checkedList, setCheckedList,
    rowHeight,
    fieldMap,
    views,
    view, setView,
    setFieldVisible,
    setFieldWidth,
    findFieldType,
    handleSubmitDatasheet,
  }
}
