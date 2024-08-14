import { DatabaseTableInsert, DB, GreenhouseType } from '@aglint/shared-types';
import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';

import { JobGreenhouse } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/GreenhouseModal/types';
import { POSTED_BY } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/utils';
import { getGreenhouseCandidates } from '@/src/pages/api/greenhouse/getCandidates';

const MAX_EMAILS_PER_BATCH = 100;

export async function getGreenhouseJob(
  supabase: SupabaseClient<DB>,
  key: string,
  // eslint-disable-next-line no-unused-vars
  ats_job_id: number,
) {
  const res = await axios.get<JobGreenhouse>(
    // 'https://harvest.greenhouse.io/v1/job_posts?per_page=10&page=1&live=true&active=true',
    'https://harvest.greenhouse.io/v1/departments',
    {
      auth: {
        username: key,
        password: '',
      },
    },
  );
  if (res.status !== 200) {
    // @ts-ignore
    throw new Error(res.data?.message || 'Greenhouse API Failed!');
  }
  return res.data;
}

export async function createSyncedJob(
  supabase: SupabaseClient<DB>,
  job_post: Awaited<ReturnType<typeof getGreenhouseJob>>,
  recruiter_id: string,
) {
  const temp_public_job = createJobObject(job_post, recruiter_id);
  const job_ref: DatabaseTableInsert['job_reference'] = {
    ats_job_id: job_post.job_id as unknown as string,
    // @ts-ignore
    ats_json: job_post,
    recruiter_id,
    ats: 'greenhouse',
    public_job_id: await saveJobToDb(supabase, temp_public_job),
  };
  await supabase
    .from('job_reference')
    .insert(job_ref)
    .select('id')
    .single()
    .throwOnError();
  return job_ref.public_job_id;
}
async function saveJobToDb(
  supabase: SupabaseClient<DB>,
  data: DatabaseTableInsert['public_jobs'],
) {
  try {
    return (
      await supabase
        .from('public_jobs')
        .insert(data)
        .select('id')
        .single()
        .throwOnError()
    ).data.id;
  } catch (e) {
    throw new Error(`Failed to create job in system :${String(e)}`);
  }
}

function createJobObject(
  post: Awaited<ReturnType<typeof getGreenhouseJob>>,
  recruiter_id: string,
): DatabaseTableInsert['public_jobs'] {
  return {
    draft: {
      job_title: post.title,
      description: post.content,
      job_type: 'full time',
      workplace_type: 'on site',
      jd_json: {
        educations: [],
        level: 'Mid-level',
        rolesResponsibilities: [],
        skills: [],
        title: post.title,
      },
    },
    job_title: post.title,
    status: 'draft',
    scoring_criteria_loading: true,
    posted_by: POSTED_BY.GREENHOUSE,
    recruiter_id,
    description: post.content,
    job_type: 'full time',
    workplace_type: 'on site',
    parameter_weights: {
      skills: 0,
      education: 0,
      experience: 0,
    },
  };
}

export async function syncJobApplications(
  supabase: SupabaseClient<DB>,
  post: { job_id: number; public_job_id: string; recruiter_id: string },
  apiKey: string,
) {
  const refCandidates = await fetchAllCandidates(post, apiKey);

  const emails = [
    ...new Set(
      refCandidates.map((cand) => {
        return cand.email;
      }),
    ),
  ];

  const checkCandidates = await processEmailsInBatches(
    supabase,
    emails,
    post.recruiter_id,
  );

  //new candidates insert flow
  const uniqueRefCandidates = refCandidates.filter((cand) => {
    return !checkCandidates.some((checkCand) => {
      return checkCand.email === cand.email;
    });
  });

  //email which are not their in candidates table we are inserting them
  const insertableCandidates = uniqueRefCandidates.map((cand) => {
    return {
      first_name: cand.first_name,
      last_name: cand.last_name,
      email: cand.email,
      linkedin: cand.linkedin,
      phone: cand.phone,
      id: crypto.randomUUID(),
      recruiter_id: post.recruiter_id,
    };
  });

  //in that check duplicate email are their or not
  const dbCandidates = insertableCandidates.filter((cand, index, self) => {
    // Use the Array.findIndex() method to check if the current email address
    // exists in the array at a previous index.
    const isUnique =
      cand.email && self.findIndex((c) => c.email === cand.email) === index;

    // Return true if the email is unique and not null, otherwise false.
    return isUnique;
  });

  const { data: newCandidates, error: errorCandidates } = await supabase
    .from('candidates')
    .insert(dbCandidates)
    .select();

  if (!errorCandidates) {
    const allCandidates = [...newCandidates, ...checkCandidates];

    const dbApplications = refCandidates
      .map((ref) => {
        const matchingCandidate = allCandidates.find(
          (cand) => cand.email === ref.email,
        );

        if (matchingCandidate && matchingCandidate.id) {
          return {
            applied_at: ref.created_at,
            candidate_id: matchingCandidate.id,
            job_id: post.public_job_id,
            id: ref.application_id,
            is_resume_fetching: true,
            source: 'greenhouse',
          } as DatabaseTableInsert['applications'];
        } else {
          return null;
        }
      })
      .filter(Boolean);

    await supabase.from('applications').insert(dbApplications).throwOnError();

    const referenceObj = refCandidates.map((ref) => {
      return {
        application_id: ref.application_id,
        posting_id: post.job_id,
        greenhouse_id: ref.id,
        public_job_id: post.public_job_id,
        resume: ref.resume,
      };
    }) as unknown as GreenhouseType[];
    await createReference(supabase, referenceObj);
  }
  //new candidates insert flow
}

