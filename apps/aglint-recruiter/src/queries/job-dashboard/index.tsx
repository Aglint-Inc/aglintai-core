import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase/client';

import { GC_TIME } from '..';
import { type Job } from '../jobs/types';
import { jobDashboardQueryKeys } from './keys';
import { type DashboardTypes } from './types';

export const useJobDashboardRefresh = () => {
  const queryClient = useQueryClient();
  return (id: string) => {
    const { queryKey } = jobDashboardQueryKeys.dashboard({ id });
    queryClient.invalidateQueries({ queryKey });
  };
};

export const useJobTenureAndExperience = (job: Job) => {
  const id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.tenureAndExperience({ id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getTenureAndExperience(id),
    gcTime: job ? GC_TIME : 0,
  });
  return response;
};

export const useJobSchedules = (job: Job) => {
  const id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.schedules({ id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getScheduleData(id),
    gcTime: job ? GC_TIME : 0,
  });
  return response;
};

const getTenureAndExperience = async (job_id: string) => {
  const { data, error } = await supabase.rpc('getexperienceandtenure', {
    jobid: job_id,
  });
  if (error)
    throw new Error(
      `Tenure and Experience RPC function failure: ${error.message}`,
    );
  return data as DashboardTypes['tenureAndExperience'];
};

export const getScheduleData = async (job_id: string) => {
  const { data, error } = await supabase.rpc(
    'get_interview_schedule_by_job_id',
    {
      target_job_id: job_id,
    },
  );
  if (error) throw new Error(error.message);
  return data as unknown as DashboardTypes['schedules'];
};
