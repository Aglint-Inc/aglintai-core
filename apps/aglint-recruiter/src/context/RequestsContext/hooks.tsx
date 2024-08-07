import { DatabaseTable } from '@aglint/shared-types';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  GetRequestParams,
  requestQueries,
  useRequestsCreate,
  useRequestsDelete,
  useRequestsUpdate,
} from '@/src/queries/requests';
import { supabase } from '@/src/utils/supabase/client';

import { useAuthDetails } from '../AuthContext/AuthContext';

export const useRequestsActions = () => {
  const { recruiterUser } = useAuthDetails();

  const [filters, setFilters] = useState<GetRequestParams['filters']>({
    is_new: false,
    status: [],
    title: '',
    type: [],
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

  // realtime for all requests progress
  useEffect(() => {
    let channel: RealtimeChannel;
    if (requests.status === 'success') {
      channel = supabase
        .channel('db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'request_progress',
            // filter: `request_id=eq.${request_id}`,
          },
          (payload) => {
            const rowData =
              payload.new as unknown as DatabaseTable['request_progress'];
            if (rowData) {
              // eslint-disable-next-line no-console
              console.log(rowData);
            }
          },
        )
        .subscribe();
    }

    if (channel)
      return () => {
        channel.unsubscribe();
      };
  }, [requests.status]);

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
