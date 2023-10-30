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

  const ids = data.map((job) => job.id);

  const { data: dataCount, error: errorCount } = await supabase.rpc(
    'getjobapplications',
    {
      ids,
    },
  );

  if (errorCount) {
    return { data: undefined, error: errorCount };
  }

  const jobsWithCount = data.map((job) => {
    return {
      ...job,
      count: {
        new:
          dataCount.filter(
            (data) => data.job_id === job.id && data.status === 'new',
          )[0]?.count || 0,
        interviewing:
          dataCount.filter(
            (data) => data.job_id === job.id && data.status === 'interviewing',
          )[0]?.count || 0,
        qualified:
          dataCount.filter(
            (data) => data.job_id === job.id && data.status === 'qualified',
          )[0]?.count || 0,
        disqualified:
          dataCount.filter(
            (data) => data.job_id === job.id && data.status === 'disqualified',
          )[0]?.count || 0,
      },
    };
  });

  return { data: jobsWithCount, error };
};

export const readJobApplicationsAction = async (jobIds: string[]) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select('job_id,status,email')
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
