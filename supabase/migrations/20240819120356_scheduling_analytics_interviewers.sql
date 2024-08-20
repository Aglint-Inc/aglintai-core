set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_interviewers(recruiter_id uuid, type status_training DEFAULT 'qualified'::status_training, jobs uuid[] DEFAULT NULL::uuid[], start_time date DEFAULT NULL::date, end_time date DEFAULT NULL::date)
 RETURNS TABLE(name text, user_id uuid, profile_image text, accepted bigint, declined bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      interviewers as (
          select
            interview_session_relation.accepted_status,
            interview_module_relation.training_status,
            interview_meeting.created_at::date as created_at,
            applications.job_id,
            public_jobs.recruiter_id,
            recruiter_user.user_id,
            (
              recruiter_user.first_name || ' ' || recruiter_user.last_name
            ) as name,
            recruiter_user.profile_image
          from
            interview_session_relation
            left join interview_module_relation on interview_module_relation.id = interview_session_relation.interview_module_relation_id
            left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
            left join interview_session on interview_session.id = interview_session_relation.session_id
            left join interview_meeting on interview_meeting.id = interview_session.meeting_id
            left join applications on applications.id = interview_meeting.application_id
            left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_interviewers as (
        select
          interviewers.user_id,
          interviewers.profile_image,
          interviewers.name,
          interviewers.accepted_status
        from
          interviewers
        where
          interviewers.recruiter_id = scheduling_analytics_interviewers.recruiter_id
          and interviewers.training_status = scheduling_analytics_interviewers.type
          and (
            interviewers.accepted_status = 'accepted'
            or interviewers.accepted_status = 'declined'
          )
          and interviewers.created_at <= coalesce(
            scheduling_analytics_interviewers.end_time,
            (
              SELECT
                MAX(interviewers.created_at)
              FROM
                interviewers
            )
          )
          and interviewers.created_at >= coalesce(
            scheduling_analytics_interviewers.start_time,
            (
              SELECT
                MIN(interviewers.created_at)
              FROM
                interviewers
            )
          )
          and interviewers.job_id <> ALL (COALESCE(scheduling_analytics_interviewers.jobs, ARRAY[]::uuid[]))
      )
    select
      filtered_interviewers.name,
      filtered_interviewers.user_id,
      filtered_interviewers.profile_image,
      COUNT(*) FILTER (
        WHERE
          filtered_interviewers.accepted_status = 'accepted'
      ) as accepted,
      COUNT(*) FILTER (
        WHERE
          filtered_interviewers.accepted_status = 'declined'
      ) as declined
    from
      filtered_interviewers
    group by
      filtered_interviewers.name,
      filtered_interviewers.user_id,
      filtered_interviewers.profile_image;
END;
$function$
;


