alter table "public"."new_tasks_progress"
alter column "progress_type" drop default;
alter type "public"."progress_type"
rename to "progress_type__old_version_to_be_dropped";
create type "public"."progress_type" as enum (
  'standard',
  'interview_schedule',
  'email_messages',
  'call_completed',
  'call_failed',
  'email_failed',
  'call_disconnected',
  'email_follow_up',
  'call_follow_up',
  'email_follow_up_reminder',
  'call_follow_up_reminder',
  'request_availability_list',
  'request_availability',
  'self_schedule',
  'send_email',
  'request_submitted',
  'schedule'
);
create table "public"."function_url" ("value" text);
DROP VIEW IF EXISTS tasks_view;
alter table "public"."new_tasks_progress"
alter column progress_type type "public"."progress_type" using progress_type::text::"public"."progress_type";
alter table "public"."new_tasks_progress"
alter column "progress_type"
set default 'standard'::progress_type;
drop type "public"."progress_type__old_version_to_be_dropped";
set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.batchscorecron(function_value text) RETURNS jsonb LANGUAGE plpgsql AS $function$
DECLARE request_results JSONB;
-- Variable to store the HTTP request result
function_url text;
BEGIN -- Check the value of function_value parameter
RAISE LOG 'SCORE SCORE SCORE % ⭐️ %',
function_url,
function_value;
IF function_value = 'first' THEN -- Check if resumescorefirst() returns NULL
IF batchcalcresumejdscore() IS NOT NULL THEN -- If not NULL, proceed with HTTP POST request
SELECT value INTO function_url
FROM env
WHERE name = 'resumecron-batchscore';
RAISE LOG 'SCORE SCORE SCORE % 🔥 %',
function_url,
function_value;
request_results := net.http_post(
  url := function_url,
  body := jsonb_build_object('function', function_value) -- Optionally, add headers or other parameters if required
);
END IF;
ELSIF function_value = 'second' THEN -- Check if resumescoresecond() returns NULL
IF retrybatchcalcresumejdscore() IS NOT NULL THEN -- If not NULL, proceed with HTTP POST request
SELECT value INTO function_url
FROM env
WHERE name = 'resumecron-batchscore';
request_results := net.http_post(
  url := function_url,
  body := jsonb_build_object('function', function_value) -- Optionally, add headers or other parameters if required
);
END IF;
ELSIF function_value = 'third' THEN -- Check if resumescoresecond() returns NULL
IF secondretrybatchcalcresumejdscore() IS NOT NULL THEN -- If not NULL, proceed with HTTP POST request
SELECT value INTO function_url
FROM env
WHERE name = 'resumecron-batchscore';
request_results := net.http_post(
  url := function_url,
  body := jsonb_build_object('function', function_value) -- Optionally, add headers or other parameters if required
);
END IF;
END IF;
RETURN request_results;
END;
$function$;
CREATE OR REPLACE FUNCTION public.batchtriggergreenhouse() RETURNS jsonb LANGUAGE plpgsql AS $function$
DECLARE request_results JSONB;
-- Variable to store the HTTP request result
function_url text;
BEGIN IF batchsavegreenhouse() IS NOT NULL THEN -- Make a single HTTP request for the aggregated data
SELECT value INTO function_url
FROM env
WHERE name = 'greenhouse-batchsave';
-- Make a single HTTP request for the aggregated data
request_results := net.http_post(
  url := function_url -- Add other parameters like headers or data if needed
);
END IF;
-- Return the HTTP request result
RETURN request_results;
END;
$function$;
CREATE OR REPLACE FUNCTION public.company_email_template_init() RETURNS trigger LANGUAGE plpgsql AS $function$BEGIN
insert into company_email_template (recruiter_id, subject, body, from_name, type)
values (
    NEW.id,
    'We received your application for a position at {{ companyName }}',
    '<p>Hi {{ candidateFirstName }},</p><p>You have successfully submitted your application for this position:</p><p>{{ jobTitle }}</p><p>We will review your application shortly. If your profile matches our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in {{ companyName }}.</p><p>If you have any queries about this job, please visit the following link: {{ supportLink }}</p><p>Sincerely,</p><p>{{ companyName }}</p>',
    '{{ recruiterFullName }}',
    'applicationRecieved_email_applicant'
  ),
  (
    NEW.id,
    'Your application at {{ companyName }}',
    '<p>Hi {{ candidateFirstName }},</p><p>Thank you for your interest in the {{ jobTitle }} position.</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>{{ companyName }}</p><p></p>',
    '{{ recruiterFullName }}',
    'applicantReject_email_applicant'
  ),
  (
    NEW.id,
    'Interview reminder',
    'Interview reminder\n',
    null,
    'interviewStart_slack_interviewers'
  ),
  (
    NEW.id,
    'Invitation to a Phone Screening Session for {{firstName}} - {{jobTitle}} Position at {{companyName}}',
    '<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well. We appreciate your interest in the {{ jobTitle }} position at {{ companyName }}, and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: {{ phoneScreeningLink }}</p><p>Best regards,</p><p>{{ companyName }}</p>',
    '{{ recruiterFullName }}',
    'phoneScreen_email_candidate'
  ),
  (
    NEW.id,
    'Slack RSVP Message',
    'Coding Interview sheduled with candidate :\nAman Aman - Staff Frontend Engineer\nMeeting Place : google_meet\nMeeting Time : June 10 04:00 AM - 04:30 AM IST\nDuration : 30 Minutes',
    null,
    'interviewEnd_slack_interviewers'
  ),
  (
    NEW.id,
    'Confirmation Slack Message To Interviewer',
    'Initial Screening sheduled with candidate :\nMuharrem Muharrem - Staff Software Engineer\nMeeting Place : google_meet\nMeeting Time : June 13 04:30 AM - 05:00 AM IST\nDuration : 30 Minutes',
    null,
    'interviewerConfirmation_slack_interviewers'
  ),
  (
    NEW.id,
    'Reschedule Request from {{ candidateFirstName }} for {{ jobTitle }} Interview',
    '<p>Dear {{ recruiterName }},</p><p></p><p>{{ candidateFirstName }} is requesting to reschedule their interview between {{ dateRange }} stating the reason: ""{{ rescheduleReason }}"".</p><p></p><p>Additional notes from {{ candidateFirstName }}: ""{{ additionalRescheduleNotes }}"".</p><p></p><p>Thank you,</p><p>{{ companyName }} Recruitment Team</p>',
    '{{ recruiterFullName }}',
    'interReschedReq_email_recruiter'
  ),
  (
    NEW.id,
    'Interview Details',
    '<p>Dear {{ recruiterFirstName }},</p><p></p><p>Please find the details for the interview below:</p><p>Candidate name: {{ candidateFirstName }}<br></p><p>Thank you</p><p>Aglint Team</p><p></p><p></p>',
    '{{ recruiterFullName }}',
    'confInterview_email_organizer'
  ),
  (
    NEW.id,
    'Interview Cancellation: {{ jobTitle }} Position',
    '<p>Dear {{ candidateFirstName }},</p><p></p><p>I regret to inform you that we need to cancel your scheduled interview session at {{ companyName }}.</p><p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p><p></p><p>Best regards,<br>{{ companyName }}</p>',
    '{{ recruiterFullName }}',
    'interviewCancel_email_applicant'
  ),
  (
    NEW.id,
    'Your Interview with {{ companyName }} – Confirmation and Details',
    '<p>H {{ candidateFirstName }},</p><p></p><p>We are pleased to confirm your interview for the {{ jobTitle }} position. Please find the details of your interview below.</p><p></p><p>Regards,</p><p>{{ companyName }}  Recruitment Team</p>',
    '{{ recruiterFullName }}',
    'confirmInterview_email_applicant'
  ),
  (
    NEW.id,
    'Cancellation Request from {{ candidateFirstName }} for {{ jobTitle }} Interview',
    '<p>Dear {{ recruiterName }},</p><p></p><p>{{ candidateFirstName }} is requesting to cancel the interview, stating the reason: ""{{ cancelReason }}"".</p><p>Additional notes from {{ candidateFirstName }}: ""{{ additionalRescheduleNotes }}"".</p><p></p><p>Thank you,</p><p>{{ companyName }} Recruitment Team</p>',
    '{{ recruiterFullName }}',
    'InterviewCancelReq_email_recruiter'
  ),
  (
    NEW.id,
    'Reminder: Schedule Your Interview for {{ jobTitle }} at {{ companyName }}',
    '<p>Dear {{ candidateFirstName }},</p><p></p><p>This is a friendly reminder about the self-schedule interview request you received for the {{ jobTitle }} position at {{ companyName }}.</p><p></p><p>Please use the following link to schedule your interview: {{ selfScheduleLink }}</p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p>',
    '{{ recruiterFullName }}',
    'selfScheduleReminder_email_applicant'
  ),
  (
    NEW.id,
    'Interview Reminder: {{ candidateName }} for {{ jobTitle }} Position',
    '<p>Dear {{ recruiterName }},</p><p></p><p>This is a friendly reminder about the interview with {{ candidateName }}. Please find the details below:</p><ul><li><p><strong>Candidate Name:</strong> {{ candidateName }}</p></li><li><p><strong>Position:</strong> {{ jobTitle }}</p></li><li><p><strong>Date:</strong> {{ date }}</p></li><li><p><strong>Time:</strong> {{ time }}</p></li></ul><p></p><p>Thank you,</p><p>The {{ companyName }} Recruitment Team</p>',
    '{{ recruiterFullName }}',
    'interviewStart_email_interviewers'
  ),
  (
    NEW.id,
    'Interview Reminder: {{ jobTitle }} Position at {{ companyName }}',
    '<p>Dear {{ candidateName }},</p><p></p><p style=""text-align: start"">This is a friendly reminder of your upcoming interview for the {{ jobTitle }} position at {{ companyName }} scheduled for <strong>{{ date }} at {{ time }}</strong>.</p><p style=""text-align: start""></p><p style=""text-align: start"">We look forward to a successful interview!</p><p style=""text-align: start""></p><p style=""text-align: start"">Warm regards,</p><p style=""text-align: start"">The {{ companyName }} Team</p><p style=""text-align: start""></p>',
    '{{ recruiterFullName }}   ',
    'interviewStart_email_applicant'
  ),
  (
    NEW.id,
    'Interview Reschedule: {{jobTitle}} Position',
    '<p>Hi {{ candidateFirstName }},</p><p></p><p>I hope this message finds you well.</p><p>Due to unforeseen circumstances, we need to reschedule your interview for the {{ jobRole }} position at {{ companyName }}. We apologize for any inconvenience this may cause and appreciate your understanding.</p><p>To find a new time that works best for you, please use the following link to schedule your interview: {{ selfScheduleLink }}</p><p>If you have any questions or need further assistance, feel free to reach out to us.</p><p>Looking forward to connecting with you!</p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p><p></p>',
    '{{ recruiterFullName }}',
    'interviewReschedule_email_applicant'
  ),
  (
    NEW.id,
    'Schedule Your Interview for the {{ jobTitle }} Position at {{ companyName }}',
    '<p>Dear {{ candidateFirstName }},</p><p></p><p>Thank you for applying for the {{ jobTitle }} position at {{ companyName }}. We have reviewed your application and are impressed with your qualifications and experiences. We would like to invite you to participate in an interview to further discuss how your skills and experiences align with our needs.</p><p></p><p>To streamline the scheduling process, please click on the link below to select your availability for an interview:</p><p>{{ availabilityReqLink }}</p><p>Looking forward to your response.</p><p></p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p>',
    '{{ recruiterFullName }}',
    'sendAvailabilityRequest_email_applicant'
  ),
  (
    NEW.id,
    'Schedule Your Interview with {{ companyName }} - Important Next Step',
    '<p>Hi {{ candidateFirstName }},</p><p></p><p>Congratulations! You have been selected for an interview at {{ companyName }} for the {{ jobRole }} position. Your qualifications are impressive, and we are excited to meet you and discuss them further.</p><p>Please let me know your availability within the following date range: {{ startDate }} - {{ endDate }} ({{ recruiterTimeZone }}).</p><p></p><p>Also, to make sure we find an interview time that works well for you, could you tell us your general location.</p><p>Or use the following link to schedule your interview: {{ selfScheduleLink }}</p><p></p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,<br>{{ companyName }} Recruitment Team</p>',
    '{{recruiterFullName}}',
    'agent_email_candidate'
  ),
  (
    NEW.id,
    'Availability request resend mail',
    '<p>Dear {{ candidateFirstName }},</p><p></p><p>I hope this message finds you well.</p><p>I am writing to follow up regarding the availability check for your upcoming interview. It appears that the initial link we sent to confirm your availability might not have been received or may have encountered an issue.</p><p>To ensure we can schedule your interview at a convenient time, please find the link below to select your preferred time slots:</p><p>{{ availabilityReqLink }}</p><p></p><p>We apologize for any inconvenience this may have caused and appreciate your understanding. If you encounter any issues with the link or have any questions, please do not hesitate to reach out.</p><p>Thank you for your cooperation. We look forward to speaking with you soon.<br></p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p><p></p><p></p>',
    '{{ recruiterFullName }}',
    'availabilityReqResend_email_candidate'
  ),
  (
    NEW.id,
    'Invitation to Debrief Session for {{ candidateFirstName }}''s Interview for {{ jobTitle }}',
    '<p>Dear {{ interviewerFirstName }},</p><p></p><p>Please join the debrief session to discuss {{ candidateFirstName }}''s interview for {{ jobTitle }}. Your insights are valuable to the selection process.</p><p></p><p>Thanks,</p><p>{{ companyName }} Recruitment Team</p>',
    '{{recruiterFirstName }}',
    'debrief_email_interviewer'
  ),
  (
    NEW.id,
    'Reminder to Applicant',
    '<p>Dear {{ candidateFirstName }},</p><p></p><p style=""text-align: start"">I hope this message finds you well.</p><p style=""text-align: start"">I am writing to follow up on my previous email regarding the interview for the {{ jobTitle }} position at {{ companyName }}. We are very interested in discussing your application and learning more about your experiences.</p><p style=""text-align: start"">If you could please click on the link below to select your availability for an interview, it would be greatly appreciated:</p><p style=""text-align: start"">{{ availabilityLink }}</p><p style=""text-align: start"">If you have any questions or need further information, please feel free to reach out.</p><p style=""text-align: start"">Thank you, and I look forward to hearing from you soon.</p><p style=""text-align: start""></p><p style=""text-align: start"">Best regards,</p><p>{{ companyName }} Recruitment Team</p>',
    '{{ recruiterFullName }}',
    'sendAvailReqReminder_email_applicant'
  ),
  (
    NEW.id,
    'Scheduling Interview for {{ jobTitle }} Position at {{ companyName }}',
    '<p>Dear {{ candidateFirstName }},</p><p></p><p style=""text-align: start"">Thank you for submitting your application for the {{ jobTitle }} at {{ companyName }}. We are pleased to announce that you have been selected for an assessment.</p><p style=""text-align: start""></p><p style=""text-align: start"">You are welcome to choose an assessment time that suits your schedule.</p><p style=""text-align: start"">{{ selfScheduleLink}}</p><p style=""text-align: start""></p><p style=""text-align: start"">We wish you the best of luck and are eager to hear your insights!</p><p style=""text-align: start""></p><p style=""text-align: start"">Best regards,</p><p>{{ companyName }} Recruitment Team</p>',
    '{{ recruiterFullName }}',
    'sendSelfScheduleRequest_email_applicant'
  ),
  (
    NEW.id,
    's',
    '<p>Dear {{ candidateFirstName }},</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the {{ jobTitle }} position at {{ companyName }}. We would not want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>{{ phoneScreeningLink }}</p><p>We look forward to hearing from you soon!</p><p>Warm regards,</p><p>{{ companyName }}</p>',
    '{{ recruiterFullName }}',
    'phoneScreenRemind_email_applicant'
  );
