set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_filters(recruiter_id uuid)
 RETURNS TABLE(jobs jsonb[], departments jsonb[])
 LANGUAGE plpgsql
AS $function$
begin
  return query
  with
    jobs_cte as (
      select
        public_jobs.id,
        public_jobs.job_title
      from
        public_jobs
      where
        public_jobs.recruiter_id = scheduling_analytics_filters.recruiter_id
        and public_jobs.id is not null
        and public_jobs.job_title is not null
    ),
    departments_cte as (
      select
        departments.id,
        departments.name
      from
        departments
      where
        departments.recruiter_id = scheduling_analytics_filters.recruiter_id
        and departments.id is not null
        and departments.name is not null
    )
  select
    *
  from
    (
      select
        (
          array_agg(
            jsonb_build_object(
              'id',
              jobs_cte.id,
              'job_title',
              jobs_cte.job_title
            )
          )
        )::jsonb[] as jobs
      from
        jobs_cte
    ) as jobs
    cross join (
      select
        (
          array_agg(
            jsonb_build_object(
              'id',
              departments_cte.id,
              'name',
              departments_cte.name
            )
          )
        )::jsonb[] as departments
      from
        departments_cte
    ) as departments;
end;
$function$
;


