import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { requestQueries } from '@/src/queries/requests';

import { useRequests } from '../RequestsContext';

type RequestParams = Parameters<(typeof requestQueries)['request_progress']>[0];

export const useRequestActions = ({ request_id }: RequestParams) => {
  const {
    handleUpdateRequest: updateRequest,
    handleAsyncUpdateRequest: asyncUpdateRequest,
    handleDeleteRequest: deleteRequest,
    handleAsyncDeleteRequest: asyncDeleteRequest,
    mutationQueue,
  } = useRequests();

  const request_progress = useQuery(
    requestQueries.request_progress({ request_id }),
  );

  const handleUpdateRequest = useCallback(
    (payload: Parameters<typeof updateRequest>[0]['payload']) =>
      updateRequest({
        id: request_id,
        payload,
      }),
    [request_id, updateRequest],
  );
  const handleAsyncUpdateRequest = useCallback(
    async (payload: Parameters<typeof asyncUpdateRequest>[0]['payload']) =>
      await asyncUpdateRequest({
        id: request_id,
        payload,
      }),
    [request_id, asyncUpdateRequest],
  );
  const handleDeleteRequest = useCallback(
    () =>
      deleteRequest({
        id: request_id,
      }),
    [request_id, deleteRequest],
  );
  const handleAsyncDeleteRequest = useCallback(
    async () =>
      await asyncDeleteRequest({
        id: request_id,
      }),
    [request_id, asyncUpdateRequest],
  );

  const isMutating = useMemo(
    () => mutationQueue.includes(request_id),
    [mutationQueue, request_id],
  );

  return {
    request_progress,
    handleDeleteRequest,
    handleAsyncDeleteRequest,
    handleUpdateRequest,
    handleAsyncUpdateRequest,
    isMutating,
  };
};
