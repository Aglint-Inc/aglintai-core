/* eslint-disable security/detect-object-injection */
// import { FilterParameter } from '@/src/components/JobApplicationsDashboard/utils';

import { Database } from '@aglint/shared-types';
import {
  Applications,
  ApplicationsInsert,
  ApplicationsUpdate,
} from '@aglint/shared-types';

import { selectJobApplicationQuery } from '@/src/apiUtils/job/jobApplications/read/utils';
import { Job } from '@/src/queries/job/types';
import { supabase } from '@/src/utils/supabase/client';

import {
  JobApplicationContext,
  JobApplicationsData,
  JobApplicationSections,
} from './types';

export const uploadResumeDbAction = async (
  candidateId: string,
  jobId: string,
  file: any,
): Promise<{
  data: string;
  error: any;
}> => {
  const ext = file.name.slice(file.name.lastIndexOf('.'));
  const { data, error } = await supabase.storage
    .from('resume-job-post')
    .upload(`public/${candidateId}/${jobId}${ext ?? '.pdf'}`, file, {
      cacheControl: '3600',
      contentType: file.type,
    });
  if (data)
    return {
      data: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resume-job-post/${data?.path}`,
      error: null,
    };
  return {
    data: null,
    error: error,
  };
};

export const deleteResumeDbAction = async (
  candidateId: string,
  jobId: string,
  file: any,
) => {
  const { error } = await supabase.storage
    .from('resume-job-post')
    .remove([
      `public/${candidateId}/${jobId}.${
        file.name.split(file.name.lastIndexOf('.'))[1]
      }`,
    ]);
  return { data: error ? false : true, error };
};

export const updateCandidateDbAction = async (
  candidate: Database['public']['Tables']['candidates']['Update'],
  signal?: AbortSignal,
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('candidates')
    .update({ ...candidate })
    .select(`${selectJobApplicationQuery}`)
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data, error };
};

export const deleteCandidateDbAction = async (
  candidateId: string,
  signal?: AbortSignal,
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { error } = await supabase
    .from('candidates')
    .delete()
    .eq('id', candidateId)
    .abortSignal(signal)
    .abortSignal(timerSignal.signal);
  clearTimeout(timeout);
  return { data: error ? false : true, error };
};

export const bulkCreateJobApplicationDbAction = async (
  job_id: string,
  inputData: ApplicationsInsert[],
  signal?: AbortSignal,
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const applications = inputData.map((data) => {
    return { ...data, job_id };
  });
  const { data, error } = await supabase
    .from('applications')
    .insert(applications)
    .select(`${selectJobApplicationQuery}`)
    .abortSignal(signal);
  clearTimeout(timeout);
  return { data, error };
};

export const readJobApplicationDbAction = async (
  job_id: string,
  signal?: AbortSignal,
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { data, error } = await supabase
    .from('applications')
    .select(`${selectJobApplicationQuery}`)
    .eq('job_id', job_id)
    .abortSignal(signal);
  clearTimeout(timeout);
  return { data, error };
};

export const updateJobApplicationDbAction = async (
  application_id: string,
  inputData: ApplicationsUpdate,
  signal?: AbortSignal,
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { error } = await supabase
    .from('applications')
    .update(inputData)
    .eq('id', application_id)
    .abortSignal(signal);
  clearTimeout(timeout);
  return { error };
};

export const bulkUpdateJobApplicationDbAction = async (
  inputData: Applications[],
  signal?: AbortSignal,
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { error } = await supabase
    .from('applications')
    .update(inputData[0])
    .abortSignal(signal);
  clearTimeout(timeout);
  return { data: error ? false : true, error };
};

export const rescoreDbAction = async (
  job_id: Job['id'],
  signal?: AbortSignal,
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { error } = await supabase
    .from('applications')
    .update({
      processing_status: 'not started',
      overall_score: -1,
      score_json: null,
    })
    .eq('job_id', job_id)
    .abortSignal(signal);
  clearTimeout(timeout);
  return { data: error ? false : true, error };
};

export const recalculateDbAction = async (
  job_id: Job['id'],
  signal?: AbortSignal,
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { error } = await supabase
    .rpc('update_resume_score', { job_id })
    .abortSignal(signal);
  clearTimeout(timeout);
  return { data: error ? false : true, error };
};

export const deleteJobApplicationDbAction = async (
  application_id: string,
  signal?: AbortSignal,
) => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('application_id', application_id)
    .abortSignal(signal);
  clearTimeout(timeout);
  return { data: error ? false : true, error };
};

export const getUpdatedJobStatus = (
  applicationIdSet: Set<string>,
  applications: JobApplicationsData,
  sections: {
    source: JobApplicationSections;
    destination: JobApplicationSections;
  },
): Applications[] => {
  return applications[sections.source].reduce(
    (
      acc: Applications[],
      // eslint-disable-next-line no-unused-vars
      { candidates, assessment_results, candidate_files, ...curr },
    ) => {
      if (applicationIdSet.has(curr.id))
        acc.push({ ...curr, status: sections.destination });
      return acc;
    },
    [],
  );
};

export const getRange = (
  pageNumber: number,
  paginationLimit: JobApplicationContext['paginationLimit'],
) => {
  return {
    start: (pageNumber - 1) * paginationLimit,
    end: pageNumber * paginationLimit - 1,
  };
};

export type Tables = Database['public']['Tables'];

export type Columns<T extends keyof Tables> = keyof Tables[T]['Row'];

type Relationships<T extends keyof Tables> =
  Tables[T]['Relationships'][number]['referencedRelation'];

export const application_relationships: Relationships<'applications'>[] = [
  'assessment_results',
  'candidate_files',
  'candidates',
  'public_jobs',
];

export const universalUpdateDbAction = async <
  T extends keyof Tables,
  I extends Tables[T]['Update'],
>(
  table: T,
  input: I,
  id: string,
  signal?: AbortSignal,
): Promise<boolean> => {
  const timerSignal = new AbortController();
  const timeout = setTimeout(() => timerSignal.abort(), 60000);
  const { error } = await supabase
    .from(table)
    .update(input as any)
    .eq(`id`, id)
    .abortSignal(signal);
  clearTimeout(timeout);
  return error ? false : true;
};

// export const updateAllJobStatusDbAction = async (
//   jobId: string,
//   sections: {
//     source: JobApplicationSections;
//     destination: JobApplicationSections;
//   },
//   search?: string,
//   filter?: FilterParameter[],
//   signal?: AbortSignal,
// ) => {
//   const timerSignal = new AbortController();
//   const timeout = setTimeout(() => timerSignal.abort(), 60000);
//   let query = supabase
//     .from('job_applications')
//     .update({ status: sections.destination })
//     .eq('job_id', jobId)
//     .eq('status', sections.source);

//   if (filter && filter.length > 0) {
//     query = getFilteredQuery(query, filter, sections.source);
//   }

//   if (search) {
//     query = query.or(
//       `email.ilike.%${search}%,or(first_name.ilike.%${search}%),or(last_name.ilike.%${search}%)`,
//       { foreignTable: 'candidates' },
//     );
//   }

//   query = query.abortSignal(signal);

//   const { error } = await query;
//   clearTimeout(timeout);
//   return { data: error ? false : true, error };
// };
