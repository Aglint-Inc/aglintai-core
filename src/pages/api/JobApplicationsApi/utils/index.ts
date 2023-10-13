/* eslint-disable security/detect-object-injection */
import { PostgrestError } from '@supabase/supabase-js';

import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { supabase } from '@/src/utils/supabaseClient';

export type GetJobApplicationCountResponse = {
  data: {
    [job_id: string]: {
      [JobApplicationSections.NEW]: number;
      [JobApplicationSections.QUALIFIED]: number;
      [JobApplicationSections.INTERVIEWING]: number;
      [JobApplicationSections.DISQUALIFIED]: number;
    };
  };
  error: PostgrestError;
};

export const getJobApplicationCount = async (
  ids: string[],
): Promise<GetJobApplicationCountResponse> => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { data, error } = await supabase
    .rpc('getjobapplications', {
      ids,
    })
    .abortSignal(controller.signal);
  if (data) {
    const scoreObj = Object.values(JobApplicationSections).reduce(
      (acc, curr) => {
        acc[curr] = 0;
        return acc;
      },
      {},
    );
    const result = data.reduce((acc, curr) => {
      acc[curr.job_id] = {
        ...scoreObj,
        ...acc[curr.job_id],
        [curr.status]: curr.count,
      };
      return acc;
    }, {});
    return { data: result, error: null };
  } else if (error) {
    return { data: null, error };
  }
};

export const deleteNewJobApplicationDbAction = async (
  application_id: string,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { error } = await supabase
    .from('job_applications')
    .delete()
    .eq('application_id', application_id)
    .abortSignal(controller.signal);
  return { data: error ? false : true, error };
};

export const readNewJobApplicationDbAction = async (
  job_id: string,
  status: JobApplicationSections,
  readFrom?: number,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const start = readFrom ?? 0;
  const end = start + 99;
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('job_id', job_id)
    .eq('status', status)
    .range(start, end)
    .abortSignal(controller.signal);
  return { data, error };
};

export const upsertNewJobApplicationDbAction = async (
  inputData: Partial<JobApplication>[],
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { data, error } = await supabase
    .from('job_applications')
    .upsert(inputData as JobApplication[])
    .select()
    .abortSignal(controller.signal);
  return { data, error };
};
