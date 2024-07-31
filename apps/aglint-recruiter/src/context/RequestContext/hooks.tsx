import { useQuery } from '@tanstack/react-query';

import { requestQueries } from '@/src/queries/requests';

type RequestParams = Parameters<(typeof requestQueries)['request_progress']>[0];

export const useRequestActions = ({ request_id }: RequestParams) => {
  const request_progress = useQuery(
    requestQueries.request_progress({ request_id }),
  );
  return {
    request_progress,
  };
};
