import { Database } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { Job } from '../job/types';
import { jobDashboardQueryKeys } from './keys';
import { DashboardTypes } from './types';

export const useJobSkills = (job: Job) => {
  const job_id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.skills({ job_id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getSkillsPool(job_id),
  });
  return response;
};

export const useJobDashboardRefresh = () => {
  const queryClient = useQueryClient();
  return (job_id: string) => {
    const { queryKey } = jobDashboardQueryKeys.job({ job_id });
    queryClient.invalidateQueries({ queryKey });
  };
};

export const useJobLocations = (job: Job) => {
  const job_id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.locations({ job_id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getLocationPool(job_id),
  });
  return response;
};

export const useJobMatches = (job: Job) => {
  const job_id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.matches({ job_id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getResumeMatch(job_id),
  });
  return response;
};

export const useJobTenureAndExperience = (job: Job) => {
  const job_id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.tenureAndExperience({ job_id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getTenureAndExperience(job_id),
  });
  return response;
};

export const useJobSchedules = (job: Job) => {
  const job_id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.schedules({ job_id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getScheduleData(job_id),
  });
  return response;
};

export const useJobInterviewPlanEnabled = (job: Job) => {
  const job_id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.interviewPlanEnabled({ job_id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getInterviewPlanEnabled(job_id),
  });
  return response;
};

const getInterviewPlanEnabled = async (job_id: string) => {
  const { data, error } = await supabase
    .from('interview_plan')
    .select('interview_session(id)')
    .eq('job_id', job_id);
  if (error) throw new Error(error.message);
  if (data.length === 0) return false;
  return data[0].interview_session.length > 0;
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

const getSkillsPool = async (job_id: string) => {
  const { data, error } = await supabase.rpc('getskillpools', {
    jobid: job_id,
  });
  if (error)
    throw new Error(`Skill pool RPC function failure: ${error.message}`);
  return data as DashboardTypes['skills'];
};

const getLocationPool = async (job_id: string) => {
  const { data, error } = await supabase.rpc('getlocationspool', {
    jobid: job_id,
  });
  if (error) throw new Error(error.message);
  return data as DashboardTypes['locations'];
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

const getResumeMatch = async (job_id: string) => {
  const { data, error } = await supabase.rpc('getallresumematches', {
    jobid: job_id,
    topmatch: 80,
    goodmatch: 60,
    averagematch: 40,
    poormatch: 20,
  });
  if (error) throw new Error(error.message);
  const safeData = resumeMatchRPCFormatter(data);
  return safeData as unknown as DashboardTypes['matches'];
};

export const resumeMatchRPCFormatter = (
  unsafeData: Database['public']['Functions']['getresumematches']['Returns'],
) => {
  const initialData = {
    matches: unsafeData,
    total: 0,
  };
  return Object.values(unsafeData).reduce((acc, curr) => {
    acc.total += curr;
    return acc;
  }, initialData) as typeof initialData;
};
