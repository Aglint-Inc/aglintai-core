drop function if exists "public"."scheduling_analytics_decline_requests"(recruiter_id uuid, jobs uuid[], start_time date, end_time date);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_decline_requests(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(completed_at date, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      requests as (
        select
          request.completed_at::date as date,
          request.type,
          applications.job_id,
          public_jobs.recruiter_id
        from
          request
          left join applications on applications.id = request.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_requests as (
        select
          date_trunc('month', requests.date)::date as date
        from
          requests
        where
          requests.recruiter_id = scheduling_analytics_decline_requests.recruiter_id
          and (
            requests.type = 'decline_request'
            or requests.type = 'cancel_schedule_request'
          )
          and requests.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_decline_requests.recruiter_id,
                  scheduling_analytics_decline_requests.departments,
                  scheduling_analytics_decline_requests.jobs
               )
            )
      ),
      valid_dates as (
          select
          filtered_requests.date,
          count(*)
        from
          filtered_requests
        group by
          filtered_requests.date
      ),
      date_series as (
        select
          generate_series(
            greatest(
              (
                date_trunc('month', now()::date)::date - '11 months'::interval
              )::date,
              (
                select
                  coalesce(
                    (
                      select
                        min(valid_dates.date)
                      from
                        valid_dates
                    ),
                    date_trunc('month', now())::date
                  )
              )
            )::date,
            date_trunc('month', now()::date)::date,
            '1 month'::interval
          ) as date
      )
    select
      (date_series.date)::date as date,
      coalesce(valid_dates.count, 0)::bigint as count
    from
      date_series
      left join valid_dates on valid_dates.date = date_series.date; 
END;
$function$
;


