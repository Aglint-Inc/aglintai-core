


alter table "public"."application_logs" drop constraint "public_application_logs_created_by_fkey";

alter table "public"."application_logs" drop constraint "public_application_logs_task_id_fkey";

alter table "public"."request_session_relation" drop constraint "request_session_relation_request_availability_id_fkey";

alter table "public"."request_session_relation" drop constraint "request_session_relation_session_id_fkey";

drop view if exists "public"."application_view";

drop view if exists "public"."meeting_details";

drop view if exists "public"."tasks_view";

drop view if exists "public"."workflow_view";

alter table "public"."request_session_relation" drop constraint "request_session_relation_pkey";

drop index if exists "public"."request_session_relation_pkey";

alter table "public"."interview_meeting" alter column "meeting_flow" drop default;

alter table "public"."new_tasks_progress" alter column "progress_type" drop default;

alter type "public"."email_slack_types" rename to "email_slack_types__old_version_to_be_dropped";

create type "public"."email_slack_types" as enum ('interviewEnd_slack_interviewers', 'interviewerConfirmation_slack_interviewers', 'interviewStart_slack_interviewers', 'agent_email_candidate', 'applicantReject_email_applicant', 'applicationRecieved_email_applicant', 'confInterview_email_organizer', 'confirmInterview_email_applicant', 'debrief_email_interviewer', 'interReschedReq_email_recruiter', 'interviewCancel_email_applicant', 'InterviewCancelReq_email_recruiter', 'interviewReschedule_email_applicant', 'interviewStart_email_applicant', 'interviewStart_email_interviewers', 'phoneScreen_email_candidate', 'phoneScreenRemind_email_applicant', 'selfScheduleReminder_email_applicant', 'sendAvailReqReminder_email_applicant', 'sendSelfScheduleRequest_email_applicant', 'sendAvailabilityRequest_email_applicant', 'availabilityReqResend_email_candidate', 'interviewDetails_calender_interviewer', 'rescheduleSelfSchedule_email_applicant', 'interviewStart_email_organizer', 'meetingDeclined_email_organizer', 'meetingAccepted_email_organizer', 'candidateBook_slack_interviewerForFeedback', 'candidateBook_email_interviewerForFeedback', 'interviewEnd_slack_interviewerForFeedback', 'interviewEnd_email_interviewerForFeedback', 'candidateBook_slack_interviewerForConfirmation');

alter type "public"."meeting_flow" rename to "meeting_flow__old_version_to_be_dropped";

create type "public"."meeting_flow" as enum ('self_scheduling', 'candidate_request', 'debrief', 'mail_agent', 'phone_agent');

alter type "public"."progress_type" rename to "progress_type__old_version_to_be_dropped";

create type "public"."progress_type" as enum ('standard', 'interview_schedule', 'email_messages', 'call_completed', 'call_failed', 'email_failed', 'call_disconnected', 'email_follow_up', 'call_follow_up', 'email_follow_up_reminder', 'call_follow_up_reminder', 'request_availability_list', 'request_availability', 'self_schedule', 'send_email', 'request_submitted', 'schedule', 'closed', 'completed');

alter type "public"."workflow_trigger" rename to "workflow_trigger__old_version_to_be_dropped";

create type "public"."workflow_trigger" as enum ('selfScheduleReminder', 'interviewStart', 'sendAvailReqReminder', 'interviewerConfirmation', 'interviewEnd', 'meetingDeclined', 'meetingAccepted', 'candidateBook');

alter table "public"."application_email_status" alter column email type "public"."email_slack_types" using email::text::"public"."email_slack_types";

alter table "public"."company_email_template" alter column type type "public"."email_slack_types" using type::text::"public"."email_slack_types";

alter table "public"."interview_meeting" alter column meeting_flow type "public"."meeting_flow" using meeting_flow::text::"public"."meeting_flow";

alter table "public"."job_email_template" alter column type type "public"."email_slack_types" using type::text::"public"."email_slack_types";

alter table "public"."new_tasks_progress" alter column progress_type type "public"."progress_type" using progress_type::text::"public"."progress_type";

alter table "public"."workflow" alter column trigger type "public"."workflow_trigger" using trigger::text::"public"."workflow_trigger";

