import { supabase } from '@/src/utils/supabaseClient';
export const getCandidateDetails = async (
  application_id: string | string[],
) => {
  const { data: application, error: application_error } = await supabase
    .from('applications')
    .select()
    .eq('id', application_id);
  if (!application_error) {
    const { data: result } = await supabase
      .from('assessment_results')
      .select()
      .eq('application_id', application_id);

    return { ...application[0], ...result[0] };
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
