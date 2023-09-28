import BjhAgGrid from '@/components/BjhAgGrid';
import {BasePageContainer} from "@/components";
import {useParams, useLoaderData} from "react-router-dom";
import {useContext, useEffect, Suspense} from "react";
import {LayoutContext} from "@/layouts";
import {useQueryDatasheet} from "@/models/datasheetState";
import {useQueryRecords} from "@/models/recordState";

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

  useEffect(() => {
    setMenuType('datasheet')
  }, [])

  return (
    <BasePageContainer>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      <BjhAgGrid/>
      {/*</Suspense>*/}
    </BasePageContainer>
  );
};

export default DatasheetPanel;
