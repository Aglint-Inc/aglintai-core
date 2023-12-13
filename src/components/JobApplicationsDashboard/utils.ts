/* eslint-disable security/detect-object-injection */
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

export const capitalize = (str: string) => {
  if (str) {
    const s = str.trim().replaceAll('_', ' ');
    if (s.length !== 0)
      return `${s.charAt(0).toUpperCase()}${s.slice(1, s.length)}`;
  }
  return '';
};

export const formatTimeStamp = (timeStamp: string) => {
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
};

interface NumberFilterParameter {
  type: 'number';
  parameter: 'resume_score' | 'interview_score';
  condition: '=' | '<>' | '<' | '<=' | '>' | '>=';
  value: number;
}
interface StringFilterParameter {
  type: 'string';
  parameter: 'location';
  condition: '=' | '<>' | '<' | '<=' | '>' | '>=';
  value: string;
}
export type FilterParameter = NumberFilterParameter | StringFilterParameter;

export const CANDIDATE_FILTERS: {
  parameters: FilterParameter['parameter'][];
  conditions: FilterParameter['condition'][];
} = {
  parameters: ['resume_score', 'interview_score', 'location'],
  conditions: ['=', '<>', '>', '<', '>=', '<='],
};

export const CANDIDATE_SORT: SortParameter['parameter'][] = [
  'resume_score',
  'interview_score',
  'first_name',
  'email',
  'created_at',
];

export type SortParameter = {
  parameter:
    | 'resume_score'
    | 'interview_score'
    | 'first_name'
    | 'email'
    | 'created_at';
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
