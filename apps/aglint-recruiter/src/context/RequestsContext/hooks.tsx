import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { requestQueries } from '@/src/queries/requests';

import { useAuthDetails } from '../AuthContext/AuthContext';

export const useRequestsActions = () => {
  const { recruiterUser } = useAuthDetails();
  const requests = useQuery(
    requestQueries.requests({ assigner_id: recruiterUser?.user_id }),
  );
  const [filteredRequest, setFilteredRequest] = useState<
    Awaited<typeof requests>['data']
  >([]);
  filteredRequest[0];
  return {
    requests,
    filteredRequest,
    setFilteredRequest,
  };
};
