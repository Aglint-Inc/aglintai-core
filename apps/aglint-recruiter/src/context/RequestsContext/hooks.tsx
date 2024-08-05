import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import {
  requestQueries,
  useRequestsCreate,
  useRequestsDelete,
  useRequestsUpdate,
} from '@/src/queries/requests';

import { useAuthDetails } from '../AuthContext/AuthContext';

export const useRequestsActions = () => {
  const { recruiterUser } = useAuthDetails();

  const requests = useQuery(
    requestQueries.requests({ assigner_id: recruiterUser?.user_id }),
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

  const [filteredRequest, setFilteredRequest] = useState<
    Awaited<typeof requests>['data']
  >([]);

  const mutationQueue = useMemo(
    () => [
      ...updateMutationState.map(({ id }) => id),
      ...deleteMutationState.map(({ id }) => id),
    ],
    [updateMutationState, deleteMutationState],
  );

  return {
    requests,
    filteredRequest,
    setFilteredRequest,
    handleCreateRequests,
    handleAsyncCreateRequests,
    handleUpdateRequest,
    handleAsyncUpdateRequest,
    handleDeleteRequest,
    handleAsyncDeleteRequest,
    mutationQueue,
  };
};
