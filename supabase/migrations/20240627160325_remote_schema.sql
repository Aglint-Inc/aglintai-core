alter table "public"."applications" drop constraint "applications_candidate_id_fkey";

alter table "public"."candidate_files" drop constraint "candidate_files_candidate_id_fkey";

alter table "public"."job_email_template" drop constraint "job_email_template_job_id_fkey";

drop view if exists "public"."application_view";

drop view if exists "public"."tasks_view";

drop view if exists "public"."workflow_view";

drop table if exists "public"."task_session_relation";

create table "public"."task_session_relation" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null,
    "task_id" uuid not null
);

ALTER TABLE "public"."new_tasks" DROP COLUMN IF EXISTS "session_ids";

alter table "public"."public_jobs" DROP COLUMN IF EXISTS "email_template";

alter table "public"."recruiter" DROP COLUMN IF EXISTS "email_template";

CREATE UNIQUE INDEX task_session_relation_pkey ON public.task_session_relation USING btree (id);

alter table "public"."task_session_relation" add constraint "task_session_relation_pkey" PRIMARY KEY using index "task_session_relation_pkey";

alter table "public"."task_session_relation" add constraint "task_session_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."task_session_relation" validate constraint "task_session_relation_session_id_fkey";

alter table "public"."task_session_relation" add constraint "task_session_relation_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."task_session_relation" validate constraint "task_session_relation_task_id_fkey";

alter table "public"."applications" add constraint "applications_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_candidate_id_fkey";

alter table "public"."candidate_files" add constraint "candidate_files_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."candidate_files" validate constraint "candidate_files_candidate_id_fkey";

alter table "public"."job_email_template" add constraint "job_email_template_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."job_email_template" validate constraint "job_email_template_job_id_fkey";

set check_function_bodies = off;

