/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize
} from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import { Assessment } from '@/src/queries/assessment/types';
import { Database } from '@/src/types/schema';

import {
  createInvalidResponse,
  getResumeMatch,
  handleJobAnalytics
} from './utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<JobDashboardApi['response']>
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
        }
      }
    }
  );
  const { job_id } = req.body as JobDashboardApi['request'];
  if (!job_id)
    res.status(200).send({
      data: null,
      error: createInvalidResponse()
    });
  const result = await handleJobAnalytics(job_id, supabase);
  res.status(200).send(result);
};

export default handler;

export type JobDashboardApi = {
  request: {
    job_id: string;
  };
  response: {
    data: ResponseDataPayload;
    error: {
      // eslint-disable-next-line no-unused-vars
      [key in keyof ResponseDataPayload]: PostgrestError;
    };
  };
};

type ResponseDataPayload = {
  assessments: Assessment[];
  skills: {
    top_skills: {
      [id: string]: number;
    };
    required_skills: {
      [id: string]: number;
    };
  };
  locations: {
    city: {
      [id: string]: number;
    };
    state: {
      [id: string]: number;
    };
    country: {
      [id: string]: number;
    };
  };
  counts: Omit<Awaited<ReturnType<typeof getResumeMatch>>, 'matches'> & {
    matches: {
      // eslint-disable-next-line no-unused-vars
      [id in Matches]: number;
    };
  };
  tenureAndExperience: {
    tenure: { [id: number]: number };
    experience: { [id: number]: number };
    average_tenure: number;
    average_experience: number;
  };
  // eslint-disable-next-line no-unused-vars
  sections: { [id in JobApplicationSections]: number };
};

type Matches =
  | 'averageMatch'
  | 'goodMatch'
  | 'noMatch'
  | 'poorMatch'
  | 'topMatch'
  | 'unknownMatch';
