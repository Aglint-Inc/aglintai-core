import { BriefcaseBusiness } from 'lucide-react';

import {
  useCreateRequestActions,
  useCreateRequestAssignees,
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
  const props = useCreateRequestAssignees();
  const { selectAssignee } = useCreateRequestActions();
  return (
    <RequestList
      onSelect={selectAssignee}
      icon={<BriefcaseBusiness className='mr-2 h-4 w-4' />}
      {...props}
    />
  );
};
