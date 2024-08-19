set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_leaderboard(recruiter_id uuid, jobs uuid[] DEFAULT NULL::uuid[], start_time date DEFAULT NULL::date, end_time date DEFAULT NULL::date)
 RETURNS TABLE(name text, "position" text, profile_image text, user_id uuid, duration numeric, interviews bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
   with
      sessions as (
        select
          interview_session.session_duration,
          interview_meeting.start_time::date as start_time,
          interview_meeting.end_time::date as end_time,
          interview_meeting.status,
          recruiter_user.user_id,
          recruiter_user.profile_image,
          (
            recruiter_user.first_name || ' ' || recruiter_user.last_name
          ) as name,
          recruiter_user.position,
          applications.job_id,
          public_jobs.recruiter_id
        from
          interview_session_relation
          left join interview_module_relation on interview_module_relation.id = interview_module_relation.id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
          left join interview_session on interview_session.id = interview_session_relation.session_id
          left join interview_meeting on interview_meeting.id = interview_session.meeting_id
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_users as (
        select
          sessions.session_duration,
          sessions.name,
          sessions.position,
          sessions.profile_image,
          sessions.user_id
        from
          sessions
        where
          sessions.recruiter_id = scheduling_analytics_leaderboard.recruiter_id
          and sessions.status = 'completed'
          and sessions.end_time <= coalesce(
            scheduling_analytics_leaderboard.end_time,
            (
              SELECT
                MAX(sessions.end_time)
              FROM
                sessions
            )
          )
          and sessions.end_time >= coalesce(
            scheduling_analytics_leaderboard.start_time,
            (
              SELECT
                MIN(sessions.end_time)
              FROM
                sessions
            )
          )
          and sessions.job_id <> ALL (COALESCE(scheduling_analytics_leaderboard.jobs, ARRAY[]::uuid[]))
      )
    select
      filtered_users.name,
      filtered_users.position,
      filtered_users.profile_image,
      filtered_users.user_id,
      sum(filtered_users.session_duration) as duration,
      count(*) as interviews
    from
      filtered_users
    group by
      filtered_users.name,
      filtered_users.position,
      filtered_users.profile_image,
      filtered_users.user_id
    order by
      duration desc,
      interviews desc;
END;
$function$
;


