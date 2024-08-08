import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import {
  GetRequestParams,
  requestQueries,
  useRequestsCreate,
  useRequestsDelete,
  useRequestsUpdate,
} from '@/src/queries/requests';

import { useAuthDetails } from '../AuthContext/AuthContext';

export const useRequestsActions = () => {
  const { recruiterUser } = useAuthDetails();

  const [filters, setFilters] = useState<GetRequestParams['filters']>({
    is_new: false,
    status: [],
    title: '',
    type: [],
    created_at: '',
  });

  const [sort, setSort] = useState<GetRequestParams['sort']>({
    order: 'desc',
    type: 'created_at',
  });

  const requests = useQuery(
    requestQueries.requests({
      payload: { assigner_id: recruiterUser?.user_id },
      filters,
      sort,
    }),
  );

  const { mutate: handleCreateRequests, mutateAsync: asyncCreateRequests } =
    useRequestsCreate();
  const handleAsyncCreateRequests = useCallback(
    async (payload: Parameters<typeof asyncCreateRequests>[0]) => {
      try {
        await asyncCreateRequests(payload);
      } catch {
        //
      }
    },
    [],
  );

  const {
    mutate: handleUpdateRequest,
    mutateAsync: asyncUpdateRequest,
    mutationState: updateMutationState,
  } = useRequestsUpdate();
  const handleAsyncUpdateRequest = useCallback(
    async (payload: Parameters<typeof asyncUpdateRequest>[0]) => {
      try {
        await asyncUpdateRequest(payload);
      } catch {
        //
      }
    },
    [],
  );

  const {
    mutate: handleDeleteRequest,
    mutateAsync: asyncDeleteRequest,
    mutationState: deleteMutationState,
  } = useRequestsDelete();
  const handleAsyncDeleteRequest = useCallback(
    async (payload: Parameters<typeof asyncDeleteRequest>[0]) => {
      try {
        await asyncDeleteRequest(payload);
      } catch {
        //
      }
    },
    [],
  );

  const mutationQueue = useMemo(
    () => [
      ...updateMutationState
        .filter((payload) => payload?.loading !== false)
        .map(({ payload: { requestId } }) => requestId),
      ...deleteMutationState
        .filter((payload) => payload?.loading !== false)
        .map(({ payload: { requestId } }) => requestId),
    ],
    [updateMutationState, deleteMutationState],
  );

  return {
    requests,
    handleCreateRequests,
    handleAsyncCreateRequests,
    handleUpdateRequest,
    handleAsyncUpdateRequest,
    handleDeleteRequest,
    handleAsyncDeleteRequest,
    mutationQueue,
    filters,
    setFilters,
    sort,
    setSort,
  };
};
