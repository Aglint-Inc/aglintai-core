import { supabase } from '@/src/utils/supabaseClient';

export const uploadResumeDbAction = async (
  jobId: string,
  file: any,
): Promise<{
  data: string;
  error: any;
}> => {
  const { data, error } = await supabase.storage
    .from('resume-job-post')
    .upload(`public/${jobId.toLowerCase()}`, file, {
      cacheControl: '3600',
      upsert: true,
    });
  if (data)
    return {
      data: `${
        process.env.NEXT_PUBLIC_SUPABASE_URL
      }/storage/v1/object/public/resume-job-post/${data?.path}?t=${new Date().toISOString()}`,
      error: null,
    };
  return {
    data: null,
    error: error,
  };
};

export const checkDuplicateJobApplicationDbAction = async (
  email: string,
  jobId: string,
) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select()
    .match({ email, job_id: jobId });
  if (data) {
    if (data.length !== 0) return { data: true, error: null };
    else return { data: false, error: null };
  } else return { data: undefined, error };
};
