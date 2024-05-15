/* eslint-disable security/detect-object-injection */
import { Database } from '@aglint/shared-types';
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

import { handleRead } from '../../../../../apiUtils/job/jobApplications/read/utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReadJobApplicationApi['response']>,
) => {
  const supabase = createServerClient<Database>(
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
  const { sections, job_id, ranges, apiStatus, sort, filter, search } =
    req.body as ReadJobApplicationApi['request'];
  if (!job_id || (apiStatus && !Object.values(ApiLogState).includes(apiStatus)))
    res.status(400).send({
      data: null,
      error: { message: 'Invalid parameters' },
    } as ReadJobApplicationApi['response']);
  const result = await handleRead(
    sections,
    job_id,
    supabase,
    ranges,
    sort,
    filter,
    search,
  );
  res.status(200).send(result as ReadJobApplicationApi['response']);
};

export default handler;

export type ReadJobApplicationApi = {
  request: {
    job_id: string;
    sections: JobApplicationSections[];
    ranges?: {
      // eslint-disable-next-line no-unused-vars
      [key in JobApplicationSections]: {
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
      // eslint-disable-next-line no-unused-vars
      [key in JobApplicationSections]: JobApplication[];
    };
    error: PostgrestError;
    filteredCount: {
      // eslint-disable-next-line no-unused-vars
      [key in JobApplicationSections]: number;
    };
    unFilteredCount: {
      // eslint-disable-next-line no-unused-vars
      [key in JobApplicationSections]: number;
    };
  };
};
