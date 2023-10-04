import { supabase } from '@/src/utils/supabaseClient';

import {
  InputData,
  JobApplication,
  JobApplicationContext,
  JobApplicationSectionData,
  JobApplicationSections,
} from './types';

export const initialJobApplicationsContext: JobApplicationContext = {
  applicationsData: undefined,
  job: undefined,
  handleJobApplicationCreate: undefined,
  handleJobApplicationBulkCreate: undefined,
  handleJobApplicationRead: undefined,
  handleJobApplicationUpdate: undefined,
  handleJobApplicationDelete: undefined,
  handleJobApplicationError: undefined,
  initialLoad: false,
  circularScoreAnimation: undefined,
  openImportCandidates: false,
  setOpenImportCandidates: undefined,
  openManualImportCandidates: undefined,
  setOpenManualImportCandidates: undefined,
  handleUpdateJobStatus: undefined,
};

export const createJobApplicationDbAction = async (
  job_id: string,
  inputData: Pick<
    JobApplication,
    'first_name' | 'last_name' | 'email' 
  > &
    InputData,
) => {
  const { data, error } = await supabase
    .from('job_applications')
    .insert({ ...inputData, job_id })
    .select();
  return { data, error };
};

export const bulkCreateJobApplicationDbAction = async (
  job_id: string,
  inputData: (Pick<
    JobApplication,
    'first_name' | 'last_name' | 'email' | 'score'
  > &
    InputData)[],
) => {
  const applications = inputData.map((data) => {
    return { ...data, job_id };
  });
  const { data, error } = await supabase
    .from('job_applications')
    .insert(applications)
    .select();
  return { data, error };
};

export const readJobApplicationDbAction = async (job_id: string) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('job_id', job_id);
  return { data, error };
};

export const updateJobApplicationDbAction = async (
  application_id: string,
  inputData: InputData,
) => {
  const { data, error } = await supabase
    .from('job_applications')
    .update(inputData)
    .eq('application_id', application_id)
    .select();
  return { data, error };
};

export const bulkUpdateJobApplicationDbAction = async (
  inputData: JobApplication[],
) => {
  const { error } = await supabase.from('job_applications').upsert(inputData);
  return { data: error ? false : true, error };
};

export const deleteJobApplicationDbAction = async (application_id: string) => {
  const { error } = await supabase
    .from('job_applications')
    .delete()
    .eq('application_id', application_id);
  return { data: error ? false : true, error };
};

export const getUpdatedJobStatus = (
  applicationIdSet: Set<string>,
  applications: JobApplicationSectionData,
  sections: {
    source: JobApplicationSections;
    destination: JobApplicationSections;
  },
): JobApplication[] => {
  return applications[sections.source].list.reduce(
    (acc: JobApplication[], curr) => {
      if (applicationIdSet.has(curr.application_id))
        acc.push({ ...curr, status: sections.destination });
      return acc;
    },
    [],
  );
};
