set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_recent_decline_reschedule(recruiter_id uuid, jobs uuid[] DEFAULT NULL::uuid[], start_time date DEFAULT NULL::date, end_time date DEFAULT NULL::date)
 RETURNS TABLE(profile_image text, name text, note text, id uuid, type cancel_type)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY   
    with
      requests as (
        select
          interview_session_cancel.created_at::date as created_at,
          interview_session_cancel.id,
          interview_session_cancel.type,
          interview_session_cancel.other_details ->> 'note' as note,
          applications.job_id,
          public_jobs.recruiter_id,
          recruiter_user.profile_image,
          (
            recruiter_user.first_name || ' ' || recruiter_user.last_name
          ) as name
        from
          interview_session_cancel
          left join interview_session_relation on interview_session_relation.id = interview_session_cancel.session_relation_id
          left join interview_module_relation on interview_module_relation.id = interview_session_relation.interview_module_relation_id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
          left join interview_session on interview_session.id = interview_session_relation.session_id
          left join interview_meeting on interview_meeting.id = interview_session.meeting_id
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_requests as (
        select
          requests.profile_image,
          requests.name,
          requests.note,
          requests.id,
          requests.type
        from
          requests
        where
          requests.recruiter_id = scheduling_analytics_recent_decline_reschedule.recruiter_id
          and requests.created_at <= coalesce(
            scheduling_analytics_recent_decline_reschedule.end_time,
            (
              SELECT
                MAX(requests.created_at)
              FROM
                requests
            )
          )
          and requests.created_at >= coalesce(
            scheduling_analytics_recent_decline_reschedule.start_time,
            (
              SELECT
                MIN(requests.created_at)
              FROM
                requests
            )
          )
          and requests.job_id <> ALL (COALESCE(scheduling_analytics_recent_decline_reschedule.jobs, ARRAY[]::uuid[]))
      )
    select
      *
    from
      filtered_requests;
END;
$function$
;


