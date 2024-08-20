drop function if exists "public"."scheduling_analytics_leaderboard"(recruiter_id uuid, jobs uuid[], start_time date, end_time date);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_leaderboard(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type text DEFAULT 'all_time'::text)
 RETURNS TABLE(name text, "position" text, profile_image text, user_id uuid, duration numeric, interviews bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
   with
      sessions as (
        select
          interview_session.session_duration,
          interview_meeting.status,
          interview_meeting.end_time,
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
          and sessions.end_time >= (
            case
              when scheduling_analytics_leaderboard.type = 'year' then (now() - '1 year'::interval)::date
              when scheduling_analytics_leaderboard.type = 'month' then (now() - '1 month'::interval)::date
              when scheduling_analytics_leaderboard.type = 'week' then (now() - '1 week'::interval)::date
              else '1900-01-01'::date
            end
          )
          and sessions.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_leaderboard.recruiter_id,
                  scheduling_analytics_leaderboard.departments,
                  scheduling_analytics_leaderboard.jobs
               )
            )
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


