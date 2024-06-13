import { DB } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { GC_TIME } from '..';
import { Job } from '../jobs/types';
import { jobDashboardQueryKeys } from './keys';
import { DashboardTypes } from './types';

export const useJobSkills = (job: Job) => {
  const id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.skills({ id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getSkillsPool(id),
    gcTime: job ? GC_TIME : 0,
  });
  return response;
};

export const useJobDashboardRefresh = () => {
  const queryClient = useQueryClient();
  return (id: string) => {
    const { queryKey } = jobDashboardQueryKeys.dashboard({ id });
    queryClient.invalidateQueries({ queryKey });
  };
};

export const useJobLocations = (job: Job) => {
  const id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.locations({ id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getLocationPool(id),
    gcTime: job ? GC_TIME : 0,
  });
  return response;
};

export const useJobMatches = (job: Job) => {
  const id = job?.id;
  const { queryKey } = jobDashboardQueryKeys.matches({ id });
  const response = useQuery({
    queryKey,
    enabled: !!job,
    queryFn: () => getResumeMatch(id),
    gcTime: job ? GC_TIME : 0,
  });
  return response;
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
  unsafeData: DB['public']['Functions']['getresumematches']['Returns'],
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
