import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import type { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

const query = async ({ ctx: { recruiter_id } }: PrivateProcedure) => {
  const db = createPublicClient();
  const result = await getOnboardingDetails(db, recruiter_id);
  return result;
};

export const getOnboard = privateProcedure.query(query);

const getOnboardingDetails = async (
  supabaseAdmin: SupabaseClientType,
  recruiter_id: string,
) => {
  try {
    const [
      departmentCount,
      interviewPoolCount,
      locationsCount,
      jobs,
      integrations,
      users,
      onboard_complete,
      candPlan,
    ] = await Promise.all([
      supabaseAdmin
        .from('departments')
        .select('*', { count: 'exact', head: true })
        .eq('recruiter_id', recruiter_id)
        .throwOnError()
        .then((res) => res.count!),

      supabaseAdmin
        .from('interview_module')
        .select('*', { count: 'exact', head: true })
        .eq('recruiter_id', recruiter_id)
        .throwOnError()
        .then((res) => res.count!),

      supabaseAdmin
        .from('office_locations')
        .select('*', { count: 'exact', head: true })
        .eq('recruiter_id', recruiter_id)
        .throwOnError()
        .then((res) => res.count!),

      supabaseAdmin
        .from('public_jobs')
        .select('*', { count: 'exact' })
        .eq('recruiter_id', recruiter_id)
        .throwOnError()
        .then((res) => res!),

      supabaseAdmin
        .from('integrations')
        .select('ashby_key,lever_key,greenhouse_key')
        .eq('recruiter_id', recruiter_id)
        .single()
        .throwOnError()
        .then((res) => res.data!),

      supabaseAdmin
        .from('recruiter_relation')
        .select('recruiter_user!public_recruiter_relation_user_id_fkey(*)', {
          count: 'exact',
          head: true,
        })
        .eq('recruiter_id', recruiter_id)
        .throwOnError()
        .then((res) => {
          return res.count!;
        }),
      supabaseAdmin
        .from('recruiter_preferences')
        .select('onboard_complete')
        .eq('recruiter_id', recruiter_id)
        .single()
        .throwOnError()
        .then((res) => {
          const pre = res.data!;
          return pre.onboard_complete!;
        }),
      supabaseAdmin
        .from('recruiter')
        .select(
          'name,logo,employee_size,industry,interview_plan(count),candidates(count)',
        )
        .eq('id', recruiter_id)
        .single()
        .throwOnError()
        .then((res) => {
          return res.data!;
        }),
    ]);

    return {
      isDepartmentsPresent: departmentCount > 0,
      isInterviewPoolsPresent: interviewPoolCount > 0,
      isLocationsPresent: locationsCount > 0,
      isIntegrationsPresent:
        !!integrations.ashby_key ||
        !!integrations.lever_key ||
        !!integrations.greenhouse_key,
      isUsersPresent: users > 1,
      isJobsPresent: jobs.count! > 0,
      firstJobId: jobs.data?.[0].id ?? null,
      isOnboardCompleteRemote: onboard_complete,
      isInterviewPlansPresent: candPlan.interview_plan[0].count > 0,
      isCandidatesPresent: candPlan.candidates[0].count > 0,
      recruiter: {
        name: candPlan.name || '',
        logo: candPlan.logo || '',
        employee_size: candPlan.employee_size || '',
        industry: candPlan.industry || '',
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
