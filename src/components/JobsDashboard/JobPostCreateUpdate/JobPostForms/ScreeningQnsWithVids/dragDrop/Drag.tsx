import { Stack } from '@mui/material';
import Image from 'next/image';
import { Draggable } from 'react-beautiful-dnd';

export const Drag = ({ id, index, ...props }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            className={snapshot.isDragging ? 'draggable dragging' : 'draggable'}
            {...provided.draggableProps}
            {...props}
          >
            <Stack position={'relative'}>
              <div
                className='drag-handle'
                {...provided.dragHandleProps}
                style={{
                  marginTop: '15px',
                  position: 'absolute',
                  left: '2px',
                  zIndex: 2,
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
