import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { seedJobs } from '../data/jobs';
import { supabaseWrap } from '@aglint/shared-utils';
import { getSupabaseServer } from '../supabaseAdmin';
import { createInterviewPlan } from './createInterviewPlan';

export const addJobs = async ({
  companyDetails,
  department_id,
  location_id,
  int_modules,
  int_modules_relations,
  team,
}: {
  companyDetails: DatabaseTable['recruiter'];
  department_id: number;
  location_id: number;
  int_modules: DatabaseTable['interview_module'][];
  int_modules_relations: DatabaseTable['interview_module_relation'][];
  team: DatabaseTable['recruiter_user'][];
}) => {
  const supabaseAdmin = getSupabaseServer();
  const jobs_promises = seedJobs.map(async (job) => {
    const job_details: DatabaseTableInsert['public_jobs'] = {
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
    //
    const inserted_job = supabaseWrap(
      await supabaseAdmin
        .from('public_jobs')
        .insert(job_details)
        .select()
        .single()
    );
    await createInterviewPlan({
      job_details: inserted_job,
      job_plan: job.int_stages,
      int_modules,
      int_modules_relations,
      team: team,
    });

    return { inserted_job };
  });

  await Promise.all(jobs_promises);
  console.log('Jobs data and interview plan are created');
};
