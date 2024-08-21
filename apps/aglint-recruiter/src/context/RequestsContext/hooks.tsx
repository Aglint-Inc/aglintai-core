import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { subscriptions } from '@/src/hooks/useRealtime';
import {
  GetRequestParams,
  requestQueries,
  useRequestRealtime,
  useRequestsCreate,
  useRequestsDelete,
  useRequestsUpdate,
} from '@/src/queries/requests';
import { RequestResponse } from '@/src/queries/requests/types';
import { SafeObject } from '@/src/utils/safeObject';
import { supabase } from '@/src/utils/supabase/client';

import { useAuthDetails } from '../AuthContext/AuthContext';

const defaultFilter = {
  is_new: false,
  status: [],
  title: '',
  type: [],
  created_at: '',
  end_at: '',
  jobs: [],
};

// eslint-disable-next-line no-unused-vars
const defaultSections: { [id in keyof RequestResponse]?: boolean } = {
  urgent_request: false,
  schedule_request: false,
  reschedule_request: false,
  decline_request: false,
  cancel_schedule_request: false,
  completed_request: false,
};

export const useRequestsActions = () => {
  const { recruiterUser } = useAuthDetails();

  const assigner_id = recruiterUser?.user_id;

  const [filters, setFilters] = useState<GetRequestParams['filters']>(
    structuredClone(defaultFilter),
  );

  const [sort, setSort] = useState<GetRequestParams['sort']>({
    order: 'desc',
    type: 'created_at',
  });

  const [sections, setSections] = useState(defaultSections);

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

  const initialFilter = useMemo(() => defaultFilter, []);
  const initialSections = useMemo(() => defaultSections, []);

  const requestIds = useMemo(
    () =>
      (SafeObject.values(requests?.data) ?? [])
        .flatMap((request) => request)
        .map(({ id }) => id)
        .toSorted((a, z) => (a > z ? 1 : z > a ? -1 : 0))
        .join(','),
    [requests.data],
  );

  const {
    insertRequest,
    updateRequest,
    deleteRequest,
    insertRequestProgress,
    updateRequestProgress,
    deleteRequestProgress,
  } = useRequestRealtime();

  useEffect(() => {
    const connection = subscriptions(supabase.channel('db-changes'), [
      {
        event: 'INSERT',
        table: 'request',
        filter: `assigner_id=eq.${assigner_id}`,
        callback: insertRequest,
      },
      {
        event: 'INSERT',
        table: 'request',
        filter: `assignee_id=eq.${assigner_id}`,
        callback: insertRequest,
      },
      {
        event: 'UPDATE',
        table: 'request',
        filter: `assigner_id=eq.${assigner_id}`,
        callback: updateRequest,
      },
      {
        event: 'UPDATE',
        table: 'request',
        filter: `assignee_id=eq.${assigner_id}`,
        callback: updateRequest,
      },
      {
        event: 'DELETE',
        table: 'request',
        callback: deleteRequest,
      },
      {
        event: 'INSERT',
        table: 'request_progress',
        filter: `request_id=in.(${requestIds})`,
        callback: insertRequestProgress,
      },
      {
        event: 'UPDATE',
        table: 'request_progress',
        filter: `request_id=in.(${requestIds})`,
        callback: updateRequestProgress,
      },
      {
        event: 'DELETE',
        table: 'request_progress',
        callback: deleteRequestProgress,
      },
    ]).subscribe();
    return () => {
      connection.unsubscribe();
    };
  }, [
    assigner_id,
    requestIds,
    insertRequest,
    updateRequest,
    deleteRequest,
    insertRequestProgress,
    updateRequestProgress,
    deleteRequestProgress,
  ]);

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
    initialFilter,
    initialSections,
    sections,
    setSections,
  };
};
