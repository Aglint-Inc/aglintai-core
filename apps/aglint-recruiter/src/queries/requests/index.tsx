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
import aglintToast from '@/src/utils/toast';

import { appKey, GC_TIME } from '..';

export const requestQueries = {
  requests_key: () => 'requests' as const,
  requests_queryKey: () => [appKey, requestQueries.requests_key()] as const,
  requests_mutationKey: (method: 'create' | 'update' | 'delete') =>
    [appKey, requestQueries.requests_key(), method] as const,
  requests: ({ filters, sort, payload }: GetRequestParams) =>
    queryOptions({
      enabled: !!payload.assigner_id,
      gcTime: payload.assigner_id ? GC_TIME : 0,
      queryKey: [...requestQueries.requests_queryKey(), { filters }, { sort }],
      queryFn: async () => await getRequests({ payload, sort, filters }),
    }),
  requests_mutationOptions: <
    T extends 'create' | 'update' | 'delete',
    U extends T extends 'create'
      ? UseCreateRequest
      : T extends 'update'
        ? UseUpdateRequest
        : UseDeleteRequest,
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
      refetchInterval: 5000,
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

type Options = {
  loading?: boolean;
  toast?: boolean;
};

type UseCreateRequest = { payload: CreateRequests } & Options;

export const useRequestsCreate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: requestQueries.requests_mutationKey('create'),
    mutationFn: async ({ payload }: UseCreateRequest) => {
      await createRequests(payload);
      await Promise.allSettled([
        queryClient.refetchQueries(
          requestQueries.requests_invalidate().refetchQueries(),
        ),
        queryClient.removeQueries(
          requestQueries.requests_invalidate().removeQueries(),
        ),
      ]);
    },
    onError: () => aglintToast.error('Unable to create requests'),
    onSuccess: (_, { toast = true }) =>
      toast && aglintToast.success('Requests created successfully'),
  });
  const mutationState = useMutationState(
    requestQueries.requests_mutationOptions('create'),
  );
  return {
    ...mutation,
    mutationState,
  };
};

type UseUpdateRequest = { payload: UpdateRequest } & Options;
export const useRequestsUpdate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: requestQueries.requests_mutationKey('update'),
    mutationFn: async ({ payload }: UseUpdateRequest) => {
      await updateRequest(payload);
      await Promise.allSettled([
        queryClient.refetchQueries(
          requestQueries.requests_invalidate().refetchQueries(),
        ),
        queryClient.removeQueries(
          requestQueries.requests_invalidate().removeQueries(),
        ),
      ]);
    },
    onError: () => aglintToast.error('Unable to update request'),
    onSuccess: (_, { toast = true }) =>
      toast && aglintToast.success('Request updated successfully'),
  });
  const mutationState = useMutationState(
    requestQueries.requests_mutationOptions('update'),
  );
  return {
    ...mutation,
    mutationState,
  };
};

type UseDeleteRequest = { payload: DeleteRequest } & Options;
export const useRequestsDelete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: requestQueries.requests_mutationKey('delete'),
    mutationFn: async ({ payload }: UseDeleteRequest) => {
      await deleteRequest(payload);
      await Promise.allSettled([
        queryClient.refetchQueries(
          requestQueries.requests_invalidate().refetchQueries(),
        ),
        queryClient.removeQueries(
          requestQueries.requests_invalidate().removeQueries(),
        ),
      ]);
    },
    onError: () => aglintToast.error('Unable to delete request'),
    onSuccess: (_, { toast = true }) =>
      toast && aglintToast.success('Request deleted successfully'),
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
type RequestsFilterKeys = Pick<
  DatabaseTable['request'],
  | 'is_new'
  | 'status'
  | 'title'
  | 'type' //assignee_id'
  | 'created_at'
>;
type RequestFilterValues = {
  is_new: DatabaseTable['request']['is_new'];
  status: DatabaseTable['request']['status'][];
  title: DatabaseTable['request']['title'];
  type: DatabaseTable['request']['type'][];
  created_at: DatabaseTable['request']['created_at'];
  // assignee_id: DatabaseTable['request']['assignee_id'][];
};
type RequestsFilter = {
  [id in keyof RequestsFilterKeys]: RequestFilterValues[id];
};

type RequestsSort = {
  order: 'asc' | 'desc';
  type: keyof Pick<DatabaseTable['request'], 'title' | 'created_at'>;
};

export type GetRequestParams = {
  payload: GetRequests;
  filters: RequestsFilter;
  sort: RequestsSort;
};
export const getRequests = async ({
  payload: { assigner_id },
  filters: {
    /*assignee_id,*/ is_new,
    status,
    title,
    type: filterType,
    created_at,
  },
  sort: { order, type },
}: GetRequestParams) => {
  const query = supabase
    .from('request')
    .select(
      '*, request_relation(*,interview_session(id,name)), assignee:recruiter_user!request_assignee_id_fkey(user_id, first_name, last_name), assigner:recruiter_user!request_assigner_id_fkey(user_id, first_name, last_name), applications(id,public_jobs(id,job_title), candidates(first_name, last_name))',
    )
    .eq('assigner_id', assigner_id);

  if (is_new) query.eq('is_new', true);

  if (created_at) query.gte('created_at', created_at);

  // if (assignee_id?.length)
  //   query.or(`assignee_id.in.(${assignee_id.join(',')})`);

  if (status?.length) query.or(`status.in.(${status.join(',')})`);

  if (filterType?.length) query.or(`type.in.(${filterType.join(',')})`);

  if (title?.length) {
    query.ilike('title', `%${title}%`);
  }

  if (type || order) {
    query.order(type, {
      ascending: order === 'asc',
      nullsFirst: false,
    });
  }

  query.order('id');

  return (await query).data;
};

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
export const createRequests = async (requestPayload: CreateRequests) =>
  await supabase.rpc('create_session_requests', requestPayload).throwOnError();

type UpdateRequest = {
  requestId: DatabaseTable['request']['id'];
  requestPayload: Omit<DatabaseTableUpdate['request'], 'id'>;
};
export const updateRequest = async ({
  requestId,
  requestPayload,
}: UpdateRequest) =>
  await supabase
    .from('request')
    .update(requestPayload)
    .eq('id', requestId)
    .throwOnError();

type DeleteRequest = {
  requestId: DatabaseTable['request']['id'];
};
export const deleteRequest = async ({ requestId }: DeleteRequest) =>
  await supabase.from('request').delete().eq('id', requestId).throwOnError();
