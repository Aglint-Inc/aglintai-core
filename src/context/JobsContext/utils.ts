import { supabase } from '@/src/utils/supabaseClient';

import { InputData, JobContext } from './types';

export const initialJobContext: JobContext = {
  jobsData: undefined,
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
    .insert({ ...inputData, recruiter_id })
    .select();
  return { data, error };
};

// export const readJobDbAction = async (recruiter_id: string) => {
//   const { data, error } = await supabase
//     .from('public_jobs')
//     .select('*')
//     .eq('recruiter_id', recruiter_id);
//   return { data, error };
// };

export const readJobDbAction = async () => {
  const { data, error } = await supabase.from('public_jobs').select('*');
  return { data, error };
};

export const updateJobDbAction = async (id: string, inputData: InputData) => {
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
