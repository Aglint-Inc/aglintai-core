alter table "public"."interview_meeting" drop constraint "public_interview_meeting_interview_schedule_id_fkey";

alter table "public"."interview_schedule" drop constraint "public_interview_schedule_created_by_fkey";

alter table "public"."request" drop constraint "request_assigner_id_fkey";

alter table "public"."request_log" drop constraint "request_log_request_id_fkey";

drop view if exists "public"."interview_data_view";

drop view if exists "public"."all_interviewers";

drop view if exists "public"."application_view";

drop view if exists "public"."interview_types_view";

drop view if exists "public"."meeting_details";

drop view if exists "public"."module_relations_view";

drop view if exists "public"."tasks_view";

drop view if exists "public"."meeting_interviewers";

drop index if exists "public"."interview_meeting_interview_schedule_id_idx";

alter table "public"."interview_meeting" drop column "interview_schedule_id";

alter table "public"."recruiter" alter column "primary_admin" set not null;

alter table "public"."recruiter_user" alter column "email" set not null;

alter table "public"."recruiter_user" alter column "first_name" set not null;

alter table "public"."request" alter column "assigner_id" drop not null;

CREATE UNIQUE INDEX recruiter_user_email_key ON public.recruiter_user USING btree (email);

alter table "public"."interview_schedule" add constraint "interview_schedule_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_schedule" validate constraint "interview_schedule_created_by_fkey";

alter table "public"."recruiter_user" add constraint "recruiter_user_email_key" UNIQUE using index "recruiter_user_email_key";

alter table "public"."request" add constraint "request_assigner_id_fkey" FOREIGN KEY (assigner_id) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."request" validate constraint "request_assigner_id_fkey";

alter table "public"."request_log" add constraint "request_log_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request_log" validate constraint "request_log_request_id_fkey";

set check_function_bodies = off;