alter table "public"."interview_meeting" alter column "meeting_flow" set default 'self_scheduling'::meeting_flow;

alter table "public"."new_tasks_progress" alter column "progress_type" set default 'standard'::progress_type;

drop type "public"."email_slack_types__old_version_to_be_dropped";

drop type "public"."meeting_flow__old_version_to_be_dropped";

drop type "public"."progress_type__old_version_to_be_dropped";

drop type "public"."workflow_trigger__old_version_to_be_dropped";

alter table "public"."applications" add column "processing_started_at" timestamp with time zone;

alter table "public"."permissions" add column "title" text not null;

alter table "public"."public_jobs" drop column "scoring_param_status";

alter table "public"."request_session_relation" alter column "request_availability_id" drop default;

alter table "public"."request_session_relation" alter column "session_id" drop default;

alter table "public"."request_session_relation" disable row level security;

drop type "public"."job_scoring_param_status";

CREATE UNIQUE INDEX request_availability_relation_pkey ON public.request_session_relation USING btree (id);

alter table "public"."request_session_relation" add constraint "request_availability_relation_pkey" PRIMARY KEY using index "request_availability_relation_pkey";

alter table "public"."application_logs" add constraint "application_logs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."application_logs" validate constraint "application_logs_created_by_fkey";

alter table "public"."application_logs" add constraint "application_logs_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON DELETE SET NULL not valid;

alter table "public"."application_logs" validate constraint "application_logs_task_id_fkey";

alter table "public"."request_session_relation" add constraint "request_availability_relation_request_availability_id_fkey" FOREIGN KEY (request_availability_id) REFERENCES candidate_request_availability(id) ON DELETE CASCADE not valid;

alter table "public"."request_session_relation" validate constraint "request_availability_relation_request_availability_id_fkey";

alter table "public"."request_session_relation" add constraint "request_availability_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE not valid;

alter table "public"."request_session_relation" validate constraint "request_availability_relation_session_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_fail_processing_applications()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  update applications 
  set processing_started_at = now()
  where 
    id = new.id and
    new.processing_status = 'processing';
  return new;
