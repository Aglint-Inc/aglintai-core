import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Database } from '@/src/types/schema';
import { supabase } from '@/src/utils/supabase/client';

import { jobDashboardQueryKeys } from './keys';
import { DashboardTypes } from './types';
import { useCurrentJob } from '../job-assessment/keys';

export const useJobSkills = () => {
  const { job_id } = useCurrentJob();
  const { queryKey } = jobDashboardQueryKeys.skills({ job_id });
  const response = useQuery({ queryKey, queryFn: () => getSkillsPool(job_id) });
  return response;
};

export const useJobDashboardRefresh = () => {
  const queryClient = useQueryClient();
  const { queryKey } = jobDashboardQueryKeys.all;
  return () => queryClient.invalidateQueries({ queryKey });
};

export const useJobLocations = () => {
  const { job_id } = useCurrentJob();
  const { queryKey } = jobDashboardQueryKeys.locations({ job_id });
  const response = useQuery({
    queryKey,
    queryFn: () => getLocationPool(job_id),
  });
  return response;
};

export const useJobMatches = () => {
  const { job_id } = useCurrentJob();
  const { queryKey } = jobDashboardQueryKeys.matches({ job_id });
  const response = useQuery({
    queryKey,
    queryFn: () => getResumeMatch(job_id),
  });
  return response;
};

export const useJobTenureAndExperience = () => {
  const { job_id } = useCurrentJob();
  const { queryKey } = jobDashboardQueryKeys.tenureAndExperience({ job_id });
  const response = useQuery({
    queryKey,
    queryFn: () => getTenureAndExperience(job_id),
  });
  return response;
};

export const useJobSchedules = () => {
  const { job_id } = useCurrentJob();
  const { queryKey } = jobDashboardQueryKeys.schedules({ job_id });
  const response = useQuery({
    queryKey,
    queryFn: () => getScheduleData(job_id),
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
  return data as DashboardTypes['schedules'];
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
