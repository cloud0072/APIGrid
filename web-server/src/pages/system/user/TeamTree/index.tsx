import styles from "@/pages/system/user/style.module.less";
import React, {useState} from "react";
import {CaretRightOutlined, DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined} from "@ant-design/icons";
import {theme, Tooltip, Tree} from "antd";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";

export interface ITeamTreeNode {
  teamId: string;
  teamName: string;
  parentId: string;
  parentTeamName: string;
  hasChildren: boolean;
  children?: ITeamTreeNode[];
}

const ConfigConstant = {
  ROOT_TEAM_ID: '1000'
}
const TEAM_OPERATE = 'TEAM_OPERATE';
const TEAM_ROOT_OPERATE = 'TEAM_ROOT_OPERATE';

const {DirectoryTree, TreeNode} = Tree;
const _ContextMenu: any = ContextMenu;
const _MenuItem: any = MenuItem;
const _ContextMenuTrigger: any = ContextMenuTrigger;

const treeData = [
  {
    key: '1000',
    title: '根目录',
    isLeaf: false,
    children: [
      {
        key: '1001',
        title: '销售部',
        isLeaf: true,
      },
      {
        key: '1002',
        title: '财务部',
        isLeaf: true,
      },
    ],
  },
];

const MemberTable = (props: any) => {

  const {useToken} = theme;
  const {token} = useToken();
  const [selectKey, setSelectKey] = useState(null);

  const moreClick = (
    e: React.MouseEvent,
    ref: React.RefObject<{ handleContextClick: (e: React.MouseEvent) => void; }>) => {
    if (ref.current) {
      ref.current.handleContextClick(e);
    }
  };
  const onCollect = (data: any) => ({
    key: data.key
  })
  const onSelect = (keys: any[]) => {
    const key = keys[0];
    setSelectKey(() => key);
    props.setTeamKey(() => key);
  }
  const handleAddTeamClick = (e: MouseEvent, data: any) => {
    console.log('handleAddTeamClick', data)
  }
  const handleDeleteTeamClick = (e: MouseEvent, data: any) => {
    console.log('handleDeleteTeamClick', data)
  }
  const handleRenameTeamClick = (e: MouseEvent, data: any) => {
    console.log('handleRenameTeamClick', data)
  }

  const renderTitle = (node: any) => {
    const nodeStyle = node.key === selectKey ? {color: token.colorPrimary} : {}
    const nodeRef = React.createRef<any>();
    return (
      <_ContextMenuTrigger
        ref={nodeRef}
        id={node.key === ConfigConstant.ROOT_TEAM_ID ? TEAM_ROOT_OPERATE : TEAM_OPERATE}
        holdToDisplay={-1}
        collect={() => onCollect(node)}
      >
        <Tooltip title={node.title} placement="bottomLeft">
          <div style={nodeStyle}>{node.title}</div>
        </Tooltip>
        {node.key === ConfigConstant.ROOT_TEAM_ID &&
        <span onClick={e => moreClick(e, nodeRef)}><PlusOutlined style={{visibility: 'visible'}}/></span>}
        {node.key !== ConfigConstant.ROOT_TEAM_ID &&
        <span onClick={e => moreClick(e, nodeRef)}><MoreOutlined/></span>}
      </_ContextMenuTrigger>
    )
  }

  return (
    <div className={styles.teamList}>
      <div className={styles.panelTitle}>小组管理</div>
      <DirectoryTree
        switcherIcon={<div><CaretRightOutlined/></div>}
        titleRender={renderTitle}
        onSelect={onSelect}
        treeData={treeData}
        expandAction={false}
        showIcon={false}
      />
      <>
        <_ContextMenu id={TEAM_OPERATE}>
          <_MenuItem onClick={handleAddTeamClick}><PlusOutlined/>新建小组</_MenuItem>
          <_MenuItem onClick={handleRenameTeamClick}><EditOutlined/>重命名</_MenuItem>
          <_MenuItem onClick={handleDeleteTeamClick}><DeleteOutlined/>删除小组</_MenuItem>
        </_ContextMenu>
        <_ContextMenu id={TEAM_ROOT_OPERATE}>
          <_MenuItem onClick={handleAddTeamClick}><PlusOutlined/>新建小组</_MenuItem>
        </_ContextMenu>
      </>
    </div>
  )
};

export default MemberTable;
