set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_interview_types(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(id uuid, name text, qualified bigint, training bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY 
    with
      modules as (
        select distinct
          interview_module.id,
          interview_module.name,
          interview_module.recruiter_id,
          public_jobs.id as job_id
        from
          interview_module
          left join interview_session on interview_session.module_id = interview_module.id
          left join interview_plan on interview_plan.id = interview_session.interview_plan_id
          left join public_jobs on public_jobs.id = interview_plan.job_id
      ),
      filtered_modules as (
        select distinct
          interview_module_relation.training_status,
          interview_module_relation.user_id,
          modules.id,
          modules.name
        from
          interview_module_relation
          left join modules on modules.id = interview_module_relation.module_id
        where
          interview_module_relation.is_archived = false
          and modules.recruiter_id = scheduling_analytics_interview_types.recruiter_id
          and modules.job_id IN (
            SELECT
              *
            FROM
              get_filtered_job_ids (
                scheduling_analytics_interview_types.recruiter_id,
                scheduling_analytics_interview_types.departments,
                scheduling_analytics_interview_types.jobs
              )
          )
      )
    select
      filtered_modules.id,
      filtered_modules.name,
      COUNT(*) FILTER (
        WHERE
          filtered_modules.training_status = 'qualified'
      ) as qualified,
      COUNT(*) FILTER (
        WHERE
          filtered_modules.training_status = 'training'
      ) as training
    from
      filtered_modules
    group by
      filtered_modules.id,
      filtered_modules.name
    order by
      qualified desc,
      training desc;
END;
$function$
;


