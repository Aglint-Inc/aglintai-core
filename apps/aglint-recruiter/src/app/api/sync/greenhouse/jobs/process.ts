import { DatabaseTableInsert } from '@aglint/shared-types';

import { POSTED_BY } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/utils';
import { SupabaseClientType } from '@/src/utils/supabase/supabaseAdmin';

import { syncJobApplications } from '../applications/process';
import { getOfficeLocations } from '../office_locations/process';
import { GreenhouseJobStagesAPI } from '../types';
import {
  chunkArray,
  getGreenhouseJobPlan,
  getGreenhouseJobs,
  setLastSync,
} from '../util';

// eslint-disable-next-line no-unused-vars
const MAX_EMAILS_PER_BATCH = 100;

export async function syncGreenhouseJob(
  supabaseAdmin: SupabaseClientType,
  key: string,
  recruiter_id: string,
  last_sync?: string,
) {
  const job_posts = await getGreenhouseJobs(key, last_sync);
  return mapSaveJobs(supabaseAdmin, key, job_posts, recruiter_id);
}

export async function mapSaveJobs(
  supabaseAdmin: SupabaseClientType,
  key: string,
  job_posts: Awaited<ReturnType<typeof getGreenhouseJobs>>,
  recruiter_id: string,
) {
  const curr_office_locations = await getOfficeLocations(
    supabaseAdmin,
    recruiter_id,
  );
  const temp_public_jobs = job_posts.map((job_post) =>
    createJobObject(recruiter_id, job_post, curr_office_locations),
  );
  const job_ids = (
    await supabaseAdmin
      .from('public_jobs')
      .upsert(temp_public_jobs, { onConflict: 'remote_id' })
      .select('id,remote_id, remote_sync_time')
      .throwOnError()
  ).data;
  await setLastSync(supabaseAdmin, recruiter_id, {
    jobs: new Date().toISOString(),
  });
  const jobs_count = job_ids.length;
  if (jobs_count) {
    const chunks = chunkArray(job_ids, 10);
    for (let jobs of chunks) {
      await Promise.all(
        jobs
          .map((job) => {
            // api call
            return [
              syncJobApplications(
                supabaseAdmin,
                {
                  job_id: job.id,
                  recruiter_id,
                  remote_id: Number(job.remote_id),
                  last_sync: job.remote_sync_time,
                },
                key,
              ),
              syncGreenhouseJobPlan(
                supabaseAdmin,
                {
                  ats_job_id: Number(job.remote_id),
                  public_job_id: job.id,
                  recruiter_id,
                },
                key,
              ),
            ];
          })
          .flat(),
      );
    }
  }
  await setLastSync(supabaseAdmin, recruiter_id, {
    jobs: new Date().toISOString(),
  });
  return job_ids;
}

function createJobObject(
  recruiter_id: string,
  post: Awaited<ReturnType<typeof getGreenhouseJobs>>[number],
  officeLocations: Awaited<ReturnType<typeof getOfficeLocations>>,
) {
  const location_id = officeLocations[post.location.id];
  return {
    draft: {
      location_id,
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
      department_id: null,
    },
    location_id,
    job_title: post.title,
    status: 'published',
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
    remote_id: String(post.job_id),
    remote_sync_time: new Date().toISOString(),
  } as DatabaseTableInsert['public_jobs'];
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

export async function syncGreenhouseJobPlan(
  supabaseAdmin: SupabaseClientType,
  prop: {
    recruiter_id: string;
    ats_job_id: number;
    public_job_id: string;
  },
  key?: string,
) {
  const plans = await getGreenhouseJobPlan(key, prop.ats_job_id);
  return mapSaveInterviewPlans(
    supabaseAdmin,
    plans,
    prop.public_job_id,
    prop.recruiter_id,
  );
}

// eslint-disable-next-line no-unused-vars

async function mapSaveInterviewPlans(
  supabaseAdmin: SupabaseClientType,
  data: GreenhouseJobStagesAPI,
  job_id: string,
  recruiter_id: string,
) {
  const temp_plans: DatabaseTableInsert['interview_plan'][] = data.map(
    (item, index) => {
      return {
        name: item.name,
        job_id: job_id,
        plan_order: index + 1,
        recruiter_id,
      };
    },
  );
  const plans = (
    await supabaseAdmin
      .from('interview_plan')
      .insert(temp_plans)
      .select('id, plan_order')
      .throwOnError()
  ).data;
  const temp_sessions: DatabaseTableInsert['interview_session'][] = plans
    .map((plan) => {
      return data[plan.plan_order - 1]?.interviews.map((session, index) => {
        return {
          name: session.name,
          interview_plan_id: plan.id,
          session_duration: session.estimated_minutes,
          session_order: index,
          session_type: 'panel',
        } as DatabaseTableInsert['interview_session'];
      });
    })
    .flat();
  await supabaseAdmin
    .from('interview_session')
    .insert(temp_sessions)
    .throwOnError();
  return true;
}
