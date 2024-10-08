drop trigger if exists "interview_plan_warning" on "public"."interview_plan";

drop trigger if exists "interview_session_warning" on "public"."interview_session";

drop function if exists "public"."trigger_interview_plan_warning"();

drop function if exists "public"."trigger_interview_session_warning"();

drop view if exists "public"."application_view";

drop view if exists "public"."candidate_applications_view";

drop view if exists "public"."interview_types_view";

drop view if exists "public"."job_view";

drop view if exists "public"."meeting_details";

drop view if exists "public"."workflow_view";

drop view if exists "public"."application_status_view";

alter table "public"."public_jobs" drop column "interview_plan_warning_ignore";

alter table "public"."public_jobs" drop column "interview_session_warning_ignore";

create or replace view "public"."application_status_view" as  WITH processing_state_cte AS (
         SELECT applications.id,
            applications.job_id,
            applications.created_at,
            applications.applied_at,
            applications.overall_interview_score AS interview_score,
            applications.processing_status,
            applications.bookmarked,
            applications.is_new,
            applications.status,
            (applications.score_json -> 'badges'::text) AS badges,
            applications.candidate_id,
            applications.candidate_file_id,
            candidate_files.file_url,
                CASE
                    WHEN (applications.is_resume_fetching = true) THEN 'fetching'::resume_processing_state
                    WHEN (candidate_files.file_url IS NULL) THEN 'unavailable'::resume_processing_state
                    WHEN ((applications.processing_status = 'not started'::application_processing_status) OR (applications.processing_status = 'processing'::application_processing_status)) THEN 'processing'::resume_processing_state
                    WHEN ((applications.score_json -> 'scores'::text) IS NOT NULL) THEN 'processed'::resume_processing_state
                    ELSE 'unparsable'::resume_processing_state
                END AS resume_processing_state,
            (applications.score_json -> 'scores'::text) AS scores
           FROM (applications
             LEFT JOIN candidate_files ON ((candidate_files.id = applications.candidate_file_id)))
        ), resume_processing_state AS (
         SELECT processing_state_cte.id,
            processing_state_cte.job_id,
            processing_state_cte.created_at,
            processing_state_cte.applied_at,
            processing_state_cte.interview_score,
            processing_state_cte.processing_status,
            processing_state_cte.bookmarked,
            processing_state_cte.is_new,
            processing_state_cte.status,
            processing_state_cte.badges,
            processing_state_cte.candidate_id,
            processing_state_cte.candidate_file_id,
            processing_state_cte.file_url,
                CASE
                    WHEN (processing_state_cte.resume_processing_state = 'fetching'::resume_processing_state) THEN 'fetching'::resume_processing_state
                    WHEN (processing_state_cte.resume_processing_state = 'unavailable'::resume_processing_state) THEN 'unavailable'::resume_processing_state
                    WHEN COALESCE((recruiter_preferences.scoring <> true), true) THEN 'unscorable'::resume_processing_state
                    ELSE processing_state_cte.resume_processing_state
                END AS resume_processing_state,
                CASE
                    WHEN (processing_state_cte.resume_processing_state = 'fetching'::resume_processing_state) THEN ('-2'::integer)::numeric
                    WHEN (processing_state_cte.resume_processing_state = 'unparsable'::resume_processing_state) THEN ('-3'::integer)::numeric
                    WHEN (processing_state_cte.resume_processing_state = 'unavailable'::resume_processing_state) THEN ('-4'::integer)::numeric
                    WHEN COALESCE((recruiter_preferences.scoring <> true), true) THEN ('-5'::integer)::numeric
                    WHEN ((processing_state_cte.resume_processing_state = 'processed'::resume_processing_state) AND (public_jobs.parameter_weights IS NOT NULL)) THEN ( SELECT score_application(processing_state_cte.scores, public_jobs.parameter_weights) AS score_application)
                    ELSE ('-1'::integer)::numeric
                END AS resume_score
           FROM ((processing_state_cte
             LEFT JOIN public_jobs ON ((public_jobs.id = processing_state_cte.job_id)))
             LEFT JOIN recruiter_preferences ON ((public_jobs.recruiter_id = recruiter_preferences.recruiter_id)))
        )
 SELECT resume_processing_state.id,
    resume_processing_state.job_id,
    resume_processing_state.created_at,
    resume_processing_state.applied_at,
    resume_processing_state.interview_score,
    resume_processing_state.processing_status,
    resume_processing_state.bookmarked,
    resume_processing_state.is_new,
    resume_processing_state.status,
    resume_processing_state.badges,
    resume_processing_state.candidate_id,
    resume_processing_state.candidate_file_id,
    resume_processing_state.file_url,
    resume_processing_state.resume_processing_state,
    resume_processing_state.resume_score,
        CASE
            WHEN (resume_processing_state.resume_score >= (80)::numeric) THEN 'top_match'::application_match
            WHEN ((resume_processing_state.resume_score >= (60)::numeric) AND (resume_processing_state.resume_score < (80)::numeric)) THEN 'good_match'::application_match
            WHEN ((resume_processing_state.resume_score >= (40)::numeric) AND (resume_processing_state.resume_score < (60)::numeric)) THEN 'average_match'::application_match
            WHEN ((resume_processing_state.resume_score >= (20)::numeric) AND (resume_processing_state.resume_score < (40)::numeric)) THEN 'poor_match'::application_match
            WHEN ((resume_processing_state.resume_score >= (0)::numeric) AND (resume_processing_state.resume_score < (20)::numeric)) THEN 'not_a_match'::application_match
            ELSE 'unknown_match'::application_match
        END AS application_match
   FROM resume_processing_state;


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


