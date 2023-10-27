/* eslint-disable security/detect-object-injection */
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { ApiLogState } from '@/src/components/JobApplicationsDashboard/utils';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';

import { readNewJobApplicationDbAction } from './utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReadJobApplicationApi['response']>,
) => {
  const { job_id, status, range, apiStatus } =
    req.body as ReadJobApplicationApi['request'];
  if (
    !job_id ||
    (range &&
      (typeof range.start !== 'number' ||
        range.start < 0 ||
        typeof range.end !== 'number' ||
        range.end < range.start)) ||
    (apiStatus && !Object.values(ApiLogState).includes(apiStatus))
  )
    res.status(400).send({
      data: null,
      error: { message: 'Invalid parameters' },
    } as ReadJobApplicationApi['response']);
  const promises = status
    ? createSinglePromise(job_id, status, apiStatus ?? null, range ?? null)
    : createMultiPromise(job_id, apiStatus ?? null, range ?? null);
  const responses = await Promise.allSettled([...promises]);
  const result = status
    ? handleSinglePromiseValidation(responses[0], status)
    : await handleMultiPromiseValidation(responses);
  res.status(200).send(result as ReadJobApplicationApi['response']);
};

export default handler;

const createSinglePromise = (
  job_id: ReadJobApplicationApi['request']['job_id'],
  status: ReadJobApplicationApi['request']['status'],
  apiStatus?: ReadJobApplicationApi['request']['apiStatus'],
  range?: ReadJobApplicationApi['request']['range'],
) => {
  return [
    readNewJobApplicationDbAction(job_id, status, apiStatus, range ?? null),
  ];
};

const createMultiPromise = (
  job_id: ReadJobApplicationApi['request']['job_id'],
  apiStatus?: ReadJobApplicationApi['request']['apiStatus'],
  range?: ReadJobApplicationApi['request']['range'],
) => {
  return Object.values(JobApplicationSections).map((status) =>
    readNewJobApplicationDbAction(job_id, status, apiStatus, range ?? null),
  );
};

const handleSinglePromiseValidation = (
  // eslint-disable-next-line no-undef
  responses: PromiseSettledResult<{
    data: JobApplication[];
    error: PostgrestError;
  }>,
  status: ReadJobApplicationApi['request']['status'],
) => {
  if (responses.status === 'fulfilled')
    return { data: { [status]: responses.value.data }, error: null };
  return { data: null, error: { [status]: responses.reason } };
};

const handleMultiPromiseValidation = (
  // eslint-disable-next-line no-undef
  responses: PromiseSettledResult<{
    data: JobApplication[];
    error: PostgrestError;
  }>[],
) => {
  return Object.values(JobApplicationSections).reduce(
    (acc, curr, i) => {
      const { data, error } = handleSinglePromiseValidation(responses[i], curr);
      if (data) {
        return {
          ...acc,
          data: {
            ...acc.data,
            ...data,
          },
        };
      } else if (error) {
        return {
          ...acc,
          error: {
            ...acc.error,
            ...error,
          },
        };
      }
    },
    {
      data: null,
      error: null,
    },
  ) as {
    data: {
      [JobApplicationSections.NEW]: JobApplication[];
      [JobApplicationSections.QUALIFIED]: JobApplication[];
      [JobApplicationSections.DISQUALIFIED]: JobApplication[];
      [JobApplicationSections.INTERVIEWING]: JobApplication[];
    };
    error: PostgrestError;
  };
};

export type ReadJobApplicationApi =
  | {
      request: {
        job_id: string;
        status?: null;
        range?: {
          start: number;
          end: number;
        };
        apiStatus?: ApiLogState;
      };
      response: {
        data: {
          [JobApplicationSections.NEW]: JobApplication[];
          [JobApplicationSections.QUALIFIED]: JobApplication[];
          [JobApplicationSections.INTERVIEWING]: JobApplication[];
          [JobApplicationSections.DISQUALIFIED]: JobApplication[];
        };
        error: PostgrestError | null;
      };
    }
  | {
      request: {
        job_id: string;
        status: JobApplicationSections.NEW;
        range?: {
          start: number;
          end: number;
        };
        apiStatus?: ApiLogState;
      };
      response: {
        data: {
          [JobApplicationSections.NEW]: JobApplication[];
        };
        error: PostgrestError | null;
      };
    }
  | {
      request: {
        job_id: string;
        status: JobApplicationSections.QUALIFIED;
        range?: {
          start: number;
          end: number;
        };
        apiStatus?: ApiLogState;
      };
      response: {
        data: {
          [JobApplicationSections.QUALIFIED]: JobApplication[];
        };
        error: PostgrestError;
      };
    }
  | {
      request: {
        job_id: string;
        status: JobApplicationSections.INTERVIEWING;
        range?: {
          start: number;
          end: number;
        };
        apiStatus?: ApiLogState;
      };
      response: {
        data: {
          [JobApplicationSections.INTERVIEWING]: JobApplication[];
        };
        error: PostgrestError;
      };
    }
  | {
      request: {
        job_id: string;
        status: JobApplicationSections.DISQUALIFIED;
        range?: {
          start: number;
          end: number;
        };
        apiStatus?: ApiLogState;
      };
      response: {
        data: {
          [JobApplicationSections.DISQUALIFIED]: JobApplication[];
        };
        error: PostgrestError;
      };
    };
