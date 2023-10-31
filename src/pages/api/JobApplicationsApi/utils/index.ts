/* eslint-disable security/detect-object-injection */

import { ApiLogState } from '@/src/components/JobApplicationsDashboard/utils';
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

const getApiStatus = (apiStatus: ApiLogState) => {
  switch (apiStatus) {
    case ApiLogState.SUCCESS:
      return ['success'];
    case ApiLogState.FAILED:
      return ['Failed'];
    case ApiLogState.PROCESSING:
      return ['calculating', 'not started'];
  }
};

export const readNewJobApplicationDbAction = async (
  job_id: string,
  status: JobApplicationSections,
  apiStatus?: ApiLogState,
  range?: {
    start: number;
    end: number;
  } | null,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);

  let query = supabase
    .from('job_applications')
    .select('*')
    .eq('job_id', job_id)
    .eq('status', status)
    .not('email', 'is', null);

  if (range) {
    query = query.range(range.start, range.end);
  }

  if (apiStatus) {
    getApiStatus(apiStatus).map((s) => {
      query = query.contains('api_logs', {
        scoreStatus: s,
      });
    });
  }

  query = query.abortSignal(controller.signal);

  const { data, error } = await query;

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
