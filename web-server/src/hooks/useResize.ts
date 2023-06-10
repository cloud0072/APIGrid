import {useEffect, useState} from "react";
import {debounce} from "lodash-es";

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
  const [pageSize, setPageSize] = useState<sizeType>({
    clientHeight: 0,
    clientWidth: 0,
    height: 0,
    width: 0,
  })

  const getPageSize = () => {
    const {clientHeight, clientWidth} = document.documentElement;
    const pageSize = {
      clientHeight,
      clientWidth,
      height: clientHeight - 56, //head 56 + tab 40 + padding 12 * 2
      width: clientWidth - 248, // menu 248 + padding 12 * 2
    };
    // console.log('getPageSize', pageSize);
    // console.log('getPageSize', Date.now());
    setPageSize(() => pageSize)
  };

  useEffect(() => {
    getPageSize();
    window.onresize = debounce(getPageSize, 10);
  }, [])

  return pageSize
}
