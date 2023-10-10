import styles from "@/pages/system/role/style.module.less";
import React, {useContext, useMemo, useState} from "react";
import {DeleteOutlined, EditOutlined, MoreOutlined, UserOutlined} from "@ant-design/icons";
import {Button, theme, Tooltip} from "antd";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";
import {t} from "@/utils/i18n";
import {RoleUserContext} from "@/pages/system/role";
import EditRoleModal from "@/pages/system/role/modal/EditRoleModal";
import {Scrollbars} from 'react-custom-scrollbars';
import classNames from "classnames";
import {UnitRoleApi} from "@/services/framework/UnitRole";
import {MacScrollbar} from "mac-scrollbar";

const ROLE_OPERATE = 'ROLE_OPERATE'
const _ContextMenuTrigger: any = ContextMenuTrigger;
const _ContextMenu: any = ContextMenu;
const _MenuItem: any = MenuItem;

const RoleList = () => {
  const {roleId, setRoleId, roleList, listUnitRole} = useContext(RoleUserContext);

  const {useToken} = theme;
  const {token} = useToken();
  const [current, setCurrent] = useState<any>(null);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState<any>(false);

  const moreClick = (
    e: React.MouseEvent,
    ref: React.RefObject<{ handleContextClick: (e: React.MouseEvent) => void; }>) => {
    if (ref.current) {
      ref.current.handleContextClick(e);
    }
  };
  const onCollect = (role: any) => ({
    key: role.id,
    title: role.roleName
  })
  const handleAddRoleClick = () => {
    setCurrent(() => ({type: 'add'}));
    setEditRoleModalOpen(() => true)
  }
  const handleDeleteRoleClick = (e: MouseEvent, data: any) => {
    UnitRoleApi.deleteByIds(data.key).then(() => {
      listUnitRole()
    })
  }
  const handleRenameRoleClick = (e: MouseEvent, data: any) => {
    setCurrent(() => ({id: data.key, roleName: data.title, type: 'rename'}));
    setEditRoleModalOpen(() => true)
  }

  const renderRole = (role: any) => {
    const isActive = role.id === roleId;
    const style = isActive ? {color: token.colorPrimary} : {}
    const ref = React.createRef<any>();
    return (
      <div className={classNames('roleItem', {'selected': isActive})} key={role.id}>
        <_ContextMenuTrigger
          ref={ref}
          id={ROLE_OPERATE}
          holdToDisplay={-1}
          collect={() => onCollect(role)}
        >
          <Tooltip title={role.roleName} placement="bottomLeft">
            <div style={style} onClick={() => setRoleId(role.id)}><UserOutlined/> {role.roleName}</div>
          </Tooltip>
          <span onClick={e => moreClick(e, ref)}><MoreOutlined/></span>
        </_ContextMenuTrigger>
      </div>
    )
  }

  const addBtnStyle = useMemo(() => ({color: "white", backgroundColor: token.colorPrimary}), []);

  return (
    <div className={styles.roleList}>
      <div className={styles.panelTitle}>{t.role_list_title}</div>
      <div className={styles.panelBtn}>
        <Button style={addBtnStyle} onClick={handleAddRoleClick}>{t.role_list_create}</Button>
      </div>
      <MacScrollbar style={{width: '100%', height: '100%'}}>
        {roleList.map((item: any) => renderRole(item))}
      </MacScrollbar>
      {/*<Scrollbars style={{width: '100%', height: '100%'}}>
        {roleList.map((item: any) => renderRole(item))}
      </Scrollbars>*/}
      {editRoleModalOpen && <EditRoleModal setEditRoleModalOpen={setEditRoleModalOpen} current={current}/>}
      <>
        <_ContextMenu id={ROLE_OPERATE}>
          <_MenuItem onClick={handleRenameRoleClick}><EditOutlined/>{t.role_menu_rename}</_MenuItem>
          <_MenuItem onClick={handleDeleteRoleClick}><DeleteOutlined/>{t.role_menu_delete}</_MenuItem>
        </_ContextMenu>
      </>
    </div>
  )
};

export default RoleList;
