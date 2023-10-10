import styles from './style.module.less';
import React from "react";
import {
  DashboardOutlined,
  DeleteOutlined, EditOutlined,
  FileExcelOutlined,
  FolderAddOutlined, KeyOutlined,
  TableOutlined
} from "@ant-design/icons";
import {t} from "@/utils/i18n";

export const MenuRootId = '0';

export const FirstNodePreNodeId = '1'

export const MenuActionKey = {
  // panel
  AddFolder: 'AddFolder',
  AddDatasheet: 'AddDatasheet',
  AddDashboard: 'AddDashboard',
  AddExcel: 'AddExcel',
  // node
  Export: 'Export',
  Rename: 'Rename',
  Permission: 'Permission',
  Delete: 'Delete',
  // field
  EditField: 'EditField',
  DeleteField: 'DeleteField',
  FrozenField: 'FrozenField',
  HideField: 'HideField',
}

export const NodeTypeKey = {
  root: 'root',
  folder: 'folder',
  datasheet: 'datasheet',
  form: 'form',
  dashboard: 'dashboard',
  mirror: 'mirror',
}

/**
 * 节点类型
 * 0 root
 * 1 folder
 * 2 datasheet
 * 3 form
 * 4 dashboard
 * 5 mirror
 */
export const NODE_TYPE_MAP = {
  [NodeTypeKey.root]: 0,
  [NodeTypeKey.folder]: 1,
  [NodeTypeKey.datasheet]: 2,
  [NodeTypeKey.form]: 3,
  [NodeTypeKey.dashboard]: 4,
  [NodeTypeKey.mirror]: 5
}

export const MenuLabel = ({icon, title}: any) => {
  return (
    <div className={styles.menuLabel}>
      <span className={styles.menuLabelIcon}>{icon}</span>
      <span>{title}</span>
    </div>
  )
}

export const panelMenus: any[] = [
  {
    key: MenuActionKey.AddFolder,
    label: <MenuLabel icon={<FolderAddOutlined/>} title={t.menu_node_fod_create}/>,
  },
  {
    key: MenuActionKey.AddDatasheet,
    label: <MenuLabel icon={<TableOutlined/>} title={t.menu_node_dst_create}/>,
  },
  {
    key: MenuActionKey.AddDashboard,
    label: <MenuLabel icon={<DashboardOutlined/>} title={t.menu_node_dsb_create}/>,
  },
  {
    key: MenuActionKey.AddExcel,
    label: <MenuLabel icon={<FileExcelOutlined/>} title={t.menu_node_excel_create}/>,
  }
]

export const getMenuItems = (node: any) => {
  const nodeType = node!.meta!.nodeType;
  switch (nodeType) {
    case NODE_TYPE_MAP.datasheet:
      return [
        {
          key: MenuActionKey.Export,
          label: <MenuLabel icon={<FileExcelOutlined/>} title={t.menu_node_export}/>,
        },
        {
          key: MenuActionKey.Rename,
          label: <MenuLabel icon={<EditOutlined/>} title={t.menu_node_rename}/>,
        },
        {
          key: MenuActionKey.Permission,
          label: <MenuLabel icon={<KeyOutlined/>} title={t.menu_node_permission}/>,
        },
        {
          key: MenuActionKey.Delete,
          label: <MenuLabel icon={<DeleteOutlined/>} title={t.menu_node_delete}/>,
        },
      ]
    case NODE_TYPE_MAP.dashboard:
    case NODE_TYPE_MAP.mirror:
    case NODE_TYPE_MAP.folder:
      return [
        {
          key: MenuActionKey.Rename,
          label: <MenuLabel icon={<EditOutlined/>} title={t.menu_node_rename}/>,
        },
        {
          key: MenuActionKey.Permission,
          label: <MenuLabel icon={<KeyOutlined/>} title={t.menu_node_permission}/>,
        },
        {
          key: MenuActionKey.Delete,
          label: <MenuLabel icon={<DeleteOutlined/>} title={t.menu_node_delete}/>,
        },
      ]
    default:
      return []
  }
}
