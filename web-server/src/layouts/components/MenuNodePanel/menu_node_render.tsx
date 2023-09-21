import styles from './style.module.less';
import React, {useContext, useMemo, useState} from "react";
import {LayoutContext} from "@/layouts";
import {useAtomValueMenuNodes, useRefreshInitialState} from "@/models";
import {CaretRightOutlined, MoreOutlined, PlusOutlined,} from "@ant-design/icons";
import {MenuNodeApi} from "@/services/framework/MenuNode";
import {getNewId} from "@/utils/idUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {Dropdown, Tree} from "antd";
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

const MenuNodeRender = () => {
  const {menuType, height} = useContext(LayoutContext);
  const menuNodes = useAtomValueMenuNodes();
  const navigate = useNavigate();
  const {themeColors} = useTheme()

  const [nodeId, setNodeId] = useState('');

  const show = useMemo(() => menuType == NodeTypeKey.datasheet, [menuType]);

  const onSelect = (keys: any[]) => {
    const key = keys[0];
    setNodeId(() => key);
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
  const onClick = ({key}: any, nodeInfo?: any) => {
    console.log('onClick', nodeInfo)
    let dstId = ''
    switch (key) {
      case MenuActionKey.AddDatasheet:
        dstId = getNewId('dst');
        MenuNodeApi.insert({
          nodeId: dstId,
          nodeType: NODE_TYPE_MAP[NodeTypeKey.datasheet],
          parentId: nodeInfo?.nodeId || MenuRootId,
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
        MenuNodeApi.insert({
          nodeId: dstId,
          nodeType: NODE_TYPE_MAP[NodeTypeKey.folder],
          parentId: nodeInfo?.nodeId || MenuRootId,
          isDeleted: 0
        })
          .then(refreshInitialState)
        break;
      case MenuActionKey.AddExcel:
        break;
      default:
    }
  }

  const renderTitle = (node: any) => {
    const menuItems = getMenuItems(node);

    return (
      <div className={styles.menuTitle}>
        <Dropdown menu={{items: menuItems, onClick: (e) => onClick(e, node)}} trigger={['contextMenu']}>
          <div className={styles.menuTitleText}>{node.title}</div>
        </Dropdown>
        <div className={styles.menuTitleExtra}>
          <Dropdown menu={{items: panelMenus, onClick: (e) => onClick(e, node)}} trigger={['contextMenu', 'click']}>
            <span><PlusOutlined/></span>
          </Dropdown>
          <Dropdown menu={{items: menuItems, onClick: (e) => onClick(e, node)}} trigger={['contextMenu', 'click']}>
            <span><MoreOutlined/></span>
          </Dropdown>
        </div>
      </div>
    )
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
          titleRender={renderTitle}
          onSelect={onSelect}
          treeData={menuNodes}
          expandAction={false}
          showIcon={false}
          defaultExpandedKeys={[menuNodes[0]?.key]}
        />
      </div>
      <Dropdown menu={{items: panelMenus, onClick}} trigger={['contextMenu']}>
        <div className={styles.menuBlank}/>
      </Dropdown>
    </div>
      // </Scrollbars>
    }</>
  )
};

export default MenuNodeRender;
