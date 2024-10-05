/* eslint-disable no-console */
import {
  type DatabaseTable,
  type DatabaseTableInsert,
} from '@aglint/shared-types';
import axios from 'axios';
import { z } from 'zod';

import { type LeverApplication } from '@/jobs/components/AddJobWithIntegrations/LeverModal/types/applications';
import { type LeverJob } from '@/jobs/components/AddJobWithIntegrations/LeverModal/types/job';
import {
  extractLinkedInURL,
  POSTED_BY,
  splitFullName,
} from '@/jobs/components/AddJobWithIntegrations/utils';
import { decrypt } from '@/pages/api/decryptApiKey';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { processEmailsInBatches } from '@/utils/processEmailsInBatches';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const schema = z.object({
  leverPost: z.any(),
});

export const mutation = async ({
  input: { leverPost },
  ctx: { recruiter_id },
}: PrivateProcedure<typeof schema>) => {
  const public_job_id = crypto.randomUUID();
  const leverPostTyped = leverPost as LeverJob;
  const ats_job_id = leverPost.id;
  const supabaseAdmin = getSupabaseServer();
  const dbJob = await createJobObject({
    post: leverPostTyped,
    recruiter_id: recruiter_id,
    public_job_id,
  });
  const integration = (
    await supabaseAdmin
      .from('integrations')
      .select()
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data!;

  console.log('integration :', integration);
  console.log('dbJob :', dbJob);

  const newJobs = (
    await supabaseAdmin
      .from('public_jobs')
      .insert(dbJob)
      .select()
      .throwOnError()
  ).data!;

  console.log('newJobs :', newJobs);

  if (!integration?.lever_key) {
    throw new Error('No Lever Key found');
  }

  await createJobApplications({
    apiKey: decrypt(integration?.lever_key, process.env.ENCRYPTION_KEY),
    ats_job_id: ats_job_id,
    public_job_id: newJobs[0].id,
    recruiter_id: recruiter_id,
  });
  return {
    success: true,
    public_job_id: newJobs[0].id,
  };
};

export const createLeverJob = privateProcedure.input(schema).mutation(mutation);

const fetchAllCandidates = async (ats_job_id: string, apiKey: string) => {
  let allCandidates: LeverApplication[] = [];
  let hasMore = true;
  let next = 0;

  while (hasMore) {
    try {
      const response = await fetchCandidates({
        ats_job_id: ats_job_id,
        apiKey: apiKey,
        offset: next,
      });

      if (response) {
        allCandidates = allCandidates.concat(response.data);
        hasMore = response.hasNext;
        next = response.next;
      } else {
        next = 0;
        hasMore = false; // Exit the loop if there are no more records
      }
    } catch (error) {
      hasMore = false; // Exit the loop in case of an error
    }
  }

  return allCandidates;
};

const fetchCandidates = async ({
  apiKey,
  ats_job_id,
  offset,
}: {
  apiKey: string;
  ats_job_id: string;
  offset: number;
}) => {
  let url = `https://api.lever.co/v1/opportunities?posting_id=${ats_job_id}`;

  if (offset !== 0) {
    url = `https://api.lever.co/v1/opportunities?posting_id=${ats_job_id}&offset=${offset}`;
  }

  const res = await axios.get(url, {
    auth: {
      username: apiKey,
      password: '',
    },
  });

  return res.data as {
    data: LeverApplication[];
    hasNext: boolean;
    next: number;
  };
};

const createJobApplications = async ({
  ats_job_id,
  apiKey,
  public_job_id,
  recruiter_id,
}: {
  ats_job_id: string;
  apiKey: string; // encrypted api key
  public_job_id: string;
  recruiter_id: string;
}) => {
  const supabaseAdmin = getSupabaseServer();

  const fetchedCandidates = await fetchAllCandidates(ats_job_id, apiKey);

  // eslint-disable-next-line no-console
  console.log('fetchedCandidates', fetchedCandidates.length);

  // for creating lever job reference
  const refCandidates = fetchedCandidates
    .map((cand) => {
      return {
        created_at: new Date(cand.createdAt).toISOString(),
        first_name: splitFullName(cand.name).firstName,
        last_name: splitFullName(cand.name).lastName,
        email: cand.emails[0],
        linkedin: extractLinkedInURL(cand.links || []),
        phone: cand.phones[0]?.value,
        job_id: public_job_id,
        application_id: crypto.randomUUID(), //our job application id
        id: cand.id, //lever opportunity id
        ref: cand,
      };
    })
    .filter((cand) => cand.email);
  // for creating lever job reference

  console.log('refCandidates', refCandidates.length);

  const emails = [
    ...new Set(
      refCandidates.map((cand) => {
        return cand.email;
      }),
    ),
  ];

  const checkCandidates =
    (await processEmailsInBatches(emails, recruiter_id, supabaseAdmin)) || [];

  //new candidates insert flow
  const uniqueRefCandidates = refCandidates.filter((cand) => {
    return !checkCandidates.some((checkCand) => {
      return checkCand.email === cand.email;
    });
  });

  const insertableCandidates = uniqueRefCandidates.map((cand) => {
    return {
      first_name: cand.first_name,
      last_name: cand.last_name,
      email: cand.email,
      linkedin: cand.linkedin,
      phone: cand.phone,
      id: crypto.randomUUID(),
      recruiter_id: recruiter_id,
    };
  });

  const dbCandidates = insertableCandidates.filter((cand, index, self) => {
    // Use the Array.findIndex() method to check if the current email address
    // exists in the array at a previous index.
    const isUnique = self.findIndex((c) => c.email === cand.email) === index;
    return isUnique;
  });

  const { data: newCandidates, error: errorCandidates } = await supabaseAdmin
    .from('candidates')
    .insert(dbCandidates)
    .select();

  console.log(errorCandidates);

  if (!errorCandidates) {
    const allCandidates = [...newCandidates, ...checkCandidates];
    const dbApplications: DatabaseTableInsert['applications'][] =
      refCandidates.map((ref) => {
        return {
          recruiter_id,
          applied_at: ref.created_at,
          candidate_id: allCandidates.filter(
            (cand) => cand.email === ref.email,
          )[0].id,
          job_id: public_job_id,
          id: ref.application_id,
          is_resume_fetching: true,
          source: 'lever',
          remote_id: ref.id,
          remote_data: ref.ref,
        } as DatabaseTableInsert['applications'];
      });

    await supabaseAdmin
      .from('applications')
      .insert(dbApplications)
      .throwOnError();

    //new candidates insert flow
  }
  return true;
};

export const createJobObject = async ({
  post,
  recruiter_id,
  public_job_id,
}: {
  post: LeverJob;
  recruiter_id: string;
  public_job_id: string;
}) => {
  const draft: DatabaseTable['public_jobs']['draft'] = {
    job_type:
      post.categories.commitment === 'Part Time'
        ? 'part time'
        : post.categories.commitment === 'Internship'
          ? 'internship'
          : 'full time',
    workplace_type:
      post.workplaceType === 'hybrid'
        ? 'hybrid'
        : post.workplaceType === 'onsite'
          ? 'on site'
          : 'off site',
    job_title: post.text,
    description: post.content.descriptionHtml,
    jd_json: {
      educations: [],
      level: 'Mid-level',
      rolesResponsibilities: [],
      skills: [],
      title: post.text,
    },
  };

  const insertJob: DatabaseTableInsert['public_jobs'] = {
    draft,
    job_title: post.text,
    status: 'draft',
    scoring_criteria_loading: true,
    posted_by: POSTED_BY.LEVER,
    recruiter_id,
    id: public_job_id,
    description: post.content.descriptionHtml,
    job_type:
      post.categories.commitment === 'Part Time'
        ? 'part time'
        : post.categories.commitment === 'Internship'
          ? 'internship'
          : 'part time',
    workplace_type:
      post.workplaceType === 'hybrid'
        ? 'hybrid'
        : post.workplaceType === 'onsite'
          ? 'on site'
          : 'off site',
    parameter_weights: {
      skills: 0,
      education: 0,
      experience: 0,
    },
    remote_id: post.id,
  };

  return insertJob;
};
