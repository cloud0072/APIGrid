import React from "react";
import dayjs from "dayjs";

import IconFont from "@/components/IconFont";
import RowIndexCell from "@/components/BjhAgGrid/cell/RowIndexCell";
import SelectCell from "@/components/BjhAgGrid/cell/SelectCell";
import SelectEditor from "@/components/BjhAgGrid/cell/SelectEditor";
import FileAssetCell from "@/components/BjhAgGrid/cell/FileAssetCell";
import FileAssetEditor from "@/components/BjhAgGrid/cell/FileAssetEditor";
import MemberCell from "@/components/BjhAgGrid/cell/MemberCell";
import MemberEditor from "@/components/BjhAgGrid/cell/MemberEditor";

export type Column = {
  fieldId: string,
  desc?: boolean,
  hidden?: boolean,
  statType?: number,
  width?: number,
}

export type Field = {
  id: string,
  name: string,
  type: number,
  property?: {
    defaultValue?: string,
    precision?: number,
    symbolAlign?: number,
    options?: any[]
  }
}

export type View = {
  id: string,
  name: string,
  rowHeightLevel: number,
  frozenColumnCount: number,
  sortInfo?: Column[],
  groupInfo?: Column[],
  filterInfo?: any[],
  columns: Column[],
}

export type ColDef = {
  sortIndex?: number,
  field?: string,
  width?: number,
  editable?: boolean,
  resizable?: boolean,
  sortable?: boolean,
  lockPinned?: boolean,
  hide?: boolean,
  rowGroup?: boolean,
  suppressNavigable?: boolean,
  headerName?: string,
  cellClass?: string,
  pinned?: ("left" | "right"),
  lockPosition?: ("left" | "right"),
  cellRenderer?: any
}

export type FileAsset = {
  id?: string;
  fileName?: string;
  fileUrl?: string;
  token?: string;
  md5?: string;
  mimeType: string;
  size: number;
}

export const RowHeightItems = [
  {
    label: '紧凑',
    value: 0,
    height: 32,
    icon: <IconFont type="ali-rightalignment"/>,
  },
  {
    label: '标准',
    value: 1,
    height: 48,
    icon: <IconFont type="ali-rightalignment"/>,
  },
  {
    label: '宽松',
    value: 2,
    height: 64,
    icon: <IconFont type="ali-rightalignment"/>,
  },
  {
    label: '超大',
    value: 3,
    height: 96,
    icon: <IconFont type="ali-rightalignment"/>,
  },
]

export const createMenuItems = [
  {
    key: '1',
    icon: <IconFont type="ant-edit"/>,
    label: '修改按钮名称'
  }
]

export const groupSortItems = [
  {label: 'A → Z', value: 'asc'},
  {label: 'Z → A', value: 'desc'},
];

export const filterRelItems = [
  {label: '并且', value: 'and'},
  {label: '或者', value: 'or'},
];

// public enum FieldType
export const FieldTypeOptions = [
  {value: 1, label: '单行文本'},
  {value: 2, label: '数字'},
  {value: 3, label: '日期'},
  {value: 4, label: '选项'},
  {value: 5, label: '附件'},
  {value: 6, label: '成员'},
  {value: 10, label: '多行文本'},
  {value: 11, label: '勾选'},
  {value: 20, label: '自增数字'},
  {value: 21, label: '创建时间'},
  {value: 22, label: '修改时间'},
  {value: 23, label: '创建人'},
  {value: 24, label: '修改人'},
]

export const findSuperType = (type: any) => {
  switch (type) {
    case 1:
    case 10:
      // 文本
      return 'text';
    case 2:
    case 20:
      // 数字
      return 'number';
    case 3:
    case 21:
    case 22:
      // 日期
      return 'date';
    case 4:
      // 选择
      return 'select';
    case 5:
      return 'file';
    case 6:
    case 23:
    case 24:
      // 人员
      return 'member';
    case 11:
      return 'check';
    default:
      return null;
  }
}

