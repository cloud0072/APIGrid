import styles from './style.module.less';
import React, {useContext, useEffect, useMemo, useState} from "react";
import {LayoutContext} from "@/layouts";
import {useAtomValueMenuNodes, useRefreshInitialState} from "@/models";
import {CaretRightOutlined, MoreOutlined, PlusOutlined,} from "@ant-design/icons";
import {MenuNodeApi} from "@/services/framework/MenuNode";
import {getNewId} from "@/utils/idUtils";
import {useNavigate, useParams} from "react-router-dom";
import {Dropdown, Input, Tree} from "antd";
import {
  getMenuItems,
  MenuActionKey,
  MenuRootId,
  NODE_TYPE_MAP,
  NodeTypeKey,
  panelMenus
} from "@/layouts/components/MenuNodePanel/menu_context";
import {useTheme} from "@/hooks/useTheme";

const {DirectoryTree} = Tree;

const RenderTitle = ({node, editNodeKey, handleRename, handleClick}: any) => {
  const menuItems = getMenuItems(node);
  const inputRef = React.createRef<any>()
  const handleBlur = () => {
    const value = inputRef.current?.input?.value
    node.nodeName = value ? value : node.nodeName;
    handleRename(node);
  }

  return (
    <div className={styles.menuTitle}>
      {
        editNodeKey === node.key ?
          <div className={styles.menuTitleEdit}>
            <Input defaultValue={node.title} autoFocus={true} ref={inputRef} onBlur={handleBlur}/>
          </div> :
          <>
            <Dropdown
              menu={{items: menuItems, onClick: (e) => handleClick(e, node)}}
              trigger={['contextMenu']}>
              <div className={styles.menuTitleText}>{node.title}</div>
            </Dropdown>
            <div className={styles.menuTitleExtra}>
              <Dropdown
                menu={{items: panelMenus, onClick: (e) => handleClick(e, node)}}
                trigger={['contextMenu', 'click']}
              >
                <span><PlusOutlined/></span>
              </Dropdown>
              <Dropdown
                menu={{items: menuItems, onClick: (e) => handleClick(e, node)}}
                trigger={['contextMenu', 'click']}
              >
                <span><MoreOutlined/></span>
              </Dropdown>
            </div>
          </>
      }
    </div>
  )
}

const MenuNodeRender = () => {
  const menuNodes = useAtomValueMenuNodes();
  const {menuType, height} = useContext(LayoutContext);
  const {themeColors} = useTheme();
  const navigate = useNavigate();
  const params: any = useParams();

  // useEffect(() => {
  //   console.log('params', params)
  // }, [params])

  const [editNodeKey, setEditNodeKey] = useState('');

  const show = useMemo(() => menuType == NodeTypeKey.datasheet, [menuType]);

  const onSelect = (keys: any[]) => {
    const key = keys[0];
    handleNavigate(key)
  }

  const handleNavigate = (nodeId: string) => {
    const prefix = nodeId.substring(0, 3);
    switch (prefix) {
      case 'dst':
        navigate(`/datasheet/${nodeId}`)
        break;
      case 'dsb':
        navigate(`/dashboard/${nodeId}`)
        break;
      case 'fod':
        navigate(`/folder/${nodeId}`)
        break;
      case 'frm':
        navigate(`/form/${nodeId}`)
        break;
      case 'mir':
        navigate(`/mirror/${nodeId}`)
        break
    }
  }

  const refreshInitialState = useRefreshInitialState();

  const handleClick = (event: any, node?: any) => {
    console.log('handleClick', node)
    let dstId = ''
    switch (event.key) {
      case MenuActionKey.AddDatasheet:
        dstId = getNewId('dst');
        MenuNodeApi
          .insert({
            nodeId: dstId,
            nodeType: NODE_TYPE_MAP[NodeTypeKey.datasheet],
            parentId: node?.key || MenuRootId,
            isDeleted: 0
          })
          .then(refreshInitialState)
          .then(() => {
            handleNavigate(dstId)
          })
        break;
      case MenuActionKey.AddDashboard:
        break;
      case MenuActionKey.AddFolder:
        dstId = getNewId('fod');
        MenuNodeApi
          .insert({
            nodeId: dstId,
            nodeType: NODE_TYPE_MAP[NodeTypeKey.folder],
            parentId: node?.key || MenuRootId,
            isDeleted: 0
          })
          .then(refreshInitialState)
        break;
      case MenuActionKey.AddExcel:
        break;
      case MenuActionKey.Rename:
        setEditNodeKey(node.key)
        break;
      case MenuActionKey.Delete:
        MenuNodeApi
          .deleteByNodeIds(node.key)
          .then(refreshInitialState)
        break;
      default:
    }
  }

  const handleRename = (node: any) => {
    setEditNodeKey('');
    MenuNodeApi
      .updateByNodeId({nodeId: node.key, nodeName: node.nodeName})
      .then(refreshInitialState)
  }

  return (
    <>{show &&
    // <Scrollbars style={{height: (height - 64 - 40)}}>
    <div
      className={styles.menuNodeWrapper}
      style={{height: (height - 64 - 40), background: themeColors.colorBgMenu}}
    >
      <div className={styles.menuTree}>
        <DirectoryTree
          switcherIcon={<div><CaretRightOutlined/></div>}
          titleRender={(node) => <RenderTitle {...{node, editNodeKey, handleRename, handleClick}} />}
          // titleRender={renderTitle}
          onSelect={onSelect}
          treeData={menuNodes}
          expandAction={false}
          showIcon={false}
          autoExpandParent={true}
          defaultSelectedKeys={[params.nodeId]}
        />
      </div>
      <Dropdown menu={{items: panelMenus, onClick: handleClick}} trigger={['contextMenu']}>
        <div className={styles.menuBlank}/>
      </Dropdown>
    </div>
      // </Scrollbars>
    }</>
  )
};

export default MenuNodeRender;