end;
$function$
;

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
        LEFT JOIN LATERAL (
            SELECT created_at
            FROM application_logs
            WHERE application_logs.application_id = ja.id
            ORDER BY created_at DESC
            LIMIT 1
        ) app_log ON true
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
    ORDER BY 
    CASE WHEN app_log.created_at IS NULL THEN 1 ELSE 0 END,
    app_log.created_at DESC, 
    cand.first_name
    LIMIT 50 -- Number of records per page
    OFFSET (page_number - 1) * 50; -- Calculate the starting position of records based on page number
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_data_schedule(schedule_id_param uuid, application_id_param uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$

DECLARE
    interview_data JSONB;
    application_data JSONB;
    request_data JSONB;
    activities_data JSONB;
    result_data JSONB;
BEGIN
    BEGIN
    -- Fetch interview data
    SELECT jsonb_agg(
               json_build_object(
                   'interview_session', row_to_json(intses),
                   'interview_module', row_to_json(intmod),
                   'interview_meeting', row_to_json(intmeet),
                   'interview_session_relations', interview_session_relations,
                   'cancel_reasons', cancel_reasons
               )
           )
    INTO interview_data
    FROM interview_session intses
    JOIN interview_meeting intmeet ON  intmeet.id = intses.meeting_id
    LEFT JOIN interview_module intmod ON intses.module_id = intmod.id
    LEFT JOIN (
        SELECT 
            session_id,
            jsonb_agg(
                jsonb_build_object(
                        'interview_session_relation', row_to_json(intrel),
                        'interview_module_relation', row_to_json(intmodrel),
                        'recruiter_user', 
                            CASE WHEN user_rel.user_id IS NULL THEN NULL
                                 ELSE jsonb_build_object(
                                    'user_id', user_rel.user_id,
                                    'first_name', user_rel.first_name,
                                    'last_name', user_rel.last_name,
                                    'position', user_rel.position,
                                    'email', user_rel.email,
                                    'profile_image', user_rel.profile_image,
                                    'scheduling_settings', user_rel.scheduling_settings
                                 )
                            END,
                        'debrief_user', 
                            CASE WHEN user_rel_debrief.user_id IS NULL THEN NULL
                                 ELSE jsonb_build_object(
                                    'user_id', user_rel_debrief.user_id,
                                    'first_name', user_rel_debrief.first_name,
                                    'last_name', user_rel_debrief.last_name,
                                    'position', user_rel_debrief.position,
                                    'email', user_rel_debrief.email,
                                    'profile_image', user_rel_debrief.profile_image,
                                    'scheduling_settings', user_rel.scheduling_settings
                                 )
                            END
                )
            ) as interview_module_relation
        FROM interview_session_relation intrel
        LEFT JOIN interview_module_relation intmodrel ON intrel.interview_module_relation_id = intmodrel.id
        LEFT JOIN recruiter_user user_rel ON intmodrel.user_id = user_rel.user_id
        LEFT JOIN recruiter_user user_rel_debrief ON intrel.user_id = user_rel_debrief.user_id
        GROUP BY session_id
    ) AS interview_session_relations ON intses.id = interview_session_relations.session_id
    LEFT JOIN (
        SELECT 
            session_id,
            jsonb_agg(row_to_json(interview_session_cancel)) as cancel_reasons
        FROM interview_session_cancel
        where interview_session_cancel.is_resolved=false
        GROUP BY session_id
    ) AS cancel_data ON intses.id = cancel_data.session_id
    WHERE intmeet.interview_schedule_id=schedule_id_param;
   

     EXCEPTION
            WHEN NO_DATA_FOUND THEN
                interview_data := NULL;
    END;


    BEGIN
    -- Fetch application data
    SELECT jsonb_build_object(
               'application',row_to_json(applications),
               'public_jobs', jsonb_build_object(
                   'id', public_jobs.id,
                   'job_title', public_jobs.job_title,
                   'location', public_jobs.location,
                   'recruiter_id', public_jobs.recruiter_id
               ),
               'candidate',row_to_json(candidates),
               'candidate_files', jsonb_build_object(
                    'id', candidate_files.id,
                    'file_url', candidate_files.file_url,
                    'candidate_id', candidate_files.candidate_id,
                    'resume_json', candidate_files.resume_json,
                    'type', candidate_files.type
               )
           )
    INTO application_data
    FROM applications
    LEFT JOIN public_jobs ON applications.job_id = public_jobs.id
    LEFT JOIN candidates ON applications.candidate_id = candidates.id
     LEFT JOIN candidate_files ON candidate_files.id = applications.candidate_file_id
    WHERE applications.id = application_id_param;

    EXCEPTION
            WHEN NO_DATA_FOUND THEN
                application_data := NULL;
    END;


    BEGIN
    SELECT jsonb_agg(
               jsonb_build_object(
                   'candidate_request_availability', row_to_json(candidate_request_availability),
                   'request_session_relations', (
                       SELECT jsonb_agg(row_to_json(request_session_relation))
                       FROM request_session_relation
                       WHERE request_session_relation.request_availability_id = candidate_request_availability.id
                   )
               )
           )
    INTO request_data
    FROM candidate_request_availability
    WHERE candidate_request_availability.booking_confirmed = false
    AND candidate_request_availability.application_id = application_id_param;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        request_data := NULL;
END;


    -- Combine interview data and application data
    result_data := jsonb_build_object(
        'interview_data', interview_data,
        'application_data', application_data,
        'request_data',request_data
    );

    RETURN result_data;

END;

$function$
;

CREATE OR REPLACE FUNCTION public.getjob(jobid uuid)
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, created_at timestamp with time zone, department text, description text, description_hash numeric, draft jsonb, id uuid, jd_json jsonb, job_title text, job_type public_job_type, location text, parameter_weights jsonb, phone_screen_enabled boolean, posted_by text, recruiter_id uuid, scoring_criteria_loading boolean, status public_job_status, workplace_type public_job_workplace, hiring_manager uuid, recruiter uuid, recruiting_coordinator uuid, sourcer uuid, interview_coordinator uuid, count jsonb, processing_count jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY 
  SELECT pbj.active_status, pbj.assessment, pbj.company, pbj.created_at, pbj.department, pbj.description, pbj.description_hash, pbj.draft, pbj.id, pbj.jd_json, pbj.job_title, pbj.job_type, pbj.location, pbj.parameter_weights, pbj.phone_screen_enabled, pbj.posted_by, pbj.recruiter_id, pbj.scoring_criteria_loading, pbj.status, pbj.workplace_type, pbj.hiring_manager, pbj.recruiter, pbj.recruiting_coordinator, pbj.sourcer, pbj.interview_coordinator,
       jsonb_object_agg(
           statuses.status,
           COALESCE(apps.count, 0)
       ) AS count, 
       jsonb_object_agg(
           processing_statuses.processing_status,
           COALESCE(p_apps.processing_count, 0)
       ) AS processing_count
FROM public_jobs AS pbj
CROSS JOIN (
    SELECT 'new' AS status UNION ALL
    SELECT 'screening' UNION ALL
    SELECT 'assessment' UNION ALL
    SELECT 'interview' UNION ALL
    SELECT 'qualified' UNION ALL
    SELECT 'disqualified'
) AS statuses
LEFT JOIN (
    SELECT job_id,
           applications.status,
           COUNT(applications.status) as count
    FROM applications
    WHERE job_id = applications.job_id
    GROUP BY job_id, applications.status
) AS apps ON apps.job_id = pbj.id AND apps.status = statuses.status::application_status
CROSS JOIN (
    SELECT 'not started' AS processing_status UNION ALL
    SELECT 'processing' UNION ALL
    SELECT 'success' UNION ALL
    SELECT 'failed'
) AS processing_statuses
LEFT JOIN (
    SELECT job_id,
           applications.processing_status,
           COUNT(applications.processing_status) as processing_count
    FROM applications
    WHERE job_id = applications.job_id --AND applications.candidate_file_id IS NOT NULL
    GROUP BY job_id, applications.processing_status
) AS p_apps ON p_apps.job_id = pbj.id AND p_apps.processing_status = processing_statuses.processing_status::application_processing_status
WHERE pbj.id = jobId
GROUP BY pbj.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjobs(recruiterid uuid)
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, created_at timestamp with time zone, department text, description text, description_hash numeric, draft jsonb, id uuid, jd_json jsonb, job_title text, job_type public_job_type, location text, parameter_weights jsonb, phone_screen_enabled boolean, posted_by text, recruiter_id uuid, scoring_criteria_loading boolean, status public_job_status, workplace_type public_job_workplace, count jsonb, processing_count jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY 
  SELECT pbj.active_status, pbj.assessment, pbj.company, pbj.created_at, pbj.department, pbj.description, pbj.description_hash, pbj.draft, pbj.id, pbj.jd_json, pbj.job_title, pbj.job_type, pbj.location, pbj.parameter_weights, pbj.phone_screen_enabled, pbj.posted_by, pbj.recruiter_id, pbj.scoring_criteria_loading, pbj.status, pbj.workplace_type,
       jsonb_object_agg(
           statuses.status,
           COALESCE(apps.count, 0)
       ) AS count,
       jsonb_object_agg(
           processing_statuses.processing_status,
           COALESCE(p_apps.processing_count, 0)
       ) AS processing_count
FROM public_jobs AS pbj
CROSS JOIN (
    SELECT 'new' AS status UNION ALL
    SELECT 'screening' UNION ALL
    SELECT 'assessment' UNION ALL
    SELECT 'interview' UNION ALL
    SELECT 'qualified' UNION ALL
    SELECT 'disqualified'
) AS statuses
LEFT JOIN (
    SELECT job_id,
           applications.status,
           COUNT(applications.status) as count
    FROM applications
    WHERE job_id IN (
        SELECT pj.id
        FROM public_jobs AS pj
        WHERE pj.recruiter_id = recruiterId
    )
    GROUP BY job_id, applications.status
) AS apps ON apps.job_id = pbj.id AND apps.status = statuses.status::application_status
CROSS JOIN (
    SELECT 'not started' AS processing_status UNION ALL
    SELECT 'processing' UNION ALL
    SELECT 'success' UNION ALL
    SELECT 'failed'
) AS processing_statuses
LEFT JOIN (
    SELECT job_id,
           applications.processing_status,
           COUNT(applications.processing_status) as processing_count
    FROM applications
    WHERE job_id IN (
        SELECT pj.id
        FROM public_jobs AS pj
        WHERE pj.recruiter_id = recruiterId
    ) --AND applications.candidate_file_id IS NOT NULL
    GROUP BY job_id, applications.processing_status
) AS p_apps ON p_apps.job_id = pbj.id AND p_apps.processing_status = processing_statuses.processing_status::application_processing_status 
WHERE pbj.recruiter_id = recruiterId
GROUP BY pbj.id;
END;
$function$
;

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
    interview_meeting.meeting_flow
   FROM ((interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)))
     LEFT JOIN interview_schedule ON ((interview_schedule.id = interview_meeting.interview_schedule_id)));


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


