drop view if exists "public"."job_view";

drop view if exists "public"."application_view";

drop view if exists "public"."application_status_view";

alter type "public"."resume_processing_state" rename to "resume_processing_state__old_version_to_be_dropped";

create type "public"."resume_processing_state" as enum ('unavailable', 'fetching', 'processing', 'unparsable', 'processed', 'unscorable');

drop type "public"."resume_processing_state__old_version_to_be_dropped";



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
            public_jobs.location_id,
            row_to_json(office_locations.*) AS location,
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
           FROM ((public_jobs
             LEFT JOIN departments ON ((departments.id = public_jobs.department_id)))
             LEFT JOIN office_locations ON ((office_locations.id = public_jobs.location_id)))
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
    job_cte.location_id,
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


