import BjhAgGrid from '@/components/BjhAgGrid';
import {BasePageContainer} from "@/components";
import {useContext, useEffect} from "react";
import {LayoutContext} from "@/layouts";
import {useParams} from "react-router-dom";
import {useQueryDatasheet} from "@/models/datasheetState";
import {useGrid} from "@/components/BjhAgGrid/hooks/useGrid";
import {Spin} from "antd";

/**
 * 加载流程
 * 1获取页面 dstId
 * 2获取 dst 的 meta -> 列信息 隐藏列 排序 筛选 分组
 * 3转化为 agGrid 的配置 初始化框架
 * 4获取 dst 的 records
 *
 * @constructor
 */
const DatasheetPanel = () => {
  const {setMenuType} = useContext(LayoutContext);
  const {nodeId} = useParams() as any;
  const {data: dst, isFetched} = useQueryDatasheet(nodeId!);
  const {dstId, view, setDstId, setDatasheet, setViewId, setCheckAll} = useGrid();

  useEffect(() => {
    setMenuType('datasheet')
  }, [])

  useEffect(() => {
    if (nodeId != dstId) {
      setDstId(nodeId)
      setCheckAll(false)
    }
  }, [nodeId])

  useEffect(() => {
    if (dst) {
      console.log('init datasheet', dst)
      const {views} = dst;
      setViewId(views?.[0]?.id)
      setDatasheet(dst)
    }
  }, [dst])

  return (
    <BasePageContainer>
      {isFetched && view ? <BjhAgGrid/> : <Spin spinning={true}/>}
    </BasePageContainer>
  );
};

export default DatasheetPanel;
