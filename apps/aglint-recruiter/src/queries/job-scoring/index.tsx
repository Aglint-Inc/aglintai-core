import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { GC_TIME } from '..';
import { jobsQueryKeys } from '../jobs/keys';
import { Job } from '../jobs/types';
import { jobScoringParamKeys } from './keys';

export const useJobScoringPoll = (job: Job) => {
  const queryClient = useQueryClient();
  const id = job?.id;
  const { queryKey: jobQueryKey } = jobsQueryKeys.jobs();
  const { queryKey } = jobScoringParamKeys.scoring({ id });
  const jobs = queryClient.getQueryData<Job[]>(jobQueryKey);
  const query = useQuery({
    queryKey,
    enabled: !!job,
    gcTime: job ? GC_TIME : 0,
    refetchInterval: job?.scoring_criteria_loading ? 5000 : false,
    queryFn: async () => {
      const polledData = await readJobScoring(id);
      const newJobs = jobs.reduce((acc, curr) => {
        if (curr.id === id) acc.push({ ...curr, ...polledData });
        else acc.push(curr);
        return acc;
      }, [] as Job[]);
      queryClient.setQueryData<Job[]>(jobQueryKey, newJobs);
      return polledData;
    },
  });
  return {
    ...query,
    status: (!!job && job?.scoring_criteria_loading
      ? 'polling'
      : query.status) as 'success' | 'error' | 'pending' | 'polling',
  };
};

export const readJobScoring = async (job_id: string) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select(
      'scoring_criteria_loading, draft, parameter_weights, description_hash',
    )
    .eq('id', job_id);
  if (error) throw new Error(error.message);
  return data[0] as unknown as {
    scoring_criteria_loading: Job['scoring_criteria_loading'];
    parameter_weights: Job['parameter_weights'];
    description_hash: Job['description_hash'];
    draft: Job['draft'];
  };
};
