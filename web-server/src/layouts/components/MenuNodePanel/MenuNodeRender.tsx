import styles from './style.module.less';
import React, {useContext, useEffect, useMemo, useState} from "react";
import {LayoutContext} from "@/layouts";
import {useAtomValueMenuNodes, useRefreshInitialState, useSetAtomMenuNodes} from "@/models";
import {CaretRightOutlined, MoreOutlined, PlusOutlined,} from "@ant-design/icons";
import {MenuNodeApi} from "@/services/framework/MenuNode";
import {getNewId} from "@/utils/idUtils";
import {useNavigate, useParams} from "react-router-dom";
import {Dropdown, Input, Tree} from "antd";
import {MacScrollbar} from 'mac-scrollbar';

import {
  FirstNodePreNodeId,
  getMenuItems,
  MenuActionKey,
  MenuRootId,
  NODE_TYPE_MAP,
  NodeTypeKey,
  panelMenus
} from "@/layouts/components/MenuNodePanel/MenuContext";
import {useTheme} from "@/hooks/useTheme";

const {DirectoryTree} = Tree;

const TitleRender = ({node, editNodeKey, handleRename, handleClick}: any) => {
  const {collapsed} = useContext(LayoutContext);
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
        editNodeKey === node.key && !collapsed ?
          <div className={styles.menuTitleEdit}>
            <Input
              ref={inputRef}
              autoFocus={true}
              defaultValue={node.title}
              onBlur={handleBlur}
            />
          </div> :
          <>
            <Dropdown
              menu={{items: menuItems, onClick: (e) => handleClick(e, node)}}
              trigger={['contextMenu']}>
              {
                collapsed ?
                  <div className={styles.menuTitleTextCollapsed}>{node.title}</div> :
                  <div className={styles.menuTitleText}>{node.title}</div>
              }
            </Dropdown>
            <div className={styles.menuTitleExtra}>
              {
                node.meta.nodeType === NODE_TYPE_MAP[NodeTypeKey.folder] &&
                <Dropdown
                  menu={{items: panelMenus, onClick: (e) => handleClick(e, node)}}
                  trigger={['contextMenu', 'click']}
                >
                  <span><PlusOutlined/></span>
                </Dropdown>
              }
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
  const setMenuNodes = useSetAtomMenuNodes();
  const refreshInitialState = useRefreshInitialState();

  const {menuType, height} = useContext(LayoutContext);
  const {themeColors} = useTheme();
  const navigate = useNavigate();
  const params: any = useParams();

  const [editNodeKey, setEditNodeKey] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<any>([]);

  const show = useMemo(() => menuType == NodeTypeKey.datasheet, [menuType]);

  const handleSelect = (keys: any[]) => {
    const key = keys[0];
    handleNavigate(key)
  }

  const handleExpand = (keys: any[]) => {
    setExpandedKeys(keys);
  }

  // useEffect(() => {
  //   console.log('expandedKeys', expandedKeys)
  // }, [expandedKeys])

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

  const handleClick = (event: any, node?: any) => {
    console.log('handleClick event', event)
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
            isDeleted: 0,
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
          .deleteByNodeId(node.key)
          .then(refreshInitialState)
        break;
      default:
    }
  }

  const handleRename = (node: any) => {
    if (node.nodeName) {
      // 有名称则进行修改
      setEditNodeKey('');
      MenuNodeApi
        .updateByNodeId({nodeId: node.key, nodeName: node.nodeName})
        .then(refreshInitialState)
    }
  }

  /**
   * TODO：bug 无法拖动到目录下的第一个节点 后续修复吧
   * @param info
   */
  const handleDrop: any = (info: any) => {
    const dragKey = info.dragNode.key;
    const dropKey = info.node.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    // console.log('dropToGap', info.dropToGap)
    // console.log('dropPosition', dropPosition)

    const loop = (
      data: any[],
      key: React.Key,
      callback: (node: any, i: number, data: any[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = JSON.parse(JSON.stringify(menuNodes));
    // 操作合法性
    let isValid = true;
    // 查找多拽对象
    let dragObj: any;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // 拖入节点本身
      loop(data, dropKey, (item) => {
        // 如果拖入的不是目录则取消更新操作
        isValid = item.meta.nodeType == NODE_TYPE_MAP[NodeTypeKey.folder];
        item.children = item.children || [];
        // 前一个节点的Id，排序用
        dragObj.preNodeId = item.children.length > 0 ?
          item.children[item.children.length - 1].key :
          FirstNodePreNodeId;
        dragObj.parentKey = item.key;
        // 放在末尾
        item.children.push(dragObj);
      });
    } else {
      // 如果拖入了节点间的栅格则进行修改顺序
      let ar: any[] = [];
      let i: number = 0;
      let dropItem: any = {};
      loop(data, dropKey, (_item, index, arr) => {
        dropItem = _item;
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // 插入节点前
        dragObj.preNodeId = FirstNodePreNodeId;
        dragObj.parentKey = dropItem.parentKey;
        ar.splice(i!, 0, dragObj!);
      } else {
        // 插入节点后
        dragObj.preNodeId = ar[i].key
        dragObj.parentKey = dropItem.parentKey;
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    if (isValid) {
      setMenuNodes(data);
      // 更新顺序和parentKey
      MenuNodeApi.updatePositionByNodeId({
        nodeId: dragObj.key,
        parentId: dragObj.parentKey,
        preNodeId: dragObj.preNodeId
      }).then();
    }
  };

  // useEffect(() => {
  //   console.log('menuNodes', menuNodes)
  // }, [menuNodes])

  return (
    <>{show &&
    <MacScrollbar style={{height: (height - 64 - 40)}}>
      <div
        className={styles.menuNodeWrapper}
        style={{height: (height - 64 - 40), background: themeColors.colorBgMenu}}
      >
        <div className={styles.menuTree}>
          <DirectoryTree
            switcherIcon={<div><CaretRightOutlined/></div>}
            titleRender={node => <TitleRender {...{node, editNodeKey, handleRename, handleClick}} />}
            treeData={menuNodes}
            expandedKeys={expandedKeys}
            onSelect={handleSelect}
            onExpand={handleExpand}
            onDrop={handleDrop}
            blockNode
            showIcon={false}
            expandAction={false}
            draggable={{icon: false}}
            defaultExpandedKeys={[params.nodeId]}
          />
        </div>
        <Dropdown menu={{items: panelMenus, onClick: handleClick}} trigger={['contextMenu']}>
          <div className={styles.menuBlank}/>
        </Dropdown>
      </div>
    </MacScrollbar>
    }</>
  )
};

export default MenuNodeRender;
