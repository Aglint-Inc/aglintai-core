import { useQuery } from '@tanstack/react-query';

import { requestQueries } from '@/src/queries/requests';

import { useAuthDetails } from '../AuthContext/AuthContext';

export const useRequestsActions = () => {
  const { recruiterUser } = useAuthDetails();
  const requests = useQuery(
    requestQueries.requests({ assigner_id: recruiterUser?.user_id }),
  );
  return {
    requests,
  };
};
