/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable security/detect-object-injection */
import {
  JobApplication,
  ScoreJson,
} from '@/src/context/JobApplicationsContext/types';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';
import { EmailTemplateType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
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
    min: number;
    max: number;
  };
  interview_score?: {
    min: number;
    max: number;
  };
  location?: {
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

export const candidateEmailValidity = (
  email: JobApplication['candidates']['email'],
  candidate_id: JobApplication['candidate_id'],
) => {
  const isFetching = email ? email === candidate_id : false;
  if (isFetching) {
    return {
      isFetching,
      isValidEmail: false,
    };
  }
  return {
    isFetching: false,
    isValidEmail:
      email.trim() !== '' &&
      /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g.test(
        email.trim(),
      ),
  };
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
    [id in keyof EmailTemplateType]: string;
  };

  const phoneScreening = ((phone_screening as any)?.response ??
    null) as PhoneScreeningResponseType[];

  const isNotInvited =
    (emails?.phone_screening ?? null) === null && !phoneScreening;
  const isPending =
    (emails?.phone_screening ?? null) !== null && !phoneScreening;
  const isSubmitted = !isNotInvited && !isPending;
  const elapsedTime = isPending
    ? emails?.phone_screening_resend
      ? getTimeInfo(emails.phone_screening_resend)
      : getTimeInfo(emails.phone_screening)
    : isSubmitted
      ? getTimeInfo((phone_screening as any).applied_at)
      : null;

  const timeInfo = getTimeText(elapsedTime);

  const screeningStatus = isNotInvited
    ? 'Not Invited'
    : isPending
      ? 'Invited'
      : isSubmitted
        ? 'Submitted'
        : '';

  return {
    phoneScreening,
    isNotInvited,
    isPending,
    isSubmitted,
    timeInfo,
    screeningStatus,
  };
};

const getTimeText = (hours: number) => {
  if (hours === 0) return 'Less than an hour ago';
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (years > 0) return `${years} year${years === 1 ? '' : 's'} ago`;
  else if (months > 0) return `${months} month${months === 1 ? '' : 's'} ago`;
  else if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`;
  else if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
};

export const getAssessmentStatus = (
  status_emails_sent: JobApplication['status_emails_sent'],
  assessment_results: {
    feedback: JobApplication['assessment_results']['feedback'];
    created_at: JobApplication['assessment_results']['created_at'];
  },
) => {
  const emails = (status_emails_sent ?? null) as {
    // eslint-disable-next-line no-unused-vars
    [id in keyof EmailTemplateType]: string;
  };
  const { feedback, created_at } = assessment_results;

  const safeFeedback =
    feedback && (feedback as any).length > 0 ? feedback : null;

  const isNotInvited = (emails?.interview ?? null) === null && !safeFeedback;
  const isPending = (emails?.interview ?? null) !== null && !safeFeedback;
  const isSubmitted = !isNotInvited && !isPending;
  const elapstimedTime = isPending
    ? emails?.interview_resend ?? null
      ? getTimeInfo(emails.interview_resend)
      : getTimeInfo(emails.interview)
    : isSubmitted
      ? getTimeInfo(created_at)
      : null;

  const timeInfo = getTimeText(elapstimedTime);

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
    timeInfo,
    assessmentStatus,
  };
};

export const getDisqualificationStatus = (
  status_emails_sent: JobApplication['status_emails_sent'],
) => {
  const emails = (status_emails_sent ?? null) as {
    // eslint-disable-next-line no-unused-vars
    [id in keyof EmailTemplateType]: string;
  };

  const isNotInvited = (emails?.rejection ?? null) === null;
  const isPending = false;
  const isSubmitted = !isNotInvited;
  const elapstimedTime = !isNotInvited ? getTimeInfo(emails.rejection) : null;
  const timeInfo = getTimeText(elapstimedTime);
  const disqualificationStatus = isNotInvited ? 'Email not sent' : 'Email sent';

  return {
    isNotInvited,
    isPending,
    isSubmitted,
    timeInfo,
    disqualificationStatus,
  };
};

const getTimeInfo = (timeStamp: string) => {
  if (timeStamp) {
    const currentTime = new Date().getTime();
    const incomingTime = new Date(timeStamp).getTime();
    const elapsedTime = new Date(currentTime - incomingTime).getTime();
    return Math.floor(elapsedTime / 1000 / 60 / 60);
  }
  return null;
};

export const getAllApplicationStatus = (
  status_emails_sent: JobApplication['status_emails_sent'],
  phone_screening: Parameters<typeof getScreeningStatus>[1],
  assessment_results: Parameters<typeof getAssessmentStatus>[1],
) => {
  const screeningStatus = getScreeningStatus(
    status_emails_sent,
    phone_screening,
  );
  const assessmentStatus = getAssessmentStatus(
    status_emails_sent,
    assessment_results,
  );
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
export const getCandidateDetails = (
  application: JobApplication,
  type:
    | 'location'
    | 'job_title'
    | 'name'
    | 'linkedin'
    | 'phone'
    | 'overview'
    | 'duration',
) => {
  const fallback = '---';
  let value = fallback;
  switch (type) {
    case 'job_title':
      {
        value = (application.candidate_files?.resume_json as any)?.basics
          ?.currentJobTitle
          ? capitalize(
              (application.candidate_files?.resume_json as any).basics
                .currentJobTitle,
            )
          : fallback;
      }
      break;
    case 'location':
      {
        value = (application.candidate_files?.resume_json as any)?.basics
          ?.location?.city
          ? capitalize(
              (application.candidate_files?.resume_json as any).basics.location
                .city,
            )
          : fallback;
      }
      break;
    case 'name':
      {
        const first_name = application?.candidates?.first_name ?? null;
        const last_name = application?.candidates?.last_name ?? null;
        value =
          first_name || last_name
            ? capitalize((first_name || '') + ' ' + (last_name || ''))
            : fallback;
      }
      break;
    case 'linkedin':
      {
        value =
          (application?.candidates?.linkedin ?? null) !== null &&
          application.candidates.linkedin !== ''
            ? application.candidates.linkedin
            : fallback;
      }
      break;
    case 'phone':
      {
        value =
          (application?.candidates?.phone ?? null) &&
          application.candidates.phone.trim() !== ''
            ? application.candidates.phone
            : fallback;
      }
      break;
    case 'overview':
      {
        const overview =
          (application?.candidate_files.resume_json as any)?.overview ?? null;
        value = overview && overview.trim() !== '' ? overview : fallback;
      }
      break;
    case 'duration': {
      const duration = application?.schedule?.duration ?? null;
      value = duration ? `${duration}` : fallback;
    }
  }
  return {
    valid: value !== fallback,
    value,
  };
};

export const mapScoreToAnalysis = (
  key: keyof ScoreJson['scores'],
): keyof ScoreJson['reasoning'] => {
  switch (key) {
    case 'skills':
      return 'skills';
    case 'experience':
      return 'positions';
    case 'education':
      return 'schools';
  }
};

export const analysisRatings = (score: number) => {
  if (score > 66)
    return {
      value: `High - ${score}%`,
      color: '#228F67',
      high: true,
      medium: false,
      low: false,
    };
  else if (score > 33)
    return {
      value: `Average - ${score}%`,
      color: '#ED8F1C',
      high: false,
      medium: true,
      low: false,
    };
  else
    return {
      value: `Low - ${score}%`,
      color: '#D93F4C',
      high: false,
      medium: false,
      low: true,
    };
};
