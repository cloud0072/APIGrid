import {Tree} from 'antd';
import {useState} from "react";

const titleRender = (nodeData: any) => {
  return <div>{nodeData.title}</div>
}

const MenuNodeTree = ({nodes, contextMenu}: any) => {
  const [expandedKeys, setExpandedKeys] = useState([]);

  const onDrop = ({event, node, dragNode, dragNodesKeys}: any) => {
    console.log('onDrop', event)
    console.log('onDrop node', node)
    console.log('onDrop dragNode', dragNode)
  }

  const onDragEnter = ({event, node, expandedKeys}: any) => {
    console.log('onDragEnter', event)
  }

  return (
    <Tree
      className="draggable-tree"
      defaultExpandedKeys={expandedKeys}
      draggable
      blockNode
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      titleRender={titleRender}
      treeData={nodes}
    />
  )
}

export default MenuNodeTree;
