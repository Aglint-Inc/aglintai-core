/* eslint-disable security/detect-object-injection */

import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { supabase } from '@/src/utils/supabaseClient';

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
