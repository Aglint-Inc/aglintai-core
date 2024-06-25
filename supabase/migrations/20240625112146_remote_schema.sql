drop function if exists "public"."getjob"(jobid uuid);

drop function if exists "public"."getjobs"(recruiterid uuid);

drop view if exists "public"."tasks_view";

drop view if exists "public"."workflow_view";

DROP TABLE IF EXISTS "public"."job_email_template";

create table "public"."job_email_template" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "job_id" uuid not null,
    "subject" text,
    "body" text,
    "from_name" text,
    "type" email_slack_types not null
);


-- alter table "public"."public_jobs" drop column "email_template";

-- alter table "public"."recruiter" drop column "email_template";

CREATE UNIQUE INDEX job_email_template_pkey ON public.job_email_template USING btree (id);

CREATE UNIQUE INDEX job_email_type ON public.job_email_template USING btree (job_id, type);

alter table "public"."job_email_template" add constraint "job_email_template_pkey" PRIMARY KEY using index "job_email_template_pkey";

alter table "public"."job_email_template" add constraint "job_email_template_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) not valid;

alter table "public"."job_email_template" validate constraint "job_email_template_job_id_fkey";

alter table "public"."job_email_template" add constraint "job_email_type" UNIQUE using index "job_email_type";

set check_function_bodies = off;

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

create or replace view "public"."tasks_view" as  SELECT DISTINCT ON (new_tasks.id) new_tasks.id,
    new_tasks.created_at,
    new_tasks.name,
    new_tasks.due_date,
    new_tasks.assignee,
    new_tasks.start_date,
    new_tasks.session_ids,
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
    json_build_object('id', new_tasks_progress.id, 'progress_type', new_tasks_progress.progress_type, 'created_at', new_tasks_progress.created_at, 'created_by', new_tasks_progress.created_by, 'jsonb_data', new_tasks_progress.jsonb_data, 'title_meta', new_tasks_progress.title_meta) AS last_progress
   FROM (new_tasks
     LEFT JOIN new_tasks_progress ON ((new_tasks.id = new_tasks_progress.task_id)))
  ORDER BY new_tasks.id, new_tasks_progress.created_at DESC;


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

CREATE OR REPLACE FUNCTION public.trigger_workflow_action_deletion()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW."trigger" <> OLD."trigger" THEN
      DELETE FROM workflow_action
      WHERE workflow_action.workflow_id = OLD.id;
  END IF;
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

CREATE OR REPLACE FUNCTION public.workflow_action_log_set_fail_cron()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN 
  Update workflow_action_logs set status = 'failed' where started_at < CURRENT_TIMESTAMP - INTERVAL '4 minutes';
  RETURN true;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_interview_filter_json()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    meeting_ids uuid[];
    workflow_id uuid;
BEGIN
    IF cardinality(NEW.session_ids) <> 0 THEN
      SELECT array_agg(meeting_id) INTO meeting_ids FROM interview_session WHERE id = any(NEW.session_ids);
      FOR wa_record IN
          SELECT wa.id AS workflow_action_id, w.id AS workflow_id, w.interval AS interval_minutes, w.phase AS phase, json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'job_id',a.job_id, 'email_type', c_e_t.type, 'meeting_ids', meeting_ids, 'filter_id', NEW.id) AS meta
          FROM 
          interview_schedule i_s 
          JOIN applications a ON i_s.application_id = a.id
          JOIN workflow_job_relation war ON war.job_id = a.job_id
          JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          JOIN workflow w ON war.workflow_id = w.id
          WHERE i_s.id = NEW.schedule_id
            AND w.trigger::text = 'selfScheduleReminder'
      LOOP
          PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta);
      END LOOP;
    END IF;  
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_update_candidate_request_availability()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    if NEW.slots is not null then
        FOR wa_record IN
            select w_a.workflow_id as workflow_id, w_a.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase,
                  json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'email_type', c_e_t.type, 'availability_req_id', NEW.id, 'sessions', NEW.session_ids ) as meta
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
    END if;
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
          SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase, json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', NEW.id, 'start_time', NEW.start_time, 'candidate_id', a.candidate_id, 'email_type', c_e_t.type) as meta
          FROM 
          interview_schedule i_s 
          JOIN applications a ON i_s.application_id = a.id
          JOIN workflow_job_relation war ON war.job_id = a.job_id
          JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          JOIN workflow w ON war.workflow_id = w.id
          WHERE i_s.id = NEW.interview_schedule_id
            AND w.trigger::text = 'interviewStart'
            AND c_e_t.type = 'interviewStart_email_applicant'
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
            interview_session i_m_s 
            JOIN interview_meeting i_m ON i_m.id = i_m_s.meeting_id
            JOIN meeting_interviewers m_i ON m_i.session_id = i_m_s.id
            JOIN interview_schedule i_s ON i_s.id = i_m.interview_schedule_id
            JOIN applications a ON i_s.application_id = a.id
            JOIN workflow_job_relation war ON war.job_id = a.job_id
            JOIN workflow w ON war.workflow_id = w.id
            JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
            WHERE i_m_s.id = NEW.session_id 
            AND c_e_t.type <> 'interviewStart_email_applicant' and (w.trigger::text = 'interviewStart' or w.trigger::text = 'interviewerConfirmation' or w.trigger::text = 'interviewEnd')
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


grant delete on table "public"."job_email_template" to "anon";

grant insert on table "public"."job_email_template" to "anon";

grant references on table "public"."job_email_template" to "anon";

grant select on table "public"."job_email_template" to "anon";

grant trigger on table "public"."job_email_template" to "anon";

grant truncate on table "public"."job_email_template" to "anon";

grant update on table "public"."job_email_template" to "anon";

grant delete on table "public"."job_email_template" to "authenticated";

grant insert on table "public"."job_email_template" to "authenticated";

grant references on table "public"."job_email_template" to "authenticated";

grant select on table "public"."job_email_template" to "authenticated";

grant trigger on table "public"."job_email_template" to "authenticated";

grant truncate on table "public"."job_email_template" to "authenticated";

grant update on table "public"."job_email_template" to "authenticated";

grant delete on table "public"."job_email_template" to "service_role";

grant insert on table "public"."job_email_template" to "service_role";

grant references on table "public"."job_email_template" to "service_role";

grant select on table "public"."job_email_template" to "service_role";

grant trigger on table "public"."job_email_template" to "service_role";

grant truncate on table "public"."job_email_template" to "service_role";

grant update on table "public"."job_email_template" to "service_role";

DROP TRIGGER IF EXISTS jobs_email_template_insert_trigger ON public.public_jobs;

CREATE TRIGGER jobs_email_template_insert_trigger AFTER INSERT ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION job_email_template_init();


