import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { useApplicationsStore } from '@/job/hooks/applicationsStore';
import { type Application } from '@/types/applications.types';

import ApplicationCard from '.';

type Props = { application: Application };

const DNDCard = (props: Props) => {
  const count = useApplicationsStore(({ checklist }) => checklist.length);
  if (count === 0) return <ApplicationCard {...props} />;
  return <DraggableApplicationCard {...props} />;
};

const DraggableApplicationCard = (props: Props) => {
  const [, dragRef, preview] = useDrag({
    type: 'application-card',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  return (
    <Stack ref={dragRef as any}>
      <ApplicationCard {...props} />
    </Stack>
  );
};

export default DNDCard;
