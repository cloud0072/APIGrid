import styles from './style.module.less';
import React, {useContext, useEffect, useMemo, useState} from "react";
import {LayoutContext} from "@/layouts";
import {useAtomValueMenuNodes, useRefreshInitialState, useSetAtomMenuNodes} from "@/models";
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
} from "@/layouts/components/MenuNodePanel/MenuContext";
import {useTheme} from "@/hooks/useTheme";

const {DirectoryTree} = Tree;

const TitleRender = ({node, editNodeKey, handleRename, handleClick}: any) => {
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
  const setMenuNodes = useSetAtomMenuNodes();
  const refreshInitialState = useRefreshInitialState();

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

  const handleDragEnd = ({event, node}: any) => {
    // console.log('handleDragEnd event', event)
    // console.log('handleDragEnd node', node)
  }

  const handleDrop: any = (info: any) => {
    console.log('dropInfo', info)
    const dragKey = info.dragNode.key;
    const dropKey = info.node.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    console.log('dropPosition', dropPosition)

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

    //
    let isValid = true
    // Find dragObject
    let dragObj: any;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // 拖入节点
      loop(data, dropKey, (item) => {
        // 如果拖入的不是目录则取消更新操作
        isValid = item.meta.nodeType == NODE_TYPE_MAP[NodeTypeKey.folder];
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      console.log('========On the bottom gap========')
      // 处理最后一个节点
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      // 如果拖入了节点间的栅格则进行修改顺序
      let ar: any[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
      // 更新顺序和parentId
    }
    if (isValid) {
      setMenuNodes(data);
    }
  };

  useEffect(() => {
    console.log('menuNodes', menuNodes)
  }, [menuNodes])

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
          titleRender={node => <TitleRender {...{node, editNodeKey, handleRename, handleClick}} />}
          treeData={menuNodes}
          onSelect={onSelect}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          blockNode
          // allowDrop={({dropNode}) => dropNode.meta.nodeType == NODE_TYPE_MAP[NodeTypeKey.folder]}
          showIcon={false}
          autoExpandParent={true}
          draggable={{icon: false}}
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
