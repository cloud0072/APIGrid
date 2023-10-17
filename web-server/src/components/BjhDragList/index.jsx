import {useEffect, useState} from "react";
import {arrayMove, SortableContext, sortableKeyboardCoordinates} from '@dnd-kit/sortable'
import {closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core'

const BjhDragList = ({items, idKey = 'id', children, onDragEnd}) => {
  useEffect(() => {
    // console.log('BjhDragList items', items)
    setList(() => items)
  }, [items])

  const [list, setList] = useState(items || [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const {active, over} = event;
    if (active.id !== over.id) {
      setList((items) => {
        const oldIndex = (items.map(i => i[idKey])).indexOf(active.id);
        const newIndex = (items.map(i => i[idKey])).indexOf(over.id);
        const newList = arrayMove(items, oldIndex, newIndex);
        // console.log('handleDragEnd items', items)
        // console.log('handleDragEnd oldIndex', oldIndex)
        // console.log('handleDragEnd newIndex', newIndex)
        // console.log('handleDragEnd newList', newList)
        onDragEnd && onDragEnd(newList, {from: oldIndex, to: newIndex})
        return newList;
      });
    }
  }

  return (
    <DndContext
      id={'grid-dnd-basic'}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        id={'grid-sort-contextbasic'}
        items={list.map((i) => i[idKey])}
      >
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default BjhDragList;
