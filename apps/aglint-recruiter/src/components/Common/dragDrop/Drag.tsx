import { Stack } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

export const Drag = ({ id, index, ...props }) => {
  const [onHovered, setonHovered] = useState(false);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            onMouseEnter={() => {
              setonHovered(true);
            }}
            onMouseLeave={() => {
              setonHovered(false);
            }}
            ref={provided.innerRef}
            className={snapshot.isDragging ? 'draggable dragging' : 'draggable'}
            {...provided.draggableProps}
            {...props}
          >
            <Stack position={'relative'} px={'10px'} my={2}>
              <div
                className='drag-handle'
                {...provided.dragHandleProps}
                style={{
                  marginTop: '15px',
                  position: 'absolute',
                  left: '-5px',
                  zIndex: 2,
                  display: onHovered || snapshot.isDragging ? 'block' : 'none'
                }}
              >
                <Image
                  src='/images/svg/drag.svg'
                  alt='drag'
                  width={10}
                  height={20}
                />
              </div>
              {props.children}
            </Stack>
          </div>
        );
      }}
    </Draggable>
  );
};
