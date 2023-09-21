import React, {useContext, useState} from "react";
import {CaretRightOutlined, DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined} from "@ant-design/icons";
import {theme, Tooltip, Tree} from "antd";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";
import {t} from "@/utils/i18n";
import EditTeamModal from "@/pages/system/user/modal/EditTeamModal";
import {TeamTreeContext} from "@/pages/system/user";
import {UnitTeamApi} from "@/services/framework/UnitTeam";

import styles from "@/pages/system/user/style.module.less";

export interface ITreeNode {
  title: string;
  key: string;
  value: string;
  isLeaf: boolean;
  children?: ITreeNode[];
}

const ConfigConstant = {
  ROOT_TEAM_ID: '1'
}
const TEAM_OPERATE = 'TEAM_OPERATE';
const TEAM_ROOT_OPERATE = 'TEAM_ROOT_OPERATE';

const {DirectoryTree, TreeNode} = Tree;
const _ContextMenu: any = ContextMenu;
const _MenuItem: any = MenuItem;
const _ContextMenuTrigger: any = ContextMenuTrigger;

const TeamTree = () => {

  const {teamTree, teamId, setTeamId, listUnitTeam} = useContext(TeamTreeContext);
  const {useToken} = theme;
  const {token} = useToken();
  const [current, setCurrent] = useState<any>(null);
  const [editTeamModalOpen, setEditTeamModalOpen] = useState<any>(false);

  const moreClick = (
    e: React.MouseEvent,
    ref: React.RefObject<{ handleContextClick: (e: React.MouseEvent) => void; }>) => {
    if (ref.current) {
      ref.current.handleContextClick(e);
    }
  };
  const onCollect = (data: any) => ({
    key: data.key,
    title: data.title
  })
  const onSelect = (keys: any[]) => {
    const key = keys[0];
    setTeamId(() => key);
  }
  const handleAddTeamClick = (e: MouseEvent, data: any) => {
    setCurrent(() => ({parentId: data.key, parentTeamName: data.title, type: 'add'}));
    setEditTeamModalOpen(true)
  }
  const handleDeleteTeamClick = (e: MouseEvent, data: any) => {
    UnitTeamApi.deleteByIds(data.key).then(() => {
      listUnitTeam()
    })
  }
  const handleRenameTeamClick = (e: MouseEvent, data: any) => {
    setCurrent(() => ({id: data.key, teamName: data.title, type: 'rename'}));
    setEditTeamModalOpen(true)
  }

  const renderTitle = (node: any) => {
    const nodeStyle = node.key === teamId ? {color: token.colorPrimary} : {}
    const nodeRef = React.createRef<any>();
    return (
      <_ContextMenuTrigger
        ref={nodeRef}
        id={node.value === ConfigConstant.ROOT_TEAM_ID ? TEAM_ROOT_OPERATE : TEAM_OPERATE}
        holdToDisplay={-1}
        collect={() => onCollect(node)}
      >
        <Tooltip title={node.title} placement="bottomLeft">
          <div style={nodeStyle}>{node.title}</div>
        </Tooltip>
        {node.value === ConfigConstant.ROOT_TEAM_ID &&
        <span onClick={e => moreClick(e, nodeRef)}><PlusOutlined style={{visibility: 'visible'}}/></span>}
        {node.value !== ConfigConstant.ROOT_TEAM_ID &&
        <span onClick={e => moreClick(e, nodeRef)}><MoreOutlined/></span>}
      </_ContextMenuTrigger>
    )
  }

  return (
    <div className={styles.teamList}>
      <div className={styles.panelTitle}>{t.team_list_title}</div>
      {teamTree[0] && <DirectoryTree
        switcherIcon={<div><CaretRightOutlined/></div>}
        titleRender={renderTitle}
        onSelect={onSelect}
        treeData={teamTree}
        expandAction={false}
        showIcon={false}
        defaultExpandedKeys={[teamTree[0]?.key]}
      />}
      {editTeamModalOpen && <EditTeamModal setEditTeamModalOpen={setEditTeamModalOpen} current={current}/>}
      <>
        <_ContextMenu id={TEAM_OPERATE}>
          <_MenuItem onClick={handleAddTeamClick}><PlusOutlined/>{t.team_menu_create}</_MenuItem>
          <_MenuItem onClick={handleRenameTeamClick}><EditOutlined/>{t.team_menu_rename}</_MenuItem>
          <_MenuItem onClick={handleDeleteTeamClick}><DeleteOutlined/>{t.team_menu_delete}</_MenuItem>
        </_ContextMenu>
        <_ContextMenu id={TEAM_ROOT_OPERATE}>
          <_MenuItem onClick={handleAddTeamClick}><PlusOutlined/>{t.team_menu_create}</_MenuItem>
        </_ContextMenu>
      </>
    </div>
  )
};

export default TeamTree;
