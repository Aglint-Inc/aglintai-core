/* eslint-disable security/detect-object-injection */
import { supabase } from '@/src/utils/supabase/client';

import { JobApplicationSections } from '../JobApplicationsContext/types';

export const initialJobContext = {
  jobsData: { applications: undefined, jobs: undefined },
  handleJobRead: undefined,
  handleJobUpdate: undefined,
  handleJobDelete: undefined,
  handleJobError: undefined,
  handleGetJob: undefined,
  initialLoad: false,
  handleUIJobUpdate: undefined,
};

export const readJobDbAction = async (recruiter_id: string) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select('*, assessment_job_relation(assessment(*))')
    .order('created_at', { ascending: false })
    .eq('recruiter_id', recruiter_id);

  const ids = data?.map((job) => job.id);

  const { data: d1, error: e1 } = await jobApplicationCountDbAction(ids);

  if (e1) {
    return { data: undefined, error: e1 };
  }

  const jobsWithCount = data.map((job) => {
    return {
      ...job,
      count: Object.entries(d1[job.id]).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {},
      ),
    };
  });

  return { data: jobsWithCount, error };
};

const jobApplicationCountDbAction = async (ids: string[]) => {
  const { data, error } = await supabase.rpc('getjobapplications', { ids });
  return {
    data: data
      ? data.reduce(
          (acc, curr) => {
            return {
              ...acc,
              [curr.job_id]: {
                ...acc[curr.job_id],
                [curr.status]: curr.count,
              },
            };
          },
          {
            ...ids.reduce(
              (acc, curr) => {
                return {
                  ...acc,
                  [curr]: {
                    ...Object.assign(
                      {},
                      ...Object.values(JobApplicationSections).map((j) => {
                        return { [j]: 0 };
                      }),
                    ),
                  },
                };
              },
              {} as {
                // eslint-disable-next-line no-unused-vars
                [id: string]: { [key in JobApplicationSections]: number };
              },
            ),
          } as {
            // eslint-disable-next-line no-unused-vars
            [id: string]: { [key in JobApplicationSections]: number };
          },
        )
      : null,
    error,
  };
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
