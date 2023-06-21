import React, {useEffect} from 'react';
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import IconFont from "@/components/IconFont";
import './index.less';

const BjhDragItem = (props) => {
  // useEffect(() =>{
  //   console.log('BjhDragItem id', props.id)
  // }, [])
  const idProps = {id: props.id}
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable(idProps);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (props.handle) {
    return (
      <div ref={setNodeRef} style={{...style, ...props.style}} {...attributes}
           className={'bjh-drag-item ' + props.className}>
        <div className={'bjh-drag-item-handle'} {...listeners}>
          <IconFont type="adms-drag"/>
        </div>
        {props.children}
      </div>
    )
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={'bjh-drag-item'}>
      {props.children}
    </div>
  );
}

export default BjhDragItem