export const getFilterSymbolItems = (type: any) => {
  switch (type) {
    case 'number':
    case 'date':
      // 数字 日期
      return [
        {label: '小于', value: 'lt'},
        {label: '小于等于', value: 'lte'},
        {label: '等于', value: 'is'},
        {label: '大于', value: 'gt'},
        {label: '大于等于', value: 'gte'},
        {label: '为空', value: 'isNull'},
        {label: '不为空', value: 'isNotNull'}
      ];
    case 'text':
      // 文本
      return [
        {label: '等于', value: 'is'},
        {label: '包含', value: 'like'},
        {label: '为空', value: 'isNull'},
        {label: '不为空', value: 'isNotNull'}
      ];
    case 'member':
    case 'select':
      // 成员 选择
      return [
        {label: '等于', value: 'eq'},
        {label: '包含', value: 'all'},
        {label: '为空', value: 'isNull'},
        {label: '不为空', value: 'isNotNull'}
      ];
    default:
      return [
        {label: '不支持', value: 'skip'}
      ];
  }
}

export const defaultColDef = {
  sortable: true,
  resizable: true,
  editable: true,
  lockPinned: true,
};

export const rowIndexCol: ColDef[] = [{
  field: "row_index",
  width: 80,
  editable: false,
  sortable: false,
  resizable: false,
  lockPinned: true,
  lockPosition: 'left',
  suppressNavigable: true,
  cellClass: 'no-focus-border',
  cellRenderer: RowIndexCell
}];

export const addFieldCol: ColDef[] = [{
  field: "add_field",
  width: 80,
  editable: false,
  resizable: false,
  sortable: false,
  lockPinned: true,
  lockPosition: 'right',
  suppressNavigable: true,
  cellClass: 'no-focus-border'
}];

export const dateFormatter = (date: any) => dayjs(date).format('YYYY-MM-DD');

export const getCellConf = (field: any, users?: any[]) => {
  const {type} = field;
  // if (type == 6 || type == 23 || type == 24) {
  //   const users = useAtomValueUsers();
  //   console.log('users', users)
  // }
  switch (type) {
    case 1:
      return {
        cellEditor: 'agTextCellEditor'
      }
    case 2:
      return {
        cellEditor: 'agNumberCellEditor'
      }
    case 3:
      return {
        cellEditor: 'agDateStringCellEditor',
        valueFormatter: (params: any) => params.value ? dateFormatter(params.value) : params.value
      }
    case 4:
      return {
        valueParser: (params: any) => params.value ? params.split(',') : [],
        valueFormatter: (params: any) => params.value ? params.value.join(',') : '',
        cellRenderer: SelectCell,
        cellEditor: SelectEditor,
      }
    case 5:
      return {
        valueParser: (params: any) => params.value ? params.split(',') : [],
        valueFormatter: (params: any) => params.value ? params.value.join(',') : '',
        cellRenderer: FileAssetCell,
        cellEditor: FileAssetEditor,
      }
    case 6:
      return {
        valueParser: (params: any) => params.value ? params.split(',') : [],
        valueFormatter: (params: any) => params.value ? params.value.join(',') : '',
        cellRenderer: MemberCell,
        cellEditor: MemberEditor,
      }
    case 10:
      return {
        cellEditor: 'agLargeTextCellEditor',
        cellEditorPopup: true,
      }
    case 11:
      return {
        cellEditor: 'agCheckboxCellEditor',
        cellRenderer: 'agCheckboxCellRenderer'
      }
    case 20:
      return {
        editable: false,
      }
    case 21:
      return {
        editable: false,
        valueFormatter: (params: any) => dateFormatter(params.data.createTime)
      }
    case 22:
      return {
        editable: false,
        valueFormatter: (params: any) => dateFormatter(params.data.updateTime)
      }
    case 23:
      return {
        editable: false,
        valueFormatter: (params: any) => users?.find(u => u.id === params.data.createBy)?.name
      }
    case 24:
      return {
        editable: false,
        valueFormatter: (params: any) => users?.find(u => u.id === params.data.updateBy)?.name
      }
    default:
      return {}
  }
}
