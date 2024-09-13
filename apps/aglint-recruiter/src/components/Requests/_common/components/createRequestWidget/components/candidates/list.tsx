import { User } from 'lucide-react';

import {
  useCreateRequestActions,
  useCreateRequestCandidates,
} from '../../hooks';
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
