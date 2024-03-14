/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { NextApiRequest, NextApiResponse } from 'next';

import { capitalize } from '@/src/components/JobApplicationsDashboard/utils';
import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import { type EmailTemplateType, type JobType } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

import {
  readCandidates,
  readSomeCandidates,
  sendMails,
  updateApplication,
} from './utils';
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
    const { job, purposes, applicationIds, sections, parameter } =
      req.body as JobApplicationEmails['request'];
    const errorMessages = purposes.reduce((acc, curr) => {
      if (!job?.email_template[curr])
        acc.push(
          `Missing email template for ${capitalize(curr).replace(
            'resend',
            'follow up',
          )}`,
        );
      return acc;
    }, []);
    if (errorMessages.length !== 0) {
      res.status(200).json({ confrmation: false, error: errorMessages });
      return;
    }
    if (applicationIds && applicationIds.length !== 0) {
      const { results, candidates } = await updateSomeApplications(
        supabase,
        applicationIds,
        purposes,
        sections,
        job,
        parameter,
      );
      res.status(200).send(results as ReadJobApplicationApi['response']);
      try {
        sendMails(supabase, job, purposes, candidates, sgMail);
      } catch (e) {
        //do nothing
      }
    } else {
      const { results, candidates } = await updateAllApplications(
        supabase,
        purposes,
        sections,
        job,
        parameter,
      );
      res.status(200).send(results as ReadJobApplicationApi['response']);
      try {
        sendMails(supabase, job, purposes, candidates, sgMail);
      } catch (e) {
        //do nothing
      }
    }
    return;
  } catch (e) {
    res.status(200).json({ confirmation: false, error: e.message });
    return;
  }
};

const updateSomeApplications = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  candidateIds: JobApplicationEmails['request']['applicationIds'],
  purposes: JobApplicationEmails['request']['purposes'],
  sections: JobApplicationEmails['request']['sections'],
  job: JobApplicationEmails['request']['job'],
  parameter: JobApplicationEmails['request']['parameter'],
): Promise<{
  results: Awaited<ReturnType<typeof handleRead>>;
  candidates: Awaited<ReturnType<typeof readCandidates>>;
}> => {
  const { ranges, sort, filter, search } = parameter;
  const candidates = await readSomeCandidates(supabase, candidateIds);
  await updateApplication(
    supabase,
    job,
    candidates,
    purposes,
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
  return { results, candidates };
};

const updateAllApplications = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  purposes: JobApplicationEmails['request']['purposes'],
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
    purposes,
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
  return { results, candidates };
};

export type JobApplicationEmails = {
  request: {
    job: Pick<JobType, 'company' | 'id' | 'job_title'> & {
      email_template: EmailTemplateType;
    };
    sections: {
      source: JobApplicationSections;
      destination: JobApplicationSections;
    };
    purposes: (keyof EmailTemplateType)[];
    applicationIds?: string[]; //Awaited<ReturnType<typeof readCandidates>>;
    parameter: Omit<
      ReadJobApplicationApi['request'],
      'job_id' | 'sections' | 'apiStatus'
    >;
  };
  response: ReadJobApplicationApi['response'];
};

export default handler;
