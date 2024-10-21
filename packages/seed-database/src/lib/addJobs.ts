import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { seedJobs } from '../data/jobs';
import { supabaseWrap } from '@aglint/shared-utils';
import { getSupabaseServer } from '../supabaseAdmin';

export const addJobs = async ({
  companyDetails,
  department_id,
  location_id,
}: {
  companyDetails: DatabaseTable['recruiter'];
  department_id: number;
  location_id: number;
}) => {
  const supabaseAdmin = getSupabaseServer();
  const jobsToAdd: DatabaseTableInsert['public_jobs'][] = seedJobs.map(
    (job) => {
      return {
        job_title: job.job_title,
        slug: job.slug,
        description: job.description,
        recruiter_id: companyDetails.id,
        status: 'published',
        job_type: 'full time',
        workplace_type: 'on site',
        department_id: department_id,
        location_id: location_id,
        jd_json: {
          level: 'Senior-level',
          title: job.job_title,
          skills: [],
          educations: [],
          rolesResponsibilities: [],
        },
        draft_jd_json: {
          skills: [],
          educations: [],
          rolesResponsibilities: [],
          level: 'Senior-level',
          title: job.job_title,
        },
      };
    }
  );
  supabaseWrap(await supabaseAdmin.from('public_jobs').insert(jobsToAdd));
  console.log('Jobs added');
};