create or replace view "public"."candidate_applications_view" as  SELECT concat(candidates.first_name, ' ', candidates.last_name) AS candidate_name,
    candidates.id AS candidate_id,
    candidates.email AS candidate_email,
    applications.job_id,
    applications.id AS application_id,
    applications.status AS application_status,
    to_tsvector((((candidates.first_name)::text || ' '::text) || (candidates.last_name)::text)) AS full_text_search,
    public_jobs.job_title AS job_role,
    candidates.recruiter_id AS company_id
   FROM ((applications
     LEFT JOIN candidates ON ((candidates.id = applications.candidate_id)))
     LEFT JOIN public_jobs ON ((public_jobs.id = applications.job_id)));


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
          WHERE ((intm.status = 'cancelled'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS canceled_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'confirmed'::interview_schedule_status) AND (inses.module_id = intmod.id) AND (intm.start_time >= date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone) + '1 mon'::interval)))))::integer AS this_month_confirmed_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'completed'::interview_schedule_status) AND (inses.module_id = intmod.id) AND (intm.start_time >= date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone) + '1 mon'::interval)))))::integer AS this_month_completed_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'cancelled'::interview_schedule_status) AND (inses.module_id = intmod.id) AND (intm.start_time >= date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone) + '1 mon'::interval)))))::integer AS this_month_cancelled_meeting_count,
    ( SELECT COALESCE((avg((EXTRACT(epoch FROM (intm.end_time - intm.start_time)) / (60)::numeric)))::integer, 0) AS avg_duration_minutes
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'completed'::interview_schedule_status) AND (inses.module_id = intmod.id) AND (intm.start_time >= date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone) + '1 mon'::interval)))) AS avg_meeting_duration,
    ( SELECT COALESCE(array_agg(DISTINCT public_jobs.job_title), ARRAY[]::text[]) AS "coalesce"
           FROM (((interview_meeting
             LEFT JOIN interview_session ON ((interview_session.meeting_id = interview_meeting.id)))
             LEFT JOIN applications ON ((applications.id = interview_meeting.application_id)))
             LEFT JOIN public_jobs ON ((public_jobs.id = applications.job_id)))
          WHERE ((interview_session.module_id = intmod.id) AND (public_jobs.status = 'published'::public_job_status))) AS job_names
   FROM (interview_module intmod
     LEFT JOIN departments ON ((departments.id = intmod.department_id)))
  ORDER BY intmod.created_at DESC;


