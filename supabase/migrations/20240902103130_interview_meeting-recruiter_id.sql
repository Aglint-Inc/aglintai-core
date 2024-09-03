alter table "public"."interview_meeting" add column "recruiter_id" uuid;

alter table "public"."interview_meeting" add constraint "interview_meeting_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_meeting" validate constraint "interview_meeting_recruiter_id_fkey";

alter table "public"."interview_meeting" add column "job_id" uuid;

alter table "public"."interview_meeting" add constraint "interview_meeting_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_meeting" validate constraint "interview_meeting_job_id_fkey";

drop view if exists interview_data_view;

drop view if exists tasks_view;

drop view if exists meeting_interviewers;

drop view if exists meeting_details;

with interview_meeting_cte as (
    select 
        interview_meeting.id,
        applications.recruiter_id,
        applications.job_id
    from 
        interview_meeting
    left join
        applications on
            applications.id = interview_meeting.application_id
)
update "public"."interview_meeting"
set recruiter_id = interview_meeting_cte.recruiter_id, job_id = interview_meeting_cte.job_id
from interview_meeting_cte
where interview_meeting.id = interview_meeting_cte.id;

alter table "public"."interview_meeting" alter column "recruiter_id" set not null;

alter table "public"."interview_meeting" alter column "job_id" set not null;

create view
  public.meeting_interviewers as
with
  interview_data as (
    select
      interview_session_relation.id as session_relation_id,
      interview_session_relation.interviewer_type,
      interview_session_relation.training_type,
      interview_session_relation.is_confirmed,
      interview_session.meeting_id,
      interview_session.id as session_id,
      interview_session.session_type,
      interview_meeting.end_time,
      interview_meeting.start_time,
      interview_meeting.status,
      interview_session.session_duration,
      coalesce(
        debrief_user.first_name,
        recruiter_user.first_name
      ) as first_name,
      coalesce(debrief_user.last_name, recruiter_user.last_name) as last_name,
      coalesce(
        debrief_user.profile_image,
        recruiter_user.profile_image
      ) as profile_image,
      coalesce(debrief_user.email, recruiter_user.email) as email,
      coalesce(debrief_user.user_id, recruiter_user.user_id) as user_id,
      coalesce(
        (
          debrief_user.scheduling_settings -> 'timeZone'::text
        ) ->> 'tzCode'::text,
        (
          recruiter_user.scheduling_settings -> 'timeZone'::text
        ) ->> 'tzCode'::text
      ) as tz_code,
      coalesce(
        debrief_user."position",
        recruiter_user."position"
      ) as "position",
      interview_session_relation.accepted_status,
      (
        select
          json_agg(row_to_json(interview_session_cancel.*)) as json_agg
        from
          interview_session_cancel
        where
          interview_session_cancel.session_relation_id = interview_session_relation.id
      ) as cancel_reasons,
      interview_session_relation.interview_module_relation_id,
      interview_module_relation.module_id,
      case
        when interview_session.interview_plan_id is not null then interview_plan.job_id
        else applications.job_id
      end as job_id,
      coalesce(
        debrief_user.schedule_auth,
        recruiter_user.schedule_auth
      ) as schedule_auth,
      coalesce(
        debrief_user.scheduling_settings,
        recruiter_user.scheduling_settings
      ) as scheduling_settings
    from
      interview_session_relation
      left join interview_module_relation on interview_session_relation.interview_module_relation_id = interview_module_relation.id
      left join interview_session on interview_session.id = interview_session_relation.session_id
      left join interview_meeting on interview_meeting.id = interview_session.meeting_id
      left join interview_plan on interview_plan.id = interview_session.interview_plan_id
      left join applications on applications.id = interview_meeting.application_id
      left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
      left join recruiter_user debrief_user on debrief_user.user_id = interview_session_relation.user_id
  ),
  time_boundaries as (
    select
      current_date as today_start,
      current_date + '1 day'::interval - '00:00:01'::interval as today_end,
      date_trunc(
        'week'::text,
        current_date::timestamp with time zone
      ) + '1 day'::interval as week_start,
      date_trunc(
        'week'::text,
        current_date::timestamp with time zone
      ) + '7 days'::interval - '00:00:01'::interval as week_end
  )
