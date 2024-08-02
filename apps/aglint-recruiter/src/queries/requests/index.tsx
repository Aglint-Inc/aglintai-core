import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { appKey, GC_TIME } from '..';
import { RequestProgressQueryParams, RequestQueryParams } from './types';
import { DatabaseTableInsert } from '@aglint/shared-types';

export const requestQueries = {
  requests: ({ assigner_id }: RequestQueryParams = {}) =>
    queryOptions({
      enabled: !!assigner_id,
      gcTime: assigner_id ? GC_TIME : 0,
      queryKey: [appKey, 'requests'] as const,
      queryFn: async () => await getRequests({ assigner_id }),
    }),
  request_progress: ({ request_id }: RequestProgressQueryParams = {}) =>
    queryOptions({
      enabled: !!request_id,
      gcTime: request_id ? GC_TIME : 0,
      queryKey: [
        ...requestQueries.requests().queryKey,
        { request_id },
      ] as const,
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
      .select('*')
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