create or replace view "public"."job_view" as  WITH application_status_view_cte AS (
         SELECT application_status_view.status,
            application_status_view.job_id,
            application_status_view.resume_processing_state,
            application_status_view.application_match
           FROM application_status_view
        ), job_cte AS (
         SELECT public_jobs.created_at,
            public_jobs.department_id,
            departments.name AS department,
            public_jobs.description,
            public_jobs.draft,
            public_jobs.id,
            public_jobs.jd_json,
            public_jobs.job_title,
            public_jobs.job_type,
            public_jobs.location_id,
            row_to_json(office_locations.*) AS location,
            public_jobs.parameter_weights,
            public_jobs.posted_by,
            public_jobs.recruiter_id,
            public_jobs.scoring_criteria_loading,
            public_jobs.status,
            public_jobs.workplace_type,
            public_jobs.hiring_manager,
            public_jobs.recruiter,
            public_jobs.recruiting_coordinator,
            public_jobs.sourcer,
            public_jobs.interview_coordinator,
            public_jobs.remote_sync_time,
            public_jobs.is_pinned,
                CASE
                    WHEN ((public_jobs.posted_by = 'Ashby'::text) AND (integrations.ashby_key IS NOT NULL)) THEN true
                    WHEN ((public_jobs.posted_by = 'Lever'::text) AND (integrations.lever_key IS NOT NULL)) THEN true
                    WHEN ((public_jobs.posted_by = 'Greenhouse'::text) AND (integrations.greenhouse_key IS NOT NULL)) THEN true
                    ELSE false
                END AS syncable
           FROM (((public_jobs
             LEFT JOIN departments ON ((departments.id = public_jobs.department_id)))
             LEFT JOIN office_locations ON ((office_locations.id = public_jobs.location_id)))
             LEFT JOIN integrations ON ((integrations.recruiter_id = public_jobs.recruiter_id)))
        ), status_count_default_cte AS (
         SELECT job_cte_1.id,
            defaults.status
           FROM (( SELECT 'new'::text AS status
                UNION
                 SELECT 'interview'::text AS status
                UNION
                 SELECT 'qualified'::text AS status
                UNION
                 SELECT 'disqualified'::text AS status) defaults
             CROSS JOIN job_cte job_cte_1)
        ), status_count_cte AS (
         SELECT status_count_default_cte.id,
            status_count_default_cte.status,
            COALESCE(count(application_status_view_cte.status), (0)::bigint) AS count
           FROM (status_count_default_cte
             LEFT JOIN application_status_view_cte ON (((status_count_default_cte.id = application_status_view_cte.job_id) AND (status_count_default_cte.status = application_status_view_cte.status))))
          GROUP BY status_count_default_cte.id, status_count_default_cte.status
        ), job_section_count_cte AS (
         SELECT status_count_cte.id,
            json_object_agg(status_count_cte.status, status_count_cte.count) AS section_count
           FROM status_count_cte
          GROUP BY status_count_cte.id
        ), application_match_default_cte AS (
         SELECT job_cte_1.id,
            defaults.application_match
           FROM (( SELECT 'top_match'::application_match AS application_match
                UNION
                 SELECT 'good_match'::application_match AS application_match
                UNION
                 SELECT 'average_match'::application_match AS application_match
                UNION
                 SELECT 'poor_match'::application_match AS application_match
                UNION
                 SELECT 'not_a_match'::application_match AS application_match
                UNION
                 SELECT 'unknown_match'::application_match AS application_match) defaults
             CROSS JOIN job_cte job_cte_1)
        ), application_match_cte AS (
         SELECT application_match_default_cte.id,
            application_match_default_cte.application_match,
            COALESCE(count(application_status_view_cte.application_match), (0)::bigint) AS count
           FROM (application_match_default_cte
             LEFT JOIN application_status_view_cte ON (((application_match_default_cte.id = application_status_view_cte.job_id) AND (application_match_default_cte.application_match = application_status_view_cte.application_match))))
          GROUP BY application_match_default_cte.id, application_match_default_cte.application_match
        ), job_application_match_cte AS (
         SELECT application_match_cte.id,
            json_object_agg(application_match_cte.application_match, application_match_cte.count) AS application_match
           FROM application_match_cte
          GROUP BY application_match_cte.id
        ), processing_count_default_cte AS (
         SELECT job_cte_1.id,
            defaults.resume_processing_state
           FROM (( SELECT 'fetching'::resume_processing_state AS resume_processing_state
                UNION
                 SELECT 'unavailable'::resume_processing_state AS resume_processing_state
                UNION
                 SELECT 'processing'::resume_processing_state AS resume_processing_state
                UNION
                 SELECT 'processed'::resume_processing_state AS resume_processing_state
                UNION
                 SELECT 'unparsable'::resume_processing_state AS resume_processing_state
                UNION
                 SELECT 'unscorable'::resume_processing_state AS resume_processing_state) defaults
             CROSS JOIN job_cte job_cte_1)
        ), processing_count_cte AS (
         SELECT processing_count_default_cte.id,
            processing_count_default_cte.resume_processing_state,
            COALESCE(count(application_status_view_cte.resume_processing_state), (0)::bigint) AS count
           FROM (processing_count_default_cte
             LEFT JOIN application_status_view_cte ON (((processing_count_default_cte.id = application_status_view_cte.job_id) AND (processing_count_default_cte.resume_processing_state = application_status_view_cte.resume_processing_state))))
          GROUP BY processing_count_default_cte.id, processing_count_default_cte.resume_processing_state
        ), job_processing_count_cte AS (
         SELECT processing_count_cte.id,
            json_object_agg(processing_count_cte.resume_processing_state, processing_count_cte.count) AS processing_count
           FROM processing_count_cte
          GROUP BY processing_count_cte.id
        )
 SELECT job_cte.created_at,
    job_cte.department_id,
    job_cte.department,
    job_cte.description,
    job_cte.draft,
    job_cte.id,
    job_cte.jd_json,
    job_cte.job_title,
    job_cte.job_type,
    job_cte.location_id,
    job_cte.location,
    job_cte.parameter_weights,
    job_cte.posted_by,
    job_cte.recruiter_id,
    job_cte.scoring_criteria_loading,
    job_cte.status,
    job_cte.workplace_type,
    job_cte.hiring_manager,
    job_cte.recruiter,
    job_cte.recruiting_coordinator,
    job_cte.sourcer,
    job_cte.interview_coordinator,
    job_cte.remote_sync_time,
    job_section_count_cte.section_count,
    job_processing_count_cte.processing_count,
    job_application_match_cte.application_match,
    job_cte.is_pinned,
    job_cte.syncable
   FROM (((job_cte
     LEFT JOIN job_section_count_cte ON ((job_section_count_cte.id = job_cte.id)))
     LEFT JOIN job_processing_count_cte ON ((job_processing_count_cte.id = job_cte.id)))
     LEFT JOIN job_application_match_cte ON ((job_application_match_cte.id = job_cte.id)));


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
    interview_session.parent_session_id,
    interview_meeting.schedule_request_id,
    interview_meeting.confirmed_candidate_tz
   FROM (((interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)))
     LEFT JOIN applications ON ((applications.id = interview_meeting.application_id)))
     LEFT JOIN public_jobs ON ((applications.job_id = public_jobs.id)));