INSERT INTO integrations (recruiter_id)
values(NEW.id);
RETURN NEW;
END;
$function$;
CREATE OR REPLACE FUNCTION public.create_new_workflow_action_log(
    workflow_id uuid,
    workflow_action_id uuid,
    interval_minutes numeric,
    phase text,
    meta json,
    base_time timestamp with time zone DEFAULT now()
  ) RETURNS void LANGUAGE plpgsql AS $function$
DECLARE execute_at TIMESTAMP with time zone;
BEGIN IF base_time IS NULL THEN base_time := NOW();
END IF;
-- Calculate execution time based on the phase and interval
IF phase = 'before' THEN execute_at := base_time - (interval_minutes * INTERVAL '1 minute');
ELSE execute_at := base_time + (interval_minutes * INTERVAL '1 minute');
END IF;
-- Insert record into workflow_action_logs
INSERT INTO workflow_action_logs (
    workflow_id,
    workflow_action_id,
    meta,
    execute_at
  )
VALUES (
    workflow_id,
    workflow_action_id,
    meta,
    execute_at
  );
END;
$function$;
CREATE OR REPLACE FUNCTION public.get_applicant_locations(job_id uuid) RETURNS TABLE(locations jsonb) LANGUAGE plpgsql AS $function$ BEGIN RETURN QUERY WITH cities_per_state AS (
    SELECT candidates.country,
      candidates.state,
      jsonb_agg(DISTINCT candidates.city) AS cities
    FROM public_jobs
      INNER JOIN applications ON applications.job_id = public_jobs.id
      INNER JOIN candidates ON candidates.id = applications.candidate_id
    WHERE public_jobs.id = get_applicant_locations.job_id
      AND candidates.city IS NOT NULL
      AND candidates.state IS NOT NULL
      AND candidates.country IS NOT NULL
    GROUP BY candidates.country,
      candidates.state
  ),
  states_per_country AS (
    SELECT country,
      jsonb_object_agg(state, cities) AS states
    FROM cities_per_state
    GROUP BY country
  ),
  countries_per_job AS (
    SELECT jsonb_object_agg(country, states) AS countries
    FROM states_per_country
  )
