delete from "public"."interview_filter_json";

delete from "public"."interview_session_cancel";

alter table "public"."interview_filter_json" drop constraint "public_interview_filter_json_schedule_id_fkey";

alter table "public"."interview_session_cancel" drop constraint "interview_session_cancel_schedule_id_fkey";

drop view if exists "public"."tasks_view";

drop view if exists "public"."meeting_interviewers";

alter table "public"."interview_filter_json" drop column "schedule_id";

alter table "public"."interview_filter_json" add column "application_id" uuid not null;

alter table "public"."interview_session_cancel" drop column "schedule_id";

alter table "public"."interview_session_cancel" add column "application_id" uuid;

alter table "public"."interview_filter_json" add constraint "interview_filter_json_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."interview_filter_json" validate constraint "interview_filter_json_application_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE SET NULL not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_application_id_fkey";

create or replace view "public"."meeting_interviewers" as  WITH interview_data AS (
         SELECT interview_session_relation.id AS session_relation_id,
            interview_session_relation.interviewer_type,
            interview_session_relation.training_type,
            interview_session_relation.is_confirmed,
            interview_session.meeting_id,
            interview_session.id AS session_id,
            interview_session.session_type,
            interview_meeting.end_time,
            interview_meeting.start_time,
            interview_meeting.status,
            interview_session.session_duration,
            COALESCE(debrief_user.first_name, recruiter_user.first_name) AS first_name,
            COALESCE(debrief_user.last_name, recruiter_user.last_name) AS last_name,
            COALESCE(debrief_user.profile_image, recruiter_user.profile_image) AS profile_image,
            COALESCE(debrief_user.email, recruiter_user.email) AS email,
            COALESCE(debrief_user.user_id, recruiter_user.user_id) AS user_id,
            COALESCE(((debrief_user.scheduling_settings -> 'timeZone'::text) ->> 'tzCode'::text), ((recruiter_user.scheduling_settings -> 'timeZone'::text) ->> 'tzCode'::text)) AS tz_code,
            COALESCE(debrief_user."position", recruiter_user."position") AS "position",
            interview_session_relation.accepted_status,
            ( SELECT json_agg(row_to_json(interview_session_cancel.*)) AS json_agg
                   FROM interview_session_cancel
                  WHERE (interview_session_cancel.session_relation_id = interview_session_relation.id)) AS cancel_reasons,
            interview_session_relation.interview_module_relation_id,
            interview_module_relation.module_id,
                CASE
                    WHEN (interview_session.interview_plan_id IS NOT NULL) THEN interview_plan.job_id
                    ELSE applications.job_id
                END AS job_id
           FROM ((((((((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
             LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
             LEFT JOIN interview_plan ON ((interview_plan.id = interview_session.interview_plan_id)))
             LEFT JOIN interview_schedule ON ((interview_meeting.interview_schedule_id = interview_schedule.id)))
             LEFT JOIN applications ON ((applications.id = interview_schedule.application_id)))
             LEFT JOIN recruiter_user ON ((recruiter_user.user_id = interview_module_relation.user_id)))
             LEFT JOIN recruiter_user debrief_user ON ((debrief_user.user_id = interview_session_relation.user_id)))
        ), time_boundaries AS (
         SELECT CURRENT_DATE AS today_start,
            ((CURRENT_DATE + '1 day'::interval) - '00:00:01'::interval) AS today_end,
            (date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '1 day'::interval) AS week_start,
            ((date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '7 days'::interval) - '00:00:01'::interval) AS week_end
        )
 SELECT interview_data.session_relation_id,
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
    ( SELECT count(*) AS count
           FROM interview_data id2,
            time_boundaries tb
          WHERE ((id2.user_id = interview_data.user_id) AND (id2.end_time >= tb.today_start) AND (id2.end_time <= tb.today_end) AND (id2.is_confirmed = true) AND ((id2.status = 'confirmed'::interview_schedule_status) OR (id2.status = 'completed'::interview_schedule_status)))) AS totalinterviewstoday,
    ( SELECT count(*) AS count
           FROM interview_data id3,
            time_boundaries tb
          WHERE ((id3.user_id = interview_data.user_id) AND (id3.start_time >= tb.week_start) AND (id3.end_time <= tb.week_end) AND (id3.is_confirmed = true) AND ((id3.status = 'confirmed'::interview_schedule_status) OR (id3.status = 'completed'::interview_schedule_status)))) AS totalinterviewsthisweek,
    ( SELECT (COALESCE(sum(id4.session_duration), (0)::numeric) / 60.0)
           FROM interview_data id4,
            time_boundaries tb
          WHERE ((id4.user_id = interview_data.user_id) AND (id4.end_time >= tb.today_start) AND (id4.end_time <= tb.today_end) AND (id4.is_confirmed = true) AND ((id4.status = 'confirmed'::interview_schedule_status) OR (id4.status = 'completed'::interview_schedule_status)))) AS totalhourstoday,
    ( SELECT (COALESCE(sum(id5.session_duration), (0)::numeric) / 60.0)
           FROM interview_data id5,
            time_boundaries tb
          WHERE ((id5.user_id = interview_data.user_id) AND (id5.start_time >= tb.week_start) AND (id5.end_time <= tb.week_end) AND (id5.is_confirmed = true) AND ((id5.status = 'confirmed'::interview_schedule_status) OR (id5.status = 'completed'::interview_schedule_status)))) AS totalhoursthisweek,
    interview_data.accepted_status,
    interview_data.cancel_reasons,
    interview_data.interview_module_relation_id,
    interview_data.module_id,
    interview_data.job_id
   FROM interview_data;


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



