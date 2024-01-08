/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
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

import { newReadNewJobApplicationDbAction } from './utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReadJobApplicationApi['response']>,
) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    },
  );

  const { job_id, ranges, apiStatus, sort, filter, search } =
    req.body as ReadJobApplicationApi['request'];
  if (!job_id || (apiStatus && !Object.values(ApiLogState).includes(apiStatus)))
    res.status(400).send({
      data: null,
      error: { message: 'Invalid parameters' },
    } as ReadJobApplicationApi['response']);
  const promises = await createMultiPromise(
    job_id,
    supabase,
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

const createMultiPromise = (
  job_id: ReadJobApplicationApi['request']['job_id'],
  supabase: any,
  ranges?: ReadJobApplicationApi['request']['ranges'],
  sort?: ReadJobApplicationApi['request']['sort'],
  filter?: ReadJobApplicationApi['request']['filter'],
  search?: ReadJobApplicationApi['request']['search'],
) => {
  return Object.entries(ranges).map(([key, value]) =>
    newReadNewJobApplicationDbAction(
      job_id,
      supabase,
      key as JobApplicationSections,
      sort,
      value ?? null,
      search,
      filter,
    ),
  );
};

const handleSinglePromiseValidation = (
  // eslint-disable-next-line no-undef
  responses: PromiseSettledResult<{
    data: JobApplication[];
    error: PostgrestError;
    count: number;
  }>,
  status: JobApplicationSections,
) => {
  if (responses.status === 'fulfilled')
    return {
      data: { [status]: responses.value.data },
      error: null,
      count: { [status]: responses.value.count },
    };
  return { data: null, error: { [status]: responses.reason }, count: null };
};

const handleMultiPromiseValidation = (
  // eslint-disable-next-line no-undef
  responses: PromiseSettledResult<{
    data: JobApplication[];
    error: PostgrestError;
    count: number;
  }>[],
  ranges: ReadJobApplicationApi['request']['ranges'],
) => {
  return Object.keys(ranges).reduce(
    (acc, curr, i) => {
      const { data, error, count } = handleSinglePromiseValidation(
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
          count: {
            ...acc.count,
            ...count,
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
      count: null,
    },
  ) as {
    data: {
      [JobApplicationSections.NEW]: JobApplication[];
      [JobApplicationSections.QUALIFIED]: JobApplication[];
      [JobApplicationSections.DISQUALIFIED]: JobApplication[];
      [JobApplicationSections.ASSESSMENT]: JobApplication[];
    };
    error: PostgrestError;
    count: {
      [JobApplicationSections.NEW]: number;
      [JobApplicationSections.QUALIFIED]: number;
      [JobApplicationSections.DISQUALIFIED]: number;
      [JobApplicationSections.ASSESSMENT]: number;
    };
  };
};

export type ReadJobApplicationApi = {
  request: {
    job_id: string;
    ranges?: {
      // eslint-disable-next-line no-unused-vars
      [JobApplicationSections.NEW]: {
        start: number;
        end: number;
      };
      [JobApplicationSections.ASSESSMENT]?: {
        start: number;
        end: number;
      };
      [JobApplicationSections.QUALIFIED]: {
        start: number;
        end: number;
      };
      [JobApplicationSections.DISQUALIFIED]: {
        start: number;
        end: number;
      };
    };
    apiStatus?: ApiLogState;
    sort?: SortParameter;
    filter?: FilterParameter;
    search?: string;
  };
  response: {
    data: {
      [JobApplicationSections.NEW]?: JobApplication[];
      [JobApplicationSections.QUALIFIED]?: JobApplication[];
      [JobApplicationSections.ASSESSMENT]?: JobApplication[];
      [JobApplicationSections.DISQUALIFIED]?: JobApplication[];
    };
    error: PostgrestError;
    count: {
      [JobApplicationSections.NEW]?: number;
      [JobApplicationSections.QUALIFIED]?: number;
      [JobApplicationSections.DISQUALIFIED]?: number;
      [JobApplicationSections.ASSESSMENT]?: number;
    };
  };
};
