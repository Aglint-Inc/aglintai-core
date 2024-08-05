import type {
  DatabaseFunctions,
  DatabaseTable,
  DatabaseTableUpdate,
} from '@aglint/shared-types';
import {
  type MutationFilters,
  type QueryFilters,
  QueryClient,
  queryOptions,
  useMutation,
  useMutationState,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { appKey, GC_TIME } from '..';

export const requestQueries = {
  requests_key: () => 'requests' as const,
  requests_queryKey: () => [appKey, requestQueries.requests_key()] as const,
  requests_mutationKey: (method: 'create' | 'update' | 'delete') =>
    [appKey, requestQueries.requests_key(), method] as const,
  requests: ({ assigner_id }: GetRequests) =>
    queryOptions({
      enabled: !!assigner_id,
      gcTime: assigner_id ? GC_TIME : 0,
      queryKey: requestQueries.requests_queryKey(),
      queryFn: async () => await getRequests({ assigner_id }),
    }),
  requests_mutationOptions: <
    T extends 'create' | 'update' | 'delete',
    U extends T extends 'create'
      ? CreateRequests
      : T extends 'update'
        ? UpdateRequest
        : DeleteRequest,
  >(
    method: T,
  ) => ({
    filters: {
      mutationKey: requestQueries.requests_mutationKey(method),
      status: 'pending',
    } as MutationFilters,
    select: (mutation) => mutation.state.variables as U,
  }),
  requests_invalidate: () => ({
    predicate: ((query) =>
      query.queryKey.includes(requestQueries.requests_key()) &&
      !query.queryKey.includes(
        requestQueries.request_progress_key(),
      )) as QueryFilters['predicate'],
    removeQueries: () =>
      ({
        predicate: requestQueries.requests_invalidate().predicate,
        type: 'inactive',
      }) as Parameters<QueryClient['removeQueries']>['0'],
    refetchQueries: () =>
      ({
        predicate: requestQueries.requests_invalidate().predicate,
        type: 'active',
      }) as Parameters<QueryClient['refetchQueries']>['0'],
  }),
  request_progress_key: () => 'request_progress' as const,
  request_progress_queryKey: ({ request_id }: GetRequestProgress) =>
    [
      ...requestQueries.requests_queryKey(),
      requestQueries.request_progress_key(),
      { request_id },
    ] as const,
  request_progress: ({
    request_id,
    enabled = true,
  }: GetRequestProgress & { enabled?: boolean }) =>
    queryOptions({
      enabled: !!request_id && enabled,
      gcTime: request_id ? GC_TIME : 0,
      refetchOnMount: true,
      queryKey: requestQueries.request_progress_queryKey({ request_id }),
      queryFn: async () =>
        (
          await supabase
            .from('request_progress')
            .select('*')
            .eq('request_id', request_id)
            .throwOnError()
        ).data,
    }),
} as const;

export const useRequestsCreate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: requestQueries.requests_mutationKey('create'),
    mutationFn: async (payload: CreateRequests) => {
      await createRequests(payload);
      await queryClient.refetchQueries(
        requestQueries.requests_invalidate().refetchQueries(),
      );
    },
    onError: () => toast.error('Unable to create requests'),
    onSuccess: () => toast.success('Requests created successfully'),
  });
  const mutationState = useMutationState(
    requestQueries.requests_mutationOptions('create'),
  );
  return {
    ...mutation,
    mutationState,
  };
};

export const useRequestsUpdate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: requestQueries.requests_mutationKey('update'),
    mutationFn: async (payload: UpdateRequest) => {
      await updateRequest(payload);
      await queryClient.refetchQueries(requestQueries.requests_invalidate());
    },
    onError: () => toast.error('Unable to update request'),
    onSuccess: () => toast.success('Request updated successfully'),
  });
  const mutationState = useMutationState(
    requestQueries.requests_mutationOptions('update'),
  );
  return {
    ...mutation,
    mutationState,
  };
};

export const useRequestsDelete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: requestQueries.requests_mutationKey('delete'),
    mutationFn: async (payload: DeleteRequest) => {
      await deleteRequest(payload);
      await queryClient.refetchQueries(requestQueries.requests_invalidate());
    },
    onError: () => toast.error('Unable to delete request'),
    onSuccess: () => toast.success('Request deleted successfully'),
  });
  const mutationState = useMutationState(
    requestQueries.requests_mutationOptions('delete'),
  );
  return {
    ...mutation,
    mutationState,
  };
};

type GetRequests = Pick<DatabaseTable['request'], 'assigner_id'>;
export const getRequests = async ({ assigner_id }: GetRequests) =>
  (
    await supabase
      .from('request')
      .select(
        '*, request_relation(*,interview_session(id,name)), assignee:recruiter_user!request_assignee_id_fkey(user_id, first_name, last_name), assigner:recruiter_user!request_assigner_id_fkey(user_id, first_name, last_name), applications(id,public_jobs(id,job_title), candidates(first_name, last_name))',
      )
      .eq('assigner_id', assigner_id)
      .throwOnError()
  ).data.filter((request) => request.request_relation.length > 0);

type GetRequestProgress = Pick<DatabaseTable['request_progress'], 'request_id'>;
export const getRequestProgress = async ({ request_id }: GetRequestProgress) =>
  (
    await supabase
      .from('request_progress')
      .select('*')
      .eq('request_id', request_id)
      .throwOnError()
  ).data;

type CreateRequests = DatabaseFunctions['create_session_requests']['Args'];
export const createRequests = async (payload: CreateRequests) =>
  await supabase.rpc('create_session_requests', payload).throwOnError();

type UpdateRequest = {
  id: DatabaseTable['request']['id'];
  payload: Omit<DatabaseTableUpdate['request'], 'id'>;
};
export const updateRequest = async ({ id, payload }: UpdateRequest) =>
  await supabase.from('request').update(payload).eq('id', id).throwOnError();

type DeleteRequest = Pick<DatabaseTable['request'], 'id'>;
export const deleteRequest = async (payload: DeleteRequest) =>
  await supabase.from('request').delete().eq('id', payload).throwOnError();
