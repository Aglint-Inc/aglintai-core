/* eslint-disable no-console */
import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { processEmailsInBatches } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/GreenhouseModal/utils';
import { LeverApplication } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/LeverModal/types/applications';
import { LeverJob } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/LeverModal/types/job';
import {
  extractLinkedInURL,
  POSTED_BY,
} from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/utils';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { splitFullName } from '../../loading';
import { decrypt } from '../decryptApiKey';

export type ApiLeverCreateJob = {
  request: {
    recruiter_id: string;
    leverPost: LeverJob;
  };
  response: {
    success: boolean;
    public_job_id: string;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const public_job_id = crypto.randomUUID();
  try {
    const requestHandler = apiRequestHandlerFactory<ApiLeverCreateJob>(
      req,
      res,
    );

    requestHandler(
      'POST',
      async ({ body }) => {
        const { recruiter_id, leverPost } = body;
        const ats_job_id = leverPost.id;
        const dbJob = await createJobObject({
          post: leverPost,
          recruiter_id: recruiter_id,
          public_job_id,
        });
        const { data: integration } = await supabaseAdmin
          .from('integrations')
          .select()
          .single();
        const { data: newJobs, error } = await supabaseAdmin
          .from('public_jobs')
          .insert(dbJob)
          .select();

        if (!error) {
          await createJobApplications({
            apiKey: decrypt(integration.lever_key, process.env.ENCRYPTION_KEY),
            ats_job_id: ats_job_id,
            public_job_id: newJobs[0].id,
            recruiter_id: recruiter_id,
          });
        }
        return {
          success: true,
          public_job_id: newJobs[0].id,
        };
      },
      ['recruiter_id', 'leverPost'],
    );
  } catch (error) {
    await supabaseAdmin
      .from('public_jobs')
      .delete()
      .match({ id: public_job_id });
    // console.log('error', error);
    return res.status(400).send(error.message);
  }
};

export default handler;

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
  const fetchedCandidates = await fetchAllCandidates(ats_job_id, apiKey);

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

  const checkCandidates = await processEmailsInBatches(
    emails,
    recruiter_id,
    supabaseAdmin,
  );

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
    department_id: null,
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
