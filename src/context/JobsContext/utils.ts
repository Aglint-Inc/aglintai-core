import { supabase } from '@/src/utils/supabaseClient';

import { Job, JobContext } from './types';

export const initialJobContext: JobContext = {
  jobsData: undefined,
  handleJobCreate: undefined,
  handleJobRead: undefined,
  handleJobUpdate: undefined,
  handleJobDelete: undefined,
  handleJobError: undefined,
  initialLoad: false,
};

export const createJobsDbAction = async (inputData: Partial<Job>) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .insert(inputData)
    .select();
  return { data, error };
};

export const readJobsDbAction = async (id: string) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select('*')
    .eq('recruiter_id', id);
  return { data, error };
};

export const updateJobDbAction = async (
  id: string,
  inputData: Partial<Omit<Job, 'id' | 'recruiter_id'>>,
) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .update(inputData)
    .eq('id', id);
  return { data, error };
};

export const deleteJobDbAction = async (id: string) => {
  const { error } = await supabase.from('public_jobs').delete().eq('id', id);
  return { data: error ? false : true, error };
};