create or replace view "public"."application_view" as  WITH application_candidate_cte AS (
         SELECT applications.id,
            applications.job_id,
            applications.created_at,
            applications.applied_at,
            applications.overall_score AS resume_score,
            applications.overall_interview_score AS interview_score,
            applications.processing_status,
            applications.bookmarked,
            applications.is_new,
            applications.status,
            (applications.score_json -> 'badges'::text) AS badges,
            applications.candidate_id,
            applications.candidate_file_id,
            applications.is_resume_fetching,
            applications.score_json,
            candidates.email,
            (((candidates.first_name)::text || ' '::text) || (candidates.last_name)::text) AS name,
            candidates.city,
            candidates.linkedin,
            candidates.phone,
            candidates.state,
            candidates.country,
            candidates.current_job_title
           FROM (applications
             LEFT JOIN candidates ON ((candidates.id = applications.candidate_id)))
        ), application_files_cte AS (
         SELECT application_candidate_cte_1.id,
            candidate_files.file_url,
            (
                CASE
                    WHEN ((candidate_files.resume_json IS NOT NULL) OR (candidate_files.file_url IS NOT NULL)) THEN
                    CASE
                        WHEN (application_candidate_cte_1.is_resume_fetching = true) THEN 'fetching'::text
                        WHEN ((application_candidate_cte_1.processing_status = 'processing'::application_processing_status) OR (application_candidate_cte_1.processing_status = 'not started'::application_processing_status)) THEN 'processing'::text
                        WHEN (application_candidate_cte_1.score_json IS NOT NULL) THEN 'processed'::text
                        ELSE 'unparsable'::text
                    END
                    ELSE 'unavailable'::text
                END)::resume_processing_state AS resume_processing_state
           FROM (application_candidate_cte application_candidate_cte_1
             LEFT JOIN candidate_files ON ((candidate_files.id = application_candidate_cte_1.candidate_file_id)))
        ), application_meeting_cte AS (
         SELECT application_candidate_cte_1.id,
            jsonb_agg(jsonb_build_object('meeting_id', meeting_details.id, 'session_id', meeting_details.session_id, 'session_duration', meeting_details.session_duration, 'session_name', meeting_details.session_name, 'session_order', meeting_details.session_order, 'schedule_type', meeting_details.schedule_type, 'session_type', meeting_details.session_type, 'status', meeting_details.status, 'date', jsonb_build_object('start_time', meeting_details.start_time, 'end_time', meeting_details.end_time))) AS meeting_details
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
    application_files_cte.file_url,
    application_files_cte.resume_processing_state,
    COALESCE(application_meeting_cte.meeting_details, '[]'::jsonb) AS meeting_details,
    application_task_cte.task_count,
    application_logs_cte.activity_count
   FROM ((((application_candidate_cte
     LEFT JOIN application_files_cte ON ((application_files_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_meeting_cte ON ((application_meeting_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_task_cte ON ((application_task_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_logs_cte ON ((application_logs_cte.id = application_candidate_cte.id)));


CREATE OR REPLACE FUNCTION public.fetch_interview_data(rec_id uuid, text_search_filter text DEFAULT NULL::text, job_id_filter uuid[] DEFAULT NULL::uuid[], sort_by text DEFAULT 'asc'::text, cord_ids uuid[] DEFAULT NULL::uuid[], status_filter text[] DEFAULT NULL::text[], schedule_type_filter text[] DEFAULT NULL::text[], module_ids uuid[] DEFAULT NULL::uuid[], page_number integer DEFAULT 1)
 RETURNS TABLE(applications json, candidates json, file json, public_jobs json, schedule json, interview_session_meetings jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        row_to_json(ja) AS applications,
        row_to_json(cand) AS candidates,
        json_build_object(
            'id', candfil.id,
            'created_at', candfil.created_at,
            'file_url',candfil.file_url,
            'candidate_id',candfil.candidate_id,
            'resume_json',candfil.resume_json,
            'type',candfil.type
        )  AS file,
        json_build_object(
                    'id', pj.id,
                    'job_title', pj.job_title
        ) AS public_jobs,
        row_to_json(insc) AS schedule,
        (
            SELECT jsonb_agg(interview_sessions.interview_session_meeting) -- Changed to interview_sessions.interview_session_meeting
            FROM (
                SELECT
                    CASE
                        WHEN insc.id IS NULL THEN
                            jsonb_build_object(
                                'interview_session', row_to_json(intses),
                                'interview_meeting', null
                            )
                        ELSE
                            jsonb_build_object(
                                'interview_session', row_to_json(intses),
                                'interview_meeting', row_to_json(intmeet)
                            )
                    END AS interview_session_meeting
                FROM interview_session intses
                LEFT JOIN interview_meeting intmeet ON intmeet.id = intses.meeting_id
                LEFT JOIN interview_schedule intsch ON intsch.id = intmeet.interview_schedule_id
                WHERE
                    (insc.id IS NULL AND intses.interview_plan_id = intplan.id)
                    OR (insc.id IS NOT NULL AND insc.id = intsch.id)
                ORDER BY intses.session_order
            ) AS interview_sessions
        ) AS interview_session_meetings -- Corrected field name
    FROM
        applications ja      
        JOIN candidates cand ON ja.candidate_id = cand.id     
        LEFT JOIN public_jobs pj ON pj.id = ja.job_id
        LEFT JOIN candidate_files candfil ON candfil.id = ja.candidate_file_id
        LEFT JOIN interview_plan intplan ON intplan.job_id = ja.job_id
        LEFT JOIN interview_schedule insc ON insc.application_id = ja.id
    WHERE
        (ja.status = 'interview' OR insc.id IS NOT NULL)
        AND pj.recruiter_id = rec_id
        AND (
            status_filter IS NULL 
            OR (
               EXISTS (
                SELECT 1
                FROM interview_meeting intmt
                WHERE intmt.interview_schedule_id = insc.id
                AND intmt.status::text = ANY(status_filter)
             )
            ) 
        )
        AND (cord_ids IS NULL OR insc.coordinator_id =  ANY(cord_ids))
        AND (
            (text_search_filter IS NULL OR text_search_filter = '') OR  
            (LOWER(cand.first_name || ' ' || cand.last_name) LIKE LOWER('%' || text_search_filter || '%'))
        )
        AND (job_id_filter IS NULL OR ja.job_id = ANY(job_id_filter))
        AND (
            schedule_type_filter IS NULL 
            OR (
                SELECT ARRAY_AGG(inses.schedule_type)::text[]
                FROM interview_meeting intmt 
                JOIN interview_session inses ON inses.meeting_id = intmt.id 
                WHERE intmt.interview_schedule_id = insc.id
            ) && schedule_type_filter
        )
        AND (
            module_ids IS NULL 
            OR (
                SELECT ARRAY_AGG(inses.module_id)
                FROM interview_meeting intmt 
                JOIN interview_session inses ON inses.meeting_id = intmt.id
                WHERE intmt.interview_schedule_id = insc.id
            ) && module_ids
        )
    ORDER BY cand.first_name
    LIMIT 50 -- Number of records per page
    OFFSET (page_number - 1) * 50; -- Calculate the starting position of records based on page number
END;
$function$
;

create or replace view "public"."meeting_interviewers" as  SELECT
        CASE
            WHEN (interview_session_relation.user_id IS NOT NULL) THEN debrief_user.first_name
            ELSE recruiter_user.first_name
        END AS first_name,
        CASE
            WHEN (interview_session_relation.user_id IS NOT NULL) THEN debrief_user.last_name
            ELSE recruiter_user.last_name
        END AS last_name,
        CASE
            WHEN (interview_session_relation.user_id IS NOT NULL) THEN debrief_user.profile_image
            ELSE recruiter_user.profile_image
        END AS profile_image,
        CASE
            WHEN (interview_session_relation.user_id IS NOT NULL) THEN debrief_user.email
            ELSE recruiter_user.email
        END AS email,
        CASE
            WHEN (interview_session_relation.user_id IS NOT NULL) THEN debrief_user.user_id
            ELSE recruiter_user.user_id
        END AS user_id,
    interview_session_relation.id AS session_relation_id,
    interview_session_relation.interviewer_type,
    interview_session_relation.training_type,
    interview_session_relation.is_confirmed,
    interview_session.meeting_id,
    interview_session.id AS session_id,
    interview_session.session_type
   FROM ((((interview_session_relation
     LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
     LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
     LEFT JOIN recruiter_user ON ((recruiter_user.user_id = interview_module_relation.user_id)))
     LEFT JOIN recruiter_user debrief_user ON ((debrief_user.user_id = interview_session_relation.user_id)));


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


create or replace view "public"."workflow_view" as  SELECT workflow.id,
    workflow.created_at,
    workflow.trigger,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.auto_connect,
    workflow.description,
    COALESCE(workflow_jobs.jobs, '[]'::json) AS jobs
   FROM (workflow
     LEFT JOIN ( SELECT workflow_job_relation.workflow_id,
            json_agg(json_build_object('job_id', workflow_job_relation.job_id, 'title', public_jobs.job_title)) AS jobs
           FROM (workflow_job_relation
             LEFT JOIN public_jobs ON ((workflow_job_relation.job_id = public_jobs.id)))
          GROUP BY workflow_job_relation.workflow_id) workflow_jobs ON ((workflow_jobs.workflow_id = workflow.id)));


grant delete on table "public"."task_session_relation" to "anon";

grant insert on table "public"."task_session_relation" to "anon";

grant references on table "public"."task_session_relation" to "anon";

grant select on table "public"."task_session_relation" to "anon";

grant trigger on table "public"."task_session_relation" to "anon";

grant truncate on table "public"."task_session_relation" to "anon";

grant update on table "public"."task_session_relation" to "anon";

grant delete on table "public"."task_session_relation" to "authenticated";

grant insert on table "public"."task_session_relation" to "authenticated";

grant references on table "public"."task_session_relation" to "authenticated";

grant select on table "public"."task_session_relation" to "authenticated";

grant trigger on table "public"."task_session_relation" to "authenticated";

grant truncate on table "public"."task_session_relation" to "authenticated";

grant update on table "public"."task_session_relation" to "authenticated";

grant delete on table "public"."task_session_relation" to "service_role";

grant insert on table "public"."task_session_relation" to "service_role";

grant references on table "public"."task_session_relation" to "service_role";

grant select on table "public"."task_session_relation" to "service_role";

grant trigger on table "public"."task_session_relation" to "service_role";

grant truncate on table "public"."task_session_relation" to "service_role";

grant update on table "public"."task_session_relation" to "service_role";