CREATE OR REPLACE FUNCTION public.workflow_action_log_set_fail_cron()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN 
  Update workflow_action_logs set status = 'failed' where status = 'processing' and started_at < CURRENT_TIMESTAMP - INTERVAL '4 minutes';
  RETURN true;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_candidate_request_availability()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    -- if NEW.slots is not null then
        FOR wa_record IN
            select w_a.workflow_id as workflow_id, w_a.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase,
                  json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'email_type', c_e_t.type, 'avail_req_id', NEW.id, 'sessions', NEW.session_ids ) as meta
            from interview_schedule i_s 
            JOIN applications a ON a.id = i_s.application_id
            JOIN workflow_job_relation w_a_r ON w_a_r.job_id = a.job_id
            JOIN workflow w ON w.id = w_a_r.workflow_id
            JOIN workflow_action w_a ON w_a.workflow_id = w_a_r.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = w_a.email_template_id
            WHERE i_s.application_id = NEW.application_id
            AND w.trigger::text = 'sendAvailReqReminder' 
        LOOP
            PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta);
        END LOOP;
    -- END if;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_meeting()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    if NEW.status::text = 'confirmed' then
      FOR wa_record IN
          SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase, json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', NEW.id, 'start_time', NEW.start_time, 'candidate_id', a.candidate_id, 'email_type', c_e_t.type, 'recruiter_user_id', NEW.organizer_id, 'session_id', (select i_m_s.id from interview_session i_m_s where i_m_s.meeting_id = NEW.id)) as meta
          FROM 
          interview_schedule i_s 
          JOIN applications a ON i_s.application_id = a.id
          JOIN workflow_job_relation war ON war.job_id = a.job_id
          JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          JOIN workflow w ON war.workflow_id = w.id
          WHERE i_s.id = NEW.interview_schedule_id
            AND ((w.trigger::text = 'interviewStart' AND (c_e_t.type = 'interviewStart_email_applicant' OR c_e_t.type = 'interviewStart_email_organizer')) OR w.trigger::text = 'candidateBook')
      LOOP
          PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, NEW.start_time);
      END LOOP;
    END if;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_session_relation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    IF NEW.is_confirmed THEN
        FOR wa_record IN
            SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase, i_m.start_time as start_time, w.trigger as trigger, i_m_s.session_duration as session_duration,
            json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', i_m.id, 'start_time', i_m.start_time, 'recruiter_user_id', m_i.user_id, 'email_type', c_e_t.type, 'session_id', NEW.session_id) as meta
            FROM 
            meeting_interviewers m_i 
            JOIN interview_session i_m_s ON i_m_s.id =  m_i.session_id
            JOIN interview_meeting i_m ON i_m.id = i_m_s.meeting_id
            JOIN interview_schedule i_s ON i_s.id = i_m.interview_schedule_id
            JOIN applications a ON i_s.application_id = a.id
            JOIN workflow_job_relation war ON war.job_id = a.job_id
            JOIN workflow w ON war.workflow_id = w.id
            JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
            WHERE m_i.session_relation_id = NEW.id 
            AND c_e_t.type <> 'interviewStart_email_applicant' AND c_e_t.type <> 'interviewStart_email_organizer'  and (w.trigger::text = 'interviewStart' or w.trigger::text = 'interviewerConfirmation' or w.trigger::text = 'interviewEnd')
        LOOP
            IF wa_record.trigger = 'interviewEnd' THEN
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, wa_record.start_time + (wa_record.session_duration * INTERVAL '1 minute'));
            ELSIF wa_record.trigger = 'interviewStart' THEN
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, wa_record.start_time);
            ELSE
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta , now());
            END IF;
        END LOOP;
    END IF;
  RETURN NEW;
