/* eslint-disable security/detect-object-injection */
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  ApiLogState,
  FilterParameter,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';

import { readNewJobApplicationDbAction } from './utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReadJobApplicationApi['response']>,
) => {
  const { job_id, ranges, apiStatus, sort, filter, search } =
    req.body as ReadJobApplicationApi['request'];
  if (
    !job_id ||
    // (range &&
    //   (typeof range.start !== 'number' ||
    //     range.start < 0 ||
    //     typeof range.end !== 'number' ||
    //     range.end < range.start)) ||
    (apiStatus && !Object.values(ApiLogState).includes(apiStatus))
  )
    res.status(400).send({
      data: null,
      error: { message: 'Invalid parameters' },
    } as ReadJobApplicationApi['response']);
  const promises = await createMultiPromise(
    job_id,
    apiStatus ?? null,
    ranges ?? null,
    sort ?? null,
    filter ?? null,
    search ?? null,
  );
  const responses = await Promise.allSettled([...promises]);
  const result = await handleMultiPromiseValidation(responses, ranges);
  res.status(200).send(result as ReadJobApplicationApi['response']);
};

export default handler;

// const createSinglePromise = (
//   job_id: ReadJobApplicationApi['request']['job_id'],
//   status: JobApplicationSections,
//   apiStatus?: ReadJobApplicationApi['request']['apiStatus'],
//   range?: ReadJobApplicationApi['request']['range'],
// ) => {
//   return [
//     readNewJobApplicationDbAction(job_id, status, apiStatus, range ?? null),
//   ];
// };

const createMultiPromise = (
  job_id: ReadJobApplicationApi['request']['job_id'],
  apiStatus?: ReadJobApplicationApi['request']['apiStatus'],
  ranges?: ReadJobApplicationApi['request']['ranges'],
  sort?: ReadJobApplicationApi['request']['sort'],
  filter?: ReadJobApplicationApi['request']['filter'],
  search?: ReadJobApplicationApi['request']['search'],
) => {
  return Object.entries(ranges).map(([key, value]) =>
    readNewJobApplicationDbAction(
      job_id,
      key as JobApplicationSections,
      apiStatus,
      value ?? null,
      sort,
      filter,
      search,
    ),
  );
};

const handleSinglePromiseValidation = (
  // eslint-disable-next-line no-undef
  responses: PromiseSettledResult<{
    data: JobApplication[];
    error: PostgrestError;
  }>,
  status: JobApplicationSections,
) => {
  if (responses.status === 'fulfilled')
    return {
      data: { [status]: responses.value.data },
      error: null,
    };
  return { data: null, error: { [status]: responses.reason } };
};

const handleMultiPromiseValidation = (
  // eslint-disable-next-line no-undef
  responses: PromiseSettledResult<{
    data: JobApplication[];
    error: PostgrestError;
  }>[],
  ranges: ReadJobApplicationApi['request']['ranges'],
) => {
  return Object.keys(ranges).reduce(
    (acc, curr, i) => {
      const { data, error } = handleSinglePromiseValidation(
        responses[i],
        curr as JobApplicationSections,
      );
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

export type ReadJobApplicationApi = {
  request: {
    job_id: string;
    ranges?: {
      // eslint-disable-next-line no-unused-vars
      [key in JobApplicationSections]: {
        start: number;
        end: number;
      };
    };
    apiStatus?: ApiLogState;
    sort?: SortParameter;
    filter?: FilterParameter[];
    search?: string;
  };
  response: {
    data: {
      [JobApplicationSections.NEW]?: JobApplication[];
      [JobApplicationSections.QUALIFIED]?: JobApplication[];
      [JobApplicationSections.INTERVIEWING]?: JobApplication[];
      [JobApplicationSections.DISQUALIFIED]?: JobApplication[];
    };
    error: PostgrestError;
  };
};
