import { DatabaseTable, DatabaseView } from '@aglint/shared-types';
import { infiniteQueryOptions, keepPreviousData } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { jobQueryKeys } from '../job/keys';

const ROWS = 30;

export const applicationsQueries = {
  all: ({ job_id }: ApplicationAllQueryPrerequistes) => ({
    queryKey: [...jobQueryKeys.job({ id: job_id }).queryKey, 'applications'],
  }),
  applications: ({ job_id, count, ...filters }: PageParams) =>
    infiniteQueryOptions({
      queryKey: [...applicationsQueries.all({ job_id }).queryKey, filters],
      initialPageParam: { index: 0, job_id, ...filters },
      enabled: !!count,
      refetchOnWindowFocus: false,
      maxPages: Math.trunc(count / ROWS) + (count % ROWS ? 1 : 0) + 1,
      placeholderData: keepPreviousData,
      getPreviousPageParam: (firstPage) =>
        firstPage?.[0]
          ? {
              index: firstPage[0].index,
              job_id,
              ...filters,
            }
          : undefined,
      getNextPageParam: (lastPage) => {
        const len = lastPage?.length ?? 0;
        if (!len) return undefined;
        const index = lastPage[len - 1].index + 1;
        if (!count || index >= count) return undefined;
        return {
          index,
          job_id,
          ...filters,
        };
      },
      queryFn: getApplications,
    }),
};

/*
{
  const len  = lastPage?.lenght ?? 0;
  if(!len) return undefined;
  const index = lastPage[len-1].index + 1;
  if(index>count) return undefined;
  return {
    index,
    job_id,
    ...filters
  }
}
*/

type ApplicationAllQueryPrerequistes = {
  job_id: DatabaseTable['public_jobs']['id'];
  count?: number;
};

type PageParams = ApplicationAllQueryPrerequistes & {
  overall_score?: number;
  status: DatabaseView['application_view']['status'];
};

const getApplications = async ({
  pageParam: { job_id, index, status },
}: {
  pageParam: PageParams & { index: number };
}) => {
  const applications = (
    await supabase
      .from('application_view')
      .select('*')
      .range(index, index + ROWS - 1)
      .eq('job_id', job_id)
      .eq('status', status)
      .throwOnError()
  ).data.map((application, i) => ({ ...application, index: index + i }));
  return applications;
};
