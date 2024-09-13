import Image from 'next/image';
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
            <div className='relative px-[var(--space-3)] my-2'>
              <div
                className='drag-handle absolute mt-[var(--space-4)] -left-1 z-[2]'
                {...provided.dragHandleProps}
                style={{
                  display: onHovered || snapshot.isDragging ? 'block' : 'none',
                }}
              >
                <Image
                  src='/images/svg/drag.svg'
                  alt='drag'
                  width={12}
                  height={24}
                />
              </div>
              {props.children}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