SELECT countries AS locations
FROM countries_per_job;
END;
$function$;
CREATE OR REPLACE FUNCTION public.trigger_application_import_log() RETURNS trigger LANGUAGE plpgsql AS $function$
DECLARE title TEXT;
logged_by application_logger;
created_by UUID := NULL;
BEGIN CASE
  NEW.source
  WHEN 'lever' THEN title := 'Application imported from Lever';
logged_by := 'system';
WHEN 'greenhouse' THEN title := 'Application imported from Greenhouse';
logged_by := 'system';
WHEN 'ashby' THEN title := 'Application imported from Ashby';
logged_by := 'system';
WHEN 'apply_link' THEN title := 'Application received from Application link';
logged_by := 'candidate';
WHEN 'resume_upload' THEN title := 'Application uploaded through Resume upload';
logged_by := 'user';
created_by := auth.uid();
WHEN 'csv_upload' THEN title := 'Application uploaded through CSV upload';
logged_by := 'user';
created_by := auth.uid();
WHEN 'manual_upload' THEN title := 'Application uploaded through Manual upload';
logged_by := 'user';
created_by := auth.uid();
END CASE
;
INSERT INTO application_logs(
    application_id,
    title,
    created_by,
    logged_by,
    module
  )
VALUES (NEW.id, title, created_by, logged_by, 'jobs');
RETURN NEW;
END;
$function$;
CREATE OR REPLACE FUNCTION public.trigger_application_score_log() RETURNS trigger LANGUAGE plpgsql AS $function$
DECLARE title TEXT;
BEGIN IF NEW.processing_status = 'success'
AND NEW.overall_score IS NOT NULL
AND NEW.overall_score >= 0 THEN title := 'Application was scored ' || NEW.overall_score || '%';
INSERT INTO application_logs(application_id, title, logged_by, module)
VALUES (NEW.id, title, 'system', 'jobs');
END IF;
RETURN NEW;
END;
$function$;
CREATE OR REPLACE FUNCTION public.trigger_application_status_log() RETURNS trigger LANGUAGE plpgsql AS $function$
DECLARE title TEXT;
logged_by application_logger := 'user';
created_by UUID := NULL;
BEGIN IF auth.uid() IS NULL THEN logged_by := 'system';
ELSE created_by := auth.uid();
END IF;
title := 'Application moved from ' || OLD.status || ' to ' || NEW.status;
INSERT INTO application_logs(
    application_id,
    title,
    created_by,
    logged_by,
    module
  )