select
  interview_data.session_relation_id,
  interview_data.interviewer_type,
  interview_data.training_type,
  interview_data.is_confirmed,
  interview_data.meeting_id,
  interview_data.session_id,
  interview_data.session_type,
  interview_data.first_name,
  interview_data.last_name,
  interview_data.profile_image,
  interview_data.email,
  interview_data.user_id,
  interview_data.tz_code,
  interview_data."position",
  (
    select
      count(*) as count
    from
      interview_data id2,
      time_boundaries tb
    where
      id2.user_id = interview_data.user_id
      and id2.end_time >= tb.today_start
      and id2.end_time <= tb.today_end
      and id2.is_confirmed = true
      and (
        id2.status = 'confirmed'::interview_schedule_status
        or id2.status = 'completed'::interview_schedule_status
      )
  ) as totalinterviewstoday,
  (
    select
      count(*) as count
    from
      interview_data id3,
      time_boundaries tb
    where
      id3.user_id = interview_data.user_id
      and id3.start_time >= tb.week_start
      and id3.end_time <= tb.week_end
      and id3.is_confirmed = true
      and (
        id3.status = 'confirmed'::interview_schedule_status
        or id3.status = 'completed'::interview_schedule_status
      )
  ) as totalinterviewsthisweek,
  (
    select
      coalesce(sum(id4.session_duration), 0::numeric) / 60.0
    from
      interview_data id4,
      time_boundaries tb
    where
      id4.user_id = interview_data.user_id
      and id4.end_time >= tb.today_start
      and id4.end_time <= tb.today_end
      and id4.is_confirmed = true
      and (
        id4.status = 'confirmed'::interview_schedule_status
        or id4.status = 'completed'::interview_schedule_status
      )
  ) as totalhourstoday,
  (
    select
      coalesce(sum(id5.session_duration), 0::numeric) / 60.0
    from
      interview_data id5,
      time_boundaries tb
    where
      id5.user_id = interview_data.user_id
      and id5.start_time >= tb.week_start
      and id5.end_time <= tb.week_end
      and id5.is_confirmed = true
      and (
        id5.status = 'confirmed'::interview_schedule_status
        or id5.status = 'completed'::interview_schedule_status
      )
  ) as totalhoursthisweek,
  interview_data.accepted_status,
  interview_data.cancel_reasons,
  interview_data.interview_module_relation_id,
  interview_data.module_id,
  interview_data.job_id,
  interview_data.schedule_auth,
  interview_data.scheduling_settings
from
  interview_data;

