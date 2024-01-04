/* eslint-disable security/detect-object-injection */
import { JobApplication } from '@/src/context/JobApplicationsContext/types';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';
import { supabase } from '@/src/utils/supabaseClient';

export const capitalize = (str: string) => {
  if (str) {
    const s = str.trim().replaceAll('_', ' ');
    if (s.length !== 0)
      return `${s.charAt(0).toUpperCase()}${s.slice(1, s.length)}`;
  }
  return '';
};

export const formatTimeStamp = (timeStamp: string) => {
  if (timeStamp) {
    const date = new Date(timeStamp);
    const creationDate = `${date.getDate()} ${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getFullYear()}`;
    const creationHour = date.getHours();
    const finalHour =
      creationHour % 12 === 0
        ? 12
        : creationHour % 12 < 10
        ? `0${creationHour % 12}`
        : creationHour % 12;
    const creationMinutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const creationTime = `${finalHour}:${creationMinutes} ${
      creationHour < 12 ? 'AM' : 'PM'
    }`;
    return `${creationDate}, ${creationTime}`;
  }
  return '---';
};

export type FilterParameter = {
  resume_score?: {
    active: boolean;
    min: number;
    max: number;
  };
  interview_score?: {
    active: boolean;
    min: number;
    max: number;
  };
  location?: {
    active: boolean;
    name: string;
    value: number;
  };
};

export const CANDIDATE_SORT: SortParameter['parameter'][] = [
  'resume_score',
  'interview_score',
  'full_name',
  'email',
  'applied_at',
];

export type SortParameter = {
  parameter:
    | 'resume_score'
    | 'interview_score'
    | 'full_name'
    | 'email'
    | 'applied_at';
  ascending: boolean;
};

// eslint-disable-next-line no-unused-vars
export enum ApiLogState {
  // eslint-disable-next-line no-unused-vars
  FAILED = 'failed',
  // eslint-disable-next-line no-unused-vars
  SUCCESS = 'success',
  // eslint-disable-next-line no-unused-vars
  PROCESSING = 'processing',
}

export const intactConditionFilter = (application: JobApplication) => {
  switch (application.api_status) {
    case 'failed':
      return ApiLogState.FAILED;
    case 'success':
      return ApiLogState.SUCCESS;
    default:
      return ApiLogState.PROCESSING;
  }
};

export function getInterviewScore(feedback) {
  const overAllScore = feedback
    ? feedback?.length !== 0
      ? Math.floor(
          feedback.reduce(
            (sum, entry) =>
              sum +
              Number(
                String(entry.rating).includes('/')
                  ? entry.rating.split('/')[0]
                  : entry.rating,
              ),
            0,
          ) / feedback.length,
        )
      : 0
    : 0;
  return overAllScore;
}

export const getCandidateName = (first_name: string, last_name: string) => {
  return first_name || last_name
    ? capitalize((first_name || '') + ' ' + (last_name || ''))
    : '---';
};

export const checkSyncCand = async (job: JobTypeDashboard) => {
  let is_sync = true;

  const jobReferenceData = await supabase
    .from('job_reference')
    .select('*')
    .eq('public_job_id', job.id)
    .eq('recruiter_id', job.recruiter_id);

  const applicationReferenceData = await supabase
    .from('application_reference')
    .select('*')
    .eq('ats_json->job->>id', jobReferenceData.data[0].ats_job_id)
    .eq('recruiter_id', job.recruiter_id)
    .eq('is_processed', false);

  if (applicationReferenceData.data.length === 0) {
    is_sync = false;
  }
  return is_sync;
};

export const getUpdateParameterName = (str: string) => {
  switch (str) {
    case 'interview_score':
      return 'assessment_score';
    case 'resume_score':
      return 'resume_match';
    case 'location':
      return 'city';
    default:
      return str;
  }
};