VALUES (NEW.id, title, created_by, logged_by, 'jobs');
RETURN NEW;
END;
$function$;
CREATE OR REPLACE FUNCTION public.trigger_workflow_action_deletion() RETURNS trigger LANGUAGE plpgsql AS $function$ BEGIN IF NEW."trigger" <> OLD."trigger" THEN
DELETE FROM workflow_action
WHERE workflow_action.workflow_id = OLD.id;
END IF;
RETURN NEW;
END;
$function$;
CREATE OR REPLACE FUNCTION public.trigger_workflow_auto_connect() RETURNS trigger LANGUAGE plpgsql AS $function$
DECLARE workflow RECORD;
BEGIN FOR workflow IN
SELECT id
FROM workflow
WHERE recruiter_id = NEW.recruiter_id
  AND auto_connect = TRUE LOOP
INSERT INTO workflow_job_relation(job_id, workflow_id)
VALUES (NEW.id, workflow.id);
END LOOP;
return new;
end;
$function$;
CREATE OR REPLACE FUNCTION public.workflow_action_log_cron() RETURNS boolean LANGUAGE plpgsql AS $function$
DECLARE url_x text;
headers_x jsonb;
wa_record record;
BEGIN url_x := 'https://dev.aglinthq.com/api/workflow-cron';
headers_x := '{"Content-Type": "application/json"}'::jsonb;
FOR wa_record IN
SELECT json_build_object(
    'id',
    w_a_l.id,
    'workflow_id',
    w_a_l.workflow_id,
    'workflow_action_id',
    w_a_l.workflow_action_id,
    'meta',
    w_a_l.meta,
    'payload',
    w_a.payload,
    'execution_time',
    w_a_l.execute_at
  ) AS body,
  w_a_l.id AS id,
  w_a_l.tries AS tries
