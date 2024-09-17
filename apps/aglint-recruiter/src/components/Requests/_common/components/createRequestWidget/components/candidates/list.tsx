import { User } from 'lucide-react';

import {
  useCreateRequestActions,
  useCreateRequestCandidates,
} from '../../hooks';
import { ErrorFallback, SuspenseFallback } from '../common/requestBoundaries';
import { RequestList } from '../common/requestList';

export const List = () => {
  const { status } = useCreateRequestCandidates();
  if (status === 'error') return <ErrorFallback />;
  if (status === 'pending') return <SuspenseFallback />;
  return <Content />;
};

const Content = () => {
  const props = useCreateRequestCandidates();
  const { selectCandidate } = useCreateRequestActions();
  return (
    <RequestList
      onSelect={selectCandidate}
      icon={<User className='mr-2 h-4 w-4' />}
      {...props}
    />
  );
};