create or replace view "public"."all_interviewers" as  SELECT ru.user_id,
    ru.first_name,
    ru.last_name,
    ru.email,
    ru.profile_image,
    ru."position",
    ru.schedule_auth,
    ru.scheduling_settings,
    ru.status,
    ru.department_id,
    ru.office_location_id,
    recrel.recruiter_id,
    COALESCE(array_agg(DISTINCT
        CASE
            WHEN (intmodrel.training_status = 'qualified'::status_training) THEN intmod.name
            ELSE NULL::text
        END), '{}'::text[]) AS qualified_module_names,
    COALESCE(array_agg(DISTINCT
        CASE
            WHEN (intmodrel.training_status = 'training'::status_training) THEN intmod.name
            ELSE NULL::text
        END), '{}'::text[]) AS training_module_names,
    (( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND (intm.status = 'confirmed'::interview_schedule_status) AND (intsesrel.is_confirmed = true))))::integer AS upcoming_meeting_count,
    (( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND (intm.status = 'completed'::interview_schedule_status) AND (intsesrel.is_confirmed = true))))::integer AS completed_meeting_count,
    ( SELECT (COALESCE(sum(intses.session_duration), (0)::numeric) / 60.0)
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '7 days'::interval)))) AS total_hours_this_week,
    ( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '7 days'::interval)))) AS total_interviews_this_week,
    ( SELECT (COALESCE(sum(intses.session_duration), (0)::numeric) / 60.0)
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= CURRENT_DATE) AND (intm.start_time < (CURRENT_DATE + '1 day'::interval)))) AS total_hours_today,
    ( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= CURRENT_DATE) AND (intm.start_time < (CURRENT_DATE + '1 day'::interval)))) AS total_interviews_today,
    ru.is_calendar_connected,
    ( SELECT jsonb_object_agg(daily_counts.day, daily_counts.meeting_count) AS jsonb_object_agg
           FROM ( SELECT date_trunc('day'::text, intm.start_time) AS day,
                    count(*) AS meeting_count
                   FROM (((interview_session_relation intsesrel
                     JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
                     JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
                     JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
                  WHERE ((intmodrel_1.user_id = ru.user_id) AND (intm.status = 'completed'::interview_schedule_status) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= (CURRENT_DATE - '1 mon'::interval)))
                  GROUP BY (date_trunc('day'::text, intm.start_time))) daily_counts) AS completed_meeting_last_month,
    ( SELECT COALESCE(array_agg(DISTINCT interview_plan.job_id), ARRAY[]::uuid[]) AS "coalesce"
           FROM (((((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN recruiter_user ON ((interview_module_relation.user_id = recruiter_user.user_id)))
             LEFT JOIN recruiter_user debrief_user ON ((interview_session_relation.user_id = recruiter_user.user_id)))
             LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
             LEFT JOIN interview_plan ON ((interview_plan.id = interview_session.interview_plan_id)))
          WHERE ((interview_plan.job_id IS NOT NULL) AND ((ru.user_id = recruiter_user.user_id) OR (ru.user_id = debrief_user.user_id)))) AS job_ids
   FROM (((recruiter_user ru
     LEFT JOIN recruiter_relation recrel ON ((recrel.user_id = ru.user_id)))
     LEFT JOIN interview_module_relation intmodrel ON ((intmodrel.user_id = ru.user_id)))
     LEFT JOIN interview_module intmod ON ((intmod.id = intmodrel.module_id)))
  GROUP BY ru.user_id, recrel.recruiter_id;


create or replace view "public"."application_view" as  WITH application_candidate_cte AS (
         SELECT application_status_view.id,
            application_status_view.job_id,
            application_status_view.created_at,
            application_status_view.applied_at,
            application_status_view.interview_score,
            application_status_view.processing_status,
            application_status_view.bookmarked,
            application_status_view.is_new,
            application_status_view.status,
            application_status_view.badges,
            application_status_view.candidate_id,
            application_status_view.candidate_file_id,
            application_status_view.file_url,
            application_status_view.resume_processing_state,
            application_status_view.resume_score,
            application_status_view.application_match,
            candidates.email,
            TRIM(BOTH FROM (((COALESCE(candidates.first_name, ''::citext))::text || ' '::text) || (COALESCE(candidates.last_name, ''::citext))::text)) AS name,
            candidates.city,
            candidates.linkedin,
            candidates.phone,
            candidates.state,
            candidates.country,
            candidates.current_job_title,
            candidates.timezone
           FROM (application_status_view
             LEFT JOIN candidates ON ((candidates.id = application_status_view.candidate_id)))
        ), meetings_cte AS (
         SELECT interview_meeting.application_id,
            interview_plan.id,
            interview_plan.plan_order,
            interview_plan.name,
            interview_meeting.status,
            interview_session.name AS session_name
           FROM ((interview_session
             JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
             JOIN interview_plan ON ((interview_plan.id = interview_session.interview_plan_id)))
        ), applications_all_meeting_cte AS (
         SELECT application_candidate_cte_1.id AS application_id,
            COALESCE(array_agg(meetings_cte.session_name) FILTER (WHERE (meetings_cte.session_name IS NOT NULL)), ARRAY[]::text[]) AS session_names
           FROM (application_candidate_cte application_candidate_cte_1
             LEFT JOIN meetings_cte ON ((meetings_cte.application_id = application_candidate_cte_1.id)))
          GROUP BY application_candidate_cte_1.id
        ), application_meeting_cte AS (
         SELECT meetings_cte.application_id,
            meetings_cte.id,
            meetings_cte.plan_order,
            meetings_cte.name,
            json_build_object('not_scheduled', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'not_scheduled'::interview_schedule_status)), 'confirmed', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'confirmed'::interview_schedule_status)), 'completed', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'completed'::interview_schedule_status)), 'waiting', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'waiting'::interview_schedule_status)), 'cancelled', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'cancelled'::interview_schedule_status)), 'reschedule', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'reschedule'::interview_schedule_status))) AS status
           FROM meetings_cte
          GROUP BY meetings_cte.application_id, meetings_cte.id, meetings_cte.plan_order, meetings_cte.name
        ), application_plan_cte AS (
         SELECT application_meeting_cte.application_id AS id,
            array_agg(json_build_object('id', application_meeting_cte.id, 'plan_order', application_meeting_cte.plan_order, 'name', application_meeting_cte.name, 'status', application_meeting_cte.status) ORDER BY application_meeting_cte.plan_order) AS interview_plans
           FROM application_meeting_cte
          GROUP BY application_meeting_cte.application_id
        ), application_task_cte AS (
         SELECT application_candidate_cte_1.id,
            COALESCE(count(new_tasks.application_id), (0)::bigint) AS task_count
           FROM (application_candidate_cte application_candidate_cte_1
             LEFT JOIN new_tasks ON ((new_tasks.application_id = application_candidate_cte_1.id)))
          GROUP BY application_candidate_cte_1.id
        ), application_logs_cte AS (
         SELECT application_candidate_cte_1.id,
            COALESCE(count(application_logs.application_id), (0)::bigint) AS activity_count
           FROM (application_candidate_cte application_candidate_cte_1
             LEFT JOIN application_logs ON ((application_logs.application_id = application_candidate_cte_1.id)))
          GROUP BY application_candidate_cte_1.id
        ), application_latest_activity_cte AS (
         SELECT DISTINCT ON (application_logs.application_id) application_logs.application_id,
            application_logs.created_at AS latest_activity
           FROM application_logs
          ORDER BY application_logs.application_id, application_logs.created_at DESC
        )
 SELECT application_candidate_cte.id,
    application_candidate_cte.job_id,
    application_candidate_cte.created_at,
    application_candidate_cte.applied_at,
    application_candidate_cte.resume_score,
    application_candidate_cte.interview_score,
    application_candidate_cte.processing_status,
    application_candidate_cte.bookmarked,
    application_candidate_cte.is_new,
    application_candidate_cte.status,
    application_candidate_cte.badges,
    application_candidate_cte.candidate_file_id,
    application_candidate_cte.email,
    application_candidate_cte.name,
    application_candidate_cte.city,
    application_candidate_cte.linkedin,
    application_candidate_cte.phone,
    application_candidate_cte.state,
    application_candidate_cte.country,
    application_candidate_cte.current_job_title,
    application_candidate_cte.file_url,
    application_candidate_cte.resume_processing_state,
    application_task_cte.task_count,
    application_logs_cte.activity_count,
    application_latest_activity_cte.latest_activity,
    application_candidate_cte.application_match,
    application_candidate_cte.candidate_id,
    application_candidate_cte.timezone,
    applications_all_meeting_cte.session_names,
    COALESCE(application_plan_cte.interview_plans, ARRAY[]::json[]) AS interview_plans
   FROM (((((application_candidate_cte
     LEFT JOIN application_plan_cte ON ((application_plan_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_task_cte ON ((application_task_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_logs_cte ON ((application_logs_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_latest_activity_cte ON ((application_latest_activity_cte.application_id = application_candidate_cte.id)))
     LEFT JOIN applications_all_meeting_cte ON ((applications_all_meeting_cte.application_id = application_candidate_cte.id)));



create or replace view "public"."interview_types_view" as  SELECT intmod.id,
    intmod.name,
    intmod.department_id,
    intmod.created_by,
    intmod.is_archived,
    intmod.description,
    intmod.recruiter_id,
    departments.name AS department_name,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('user_id', ru.user_id, 'first_name', ru.first_name, 'last_name', ru.last_name, 'email', ru.email, 'profile_image', ru.profile_image, 'position', ru."position")) AS jsonb_agg
           FROM recruiter_user ru
          WHERE (ru.user_id IN ( SELECT intmodrel.user_id
                   FROM interview_module_relation intmodrel
                  WHERE ((intmodrel.module_id = intmod.id) AND (intmodrel.is_archived = false))))), '[]'::jsonb) AS users,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'confirmed'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS upcoming_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'completed'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS completed_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'cancelled'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS canceled_meeting_count
   FROM (interview_module intmod
     LEFT JOIN departments ON ((departments.id = intmod.department_id)))
  ORDER BY intmod.created_at DESC;


create or replace view "public"."meeting_details" as  SELECT interview_meeting.id,
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
    interview_session.id AS session_id,
    interview_session.name AS session_name,
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
    ( SELECT array_agg(
                CASE
                    WHEN (interview_session.session_type = 'debrief'::session_type) THEN debrief_user.user_id
                    ELSE recruiter_user.user_id
                END) AS array_agg
           FROM (((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN recruiter_user ON ((recruiter_user.user_id = interview_module_relation.user_id)))
             LEFT JOIN recruiter_user debrief_user ON ((debrief_user.user_id = interview_session_relation.user_id)))
          WHERE ((interview_session_relation.session_id = interview_session.id) AND (interview_session_relation.is_confirmed = true))) AS confirmed_user_ids,
    ( SELECT array_agg(interview_module_relation.id) AS array_agg
           FROM (interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
          WHERE ((interview_session_relation.session_id = interview_session.id) AND (interview_session_relation.is_confirmed = true))) AS confirmed_module_relation_ids,
    interview_session.parent_session_id
   FROM (((interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)))
     LEFT JOIN applications ON ((applications.id = interview_meeting.application_id)))
     LEFT JOIN public_jobs ON ((applications.job_id = public_jobs.id)));


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
                END AS job_id,
            COALESCE(debrief_user.schedule_auth, recruiter_user.schedule_auth) AS schedule_auth,
            COALESCE(debrief_user.scheduling_settings, recruiter_user.scheduling_settings) AS scheduling_settings
           FROM (((((((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
             LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
             LEFT JOIN interview_plan ON ((interview_plan.id = interview_session.interview_plan_id)))
             LEFT JOIN applications ON ((applications.id = interview_meeting.application_id)))
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
    interview_data.job_id,
    interview_data.schedule_auth,
    interview_data.scheduling_settings
   FROM interview_data;


create or replace view "public"."module_relations_view" as  WITH interview_data AS (
         SELECT interview_module_relation.id,
            interview_module_relation.pause_json,
            interview_module_relation.training_status AS module_training_status,
            interview_module_relation.user_id,
            interview_module_relation.module_id,
            interview_module_relation.number_of_shadow,
            interview_module_relation.number_of_reverse_shadow,
            interview_module_relation.is_archived,
            recruiter_user.first_name,
            recruiter_user."position",
            recruiter_user.profile_image,
            recruiter_user.scheduling_settings,
            recruiter_user.phone,
            interview_module.name AS module_name,
            interview_module.description AS module_description,
            ( SELECT json_agg(json_build_object('interview_session', row_to_json(interview_session.*), 'interview_meeting', row_to_json(interview_meeting.*), 'interview_session_relation', row_to_json(interview_session_relation.*))) AS json_agg
                   FROM (((interview_session_relation
                     LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
                     LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
                     LEFT JOIN interview_module interview_module_1 ON ((interview_module_1.id = interview_session.module_id)))
                  WHERE ((interview_session_relation.interview_module_relation_id = interview_module_relation.id) AND ((interview_meeting.status = 'completed'::interview_schedule_status) OR (interview_meeting.status = 'confirmed'::interview_schedule_status)) AND (interview_session_relation.is_confirmed = true))) AS meetings
           FROM ((interview_module_relation
             LEFT JOIN interview_module ON ((interview_module.id = interview_module_relation.module_id)))
             LEFT JOIN recruiter_user ON ((interview_module_relation.user_id = recruiter_user.user_id)))
        )
 SELECT interview_data.id,
    interview_data.pause_json,
    interview_data.module_training_status,
    interview_data.user_id,
    interview_data.module_id,
    interview_data.number_of_shadow,
    interview_data.number_of_reverse_shadow,
    interview_data.first_name,
    interview_data."position",
    interview_data.profile_image,
    interview_data.scheduling_settings,
    interview_data.phone,
    interview_data.meetings,
    interview_data.module_name,
    interview_data.module_description,
    interview_data.is_archived,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS completed_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS cancelled_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS confirmed_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_completed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_completed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'confirmed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_confirmed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'confirmed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_confirmed_count
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


CREATE OR REPLACE FUNCTION public.trigger_application_disqualification()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  UPDATE interview_meeting
  SET status = 'cancelled'
  WHERE id IN (
    SELECT interview_meeting.id
    FROM interview_meeting 
    WHERE interview_meeting.application_id = NEW.id
      AND interview_meeting.status NOT IN ('cancelled', 'completed', 'not_scheduled')
  );
  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.trigger_clone_interview_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    company_id uuid;
    session_rec record;
    sesn_reln_record record;
    inserted_sesn_id uuid;
    inserted_meet_id uuid;
    inserted_plan_id uuid;
    int_plan_loop record;
BEGIN
  
    -- Loop through each interview plan related to the job
    FOR int_plan_loop IN 
        SELECT 
            interview_plan.id AS plan_id,
            interview_plan.name,
            interview_plan.plan_order
        FROM interview_plan 
        WHERE interview_plan.job_id = NEW.job_id
    LOOP
        -- Insert into interview_plan and get the inserted plan_id
        INSERT INTO interview_plan (name, plan_order, recruiter_id, application_id)
        VALUES (int_plan_loop.name, int_plan_loop.plan_order, NEW.recruiter_id, NEW.id)
        RETURNING id INTO inserted_plan_id;

        FOR session_rec IN
            SELECT 
                interview_session.id AS id,
                interview_session.break_duration,
                interview_session.interviewer_cnt,
                interview_session.location,
                interview_session.module_id,
                interview_session.name,
                interview_session.schedule_type,
                interview_session.session_duration,
                interview_session.session_order,
                interview_session.session_type,
                interview_session.recruiter_id
            FROM interview_session
            WHERE interview_session.interview_plan_id = int_plan_loop.plan_id
        LOOP
            -- Insert interview meeting and session within a single SQL command using CTEs
            WITH inserted_meeting_cte AS (
                INSERT INTO interview_meeting ( status, application_id, recruiter_id, job_id)
                VALUES ( 'not_scheduled', NEW.id, NEW.recruiter_id, NEW.job_id)
                RETURNING id
            ),
            inserted_session_cte AS (
                INSERT INTO interview_session (
                    break_duration,
                    interviewer_cnt,
                    location,
                    module_id,
                    name,
                    schedule_type,
                    session_duration,
                    session_order,
                    session_type,
                    parent_session_id,
                    meeting_id,
                    interview_plan_id,
                    recruiter_id
                )
                VALUES (
                    session_rec.break_duration,
                    session_rec.interviewer_cnt,
                    session_rec.location,
                    session_rec.module_id,
                    session_rec.name,
                    session_rec.schedule_type,
                    session_rec.session_duration,
                    session_rec.session_order,
                    session_rec.session_type,
                    session_rec.id,
                    (SELECT id FROM inserted_meeting_cte),
                    inserted_plan_id,
                    session_rec.recruiter_id
                )
                RETURNING id
            )
            SELECT 
                (SELECT id FROM inserted_meeting_cte),
                (SELECT id FROM inserted_session_cte)
            INTO inserted_meet_id, inserted_sesn_id;

            -- Insert relations for the session
            FOR sesn_reln_record IN 
            (
                SELECT 
                    interview_session_relation.interview_module_relation_id,
                    interview_session_relation.interviewer_type,
                    interview_session_relation.user_id,
                    interview_session_relation.training_type
                FROM interview_session_relation 
                WHERE interview_session_relation.session_id = session_rec.id
            )
            LOOP
                INSERT INTO interview_session_relation(
                    interview_module_relation_id,
                    interviewer_type,
                    user_id,
                    training_type,
                    session_id
                ) 
                VALUES (
                    sesn_reln_record.interview_module_relation_id,
                    sesn_reln_record.interviewer_type,
                    sesn_reln_record.user_id,
                    sesn_reln_record.training_type,
                    inserted_sesn_id
                );
            END LOOP;
        END LOOP;
    END LOOP;

    RETURN NEW;
END;
$function$
;


