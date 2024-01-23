/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable security/detect-object-injection */
import {
  JobApplication,
  ScoreJson,
} from '@/src/context/JobApplicationsContext/types';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';
import { EmailTemplateType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { PhoneScreeningResponseType } from '../KnockOffQns/ScreeningCtxProvider';

export const handleOngoingWarning = () => {
  toast.warning('Please wait untill the ongoing process has finished');
};

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
  overall_score?: {
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
  'overall_score',
  'interview_score',
  'full_name',
  'applied_at',
];

export type SortParameter = {
  parameter: 'overall_score' | 'interview_score' | 'full_name' | 'applied_at';
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

export type ApplicantionProcessState =
  | 'unavailable'
  | 'fetching'
  | 'processing'
  | 'unparsable'
  | 'processed';

export const processingFilter = (application: JobApplication) => {
  switch (application?.processing_status) {
    case 'failed':
      return ApiLogState.FAILED;
    case 'success':
      return ApiLogState.SUCCESS;
    default:
      return ApiLogState.PROCESSING;
  }
};

export const getApplicationProcessState = (
  application: JobApplication,
): ApplicantionProcessState => {
  if (
    application?.candidate_files?.resume_json ||
    application?.candidate_files?.file_url
  ) {
    if (!application?.is_resume_fetching) {
      if (processingFilter(application) !== ApiLogState.PROCESSING) {
        if (application?.score_json) return 'processed';
        return 'unparsable';
      }
      return 'processing';
    }
    return 'fetching';
  }
  return 'unavailable';
};

export const candidateEmailValidity = (application: JobApplication) => {
  const value = application?.candidates?.email;
  return (
    value &&
    value !== application.candidate_id &&
    value.trim() !== '' &&
    /^\w+([\.-]?\w+)*((\+)?\w+([\.-]?\w+)*)?@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      value.trim(),
    )
  );
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
    case 'overall_score':
      return 'resume_match';
    case 'location':
      return 'city';
    case 'full_name':
      return 'candidate';
    case 'applied_at':
      return 'applied_date';
    default:
      return str;
  }
};

export const getScreeningStatus = (
  status_emails_sent: JobApplication['status_emails_sent'],
  phone_screening: JobApplication['phone_screening'],
) => {
  const emails = (status_emails_sent ?? null) as {
    // eslint-disable-next-line no-unused-vars
    [id in keyof EmailTemplateType]: boolean;
  };

  const phoneScreening = ((phone_screening as any)?.response ??
    null) as PhoneScreeningResponseType[];

  const isNotInvited = (emails?.phone_screening ?? false) === false;
  const isPending =
    (emails?.phone_screening ?? false) === true && !phoneScreening;
  const isSubmitted = !isNotInvited && !isPending;

  const screeningStatus = isNotInvited
    ? 'Not Invited'
    : isPending
      ? 'Pending'
      : isSubmitted
        ? 'Submitted'
        : '';

  return {
    phoneScreening,
    isNotInvited,
    isPending,
    isSubmitted,
    screeningStatus,
  };
};

export const getAssessmentStatus = (
  status_emails_sent: JobApplication['status_emails_sent'],
  feedback: JobApplication['assessment_results']['feedback'],
) => {
  const emails = (status_emails_sent ?? null) as {
    // eslint-disable-next-line no-unused-vars
    [id in keyof EmailTemplateType]: boolean;
  };

  const safeFeedback =
    feedback && (feedback as any).length > 0 ? feedback : null;

  const isNotInvited = (emails?.interview ?? false) === false;
  const isPending = (emails?.interview ?? false) === true && !safeFeedback;
  const isSubmitted = !isNotInvited && !isPending;

  const assessmentStatus = isNotInvited
    ? 'Not Invited'
    : isPending
      ? 'Invited'
      : isSubmitted
        ? 'Submitted'
        : '';

  return {
    feedback: safeFeedback,
    isNotInvited,
    isPending,
    isSubmitted,
    assessmentStatus,
  };
};

export const getDisqualificationStatus = (
  status_emails_sent: JobApplication['status_emails_sent'],
) => {
  const emails = (status_emails_sent ?? null) as {
    // eslint-disable-next-line no-unused-vars
    [id in keyof EmailTemplateType]: boolean;
  };

  const isNotInvited = (emails?.rejection ?? false) === false;
  const isPending = false;
  const isSubmitted = false;

  return {
    isNotInvited,
    isPending,
    isSubmitted,
  };
};

export const getAllApplicationStatus = (
  status_emails_sent: JobApplication['status_emails_sent'],
  phone_screening: JobApplication['phone_screening'],
  feedback: JobApplication['assessment_results']['feedback'],
) => {
  const screeningStatus = getScreeningStatus(
    status_emails_sent,
    phone_screening,
  );
  const assessmentStatus = getAssessmentStatus(status_emails_sent, feedback);
  const disqualificationStatus = getDisqualificationStatus(status_emails_sent);
  return { screeningStatus, assessmentStatus, disqualificationStatus };
};

export const getReasonings = (reasoning: ScoreJson['reasoning']) => {
  const order: Array<keyof ScoreJson['reasoning']> = [
    'positions',
    'skills',
    'schools',
  ];
  return reasoning
    ? order.reduce((acc, curr) => {
        if (reasoning[curr]) acc += `${capitalize(reasoning[curr])} `;
        return acc;
      }, '')
    : null;
};
