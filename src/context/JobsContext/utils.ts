import { supabase } from '@/src/utils/supabaseClient';

import { JobContext } from './types';

export const initialJobContext: JobContext = {
  jobsData: { applications: undefined, jobs: undefined },
  handleJobRead: undefined,
  handleJobUpdate: undefined,
  handleUIJobUpdate: undefined,
  handleJobDelete: undefined,
  handleJobError: undefined,
  handleGetJob: undefined,
  initialLoad: false,
  handleApplicationsRead: undefined,
};

export const readJobDbAction = async (recruiter_id: string) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('recruiter_id', recruiter_id);
  return { data, error };
};

export const readJobApplicationsAction = async (jobIds: string[]) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select('job_id,status')
    .in('job_id', jobIds);
  return { data, error };
};

export const updateJobDbAction = async (inputData) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .upsert(inputData)
    .select();
  return { data, error };
};

export const deleteJobDbAction = async (id: string) => {
  const { error } = await supabase.from('public_jobs').delete().eq('id', id);
  return { data: error ? false : true, error };
};
