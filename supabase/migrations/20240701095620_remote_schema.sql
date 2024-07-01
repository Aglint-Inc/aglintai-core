alter table "public"."request_session_relation" drop constraint "request_session_relation_request_availability_id_fkey";

alter table "public"."request_session_relation" drop constraint "request_session_relation_session_id_fkey";

drop view if exists "public"."application_view";

drop view if exists "public"."meeting_details";

drop view if exists "public"."tasks_view";

alter table "public"."request_session_relation" drop constraint "request_session_relation_pkey";

drop index if exists "public"."request_session_relation_pkey";

alter table "public"."interview_meeting" alter column "meeting_flow" drop default;

alter type "public"."meeting_flow" rename to "meeting_flow__old_version_to_be_dropped";

create type "public"."meeting_flow" as enum ('self_scheduling', 'candidate_request', 'debrief', 'mail_agent', 'phone_agent');

alter table "public"."interview_meeting" alter column meeting_flow type "public"."meeting_flow" using meeting_flow::text::"public"."meeting_flow";

alter table "public"."interview_meeting" alter column "meeting_flow" set default 'self_scheduling'::meeting_flow;

drop type "public"."meeting_flow__old_version_to_be_dropped";

alter table "public"."request_session_relation" alter column "request_availability_id" drop default;

alter table "public"."request_session_relation" alter column "session_id" drop default;

alter table "public"."request_session_relation" disable row level security;

CREATE UNIQUE INDEX request_availability_relation_pkey ON public.request_session_relation USING btree (id);

alter table "public"."request_session_relation" add constraint "request_availability_relation_pkey" PRIMARY KEY using index "request_availability_relation_pkey";

alter table "public"."request_session_relation" add constraint "request_availability_relation_request_availability_id_fkey" FOREIGN KEY (request_availability_id) REFERENCES candidate_request_availability(id) ON DELETE CASCADE not valid;

alter table "public"."request_session_relation" validate constraint "request_availability_relation_request_availability_id_fkey";

alter table "public"."request_session_relation" add constraint "request_availability_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE not valid;

alter table "public"."request_session_relation" validate constraint "request_availability_relation_session_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_user(email text, password text, user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
  DECLARE
    encrypted_pw text;
BEGIN
  -- Generate user_id if not provided
  IF user_id IS NULL THEN
    user_id := gen_random_uuid();
  END IF;
  
  -- Encrypt the password
  encrypted_pw := crypt(password, gen_salt('bf'));
  
  -- Insert into auth.users
  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token, raw_app_meta_data, raw_user_meta_data)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00', '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '', '{"provider":"email","providers":["email"]}', '{"name":"chandan","role":"Company","roles":"Company","is_invite":"false","invite_user":{"name":"Dileep","email":"dileep@aglinthq.com"}}');
  
  -- Insert into auth.identities
  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), user_id, gen_random_uuid(), format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_data_count(rec_id uuid, text_search_filter text DEFAULT NULL::text, job_id_filter uuid[] DEFAULT NULL::uuid[], cord_ids uuid[] DEFAULT NULL::uuid[], status_filter text[] DEFAULT NULL::text[], schedule_type_filter text[] DEFAULT NULL::text[], module_ids uuid[] DEFAULT NULL::uuid[])
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    total_candidates_count integer;
BEGIN
    -- Count total number of candidates
    SELECT count(*) INTO total_candidates_count
    FROM
        applications ja      
        JOIN candidates cand ON ja.candidate_id = cand.id     
        JOIN public_jobs pj ON pj.id = ja.job_id
        LEFT JOIN interview_schedule insc ON insc.application_id = ja.id
        -- LEFT JOIN interview_meeting intmeet ON intmeet.interview_schedule_id = insc.id
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
        ) ;

    RETURN total_candidates_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_rec_id(target_rec_id uuid)
 RETURNS TABLE(interview_meeting json, users json, candidate json)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
    RETURN QUERY
    SELECT 
        json_build_object(
            'meeting_id', intmeet.id,
            'start_time', intmeet.start_time,
            'end_time', intmeet.end_time,
            'session_duration', intses.session_duration,
            'status', intmeet.status,
            'session_name', intses.name,
            'schedule_type', intses.schedule_type,
            'job_title', pj.job_title,
            'job_id',pj.id

        ) AS interview_meeting,
        (
            SELECT json_agg(json_build_object(
                'id', recuser.user_id,
                'first_name', recuser.first_name,
                'last_name', recuser.last_name,
                'email', recuser.email,
                'profile_image', recuser.profile_image,
                'position', recuser.position,
                'training_type', intsr.training_type,
                'interviewer_type', intsr.interviewer_type,
                'location', recuser.interview_location,
                'scheduling_settings', recuser.scheduling_settings,
                'is_confirmed', intsr.is_confirmed,
                'weekly_meetings', (
                    SELECT json_agg(json_build_object(
                        'start_time', im2.start_time,
                        'end_time', im2.end_time,
                        'duration', ints2.session_duration,
                        'accepted_status', intsr2.accepted_status
                    ))
                    FROM interview_session_relation intsr2
                    JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id
                    JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id
                    JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                    JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                    WHERE recuser2.user_id = recuser.user_id
                    AND intsr2.is_confirmed = true
                    AND im2.start_time >= date_trunc('week', CURRENT_DATE)
                    AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
                )
            ))
            FROM interview_session_relation intsr
            JOIN interview_module_relation intmr ON intmr.id = intsr.interview_module_relation_id
            LEFT JOIN recruiter_user recuser ON recuser.user_id = intmr.user_id
            JOIN interview_session ints ON intsr.session_id = ints.id
            JOIN interview_module indmod1 ON indmod1.id = ints.module_id
            JOIN interview_meeting im ON ints.meeting_id = im.id
            WHERE im.id = intmeet.id
        ) AS users,
        (
            SELECT json_build_object(
                'candidate_id', c.id,
                'first_name', c.first_name,
                'last_name', c.last_name,
                'email', c.email,
                'phone_number', c.phone,
                'application_id', app.id
            )
            FROM candidates c
            JOIN applications app ON app.candidate_id = c.id
            WHERE app.id = insc.application_id
        ) AS candidate
    FROM interview_meeting intmeet
    JOIN interview_session intses ON intses.meeting_id = intmeet.id
    JOIN interview_module indmod ON indmod.id = intses.module_id
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id
    JOIN applications app ON app.id = insc.application_id
    JOIN public_jobs pj ON pj.id = app.job_id
    LEFT JOIN interview_session_relation intsesrel ON intses.id = intsesrel.session_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
    LEFT JOIN recruiter_user ru ON ru.user_id = intmodrel.user_id
    WHERE pj.recruiter_id = target_rec_id 
      AND intmeet.status IN ('completed', 'confirmed', 'cancelled', 'waiting')
    GROUP BY intmeet.id, insc.id, intses.id, app.id, pj.id;
END;$function$
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
    interview_schedule.application_id
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



