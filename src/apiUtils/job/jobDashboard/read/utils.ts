/* eslint-disable security/detect-object-injection */
import { createServerClient } from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';

import { Database } from '@/src/types/schema';

import { JobDashboardApi } from '../../../../pages/api/job/jobDashboard/read';

type Request = JobDashboardApi['request'];
type ResponseData = JobDashboardApi['response']['data'];
type ResponseError = JobDashboardApi['response']['error'];
type Supabase = ReturnType<typeof createServerClient<Database>>;
type Key = keyof ResponseData;

export const handleJobAnalytics = async (
  job_id: Request['job_id'],
  supabase: Supabase,
) => {
  const promises = createPromises(job_id, supabase);
  const responses = handlePromises(promises);
  return responses;
};

const createPromises = (
  job_id: Request['job_id'],
  supabase: Supabase,
  // eslint-disable-next-line no-unused-vars
): { [id in Key]: Promise<any> } => {
  return {
    locations: getLocationPool(job_id, supabase),
    skills: getSkillsPool(job_id, supabase),
    counts: getResumeMatch(job_id, supabase),
    sections: getJobAppStatus(job_id, supabase),
    assessments: getJobAssessments(job_id, supabase),
    tenureAndExperience: getTenureAndExperience(job_id, supabase),
  };
};

// eslint-disable-next-line no-unused-vars
export const createInvalidResponse = (): { [id in Key]: PostgrestError } => {
  const error: PostgrestError = {
    code: null,
    details: null,
    hint: null,
    message: 'Invalid paramters',
  };
  return {
    assessments: error,
    locations: error,
    skills: error,
    counts: error,
    sections: error,
    tenureAndExperience: error,
  };
};

const handlePromises = async (
  promiseObj: ReturnType<typeof createPromises>,
) => {
  const { keys, promises } = Object.entries(promiseObj).reduce(
    (acc, [key, promise]) => {
      acc.keys.push(key as any);
      acc.promises.push(promise);
      return acc;
    },
    { keys: [] as (keyof typeof promiseObj)[], promises: [] as Promise<any>[] },
  );
  const responses = await Promise.allSettled(promises);
  const results = keys.reduce(
    (acc, curr, i) => {
      const response = responses[i];
      if (response.status === 'rejected') {
        acc.error[curr] = {
          code: response.status,
          message: response.reason,
          hint: null,
          details: null,
        };
        acc.data[curr] = null;
      } else {
        acc.data[curr] = response.value;
        acc.error[curr] = null;
      }
      return acc;
    },
    { data: {} as ResponseData, error: {} as ResponseError },
  );
  return results;
};

const getSkillsPool = async (
  job_id: string,
  supabase: ReturnType<typeof createServerClient<Database>>,
) => {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 60000);
    const { data, error } = await supabase.rpc('getskillpools', {
      jobid: job_id,
    });
    if (error)
      throw new Error(`Skill pool RPC function failure: ${error.message}`);
    return data as ResponseData['skills'];
  } catch (e) {
    throw new Error(e);
  }
};

const getLocationPool = async (
  job_id: string,
  supabase: ReturnType<typeof createServerClient<Database>>,
) => {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 60000);
    const { data, error } = await supabase.rpc('getlocationspool', {
      jobid: job_id,
    });
    if (error)
      throw new Error(
        `Location pool RPC function failure: ${error.message}, ${error.details}, ${error.hint}`,
      );
    return data as ResponseData['locations'];
  } catch (e) {
    throw new Error(e);
  }
};

const getTenureAndExperience = async (
  job_id: string,
  supabase: ReturnType<typeof createServerClient<Database>>,
) => {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 60000);
    const { data, error } = await supabase.rpc('getexperienceandtenure', {
      jobid: job_id,
    });
    if (error)
      throw new Error(
        `Tenure and experience RPC function failure: ${error.message}, ${error.details}, ${error.hint}`,
      );
    return data as ResponseData['tenureAndExperience'];
  } catch (e) {
    throw new Error(e);
  }
};

export const getJobAssessments = async (
  job_id: string,
  supabase: ReturnType<typeof createServerClient<Database>>,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { data, error } = await supabase
    .rpc('getjobassessments', {
      jobid: job_id,
    })
    .abortSignal(controller.signal);
  if (error)
    throw new Error(`Assessment RPC function failure : ${error.message}`);
  return data;
};

export const getResumeMatch = async (
  job_id: string,
  supabase: ReturnType<typeof createServerClient<Database>>,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { data, error } = await supabase
    .rpc('getallresumematches', {
      jobid: job_id,
      topmatch: 80,
      goodmatch: 60,
      averagematch: 40,
      poormatch: 20,
    })
    .abortSignal(controller.signal);
  if (error)
    throw new Error(`Resume match RPC function failure : ${error.message}`);
  const safeData = resumeMatchRPCFormatter(data);
  return safeData;
};

export const getJobAppStatus = async (
  job_id: string,
  supabase: ReturnType<typeof createServerClient<Database>>,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { data, error } = await supabase
    .rpc('getsectioncounts', {
      jobid: job_id,
    })
    .abortSignal(controller.signal);
  if (error)
    throw new Error(`Job app status RPC function failure : ${error.message}`);
  return data;
};

export const resumeMatchRPCFormatter = (
  unsafeData: Database['public']['Functions']['getresumematches']['Returns'],
) => {
  const initialData = {
    matches: unsafeData,
    total: 0,
  };
  return Object.values(unsafeData).reduce((acc, curr) => {
    acc.total += curr;
    return acc;
  }, initialData) as typeof initialData;
};
