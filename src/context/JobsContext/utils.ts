import { supabase } from '@/src/utils/supabaseClient';

import { InputData, JobContext, Status } from './types';

export const initialJobContext: JobContext = {
  jobsData: { applications: undefined, jobs: undefined },
  handleJobCreate: undefined,
  handleJobRead: undefined,
  handleJobUpdate: undefined,
  handleJobDelete: undefined,
  handleJobError: undefined,
  initialLoad: false,
};

export const createJobDbAction = async (
  recruiter_id: string,
  inputData: InputData,
) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .upsert({ ...inputData, recruiter_id })
    .select();
  const fetchedData = [
    { ...data[0], status: data[0].status as unknown as Status },
  ];

  return { data: fetchedData, error };
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
    .select('*')
    .in('job_id', jobIds);
  return { data, error };
};

// export const readJobDbAction = async (recruiter_id) => {
//   const { data, error } = await supabase.from('public_jobs').select('*');
//   return { data, error };
// };

export const updateJobDbAction = async (
  inputData: InputData,
  recruiter_id: string,
) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .upsert({ ...inputData, recruiter_id: recruiter_id })
    .select();

  const fetchedData = [
    { ...data[0], status: data[0].status as unknown as Status },
  ];

  return { data: fetchedData, error };
};

export const deleteJobDbAction = async (id: string) => {
  const { error } = await supabase.from('public_jobs').delete().eq('id', id);
  return { data: error ? false : true, error };
};
