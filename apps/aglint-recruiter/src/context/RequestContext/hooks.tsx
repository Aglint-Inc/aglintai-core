import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { requestQueries } from '@/src/queries/requests';

import { useRequests } from '../RequestsContext';

type RequestParams = Parameters<(typeof requestQueries)['request_progress']>[0];

export const useRequestActions = ({ request_id }: RequestParams) => {
  const [collapse, setCollapse] = useState(false);

  const {
    handleUpdateRequest: updateRequest,
    handleAsyncUpdateRequest: asyncUpdateRequest,
    handleDeleteRequest: deleteRequest,
    handleAsyncDeleteRequest: asyncDeleteRequest,
    mutationQueue,
    requests: { data: requests },
  } = useRequests();

  const request_progress = useQuery(
    requestQueries.request_progress({ request_id, enabled: collapse }),
  );

  const request_workflow = useQuery(
    requestQueries.request_workflow({ request_id, enabled: collapse }),
  );

  const requestDetails = useMemo(() => {
    return Object.values(requests)
      .flat()
      ?.find((request) => request.id === request_id);
  }, [requests, request_id]);

  const handleUpdateRequest = useCallback(
    (
      requestPayload: Parameters<
        typeof updateRequest
      >[0]['payload']['requestPayload'],
    ) =>
      updateRequest({
        payload: { requestId: request_id, requestPayload },
      }),
    [request_id, updateRequest],
  );
  const handleAsyncUpdateRequest = useCallback(
    async (
      requestPayload: Parameters<
        typeof asyncUpdateRequest
      >[0]['payload']['requestPayload'],
    ) =>
      await asyncUpdateRequest({
        payload: { requestId: request_id, requestPayload },
      }),
    [request_id, asyncUpdateRequest],
  );
  const handleDeleteRequest = useCallback(
    () =>
      deleteRequest({
        payload: { requestId: request_id },
      }),
    [request_id, deleteRequest],
  );
  const handleAsyncDeleteRequest = useCallback(
    async () =>
      await asyncDeleteRequest({
        payload: { requestId: request_id },
      }),
    [request_id, asyncUpdateRequest],
  );

  const isMutating = useMemo(
    () => mutationQueue.includes(request_id),
    [mutationQueue, request_id],
  );

  return {
    request_progress,
    request_workflow,
    handleDeleteRequest,
    handleAsyncDeleteRequest,
    handleUpdateRequest,
    handleAsyncUpdateRequest,
    isMutating,
    collapse,
    setCollapse,
    requestDetails,
  };
};
