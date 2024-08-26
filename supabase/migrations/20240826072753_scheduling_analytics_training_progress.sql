drop function if exists "public"."scheduling_analytics_training_progress"(recruiter_id uuid, departments numeric[], jobs uuid[], type status_training);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_training_progress(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], locations numeric[] DEFAULT ARRAY[]::numeric[])
 RETURNS TABLE(number_of_shadow bigint, noshadow numeric, number_of_reverse_shadow bigint, noreverseshadow numeric, user_id uuid, name text, "position" text)
 LANGUAGE plpgsql
AS $function$
DECLARE
  locations_length numeric;
BEGIN
  locations_length := coalesce(
    array_length(scheduling_analytics_training_progress.locations, 1),
    0
  );
   RETURN QUERY
    with
      modules as (
        select distinct
          interview_module.id,
          interview_module.name,
          interview_module.recruiter_id,
          interview_module.settings,
          public_jobs.id as job_id
        from
          interview_module
          left join interview_session on interview_session.module_id = interview_module.id
          left join interview_plan on interview_plan.id = interview_session.interview_plan_id
          left join public_jobs on public_jobs.id = interview_plan.id
      ),
      filtered_module_members as (
        select
          interview_module_relation.number_of_shadow,
          (modules.settings ->> 'noShadow')::numeric as noShadow,
          interview_module_relation.number_of_reverse_shadow,
          (modules.settings ->> 'noReverseShadow')::numeric as noReverseShadow,
          recruiter_user.user_id,
          modules.name,
          recruiter_user.position
        from
          interview_module_relation
          left join modules on modules.id = interview_module_relation.module_id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
        where
          modules.recruiter_id = scheduling_analytics_training_progress.recruiter_id
          and modules.job_id IN (
            SELECT
              *
            FROM
              get_filtered_job_ids (
                scheduling_analytics_training_progress.recruiter_id,
                scheduling_analytics_training_progress.departments,
                scheduling_analytics_training_progress.jobs
              )
          )
          and recruiter_user.office_location_id IN (
            SELECT
              office_locations.id
            FROM
              office_locations
            WHERE
              office_locations.recruiter_id = scheduling_analytics_training_progress.recruiter_id
              AND (
                locations_length = 0
                OR office_locations.id = ANY (scheduling_analytics_training_progress.locations)
              )
          )
      )
    select
      *
    from
      filtered_module_members
    order by
      number_of_shadow desc,
      noShadow desc,
      number_of_reverse_shadow desc,
      noReverseShadow desc;
END;
$function$
;


