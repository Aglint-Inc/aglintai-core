import { DatabaseTableInsert } from '@aglint/shared-types';
import { type QueryFilters, queryOptions } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { appKey, GC_TIME } from '..';
import { RequestProgressQueryParams, RequestQueryParams } from './types';

export const requestQueries = {
  requests_key: () => 'requests' as const,
  requests_queryKey: () => [appKey, requestQueries.requests_key()] as const,
  requests: ({ assigner_id }: RequestQueryParams) =>
    queryOptions({
      enabled: !!assigner_id,
      gcTime: assigner_id ? GC_TIME : 0,
      queryKey: requestQueries.requests_queryKey(),
      queryFn: async () => await getRequests({ assigner_id }),
    }),
  requests_predicate: () => ({
    predicate: ((query) =>
      query.queryKey.includes(requestQueries.requests_key()) &&
      !query.queryKey.includes(
        requestQueries.request_progress_key(),
      )) as QueryFilters['predicate'],
  }),
  request_progress_key: () => 'request_progress' as const,
  request_progress_queryKey: ({ request_id }: RequestProgressQueryParams) =>
    [
      ...requestQueries.requests_queryKey(),
      requestQueries.request_progress_key(),
      { request_id },
    ] as const,
  request_progress: ({ request_id }: RequestProgressQueryParams) =>
    queryOptions({
      enabled: !!request_id,
      gcTime: request_id ? GC_TIME : 0,
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

export const getRequests = async ({ assigner_id }: RequestQueryParams) =>
  (
    await supabase
      .from('request')
      .select(
        '*, request_relation(*), assignee:recruiter_user!request_assignee_id_fkey(user_id, first_name, last_name), assigner:recruiter_user!request_assigner_id_fkey(user_id, first_name, last_name), applications(id, candidates(first_name, last_name))',
      )
      .eq('assigner_id', assigner_id)
      .throwOnError()
  ).data;

export const getRequestProgress = async ({
  request_id,
}: RequestProgressQueryParams) =>
  (
    await supabase
      .from('request_progress')
      .select('*')
      .eq('request_id', request_id)
      .throwOnError()
  ).data;
export const createRequest = async (
  newRequestData: DatabaseTableInsert['request'],
) =>
  (
    await supabase
      .from('request')
      .insert({ ...newRequestData })
      .select('*')
      .single()
      .throwOnError()
  ).data;

export const createRequestSessionRelations = async (
  newRequestData: DatabaseTableInsert['request_relation'][],
) =>
  (
    await supabase
      .from('request_relation')
      .insert([...newRequestData])
      .select('*')
      .throwOnError()
  ).data;
