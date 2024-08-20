drop function if exists "public"."scheduling_analytics_reasons"(recruiter_id uuid, jobs uuid[], start_time date, end_time date);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_reasons(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type cancel_type DEFAULT 'declined'::cancel_type)
 RETURNS TABLE(reason text, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      cancellations as (
        select
          interview_session_cancel.reason,
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
          and cancellations.type = scheduling_analytics_reasons.type
          and cancellations.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_reasons.recruiter_id,
                  scheduling_analytics_reasons.departments,
                  scheduling_analytics_reasons.jobs
               )
            )
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