END;
$function$
;

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
            TRIM(BOTH FROM (((COALESCE(candidates.first_name, ''::citext))::text || ' '::text) || (COALESCE(candidates.last_name, ''::citext))::text)) AS name,
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
                CASE
                    WHEN (application_candidate_cte_1.is_resume_fetching = true) THEN 'fetching'::resume_processing_state
                    WHEN (candidate_files.file_url IS NULL) THEN 'unavailable'::resume_processing_state
                    WHEN ((application_candidate_cte_1.processing_status = 'not started'::application_processing_status) OR (application_candidate_cte_1.processing_status = 'processing'::application_processing_status)) THEN 'processing'::resume_processing_state
                    WHEN (application_candidate_cte_1.score_json IS NOT NULL) THEN 'processed'::resume_processing_state
                    ELSE 'unparsable'::resume_processing_state
                END AS resume_processing_state
           FROM (application_candidate_cte application_candidate_cte_1
             LEFT JOIN candidate_files ON ((candidate_files.id = application_candidate_cte_1.candidate_file_id)))
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
    application_files_cte.file_url,
    application_files_cte.resume_processing_state,
    COALESCE(application_meeting_cte.meeting_details, '[]'::jsonb) AS meeting_details,
    application_task_cte.task_count,
    application_logs_cte.activity_count,
    application_latest_activity_cte.latest_activity
   FROM (((((application_candidate_cte
     LEFT JOIN application_files_cte ON ((application_files_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_meeting_cte ON ((application_meeting_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_task_cte ON ((application_task_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_logs_cte ON ((application_logs_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_latest_activity_cte ON ((application_latest_activity_cte.application_id = application_candidate_cte.id)));


create or replace view "public"."job_view" as  WITH application_view_cte AS (
         SELECT application_view.status,
            application_view.job_id,
            application_view.resume_processing_state
           FROM application_view
        ), job_cte AS (
         SELECT public_jobs.assessment,
            public_jobs.company,
            public_jobs.created_at,
            public_jobs.department,
            public_jobs.description,
            public_jobs.description_hash,
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
            public_jobs.interview_coordinator
           FROM public_jobs
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
            COALESCE(count(application_view_cte.status), (0)::bigint) AS count
           FROM (status_count_default_cte
             LEFT JOIN application_view_cte ON (((status_count_default_cte.id = application_view_cte.job_id) AND (status_count_default_cte.status = application_view_cte.status))))
          GROUP BY status_count_default_cte.id, status_count_default_cte.status
        ), job_section_count_cte AS (
         SELECT status_count_cte.id,
            json_object_agg(status_count_cte.status, status_count_cte.count) AS section_count
           FROM status_count_cte
          GROUP BY status_count_cte.id
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
            COALESCE(count(application_view_cte.resume_processing_state), (0)::bigint) AS count
           FROM (processing_count_default_cte
             LEFT JOIN application_view_cte ON (((processing_count_default_cte.id = application_view_cte.job_id) AND (processing_count_default_cte.resume_processing_state = application_view_cte.resume_processing_state))))
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
    job_cte.company,
    job_cte.created_at,
    job_cte.department,
    job_cte.description,
    job_cte.description_hash,
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
    job_section_count_cte.section_count,
    job_processing_count_cte.processing_count,
    job_flags_cte.flags
   FROM (((job_cte
     LEFT JOIN job_section_count_cte ON ((job_section_count_cte.id = job_cte.id)))
     LEFT JOIN job_processing_count_cte ON ((job_processing_count_cte.id = job_cte.id)))
     LEFT JOIN job_flags_cte ON ((job_flags_cte.id = job_cte.id)));


CREATE TRIGGER fail_processing_applications AFTER UPDATE OF processing_status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_fail_processing_applications();


