import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { appKey, GC_TIME } from '..';

type RequestQueryParams = {
  assigner_id?: string;
};

type RequestProgressQueryParams = {
  request_id?: string;
};

export const requestQueries = {
  request: ({ assigner_id }: RequestQueryParams = {}) =>
    queryOptions({
      enabled: !!assigner_id,
      gcTime: assigner_id ? GC_TIME : 0,
      queryKey: [appKey, 'requests'] as const,
      queryFn: async () =>
        (
          await supabase
            .from('request')
            .select('*')
            .eq('assigner_id', assigner_id)
            .throwOnError()
        ).data,
    }),
  request_progress: ({ request_id }: RequestProgressQueryParams = {}) =>
    queryOptions({
      enabled: !!request_id,
      gcTime: request_id ? GC_TIME : 0,
      queryKey: [...requestQueries.request().queryKey, { request_id }] as const,
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