create or replace view "public"."tasks_view" as  WITH interview_session_cte AS (
         SELECT interview_session.id,
            interview_session.session_type,
            interview_session.name,
            interview_session.session_order,
                CASE
                    WHEN (interview_meeting.id IS NOT NULL) THEN json_build_object('id', interview_meeting.id, 'start_time', interview_meeting.start_time, 'end_time', interview_meeting.end_time, 'meeting_link', interview_meeting.meeting_link)
                    ELSE NULL::json
                END AS interview_meeting
           FROM (interview_session
             LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
        ), session_interviewers_cte AS (
         SELECT interview_session_cte.id,
            json_agg(
                CASE
                    WHEN (meeting_interviewers.session_id IS NOT NULL) THEN json_build_object('email', meeting_interviewers.email, 'user_id', meeting_interviewers.user_id, 'last_name', meeting_interviewers.last_name, 'first_name', meeting_interviewers.first_name, 'profile_image', meeting_interviewers.profile_image, 'training_type', meeting_interviewers.training_type, 'interviewer_type', meeting_interviewers.interviewer_type, 'is_confirmed', meeting_interviewers.is_confirmed)
                    ELSE NULL::json
                END) AS users
           FROM (interview_session_cte
             LEFT JOIN meeting_interviewers ON ((meeting_interviewers.session_id = interview_session_cte.id)))
          WHERE (meeting_interviewers.is_confirmed = true)
          GROUP BY interview_session_cte.id
        ), session_ids AS (
         SELECT interview_session_cte.id,
            interview_session_cte.session_type,
            interview_session_cte.name,
            interview_session_cte.session_order,
            interview_session_cte.interview_meeting,
            COALESCE(session_interviewers_cte.users, '[]'::json) AS users
           FROM (interview_session_cte
             LEFT JOIN session_interviewers_cte ON ((session_interviewers_cte.id = interview_session_cte.id)))
        ), task_session_ids_cte AS (
         SELECT task_session_relation.task_id,
            COALESCE(json_agg(session_ids.*) FILTER (WHERE (session_ids.id IS NOT NULL)), '[]'::json) AS session_ids
           FROM (task_session_relation
             LEFT JOIN session_ids ON ((session_ids.id = task_session_relation.session_id)))
          GROUP BY task_session_relation.task_id
        ), task_progress_cte AS (
         SELECT DISTINCT ON (new_tasks_progress.task_id) new_tasks_progress.task_id,
            json_build_object('id', new_tasks_progress.id, 'progress_type', new_tasks_progress.progress_type, 'created_at', new_tasks_progress.created_at, 'created_by', new_tasks_progress.created_by, 'jsonb_data', new_tasks_progress.jsonb_data, 'title_meta', new_tasks_progress.title_meta) AS latest_progress,
            new_tasks_progress.created_at
           FROM new_tasks_progress
          ORDER BY new_tasks_progress.task_id, new_tasks_progress.created_at DESC
        )
 SELECT new_tasks.id,
    new_tasks.created_at,
    new_tasks.name,
    new_tasks.due_date,
    new_tasks.assignee,
    new_tasks.start_date,
    new_tasks.application_id,
    new_tasks.recruiter_id,
    new_tasks.schedule_date_range,
    new_tasks.created_by,
    new_tasks.type,
    new_tasks.status,
    new_tasks.agent,
    new_tasks.filter_id,
    new_tasks.priority,
    new_tasks.task_owner,
    new_tasks.trigger_count,
    new_tasks.task_action,
    new_tasks.request_availability_id,
    COALESCE(task_session_ids_cte.session_ids, '[]'::json) AS session_ids,
    task_progress_cte.latest_progress
   FROM ((new_tasks
     LEFT JOIN task_session_ids_cte ON ((task_session_ids_cte.task_id = new_tasks.id)))
     LEFT JOIN task_progress_cte ON ((task_progress_cte.task_id = new_tasks.id)));

create view
  public.meeting_details as
select
  interview_meeting.id,
  interview_meeting.created_at,
  interview_meeting.meeting_json,
  interview_meeting.status,
  interview_meeting.instructions,
  interview_meeting.meeting_link,
  interview_meeting.confirmed_date,
  interview_meeting.start_time,
  interview_meeting.end_time,
  interview_meeting.cal_event_id,
  interview_meeting.candidate_feedback,
  interview_meeting.organizer_id,
  interview_session.id as session_id,
  interview_session.name as session_name,
  interview_session.break_duration,
  interview_session.session_order,
  interview_session.session_duration,
  interview_session.session_type,
  interview_session.schedule_type,
  interview_meeting.application_id,
  interview_meeting.meeting_flow,
  applications.job_id,
  public_jobs.recruiter_id,
  interview_session.module_id,
  (
    select
      array_agg(
        case
          when interview_session.session_type = 'debrief'::session_type then debrief_user.user_id
          else recruiter_user.user_id
        end
      ) as array_agg
    from
      interview_session_relation
      left join interview_module_relation on interview_session_relation.interview_module_relation_id = interview_module_relation.id
      left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
      left join recruiter_user debrief_user on debrief_user.user_id = interview_session_relation.user_id
    where
      interview_session_relation.session_id = interview_session.id
      and interview_session_relation.is_confirmed = true
  ) as confirmed_user_ids,
  (
    select
      array_agg(interview_module_relation.id) as array_agg
    from
      interview_session_relation
      left join interview_module_relation on interview_session_relation.interview_module_relation_id = interview_module_relation.id
    where
      interview_session_relation.session_id = interview_session.id
      and interview_session_relation.is_confirmed = true
  ) as confirmed_module_relation_ids,
  interview_session.parent_session_id
from
  interview_meeting
  left join interview_session on interview_meeting.id = interview_session.meeting_id
  left join applications on applications.id = interview_meeting.application_id
  left join public_jobs on applications.job_id = public_jobs.id;


create or replace view "public"."interview_data_view" as  SELECT row_to_json(ja.*) AS applications,
    json_build_object('id', cand.id, 'first_name', cand.first_name, 'last_name', cand.last_name, 'current_job_title', cand.current_job_title, 'timezone', cand.timezone, 'phone', cand.phone, 'email', cand.email) AS candidates,
    json_build_object('id', pj.id, 'job_title', pj.job_title, 'department_id', pj.department_id, 'recruiting_coordinator', pj.recruiting_coordinator) AS public_jobs,
    row_to_json(insc.*) AS schedule,
    ( SELECT jsonb_agg(interview_sessions.interview_session_meeting) AS jsonb_agg
           FROM ( SELECT jsonb_build_object('interview_session', row_to_json(intses.*), 'interview_meeting', row_to_json(intmeet.*)) AS interview_session_meeting
                   FROM ((interview_session intses
                     LEFT JOIN interview_meeting intmeet ON ((intmeet.id = intses.meeting_id)))
                     LEFT JOIN interview_schedule intsch ON ((intsch.id = intmeet.interview_schedule_id)))
                  WHERE (insc.id = intsch.id)
                  ORDER BY intses.session_order) interview_sessions) AS interview_session_meetings,
    ( SELECT application_logs.created_at
           FROM application_logs
          WHERE (application_logs.application_id = ja.id)
          ORDER BY application_logs.created_at DESC
         LIMIT 1) AS last_log_time,
    pj.recruiter_id,
    (((((cand.first_name)::text || ' '::text) || (cand.last_name)::text) || ' '::text) || cand.current_job_title) AS search_query
   FROM (((applications ja
     JOIN candidates cand ON ((ja.candidate_id = cand.id)))
     LEFT JOIN public_jobs pj ON ((pj.id = ja.job_id)))
     LEFT JOIN interview_schedule insc ON ((insc.application_id = ja.id)))
  WHERE ((ja.status = 'interview'::application_status) OR (insc.id IS NOT NULL));