FROM workflow_action_logs w_a_l
  JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
WHERE (
    w_a_l.status = 'not started'
    AND w_a_l.execute_at < CURRENT_TIMESTAMP + INTERVAL '1 minute'
  )
  OR (
    w_a_l.status = 'failed'
    AND w_a_l.tries <= 3
    AND w_a_l.started_at > CURRENT_TIMESTAMP - INTERVAL '6 minutes'
  ) LOOP PERFORM net.http_post(
    url := url_x,
    headers := headers_x,
    body := wa_record.body::jsonb
  );
UPDATE workflow_action_logs
SET status = 'processing',
  tries = wa_record.tries + 1,
  started_at = NOW()
WHERE id = wa_record.id;
END LOOP;
RETURN true;
END;
$function$;
CREATE OR REPLACE FUNCTION public.workflow_action_log_set_fail_cron() RETURNS boolean LANGUAGE plpgsql AS $function$ BEGIN
Update workflow_action_logs
set status = 'failed'
where started_at < CURRENT_TIMESTAMP - INTERVAL '4 minutes';
RETURN true;
END;
$function$;
CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_interview_filter_json() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $function$
DECLARE wa_record RECORD;
trigger_case text;
meeting_ids uuid [];
workflow_id uuid;
BEGIN IF cardinality(NEW.session_ids) <> 0 THEN
SELECT array_agg(meeting_id) INTO meeting_ids
FROM interview_session
WHERE id = any(NEW.session_ids);
FOR wa_record IN
SELECT wa.id AS workflow_action_id,
  w.id AS workflow_id,
  w.interval AS interval_minutes,
  w.phase AS phase,
  json_build_object(
    'schedule_id',
    i_s.id,
    'application_id',
    i_s.application_id,
    'job_id',
    a.job_id,
    'email_type',
    c_e_t.type,
    'meeting_ids',
    meeting_ids,
    'filter_id',
    NEW.id
  ) AS meta
