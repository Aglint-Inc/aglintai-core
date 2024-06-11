import type { DatabaseTable } from '@aglint/shared-types';
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { GC_TIME } from '..';
import { jobsQueryKeys } from '../jobs/keys';
import { Job } from '../jobs/types';
import { jobQueryKeys } from './keys';

const queries = {
  job: ({ id }: JobRequisite) =>
    queryOptions({
      queryKey: [...jobsQueryKeys.jobs().queryKey, { id }],
      queryFn: async () =>
        (
          await supabase
            .from('public_jobs')
            .select('*')
            .eq('id', id)
            .single()
            .throwOnError()
        ).data,
    }),
};

export type JobRequisite = Pick<DatabaseTable['public_jobs'], 'id'>;
export const useJobRead = (args: JobRequisite) => {
  const { id } = args;
  return useQuery(queries.job({ id }));
};

export const useJobCount = (job: Job) => {
  const id = job?.id;
  const { queryKey } = jobQueryKeys.count({ id });
  const queryClient = useQueryClient();
  const response = useQuery({
    initialData: job?.count ?? null,
    queryKey,
    enabled: !!job,
    queryFn: () => getApplicationCount(id),
    gcTime: job ? GC_TIME : 0,
  });
  return {
    ...response,
    invalidate: () => queryClient.invalidateQueries({ queryKey }),
  };
};

const getApplicationCount = async (job_id: string) =>
  (
    await supabase.rpc('getsectioncounts', {
      jobid: job_id,
    })
  ).data;
