drop view if exists "public"."application_view";

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



