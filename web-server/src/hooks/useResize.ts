import {useEffect, useState} from "react";
import {throttle} from "lodash-es";

// 全局变量
// const atomPageHeight = atom<number>(0)
// export const useSetAtomPageHeight = () => useSetAtom(atomPageHeight);
// export const useAtomValuePageHeight = () => useAtomValue(atomPageHeight);

export type sizeType = {
  clientHeight: number,
  clientWidth: number,
  height: number,
  width: number,
}

export const useResize = () => {
  // const setAtomPageHeight = useSetAtomPageHeight();
  // const pageHeight = useAtomValuePageHeight();
  const [pageSize, setPageSize] = useState<sizeType>({
    clientHeight: 0,
    clientWidth: 0,
    height: 0,
    width: 0,
  })

  const getSize = () => {
    const {clientHeight, clientWidth} = document.documentElement;
    setPageSize(() => ({
      clientHeight,
      clientWidth,
      height: clientHeight - 120, //head 56 + tab 40 + padding 12 * 2
      width: clientWidth - 272, // menu 248 + padding 12 * 2
    }))
  };

  useEffect(() => {
    getSize();
    window.onresize = throttle(getSize, 100);
  }, [])

  return {
    pageSize
  }
}
