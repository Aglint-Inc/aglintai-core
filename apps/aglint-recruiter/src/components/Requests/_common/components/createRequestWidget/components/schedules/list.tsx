import { User } from 'lucide-react';

import {
  useCreateRequestActions,
  useCreateRequestSchedules,
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
