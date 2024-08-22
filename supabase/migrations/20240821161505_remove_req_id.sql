alter table "public"."interview_meeting" drop constraint "interview_meeting_request_id_fkey";

drop view if exists "public"."all_interviewers";

drop view if exists "public"."application_view";

drop view if exists "public"."interview_data_view";

drop view if exists "public"."interview_types_view";

drop view if exists "public"."meeting_details";

drop view if exists "public"."module_relations_view";

drop view if exists "public"."tasks_view";

drop view if exists "public"."meeting_interviewers";

alter table "public"."interview_meeting" drop column "request_id";

create or replace view "public"."all_interviewers" as  SELECT ru.user_id,
    ru.first_name,
    ru.last_name,
    ru.email,
    ru.profile_image,
    ru."position",
    ru.schedule_auth,
    ru.scheduling_settings,
    ru.status,
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
    ru.is_calendar_connected
   FROM (((recruiter_user ru
     LEFT JOIN recruiter_relation recrel ON ((recrel.user_id = ru.user_id)))
     LEFT JOIN interview_module_relation intmodrel ON ((intmodrel.user_id = ru.user_id)))
     LEFT JOIN interview_module intmod ON ((intmod.id = intmodrel.module_id)))
  GROUP BY ru.user_id, recrel.recruiter_id;


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
    interview_meeting.interview_schedule_id,
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
    interview_schedule.application_id,
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
   FROM ((((interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)))
     LEFT JOIN interview_schedule ON ((interview_schedule.id = interview_meeting.interview_schedule_id)))
     LEFT JOIN applications ON ((applications.id = interview_schedule.application_id)))
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
        ), application_meeting_cte AS (
         SELECT application_candidate_cte_1.id,
            jsonb_agg(jsonb_build_object('meeting_id', meeting_details.id, 'session_id', meeting_details.session_id, 'session_duration', meeting_details.session_duration, 'session_name', meeting_details.session_name, 'session_order', meeting_details.session_order, 'schedule_type', meeting_details.schedule_type, 'session_type', meeting_details.session_type, 'status', meeting_details.status, 'date', jsonb_build_object('start_time', meeting_details.start_time, 'end_time', meeting_details.end_time), 'meeting_flow', meeting_details.meeting_flow)) AS meeting_details
           FROM (application_candidate_cte application_candidate_cte_1
             JOIN meeting_details ON ((meeting_details.application_id = application_candidate_cte_1.id)))
          GROUP BY application_candidate_cte_1.id
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
    COALESCE(application_meeting_cte.meeting_details, '[]'::jsonb) AS meeting_details,
    application_task_cte.task_count,
    application_logs_cte.activity_count,
    application_latest_activity_cte.latest_activity,
    application_candidate_cte.application_match,
    application_candidate_cte.candidate_id,
    application_candidate_cte.timezone
   FROM ((((application_candidate_cte
     LEFT JOIN application_meeting_cte ON ((application_meeting_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_task_cte ON ((application_task_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_logs_cte ON ((application_logs_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_latest_activity_cte ON ((application_latest_activity_cte.application_id = application_candidate_cte.id)));