create or replace view "public"."workflow_view" as  WITH job_cte AS (
         SELECT workflow_job_relation.workflow_id,
            array_agg(json_build_object('id', workflow_job_relation.job_id, 'job_title', public_jobs.job_title, 'department', departments.name, 'location', row_to_json(office_locations.*), 'status', public_jobs.status)) AS jobs
           FROM (((workflow_job_relation
             LEFT JOIN public_jobs ON ((workflow_job_relation.job_id = public_jobs.id)))
             LEFT JOIN departments ON ((departments.id = public_jobs.department_id)))
             LEFT JOIN office_locations ON ((office_locations.id = public_jobs.location_id)))
          WHERE (public_jobs.status <> 'closed'::public_job_status)
          GROUP BY workflow_job_relation.workflow_id
        ), action_cte AS (
         SELECT workflow_action.workflow_id,
            COALESCE(array_agg(DISTINCT
                CASE
                    WHEN ((workflow_action.action_type = 'end_point'::text) OR (workflow_action.action_type = 'agent_instruction'::text)) THEN 'company'::text
                    ELSE workflow_action.action_type
                END), ARRAY[]::text[]) AS tags
           FROM workflow_action
          GROUP BY workflow_action.workflow_id
        )
 SELECT workflow.id,
    workflow.created_at,
    workflow.trigger,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.auto_connect,
    workflow.description,
    COALESCE(job_cte.jobs, ARRAY[]::json[]) AS jobs,
    workflow.workflow_type,
    workflow.is_active AS is_paused,
    array_append(action_cte.tags, (workflow.trigger)::text) AS tags,
    workflow.request_id
   FROM ((workflow
     LEFT JOIN job_cte ON ((job_cte.workflow_id = workflow.id)))
     LEFT JOIN action_cte ON ((action_cte.workflow_id = workflow.id)));



