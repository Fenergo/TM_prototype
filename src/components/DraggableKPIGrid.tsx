import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableKPIItemProps {
  id: string;
  children: React.ReactNode;
}

function DraggableKPIItem({ id, children }: DraggableKPIItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

interface DraggableKPIGridProps {
  children: React.ReactElement[];
  columns?: number;
}

export function DraggableKPIGrid({ children, columns = 4 }: DraggableKPIGridProps) {
  const [items, setItems] = useState(() =>
    React.Children.map(children, (child, index) => ({
      id: `kpi-${index}`,
      content: child,
    }))
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const gridClass = `grid grid-cols-${columns} gap-4`;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
        <div className={gridClass}>
          {items.map((item) => (
            <DraggableKPIItem key={item.id} id={item.id}>
              {item.content}
            </DraggableKPIItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
