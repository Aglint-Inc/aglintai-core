/* eslint-disable security/detect-object-injection */
import { DragPill } from '@devlink3/DragPill';
import { Stack } from '@mui/material';
import { type PropsWithChildren } from 'react';
import { type XYCoord, DndProvider, useDragLayer } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useApplications } from '@/context/ApplicationsContext';
import { useApplicationsStore } from '@/context/ApplicationsContext/store';
import { useMousePosition } from '@/hooks/useMousePosition';

const DNDProvider = (props: PropsWithChildren) => {
  const count = useApplicationsStore(({ checklist }) => checklist.length);
  if (count === 0) return <>{props.children}</>;
  return <DNDLayer>{props.children}</DNDLayer>;
};

export default DNDProvider;

const DNDLayer = (props: PropsWithChildren) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {props.children}
      <CustomDragLayer {...useMousePosition()} />
    </DndProvider>
  );
};

const CustomDragLayer = ({ x }: { x: number }) => {
  const {
    job: { section_count },
    section,
  } = useApplications();
  const { itemType, isDragging, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  );

  const renderItem = () => {
    switch (itemType) {
      case 'application-card':
        return <DragCard />;
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <Stack
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: section_count[section] + 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Stack
        style={getItemStyles(initialOffset, {
          x: x - 180 + (currentOffset?.x ?? 0),
          y: currentOffset?.y ?? 0,
        })}
      >
        {renderItem()}
      </Stack>
    </Stack>
  );
};

const DragCard = () => {
  const count = useApplicationsStore(({ checklist }) => checklist.length);
  return (
    <Stack style={{ width: '180px' }}>
      <DragPill
        textLabel={`Move ${count} candidate${count === 1 ? '' : 's'}`}
      />
    </Stack>
  );
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    cursor: 'grabbing',
  };
}
