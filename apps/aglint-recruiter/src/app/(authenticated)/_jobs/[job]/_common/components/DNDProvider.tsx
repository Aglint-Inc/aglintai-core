/* eslint-disable security/detect-object-injection */
import { Move } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import { DndProvider, useDragLayer, type XYCoord } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useMousePosition } from '@/hooks/useMousePosition';
import { useApplications, useApplicationsStore } from '@/job/hooks';

const DNDProvider = (props: PropsWithChildren) => {
  const count = useApplicationsStore((state) => state.checklist)?.length ?? 0;
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
    <div
      className={`pointer-events-none fixed left-0 top-0 h-full w-full`}
      style={{ zIndex: section_count[section] + 1 }}
    >
      <div
        className='transform'
        style={getItemStyles(initialOffset, {
          x: x - 180 + (currentOffset?.x ?? 0),
          y: currentOffset?.y ?? 0,
        })}
      >
        {renderItem()}
      </div>
    </div>
  );
};

const DragCard = () => {
  const count = useApplicationsStore((state) => state.checklist)?.length ?? 0;
  return (
    <div className='w-[180px]'>
      <div className='flex items-center justify-center rounded-full bg-primary px-3 py-2 text-primary-foreground shadow-sm'>
        <Move className='mr-2 h-4 w-4' />
        <span className='text-sm font-medium'>
          Move {count} candidate{count === 1 ? '' : 's'}
        </span>
      </div>
    </div>
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
