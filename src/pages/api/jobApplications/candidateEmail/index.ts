/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { NextApiRequest, NextApiResponse } from 'next';

import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import { type EmailTemplateType, type JobType } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

import { readCandidates, updateApplication } from './utils';
import { type ReadJobApplicationApi } from '../read';
import { handleRead } from '../read/utils';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    const { job, purpose, candidates, sections, parameter } =
      req.body as JobApplicationEmails['request'];
    if (candidates && candidates.length !== 0) {
      const results = await updateSomeApplications(
        supabase,
        candidates,
        purpose,
        sections,
        job,
        parameter,
      );
      // sendMails(job, purpose, candidates, sgMail);
      res.status(200).send(results as ReadJobApplicationApi['response']);
    } else {
      const results = await updateAllApplications(
        supabase,
        purpose,
        sections,
        job,
        parameter,
      );
      // sendMails(job, purpose, candidates, sgMail);
      res.status(200).send(results as ReadJobApplicationApi['response']);
    }
    return;
  } catch (e) {
    res.status(200).json({ confirmation: false, error: e.message });
    return;
  }
};

const updateSomeApplications = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  candidates: JobApplicationEmails['request']['candidates'],
  purpose: JobApplicationEmails['request']['purpose'],
  sections: JobApplicationEmails['request']['sections'],
  job: JobApplicationEmails['request']['job'],
  parameter: JobApplicationEmails['request']['parameter'],
) => {
  const { ranges, sort, filter, search } = parameter;
  await updateApplication(
    supabase,
    job,
    candidates,
    purpose,
    sections.destination,
  );
  const results = await handleRead(
    [sections.source, sections.destination],
    job.id,
    supabase,
    ranges,
    sort,
    filter,
    search,
  );
  return results;
};

const updateAllApplications = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  purpose: JobApplicationEmails['request']['purpose'],
  sections: JobApplicationEmails['request']['sections'],
  job: JobApplicationEmails['request']['job'],
  parameter: JobApplicationEmails['request']['parameter'],
) => {
  const { ranges, sort, filter, search } = parameter;
  const candidates = await readCandidates(
    job.id,
    supabase,
    sections.source,
    sort,
    search,
    filter,
  );
  await updateApplication(
    supabase,
    job,
    candidates,
    purpose,
    sections.destination,
  );
  const results = await handleRead(
    [sections.source, sections.destination],
    job.id,
    supabase,
    ranges,
    sort,
    filter,
    search,
  );
  return results;
};

export type JobApplicationEmails = {
  request: {
    job: Pick<JobType, 'company' | 'id'> & {
      email_template: EmailTemplateType;
    };
    sections: {
      source: JobApplicationSections;
      destination: JobApplicationSections;
    };
    purpose?: keyof EmailTemplateType;
    candidates?: Awaited<ReturnType<typeof readCandidates>>;
    parameter: Omit<
      ReadJobApplicationApi['request'],
      'job_id' | 'sections' | 'apiStatus'
    >;
  };
  response: ReadJobApplicationApi['response'];
};

export default handler;
