/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { NextApiRequest, NextApiResponse } from 'next';

import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';

import { type ReadJobApplicationApi } from '../read';
import {
  deleteApplications,
  readAllApplications,
  readApplications,
} from './utils';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
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
    const { applications, parameter, section, jobId, clearCandidate } =
      req.body as JobApplicationDelete['request'];
    if (applications && applications.length !== 0) {
      // deleteApplications, readFilteredApplications
      await deleteApplications(supabase, applications, clearCandidate);
      const result = await readApplications(
        supabase,
        jobId,
        section,
        parameter,
      );
      res.status(200).send(result as ReadJobApplicationApi['response']);
    } else {
      // readApplicationsThroughFilter, deleteSomeApplication
      const applications = await readAllApplications(
        supabase,
        jobId,
        section,
        parameter,
      );
      await deleteApplications(supabase, applications, clearCandidate);
      const result = await readApplications(
        supabase,
        jobId,
        section,
        parameter,
      );
      res.status(200).send(result as ReadJobApplicationApi['response']);
    }
  } catch (e) {
    res.status(200).json({ confirmation: false, error: e.message });
    return;
  }
};

export type JobApplicationDelete = {
  request: {
    jobId: string;
    section: JobApplicationSections;
    applications?: Awaited<ReturnType<typeof readAllApplications>>;
    clearCandidate: boolean;
    parameter: Omit<
      ReadJobApplicationApi['request'],
      'sections' | 'apiStatus' | 'job_id'
    >;
  };
  response: ReadJobApplicationApi['response'];
};

export default handler;
