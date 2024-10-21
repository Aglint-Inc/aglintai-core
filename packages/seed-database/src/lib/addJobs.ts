import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { seedJobs } from '../data/jobs';
import { supabaseWrap } from '@aglint/shared-utils';
import { getSupabaseServer } from '../supabaseAdmin';

export const addJobs = async ({
  companyDetails,
}: {
  companyDetails: DatabaseTable['recruiter'];
  department_id: number;
  location_id: number;
}) => {
  const supabaseAdmin = getSupabaseServer();
  const jobsToAdd: DatabaseTableInsert['public_jobs'][] = seedJobs.map(
    (job) => {
      return {
        ...job,
        recruiter_id: companyDetails.id,
        status: 'published',
        job_type: 'full time',
        workplace_type: 'on site',
        department_id: 0,
        location_id: 1,
        jd_json: {
          level: 'Senior-level',
          title: job.job_title,
          skills: [],
          educations: [],
          rolesResponsibilities: [],
        },
        draft: {
          jd_json: {
            level: 'Senior-level',
            title: job.job_title,
            skills: [],
            educations: [],
            rolesResponsibilities: [],
          },
          job_type: 'full time',
          job_title: job.job_title,
          description: job.description,
          workplace_type: 'on site',
        },
      };
    }
  );

  supabaseWrap(await supabaseAdmin.from('public_jobs').insert(jobsToAdd));
};
