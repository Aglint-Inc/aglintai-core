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

CREATE OR REPLACE FUNCTION public.batchscorecron(function_value text)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
BEGIN
 -- Check the value of function_value parameter
             RAISE LOG 'SCORE SCORE SCORE % ⭐️ %', function_url, function_value;
    IF function_value = 'first' THEN
        -- Check if resumescorefirst() returns NULL
        IF batchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            SELECT value INTO function_url FROM env WHERE name = 'resumecron-batchscore';
            RAISE LOG 'SCORE SCORE SCORE % 🔥 %', function_url, function_value;
            request_results := net.http_post(
                url := function_url,
                body := jsonb_build_object('function', function_value)
                -- Optionally, add headers or other parameters if required
            );
        END IF;
    ELSIF function_value = 'second' THEN
        -- Check if resumescoresecond() returns NULL
        IF retrybatchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            SELECT value INTO function_url FROM env WHERE name = 'resumecron-batchscore';
            request_results := net.http_post(
                url := function_url,
                body := jsonb_build_object('function', function_value)
                -- Optionally, add headers or other parameters if required
            );
        END IF;
    ELSIF function_value = 'third' THEN
        -- Check if resumescoresecond() returns NULL
        IF secondretrybatchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            SELECT value INTO function_url FROM env WHERE name = 'resumecron-batchscore';
            request_results := net.http_post(
                url := function_url,
                body := jsonb_build_object('function', function_value)
                -- Optionally, add headers or other parameters if required
            );
        END IF;
    END IF;
    RETURN request_results;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.batchtriggergreenhouse()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
BEGIN
    IF batchsavegreenhouse() IS NOT NULL THEN
        -- Make a single HTTP request for the aggregated data
        SELECT value INTO function_url FROM env WHERE name = 'greenhouse-batchsave';
        -- Make a single HTTP request for the aggregated data
        request_results := net.http_post(
        url := function_url
            -- Add other parameters like headers or data if needed
        );
    END IF;
    -- Return the HTTP request result
    RETURN request_results;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.company_email_template_init()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
   PERFORM  insert_company_email_templates(NEW.id);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_new_workflow_action_log(workflow_id uuid, workflow_action_id uuid, interval_minutes numeric, phase text, meta json, base_time timestamp with time zone DEFAULT now())
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    execute_at TIMESTAMP with time zone;
BEGIN
    IF base_time IS NULL THEN
        base_time := NOW();
    END IF;
    -- Calculate execution time based on the phase and interval
    IF phase = 'before' THEN
        execute_at := base_time - (interval_minutes * INTERVAL '1 minute');
    ELSE
        execute_at := base_time + (interval_minutes * INTERVAL '1 minute');
    END IF;

    -- Insert record into workflow_action_logs
    INSERT INTO workflow_action_logs (workflow_id, workflow_action_id, meta, execute_at)
    VALUES (workflow_id, workflow_action_id, meta, execute_at);
END;
$function$
;

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

