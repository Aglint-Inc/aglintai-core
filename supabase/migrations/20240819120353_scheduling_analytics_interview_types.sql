set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_interview_types(recruiter_id uuid, jobs uuid[] DEFAULT NULL::uuid[])
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
          left join public_jobs on public_jobs.id = interview_plan.id
      ),
      filtered_modules as (
        select
          interview_module_relation.training_status,
          modules.id,
          modules.name
        from
          interview_module_relation
          left join modules on modules.id = interview_module_relation.module_id
        where
          modules.recruiter_id = scheduling_analytics_interview_types.recruiter_id
          and modules.job_id <> ALL (COALESCE(scheduling_analytics_interview_types.jobs, ARRAY[]::uuid[]))
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