FROM interview_schedule i_s
  JOIN applications a ON i_s.application_id = a.id
  JOIN workflow_job_relation war ON war.job_id = a.job_id
  JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
  JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
  JOIN workflow w ON war.workflow_id = w.id
WHERE i_s.id = NEW.schedule_id
  AND w.trigger::text = 'selfScheduleReminder' LOOP PERFORM create_new_workflow_action_log(
    wa_record.workflow_id,
    wa_record.workflow_action_id,
    wa_record.interval_minutes,
    wa_record.phase::text,
    wa_record.meta
  );
END LOOP;
END IF;
RETURN NEW;
END;
$function$;
CREATE OR REPLACE FUNCTION public.workflow_log_on_update_candidate_request_availability() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $function$
DECLARE wa_record RECORD;
trigger_case text;
workflow_id uuid;
BEGIN if NEW.slots is not null then FOR wa_record IN
select w_a.workflow_id as workflow_id,
  w_a.id as workflow_action_id,
  w.interval as interval_minutes,
  w.phase as phase,
  json_build_object(
    'schedule_id',
    i_s.id,
    'application_id',
    i_s.application_id,
    'email_type',
    c_e_t.type,
    'availability_req_id',
    NEW.id,
    'sessions',
    NEW.session_ids
  ) as meta
