import BjhAgGrid from '@/components/BjhAgGrid';
import {BasePageContainer} from "@/components";
import {getUserList} from "@/services/framework/User";

const PageSelClueList = () => {

  const getTableInfo = () => {
    const tableColumns = [
      {
        headerName: "userId",
        field: "userId",
        orderNum: 1,
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
        headerName: "password",
        field: "password",
        orderNum: 2,
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
      rowKey: 'id',
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
        colDefsList: tableColumns.map(col => ({field: col.field, headerName: col.headerName, hidden: false})),
        colGroupsList: []
      }
    ]
    return Promise.resolve({tableInfo, tableColumns, viewList})
  }
  const loadData = () => getUserList({pageSize: 10, pageNum: 1}).then(r => r.records)

  return (
    <BasePageContainer>
      <BjhAgGrid getTableInfo={getTableInfo} loadData={loadData}/>
    </BasePageContainer>
  );
};

export default PageSelClueList;
