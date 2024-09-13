import { Briefcase } from 'lucide-react';

import { useCreateRequestActions, useCreateRequestJobs } from '../../hooks';
import { RequestBoundaries } from '../common/requestBoundaries';
import { RequestList } from '../common/requestList';

export const List = () => {
  return (
    <RequestBoundaries>
      <Content />
    </RequestBoundaries>
  );
};

const Content = () => {
  const props = useCreateRequestJobs();
  const { selectJob } = useCreateRequestActions();
  return (
    <RequestList
      onSelect={selectJob}
      icon={<Briefcase className='mr-2 h-4 w-4' />}
      {...props}
    />
  );
};
