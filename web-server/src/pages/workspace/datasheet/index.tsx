import BjhAgGrid from '@/components/BjhAgGrid';
import {BasePageContainer} from "@/components";
import {UnitUserApi} from "@/services/framework/UnitUser";
import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {LayoutContext} from "@/layouts";

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
  const params = useParams();

  useEffect(() => {
    setMenuType('datasheet')
    console.log('init', params);
  }, [])

  const getTableInfo = () => {
    const tableColumns = [
      {
        headerName: "userId", //标题
        field: "userId",      //key
        orderNum: 1,          //排序
        editable: false,		//编辑单元格
        resizable: true,	//可调宽度
        sortable: true,		//排序
      },
      {
        headerName: "username",
        field: "username",
        orderNum: 0,
        editable: true,		//编辑单元格
        resizable: true,	//可调宽度
        sortable: true,		//排序
      },
      {
        headerName: "nickName",
        field: "nickName",
        orderNum: 0,
        editable: true,		//编辑单元格
        resizable: true,	//可调宽度
        sortable: true,		//排序
      },
      {
        headerName: "isLocked",
        field: "isLocked",
        orderNum: 3,
        editable: true,		//编辑单元格
        resizable: true,	//可调宽度
        sortable: true,		//排序
      },
      {
        headerName: "createTime",
        field: "createTime",
        orderNum: 4,
        editable: true,		//编辑单元格
        resizable: true,	//可调宽度
        sortable: true,		//排序
      }
    ]
    const tableInfo = {
      tableId: '',
      tableName: '',
      tableType: 'list',
      rowKey: 'userId',
      listApi: '',
      updateApi: '',
      deleteApi: '',
    }
    const viewList = [
      {
        viewId: '1',
        viewName: '全部数据',
        viewType: 'grid',
        lastOpen: true,
        btnList: [],
        colDefsList: tableColumns.map(col => ({field: col.field, headerName: col.headerName, hide: false})),
        colGroupsList: []
      }
    ]
    return Promise.resolve({tableInfo, tableColumns, viewList})
  }

  const loadData = () => UnitUserApi.getPage({pageSize: 10, pageNum: 1}).then(r => r.data.records)

  return (
    <BasePageContainer>
      <BjhAgGrid getTableInfo={getTableInfo} loadData={loadData} getRowId={(p: any) => p.data.userId}/>
    </BasePageContainer>
  );
};

export default DatasheetPanel;
