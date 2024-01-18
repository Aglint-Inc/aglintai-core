/* eslint-disable security/detect-object-injection */
import { MailService } from '@sendgrid/mail';
import { createServerClient } from '@supabase/ssr';

import {
  FilterParameter,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import { Database } from '@/src/types/schema';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';

import { JobApplicationEmails } from '.';
import {
  readNewJobApplicationDbAction,
  upsertNewJobApplicationDbAction,
} from '../read/utils';

export const readCandidates = async (
  job_id: string,
  supabase: ReturnType<typeof createServerClient<Database>>,
  status: JobApplicationSections,
  sort: SortParameter,
  search?: string,
  filter?: FilterParameter,
) => {
  const { data } = await readNewJobApplicationDbAction(
    job_id,
    supabase,
    status,
    sort,
    null,
    search,
    filter,
  );
  const candidates = data.map(
    ({
      candidates: { first_name, last_name, email },
      id,
      status_emails_sent,
    }) => ({
      first_name,
      last_name,
      email,
      application_id: id,
      status_emails_sent,
    }),
  );
  return candidates;
};

export const sendMails = (
  job: JobApplicationEmails['request']['job'],
  purpose: JobApplicationEmails['request']['purpose'],
  candidates: Awaited<ReturnType<typeof readCandidates>>,
  sgMail: MailService,
) => {
  const safeCandidatesBatch = createBatches(candidates, 20, 2000);
  safeCandidatesBatch.forEach(async (candidateBatch) => {
    Promise.allSettled(
      candidateBatch.map((candidate) =>
        sendMail(candidate, job, purpose, sgMail),
      ),
    );
  });
};

const sendMail = (
  candidate: Awaited<ReturnType<typeof readCandidates>>[number],
  job: JobApplicationEmails['request']['job'],
  purpose: JobApplicationEmails['request']['purpose'],
  sgMail: MailService,
) => {
  const emailMeta: Parameters<typeof fillEmailTemplate>[1] = {
    company_name: job.company,
    job_title: job.company,
    first_name: candidate.first_name,
    last_name: candidate.last_name,
    interview_link: `${process.env.NEXT_PUBLIC_HOST_NAME}/assessment?id=${candidate.application_id}`,
    support_link: process.env.NEXT_PUBLIC_WEBSITE,
  };
  const templates = job.email_template[purpose];
  const mail = {
    to: candidate.email,
    from: {
      name: job.company,
      email: 'messenger@aglinthq.com',
    },
    subject: fillEmailTemplate(templates.subject, emailMeta),
    html: fillEmailTemplate(templates.body, emailMeta),
  };
  sgMail.send(mail);
};

export const updateApplication = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  job: JobApplicationEmails['request']['job'],
  candidates: JobApplicationEmails['request']['candidates'],
  purpose?: JobApplicationEmails['request']['purpose'],
  destination?: JobApplicationEmails['request']['sections']['destination'],
) => {
  if (purpose || destination) {
    const updatedData = candidates.map((c) => {
      const updatedApplication = {
        id: c.application_id,
        job_id: job.id,
      };
      if (destination) updatedApplication['status'] = destination;
      if (purpose)
        updatedApplication['status_emails_sent'] = {
          ...(c.status_emails_sent as any),
          [purpose]: true,
        };
      return updatedApplication;
    });
    await upsertNewJobApplicationDbAction(updatedData, supabase);
  }
};

export const createBatches = <T>(
  payload: T[],
  count: number,
  limit?: number,
) => {
  payload = payload.slice(0, limit);
  const batches = Array.from({ length: count }, () => [] as T[]);
  return payload
    .reduce((acc, curr, i) => {
      acc[i % acc.length].push(curr);
      return acc;
    }, batches)
    .filter((f) => f.length !== 0);
};
