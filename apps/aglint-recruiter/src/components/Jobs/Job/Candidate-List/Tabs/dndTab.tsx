/* eslint-disable security/detect-object-injection */
import { useDrop } from 'react-dnd';

import { useApplications } from '@/src/context/ApplicationsContext';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import type { Application } from '@/src/types/applications.types';

import Tab from './tab';

type Props = { section: Application['status'] };

const DNDTab = (props: Props) => {
  const enabled = useApplicationsStore(
    ({ checklist }) => checklist.length !== 0,
  );
  const { emailVisibilities } = useApplications();

  return emailVisibilities[props.section] && enabled ? (
    <DroppableTab {...props} />
  ) : (
    <Tab ref={null} status={props.section} isOver={false} canDrop={false} />
  );
};

export default DNDTab;

const DroppableTab = ({ section }: Props) => {
  const handleOpen = useApplicationsStore(
    ({ setActionPopup }) =>
      () =>
        setActionPopup(section),
  );

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'application-card',
    drop: () => handleOpen(),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <Tab
      ref={dropRef as any}
      status={section}
      isOver={isOver}
      canDrop={canDrop}
    />
  );
};
