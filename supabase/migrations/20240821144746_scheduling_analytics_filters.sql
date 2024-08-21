set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_filters(recruiter_id uuid)
 RETURNS TABLE(jobs jsonb[], departments jsonb[])
 LANGUAGE plpgsql
AS $function$
begin
  return query
    with
      entries_cte as (
        select distinct
          public_jobs.id as job_id,
          public_jobs.job_title as job_title,
          departments.id as department_id,
          departments.name as department_title
        from
          public_jobs
          left join departments on departments.id = public_jobs.department_id
        where
          public_jobs.recruiter_id = scheduling_analytics_filters.recruiter_id
          and public_jobs.id is not null
          and public_jobs.department_id is not null
      )
    select
      (array_agg(jsonb_build_object('id',entries_cte.job_id,'job_title',entries_cte.job_title)))::jsonb[] as jobs,
      (array_agg(jsonb_build_object('id',entries_cte.department_id,'name',entries_cte.department_title)))::jsonb[] as departments
    from
      entries_cte;
end;
$function$
;