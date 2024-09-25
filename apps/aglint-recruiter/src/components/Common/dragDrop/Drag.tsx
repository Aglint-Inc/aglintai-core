import { GripVertical } from 'lucide-react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

export const Drag = ({ id, index, ...props }) => {
  const [onHovered, setOnHovered] = useState(false);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            onMouseEnter={() => {
              setOnHovered(true);
            }}
            onMouseLeave={() => {
              setOnHovered(false);
            }}
            ref={provided.innerRef}
            className={`${snapshot.isDragging ? 'draggable dragging' : 'draggable'}`}
            {...provided.draggableProps}
            {...props}
          >
            <div className='relative my-2 px-3'>
              <div
                className='drag-handle absolute -left-1 z-[2] mt-4'
                {...provided.dragHandleProps}
                style={{
                  display: onHovered || snapshot.isDragging ? 'block' : 'none',
                }}
              >
                <GripVertical size={24} />
              </div>
              {props.children}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