CREATE OR REPLACE FUNCTION public.get_applicant_locations(job_id uuid)
 RETURNS TABLE(locations jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  WITH cities_per_state AS (
  SELECT
    candidates.country,
    candidates.state,
    jsonb_agg(DISTINCT candidates.city) AS cities
  FROM
    public_jobs
    INNER JOIN applications ON applications.job_id = public_jobs.id
    INNER JOIN candidates ON candidates.id = applications.candidate_id
  WHERE
    public_jobs.id = get_applicant_locations.job_id
    AND candidates.city IS NOT NULL
    AND candidates.state IS NOT NULL
    AND candidates.country IS NOT NULL
  GROUP BY
    candidates.country,
    candidates.state
    ),
  states_per_country AS (
  SELECT
    country,
    jsonb_object_agg(
      state,
      cities
    ) AS states
  FROM
    cities_per_state
  GROUP BY
    country
),
countries_per_job AS (
  SELECT
    jsonb_object_agg(
      country,
      states
    ) AS countries
  FROM
    states_per_country
)
SELECT
  countries AS locations
FROM
  countries_per_job;
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

CREATE OR REPLACE FUNCTION public.insert_company_email_templates(p_recruiter_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN

INSERT INTO
    public.company_email_template (subject, body, from_name, type, recruiter_id)
VALUES
    (
        'Invitation to Debrief Session for {{candidateName}}''s Interview for {{jobRole}}',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span> ,</p><p></p><p>Please join the debrief session to discuss <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> ''s interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> . Your insights are valuable to the selection process.</p><p>Thanks,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
        '{{interviewerFirstName}}',
        'debrief_email_interviewer',
        p_recruiter_id
    ),
    (
        'Cancellation Request from {{candidateFirstName}} for {{jobTitle}} Interview',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="recruiterName">{{recruiterName}}</span>,</p><p></p><p><span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> is requesting to cancel the interview, stating the reason: <span class="temp-variable" data-type="temp-variable" data-id="cancelReason">{{cancelReason}}</span> }}.</p><p>Additional notes from <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>: <span class="temp-variable" data-type="temp-variable" data-id="additionalRescheduleNotes">{{additionalRescheduleNotes}}</span>.</p><p></p><p>Thank you,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
        '{{recruiterName}}',
        'InterviewCancelReq_email_recruiter',
        p_recruiter_id
    ),
    (
        'Interview Cancellation: {{jobRole}} Position',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>,</p><p></p><p>I regret to inform you that we need to cancel your scheduled interview session at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="recruiterName">{{recruiterName}}</span><br><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
        '{{recruiterName}}',
        'interviewCancel_email_applicant',
        p_recruiter_id
    ),
    (
        'Reschedule Request from {{candidateFirstName}} for {{jobTitle}} Interview',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="recruiterName">{{recruiterName}}</span>,</p><p></p><p><span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> is requesting to reschedule their interview between <span class="temp-variable" data-type="temp-variable" data-id="startDate">{{startDate}}</span> and <span class="temp-variable" data-type="temp-variable" data-id="endDate">{{endDate}}</span> stating the reason: <span class="temp-variable" data-type="temp-variable" data-id="rescheduleReason">{{rescheduleReason}}</span>.</p><p></p><p>Additional notes from <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>: <span class="temp-variable" data-type="temp-variable" data-id="additionalRescheduleNotes">{{additionalRescheduleNotes}}</span>.</p><p></p><p>Thank you,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
        '{{recruiterName}}',
        'interReschedReq_email_recruiter',
        p_recruiter_id
    ),
    (
        'Invitation to a Phone Screening Session for {{firstName}} - {{jobTitle}} Position at {{companyName}}',
        '<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well. We appreciate your interest in the {{ jobTitle }} position at {{ companyName }}, and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: {{ phoneScreeningLink }}</p><p>Best regards,</p><p>{{ companyName }}</p>',
        '{{ recruiterFullName }}',
        'phoneScreen_email_candidate',
        p_recruiter_id
    ),
    (
        'Interview reminder',
        'Interview reminder
',
        '',
        'interviewStart_slack_interviewers',
        p_recruiter_id
    ),
    (
        'Reminder: Schedule Your Interview for {{jobRole}} at {{companyName}}',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>This is a friendly reminder about the self-schedule interview request you received for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please use the following link to schedule your interview: <span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
        '{{recruiterName}}',
        'selfScheduleReminder_email_applicant',
        p_recruiter_id
    ),
    (
        'Interview Details',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="recruiterName">{{recruiterName}}</span>,</p><p></p><p>Please find the details for the interview below:</p><p>Candidate name: <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> from job <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> <br></p><p>Thank you</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p><p></p>',
        '{{recruiterName}}',
        'confInterview_email_organizer',
        p_recruiter_id
    ),
    (
        'Interview Reschedule: {{jobRole}} Position',
        '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> ,</p><p style="text-align: start">I hope this message finds you well.</p><p style="text-align: start">Due to unforeseen circumstances, we need to reschedule your interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We apologize for any inconvenience this may cause and appreciate your understanding.</p><p style="text-align: start">To find a new time that works best for you, please use the following link to schedule your interview: <span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p style="text-align: start">If you have any questions or need further assistance, feel free to reach out to us.</p><p style="text-align: start">Looking forward to connecting with you!</p><p style="text-align: start">Best regards,</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
        '{{recruiterName}}',
        'interviewReschedule_email_applicant',
        p_recruiter_id
    ),
    (
        'Scheduling Interview for {{jobRole}} Position at {{companyName}}',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p style="text-align: start">Thank you for submitting your application for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We are pleased to announce that you have been selected for an assessment.</p><p style="text-align: start"></p><p style="text-align: start">You are welcome to choose an assessment time that suits your schedule.</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p style="text-align: start"></p><p style="text-align: start">We wish you the best of luck and are eager to hear your insights!</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
        '{{recruiterName}}',
        'sendSelfScheduleRequest_email_applicant',
        p_recruiter_id
    ),
    (
        'Availability request resend mail',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>I hope this message finds you well.</p><p>I am writing to follow up regarding the availability check for your upcoming interview. It appears that the initial link we sent to confirm your availability might not have been received or may have encountered an issue.</p><p>To ensure we can schedule your interview at a convenient time, please find the link below to select your preferred time slots:</p><p><span class="temp-variable" data-type="temp-variable" data-id="availabilityReqLink">{{availabilityReqLink}}</span></p><p></p><p>We apologize for any inconvenience this may have caused and appreciate your understanding.</p><p></p><p>Thank you for your cooperation. We look forward to speaking with you soon.<br></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="recruiterName">{{recruiterName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><p></p><p></p>',
        '{{recruiterName}}',
        'availabilityReqResend_email_candidate',
        p_recruiter_id
    ),
    (
        'Interview Reminder: {{jobRole}} Position at {{companyName}}',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p style="text-align: start">This is a friendly reminder of your upcoming interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> scheduled for <span class="temp-variable" data-type="temp-variable" data-id="startDate">{{startDate}}</span><strong> at </strong><span class="temp-variable" data-type="temp-variable" data-id="time">{{time}}</span>.</p><p style="text-align: start"></p><p style="text-align: start">We look forward to a successful interview!</p><p style="text-align: start"></p><p style="text-align: start">Warm regards,</p><p style="text-align: start">The <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Team</p><p style="text-align: start"></p>',
        '{{recruiterName}}   ',
        'interviewStart_email_applicant',
        p_recruiter_id
    ),
    (
        'Slack RSVP Message',
        'Coding Interview sheduled with candidate :
Aman Aman - Staff Frontend Engineer
Meeting Place : google_meet
Meeting Time : June 10 04:00 AM - 04:30 AM IST
Duration : 30 Minutes',
        '',
        'interviewEnd_slack_interviewers',
        p_recruiter_id
    ),
    (
        'Schedule Your Interview with {{companyName}} - Important Next Step',
        '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span></p><p></p><p>Congratulations! You have been selected for an interview at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position. Your qualifications are impressive, and we are excited to meet you and discuss them further.</p><p>Please let me know your availability within the following date range: <span class="temp-variable" data-type="temp-variable" data-id="dateRange">{{dateRange}}</span> .if you want the slots in your preffered region let me know your location.</p><p>to find suitable slots.</p><p>Alternatively you can use the following link to schedule your interview: <span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p></p><p>Looking forward to connecting with you</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
        '{{companyName}}',
        'agent_email_candidate',
        p_recruiter_id
    ),
    (
        ' Interview Reminder: {{candidateName}} for {{jobRole}} Position',
        '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>Congratulations! You have been selected for an interview at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position. Your qualifications are impressive, and we are excited to meet you and discuss them further.</p><p>Please let me know your availability within the following date range: <span class="temp-variable" data-type="temp-variable" data-id="startDate">{{startDate}}</span> - <span class="temp-variable" data-type="temp-variable" data-id="endDate">{{endDate}}</span>.</p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
        '{{companyName}}',
        'interviewStart_email_interviewers',
        p_recruiter_id
    ),
    (
        'Confirmation Slack Message To Interviewer',
        'Initial Screening sheduled with candidate :
Muharrem Muharrem - Staff Software Engineer
Meeting Place : google_meet
Meeting Time : June 13 04:30 AM - 05:00 AM IST
Duration : 30 Minutes',
        '',
        'interviewerConfirmation_slack_interviewers',
        p_recruiter_id
    ),
    (
        'Your Interview with {{companyName}} – Confirmation and Details',
        '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>We are pleased to confirm your interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position. Please find the details of your interview below.</p><p></p><p>Regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="recruiterName">{{recruiterName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
        '{{recruiterName}}',
        'confirmInterview_email_applicant',
        p_recruiter_id
    ),
    (
        'Reminder to Applicant',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p style="text-align: start">I hope this message finds you well.</p><p style="text-align: start">I am writing to follow up on my previous email regarding the interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We are very interested in discussing your application and learning more about your experiences.</p><p style="text-align: start">If you could please click on the link below to select your availability for an interview, it would be greatly appreciated:</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="availabilityReqLink">{{availabilityReqLink}}</span></p><p style="text-align: start">If you have any questions or need further information, please feel free to reach out.</p><p style="text-align: start">Thank you, and I look forward to hearing from you soon.</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
        '{{recruiterName}}',
        'sendAvailReqReminder_email_applicant',
        p_recruiter_id
    ),
    (
        'Schedule Your Interview for the {{jobRole}} Position at {{companyName}}',
        '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>Thank you for applying for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We have reviewed your application and are impressed with your qualifications and experiences. We would like to invite you to participate in an interview to further discuss how your skills and experiences align with our needs.</p><p></p><p>To streamline the scheduling process, please click on the link below to select your availability for an interview:</p><p><span class="temp-variable" data-type="temp-variable" data-id="availabilityReqLink">{{availabilityReqLink}}</span></p><p>Looking forward to your response.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
        '{{recruiterName}}',
        'sendAvailabilityRequest_email_applicant',
        p_recruiter_id
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.insert_job_email_template(p_job_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN

INSERT INTO
    job_email_template (subject, body, from_name, type, job_id)
VALUES
    (
        'We received your application for a position at {{companyName}}',
        '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p>Thank you for your interest in the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position.</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
        '{{recruiterName}}',
        'applicationRecieved_email_applicant',
        p_job_id
    ),
    (
        'We received your application for a position at {{companyName}}',
        '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p>Thank you for your interest in the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position.</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
        '{{recruiterName}}',
        'applicantReject_email_applicant',
        p_job_id
    );

END;
$function$
;

CREATE OR REPLACE FUNCTION public.job_email_template_init()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    PERFORM insert_job_email_template(NEW.id);
    RETURN NEW;
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


CREATE OR REPLACE FUNCTION public.trigger_application_import_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE 
  title TEXT;
  logged_by application_logger;
  created_by UUID := NULL;
BEGIN

  CASE NEW.source
    WHEN 'lever' THEN
      title := 'Application imported from Lever';
      logged_by := 'system';
    WHEN 'greenhouse' THEN
      title := 'Application imported from Greenhouse';
      logged_by := 'system';
    WHEN 'ashby' THEN
      title := 'Application imported from Ashby';
      logged_by := 'system';
    WHEN 'apply_link' THEN
      title := 'Application received from Application link';
      logged_by := 'candidate';
    WHEN 'resume_upload' THEN
      title := 'Application uploaded through Resume upload';
      logged_by := 'user';
      created_by := auth.uid();
    WHEN 'csv_upload' THEN
      title := 'Application uploaded through CSV upload';
      logged_by := 'user';
      created_by := auth.uid();
    WHEN 'manual_upload' THEN
      title := 'Application uploaded through Manual upload';
      logged_by := 'user';
      created_by := auth.uid();
  END CASE;

  INSERT INTO application_logs(application_id, title, created_by, logged_by, module)
  VALUES (NEW.id, title, created_by, logged_by, 'jobs');

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  title TEXT;
BEGIN
  IF NEW.processing_status = 'success' AND NEW.overall_score IS NOT NULL AND NEW.overall_score >= 0 THEN
      title := 'Application was scored ' || NEW.overall_score || '%';
      INSERT INTO application_logs(application_id, title, logged_by, module)
      VALUES (NEW.id, title, 'system', 'jobs');
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_status_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  title TEXT;
  logged_by application_logger := 'user';
  created_by UUID := NULL;
BEGIN
  IF auth.uid() IS NULL THEN
    logged_by := 'system';
  ELSE
    created_by := auth.uid();
  END IF;

  title := 'Application moved from ' || OLD.status || ' to ' || NEW.status;

  INSERT INTO application_logs(application_id, title, created_by, logged_by, module)
  VALUES (NEW.id, title, created_by, logged_by, 'jobs');
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_workflow_auto_connect()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  workflow RECORD;
BEGIN
  FOR workflow IN 
    SELECT id 
    FROM workflow 
    WHERE recruiter_id = NEW.recruiter_id 
      AND auto_connect = TRUE
  LOOP
    INSERT INTO workflow_job_relation(job_id, workflow_id)
    VALUES (NEW.id, workflow.id);
  END LOOP;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_action_log_cron()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    url_x text;
    headers_x jsonb;
    wa_record record;
BEGIN
    url_x := 'https://dev.aglinthq.com/api/workflow-cron';
    headers_x := '{"Content-Type": "application/json"}'::jsonb;

    FOR wa_record IN
        SELECT json_build_object('id', w_a_l.id,'workflow_id', w_a_l.workflow_id, 'workflow_action_id', w_a_l.workflow_action_id, 'meta', w_a_l.meta, 'payload', w_a.payload, 'execution_time', w_a_l.execute_at ) AS body,
               w_a_l.id AS id,
               w_a_l.tries AS tries
        FROM workflow_action_logs w_a_l
        JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
        WHERE (w_a_l.status = 'not started' AND w_a_l.execute_at < CURRENT_TIMESTAMP + INTERVAL '1 minute')
           OR (w_a_l.status = 'failed' AND w_a_l.tries <= 3 AND w_a_l.started_at > CURRENT_TIMESTAMP - INTERVAL '6 minutes')
    LOOP
        PERFORM net.http_post(
            url := url_x,
            headers := headers_x,
            body := wa_record.body::jsonb
        );

        UPDATE workflow_action_logs
        SET status = 'processing', tries = wa_record.tries + 1, started_at = NOW()
        WHERE id = wa_record.id;
    END LOOP;

    RETURN true;
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


