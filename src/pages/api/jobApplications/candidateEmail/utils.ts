/* eslint-disable security/detect-object-injection */
import { MailService } from '@sendgrid/mail';
import { createServerClient } from '@supabase/ssr';

import {
  candidateEmailValidity,
  FilterParameter,
  getAllApplicationStatus,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { EmailTemplateType } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';

import { JobApplicationEmails } from '.';
import {
  readNewJobApplicationDbAction,
  upsertNewJobApplicationDbAction,
} from '../read/utils';

export const readSomeCandidates = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  applicationIds: JobApplicationEmails['request']['applicationIds'],
) => {
  const { data, error } = await supabase
    .from('applications')
    .select(
      'id, status_emails_sent, phone_screening, candidate_id,  candidates (first_name, last_name, email), assessment_results!assessment_results_application_id_fkey(feedback, created_at)',
    )
    .in('id', applicationIds);
  if (error) throw new Error(error.message);
  const candidates = data.map(
    ({
      candidates: { first_name, last_name, email },
      assessment_results,
      id,
      status_emails_sent,
      phone_screening,
      candidate_id,
    }) => ({
      first_name,
      last_name,
      email,
      candidate_id,
      application_id: id,
      status_emails_sent,
      phone_screening,
      assessment_results: {
        feedback: (assessment_results[0]?.feedback ??
          null) as JobApplication['assessment_results']['feedback'],
        created_at: (assessment_results[0]?.created_at ??
          null) as JobApplication['assessment_results']['created_at'],
      },
    }),
  );
  return candidates;
};

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
      assessment_results,
      id,
      status_emails_sent,
      phone_screening,
      candidate_id,
    }) => ({
      first_name,
      last_name,
      email,
      application_id: id,
      status_emails_sent,
      phone_screening,
      candidate_id,
      assessment_results: {
        feedback: (assessment_results?.feedback ??
          null) as JobApplication['assessment_results']['feedback'],
        created_at: (assessment_results?.created_at ??
          null) as JobApplication['assessment_results']['created_at'],
      },
    }),
  );
  return candidates;
};

type Candidates = Awaited<ReturnType<typeof readCandidates>>;

export const sendMails = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  job: JobApplicationEmails['request']['job'],
  purposes: JobApplicationEmails['request']['purposes'],
  candidates: Awaited<ReturnType<typeof readCandidates>>,
  sgMail: MailService,
) => {
  const safeCandidates = candidates.reduce((acc, curr) => {
    const safePurposes = Object.keys(
      getUpdateEmailStatus(purposes, curr),
    ) as (keyof EmailTemplateType)[];
    if (safePurposes.length !== 0) {
      safePurposes.forEach((purpose) => {
        if (job.email_template[purpose]) acc.push({ ...curr, purpose });
      });
    }
    return acc;
  }, []) as (Candidates[number] & {
    purpose: keyof EmailTemplateType;
  })[];
  const responses = await Promise.allSettled(
    safeCandidates.map((candidate) => sendMail(candidate, job, sgMail)),
  );
  const failedResponses = responses.reduce((acc, curr, i) => {
    if (curr.status === 'rejected') acc.push(candidates[i]);
    return acc;
  }, []);
  if (failedResponses.length !== 0)
    rerollEmailUpdates(supabase, job, failedResponses);
};

const rerollEmailUpdates = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  job: JobApplicationEmails['request']['job'],
  candidates: Awaited<ReturnType<typeof readCandidates>>,
) => {
  const updatedData = candidates.map((c) => {
    const updatedApplication = {
      id: c.application_id,
      job_id: job.id,
    };
    updatedApplication['status_emails_sent'] = {
      ...(c.status_emails_sent as any),
    };
    return updatedApplication;
  });
  upsertNewJobApplicationDbAction(updatedData, supabase);
};

const sendMail = async (
  candidate: Candidates[number] & {
    purpose: keyof EmailTemplateType;
  },
  job: JobApplicationEmails['request']['job'],
  sgMail: MailService,
) => {
  if (process.env.NEXT_PUBLIC_HOST_NAME !== process.env.NEXT_PUBLIC_WEBSITE)
    return;
  const emailMeta: Parameters<typeof fillEmailTemplate>[1] = {
    company_name: job.company,
    job_title: job.job_title,
    first_name: candidate.first_name,
    last_name: candidate.last_name,
    interview_link: `${process.env.NEXT_PUBLIC_HOST_NAME}/assessment?id=${candidate.application_id}`,
    phone_screening_link: `${process.env.NEXT_PUBLIC_HOST_NAME}/candidate-phone-screening?job_post_id=${job.id}&application_id=${candidate.application_id}`,
    support_link: `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${job.id}`,
    recruter_name:
      job.email_template[candidate.purpose]?.fromName ?? job.company,
  };
  const templates = job.email_template[candidate.purpose];
  const mail = {
    to: candidate.email,
    from: {
      name: job.email_template[candidate.purpose]?.fromName ?? job.company,
      email: 'messenger@aglinthq.com',
    },
    subject: fillEmailTemplate(templates.subject, emailMeta),
    html: fillEmailTemplate(templates.body, emailMeta),
  };
  await sgMail.send(mail);
};

export const updateApplication = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  job: JobApplicationEmails['request']['job'],
  candidates: Candidates,
  purposes?: JobApplicationEmails['request']['purposes'],
  destination?: JobApplicationEmails['request']['sections']['destination'],
) => {
  if (purposes || destination) {
    const updatedData = candidates.map((c) => {
      const updatedApplication = {
        id: c.application_id,
        job_id: job.id,
      };
      if (destination) updatedApplication['status'] = destination;
      if (purposes)
        updatedApplication['status_emails_sent'] = {
          ...(c.status_emails_sent as any),
          ...getUpdateEmailStatus(purposes, c),
        };
      return updatedApplication;
    });
    await upsertNewJobApplicationDbAction(updatedData, supabase);
  }
};

const getUpdateEmailStatus = (
  purposes: JobApplicationEmails['request']['purposes'],
  candidate: Candidates[number],
) => {
  const { isValidEmail } = candidateEmailValidity(
    candidate.email,
    candidate.candidate_id,
  );
  const { assessmentStatus, screeningStatus, disqualificationStatus } =
    getAllApplicationStatus(
      candidate.status_emails_sent,
      candidate.phone_screening,
      candidate.assessment_results,
    );
  const timeStamp = new Date().toISOString();
  return Object.assign(
    {},
    ...purposes.reduce((acc, curr) => {
      switch (curr) {
        case 'rejection':
          {
            if (isValidEmail && disqualificationStatus.isNotInvited)
              acc.push({ [curr]: timeStamp });
          }
          break;
        case 'interview':
          {
            if (isValidEmail && assessmentStatus.isNotInvited)
              acc.push({ [curr]: timeStamp });
          }
          break;
        case 'interview_resend':
          {
            if (
              isValidEmail &&
              !assessmentStatus.isNotInvited &&
              assessmentStatus.isPending
            )
              acc.push({ [curr]: timeStamp });
          }
          break;
        case 'phone_screening':
          {
            if (isValidEmail && screeningStatus.isNotInvited)
              acc.push({ [curr]: timeStamp });
          }
          break;
        case 'phone_screening_resend': {
          if (
            isValidEmail &&
            !screeningStatus.isNotInvited &&
            screeningStatus.isPending
          ) {
            acc.push({ [curr]: timeStamp });
          }
        }
      }
      return acc;
    }, []),
  ) as {
    // eslint-disable-next-line no-unused-vars
    [key in JobApplicationEmails['request']['purposes'][number]]: string;
  };
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
