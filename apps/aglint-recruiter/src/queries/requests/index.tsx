import type {
  DatabaseFunctions,
  DatabaseTable,
  DatabaseTableUpdate,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { toast as specialToast } from '@components/hooks/use-toast';
import { type RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import {
  type MutationFilters,
  type QueryClient,
  type QueryFilters,
  queryOptions,
  useMutation,
  useMutationState,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback } from 'react';

import { supabase } from '@/utils/supabase/client';

import { appKey, GC_TIME } from '..';
import {
  type Request,
  type RequestProgress,
  type RequestResponse,
} from './types';

export const requestQueries = {
  requests_key: () => 'requests' as const,
  requests_queryKey: () => [appKey, requestQueries.requests_key()] as const,
  request_workflow_key: () => 'request_workflow' as const,
  requests_workflow_queryKey: ({ request_id }: GetRequestProgress) =>
    [
      ...requestQueries.requests_queryKey(),
      requestQueries.request_workflow_key(),
      { request_id },
    ] as const,
  requests_mutationKey: (method: 'create' | 'update' | 'delete') =>
    [appKey, requestQueries.requests_key(), method] as const,
  requests: ({ filters, sort, payload }: GetRequestParams) =>
    queryOptions({
      enabled: !!payload.assigner_id,
      gcTime: payload.assigner_id ? GC_TIME : 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      queryKey: [...requestQueries.requests_queryKey(), { filters }, { sort }],
      queryFn: async () =>
        getRequests(await getUnfilteredRequests({ payload, sort, filters })),
      refetchInterval:
        process.env.NODE_ENV === 'development' ? 20000 : undefined, //NOTE: only required in local db
      placeholderData: {
        urgent_request: [],
        schedule_request: [],
        reschedule_request: [],
        cancel_schedule_request: [],
        decline_request: [],
        completed_request: [],
      },
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
    select: (mutation: any) => mutation.state.variables as U,
  }),
  requests_invalidate: () => ({
    predicate: ((query) =>
      query.queryKey.includes(requestQueries.requests_key()) &&
      !query.queryKey.includes(requestQueries.request_progress_key()) &&
      !query.queryKey.includes(
        requestQueries.request_workflow_key(),
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
  all_request_progress_predicate: () => (query: any) =>
    query.queryKey.includes(requestQueries.request_progress_key()) &&
    query.state.data !== undefined,
  request_progress_predicate:
    ({ request_id }: GetRequestProgress) =>
    (query: any) =>
      query.queryKey.includes(requestQueries.request_progress_key()) &&
      query.state.data !== undefined &&
      !!query.queryKey.find((key: any) => key?.request_id === request_id),
  request_progress: ({
    request_id,
    enabled = true,
  }: GetRequestProgress & { enabled?: boolean }) =>
    queryOptions({
      enabled: !!request_id && enabled,
      gcTime: request_id ? GC_TIME : 0,
      placeholderData: [],
      refetchOnMount: true,
      refetchInterval:
        process.env.NODE_ENV === 'development' ? 30000 : undefined,
      queryKey: requestQueries.request_progress_queryKey({ request_id }),
      queryFn: async () =>
        (
          await supabase
            .from('request_progress')
            .select('*')
            .eq('request_id', request_id)
            .order('updated_at', { ascending: true })
            .throwOnError()
        ).data ?? [],
    }),
  request_workflow: ({
    request_id,
    enabled,
  }: {
    request_id: string;
    enabled?: boolean;
  }) =>
    queryOptions({
      placeholderData: [],
      enabled: !!request_id && enabled,
      gcTime: request_id ? GC_TIME : 0,
      queryKey: requestQueries.requests_workflow_queryKey({ request_id }),
      queryFn: async () => {
        const data = await getRequestWorkflow(request_id);
        return data;
      },
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
      await queryClient.cancelQueries(
        requestQueries.requests_invalidate().refetchQueries(),
      );
      await Promise.allSettled([
        queryClient.refetchQueries(
          requestQueries.requests_invalidate().refetchQueries(),
        ),
        queryClient.removeQueries(
          requestQueries.requests_invalidate().removeQueries(),
        ),
      ]);
    },
    onError: () =>
      specialToast({
        variant: 'destructive',
        title: 'Unable to create requests',
      }),
    onSuccess: (_, { toast = true }) =>
      toast && specialToast({ title: 'Requests created successfully' }),
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
      await queryClient.cancelQueries(
        requestQueries.requests_invalidate().refetchQueries(),
      );
      await Promise.allSettled([
        queryClient.refetchQueries(
          requestQueries.requests_invalidate().refetchQueries(),
        ),
        queryClient.removeQueries(
          requestQueries.requests_invalidate().removeQueries(),
        ),
      ]);
    },
    onError: () =>
      specialToast({
        variant: 'destructive',
        title: 'Unable to update request',
      }),
    onSuccess: (_, { toast = true }) =>
      toast && specialToast({ title: 'Request updated successfully' }),
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
      await queryClient.cancelQueries(
        requestQueries.requests_invalidate().refetchQueries(),
      );
      await Promise.allSettled([
        queryClient.refetchQueries(
          requestQueries.requests_invalidate().refetchQueries(),
        ),
        queryClient.removeQueries(
          requestQueries.requests_invalidate().removeQueries(),
        ),
      ]);
    },
    onError: () =>
      specialToast({
        variant: 'destructive',
        title: 'Unable to delete request',
      }),
    onSuccess: (_, { toast = true }) =>
      toast && specialToast({ title: 'Request deleted successfully' }),
  });
  const mutationState = useMutationState(
    requestQueries.requests_mutationOptions('delete'),
  );
  return {
    ...mutation,
    mutationState,
  };
};

type RealtimeRequest = RealtimePostgresInsertPayload<DatabaseTable['request']>;
type RealtimeRequestProgress = RealtimePostgresInsertPayload<
  DatabaseTable['request_progress']
>;

export const useRequestRealtime = () => {
  const queryClient = useQueryClient();
  const insertRequest = useCallback(() => {
    queryClient.cancelQueries(
      requestQueries.requests_invalidate().refetchQueries(),
    );
    Promise.allSettled([
      queryClient.removeQueries(
        requestQueries.requests_invalidate().removeQueries(),
      ),
      queryClient.refetchQueries(
        requestQueries.requests_invalidate().refetchQueries(),
      ),
    ]);
  }, [queryClient]);
  const updateRequest = useCallback(
    (payload: RealtimeRequest) => {
      queryClient.removeQueries(
        requestQueries.requests_invalidate().removeQueries(),
      );
      queryClient
        .getQueriesData<RequestResponse>({
          predicate: requestQueries.requests_invalidate().predicate,
        })
        .forEach(([queryKey, queryData]) => {
          queryClient.setQueryData<RequestResponse>(
            queryKey,
            getRequests(
              Object.values(queryData!)
                .flatMap((entry) => entry)
                .reduce((acc, curr) => {
                  if (curr.id === payload.new.id)
                    acc.push({
                      ...curr,
                      ...payload.new,
                    });
                  else acc.push(curr);
                  return acc;
                }, [] as Request[]),
            ),
          );
        });
    },
    [queryClient],
  );
  const deleteRequest = useCallback(
    (payload: RealtimeRequest) => {
      queryClient.removeQueries(
        requestQueries.requests_invalidate().removeQueries(),
      );
      queryClient
        .getQueriesData<RequestResponse>({
          predicate: requestQueries.requests_invalidate().predicate,
        })
        .forEach(([queryKey, queryData]) => {
          queryClient.setQueryData<RequestResponse>(
            queryKey,
            getRequests(
              Object.values(queryData!)
                .flatMap((entry) => entry)
                .reduce((acc, curr) => {
                  if (curr.id !== (payload.old as any).id) acc.push(curr);
                  return acc;
                }, [] as Request[]),
            ),
          );
        });
    },
    [queryClient],
  );
  const insertRequestProgress = useCallback(
    (payload: RealtimeRequestProgress) => {
      queryClient
        .getQueriesData<RequestProgress[]>({
          predicate: requestQueries.request_progress_predicate({
            request_id: payload.new.request_id,
          }),
        })
        .forEach(([queryKey, queryData]) => {
          queryClient.setQueryData<RequestProgress[]>(
            queryKey,
            [...queryData!, payload.new].toSorted(
              (a, z) =>
                dayjsLocal(a.created_at).date() -
                dayjsLocal(z.created_at).date(),
            ),
          );
        });
    },
    [queryClient],
  );
  const updateRequestProgress = useCallback(
    (payload: RealtimeRequestProgress) => {
      queryClient
        .getQueriesData<RequestProgress[]>({
          predicate: requestQueries.request_progress_predicate({
            request_id: payload.new.request_id,
          }),
        })
        .forEach(([queryKey, queryData]) => {
          queryClient.setQueryData<RequestProgress[]>(
            queryKey,
            queryData!.reduce((acc, curr) => {
              if (curr.id === payload.new.id) acc.push(payload.new);
              else acc.push(curr);
              return acc;
            }, [] as RequestProgress[]),
          );
        });
    },
    [queryClient],
  );
  const deleteRequestProgress = useCallback(
    (payload: RealtimeRequestProgress) => {
      queryClient
        .getQueriesData<RequestProgress[]>({
          predicate: requestQueries.all_request_progress_predicate(),
        })
        .forEach(([queryKey, queryData]) => {
          queryClient.setQueryData<RequestProgress[]>(
            queryKey,
            queryData!.reduce((acc, curr) => {
              if (curr.id !== (payload.old as any).id) acc.push(curr);
              return acc;
            }, [] as RequestProgress[]),
          );
        });
    },
    [queryClient],
  );
  return {
    insertRequest,
    updateRequest,
    deleteRequest,
    insertRequestProgress,
    updateRequestProgress,
    deleteRequestProgress,
  };
};

type GetRequests = Pick<DatabaseTable['request'], 'assigner_id'>;
type RequestsFilterKeys =
  | keyof Pick<
      DatabaseTable['request'],
      | 'is_new'
      | 'status'
      | 'title'
      | 'type' //assignee_id'
      | 'created_at'
    >
  | 'end_at'
  | 'jobs'
  | 'applications'
  | 'assignerList'
  | 'assigneeList';
type RequestFilterValues = {
  is_new: DatabaseTable['request']['is_new'];
  status: string[];
  title: DatabaseTable['request']['title'];
  type: string[];
  created_at: DatabaseTable['request']['created_at'];
  end_at: DatabaseTable['request']['created_at'];
  jobs: string[];
  applications?: string[];
  assignerList?: string[];
  assigneeList?: string[];
};
type RequestsFilter = {
  [id in RequestsFilterKeys]: RequestFilterValues[id];
};

type RequestsSort = {
  order: 'asc' | 'desc';
  type: keyof Pick<
    DatabaseTable['request'],
    'title' | 'created_at' | 'updated_at'
  >;
};

export type GetRequestParams = {
  payload: GetRequests;
  filters: RequestsFilter;
  sort: RequestsSort;
};

export const REQUEST_SELECT =
  '*,request_note(id,note), request_relation(*,interview_session(id,name,session_duration,session_type)), assignee:recruiter_user!request_assignee_id_fkey(user_id, first_name, last_name,position,profile_image), assigner:recruiter_user!request_assigner_id_fkey(user_id, first_name, last_name), applications(id, job_id, recruiter_id, public_jobs(id,job_title,departments(name),office_locations(city,country),workflow_job_relation(*,workflow(*,workflow_action(*)))), candidates(id,first_name, last_name,current_job_title,city,state,country,email,phone,linkedin,avatar,timezone))';

export const getUnfilteredRequests = async ({
  payload: { assigner_id },
  filters: {
    /*assignee_id,*/ is_new,
    status,
    title,
    type: filterType,
    created_at,
    end_at,
    jobs,
    applications,
    assigneeList,
    assignerList,
  },
  sort: { order, type },
}: GetRequestParams) => {
  const query = supabase.from('request').select(REQUEST_SELECT);

  query.or(`assigner_id.eq.${assigner_id},assignee_id.eq.${assigner_id}`);

  if (is_new) query.eq('is_new', true);

  if (created_at && end_at) {
    query.gte('created_at', dayjsLocal(created_at).format('YYYY-MM-DD'));
    query.lt(
      'created_at',
      dayjsLocal(end_at).add(1, 'day').format('YYYY-MM-DD'),
    );
  }

  if (status?.length) query.or(`status.in.(${status.join(',')})`);

  if (filterType?.length) query.or(`type.in.(${filterType.join(',')})`);
  if (jobs?.length)
    query.or(`job_id.in.(${jobs.join(',')})`, {
      referencedTable: 'applications',
    });
  if (applications?.length)
    query.or(`application_id.in.(${applications.join(',')})`);

  if (assignerList?.length)
    query.or(`assigner_id.in.(${assignerList.join(',')})`);
  if (assigneeList?.length)
    query.or(`assignee_id.in.(${assigneeList.join(',')})`);

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

  return ((await query).data ?? []).filter(
    ({ applications }) => !!applications,
  );
};

type Sections =
  | Request['type']
  | `${Extract<Request['status'], 'completed'>}_request`
  | `${Extract<Request['priority'], 'urgent'>}_request`;

export const getRequests = (response: Request[]) => {
  return (
    Object.entries(
      response.reduce(
        (acc, curr) => {
          if (curr.status === 'completed') acc.completed_request.push(curr);
          else if (curr.priority === 'urgent') acc.urgent_request.push(curr);
          else acc[curr.type].push(curr);
          return acc;
        },
        {
          urgent_request: [],
          schedule_request: [],
          reschedule_request: [],
          cancel_schedule_request: [],
          decline_request: [],
          completed_request: [],
        } as { [_id in Sections]: typeof response },
      ),
    ) as [Sections, typeof response][]
  ).reduce(
    (acc, [key, values]) => {
      switch (key) {
        case 'completed_request':
          acc[key] = values.toSorted(
            (a, z) =>
              dayjsLocal(z.completed_at).date() -
              dayjsLocal(a.completed_at).date(),
          );
          break;
        default:
          acc[key] = requestSort(values);
      }
      return acc;
    },
    {} as { [_id in Sections]: typeof response },
  );
};

type SortRequest = Extract<Request['status'], 'to_do' | 'in_progress'> | 'rest';

const requestSort = (request: Request[]) => {
  return Object.values(
    request.reduce(
      (acc, curr) => {
        if (curr.status === 'to_do') acc.to_do.push(curr);
        else if (curr.status === 'in_progress') acc.in_progress.push(curr);
        else acc.rest.push(curr);
        return acc;
      },
      { to_do: [], in_progress: [], rest: [] } as {
        [_id in SortRequest]: typeof request;
      },
    ),
  )
    .map((values) =>
      values.toSorted(
        (a, z) =>
          dayjsLocal(z.updated_at).date() - dayjsLocal(a.updated_at).date(),
      ),
    )
    .flatMap((values) => values);
};

type GetRequestProgress = Pick<DatabaseTable['request_progress'], 'request_id'>;
export const getRequestProgress = async ({ request_id }: GetRequestProgress) =>
  (
    await supabase
      .from('request_progress')
      .select('*')
      .eq('request_id', request_id)
      .order('created_at', { ascending: true })
      .throwOnError()
  ).data ?? [];

type CreateRequests = DatabaseFunctions['create_session_request']['Args'];
const createRequests = async (requestPayload: CreateRequests) =>
  await supabase.rpc('create_session_request', requestPayload).throwOnError();

type UpdateRequest = {
  requestId: DatabaseTable['request']['id'];
  requestPayload: Omit<DatabaseTableUpdate['request'], 'id'>;
};
const updateRequest = async ({ requestId, requestPayload }: UpdateRequest) =>
  await supabase
    .from('request')
    .update(requestPayload)
    .eq('id', requestId)
    .throwOnError();

type DeleteRequest = {
  requestId: DatabaseTable['request']['id'];
};
const deleteRequest = async ({ requestId }: DeleteRequest) =>
  await supabase.from('request').delete().eq('id', requestId).throwOnError();

export const getRequestWorkflow = async (request_id: string) => {
  const d = supabaseWrap(
    await supabase
      .from('workflow')
      .select('*, workflow_action!inner(*)')
      .eq('request_id', request_id)
      .eq('workflow_type', 'request'),
    false,
  );

  return d ?? [];
};
