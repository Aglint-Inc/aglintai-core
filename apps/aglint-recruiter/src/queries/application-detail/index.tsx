import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { applicationDetailQuery } from './constant';

export const useApplicationDetails = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const application_id = router.query.application_id;
  const query = useQuery({
    queryKey: applicationDetailQuery.application({ application_id }).queryKey,
    queryFn: () => getApplicationDetails(),
    enabled: !!application_id,
  });

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ['members'],
    });
  };

  return { ...query, refetch };
};

const getApplicationDetails = () => {};
