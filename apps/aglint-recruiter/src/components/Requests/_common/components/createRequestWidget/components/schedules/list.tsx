import { User } from 'lucide-react';

import {
  useCreateRequestActions,
  useCreateRequestSchedules,
} from '../../hooks';
import { ErrorFallback, SuspenseFallback } from '../common/requestBoundaries';
import { RequestList } from '../common/requestList';

export const List = () => {
  const { status } = useCreateRequestSchedules();
  if (status === 'error') return <ErrorFallback />;
  if (status === 'pending') return <SuspenseFallback />;
  return <Content />;
};

const Content = () => {
  const props = useCreateRequestSchedules();
  const { selectSchedule } = useCreateRequestActions();
  return (
    <RequestList
      onSelect={selectSchedule}
      icon={<User className='mr-2 h-4 w-4' />}
      {...props}
    />
  );
};