async function fetchAllCandidates(
  post: { job_id: number; public_job_id: string; recruiter_id: string },
  apiKey: string,
) {
  let allCandidates = [];
  let hasMore = true;
  let page = 1;
  while (hasMore) {
    try {
      const response = await getGreenhouseCandidates(apiKey, {
        ats_job_id: post.job_id,
        page: page,
      });
      if (response) {
        allCandidates = allCandidates.concat(response);
        if (response.length > 0) {
          hasMore = true;
          page = page + 1;
        } else {
          hasMore = false;
        }
      } else {
        hasMore = false; // Exit the loop if there are no more records
      }
    } catch (error) {
      hasMore = false; // Exit the loop in case of an error
    }
  }

  return allCandidates
    .map((cand) => {
      if (cand.email_addresses[0]?.value) {
        return {
          created_at: cand.created_at,
          first_name: cand.first_name,
          last_name: cand.last_name,
          email: cand.email_addresses[0]?.value,
          job_title: cand.title,
          company: cand.company,
          profile_image: cand.photo_url,
          linkedin: extractLinkedInURLGreenhouse(
            cand.website_addresses[0]?.value || '',
          ),
          phone: cand.phone_numbers[0]?.value,
          resume:
            cand.attachments?.filter((res) => res.type == 'resume')?.length != 0
              ? cand.attachments.filter((res) => res.type == 'resume')[0]?.url
              : cand.attachments[0]?.url,
          job_id: post.public_job_id,
          application_id: crypto.randomUUID(), //our job application id
          id: cand.id, //greenhouse candidate id
        };
      } else {
        return null;
      }
    })
    .filter(Boolean);
}

export function extractLinkedInURLGreenhouse(item: string): string {
  if (
    item.startsWith('http://linkedin.com') ||
    item.startsWith('https://linkedin.com')
  ) {
    return item; // Return the LinkedIn URL
  } else {
    return '';
  }
}

async function processEmailsInBatches(
  supabase: SupabaseClient,
  emails: string[],
  recruiter_id: string,
) {
  let allCandidates = [];
  for (let i = 0; i < emails.length; i += MAX_EMAILS_PER_BATCH) {
    const emailBatch = emails.slice(i, i + MAX_EMAILS_PER_BATCH);
    const cand = await processBatch(supabase, emailBatch, recruiter_id);
    allCandidates = [...allCandidates, ...cand];
  }
  return allCandidates;
}

async function processBatch(
  supabase: SupabaseClient<DB>,
  emailBatch: string[],
  recruiter_id: string,
) {
  const { data: checkCandidates, error: errorCheck } = await supabase
    .from('candidates')
    .select()
    .in('email', emailBatch)
    .eq('recruiter_id', recruiter_id);

  if (!errorCheck) {
    return checkCandidates;
  } else {
    return [];
  }
}

export const createReference = async (
  supabase: SupabaseClient<DB>,
  reference: GreenhouseType[],
) => {
  return (
    await supabase
      .from('greenhouse_reference')
      .insert(reference)
      .select()
      .throwOnError()
  ).data;
};
