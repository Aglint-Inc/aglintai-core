import { type RequestProps } from '@requests/types';
import { useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import ColumnViewRequestCard from './ui/ColunmViewRequestCard';
import DefaultViewRequestCard from './ui/DefaultViewRequestCard';

export const RequestCard = ({ ...props }: RequestProps) => {
  const { recruiterUser } = useAuthDetails();
  const { mode = 'expanded' } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const isCompactList = mode === 'compact-list';
  const isColumnView = mode === 'column-view';

  if (isColumnView) {
    return <ColumnViewRequestCard {...props} />;
  }

  return (
    <DefaultViewRequestCard
      isCompactList={isCompactList}
      props={props}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      currentUserId={recruiterUser?.user_id}
    />
  );
};