from interview_schedule i_s
  JOIN applications a ON a.id = i_s.application_id
  JOIN workflow_job_relation w_a_r ON w_a_r.job_id = a.job_id
  JOIN workflow w ON w.id = w_a_r.workflow_id
  JOIN workflow_action w_a ON w_a.workflow_id = w_a_r.workflow_id
  JOIN company_email_template c_e_t ON c_e_t.id = w_a.email_template_id
WHERE i_s.application_id = NEW.application_id
  AND w.trigger::text = 'sendAvailReqReminder' LOOP PERFORM create_new_workflow_action_log(
    wa_record.workflow_id,
    wa_record.workflow_action_id,
    wa_record.interval_minutes,
    wa_record.phase::text,
    wa_record.meta
  );
END LOOP;
END if;
RETURN NEW;
END;
$function$;
CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_meeting() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $function$
DECLARE wa_record RECORD;
trigger_case text;
workflow_id uuid;
BEGIN if NEW.status::text = 'confirmed' then FOR wa_record IN
SELECT wa.workflow_id as workflow_id,
  wa.id as workflow_action_id,
  w.interval as interval_minutes,
  w.phase as phase,
  json_build_object(
    'schedule_id',
    i_s.id,
    'application_id',
    i_s.application_id,
    'meeting_id',
    NEW.id,
    'start_time',
    NEW.start_time,
    'candidate_id',
    a.candidate_id,
    'email_type',
    c_e_t.type
  ) as meta
FROM interview_schedule i_s
  JOIN applications a ON i_s.application_id = a.id
  JOIN workflow_job_relation war ON war.job_id = a.job_id
  JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
  JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
  JOIN workflow w ON war.workflow_id = w.id
WHERE i_s.id = NEW.interview_schedule_id
  AND w.trigger::text = 'interviewStart'
  AND c_e_t.type = 'interviewStart_email_applicant' LOOP PERFORM create_new_workflow_action_log(
    wa_record.workflow_id,
    wa_record.workflow_action_id,
    wa_record.interval_minutes,
    wa_record.phase::text,
    wa_record.meta,
    NEW.start_time
  );
END LOOP;
END if;
RETURN NEW;
END;
$function$;
CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_session_relation() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $function$
DECLARE wa_record RECORD;
trigger_case text;
workflow_id uuid;
BEGIN IF NEW.is_confirmed THEN FOR wa_record IN
SELECT wa.workflow_id as workflow_id,
  wa.id as workflow_action_id,
  w.interval as interval_minutes,
  w.phase as phase,
  i_m.start_time as start_time,
  w.trigger as trigger,
  i_m_s.session_duration as session_duration,
  json_build_object(
    'schedule_id',
    i_s.id,
    'application_id',
    i_s.application_id,
    'meeting_id',
    i_m.id,
    'start_time',
    i_m.start_time,
    'recruiter_user_id',
    m_i.user_id,
    'email_type',
    c_e_t.type,
    'session_id',
    NEW.session_id
  ) as meta
