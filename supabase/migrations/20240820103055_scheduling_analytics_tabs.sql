drop function if exists "public"."scheduling_analytics_tabs"(recruiter_id uuid, jobs uuid[]);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_tabs(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(cancelled bigint, waiting bigint, completed bigint, confirmed bigint, not_scheduled bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
      with
      meetings as (
         select
            interview_meeting.status,
            applications.job_id,
            public_jobs.recruiter_id
         from
            interview_meeting
            left join applications on applications.id = interview_meeting.application_id
            left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_meetings as (
         select
            meetings.status
         from
            meetings
         where
            meetings.recruiter_id = scheduling_analytics_tabs.recruiter_id
            and meetings.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_tabs.recruiter_id,
                  scheduling_analytics_tabs.departments,
                  scheduling_analytics_tabs.jobs
               )
            )
      )
      select
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'cancelled'
      ) as cancelled,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'waiting'
      ) as waiting,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'completed'
      ) as completed,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'confirmed'
      ) as confirmed,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'not_scheduled'
      ) as not_scheduled
      from
      filtered_meetings;
END;
$function$
;
