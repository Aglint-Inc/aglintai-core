import { Briefcase } from 'lucide-react';

import { useCreateRequestActions, useCreateRequestJobs } from '../../hooks';
import { ErrorFallback, SuspenseFallback } from '../common/requestBoundaries';
import { RequestList } from '../common/requestList';

export const List = () => {
  const { status } = useCreateRequestJobs();
  if (status === 'error') return <ErrorFallback />;
  if (status === 'pending') return <SuspenseFallback />;
  return <Content />;
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
