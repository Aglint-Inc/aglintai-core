drop view if exists "public"."application_view";

drop view if exists "public"."candidate_applications_view";

drop view if exists "public"."interview_data_view";

drop view if exists "public"."job_view";

drop view if exists "public"."meeting_details";

drop view if exists "public"."workflow_view";

drop view if exists "public"."application_status_view";

alter table "public"."public_jobs" drop column "company";

alter table "public"."public_jobs" drop column "company_details";

alter table "public"."public_jobs" drop column "end_video";

alter table "public"."public_jobs" drop column "experience_in_months";

alter table "public"."public_jobs" drop column "interview_instructions";

alter table "public"."public_jobs" drop column "interview_plan";

alter table "public"."public_jobs" drop column "interview_success";

alter table "public"."public_jobs" drop column "intro_videos";

alter table "public"."public_jobs" drop column "job_details_embedding";

alter table "public"."public_jobs" drop column "location_json";

alter table "public"."public_jobs" drop column "logo";

alter table "public"."public_jobs" drop column "overview";

alter table "public"."public_jobs" drop column "skills";

alter table "public"."public_jobs" drop column "start_video";

alter table "public"."public_jobs" drop column "video_assessment";

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
            processing_state_cte.resume_processing_state,
                CASE
                    WHEN ((processing_state_cte.resume_processing_state = 'processed'::resume_processing_state) AND (public_jobs.parameter_weights IS NOT NULL)) THEN ( SELECT score_application(processing_state_cte.scores, public_jobs.parameter_weights) AS score_application)
                    WHEN (processing_state_cte.resume_processing_state = 'fetching'::resume_processing_state) THEN ('-2'::integer)::numeric
                    WHEN (processing_state_cte.resume_processing_state = 'unparsable'::resume_processing_state) THEN ('-3'::integer)::numeric
                    WHEN (processing_state_cte.resume_processing_state = 'unavailable'::resume_processing_state) THEN ('-4'::integer)::numeric
                    ELSE ('-1'::integer)::numeric
                END AS resume_score
           FROM (processing_state_cte
             LEFT JOIN public_jobs ON ((public_jobs.id = processing_state_cte.job_id)))
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


create or replace view "public"."job_view" as  WITH application_status_view_cte AS (
         SELECT application_status_view.status,
            application_status_view.job_id,
            application_status_view.resume_processing_state,
            application_status_view.application_match
           FROM application_status_view
        ), job_cte AS (
         SELECT public_jobs.assessment,
            public_jobs.created_at,
            public_jobs.department_id,
            departments.name AS department,
            public_jobs.description,
            public_jobs.draft,
            public_jobs.id,
            public_jobs.jd_json,
            public_jobs.job_title,
            public_jobs.job_type,
            public_jobs.location,
            public_jobs.parameter_weights,
            public_jobs.phone_screen_enabled,
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
            public_jobs.interview_plan_warning_ignore,
            public_jobs.interview_session_warning_ignore
           FROM (public_jobs
             LEFT JOIN departments ON ((departments.id = public_jobs.department_id)))
        ), status_count_default_cte AS (
         SELECT job_cte_1.id,
            defaults.status
           FROM (( SELECT 'new'::application_status AS status
                UNION
                 SELECT 'screening'::application_status AS status
                UNION
                 SELECT 'assessment'::application_status AS status
                UNION
                 SELECT 'interview'::application_status AS status
                UNION
                 SELECT 'qualified'::application_status AS status
                UNION
                 SELECT 'disqualified'::application_status AS status) defaults
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
                 SELECT 'unparsable'::resume_processing_state AS resume_processing_state) defaults
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
        ), flags_default_cte AS (
         SELECT job_cte_1.id,
            defaults.section,
            COALESCE(
                CASE
                    WHEN (defaults.section = 'new'::application_status) THEN true
                    WHEN (defaults.section = 'screening'::application_status) THEN job_cte_1.phone_screen_enabled
                    WHEN (defaults.section = 'assessment'::application_status) THEN job_cte_1.assessment
                    WHEN (defaults.section = 'interview'::application_status) THEN true
                    WHEN (defaults.section = 'qualified'::application_status) THEN true
                    WHEN (defaults.section = 'disqualified'::application_status) THEN true
                    ELSE NULL::boolean
                END, false) AS enabled
           FROM (( SELECT 'new'::application_status AS section
                UNION
                 SELECT 'screening'::application_status AS section
                UNION
                 SELECT 'assessment'::application_status AS section
                UNION
                 SELECT 'interview'::application_status AS section
                UNION
                 SELECT 'qualified'::application_status AS section
                UNION
                 SELECT 'disqualified'::application_status AS section) defaults
             CROSS JOIN job_cte job_cte_1)
        ), job_flags_cte AS (
         SELECT flags_default_cte.id,
            json_object_agg(flags_default_cte.section, flags_default_cte.enabled) AS flags
           FROM flags_default_cte
          GROUP BY flags_default_cte.id
        )
 SELECT job_cte.assessment,
    job_cte.created_at,
    job_cte.department_id,
    job_cte.department,
    job_cte.description,
    job_cte.draft,
    job_cte.id,
    job_cte.jd_json,
    job_cte.job_title,
    job_cte.job_type,
    job_cte.location,
    job_cte.parameter_weights,
    job_cte.phone_screen_enabled,
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
    job_cte.interview_plan_warning_ignore,
    job_cte.interview_session_warning_ignore,
    job_section_count_cte.section_count,
    job_processing_count_cte.processing_count,
    job_flags_cte.flags,
    job_application_match_cte.application_match
   FROM ((((job_cte
     LEFT JOIN job_section_count_cte ON ((job_section_count_cte.id = job_cte.id)))
     LEFT JOIN job_processing_count_cte ON ((job_processing_count_cte.id = job_cte.id)))
     LEFT JOIN job_flags_cte ON ((job_flags_cte.id = job_cte.id)))
     LEFT JOIN job_application_match_cte ON ((job_application_match_cte.id = job_cte.id)));


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


create or replace view "public"."workflow_view" as  SELECT workflow.id,
    workflow.created_at,
    workflow.trigger,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.auto_connect,
    workflow.description,
    COALESCE(workflow_jobs.jobs, '[]'::json) AS jobs,
    workflow.workflow_type,
    workflow.is_paused
   FROM (workflow
     LEFT JOIN ( SELECT workflow_job_relation.workflow_id,
            json_agg(json_build_object('id', workflow_job_relation.job_id, 'job_title', public_jobs.job_title, 'department', departments.name, 'location', public_jobs.location, 'status', public_jobs.status)) AS jobs
           FROM ((workflow_job_relation
             LEFT JOIN public_jobs ON ((workflow_job_relation.job_id = public_jobs.id)))
             LEFT JOIN departments ON ((departments.id = public_jobs.department_id)))
          GROUP BY workflow_job_relation.workflow_id) workflow_jobs ON ((workflow_jobs.workflow_id = workflow.id)));


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
            candidates.current_job_title
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
    application_candidate_cte.candidate_id
   FROM ((((application_candidate_cte
     LEFT JOIN application_meeting_cte ON ((application_meeting_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_task_cte ON ((application_task_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_logs_cte ON ((application_logs_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_latest_activity_cte ON ((application_latest_activity_cte.application_id = application_candidate_cte.id)));