FROM interview_session i_m_s
  JOIN interview_meeting i_m ON i_m.id = i_m_s.meeting_id
  JOIN meeting_interviewers m_i ON m_i.session_id = i_m_s.id
  JOIN interview_schedule i_s ON i_s.id = i_m.interview_schedule_id
  JOIN applications a ON i_s.application_id = a.id
  JOIN workflow_job_relation war ON war.job_id = a.job_id
  JOIN workflow w ON war.workflow_id = w.id
  JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
  JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
WHERE i_m_s.id = NEW.session_id
  AND c_e_t.type <> 'interviewStart_email_applicant'
  and (
    w.trigger::text = 'interviewStart'
    or w.trigger::text = 'interviewerConfirmation'
    or w.trigger::text = 'interviewEnd'
  ) LOOP IF wa_record.trigger = 'interviewEnd' THEN PERFORM create_new_workflow_action_log(
    wa_record.workflow_id,
    wa_record.workflow_action_id,
    wa_record.interval_minutes,
    wa_record.phase::text,
    wa_record.meta,
    wa_record.start_time + (wa_record.session_duration * INTERVAL '1 minute')
  );
ELSIF wa_record.trigger = 'interviewStart' THEN PERFORM create_new_workflow_action_log(
  wa_record.workflow_id,
  wa_record.workflow_action_id,
  wa_record.interval_minutes,
  wa_record.phase::text,
  wa_record.meta,
  wa_record.start_time
);
ELSE PERFORM create_new_workflow_action_log(
  wa_record.workflow_id,
  wa_record.workflow_action_id,
  wa_record.interval_minutes,
  wa_record.phase::text,
  wa_record.meta,
  now()
);
END IF;
END LOOP;
END IF;
RETURN NEW;
END;
$function$;
grant delete on table "public"."function_url" to "anon";
grant insert on table "public"."function_url" to "anon";
grant references on table "public"."function_url" to "anon";
grant select on table "public"."function_url" to "anon";
grant trigger on table "public"."function_url" to "anon";
grant truncate on table "public"."function_url" to "anon";
grant update on table "public"."function_url" to "anon";
grant delete on table "public"."function_url" to "authenticated";
grant insert on table "public"."function_url" to "authenticated";
grant references on table "public"."function_url" to "authenticated";
grant select on table "public"."function_url" to "authenticated";
grant trigger on table "public"."function_url" to "authenticated";
grant truncate on table "public"."function_url" to "authenticated";
grant update on table "public"."function_url" to "authenticated";
grant delete on table "public"."function_url" to "service_role";
grant insert on table "public"."function_url" to "service_role";
grant references on table "public"."function_url" to "service_role";
grant select on table "public"."function_url" to "service_role";
grant trigger on table "public"."function_url" to "service_role";
grant truncate on table "public"."function_url" to "service_role";
grant update on table "public"."function_url" to "service_role";
CREATE VIEW
  tasks_view AS
WITH latest_progress_cte AS (
    SELECT DISTINCT
        ON (task_id) task_id,
        json_build_object(
            'id',
            new_tasks_progress.id,
            'progress_type',
            new_tasks_progress.progress_type,
            'created_at',
            new_tasks_progress.created_at,
            'created_by',
            new_tasks_progress.created_by,
            'jsonb_data',
            new_tasks_progress.jsonb_data,
            'title_meta',
            new_tasks_progress.title_meta
        ) AS latest_progress,
        created_at
    FROM
        new_tasks_progress
    ORDER BY
        task_id,
        CASE
            WHEN new_tasks_progress.progress_type = 'interview_schedule' THEN 0
            ELSE 1
        END,
        created_at DESC
)
SELECT
    new_tasks.*,
    latest_progress_cte.latest_progress
FROM
    new_tasks
    LEFT JOIN latest_progress_cte ON latest_progress_cte.task_id = new_tasks.id;
-- new_tasks.id;