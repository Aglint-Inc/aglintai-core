import { Briefcase } from 'lucide-react';

import {
  useCreateRequestActions,
  useCreateRequestAssignees,
} from '../../hooks';
import { ErrorFallback, SuspenseFallback } from '../common/requestBoundaries';
import { RequestList } from '../common/requestList';

export const List = () => {
  const { status } = useCreateRequestAssignees();
  if (status === 'error') return <ErrorFallback />;
  if (status === 'pending') return <SuspenseFallback />;
  return <Content />;
};

const Content = () => {
  const props = useCreateRequestAssignees();
  const { selectAssignee } = useCreateRequestActions();
  return (
    <RequestList
      onSelect={selectAssignee}
      icon={<Briefcase className='mr-2 h-4 w-4' />}
      {...props}
    />
  );
};
