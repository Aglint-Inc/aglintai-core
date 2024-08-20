set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_reasons(recruiter_id uuid, jobs uuid[] DEFAULT NULL::uuid[], start_time date DEFAULT NULL::date, end_time date DEFAULT NULL::date)
 RETURNS TABLE(reason text, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      cancellations as (
        select
          interview_session_cancel.reason,
          interview_session_cancel.created_at::date as created_at,
          interview_session_cancel.type,
          applications.job_id,
          public_jobs.recruiter_id
        from
          interview_session_cancel
          left join interview_session on interview_session.id = interview_session_cancel.session_id
          left join interview_meeting on interview_meeting.id = interview_session.meeting_id
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_cancellation as (
        select
          cancellations.reason
        from
          cancellations
        where
          cancellations.recruiter_id = scheduling_analytics_reasons.recruiter_id
          and cancellations.type = 'declined'
          and cancellations.created_at <= coalesce(
            scheduling_analytics_reasons.end_time,
            (
              SELECT
                MAX(cancellations.created_at)
              FROM
                cancellations
            )
          )
          and cancellations.created_at >= coalesce(
            scheduling_analytics_reasons.start_time,
            (
              SELECT
                MIN(cancellations.created_at)
              FROM
                cancellations
            )
          )
          and cancellations.job_id <> ALL (COALESCE(scheduling_analytics_reasons.jobs, ARRAY[]::uuid[]))
      )
    select
      filtered_cancellation.reason,
      count(*)
    from
      filtered_cancellation
    where
      filtered_cancellation.reason is not null
    group by
      filtered_cancellation.reason;
END;
$function$
;


