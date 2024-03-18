import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { jobScoringParamKeys } from './keys';
import { jobQueryKeys } from '../job/keys';
import { Job } from '../job/types';
import { useCurrentJob } from '../job-assessment/keys';

export const useJobScoringPoll = () => {
  const queryClient = useQueryClient();
  const { job_id, job } = useCurrentJob();
  const { queryKey: jobQueryKey } = jobQueryKeys.jobs();
  const { queryKey } = jobScoringParamKeys.job({ job_id });
  const jobs = queryClient.getQueryData<Job[]>(jobQueryKey);
  const query = useQuery({
    queryKey,
    enabled: !!job,
    refetchInterval: job?.scoring_param_status === 'loading' ? 5000 : false,
    queryFn: async () => {
      const polledData = await readJobScoring(job_id);
      const newJobs = jobs.reduce((acc, curr) => {
        if (curr.id === job_id) acc.push({ ...curr, ...polledData });
        else acc.push(curr);
        return acc;
      }, [] as Job[]);
      queryClient.setQueryData<Job[]>(jobQueryKey, newJobs);
      return polledData;
    },
  });
  return {
    ...query,
    status: (!!job && job?.scoring_param_status === 'loading'
      ? 'polling'
      : query.status) as 'success' | 'error' | 'pending' | 'polling',
  };
};

export const readJobScoring = async (job_id: string) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select('scoring_param_status, draft, parameter_weights, description_hash')
    .eq('id', job_id);
  if (error) throw new Error(error.message);
  return data[0] as unknown as {
    scoring_param_status: Job['scoring_param_status'];
    parameter_weights: Job['parameter_weights'];
    description_hash: Job['description_hash'];
    draft: Job['draft'];
  };
};
