set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_decline_requests(recruiter_id uuid, jobs uuid[] DEFAULT NULL::uuid[], start_time date DEFAULT NULL::date, end_time date DEFAULT NULL::date)
 RETURNS TABLE(completed_at date, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      requests as (
        select
          request.completed_at::date as completed_at,
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
          requests.completed_at
        from
          requests
        where
          requests.recruiter_id = scheduling_analytics_decline_requests.recruiter_id
          and (
            requests.type = 'decline_request'
            or requests.type = 'cancel_schedule_request'
          )
          and requests.completed_at <= coalesce(
            scheduling_analytics_decline_requests.end_time,
            (
              SELECT
                MAX(requests.completed_at)
              FROM
                requests
            )
          )
          and requests.completed_at >= coalesce(
            scheduling_analytics_decline_requests.start_time,
            (
              SELECT
                MIN(requests.completed_at)
              FROM
                requests
            )
          )
          and requests.job_id <> ALL (
            COALESCE(
              scheduling_analytics_decline_requests.jobs,
              ARRAY[]::uuid[]
            )
          )
      )
    select
      filtered_requests.completed_at,
      count(*)
    from
      filtered_requests
    group by
      filtered_requests.completed_at;

END;
$function$
;


