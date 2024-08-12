import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import {
  GetRequestParams,
  requestQueries,
  useRequestsCreate,
  useRequestsDelete,
  useRequestsUpdate,
} from '@/src/queries/requests';
import { RequestResponse } from '@/src/queries/requests/types';

import { useAuthDetails } from '../AuthContext/AuthContext';

const defaultFilter = {
  is_new: false,
  status: [],
  title: '',
  type: [],
  created_at: '',
  end_at: '',
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

// useEffect(() => {
//   const connection = supabase
//     .channel('db-changes')
//     .on<Request>(
//       'postgres_changes',
//       {
//         event: 'INSERT',
//         schema: 'public',
//         table: 'request_progress',
//         filter: `assigner_id.eq.${assigner_id}`,
//       },
//       (payload) => console.log(payload, '🔥'),
//     )
//     .on<Request>(
//       'postgres_changes',
//       {
//         event: 'UPDATE',
//         schema: 'public',
//         table: 'request',
//         filter: `assigner_id.eq.${assigner_id}`,
//       },
//       (payload) => console.log(payload, '🔥👍'),
//     )
//     .on<Request>(
//       'postgres_changes',
//       {
//         event: 'DELETE',
//         schema: 'public',
//         table: 'request',
//         filter: `assigner_id.eq.${assigner_id}`,
//       },
//       (payload) => console.log(payload, '🔥👍'),
//     )
//     .on<Request>(
//       'postgres_changes',
//       {
//         event: 'INSERT',
//         schema: 'public',
//         table: 'request_progress',
//         filter: `assignee_id.eq.${assigner_id}`,
//       },
//       (payload) => console.log(payload, '🔥'),
//     )
//     .on<Request>(
//       'postgres_changes',
//       {
//         event: 'UPDATE',
//         schema: 'public',
//         table: 'request',
//         filter: `assignee_id.eq.${assigner_id}`,
//       },
//       (payload) => console.log(payload, '🔥👍'),
//     )
//     .on<Request>(
//       'postgres_changes',
//       {
//         event: 'DELETE',
//         schema: 'public',
//         table: 'request',
//         filter: `assignee_id.eq.${assigner_id}`,
//       },
//       (payload) => console.log(payload, '🔥👍'),
//     )
//     .on<Request>(
//       'postgres_changes',
//       { event: 'INSERT', schema: 'public', table: 'request_progress' },
//       (payload) => console.log(payload, '🔥👍'),
//     )
//     .on<Request>(
//       'postgres_changes',
//       { event: 'UPDATE', schema: 'public', table: 'request_progress' },
//       (payload) => console.log(payload, '🔥👍'),
//     )
//     .on<Request>(
//       'postgres_changes',
//       { event: 'DELETE', schema: 'public', table: 'request_progress' },
//       (payload) => console.log(payload, '🔥👍'),
//     )
//     .subscribe();
//   return () => {
//     console.log(assigner_id, '🔥', 'unsub');
//     connection.unsubscribe();
//   };
// }, [assigner_id]);
