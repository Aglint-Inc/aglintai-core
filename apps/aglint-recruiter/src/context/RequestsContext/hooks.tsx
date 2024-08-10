import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRealtime } from '@/src/hooks/useRealtime';
// import { useRealtime } from '@/src/hooks/useRealtime';
import {
  GetRequestParams,
  requestQueries,
  useRequestsCreate,
  useRequestsDelete,
  useRequestsUpdate,
} from '@/src/queries/requests';
import { supabase } from '@/src/utils/supabase/client';

import { useAuthDetails } from '../AuthContext/AuthContext';

const initialFilter = {
  is_new: false,
  status: [],
  title: '',
  type: [],
  created_at: '',
  end_at: '',
};

export const useRequestsActions = () => {
  const { recruiterUser } = useAuthDetails();

  const assigner_id = recruiterUser?.user_id;

  const [filters, setFilters] = useState<GetRequestParams['filters']>(
    structuredClone(initialFilter),
  );

  const [sort, setSort] = useState<GetRequestParams['sort']>({
    order: 'desc',
    type: 'created_at',
  });

  const requests = useQuery(
    requestQueries.requests({
      payload: { assigner_id },
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

  // useEffect(() => {
  //   if (assigner_id) {
  //     console.log(assigner_id, '🔥', 'sub');
  //     const connection = supabase
  //       .channel('db-changes')
  //       .on<Request>(
  //         'postgres_changes',
  //         { event: '*', schema: 'public', table: 'request_progress' },
  //         (pauload) => console.log(pauload, '🔥'),
  //       )
  // .on<Request>(
  //   'postgres_changes',
  //   { event: 'UPDATE', schema: 'public', table: 'request' },
  //   (pauload) => console.log(pauload, '🔥👍'),
  // )
  // .on<Request>(
  //   'postgres_changes',
  //   { event: 'DELETE', schema: 'public', table: 'request' },
  //   (pauload) => console.log(pauload, '🔥👍'),
  // )
  // .on<Request>(
  //   'postgres_changes',
  //   { event: 'INSERT', schema: 'public', table: 'request_progress' },
  //   (pauload) => console.log(pauload, '🔥👍'),
  // )
  // .on<Request>(
  //   'postgres_changes',
  //   { event: 'UPDATE', schema: 'public', table: 'request_progress' },
  //   (pauload) => console.log(pauload, '🔥👍'),
  // )
  // .on<Request>(
  //   'postgres_changes',
  //   { event: 'DELETE', schema: 'public', table: 'request_progress' },
  //   (pauload) => console.log(pauload, '🔥👍'),
  // )
  //       .subscribe();

  //     return () => {
  //       console.log(assigner_id, '🔥', 'unsub');
  //       connection.unsubscribe();
  //     };
  //   }
  // }, [assigner_id, supabase]);

  const a = useRealtime([
    {
      event: 'UPDATE',
      table: 'request',
      filter: `assigner_id.eq.${assigner_id}`,
      callback: (payload) => console.log(payload, 'BBBBB🔥'),
    },
    {
      event: 'UPDATE',
      table: 'request',
      filter: `assignee_id.eq.${assigner_id}`,
      callback: (payload) => console.log(payload, 'BBBBB🔥'),
    },
  ]);

  console.log('asdoiansd', a.data, '🔥');

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
    initialFilter: structuredClone(initialFilter),
  };
};
