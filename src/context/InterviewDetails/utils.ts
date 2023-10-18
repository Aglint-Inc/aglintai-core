import { supabase } from '@/src/utils/supabaseClient';
export const getCandidateDetails = async (
  application_id: string | string[],
) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select()
    .eq('application_id', application_id);
  if (!error) {
    return data[0];
  } else {
    return [];
  }
};

export const getJobDetails = async (job_id: string | string[]) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select()
    .eq('id', job_id);
  if (!error) {
    return data[0];
  } else {
    return [];
  }
};
