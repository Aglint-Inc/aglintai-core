create type "public"."activity_type" as enum ('aglint', 'user', 'candidate');

create type "public"."agent_type" as enum ('scheduler', 'job', 'sourcing', 'screening');

create type "public"."agent_types" as enum ('scheduler', 'screening', 'job_assistant', 'sourcing');

create type "public"."assessment_mode" as enum ('classic', 'verbal', 'visual');

create type "public"."icon_status_activity" as enum ('success', 'waiting', 'error');

create type "public"."interview_schedule_status" as enum ('pending', 'confirmed', 'completed', 'cancelled', 'reschedule');

create type "public"."interview_schedule_type" as enum ('in_person_meeting', 'google_meet', 'phone_call', 'zoom');

create type "public"."interviewer_type" as enum ('qualified', 'shadow', 'reverse_shadow');

create type "public"."job_scoring_param_status" as enum ('loading', 'success');

create type "public"."public_job_department" as enum ('legal', 'sales', 'finance', 'support', 'education', 'marketing', 'accounting', 'consulting', 'operations', 'engineering', 'data science', 'administrative', 'arts and design', 'human resources', 'entrepreneurship', 'product management', 'business development', 'information technology', 'media and communication');

create type "public"."public_job_status" as enum ('draft', 'published', 'closed');

create type "public"."public_job_type" as enum ('contract', 'full time', 'part time', 'temporary', 'volunteer', 'internship');

create type "public"."public_job_workplace" as enum ('hybrid', 'on site', 'off site');

create type "public"."question_level" as enum ('basic', 'intermediate', 'advanced');

create type "public"."question_type" as enum ('scq', 'mcq', 'qna', 'code');

create type "public"."recruiter_rolesx" as enum ('admin', 'member', 'interviewer', 'scheduler', 'recruiter');

create type "public"."sender_type" as enum ('aglint', 'you', 'system', 'user');

create type "public"."status_training" as enum ('qualified', 'training');

create type "public"."template_type" as enum ('cognitive', 'language', 'personality', 'culture', 'programming', 'role', 'situational', 'software', 'typing');

create type "public"."user_roles" as enum ('admin', 'recruiter', 'interviewer', 'scheduler');

drop policy "create policy ""authenticated_and_admin_access_only""" on "public"."recruiter";

drop policy "anon_read_only" on "public"."public_jobs";

drop policy "autenticated_write_only" on "public"."recruiter_relation";

drop policy "authenticated_access_only" on "public"."recruiter_user";

drop function if exists "public"."get_resume_match"(job_id text, top_match integer, good_match integer, average_match integer, poor_match integer);

drop function if exists "public"."job_application_filter_sort"(jb_id uuid, min_lat double precision, min_long double precision, max_lat double precision, max_long double precision, j_status text, from_rec_num numeric, end_rec_num numeric, min_resume_score numeric, max_resume_score numeric, min_interview_score numeric, max_interview_score numeric, sort_column_text text, is_sort_desc boolean, text_search_qry text, is_locat_filter_on boolean);


create table "public"."agent" (
    "id" uuid not null default gen_random_uuid(),
    "type" agent_type not null,
    "assistant_id" text
);


create table "public"."agent_activity" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "agent_chat_id" uuid not null,
    "type" activity_type not null,
    "icon_status" icon_status_activity,
    "event" jsonb
);


create table "public"."agent_chat" (
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "title" text not null,
    "agent_id" uuid not null,
    "user_id" uuid not null default auth.uid(),
    "recruiter_id" uuid not null,
    "id" uuid not null default gen_random_uuid()
);


create table "public"."agent_chat_messages" (
    "created_at" timestamp with time zone not null default now(),
    "text_content" text,
    "json_content" jsonb,
    "id" uuid not null default gen_random_uuid(),
    "agent_chat_id" uuid not null,
    "sender" sender_type not null
);


create table "public"."agent_chatx" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "last_updated_at" timestamp with time zone default now(),
    "title" text not null,
    "history" jsonb[],
    "type" agent_type not null,
    "recruiter_id" uuid not null
);


create table "public"."assessment" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text,
    "description" text,
    "type" template_type,
    "recruiter_id" uuid not null,
    "level" question_level not null default 'basic'::question_level,
    "mode" assessment_mode not null default 'classic'::assessment_mode
);


create table "public"."assessment_job_relation" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "assessment_id" uuid not null,
    "job_id" uuid
);


create table "public"."assessment_question" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "assessment_id" uuid not null,
    "question" jsonb,
    "answer" jsonb,
    "duration" numeric,
    "level" question_level,
    "parent_question_id" uuid,
    "description" jsonb default '{"show": false, "value": ""}'::jsonb,
    "required" boolean not null default true,
    "type" question_type not null default 'qna'::question_type,
    "order" numeric not null default '0'::numeric
);


create table "public"."assessment_template" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text,
    "description" text,
    "embeddings" vector,
    "type" template_type,
    "mode" assessment_mode not null default 'classic'::assessment_mode,
    "level" question_level not null default 'basic'::question_level
);


create table "public"."candidate_phone_call" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "applicant_id" uuid not null default gen_random_uuid(),
    "retell_call_id" text,
    "call_transcript" jsonb,
    "call_title" text not null,
    "call_type" text not null,
    "error_log" jsonb not null,
    "recording_url" text,
    "call_status" jsonb
);


create table "public"."experience" (
    "jsonb_object_agg" jsonb
);


create table "public"."interview_availabilties" (
    "user_id" uuid not null,
    "slot_availability" jsonb[]
);


create table "public"."interview_meeting" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "interview_schedule_id" uuid not null,
    "start_time" text not null,
    "end_time" text not null,
    "duration" numeric not null,
    "module_id" uuid,
    "break_time" numeric not null default '0'::numeric,
    "meeting_json" jsonb,
    "status" interview_schedule_status not null default 'confirmed'::interview_schedule_status
);


create table "public"."interview_meeting_user" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "interviewer_id" uuid,
    "interview_meeting_id" uuid not null,
    "interviewer_type" interviewer_type not null default 'qualified'::interviewer_type
);


create table "public"."interview_module" (
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "recruiter_id" uuid not null,
    "id" uuid not null default gen_random_uuid(),
    "duration_available" jsonb default '{"activeDuration": 30, "availabletimeSlots": []}'::jsonb,
    "description" text,
    "settings" jsonb
);


create table "public"."interview_module_relation" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "module_id" uuid not null,
    "pause_json" jsonb,
    "training_status" status_training not null default 'qualified'::status_training
);


create table "public"."interview_schedule" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid not null,
    "schedule_name" text not null,
    "schedule_type" interview_schedule_type not null default 'google_meet'::interview_schedule_type,
    "status" interview_schedule_status not null default 'pending'::interview_schedule_status,
    "interview_plan" jsonb[],
    "created_by" uuid not null default auth.uid(),
    "resend_invite" numeric not null default '0'::numeric,
    "filter_json" jsonb,
    "confirmed_option" jsonb,
    "calender_event_api_status" jsonb default '{"error": null, "api_status": "not_started"}'::jsonb,
    "meeting_json" jsonb[],
    "completion_time" text,
    "coordinator_id" uuid
);


create table "public"."jobs" (
    "id" uuid,
    "created_at" timestamp with time zone,
    "company_details" text,
    "overview" text,
    "logo" text,
    "company" text,
    "location" text,
    "job_title" text,
    "description" text,
    "skills" text[],
    "slug" text,
    "job_type" text,
    "workplace_type" text,
    "screening_setting" jsonb,
    "screening_questions" jsonb[],
    "job_criteria" jsonb,
    "posted_by" text,
    "email_template" jsonb,
    "active_status" jsonb,
    "updated_at" timestamp without time zone,
    "department" text,
    "recruiter_id" uuid,
    "new_screening_setting" jsonb,
    "parameter_weights" jsonb,
    "jd_json" jsonb,
    "end_video" jsonb,
    "intro_videos" jsonb,
    "start_video" jsonb,
    "video_assessment" boolean,
    "draft" jsonb,
    "status" text,
    "interview_instructions" text,
    "assessment" boolean,
    "is_ats_sync" boolean,
    "phone_screening" jsonb,
    "jd_changed" boolean,
    "phone_screen_enabled" boolean,
    "job_details_embedding" vector,
    "experience_in_months" numeric,
    "location_json" jsonb,
    "screening_template" uuid,
    "interview_success" text,
    "interview_plan" jsonb
);


create table "public"."question_bank" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "question" jsonb,
    "answer" jsonb,
    "level" question_level,
    "embeddings" vector,
    "duration" numeric,
    "description" jsonb default '{"show": false, "value": ""}'::jsonb,
    "required" boolean not null default true,
    "type" question_type not null default 'qna'::question_type
);


create table "public"."request_integration_tool" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid default gen_random_uuid(),
    "tool_name" text,
    "description" text
);


create table "public"."scheduling-agent-chat-history" (
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid not null default gen_random_uuid(),
    "scheduling_progress" text,
    "job_id" uuid not null,
    "candidate_email" text not null,
    "chat_history" jsonb[] not null default '{}'::jsonb[],
    "date_range" timestamp with time zone[],
    "company_id" uuid,
    "schedule_id" uuid
);


alter table "public"."scheduling-agent-chat-history" enable row level security;

create table "public"."screening_answers" (
    "created_at" timestamp with time zone not null default now(),
    "answers" jsonb not null,
    "screening_id" uuid not null default auth.uid()
);


create table "public"."screening_questions" (
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "questions" jsonb not null,
    "recruiter_id" uuid not null,
    "id" uuid not null default gen_random_uuid()
);


create table "public"."sections" (
    "jsonb_object_agg" jsonb
);


create table "public"."state_json" (
    "jsonb_object_agg" jsonb
);


create table "public"."template_question_relation" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "template_id" uuid not null,
    "question_id" uuid not null
);

--== manual fix ==--

alter table "public"."applications" alter column "status" drop default;

ALTER TYPE "public"."application_status" ADD VALUE 'interview';

-- alter type "public"."application_status" rename to "application_status__old_version_to_be_dropped";

-- drop type "public"."application_status__old_version_to_be_dropped";

-- create type "public"."application_status" as enum ('new', 'assessment', 'qualified', 'disqualified', 'screening', 'interview');

-- alter table "public"."applications" alter column status type "public"."application_status" using status::text::"public"."application_status";

alter table "public"."applications" alter column "status" set default 'new'::application_status;

--== fix end ==--

alter table "public"."applications" add column "overall_interview_score" numeric not null default '-1'::numeric;

alter table "public"."assessment_results" drop column "ai_interviewer_id";

alter table "public"."assessment_results" drop column "conversation";

alter table "public"."assessment_results" drop column "feedback";

alter table "public"."assessment_results" drop column "interview_duration";

alter table "public"."assessment_results" drop column "interview_score";

alter table "public"."assessment_results" drop column "interviewing_date";

alter table "public"."assessment_results" add column "assessment_id" uuid;

alter table "public"."assessment_results" add column "duration" numeric;

alter table "public"."assessment_results" add column "is_submitted" boolean default false;

alter table "public"."assessment_results" add column "responses" jsonb[];

alter table "public"."assessment_results" add column "result" jsonb[];

alter table "public"."public_jobs" add column "description_hash" numeric not null default '0'::numeric;

alter table "public"."public_jobs" add column "interview_plan" jsonb;

alter table "public"."public_jobs" add column "interview_success" text;

alter table "public"."public_jobs" add column "scoring_criteria_loading" boolean not null default false;

alter table "public"."public_jobs" add column "scoring_param_status" job_scoring_param_status;

alter table "public"."public_jobs" add column "screening_template" uuid;

alter table "public"."public_jobs" alter column "department" set data type public_job_department using "department"::public_job_department;

alter table "public"."public_jobs" alter column "job_type" set default 'full time'::public_job_type;

alter table "public"."public_jobs" alter column "job_type" set data type public_job_type using "job_type"::public_job_type;

alter table "public"."public_jobs" alter column "parameter_weights" set default '{"skills": 0, "education": 0, "experience": 0}'::jsonb;

alter table "public"."public_jobs" alter column "status" set default 'draft'::public_job_status;

alter table "public"."public_jobs" alter column "status" set data type public_job_status using "status"::public_job_status;

alter table "public"."public_jobs" alter column "workplace_type" set default 'on site'::public_job_workplace;

alter table "public"."public_jobs" alter column "workplace_type" set data type public_job_workplace using "workplace_type"::public_job_workplace;

alter table "public"."recruiter" drop column "recruiter_user_id";

alter table "public"."recruiter" add column "scheduling_settings" jsonb default '{"timeZone": {"utc": "-08:00", "name": "(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle", "label": "America/Los_Angeles (GMT-08:00)", "tzCode": "America/Los_Angeles"}, "totalDaysOff": ["01 Jan 2024", "15 Jan 2024", "19 Feb 2024", "27 May 2024", "19 Jun 2024", "04 Jul 2024", "02 Sep 2024", "14 Oct 2024", "11 Nov 2024", "28 Nov 2024", "25 Dec 2024"], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Hours", "value": 4}, "weeklyLimit": {"type": "Hours", "value": 20}}, "schedulingKeyWords": {"free": ["Chilling", "Snacks", "Lunch", "Happy Hour", "Social Time", "Quick Sync"], "SoftConflicts": ["Standup", "Weekly Sync", "Focus", "Weekly Planning"]}}'::jsonb;

alter table "public"."recruiter" add column "service_json" text;

alter table "public"."recruiter" alter column "email_template" set default '{"interview": {"body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''ve Been Selected for an Assessment with [companyName]", "fromName": "aglint"}, "rejection": {"body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "aglint"}, "self_schedule": {"body": "<p>Dear [candidateName], </p><p>We invite you to select a convenient time slot for your interview for the [positionName] role. Please follow the link below to schedule your interview.</p><p>Kind regards,</p><p>[yourCompanyName] Recruitment Team</p>", "default": true, "subject": "Choose Your Interview Slot for [positionName]", "fromName": "aglint"}, "phone_screening": {"body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "aglint"}, "interview_resend": {"body": "<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "aglint"}, "application_received": {"body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "aglint"}, "phone_screening_resend": {"body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "aglint"}, "debrief_calendar_invite": {"body": "<p>Dear [TeamMemberName],</p><p>Please join the debrief session to discuss [candidateName]''s interview for [positionName]. Your insights are valuable to the selection process.</p><p>Cheers,</p><p>[yourCompanyName] Recruitment Team</p>", "default": true, "subject": "Interview Debrief for [candidateName]", "fromName": "aglint"}, "interviewer_calendar_invite": {"body": "<p>Dear [interviewerName],</p><p>You have been scheduled to conduct an interview for the [positionName] position on [Date] at [Time]. Please review the candidate''s profile attached.</p><p>Thank you,</p><p>[yourCompanyName] Recruitment Team</p>", "default": true, "subject": "Interview Assignment for [positionName]", "fromName": "aglint"}, "candidate_email_confirmation": {"body": "<p>Dear [candidateName],</p><p>Thank you for applying to the [positionName] position at [yourCompanyName]. We have received your application and will be reviewing it shortly.</p><p>Best wishes,</p><p>[yourCompanyName] Recruitment Team</p>", "default": true, "subject": "Confirmation of Your Application for [positionName]", "fromName": "aglint"}, "candidate_invite_confirmation": {"body": "<p>Dear [candidateName],</p><p>We are pleased to confirm your interview for the [positionName] position on [Date] at [Time]. Please find the details of your interview below.</p><p>Regards,</p><p>[yourCompanyName] Recruitment Team</p>", "default": true, "subject": "Your Interview is Scheduled for [positionName]", "fromName": "aglint"}, "candidate_availability_request": {"body": "<p>Dear [candidateName],</p><p>We are excited to move forward with your application for the [positionName] role. Please let us know your availability over the next week so we can schedule your interview.<p/><p>Best regards,</p><p>[yourCompanyName] Recruitment Team</p>", "default": true, "subject": "Schedule Your Interview for [positionName]", "fromName": "aglint"}}'::jsonb;

alter table "public"."recruiter_user" drop column "is_deactivated";

alter table "public"."recruiter_user" add column "department" text;

alter table "public"."recruiter_user" add column "interview_location" text;

alter table "public"."recruiter_user" add column "schedule_auth" jsonb;

alter table "public"."recruiter_user" add column "scheduling_settings" jsonb default '{"timeZone": {"utc": "-08:00", "name": "(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle", "label": "America/Los_Angeles (GMT-08:00)", "tzCode": "America/Los_Angeles"}, "totalDaysOff": ["01 Jan 2024", "15 Jan 2024", "19 Feb 2024", "27 May 2024", "19 Jun 2024", "04 Jul 2024", "02 Sep 2024", "14 Oct 2024", "11 Nov 2024", "28 Nov 2024", "25 Dec 2024"], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Hours", "value": 4}, "weeklyLimit": {"type": "Hours", "value": 20}}, "schedulingKeyWords": {"free": ["Chilling", "Snacks", "Lunch", "Happy Hour", "Social Time", "Quick Sync"], "SoftConflicts": ["Standup", "Weekly Sync", "Focus", "Weekly Planning"]}}'::jsonb;

alter table "public"."recruiter_user" alter column "role" drop default;

alter table "public"."recruiter_user" alter column "role" drop not null;

alter table "public"."recruiter_user" alter column "role" set data type user_roles using "role"::text::user_roles;

alter table "public"."threads" drop column "linkedin_url";

alter table "public"."threads" add column "designation" text;

alter table "public"."threads" add column "document_text" text;

alter table "public"."threads" add column "file_url" text;

drop type "public"."recruiter_roles";

CREATE UNIQUE INDEX agent_activity_pkey ON public.agent_activity USING btree (id);

CREATE UNIQUE INDEX agent_chat_messages_pkey ON public.agent_chat_messages USING btree (id);

CREATE UNIQUE INDEX agent_chat_pkey ON public.agent_chatx USING btree (id);

CREATE UNIQUE INDEX agent_chat_pkey1 ON public.agent_chat USING btree (id);

CREATE UNIQUE INDEX agent_pkey ON public.agent USING btree (id);

CREATE UNIQUE INDEX assessment_job_relation_pkey ON public.assessment_job_relation USING btree (id);

CREATE UNIQUE INDEX assessment_pkey ON public.assessment USING btree (id);

CREATE UNIQUE INDEX assessment_question_pkey ON public.assessment_question USING btree (id);

CREATE UNIQUE INDEX assessment_template_pkey ON public.assessment_template USING btree (id);

CREATE UNIQUE INDEX candidate_phone_call_pkey ON public.candidate_phone_call USING btree (id);

CREATE UNIQUE INDEX interview_availabilties_pkey ON public.interview_availabilties USING btree (user_id);

CREATE UNIQUE INDEX interview_meeting_pkey ON public.interview_meeting USING btree (id);

CREATE UNIQUE INDEX interview_meeting_user_pkey ON public.interview_meeting_user USING btree (id);

CREATE UNIQUE INDEX interview_panel_pkey ON public.interview_module USING btree (id);

CREATE UNIQUE INDEX interview_panel_relation_pkey ON public.interview_module_relation USING btree (id);

CREATE UNIQUE INDEX interview_schedule_application_id_key ON public.interview_schedule USING btree (application_id);

CREATE UNIQUE INDEX interview_schedule_pkey ON public.interview_schedule USING btree (id);

CREATE UNIQUE INDEX question_bank_pkey ON public.question_bank USING btree (id);

CREATE UNIQUE INDEX request_integration_tool_pkey ON public.request_integration_tool USING btree (id);

CREATE UNIQUE INDEX "scheduling-agent-chat-history_pkey" ON public."scheduling-agent-chat-history" USING btree (job_id, candidate_email);

CREATE UNIQUE INDEX screening_answers_id_key ON public.screening_answers USING btree (screening_id);

CREATE UNIQUE INDEX screening_answers_pkey ON public.screening_answers USING btree (screening_id);

CREATE UNIQUE INDEX screening_questions_id_key ON public.screening_questions USING btree (id);

CREATE UNIQUE INDEX screening_questions_pkey ON public.screening_questions USING btree (id);

CREATE UNIQUE INDEX template_question_relation_pkey ON public.template_question_relation USING btree (id);

alter table "public"."agent" add constraint "agent_pkey" PRIMARY KEY using index "agent_pkey";

alter table "public"."agent_activity" add constraint "agent_activity_pkey" PRIMARY KEY using index "agent_activity_pkey";

alter table "public"."agent_chat" add constraint "agent_chat_pkey1" PRIMARY KEY using index "agent_chat_pkey1";

alter table "public"."agent_chat_messages" add constraint "agent_chat_messages_pkey" PRIMARY KEY using index "agent_chat_messages_pkey";

alter table "public"."agent_chatx" add constraint "agent_chat_pkey" PRIMARY KEY using index "agent_chat_pkey";

alter table "public"."assessment" add constraint "assessment_pkey" PRIMARY KEY using index "assessment_pkey";

alter table "public"."assessment_job_relation" add constraint "assessment_job_relation_pkey" PRIMARY KEY using index "assessment_job_relation_pkey";

alter table "public"."assessment_question" add constraint "assessment_question_pkey" PRIMARY KEY using index "assessment_question_pkey";

alter table "public"."assessment_template" add constraint "assessment_template_pkey" PRIMARY KEY using index "assessment_template_pkey";

alter table "public"."candidate_phone_call" add constraint "candidate_phone_call_pkey" PRIMARY KEY using index "candidate_phone_call_pkey";

alter table "public"."interview_availabilties" add constraint "interview_availabilties_pkey" PRIMARY KEY using index "interview_availabilties_pkey";

alter table "public"."interview_meeting" add constraint "interview_meeting_pkey" PRIMARY KEY using index "interview_meeting_pkey";

alter table "public"."interview_meeting_user" add constraint "interview_meeting_user_pkey" PRIMARY KEY using index "interview_meeting_user_pkey";

alter table "public"."interview_module" add constraint "interview_panel_pkey" PRIMARY KEY using index "interview_panel_pkey";

alter table "public"."interview_module_relation" add constraint "interview_panel_relation_pkey" PRIMARY KEY using index "interview_panel_relation_pkey";

alter table "public"."interview_schedule" add constraint "interview_schedule_pkey" PRIMARY KEY using index "interview_schedule_pkey";

alter table "public"."question_bank" add constraint "question_bank_pkey" PRIMARY KEY using index "question_bank_pkey";

alter table "public"."request_integration_tool" add constraint "request_integration_tool_pkey" PRIMARY KEY using index "request_integration_tool_pkey";

alter table "public"."scheduling-agent-chat-history" add constraint "scheduling-agent-chat-history_pkey" PRIMARY KEY using index "scheduling-agent-chat-history_pkey";

alter table "public"."screening_answers" add constraint "screening_answers_pkey" PRIMARY KEY using index "screening_answers_pkey";

alter table "public"."screening_questions" add constraint "screening_questions_pkey" PRIMARY KEY using index "screening_questions_pkey";

alter table "public"."template_question_relation" add constraint "template_question_relation_pkey" PRIMARY KEY using index "template_question_relation_pkey";

alter table "public"."agent_activity" add constraint "public_agent_activity_agent_chat_id_fkey" FOREIGN KEY (agent_chat_id) REFERENCES agent_chatx(id) ON DELETE CASCADE not valid;

alter table "public"."agent_activity" validate constraint "public_agent_activity_agent_chat_id_fkey";

alter table "public"."agent_chat" add constraint "agent_chat_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."agent_chat" validate constraint "agent_chat_recruiter_id_fkey";

alter table "public"."agent_chat" add constraint "public_agent_chat_agent_id_fkey" FOREIGN KEY (agent_id) REFERENCES agent(id) ON DELETE CASCADE not valid;

alter table "public"."agent_chat" validate constraint "public_agent_chat_agent_id_fkey";

alter table "public"."agent_chat" add constraint "public_agent_chat_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."agent_chat" validate constraint "public_agent_chat_user_id_fkey";

alter table "public"."agent_chatx" add constraint "public_agent_chat_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."agent_chatx" validate constraint "public_agent_chat_recruiter_id_fkey";

alter table "public"."assessment" add constraint "assessment_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."assessment" validate constraint "assessment_recruiter_id_fkey";

alter table "public"."assessment_job_relation" add constraint "assessment_job_relation_assessment_id_fkey" FOREIGN KEY (assessment_id) REFERENCES assessment(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."assessment_job_relation" validate constraint "assessment_job_relation_assessment_id_fkey";

alter table "public"."assessment_job_relation" add constraint "assessment_job_relation_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."assessment_job_relation" validate constraint "assessment_job_relation_job_id_fkey";

alter table "public"."assessment_question" add constraint "assessment_question_assessment_id_fkey" FOREIGN KEY (assessment_id) REFERENCES assessment(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."assessment_question" validate constraint "assessment_question_assessment_id_fkey";

alter table "public"."assessment_question" add constraint "public_assessment_question_parent_question_id_fkey" FOREIGN KEY (parent_question_id) REFERENCES question_bank(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."assessment_question" validate constraint "public_assessment_question_parent_question_id_fkey";

alter table "public"."assessment_results" add constraint "public_assessment_results_assessment_id_fkey" FOREIGN KEY (assessment_id) REFERENCES assessment(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."assessment_results" validate constraint "public_assessment_results_assessment_id_fkey";

alter table "public"."candidate_phone_call" add constraint "public_candidate_phone_call_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applications(id) not valid;

alter table "public"."candidate_phone_call" validate constraint "public_candidate_phone_call_applicant_id_fkey";

alter table "public"."interview_availabilties" add constraint "interview_availabilties_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_availabilties" validate constraint "interview_availabilties_user_id_fkey";

alter table "public"."interview_meeting" add constraint "public_interview_meeting_interview_schedule_id_fkey" FOREIGN KEY (interview_schedule_id) REFERENCES interview_schedule(id) ON DELETE CASCADE not valid;

alter table "public"."interview_meeting" validate constraint "public_interview_meeting_interview_schedule_id_fkey";

alter table "public"."interview_meeting" add constraint "public_interview_meeting_module_id_fkey" FOREIGN KEY (module_id) REFERENCES interview_module(id) ON DELETE SET NULL not valid;

alter table "public"."interview_meeting" validate constraint "public_interview_meeting_module_id_fkey";

alter table "public"."interview_meeting_user" add constraint "public_interview_meeting_user_interview_meeting_id_fkey" FOREIGN KEY (interview_meeting_id) REFERENCES interview_meeting(id) ON DELETE CASCADE not valid;

alter table "public"."interview_meeting_user" validate constraint "public_interview_meeting_user_interview_meeting_id_fkey";

alter table "public"."interview_meeting_user" add constraint "public_interview_meeting_user_interviewer_id_fkey" FOREIGN KEY (interviewer_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_meeting_user" validate constraint "public_interview_meeting_user_interviewer_id_fkey";

alter table "public"."interview_module" add constraint "interview_panel_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."interview_module" validate constraint "interview_panel_recruiter_id_fkey";

alter table "public"."interview_module_relation" add constraint "interview_panel_relation_panel_id_fkey" FOREIGN KEY (module_id) REFERENCES interview_module(id) ON DELETE CASCADE not valid;

alter table "public"."interview_module_relation" validate constraint "interview_panel_relation_panel_id_fkey";

alter table "public"."interview_module_relation" add constraint "interview_panel_relation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_module_relation" validate constraint "interview_panel_relation_user_id_fkey";

alter table "public"."interview_schedule" add constraint "interview_schedule_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."interview_schedule" validate constraint "interview_schedule_application_id_fkey";

alter table "public"."interview_schedule" add constraint "interview_schedule_application_id_key" UNIQUE using index "interview_schedule_application_id_key";

alter table "public"."interview_schedule" add constraint "public_interview_schedule_coordinator_id_fkey" FOREIGN KEY (coordinator_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_schedule" validate constraint "public_interview_schedule_coordinator_id_fkey";

alter table "public"."interview_schedule" add constraint "public_interview_schedule_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_schedule" validate constraint "public_interview_schedule_created_by_fkey";

alter table "public"."public_jobs" add constraint "public_public_jobs_screening_template_fkey" FOREIGN KEY (screening_template) REFERENCES screening_questions(id) not valid;

alter table "public"."public_jobs" validate constraint "public_public_jobs_screening_template_fkey";

alter table "public"."recruiter_relation" add constraint "public_recruiter_relation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) not valid;

alter table "public"."recruiter_relation" validate constraint "public_recruiter_relation_user_id_fkey";

alter table "public"."request_integration_tool" add constraint "public_request_integration_tool_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) not valid;

alter table "public"."request_integration_tool" validate constraint "public_request_integration_tool_recruiter_id_fkey";

alter table "public"."scheduling-agent-chat-history" add constraint "public_scheduling-agent-chat-history_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."scheduling-agent-chat-history" validate constraint "public_scheduling-agent-chat-history_application_id_fkey";

alter table "public"."scheduling-agent-chat-history" add constraint "public_scheduling-agent-chat-history_company_id_fkey" FOREIGN KEY (company_id) REFERENCES recruiter(id) not valid;

alter table "public"."scheduling-agent-chat-history" validate constraint "public_scheduling-agent-chat-history_company_id_fkey";

alter table "public"."scheduling-agent-chat-history" add constraint "public_scheduling-agent-chat-history_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) not valid;

alter table "public"."scheduling-agent-chat-history" validate constraint "public_scheduling-agent-chat-history_job_id_fkey";

alter table "public"."scheduling-agent-chat-history" add constraint "public_scheduling-agent-chat-history_schedule_id_fkey" FOREIGN KEY (schedule_id) REFERENCES interview_schedule(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."scheduling-agent-chat-history" validate constraint "public_scheduling-agent-chat-history_schedule_id_fkey";

alter table "public"."screening_answers" add constraint "public_screening_answers_id_fkey" FOREIGN KEY (screening_id) REFERENCES applications(id) not valid;

alter table "public"."screening_answers" validate constraint "public_screening_answers_id_fkey";

alter table "public"."screening_answers" add constraint "screening_answers_id_key" UNIQUE using index "screening_answers_id_key";

alter table "public"."screening_questions" add constraint "public_screening_questions_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."screening_questions" validate constraint "public_screening_questions_recruiter_id_fkey";

alter table "public"."screening_questions" add constraint "screening_questions_id_key" UNIQUE using index "screening_questions_id_key";

alter table "public"."template_question_relation" add constraint "template_question_relation_question_id_fkey" FOREIGN KEY (question_id) REFERENCES question_bank(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."template_question_relation" validate constraint "template_question_relation_question_id_fkey";

alter table "public"."template_question_relation" add constraint "template_question_relation_template_id_fkey" FOREIGN KEY (template_id) REFERENCES assessment_template(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."template_question_relation" validate constraint "template_question_relation_template_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.connectassessmenttemplate(assessmentid uuid, recruiterid uuid, templateid uuid, jobid uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO assessment (id, title, description, mode, type, level, recruiter_id)
    SELECT assessmentId, title, description, mode, type, level, recruiterId
    FROM assessment_template
    WHERE id = templateId;
    INSERT INTO assessment_question (assessment_id, parent_question_id, question, answer, duration, description, type, level, required)
    SELECT assessmentId, question_bank.id, question_bank.question, question_bank.answer, question_bank.duration, question_bank.description, question_bank.type, question_bank.level, question_bank.required
    FROM template_question_relation
    LEFT JOIN question_bank ON template_question_relation.question_id = question_bank.id
    WHERE template_question_relation.template_id = templateId;
    INSERT INTO assessment_job_relation (assessment_id, job_id)
    VALUES (assessmentId, jobId);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.connectbulkassessmenttemplate(assessments uuid[], recruiterid uuid, templates jsonb[], jobid uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    template jsonb;
    assessmentId UUID;
    templateId UUID;
    assessmentUuid UUID;
BEGIN
    RAISE LOG 'Templates JSON : %', templates;
    FOREACH template IN ARRAY templates
    LOOP
        RAISE LOG 'Template from template: %', template;
        assessmentId := (template->>'assessment_id')::UUID;
        templateId := (template->>'template_id')::UUID;
        RAISE LOG 'Assessment ID from template: %', assessmentId;
        PERFORM connectassessmenttemplate(assessmentId, recruiterId, templateId, jobId);
    END LOOP;

    FOREACH assessmentUuid IN ARRAY assessments
    LOOP
        INSERT INTO assessment_job_relation (assessment_id, job_id)
        VALUES (assessmentUuid, jobId);
    END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.duplicateassessment(assessmentid uuid, newassessmentid uuid, recruiterid uuid, newtitle text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO assessment (id, title, description, mode, type, level, recruiter_id)
    SELECT newAssessmentId, newTitle, description, mode, type, level, recruiterId
    FROM assessment
    WHERE id = assessmentId;
    INSERT INTO assessment_question (assessment_id, parent_question_id, question, answer, duration, description, type, level, required)
    SELECT newAssessmentId, assessment_question.parent_question_id, assessment_question.question, assessment_question.answer, assessment_question.duration, assessment_question.description, assessment_question.type, assessment_question.level, assessment_question.required
    FROM assessment_question
    WHERE assessment_question.assessment_id = assessmentId; 
END;
$function$
;

CREATE OR REPLACE FUNCTION public.fetch_interview_data(rec_id uuid, text_search_filter text DEFAULT NULL::text, status_filter text[] DEFAULT NULL::text[], job_id_filter uuid[] DEFAULT NULL::uuid[], sch_type text[] DEFAULT NULL::text[], date_range_filter tsrange DEFAULT NULL::tsrange, sort_by text DEFAULT 'asc'::text, page_number integer DEFAULT 1)
 RETURNS TABLE(applications json, candidates json, public_jobs json, file json, schedule json)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        row_to_json(ja) AS applications,
        row_to_json(cand) AS candidates,
        CASE 
            WHEN ja.status = 'interview' THEN
                json_build_object(
                    'id', pj.id,
                    'job_title', pj.job_title,
                    'interview_plan',pj.interview_plan,
                    'location',pj.location
                ) 
            ELSE
                NULL
        END AS public_jobs,
        json_build_object(
                    'id', candfil.id,
                    'created_at', candfil.created_at,
                    'file_url',candfil.file_url,
                    'candidate_id',candfil.candidate_id,
                    'resume_json',candfil.resume_json,
                    'type',candfil.type
                )  AS file,
        row_to_json(insc) AS schedule
    FROM
        applications ja      
        JOIN candidates cand ON ja.candidate_id = cand.id     
        LEFT JOIN public_jobs pj ON pj.id = ja.job_id
        LEFT JOIN candidate_files candfil ON candfil.id = ja.candidate_file_id
        LEFT JOIN interview_schedule insc ON insc.application_id = ja.id
    WHERE
        (ja.status = 'interview' OR insc.id IS NOT NULL)
        AND pj.recruiter_id = rec_id
        AND ((text_search_filter IS NULL OR text_search_filter = '') OR  
             (LOWER(cand.first_name || ' ' || cand.last_name) LIKE LOWER('%' || text_search_filter || '%')))
        AND (
            status_filter IS NULL 
            OR insc.status::text = ANY(status_filter) 
            OR (array['not scheduled'] <@ status_filter AND insc IS NULL)
        )
        AND (job_id_filter IS NULL OR ja.job_id = ANY(job_id_filter))
        AND (sch_type IS NULL OR insc.schedule_type::text = ANY(sch_type))
        AND ( date_range_filter IS NULL OR
            (
             insc.confirmed_option->'plans' IS NOT NULL AND
            ((insc.confirmed_option->'plans'->0->>'start_time')::timestamp >= lower(date_range_filter) AND
            (insc.confirmed_option->'plans'->0->>'start_time')::timestamp <= upper(date_range_filter))
        ))
    ORDER BY
    CASE WHEN sort_by = 'asc' THEN ((insc.confirmed_option->'plans'->0->>'start_time')::timestamp) END ASC,
    CASE WHEN sort_by = 'desc' THEN ((insc.confirmed_option->'plans'->0->>'start_time')::timestamp) END DESC
    LIMIT 10 -- Number of records per page
    OFFSET (page_number - 1) * 10; -- Calculate the starting position of records based on page number
END;
$function$
;

CREATE OR REPLACE FUNCTION public.fetch_interview_data_by_application_id(app_id uuid)
 RETURNS TABLE(applications json, candidates json, public_jobs json, schedule json, file json)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        row_to_json(ja) AS applications,
        row_to_json(cand) AS candidates,
        CASE 
            WHEN ja.status = 'interview' THEN
                json_build_object(
                    'id', pj.id,
                    'job_title', pj.job_title,
                    'interview_plan',pj.interview_plan,
                    'location',pj.location,
                    'recruiter_id',pj.recruiter_id
                ) 
            ELSE
                NULL
        END AS public_jobs,
        row_to_json(insc) AS schedule,
        json_build_object(
        'id', cf.id,
        'created_at', cf.created_at, 
        'file_url', cf.file_url, 
        'candidate_id', cf.candidate_id, 
        'resume_json', cf.resume_json, 
        'type', cf.type
        ) AS file
    FROM
        applications ja      
        JOIN candidates cand ON ja.candidate_id = cand.id     
        LEFT JOIN public_jobs pj ON pj.id = ja.job_id
        LEFT JOIN candidate_files cf ON ja.candidate_file_id = cf.id
        LEFT JOIN interview_schedule insc ON insc.application_id = ja.id
    WHERE
        ja.id= app_id;
    
END;
$function$
;

CREATE OR REPLACE FUNCTION public.fetch_interview_data_page_number(rec_id uuid, application_id uuid, text_search_filter text DEFAULT NULL::text, status_filter text[] DEFAULT NULL::text[], job_id_filter uuid[] DEFAULT NULL::uuid[], panel_id_filter uuid[] DEFAULT NULL::uuid[], sch_type text[] DEFAULT NULL::text[], date_range_filter tsrange DEFAULT NULL::tsrange, sort_by text DEFAULT 'asc'::text)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    position integer;
    page_number integer;
BEGIN
    WITH filtered AS (
        SELECT
            ja.id,
            ROW_NUMBER() OVER (
                ORDER BY
                    CASE WHEN sort_by = 'asc' THEN (insc.schedule_time->>'startTime')::timestamp END ASC,
                    CASE WHEN sort_by = 'desc' THEN (insc.schedule_time->>'startTime')::timestamp END DESC
            ) AS rank
        FROM
            applications ja      
            JOIN candidates cand ON ja.candidate_id = cand.id     
            LEFT JOIN public_jobs pj ON pj.id = ja.job_id
            LEFT JOIN interview_schedule insc ON insc.application_id = ja.id
        WHERE
            (ja.status = 'interview' OR insc.schedule_time IS NOT NULL)
            AND pj.recruiter_id = rec_id
            AND (text_search_filter IS NULL OR 
                 (LOWER(cand.first_name || ' ' || cand.last_name) LIKE LOWER('%' || text_search_filter || '%')))
            AND (
                status_filter IS NULL 
                OR insc.status::text = ANY(status_filter) 
                OR (array['not scheduled'] <@ status_filter AND insc IS NULL)
            )
            AND (job_id_filter IS NULL OR ja.job_id = ANY(job_id_filter))
            AND (panel_id_filter IS NULL OR insc.panel_id = ANY(panel_id_filter))
            AND (sch_type IS NULL OR insc.schedule_type::text = ANY(sch_type))
            AND (date_range_filter IS NULL OR 
                 (insc.schedule_time->>'startTime')::timestamp >= lower(date_range_filter) AND
                 (insc.schedule_time->>'startTime')::timestamp <= upper(date_range_filter))
    )
    SELECT rank INTO position
    FROM filtered
    WHERE id = application_id;

    page_number := CEIL(position / 10.0); -- Assuming 10 records per page

    RETURN page_number;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.find_avail_api_details(job_id uuid, recruiter_id uuid)
 RETURNS TABLE(interview_plan jsonb, service_json jsonb, interviewer jsonb, interview_modules jsonb)
 LANGUAGE plpgsql
AS $function$ 
  DECLARE
      int_ids_array uuid[] := '{}'; -- Initialize as empty array
      int_modules_ids_array uuid[] := '{}'; -- Initialize as empty array
  BEGIN
      -- Fetch interview plan details
      SELECT INTO interview_plan coalesce(p_jobs.interview_plan, '{}'::jsonb)
      FROM public_jobs p_jobs
      WHERE p_jobs.id = job_id;     

      SELECT array_agg(distinct module->>'module_id') INTO int_modules_ids_array
      FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '{}'::jsonb)) AS module;
      -- Extract interviewer IDs and module IDs from interview plan
      SELECT array_agg(distinct selected_interv->>'interv_id') INTO int_ids_array
      FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '[]'::jsonb)) AS plan,
          jsonb_array_elements(plan->'selectedIntervs') AS selected_interv;

      -- Fetch service details
      SELECT INTO service_json jsonb_build_object('service_json', to_jsonb(r.service_json))
      FROM recruiter r
      WHERE r.id = recruiter_id; 

      -- Fetch interviewer details
      SELECT INTO interviewer jsonb_build_object('interviewer', jsonb_agg(row_to_json(recruiter_user)))
      FROM recruiter_user
      WHERE user_id = ANY(int_ids_array); 

      -- Fetch interview module details
      SELECT INTO interview_modules jsonb_build_object('interview_modules', jsonb_agg(row_to_json(interview_module)))
      FROM interview_module
      WHERE id = ANY(int_modules_ids_array); 

      RETURN QUERY SELECT interview_plan, service_json, interviewer, interview_modules;
  END; 
  $function$
;

CREATE OR REPLACE FUNCTION public.find_avail_api_details_updated(job_id uuid, recruiter_id uuid)
 RETURNS TABLE(interview_plan jsonb, service_json jsonb, interviewer jsonb, interview_modules jsonb, shadow_ints jsonb, rshadow_ints jsonb)
 LANGUAGE plpgsql
AS $function$ 
  DECLARE
      int_ids_array uuid[] := '{}'; -- Initialize as empty array
      int_modules_ids_array uuid[] := '{}'; -- Initialize as empty array
      shadow_int_ids_array uuid[] := '{}'; -- Initialize as empty array
      rshadow_int_ids_array uuid[] := '{}'; -- Initialize as empty array
  BEGIN
      -- Fetch interview plan details
      SELECT INTO interview_plan coalesce(p_jobs.interview_plan, '{}'::jsonb)
      FROM public_jobs p_jobs
      WHERE p_jobs.id = job_id;
      
      SELECT array_agg(distinct module->>'module_id') INTO int_modules_ids_array
      FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '{}'::jsonb)) AS module;
      -- Extract interviewer IDs and module IDs from interview plan
      SELECT array_agg(distinct selected_interv->>'interv_id') INTO int_ids_array
      FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '[]'::jsonb)) AS plan,
          jsonb_array_elements(plan->'selectedIntervs') AS selected_interv;

      SELECT array_agg(distinct shadowIntervs->>'interv_id') INTO shadow_int_ids_array
            FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '[]'::jsonb)) AS plan,
                jsonb_array_elements(plan->'shadowIntervs') AS shadowIntervs;
      
      SELECT array_agg(distinct revShadowInterv->>'interv_id') INTO rshadow_int_ids_array
            FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '[]'::jsonb)) AS plan,
                jsonb_array_elements(plan->'revShadowInterv') AS revShadowInterv;

      -- Fetch service details
      SELECT INTO service_json jsonb_build_object('service_json', to_jsonb(r.service_json))
      FROM recruiter r
      WHERE r.id = recruiter_id; 

      -- Fetch interviewer details
      SELECT INTO interviewer jsonb_build_object('interviewer', jsonb_agg(row_to_json(recruiter_user)))
      FROM recruiter_user
      WHERE user_id = ANY(int_ids_array); 


-- shadow and reverse shadow 
      SELECT INTO shadow_ints jsonb_build_object('shadow_ints', jsonb_agg(row_to_json(recruiter_user)))
      FROM recruiter_user
      WHERE user_id = ANY(shadow_int_ids_array); 

      SELECT INTO rshadow_ints jsonb_build_object('rshadow_ints', jsonb_agg(row_to_json(recruiter_user)))
      FROM recruiter_user
      WHERE user_id = ANY(rshadow_int_ids_array); 

      -- Fetch interview module details
      SELECT INTO interview_modules jsonb_build_object('interview_modules', jsonb_agg(row_to_json(interview_module)))
      FROM interview_module
      WHERE id = ANY(int_modules_ids_array); 

      RETURN QUERY SELECT interview_plan, service_json, interviewer, interview_modules,shadow_ints, rshadow_ints;
  END; 
  $function$
;

CREATE OR REPLACE FUNCTION public.find_avail_api_details_updated_2(job_id uuid, recruiter_id uuid)
 RETURNS TABLE(interview_plan jsonb, service_json jsonb, interviewer jsonb, interview_modules jsonb, shadow_ints jsonb, rshadow_ints jsonb, int_mod_relns jsonb)
 LANGUAGE plpgsql
AS $function$ 
  DECLARE
      int_ids_array uuid[] := '{}'; -- Initialize as empty array
      int_modules_ids_array uuid[] := '{}'; -- Initialize as empty array
      shadow_int_ids_array uuid[] := '{}'; -- Initialize as empty array
      rshadow_int_ids_array uuid[] := '{}'; -- Initialize as empty array
  BEGIN
      -- Fetch interview plan details
      SELECT INTO interview_plan coalesce(p_jobs.interview_plan, '{}'::jsonb)
      FROM public_jobs p_jobs
      WHERE p_jobs.id = job_id;
      
      SELECT array_agg(distinct module->>'module_id') INTO int_modules_ids_array
      FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '{}'::jsonb)) AS module;
      -- Extract interviewer IDs and module IDs from interview plan
      SELECT array_agg(distinct selected_interv->>'interv_id') INTO int_ids_array
      FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '[]'::jsonb)) AS plan,
          jsonb_array_elements(plan->'selectedIntervs') AS selected_interv;

      SELECT array_agg(distinct shadowIntervs->>'interv_id') INTO shadow_int_ids_array
            FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '[]'::jsonb)) AS plan,
                jsonb_array_elements(plan->'shadowIntervs') AS shadowIntervs;
      
      SELECT array_agg(distinct revShadowInterv->>'interv_id') INTO rshadow_int_ids_array
            FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '[]'::jsonb)) AS plan,
                jsonb_array_elements(plan->'revShadowInterv') AS revShadowInterv;

      -- Fetch service details
      SELECT INTO service_json jsonb_build_object('service_json', to_jsonb(r.service_json))
      FROM recruiter r
      WHERE r.id = recruiter_id; 

      -- Fetch interviewer details
      SELECT INTO interviewer jsonb_build_object('interviewer', jsonb_agg(row_to_json(recruiter_user)))
      FROM recruiter_user
      WHERE user_id = ANY(int_ids_array); 


    -- shadow and reverse shadow 
      SELECT INTO shadow_ints jsonb_build_object('shadow_ints', jsonb_agg(row_to_json(recruiter_user)))
      FROM recruiter_user
      WHERE user_id = ANY(shadow_int_ids_array); 

      SELECT INTO rshadow_ints jsonb_build_object('rshadow_ints', jsonb_agg(row_to_json(recruiter_user)))
      FROM recruiter_user
      WHERE user_id = ANY(rshadow_int_ids_array); 

      -- Fetch interview module details
      SELECT INTO interview_modules jsonb_build_object('interview_modules', jsonb_agg(row_to_json(interview_module)))
      FROM interview_module
      WHERE id = ANY(int_modules_ids_array); 

      
      -- Fetch interview module details
      SELECT INTO int_mod_relns jsonb_build_object('int_mod_relns', jsonb_agg(row_to_json(int_mod_reln)))
      FROM interview_module_relation int_mod_reln
      WHERE module_id = ANY(int_modules_ids_array); 

      RETURN QUERY SELECT interview_plan, service_json, interviewer, interview_modules,shadow_ints, rshadow_ints , int_mod_relns;
  END; 
  $function$
;

CREATE OR REPLACE FUNCTION public.get_candidate_info(rec_id uuid)
 RETURNS TABLE(first_name text, last_name text, avatar text, screening_title text, job_title text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(c.first_name, '') AS first_name,
        COALESCE(c.last_name, '') AS last_name,
        COALESCE(c.avatar, '') AS avatar,
        COALESCE(sq.title, '') AS screening_title,
        COALESCE(pj.job_title, '') AS job_title
    FROM 
        recruiter r
    JOIN 
        public_jobs pj ON r.id = pj.recruiter_id
    JOIN 
        applications a ON pj.id = a.job_id
    JOIN 
        candidate_files cf ON a.candidate_file_id = cf.id
    JOIN 
        candidates c ON cf.candidate_id = c.id
    LEFT JOIN
        screening_questions sq ON pj.screening_template = sq.id
    WHERE 
        r.id = rec_id
        AND a.status = 'screening';

END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_data_count(rec_id uuid, text_search_filter text DEFAULT NULL::text, status_filter text[] DEFAULT NULL::text[], job_id_filter uuid[] DEFAULT NULL::uuid[], sch_type text[] DEFAULT NULL::text[], date_range_filter tsrange DEFAULT NULL::tsrange)
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
    WHERE
         (ja.status = 'interview' OR insc.id IS NOT NULL)
        AND pj.recruiter_id = rec_id
        AND ((text_search_filter IS NULL OR text_search_filter = '') OR  
             (LOWER(cand.first_name || ' ' || cand.last_name) LIKE LOWER('%' || text_search_filter || '%')))
        AND (
            status_filter IS NULL 
            OR insc.status::text = ANY(status_filter) 
            OR (array['not scheduled'] <@ status_filter AND insc IS NULL)
        )
        AND (job_id_filter IS NULL OR ja.job_id = ANY(job_id_filter))
        AND (sch_type IS NULL OR insc.schedule_type::text = ANY(sch_type))
        AND ( date_range_filter IS NULL OR
            (
             insc.confirmed_option->'plans' IS NOT NULL AND
            ((insc.confirmed_option->'plans'->0->>'start_time')::timestamp >= lower(date_range_filter) AND
            (insc.confirmed_option->'plans'->0->>'start_time')::timestamp <= upper(date_range_filter))
        ));

    RETURN total_candidates_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_modules(rec_id uuid)
 RETURNS TABLE(interview_modules jsonb, users jsonb, upcoming_meeting_count integer, completed_meeting_count integer)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        to_jsonb(intmod.*) AS interview_modules,
        COALESCE((SELECT jsonb_agg(
            jsonb_build_object(
                'user_id', ru.user_id,
                'first_name', ru.first_name,
                'last_name', ru.last_name,
                'email', ru.email,
                'profile_image', ru.profile_image,
                'position', ru.position
            )
        ) FROM recruiter_user ru 
        WHERE ru.user_id IN (SELECT intmodrel.user_id FROM interview_module_relation intmodrel WHERE intmodrel.module_id = intmod.id)), '[]'::jsonb) AS users,
        COUNT(DISTINCT CASE WHEN to_timestamp(intmeet.start_time, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') > NOW() THEN intmeet.id END)::integer AS upcoming_meeting_count,
        COUNT(DISTINCT CASE WHEN insch.status = 'completed' THEN intmeet.id END)::integer AS completed_meeting_count
    FROM interview_module intmod
    LEFT JOIN interview_meeting intmeet ON intmeet.module_id = intmod.id
    LEFT JOIN interview_schedule insch ON insch.id = intmeet.interview_schedule_id
    WHERE intmod.recruiter_id = rec_id
    GROUP BY intmod.id
    ORDER BY intmod.created_at DESC;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_job_id(target_job_id uuid)
 RETURNS TABLE(interview_meeting jsonb, schedule jsonb, candidates jsonb, users jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        row_to_json(intmeet)::jsonb AS interview_meeting,
        row_to_json(insc)::jsonb AS schedule,
        row_to_json(cand)::jsonb AS candidates,
        COALESCE((
            SELECT jsonb_agg(
                jsonb_build_object(
                    'user_id', ru.user_id,
                    'first_name', ru.first_name,
                    'last_name', ru.last_name,
                    'email', ru.email,
                    'profile_image', ru.profile_image,
                    'position', ru.position
                )::jsonb
            )
            FROM recruiter_user ru 
            WHERE ru.user_id IN (
                SELECT intu.interviewer_id 
                FROM interview_meeting_user intu 
                WHERE intu.interview_meeting_id = intmeet.id
            )
        ), '[]'::jsonb) AS users
    FROM interview_meeting intmeet
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id
    JOIN applications app ON insc.application_id = app.id  
    JOIN candidates cand ON app.candidate_id = cand.id 
    WHERE app.job_id = target_job_id AND intmeet.status='confirmed' AND to_timestamp(intmeet.start_time, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') > NOW()
    GROUP BY intmeet.id, insc.id,cand.id
    ORDER BY to_timestamp(intmeet.start_time, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') ASC ;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_meeting_id(target_meeting_id uuid)
 RETURNS TABLE(interview_meeting json, schedule json, applications json, candidates json, file json, job json, users jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        row_to_json(intmeet) AS interview_meeting,
        row_to_json(insc) AS schedule,
        row_to_json(app) AS applications,
        row_to_json(cand) AS candidates,
        json_build_object(
            'id', cf.id,
            'created_at', cf.created_at, 
            'file_url', cf.file_url, 
            'candidate_id', cf.candidate_id, 
            'resume_text', cf.resume_text, 
            'resume_json', cf.resume_json, 
            'type', cf.type
        ) AS file,
        json_build_object(
            'id', pj.id,
            'created_at', pj.created_at, 
            'job_title', pj.job_title, 
            'description', pj.description, 
            'parameter_weights', pj.parameter_weights, 
            'recruiter_id', pj.recruiter_id, 
            'jd_json', pj.jd_json,
            'location', pj.location
        ) AS job,
        COALESCE((
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id', ru.user_id,
                    'first_name', ru.first_name,
                    'last_name', ru.last_name,
                    'email', ru.email,
                    'profile_image', ru.profile_image,
                    'position', ru.position
                )::jsonb
            )
            FROM recruiter_user ru 
            WHERE ru.user_id IN (
                SELECT intu.interviewer_id 
                FROM interview_meeting_user intu 
                WHERE intu.interview_meeting_id = intmeet.id
            )
        ), '[]'::jsonb) AS users
    FROM interview_meeting intmeet
    JOIN interview_module intmod ON intmod.id = intmeet.module_id
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id  
    JOIN applications app ON insc.application_id = app.id
    JOIN candidates cand ON app.candidate_id = cand.id 
    JOIN candidate_files cf ON cf.id = app.candidate_file_id  
    JOIN public_jobs pj ON pj.id = app.job_id
    LEFT JOIN interview_meeting_user imu ON imu.interview_meeting_id = intmeet.id
    LEFT JOIN recruiter_user ru ON ru.user_id = imu.interviewer_id
    WHERE intmeet.id = target_meeting_id
    GROUP BY intmeet.id, insc.id, app.id, cand.id, cf.id, pj.id;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_module_id(target_module_id uuid)
 RETURNS TABLE(interview_meeting jsonb, schedule jsonb, users jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        row_to_json(intmeet)::jsonb AS interview_meeting,
        row_to_json(insc)::jsonb AS schedule,
        COALESCE((
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id', ru.user_id,
                    'first_name', ru.first_name,
                    'last_name', ru.last_name,
                    'email', ru.email,
                    'profile_image', ru.profile_image,
                    'position', ru.position
                )::jsonb
            )
            FROM recruiter_user ru 
            WHERE ru.user_id IN (
                SELECT intu.interviewer_id 
                FROM interview_meeting_user intu 
                WHERE intu.interview_meeting_id = intmeet.id
            )
        ), '[]'::jsonb) AS users
    FROM interview_meeting intmeet
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id  
    WHERE intmeet.module_id = target_module_id
    GROUP BY intmeet.id, insc.id;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_user_id(target_user_id uuid)
 RETURNS TABLE(interview_meeting json, schedule json, users json)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        row_to_json(intmeet) AS interview_meeting,
        row_to_json(insc) AS schedule,
        json_agg(json_build_object(
            'id', imu.id,
            'created_at', imu.created_at,
            'interviewer_id', imu.interviewer_id,
            'interviewer_type', imu.interviewer_type,
            'first_name', ru.first_name,
            'last_name', ru.last_name,
            'email', ru.email,
            'profile_image', ru.profile_image
        )) AS users
    FROM interview_meeting intmeet
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id  
    LEFT JOIN interview_meeting_user imu ON imu.interview_meeting_id = intmeet.id
    LEFT JOIN recruiter_user ru ON ru.user_id = imu.interviewer_id
    WHERE imu.interviewer_id = target_user_id
    GROUP BY intmeet.id, insc.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interviewers(rec_id uuid)
 RETURNS TABLE(rec_user jsonb, qualified_module_names text[], training_module_names text[], upcoming_meeting_count integer, completed_meeting_count integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        json_build_object(
            'user_id', ru.user_id,
            'first_name', ru.first_name,
            'last_name', ru.last_name,
            'email', ru.email,
            'profile_image', ru.profile_image,
            'position', ru.position,
            'schedule_auth', ru.schedule_auth
        )::JSONB as rec_user,
        array_agg(DISTINCT CASE WHEN intmodrel.training_status = 'qualified' THEN intmod.name ELSE NULL END)::TEXT[] as qualified_module_names,
        array_agg(DISTINCT CASE WHEN intmodrel.training_status = 'training' THEN intmod.name ELSE NULL END)::TEXT[] as training_module_names,
        COUNT(DISTINCT CASE WHEN to_timestamp(intmeet.start_time, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') > NOW() THEN intmeet.id END)::integer AS upcoming_meeting_count,
        COUNT(DISTINCT CASE WHEN insch.status = 'completed' THEN intmeet.id END)::integer AS completed_meeting_count
    FROM recruiter_relation recrel
    JOIN recruiter_user ru ON ru.user_id = recrel.user_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.user_id = ru.user_id 
    LEFT JOIN interview_module intmod ON intmod.id = intmodrel.module_id
    LEFT JOIN interview_meeting intmeet ON intmeet.module_id = intmod.id
    LEFT JOIN interview_schedule insch ON insch.id = intmeet.interview_schedule_id
    WHERE recrel.recruiter_id = rec_id
    GROUP BY recrel.id, ru.user_id;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_meetings_by_interviewer(int_id uuid)
 RETURNS TABLE(meeting_id uuid, interviewer_id uuid)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT im.id, imu.interviewer_id
    FROM interview_meeting im
    JOIN interview_meeting_user imu ON im.id = imu.interview_meeting_id
    WHERE imu.interviewer_id = int_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_recruiter_screening_data(recruiter_id uuid)
 RETURNS TABLE(first_name text, last_name text, avatar text, status_emails_sent integer, screening_title text, job_title text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        c.first_name,
        c.last_name,
        c.avatar,
        a.status_emails_sent,
        COALESCE(sq.title, '') AS screening_title,
        pj.job_title
    FROM 
        recruiter r
    JOIN 
        public_jobs pj ON r.id = pj.recruiter_id
    JOIN 
        applications a ON pj.id = a.job_id
    JOIN 
        candidate_files cf ON a.candidate_file_id = cf.id
    JOIN 
        candidates c ON cf.candidate_id = c.id
    LEFT JOIN
        screening_questions sq ON pj.screening_template = sq.id
    WHERE 
        r.id = get_recruiter_screening_data.recruiter_id
        AND a.status = 'screening';

END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_screening_candidates(p_recruiter_id uuid)
 RETURNS TABLE(id uuid, first_name text, last_name text, avatar text, status_emails_sent jsonb, screening_title text, job_title text, created_at text, response jsonb, questions jsonb, public_job_id uuid, company text, email text, candidate_id uuid, email_template jsonb, result_created_at text, assessment_result jsonb[], phonescreening_templateid uuid)
 LANGUAGE sql
 STABLE
AS $function$
  SELECT 
    a.id,
    c.first_name,
    c.last_name,
    c.avatar,
    a.status_emails_sent,
    COALESCE(sq.title, '') AS screening_title,
    pj.job_title,
    sa.created_at,
    sa.answers,
    sq.questions,
    pj.id AS public_job_id,
    pj.company,
    c.email,
    c.id AS candidate_id,
    pj.email_template,
    ar.created_at AS result_created_at,
    ar.result AS assessment_result,
    sq.id AS phoneScreening_templateId
  FROM  
    recruiter r
  JOIN
    public_jobs pj ON r.id = pj.recruiter_id 
  JOIN
    applications a ON pj.id = a.job_id
  JOIN 
    candidate_files cf ON a.candidate_file_id = cf.id
  JOIN
    candidates c ON cf.candidate_id = c.id
  LEFT JOIN
    screening_questions sq ON pj.screening_template = sq.id
  LEFT JOIN
    screening_answers sa ON a.id = sa.screening_id
  LEFT JOIN
    assessment_results ar ON a.id = ar.application_id
  WHERE
    r.id = p_recruiter_id
    AND a.status = 'screening';
$function$
;

CREATE OR REPLACE FUNCTION public.getallresumematches(jobid uuid, topmatch integer DEFAULT 80, goodmatch integer DEFAULT 60, averagematch integer DEFAULT 40, poormatch integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE 
  matches jsonb;
BEGIN
  SELECT JSONB_OBJECT_AGG(match, count) INTO matches
  FROM(
    SELECT categories.match as match, COALESCE(match_category.count, 0) AS count
      FROM (
      SELECT 'topMatch' AS match UNION ALL
      SELECT 'goodMatch' UNION ALL
      SELECT 'averageMatch' UNION ALL
      SELECT 'poorMatch' UNION ALL
      SELECT 'noMatch' UNION ALL
      SELECT 'unknownMatch'
    ) AS categories
    LEFT JOIN (
      SELECT 
        CASE 
          WHEN overall_score <= 100 AND overall_score >=topMatch THEN 'topMatch'
          WHEN overall_score < topMatch AND overall_score >=goodMatch THEN 'goodMatch'
          WHEN overall_score < goodMatch AND overall_score >=averageMatch THEN 'averageMatch'
          WHEN overall_score < averageMatch AND overall_score >=poorMatch THEN 'poorMatch'
          WHEN overall_score < poorMatch AND overall_score >=0 THEN 'noMatch'
          ELSE 'unknownMatch'
        END AS match,
      COUNT(*) AS count
      FROM 
        applications
        WHERE 
          job_id = jobId 
        GROUP BY 
          match
    ) AS match_category
    ON categories.match = match_category.match
  ) as m;
RETURN matches;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getassessments(recruiterid uuid)
 RETURNS TABLE(id uuid, created_at timestamp with time zone, title text, description text, type template_type, recruiter_id uuid, level question_level, mode assessment_mode, question_count bigint, duration numeric, jobs jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
      assessment.*,
      questions.question_count AS question_count,
      questions.duration AS duration,
      COALESCE(
          jsonb_agg(jsonb_build_object('id', public_jobs.id, 'title', public_jobs.job_title)) FILTER (WHERE public_jobs.id IS NOT NULL),
        '[]'::jsonb
      ) AS jobs
    FROM 
      assessment
    LEFT JOIN 
      assessment_job_relation ON assessment_job_relation.assessment_id = assessment.id
    LEFT JOIN 
      public_jobs ON assessment_job_relation.job_id = public_jobs.id
    LEFT JOIN (
      SELECT 
        assessment_id, 
        COUNT(assessment_question.id) AS question_count,
        SUM(assessment_question.duration) AS duration
      FROM 
        assessment_question
      GROUP BY 
        assessment_id
    ) AS questions ON questions.assessment_id = assessment.id
    WHERE 
      assessment.recruiter_id = recruiterId
    GROUP BY 
      assessment.id, questions.duration, questions.question_count
    ORDER BY 
      assessment.created_at DESC;
END
$function$
;

CREATE OR REPLACE FUNCTION public.getassessmenttemplates()
 RETURNS TABLE(id uuid, created_at timestamp with time zone, title text, description text, type template_type, level question_level, mode assessment_mode, duration numeric, question_count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
      assessment_template.id as id,
      assessment_template.created_at as created_at,
      assessment_template.title as title,
      assessment_template.description as description,
      assessment_template.type as type,
      assessment_template.level as level,
      assessment_template.mode as mode,
      SUM(question_bank.duration) AS duration,
      COUNT(question_bank.id) AS question_count
    FROM assessment_template 
    LEFT JOIN template_question_relation ON assessment_template.id = template_question_relation.template_id
    LEFT JOIN question_bank ON question_bank.id = template_question_relation.question_id
    GROUP BY assessment_template.id, question_bank.duration, question_bank.id
    ORDER BY assessment_template.created_at DESC;
END
$function$
;

CREATE OR REPLACE FUNCTION public.getexperienceandtenure(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  average_tenure jsonb;
  tenure jsonb;
  average_experience jsonb;
  experience jsonb;
  result jsonb;
BEGIN
EXECUTE format(
  'CREATE MATERIALIZED VIEW resumes AS (
    SELECT 
      can.resume_json AS resume_json,
      can.id AS id
    FROM applications AS app 
    LEFT JOIN candidate_files AS can 
    ON app.candidate_file_id = can.id 
    WHERE app.job_id = ''%s'')'
,jobId);

SELECT TO_JSONB(AVG((resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths')::numeric)) INTO average_experience
FROM resumes
WHERE resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths' IS NOT NULL;

WITH candidate_avg_experience AS(
SELECT resumes_with_exp.id AS id, resumes_with_exp.average_experience AS average_experience
FROM (SELECT resumes.id, CEIL((resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths')::numeric/12) AS average_experience
  FROM resumes
  WHERE resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths' IS NOT NULL 
  GROUP BY resumes.id, average_experience
) AS resumes_with_exp),
all_possible_experience_levels AS (
  SELECT 
    generate_series(
      (SELECT MIN(candidate_avg_experience.average_experience) FROM candidate_avg_experience),
      (SELECT MAX(candidate_avg_experience.average_experience) FROM candidate_avg_experience)
    ) AS experience_level
), ae AS (
  SELECT all_possible_experience_levels.experience_level AS average_experience, COALESCE(COUNT(candidate_avg_experience.average_experience), 0) AS candidates
  FROM all_possible_experience_levels
  LEFT JOIN 
  candidate_avg_experience ON all_possible_experience_levels.experience_level = candidate_avg_experience.average_experience
  GROUP BY all_possible_experience_levels.experience_level
  ORDER BY all_possible_experience_levels.experience_level
)
SELECT JSONB_OBJECT_AGG(ae.average_experience, ae.candidates) INTO experience
FROM ae;

WITH candidate_avg_tenure AS (
    SELECT 
        resumes.id,
       (resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths')::numeric AS average_tenure,
        jsonb_array_length(resumes.resume_json -> 'positions') AS positions_length
    FROM 
        resumes
        WHERE 
        resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths' IS NOT NULL
        AND jsonb_array_length(resumes.resume_json -> 'positions') > 0
    GROUP BY 
        resumes.id, resumes.resume_json
)
SELECT 
    TO_JSONB(AVG(candidate_avg_tenure.average_tenure/candidate_avg_tenure.positions_length))
INTO average_tenure
FROM 
    candidate_avg_tenure;

WITH candidate_avg_tenure AS(
SELECT resumes_with_exp.id AS id, resumes_with_exp.average_tenure AS average_tenure
FROM (SELECT resumes.id, TRUNC(SUM((resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths')::numeric/12) / NULLIF(COUNT(*), 0)) AS average_tenure
  FROM resumes
  WHERE resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths' IS NOT NULL 
  GROUP BY resumes.id
) AS resumes_with_exp),
all_possible_tenure_levels AS (
  SELECT 
    generate_series(
      (SELECT MIN(candidate_avg_tenure.average_tenure) FROM candidate_avg_tenure),
      (SELECT MAX(candidate_avg_tenure.average_tenure) FROM candidate_avg_tenure)
    ) AS tenure_level
), at AS (
  SELECT all_possible_tenure_levels.tenure_level AS average_tenure, COALESCE(COUNT(candidate_avg_tenure.average_tenure), 0) AS candidates
  FROM all_possible_tenure_levels
  LEFT JOIN 
  candidate_avg_tenure ON all_possible_tenure_levels.tenure_level = candidate_avg_tenure.average_tenure
  GROUP BY all_possible_tenure_levels.tenure_level
  ORDER BY all_possible_tenure_levels.tenure_level
)
SELECT JSONB_OBJECT_AGG(at.average_tenure, at.candidates) INTO tenure
FROM at;

result := '{}'::jsonb;
result := jsonb_set(result, '{average_experience}', average_experience, true);
result := jsonb_set(result, '{average_tenure}', average_tenure , true);
result := jsonb_set(result, '{tenure}', tenure, true);
result := jsonb_set(result, '{experience}', experience, true);

DROP MATERIALIZED VIEW resumes;
RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjob(jobid uuid)
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, company_details text, created_at timestamp with time zone, department public_job_department, description text, draft jsonb, email_template jsonb, end_video jsonb, experience_in_months numeric, id uuid, interview_instructions text, interview_plan jsonb, interview_success text, intro_videos jsonb, is_ats_sync boolean, jd_changed boolean, jd_json jsonb, job_criteria jsonb, job_title text, job_type public_job_type, location text, location_json jsonb, logo text, new_screening_setting jsonb, overview text, parameter_weights jsonb, phone_screen_enabled boolean, phone_screening jsonb, posted_by text, recruiter_id uuid, screening_questions jsonb[], screening_setting jsonb, screening_template uuid, skills text[], slug text, start_video jsonb, status public_job_status, updated_at timestamp without time zone, video_assessment boolean, workplace_type public_job_workplace, scoring_param_status job_scoring_param_status, description_hash numeric, scoring_criteria_loading boolean, count jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  SELECT pbj.active_status, pbj.assessment, pbj.company, pbj.company_details, pbj.created_at, pbj.department, pbj.description, pbj.draft, pbj.email_template, pbj.end_video, pbj.experience_in_months, pbj.id, pbj.interview_instructions, pbj.interview_plan, pbj.interview_success, pbj.intro_videos, pbj.is_ats_sync, pbj.jd_changed, pbj.jd_json, pbj.job_criteria, pbj.job_title, pbj.job_type, pbj.location, pbj.location_json, pbj.logo, pbj.new_screening_setting, pbj.overview, pbj.parameter_weights, pbj.phone_screen_enabled, pbj.phone_screening, pbj.posted_by, pbj.recruiter_id, pbj.screening_questions, pbj.screening_setting, pbj.screening_template, pbj.skills, pbj.slug, pbj.start_video, pbj.status, pbj.updated_at, pbj.video_assessment, pbj.workplace_type, pbj.scoring_param_status job_scoring_param_status, pbj.description_hash numeric, pbj.scoring_criteria_loading boolean,
       jsonb_object_agg(
           statuses.status,
           COALESCE(apps.count, 0)
       ) AS count
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
        WHERE pj.id = jobId
    )
    GROUP BY job_id, applications.status
) AS apps ON apps.job_id = pbj.id AND apps.status = statuses.status::application_status
WHERE pbj.id = jobId
GROUP BY pbj.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjobassessments(jobid uuid)
 RETURNS TABLE(id uuid, created_at timestamp with time zone, title text, description text, type template_type, recruiter_id uuid, level question_level, mode assessment_mode, duration numeric)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
      assessment.*,
      questions.duration AS duration
    FROM 
      assessment
    LEFT JOIN 
      assessment_job_relation ON assessment_job_relation.assessment_id = assessment.id
    LEFT JOIN (
      SELECT 
        assessment_id, 
        SUM(assessment_question.duration) AS duration
      FROM 
        assessment_question
      GROUP BY 
        assessment_id
    ) AS questions ON questions.assessment_id = assessment.id
    WHERE 
      assessment_job_relation.job_id  = jobId
    GROUP BY 
      assessment.id, questions.duration
    ORDER BY 
      assessment.created_at DESC;
END
$function$
;

CREATE OR REPLACE FUNCTION public.getjobs(recruiterid uuid)
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, company_details text, created_at timestamp with time zone, department public_job_department, description text, draft jsonb, email_template jsonb, end_video jsonb, experience_in_months numeric, id uuid, interview_instructions text, interview_plan jsonb, interview_success text, intro_videos jsonb, is_ats_sync boolean, jd_changed boolean, jd_json jsonb, job_criteria jsonb, job_title text, job_type public_job_type, location text, location_json jsonb, logo text, new_screening_setting jsonb, overview text, parameter_weights jsonb, phone_screen_enabled boolean, phone_screening jsonb, posted_by text, recruiter_id uuid, screening_questions jsonb[], screening_setting jsonb, screening_template uuid, skills text[], slug text, start_video jsonb, status public_job_status, updated_at timestamp without time zone, video_assessment boolean, workplace_type public_job_workplace, scoring_param_status job_scoring_param_status, description_hash numeric, scoring_criteria_loading boolean, count jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  SELECT pbj.active_status, pbj.assessment, pbj.company, pbj.company_details, pbj.created_at, pbj.department, pbj.description, pbj.draft, pbj.email_template, pbj.end_video, pbj.experience_in_months, pbj.id, pbj.interview_instructions, pbj.interview_plan, pbj.interview_success, pbj.intro_videos, pbj.is_ats_sync, pbj.jd_changed, pbj.jd_json, pbj.job_criteria, pbj.job_title, pbj.job_type, pbj.location, pbj.location_json, pbj.logo, pbj.new_screening_setting, pbj.overview, pbj.parameter_weights, pbj.phone_screen_enabled, pbj.phone_screening, pbj.posted_by, pbj.recruiter_id, pbj.screening_questions, pbj.screening_setting, pbj.screening_template, pbj.skills, pbj.slug, pbj.start_video, pbj.status, pbj.updated_at, pbj.video_assessment, pbj.workplace_type, pbj.scoring_param_status job_scoring_param_status, pbj.description_hash numeric, pbj.scoring_criteria_loading boolean,
       jsonb_object_agg(
           statuses.status,
           COALESCE(apps.count, 0)
       ) AS count
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
WHERE pbj.recruiter_id = recruiterId
GROUP BY pbj.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getlocationspool(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE 
  location jsonb;
  city_json jsonb;
  state_json jsonb;
  country_json jsonb;
BEGIN
EXECUTE format('
  CREATE MATERIALIZED VIEW locations AS (
    SELECT 
      can.city, can.state, can.country 
    FROM applications AS app 
    LEFT JOIN candidates AS can 
    ON app.candidate_id = can.id 
    WHERE app.job_id =  ''%s''
)', jobId);
SELECT JSONB_OBJECT_AGG(city, count) INTO city_json
FROM (
    SELECT LOWER(city) AS city, count(*) FROM locations WHERE city IS NOT NULL GROUP BY city ORDER BY count(*) DESC LIMIT 5
) AS s;
city_json := jsonb_set(city_json, '{others}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) FROM locations WHERE city IS NOT NULL GROUP BY city ORDER BY count(*) DESC OFFSET 5) AS o))::jsonb, 
true);
city_json := jsonb_set(city_json, '{unknown}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) FROM locations WHERE city IS NULL GROUP BY city ) AS o))::jsonb, 
true);
SELECT JSONB_OBJECT_AGG(state, count) INTO state_json
FROM (
    SELECT LOWER(state) AS state, count(*) from locations WHERE state IS NOT NULL GROUP BY state ORDER BY count(*) DESC LIMIT 5
) AS s;
state_json := jsonb_set(state_json, '{others}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) from locations WHERE state IS NOT NULL GROUP BY state ORDER BY count(*) DESC OFFSET 5) AS o))::jsonb, 
true);
state_json := jsonb_set(state_json, '{unknown}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) from locations WHERE state IS NULL GROUP BY state ) AS o))::jsonb, 
true);
SELECT JSONB_OBJECT_AGG(country, count) INTO country_json
FROM (
    SELECT LOWER(country) AS country, count(*) from locations WHERE country IS NOT NULL GROUP BY country ORDER BY count(*) DESC LIMIT 5
) AS s;
country_json := jsonb_set(country_json, '{others}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) from locations WHERE country IS NOT NULL GROUP BY country ORDER BY count(*) DESC OFFSET 5) AS o))::jsonb, 
true);
country_json := jsonb_set(country_json, '{unknown}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) from locations WHERE country IS NULL GROUP BY country ) AS o))::jsonb, 
true);
location := '{}'::jsonb;
location := jsonb_set(location, '{city}', city_json, true);
location := jsonb_set(location, '{state}', state_json, true);
location := jsonb_set(location, '{country}', country_json, true);
DROP MATERIALIZED VIEW locations;
RETURN location;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getrecruiterscreeningdata(recruiter_id integer)
 RETURNS TABLE(first_name character varying, last_name character varying, avatar character varying, status_emails_sent character varying, screening_title character varying, job_title character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        c.first_name,
        c.last_name,
        c.avatar,
        a.status_emails_sent,
        COALESCE(sq.title, '') AS screening_title,
        pj.job_title
    FROM 
        recruiter r
    JOIN 
        public_jobs pj ON r.id = pj.recruiter_id
    JOIN 
        applications a ON pj.id = a.job_id
    JOIN 
        candidate_files cf ON a.candidate_file_id = cf.id
    JOIN 
        candidates c ON cf.candidate_id = c.id
    LEFT JOIN
        screening_questions sq ON pj.screening_template = sq.id
    WHERE 
        r.id ='f201c53d-9602-442d-9122-2725d9a2aae8'
        AND a.status = 'screening';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getresumematches(jobid uuid, section application_status, topmatch integer DEFAULT 80, goodmatch integer DEFAULT 60, averagematch integer DEFAULT 40, poormatch integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE 
  matches jsonb;
BEGIN
  SELECT JSONB_OBJECT_AGG(match, count) INTO matches
  FROM(
    SELECT categories.match as match, COALESCE(match_category.count, 0) AS count
      FROM (
      SELECT 'topMatch' AS match UNION ALL
      SELECT 'goodMatch' UNION ALL
      SELECT 'averageMatch' UNION ALL
      SELECT 'poorMatch' UNION ALL
      SELECT 'noMatch' UNION ALL
      SELECT 'unknownMatch'
    ) AS categories
    LEFT JOIN (
      SELECT 
        CASE 
          WHEN overall_score <= 100 AND overall_score >=topMatch THEN 'topMatch'
          WHEN overall_score < topMatch AND overall_score >=goodMatch THEN 'goodMatch'
          WHEN overall_score < goodMatch AND overall_score >=averageMatch THEN 'averageMatch'
          WHEN overall_score < averageMatch AND overall_score >=poorMatch THEN 'poorMatch'
          WHEN overall_score < poorMatch AND overall_score >=0 THEN 'noMatch'
          ELSE 'unknownMatch'
        END AS match,
      COUNT(*) AS count
      FROM 
        applications
        WHERE 
          job_id = jobId AND status = section
        GROUP BY 
          match
    ) AS match_category
    ON categories.match = match_category.match
  ) as m;
RETURN matches;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getsectioncounts(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE 
  sections jsonb;
BEGIN
  SELECT JSONB_OBJECT_AGG(status, count) INTO sections
  FROM(
    SELECT categories.status as status, COALESCE(status_category.count, 0) AS count
      FROM (
      SELECT 'new' AS status UNION ALL
      SELECT 'screening' UNION ALL
      SELECT 'assessment' UNION ALL
      SELECT 'interview' UNION ALL
      SELECT 'qualified' UNION ALL
      SELECT 'disqualified'
    ) AS categories
    LEFT JOIN (
      SELECT 
      status,
      COUNT(*) AS count
      FROM 
        applications
        WHERE 
          job_id = jobId 
        GROUP BY 
          status
    ) AS status_category
    ON 
    categories.status::application_status = status_category.status
  ) as s;
RETURN sections;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getskillpools(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE 
  skill jsonb;
  top_skills jsonb;
  required_skills jsonb;
BEGIN 
  EXECUTE format('
  CREATE MATERIALIZED VIEW candidate_skills AS (
    SELECT
      jsonb_array_elements_text((can.resume_json ->> ''skills'')::jsonb) AS all_skills
    FROM
      applications as app
    LEFT JOIN 
      candidate_files AS can ON app.candidate_file_id = can.id
    WHERE
      app.job_id = ''%s''
  )
', jobId);
  SELECT JSON_OBJECT_AGG(skills, count) INTO top_skills
  FROM (
    SELECT 
      LOWER(all_skills) as skills, 
      COUNT(all_skills)
    FROM candidate_skills
    GROUP BY LOWER(all_skills)
    ORDER BY count DESC
    LIMIT 10 
    ) AS can;
  SELECT JSON_OBJECT_AGG(skills, count) INTO required_skills
  FROM (
    SELECT
      job.skills, 
      COALESCE(can.count , 0) as count
    FROM
      (SELECT
        LOWER((jsonb_array_elements_text((jd_json -> 'skills')::jsonb)::jsonb) ->> 'field') AS skills
      FROM
        public_jobs
      WHERE
        id = jobId
        ) AS job 
    LEFT JOIN
      (SELECT 
        LOWER(all_skills) as skills, 
        COUNT(all_skills)
      FROM candidate_skills 
      GROUP BY 
        LOWER(all_skills)) AS can
    ON can.skills = job.skills
    ORDER BY count DESC
  ) as s;
skill := '{}'::jsonb;
skill := jsonb_set(skill, '{top_skills}', top_skills, true);
skill := jsonb_set(skill, '{required_skills}', required_skills, true);
DROP MATERIALIZED VIEW candidate_skills;
RETURN skill;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getskillspool(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE 
  skill jsonb;
BEGIN 
  SELECT JSON_OBJECT_AGG(skills, count) INTO skill
  FROM (
    SELECT 
      LOWER(all_skills) as skills, 
      COUNT(all_skills)
    FROM
    (SELECT
      jsonb_array_elements_text((can.resume_json ->> 'skills')::jsonb) all_skills
      FROM
        applications as app
      LEFT JOIN 
        candidate_files AS can ON app.candidate_file_id = can.id
      WHERE
        app.job_id = jobId
    ) AS subquery
    GROUP BY all_skills
    ORDER BY COUNT(all_skills) DESC
    LIMIT 25 
    ) AS can;
RETURN skill;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.job_application_filter_sort(jb_id uuid, min_lat double precision DEFAULT 0, min_long double precision DEFAULT 0, max_lat double precision DEFAULT 0, max_long double precision DEFAULT 0, j_status text DEFAULT 'new'::text, from_rec_num numeric DEFAULT 0, end_rec_num numeric DEFAULT 100, min_resume_score numeric DEFAULT '-1'::integer, max_resume_score numeric DEFAULT 100, min_interview_score numeric DEFAULT 0, max_interview_score numeric DEFAULT 100, sort_column_text text DEFAULT 'overall_score'::text, is_sort_desc boolean DEFAULT true, text_search_qry text DEFAULT ''::text, sort_by_schedule text DEFAULT 'asc'::text, is_locat_filter_on boolean DEFAULT false)
 RETURNS TABLE(job_app json, cand json, candfiles json, assres jsonb, schedule json, fil_res bigint)
 LANGUAGE plpgsql
AS $function$ 
 
BEGIN
  -- Initialize total_results variable
  fil_res := 0;
  
  -- Return the paginated results along with total_results

  RETURN QUERY 
  WITH filtered_results AS (
    SELECT
      row_to_json(ja) AS job_app,
      row_to_json(c) AS cand,
      json_build_object(
        'id', cf.id,
        'created_at', cf.created_at, 
        'file_url', cf.file_url, 
        'candidate_id', cf.candidate_id, 
        'resume_text', cf.resume_text, 
        'resume_json', cf.resume_json, 
        'type', cf.type
      ) AS  candfiles,
      (
        SELECT jsonb_agg(to_jsonb(ar.*) ORDER BY ar.created_at DESC) 
        FROM assessment_results ar 
        WHERE ar.application_id = ja.id
      ) AS assres,
      row_to_json(insc) AS schedule
    FROM
      applications ja      
      JOIN candidates c ON ja.candidate_id = c.id     
      LEFT JOIN candidate_files cf ON cf.id = ja.candidate_file_id
      -- LEFT JOIN assessment_results ar ON ar.application_id = ja.id
      LEFT JOIN interview_schedule insc ON insc.application_id = ja.id
    WHERE
      ja.job_id = jb_id
      AND ja.status::text = j_status
      AND (ja.overall_score >= min_resume_score AND ja.overall_score <= max_resume_score)
      AND (
        length(text_search_qry) = 0
        OR to_tsvector(lower(concat(c.first_name, ' ', c.last_name, ' ', c.email))) @@ to_tsquery('english', lower(text_search_qry))
      )
      AND (
        NOT is_locat_filter_on -- If is_locat_filter_on is false, skip the geolocation filter
        OR (is_locat_filter_on and c.geolocation && ST_SetSRID(ST_MakeBox2D(ST_Point(min_long, min_lat), ST_Point(max_long, max_lat)), 4326))
      )
  )
  SELECT 
    fr.job_app,
    fr.cand,
    fr.candfiles,
    fr.assres,
    fr.schedule,
    count(*) OVER () AS fil_res
  FROM filtered_results fr
ORDER BY
    CASE WHEN sort_by_schedule = 'asc' THEN (fr.schedule->'schedule_time'->>'startTime')::timestamp END ASC,
    CASE 
        WHEN sort_column_text = 'overall_score' AND is_sort_desc THEN COALESCE((fr.job_app->>'overall_score')::numeric, -1)
    END DESC,
    CASE 
        WHEN sort_column_text = 'overall_score' AND NOT is_sort_desc THEN COALESCE((fr.job_app->>'overall_score')::numeric, -1)
    END ASC ,
    CASE 
        WHEN sort_column_text = 'full_name' AND is_sort_desc THEN concat(fr.cand->>'first_name',' ',fr.cand->>'last_name')
    END DESC,
    CASE 
        WHEN sort_column_text = 'full_name' AND NOT is_sort_desc THEN concat(fr.cand->>'first_name',' ',fr.cand->>'last_name')
    END ASC,
    CASE 
        WHEN sort_column_text = 'email' AND is_sort_desc THEN fr.cand->>'email'
    END DESC,
    CASE 
        WHEN sort_column_text = 'email' AND NOT is_sort_desc THEN fr.cand->>'email'
    END ASC,
    CASE 
        WHEN sort_column_text = 'applied_at' AND is_sort_desc THEN fr.job_app->>'applied_at'
    END DESC,
    CASE 
        WHEN sort_column_text = 'applied_at' AND NOT is_sort_desc THEN fr.job_app->>'applied_at'
    END ASC 
  LIMIT (end_rec_num-from_rec_num)
  OFFSET from_rec_num;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.kkkjob_application_filter_sort(jb_id uuid, min_lat double precision DEFAULT 0, min_long double precision DEFAULT 0, max_lat double precision DEFAULT 0, max_long double precision DEFAULT 0, j_status text DEFAULT 'new'::text, from_rec_num numeric DEFAULT 0, end_rec_num numeric DEFAULT 100, min_resume_score numeric DEFAULT '-1'::integer, max_resume_score numeric DEFAULT 100, min_interview_score numeric DEFAULT 0, max_interview_score numeric DEFAULT 100, sort_column_text text DEFAULT 'overall_score'::text, is_sort_desc boolean DEFAULT true, text_search_qry text DEFAULT ''::text, sort_by_schedule text DEFAULT 'asc'::text, is_locat_filter_on boolean DEFAULT false)
 RETURNS TABLE(job_app json, cand json, candfiles json, assres jsonb, schedule json, panel json, fil_res bigint)
 LANGUAGE plpgsql
AS $function$ 
 
BEGIN
  -- Initialize total_results variable
  fil_res := 0;
  
  -- Return the paginated results along with total_results

  RETURN QUERY 
  WITH filtered_results AS (
    SELECT
      row_to_json(ja) AS job_app,
      row_to_json(c) AS cand,
      json_build_object(
        'id', cf.id,
        'created_at', cf.created_at, 
        'file_url', cf.file_url, 
        'candidate_id', cf.candidate_id, 
        'resume_text', cf.resume_text, 
        'resume_json', cf.resume_json, 
        'type', cf.type
      ) AS  candfiles,
      (
        SELECT jsonb_agg(to_jsonb(ar.*) ORDER BY ar.created_at DESC) 
        FROM assessment_results ar 
        WHERE ar.application_id = ja.id
      ) AS assres,
      row_to_json(insc) AS schedule,
      row_to_json(pan) AS panel
    FROM
      applications ja      
      JOIN candidates c ON ja.candidate_id = c.id     
      LEFT JOIN candidate_files cf ON cf.id = ja.candidate_file_id
      -- LEFT JOIN assessment_results ar ON ar.application_id = ja.id
      LEFT JOIN interview_schedule insc ON insc.application_id = ja.id
      LEFT JOIN interview_panel pan ON insc.panel_id = pan.id
    WHERE
      ja.job_id = jb_id
      AND ja.status::text = j_status
      AND (ja.overall_score >= min_resume_score AND ja.overall_score <= max_resume_score)
      AND (
        length(text_search_qry) = 0
        OR to_tsvector(lower(concat(c.first_name, ' ', c.last_name, ' ', c.email))) @@ to_tsquery('english', lower(text_search_qry))
      )
      AND (
        NOT is_locat_filter_on -- If is_locat_filter_on is false, skip the geolocation filter
        OR (is_locat_filter_on and c.geolocation && ST_SetSRID(ST_MakeBox2D(ST_Point(min_long, min_lat), ST_Point(max_long, max_lat)), 4326))
      )
  )
  SELECT 
    fr.job_app,
    fr.cand,
    fr.candfiles,
    fr.assres,
    fr.schedule,
    fr.panel,
    count(*) OVER () AS fil_res
  FROM filtered_results fr
ORDER BY
    CASE WHEN sort_by_schedule = 'asc' THEN (fr.schedule->'schedule_time'->>'startTime')::timestamp END ASC,
    CASE 
        WHEN sort_column_text = 'overall_score' AND is_sort_desc THEN COALESCE((fr.job_app->>'overall_score')::numeric, -1)
    END DESC,
    CASE 
        WHEN sort_column_text = 'overall_score' AND NOT is_sort_desc THEN COALESCE((fr.job_app->>'overall_score')::numeric, -1)
    END ASC ,
    CASE 
        WHEN sort_column_text = 'full_name' AND is_sort_desc THEN concat(fr.cand->>'first_name',' ',fr.cand->>'last_name')
    END DESC,
    CASE 
        WHEN sort_column_text = 'full_name' AND NOT is_sort_desc THEN concat(fr.cand->>'first_name',' ',fr.cand->>'last_name')
    END ASC,
    CASE 
        WHEN sort_column_text = 'email' AND is_sort_desc THEN fr.cand->>'email'
    END DESC,
    CASE 
        WHEN sort_column_text = 'email' AND NOT is_sort_desc THEN fr.cand->>'email'
    END ASC,
    CASE 
        WHEN sort_column_text = 'applied_at' AND is_sort_desc THEN fr.job_app->>'applied_at'
    END DESC,
    CASE 
        WHEN sort_column_text = 'applied_at' AND NOT is_sort_desc THEN fr.job_app->>'applied_at'
    END ASC 
  LIMIT (end_rec_num-from_rec_num)
  OFFSET from_rec_num;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.kkkjob_application_filter_sort2(jb_id uuid, min_lat double precision DEFAULT 0, min_long double precision DEFAULT 0, max_lat double precision DEFAULT 0, max_long double precision DEFAULT 0, j_status text DEFAULT 'new'::text, from_rec_num numeric DEFAULT 0, end_rec_num numeric DEFAULT 100, min_resume_score numeric DEFAULT '-1'::integer, max_resume_score numeric DEFAULT 100, min_interview_score numeric DEFAULT 0, max_interview_score numeric DEFAULT 100, sort_column_text text DEFAULT 'overall_score'::text, is_sort_desc boolean DEFAULT true, text_search_qry text DEFAULT ''::text, sort_by_schedule text DEFAULT 'asc'::text, is_locat_filter_on boolean DEFAULT false)
 RETURNS TABLE(job_app json, cand json, candfiles json, assres jsonb, schedule json, panel json, fil_res bigint)
 LANGUAGE plpgsql
AS $function$ 
 
BEGIN
  -- Initialize total_results variable
  fil_res := 0;
  
  -- Return the paginated results along with total_results

  RETURN QUERY 
  WITH filtered_results AS (
    SELECT
      row_to_json(ja) AS job_app,
      row_to_json(c) AS cand,
      json_build_object(
        'id', cf.id,
        'created_at', cf.created_at, 
        'file_url', cf.file_url, 
        'candidate_id', cf.candidate_id, 
        'resume_text', cf.resume_text, 
        'resume_json', cf.resume_json, 
        'type', cf.type
      ) AS  candfiles,
      (
        SELECT jsonb_agg(to_jsonb(ar.*) ORDER BY ar.created_at DESC) 
        FROM assessment_results ar 
        WHERE ar.application_id = ja.id
      ) AS assres,
      row_to_json(insc) AS schedule,
      row_to_json(pan) AS panel
    FROM
      applications ja      
      JOIN candidates c ON ja.candidate_id = c.id     
      LEFT JOIN candidate_files cf ON cf.id = ja.candidate_file_id
      -- LEFT JOIN assessment_results ar ON ar.application_id = ja.id
      LEFT JOIN interview_schedule insc ON insc.application_id = ja.id
      LEFT JOIN interview_panel pan ON insc.panel_id = pan.id
    WHERE
      ja.job_id = jb_id
      AND ja.status::text = j_status
      AND (ja.overall_score >= min_resume_score AND ja.overall_score <= max_resume_score)
      AND (
        length(text_search_qry) = 0
        OR to_tsvector(lower(concat(c.first_name, ' ', c.last_name, ' ', c.email))) @@ to_tsquery('english', lower(text_search_qry))
      )
      AND (
        NOT is_locat_filter_on -- If is_locat_filter_on is false, skip the geolocation filter
        OR (is_locat_filter_on and c.geolocation && ST_SetSRID(ST_MakeBox2D(ST_Point(min_long, min_lat), ST_Point(max_long, max_lat)), 4326))
      )
  )
  SELECT 
    fr.job_app,
    fr.cand,
    fr.candfiles,
    fr.assres,
    fr.schedule,
    fr.panel,
    count(*) OVER () AS fil_res
  FROM filtered_results fr
ORDER BY
    CASE WHEN sort_by_schedule = 'asc' THEN (fr.schedule->'schedule_time'->>'startTime')::timestamp END ASC,
    CASE 
        WHEN sort_column_text = 'overall_score' AND is_sort_desc THEN COALESCE((fr.job_app->>'overall_score')::numeric, -1)
    END DESC,
    CASE 
        WHEN sort_column_text = 'overall_score' AND NOT is_sort_desc THEN COALESCE((fr.job_app->>'overall_score')::numeric, -1)
    END ASC ,
    CASE 
        WHEN sort_column_text = 'full_name' AND is_sort_desc THEN concat(fr.cand->>'first_name',' ',fr.cand->>'last_name')
    END DESC,
    CASE 
        WHEN sort_column_text = 'full_name' AND NOT is_sort_desc THEN concat(fr.cand->>'first_name',' ',fr.cand->>'last_name')
    END ASC,
    CASE 
        WHEN sort_column_text = 'email' AND is_sort_desc THEN fr.cand->>'email'
    END DESC,
    CASE 
        WHEN sort_column_text = 'email' AND NOT is_sort_desc THEN fr.cand->>'email'
    END ASC,
    CASE 
        WHEN sort_column_text = 'applied_at' AND is_sort_desc THEN fr.job_app->>'applied_at'
    END DESC,
    CASE 
        WHEN sort_column_text = 'applied_at' AND NOT is_sort_desc THEN fr.job_app->>'applied_at'
    END ASC 
  LIMIT (end_rec_num-from_rec_num)
  OFFSET from_rec_num;
END;
$function$
;

create type "public"."location_type" as ("city" text, "state" text, "country" text);

CREATE OR REPLACE FUNCTION public.match_questions(query_embedding vector, match_threshold double precision, match_count integer)
 RETURNS TABLE(id uuid, question jsonb, level text, type text, duration numeric, similarity double precision)
 LANGUAGE sql
 STABLE
AS $function$
  select
    question_bank.id,
    question_bank.question,
    question_bank.level,
    question_bank.type,
    question_bank.duration,
    1 - (question_bank.embeddings <=> query_embedding) as similarity
  from question_bank
  where question_bank.embeddings <=> query_embedding < 1 - match_threshold
  order by question_bank.embeddings <=> query_embedding
  limit match_count;
$function$
;

create type "public"."my_table_type" as ("name" text, "age" integer, "city" text);

CREATE OR REPLACE FUNCTION public.search_candidates(recruiter_id_param uuid, name_param text)
 RETURNS TABLE(applications json, candidate json, job json)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
      row_to_json(app) AS applications,
      row_to_json(cand) AS candidate,
      json_build_object(
        'id', pj.id,
        'created_at', pj.created_at, 
        'job_title', pj.job_title, 
        'description', pj.description, 
        'parameter_weights', pj.parameter_weights, 
        'recruiter_id', pj.recruiter_id, 
        'jd_json', pj.jd_json
      ) AS job
    FROM applications AS app
    JOIN candidates AS cand ON app.candidate_id = cand.id
    JOIN public_jobs pj ON pj.id = app.job_id
    WHERE cand.recruiter_id = recruiter_id_param
      AND app.status::text = 'interview'
      AND (cand.first_name || ' ' || cand.last_name) ILIKE '%' || name_param || '%';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_interview_schedule_status()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    schedule_id_var uuid;
BEGIN
    -- Loop through each row in interview_schedule
    FOR schedule_id_var IN SELECT id FROM interview_schedule LOOP
        -- Check if all meetings associated with the current schedule_id have ended
        IF NOT EXISTS (
            SELECT 1
            FROM interview_meeting 
            WHERE interview_schedule_id = schedule_id_var AND to_timestamp(end_time, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') > NOW()
        ) THEN
            -- If all meetings have ended, update status in interview_schedule
            UPDATE interview_schedule
            SET status = 'completed'
            WHERE id = schedule_id_var AND status ='confirmed'; -- Update only if status is not already 'Completed'
        END IF;
    END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_meeting_status()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Loop through each row in interview_schedule
    UPDATE interview_meeting
    SET status = 'completed'
    WHERE to_timestamp(end_time, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') < NOW() AND status <> 'completed'AND status <> 'cancelled';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.updatequestionorder(start_point integer, question_ids uuid[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    WITH question_order AS (
        SELECT 
            id,
            start_point + (ROW_NUMBER() OVER ()) - 1 AS new_order
        FROM 
            unnest(question_ids) WITH ORDINALITY AS t(id, ordinal)
    )
    UPDATE 
        assessment_question AS aq
    SET 
        "order" = qo.new_order
    FROM 
        question_order AS qo
    WHERE 
        aq.id = qo.id;
END
$function$
;

CREATE OR REPLACE FUNCTION public.ashbyapplicationsync()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB := '[]'::JSONB;  -- Variable to store the result
    function_url TEXT;
    rec_id uuid;
    request_results JSONB;
BEGIN
    FOR rec_id IN (SELECT id FROM recruiter WHERE ashby_key IS NOT NULL)
    LOOP
        IF ashbyjobreference(rec_id) IS NOT NULL THEN
            SELECT value INTO function_url FROM env WHERE name = 'ashby-application';

            request_results := net.http_post(
                url := function_url,
                body := jsonb_build_object('recruiter_id', rec_id::uuid)
            );
        END IF;
    END LOOP;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.calc_sim_score3(job_ids uuid[], skill_qry_emb vector, edu_qry_emb vector, exp_qry_emb vector, resume_qry_emb vector, max_records integer DEFAULT 25, ts_query text DEFAULT ''::text, filter_companies text DEFAULT ''::text)
 RETURNS TABLE(application_id uuid, created_at text, first_name citext, last_name citext, job_title text, email citext, resume_link text, json_resume jsonb, profile_image text, candidate_id uuid, job_id uuid, similarity double precision, sim_exp double precision, sim_res double precision, sim_skills double precision, sim_educ double precision, candfile_id uuid)
 LANGUAGE plpgsql
AS $function$ 
BEGIN 
  RETURN QUERY 
    SELECT DISTINCT ON (j_app.candidate_id)
      j_app.id,
      j_app.created_at::text,
      cand.first_name,
      cand.last_name,
      COALESCE(c_files.resume_json->'basics'->>'currentJobTitle', ''),
      cand.email,
      c_files.file_url,
      c_files.resume_json,
      cand.avatar,
      j_app.candidate_id,
      j_app.job_id,
      (
        (
          COALESCE(1 - (c_files.experience_embedding <=> exp_qry_emb), 0) * 0.5 +
          COALESCE(1 - (c_files.resume_embedding <=> resume_qry_emb), 0) * 0.2 +
          COALESCE(1 - (c_files.skills_embedding <=> skill_qry_emb), 0) * 0.2 + 
          COALESCE(1 - (c_files.education_embedding <=> edu_qry_emb), 0) * 0.1 
        )
      ) AS similarity,
      COALESCE(1 - (c_files.experience_embedding <=> exp_qry_emb), 0),
      COALESCE(1 - (c_files.resume_embedding <=> resume_qry_emb), 0),
      COALESCE(1 - (c_files.skills_embedding <=> skill_qry_emb), 0),
      COALESCE(1 - (c_files.education_embedding <=> edu_qry_emb), 0),
      j_app.candidate_file_id
    FROM
        candidates AS cand
        JOIN applications AS j_app ON cand.id = j_app.candidate_id
        JOIN candidate_files AS c_files ON cand.id = c_files.candidate_id
    WHERE
      j_app.job_id = ANY(job_ids) AND
      CASE
        WHEN LENGTH(ts_query) > 0 THEN 
          to_tsvector(COALESCE(lower(c_files.resume_json->'basics'->>'currentJobTitle'), '')) @@ to_tsquery('english', ts_query) 
        ELSE true
        end
      AND
      CASE
        WHEN LENGTH(filter_companies) > 0 THEN to_tsvector(COALESCE(lower(c_files.resume_text),'')) @@ to_tsquery('english', filter_companies)
        ELSE true 
      END
    ORDER BY j_app.candidate_id, similarity DESC
    LIMIT max_records;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.emailcroncandidatedb()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB := '[]'::JSONB;  -- Variable to store the result
    function_url TEXT;
    request_results JSONB;
    outreach_emails jsonb[];
BEGIN
    -- Call the getoutreachemails function to retrieve outreach emails
    outreach_emails := emailHandlerCandidateDb();

    -- Check if there are any outreach emails to process
    IF array_length(outreach_emails, 1) IS NOT NULL THEN
        -- Retrieve the function URL from the 'env' table
        SELECT value INTO function_url FROM env WHERE name = 'email-handler-candidatedb';

        -- Send a single POST request with the entire array as the body
        request_results := net.http_post(
            url := function_url,
            body := to_jsonb(outreach_emails)
        );

        -- Update the result variable with the response from the POST request
        result := result || request_results;
    END IF;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.emailhandlercandidatedb()
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
        SELECT 
        row_to_json(oe) AS outreach_email,
         json_build_object(
        'id', c.id,
        'organization_id', c.organization_id, 
        'aglint_id', c.aglint_id, 
        'email', c.email
        ) AS  ag_candidate,
        json_build_object(
        'user_id', ru.user_id,
        'email_auth', ru.email_auth
        ) AS  recruiter_user
        FROM outreached_emails oe
        JOIN aglint_candidates c ON oe.candidate_id = c.id
        JOIN recruiter_user ru ON ru.user_id=oe.recruiter_user_id
        WHERE oe.email_sent = false
        AND c.email NOT LIKE '%email_not_unlocked%'
        LIMIT 25
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjobapplicationcountforcandidates2(candidate_ids uuid[])
 RETURNS TABLE(candidate_id uuid, job_ids uuid[], job_titles text[])
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        j_app.candidate_id ,
        ARRAY_AGG(pj.id) as job_ids,
        ARRAY_AGG(pj.job_title) AS job_titles
    FROM
        applications AS j_app
    JOIN
        public_jobs AS pj ON j_app.job_id = pj.id
    WHERE
        j_app.candidate_id = ANY(candidate_ids)
    GROUP BY
        j_app.candidate_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjobapplications(ids uuid[])
 RETURNS TABLE(job_id uuid, status text, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
    SELECT ja.job_id, ja.status::text, count(*)
    FROM public.applications AS ja
    WHERE ja.job_id = ANY(ids)
    GROUP BY ja.job_id, ja.status::text
    ORDER BY ja.job_id, ja.status::text;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getoutreachemails()
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
        SELECT 
        row_to_json(oe) AS outreach_email,
         json_build_object(
        'id', c.id,
        'organization_id', c.organization_id, 
        'aglint_id', c.aglint_id, 
        'email', c.email
        ) AS  ag_candidate,
        json_build_object(
        'user_id', ru.user_id,
        'email_auth', ru.email_auth
        ) AS  recruiter_user
        FROM outreached_emails oe
        JOIN aglint_candidates c ON oe.candidate_id = c.id
        JOIN recruiter_user ru ON ru.user_id=oe.recruiter_user_id
        WHERE oe.email_sent = false
        AND c.email LIKE '%email_not_unlocked%'
        LIMIT 25
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.outreachhandler()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB := '[]'::JSONB;  -- Variable to store the result
    function_url TEXT;
    request_results JSONB;
    outreach_emails jsonb[];
BEGIN
    -- Call the getoutreachemails function to retrieve outreach emails
    outreach_emails := getoutreachemails();

    -- Check if there are any outreach emails to process
    IF array_length(outreach_emails, 1) IS NOT NULL THEN
        -- Retrieve the function URL from the 'env' table
        SELECT value INTO function_url FROM env WHERE name = 'outreach-handler';

        -- Send a single POST request with the entire array as the body
        request_results := net.http_post(
            url := function_url,
            body := to_jsonb(outreach_emails)
        );

        -- Update the result variable with the response from the POST request
        result := result || request_results;
    END IF;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.test_filter3(rec_id uuid, location_filter text, name_filter text, job_title_filter text, page_size integer, page_number integer, sort_param text DEFAULT 'first_name'::text, is_name_sort_desc boolean DEFAULT false, is_location_sort_desc boolean DEFAULT false, is_job_title_sort_desc boolean DEFAULT false)
 RETURNS TABLE(application_id uuid, created_at text, first_name citext, last_name citext, job_title text, email citext, resume_link text, json_resume jsonb, profile_image text, candidate_id uuid, job_id uuid, candfile_id uuid, total_results bigint)
 LANGUAGE plpgsql
AS $function$ 
BEGIN
  -- Initialize total_results variable
  total_results := 0;

  -- Return the paginated results along with total_results
  RETURN QUERY 
  WITH filtered_results AS (
    SELECT DISTINCT ON (j_app.candidate_id)
      j_app.id as application_id,
      j_app.created_at::text,
      cand.first_name,
      cand.last_name,
      COALESCE(c_files.resume_json->'basics'->>'currentJobTitle', '') as job_title,
      cand.email,
      c_files.file_url as resume,
      c_files.resume_json,
      cand.avatar as profile_image,
      j_app.candidate_id,
      j_app.job_id,
      c_files.id as candfile_id
    FROM
        candidates AS cand
        JOIN applications AS j_app ON cand.id = j_app.candidate_id
        JOIN candidate_files AS c_files ON cand.id = c_files.candidate_id
    WHERE
      cand.recruiter_id = rec_id
      AND
      c_files.resume_json is not null
      AND
      c_files.resume_json->'basics' is not null
      AND (
        CASE
          WHEN LENGTH(location_filter) > 0 THEN to_tsvector(lower(COALESCE(c_files.resume_json->'basics'->>'location', ''))) @@ to_tsquery('english', lower(location_filter))
          ELSE true 
        END
      )
      AND (
        CASE
          WHEN LENGTH(name_filter) > 0 THEN to_tsvector(lower(concat(COALESCE(c_files.resume_json->'basics'->>'firstName', ''),' ',COALESCE(c_files.resume_json->'basics'->>'lastName', '')))) @@ to_tsquery('english', lower(name_filter))
          ELSE true 
        END
      )
      AND (
        CASE
          WHEN LENGTH(job_title_filter) > 0 THEN to_tsvector(lower(COALESCE(c_files.resume_json->'basics'->>'currentJobTitle', ''))) @@ to_tsquery('english', lower(job_title_filter))
          ELSE true 
        END
      )
  )
 SELECT 
    fr.application_id,
    fr.created_at,
    fr.first_name,
    fr.last_name,
    fr.job_title,
    fr.email,
    fr.resume,
    fr.resume_json,
    fr.profile_image,
    fr.candidate_id,
    fr.job_id,
    fr.candfile_id,
    count(*) OVER () AS total_results
  FROM filtered_results fr
ORDER BY
   CASE
      WHEN sort_param = 'first_name' AND is_name_sort_desc THEN lower(fr.first_name) END DESC,
    CASE
      WHEN sort_param = 'first_name' AND NOT is_name_sort_desc THEN lower(fr.first_name) END ASC,
    CASE
      WHEN sort_param = 'location' AND is_location_sort_desc THEN lower(COALESCE(fr.resume_json->'basics'->>'location', '')) END DESC,
    CASE
      WHEN sort_param = 'location' AND NOT is_location_sort_desc THEN lower(COALESCE(fr.resume_json->'basics'->>'location', '')) END ASC,
    CASE
      WHEN sort_param = 'job_title' AND is_job_title_sort_desc THEN lower(COALESCE(fr.resume_json->'basics'->>'currentJobTitle', '')) END DESC,
    CASE
    WHEN sort_param = 'job_title' AND NOT is_job_title_sort_desc THEN lower(COALESCE(fr.resume_json->'basics'->>'currentJobTitle', '')) END ASC

  LIMIT page_size
  OFFSET (page_number - 1) * page_size;
END;
$function$
;

grant delete on table "public"."agent" to "anon";

grant insert on table "public"."agent" to "anon";

grant references on table "public"."agent" to "anon";

grant select on table "public"."agent" to "anon";

grant trigger on table "public"."agent" to "anon";

grant truncate on table "public"."agent" to "anon";

grant update on table "public"."agent" to "anon";

grant delete on table "public"."agent" to "authenticated";

grant insert on table "public"."agent" to "authenticated";

grant references on table "public"."agent" to "authenticated";

grant select on table "public"."agent" to "authenticated";

grant trigger on table "public"."agent" to "authenticated";

grant truncate on table "public"."agent" to "authenticated";

grant update on table "public"."agent" to "authenticated";

grant delete on table "public"."agent" to "service_role";

grant insert on table "public"."agent" to "service_role";

grant references on table "public"."agent" to "service_role";

grant select on table "public"."agent" to "service_role";

grant trigger on table "public"."agent" to "service_role";

grant truncate on table "public"."agent" to "service_role";

grant update on table "public"."agent" to "service_role";

grant delete on table "public"."agent_activity" to "anon";

grant insert on table "public"."agent_activity" to "anon";

grant references on table "public"."agent_activity" to "anon";

grant select on table "public"."agent_activity" to "anon";

grant trigger on table "public"."agent_activity" to "anon";

grant truncate on table "public"."agent_activity" to "anon";

grant update on table "public"."agent_activity" to "anon";

grant delete on table "public"."agent_activity" to "authenticated";

grant insert on table "public"."agent_activity" to "authenticated";

grant references on table "public"."agent_activity" to "authenticated";

grant select on table "public"."agent_activity" to "authenticated";

grant trigger on table "public"."agent_activity" to "authenticated";

grant truncate on table "public"."agent_activity" to "authenticated";

grant update on table "public"."agent_activity" to "authenticated";

grant delete on table "public"."agent_activity" to "service_role";

grant insert on table "public"."agent_activity" to "service_role";

grant references on table "public"."agent_activity" to "service_role";

grant select on table "public"."agent_activity" to "service_role";

grant trigger on table "public"."agent_activity" to "service_role";

grant truncate on table "public"."agent_activity" to "service_role";

grant update on table "public"."agent_activity" to "service_role";

grant delete on table "public"."agent_chat" to "anon";

grant insert on table "public"."agent_chat" to "anon";

grant references on table "public"."agent_chat" to "anon";

grant select on table "public"."agent_chat" to "anon";

grant trigger on table "public"."agent_chat" to "anon";

grant truncate on table "public"."agent_chat" to "anon";

grant update on table "public"."agent_chat" to "anon";

grant delete on table "public"."agent_chat" to "authenticated";

grant insert on table "public"."agent_chat" to "authenticated";

grant references on table "public"."agent_chat" to "authenticated";

grant select on table "public"."agent_chat" to "authenticated";

grant trigger on table "public"."agent_chat" to "authenticated";

grant truncate on table "public"."agent_chat" to "authenticated";

grant update on table "public"."agent_chat" to "authenticated";

grant delete on table "public"."agent_chat" to "service_role";

grant insert on table "public"."agent_chat" to "service_role";

grant references on table "public"."agent_chat" to "service_role";

grant select on table "public"."agent_chat" to "service_role";

grant trigger on table "public"."agent_chat" to "service_role";

grant truncate on table "public"."agent_chat" to "service_role";

grant update on table "public"."agent_chat" to "service_role";

grant delete on table "public"."agent_chat_messages" to "anon";

grant insert on table "public"."agent_chat_messages" to "anon";

grant references on table "public"."agent_chat_messages" to "anon";

grant select on table "public"."agent_chat_messages" to "anon";

grant trigger on table "public"."agent_chat_messages" to "anon";

grant truncate on table "public"."agent_chat_messages" to "anon";

grant update on table "public"."agent_chat_messages" to "anon";

grant delete on table "public"."agent_chat_messages" to "authenticated";

grant insert on table "public"."agent_chat_messages" to "authenticated";

grant references on table "public"."agent_chat_messages" to "authenticated";

grant select on table "public"."agent_chat_messages" to "authenticated";

grant trigger on table "public"."agent_chat_messages" to "authenticated";

grant truncate on table "public"."agent_chat_messages" to "authenticated";

grant update on table "public"."agent_chat_messages" to "authenticated";

grant delete on table "public"."agent_chat_messages" to "service_role";

grant insert on table "public"."agent_chat_messages" to "service_role";

grant references on table "public"."agent_chat_messages" to "service_role";

grant select on table "public"."agent_chat_messages" to "service_role";

grant trigger on table "public"."agent_chat_messages" to "service_role";

grant truncate on table "public"."agent_chat_messages" to "service_role";

grant update on table "public"."agent_chat_messages" to "service_role";

grant delete on table "public"."agent_chatx" to "anon";

grant insert on table "public"."agent_chatx" to "anon";

grant references on table "public"."agent_chatx" to "anon";

grant select on table "public"."agent_chatx" to "anon";

grant trigger on table "public"."agent_chatx" to "anon";

grant truncate on table "public"."agent_chatx" to "anon";

grant update on table "public"."agent_chatx" to "anon";

grant delete on table "public"."agent_chatx" to "authenticated";

grant insert on table "public"."agent_chatx" to "authenticated";

grant references on table "public"."agent_chatx" to "authenticated";

grant select on table "public"."agent_chatx" to "authenticated";

grant trigger on table "public"."agent_chatx" to "authenticated";

grant truncate on table "public"."agent_chatx" to "authenticated";

grant update on table "public"."agent_chatx" to "authenticated";

grant delete on table "public"."agent_chatx" to "service_role";

grant insert on table "public"."agent_chatx" to "service_role";

grant references on table "public"."agent_chatx" to "service_role";

grant select on table "public"."agent_chatx" to "service_role";

grant trigger on table "public"."agent_chatx" to "service_role";

grant truncate on table "public"."agent_chatx" to "service_role";

grant update on table "public"."agent_chatx" to "service_role";

grant delete on table "public"."assessment" to "anon";

grant insert on table "public"."assessment" to "anon";

grant references on table "public"."assessment" to "anon";

grant select on table "public"."assessment" to "anon";

grant trigger on table "public"."assessment" to "anon";

grant truncate on table "public"."assessment" to "anon";

grant update on table "public"."assessment" to "anon";

grant delete on table "public"."assessment" to "authenticated";

grant insert on table "public"."assessment" to "authenticated";

grant references on table "public"."assessment" to "authenticated";

grant select on table "public"."assessment" to "authenticated";

grant trigger on table "public"."assessment" to "authenticated";

grant truncate on table "public"."assessment" to "authenticated";

grant update on table "public"."assessment" to "authenticated";

grant delete on table "public"."assessment" to "service_role";

grant insert on table "public"."assessment" to "service_role";

grant references on table "public"."assessment" to "service_role";

grant select on table "public"."assessment" to "service_role";

grant trigger on table "public"."assessment" to "service_role";

grant truncate on table "public"."assessment" to "service_role";

grant update on table "public"."assessment" to "service_role";

grant delete on table "public"."assessment_job_relation" to "anon";

grant insert on table "public"."assessment_job_relation" to "anon";

grant references on table "public"."assessment_job_relation" to "anon";

grant select on table "public"."assessment_job_relation" to "anon";

grant trigger on table "public"."assessment_job_relation" to "anon";

grant truncate on table "public"."assessment_job_relation" to "anon";

grant update on table "public"."assessment_job_relation" to "anon";

grant delete on table "public"."assessment_job_relation" to "authenticated";

grant insert on table "public"."assessment_job_relation" to "authenticated";

grant references on table "public"."assessment_job_relation" to "authenticated";

grant select on table "public"."assessment_job_relation" to "authenticated";

grant trigger on table "public"."assessment_job_relation" to "authenticated";

grant truncate on table "public"."assessment_job_relation" to "authenticated";

grant update on table "public"."assessment_job_relation" to "authenticated";

grant delete on table "public"."assessment_job_relation" to "service_role";

grant insert on table "public"."assessment_job_relation" to "service_role";

grant references on table "public"."assessment_job_relation" to "service_role";

grant select on table "public"."assessment_job_relation" to "service_role";

grant trigger on table "public"."assessment_job_relation" to "service_role";

grant truncate on table "public"."assessment_job_relation" to "service_role";

grant update on table "public"."assessment_job_relation" to "service_role";

grant delete on table "public"."assessment_question" to "anon";

grant insert on table "public"."assessment_question" to "anon";

grant references on table "public"."assessment_question" to "anon";

grant select on table "public"."assessment_question" to "anon";

grant trigger on table "public"."assessment_question" to "anon";

grant truncate on table "public"."assessment_question" to "anon";

grant update on table "public"."assessment_question" to "anon";

grant delete on table "public"."assessment_question" to "authenticated";

grant insert on table "public"."assessment_question" to "authenticated";

grant references on table "public"."assessment_question" to "authenticated";

grant select on table "public"."assessment_question" to "authenticated";

grant trigger on table "public"."assessment_question" to "authenticated";

grant truncate on table "public"."assessment_question" to "authenticated";

grant update on table "public"."assessment_question" to "authenticated";

grant delete on table "public"."assessment_question" to "service_role";

grant insert on table "public"."assessment_question" to "service_role";

grant references on table "public"."assessment_question" to "service_role";

grant select on table "public"."assessment_question" to "service_role";

grant trigger on table "public"."assessment_question" to "service_role";

grant truncate on table "public"."assessment_question" to "service_role";

grant update on table "public"."assessment_question" to "service_role";

grant delete on table "public"."assessment_template" to "anon";

grant insert on table "public"."assessment_template" to "anon";

grant references on table "public"."assessment_template" to "anon";

grant select on table "public"."assessment_template" to "anon";

grant trigger on table "public"."assessment_template" to "anon";

grant truncate on table "public"."assessment_template" to "anon";

grant update on table "public"."assessment_template" to "anon";

grant delete on table "public"."assessment_template" to "authenticated";

grant insert on table "public"."assessment_template" to "authenticated";

grant references on table "public"."assessment_template" to "authenticated";

grant select on table "public"."assessment_template" to "authenticated";

grant trigger on table "public"."assessment_template" to "authenticated";

grant truncate on table "public"."assessment_template" to "authenticated";

grant update on table "public"."assessment_template" to "authenticated";

grant delete on table "public"."assessment_template" to "service_role";

grant insert on table "public"."assessment_template" to "service_role";

grant references on table "public"."assessment_template" to "service_role";

grant select on table "public"."assessment_template" to "service_role";

grant trigger on table "public"."assessment_template" to "service_role";

grant truncate on table "public"."assessment_template" to "service_role";

grant update on table "public"."assessment_template" to "service_role";

grant delete on table "public"."candidate_phone_call" to "anon";

grant insert on table "public"."candidate_phone_call" to "anon";

grant references on table "public"."candidate_phone_call" to "anon";

grant select on table "public"."candidate_phone_call" to "anon";

grant trigger on table "public"."candidate_phone_call" to "anon";

grant truncate on table "public"."candidate_phone_call" to "anon";

grant update on table "public"."candidate_phone_call" to "anon";

grant delete on table "public"."candidate_phone_call" to "authenticated";

grant insert on table "public"."candidate_phone_call" to "authenticated";

grant references on table "public"."candidate_phone_call" to "authenticated";

grant select on table "public"."candidate_phone_call" to "authenticated";

grant trigger on table "public"."candidate_phone_call" to "authenticated";

grant truncate on table "public"."candidate_phone_call" to "authenticated";

grant update on table "public"."candidate_phone_call" to "authenticated";

grant delete on table "public"."candidate_phone_call" to "service_role";

grant insert on table "public"."candidate_phone_call" to "service_role";

grant references on table "public"."candidate_phone_call" to "service_role";

grant select on table "public"."candidate_phone_call" to "service_role";

grant trigger on table "public"."candidate_phone_call" to "service_role";

grant truncate on table "public"."candidate_phone_call" to "service_role";

grant update on table "public"."candidate_phone_call" to "service_role";

grant delete on table "public"."experience" to "anon";

grant insert on table "public"."experience" to "anon";

grant references on table "public"."experience" to "anon";

grant select on table "public"."experience" to "anon";

grant trigger on table "public"."experience" to "anon";

grant truncate on table "public"."experience" to "anon";

grant update on table "public"."experience" to "anon";

grant delete on table "public"."experience" to "authenticated";

grant insert on table "public"."experience" to "authenticated";

grant references on table "public"."experience" to "authenticated";

grant select on table "public"."experience" to "authenticated";

grant trigger on table "public"."experience" to "authenticated";

grant truncate on table "public"."experience" to "authenticated";

grant update on table "public"."experience" to "authenticated";

grant delete on table "public"."experience" to "service_role";

grant insert on table "public"."experience" to "service_role";

grant references on table "public"."experience" to "service_role";

grant select on table "public"."experience" to "service_role";

grant trigger on table "public"."experience" to "service_role";

grant truncate on table "public"."experience" to "service_role";

grant update on table "public"."experience" to "service_role";

grant delete on table "public"."interview_availabilties" to "anon";

grant insert on table "public"."interview_availabilties" to "anon";

grant references on table "public"."interview_availabilties" to "anon";

grant select on table "public"."interview_availabilties" to "anon";

grant trigger on table "public"."interview_availabilties" to "anon";

grant truncate on table "public"."interview_availabilties" to "anon";

grant update on table "public"."interview_availabilties" to "anon";

grant delete on table "public"."interview_availabilties" to "authenticated";

grant insert on table "public"."interview_availabilties" to "authenticated";

grant references on table "public"."interview_availabilties" to "authenticated";

grant select on table "public"."interview_availabilties" to "authenticated";

grant trigger on table "public"."interview_availabilties" to "authenticated";

grant truncate on table "public"."interview_availabilties" to "authenticated";

grant update on table "public"."interview_availabilties" to "authenticated";

grant delete on table "public"."interview_availabilties" to "service_role";

grant insert on table "public"."interview_availabilties" to "service_role";

grant references on table "public"."interview_availabilties" to "service_role";

grant select on table "public"."interview_availabilties" to "service_role";

grant trigger on table "public"."interview_availabilties" to "service_role";

grant truncate on table "public"."interview_availabilties" to "service_role";

grant update on table "public"."interview_availabilties" to "service_role";

grant delete on table "public"."interview_meeting" to "anon";

grant insert on table "public"."interview_meeting" to "anon";

grant references on table "public"."interview_meeting" to "anon";

grant select on table "public"."interview_meeting" to "anon";

grant trigger on table "public"."interview_meeting" to "anon";

grant truncate on table "public"."interview_meeting" to "anon";

grant update on table "public"."interview_meeting" to "anon";

grant delete on table "public"."interview_meeting" to "authenticated";

grant insert on table "public"."interview_meeting" to "authenticated";

grant references on table "public"."interview_meeting" to "authenticated";

grant select on table "public"."interview_meeting" to "authenticated";

grant trigger on table "public"."interview_meeting" to "authenticated";

grant truncate on table "public"."interview_meeting" to "authenticated";

grant update on table "public"."interview_meeting" to "authenticated";

grant delete on table "public"."interview_meeting" to "service_role";

grant insert on table "public"."interview_meeting" to "service_role";

grant references on table "public"."interview_meeting" to "service_role";

grant select on table "public"."interview_meeting" to "service_role";

grant trigger on table "public"."interview_meeting" to "service_role";

grant truncate on table "public"."interview_meeting" to "service_role";

grant update on table "public"."interview_meeting" to "service_role";

grant delete on table "public"."interview_meeting_user" to "anon";

grant insert on table "public"."interview_meeting_user" to "anon";

grant references on table "public"."interview_meeting_user" to "anon";

grant select on table "public"."interview_meeting_user" to "anon";

grant trigger on table "public"."interview_meeting_user" to "anon";

grant truncate on table "public"."interview_meeting_user" to "anon";

grant update on table "public"."interview_meeting_user" to "anon";

grant delete on table "public"."interview_meeting_user" to "authenticated";

grant insert on table "public"."interview_meeting_user" to "authenticated";

grant references on table "public"."interview_meeting_user" to "authenticated";

grant select on table "public"."interview_meeting_user" to "authenticated";

grant trigger on table "public"."interview_meeting_user" to "authenticated";

grant truncate on table "public"."interview_meeting_user" to "authenticated";

grant update on table "public"."interview_meeting_user" to "authenticated";

grant delete on table "public"."interview_meeting_user" to "service_role";

grant insert on table "public"."interview_meeting_user" to "service_role";

grant references on table "public"."interview_meeting_user" to "service_role";

grant select on table "public"."interview_meeting_user" to "service_role";

grant trigger on table "public"."interview_meeting_user" to "service_role";

grant truncate on table "public"."interview_meeting_user" to "service_role";

grant update on table "public"."interview_meeting_user" to "service_role";

grant delete on table "public"."interview_module" to "anon";

grant insert on table "public"."interview_module" to "anon";

grant references on table "public"."interview_module" to "anon";

grant select on table "public"."interview_module" to "anon";

grant trigger on table "public"."interview_module" to "anon";

grant truncate on table "public"."interview_module" to "anon";

grant update on table "public"."interview_module" to "anon";

grant delete on table "public"."interview_module" to "authenticated";

grant insert on table "public"."interview_module" to "authenticated";

grant references on table "public"."interview_module" to "authenticated";

grant select on table "public"."interview_module" to "authenticated";

grant trigger on table "public"."interview_module" to "authenticated";

grant truncate on table "public"."interview_module" to "authenticated";

grant update on table "public"."interview_module" to "authenticated";

grant delete on table "public"."interview_module" to "service_role";

grant insert on table "public"."interview_module" to "service_role";

grant references on table "public"."interview_module" to "service_role";

grant select on table "public"."interview_module" to "service_role";

grant trigger on table "public"."interview_module" to "service_role";

grant truncate on table "public"."interview_module" to "service_role";

grant update on table "public"."interview_module" to "service_role";

grant delete on table "public"."interview_module_relation" to "anon";

grant insert on table "public"."interview_module_relation" to "anon";

grant references on table "public"."interview_module_relation" to "anon";

grant select on table "public"."interview_module_relation" to "anon";

grant trigger on table "public"."interview_module_relation" to "anon";

grant truncate on table "public"."interview_module_relation" to "anon";

grant update on table "public"."interview_module_relation" to "anon";

grant delete on table "public"."interview_module_relation" to "authenticated";

grant insert on table "public"."interview_module_relation" to "authenticated";

grant references on table "public"."interview_module_relation" to "authenticated";

grant select on table "public"."interview_module_relation" to "authenticated";

grant trigger on table "public"."interview_module_relation" to "authenticated";

grant truncate on table "public"."interview_module_relation" to "authenticated";

grant update on table "public"."interview_module_relation" to "authenticated";

grant delete on table "public"."interview_module_relation" to "service_role";

grant insert on table "public"."interview_module_relation" to "service_role";

grant references on table "public"."interview_module_relation" to "service_role";

grant select on table "public"."interview_module_relation" to "service_role";

grant trigger on table "public"."interview_module_relation" to "service_role";

grant truncate on table "public"."interview_module_relation" to "service_role";

grant update on table "public"."interview_module_relation" to "service_role";

grant delete on table "public"."interview_schedule" to "anon";

grant insert on table "public"."interview_schedule" to "anon";

grant references on table "public"."interview_schedule" to "anon";

grant select on table "public"."interview_schedule" to "anon";

grant trigger on table "public"."interview_schedule" to "anon";

grant truncate on table "public"."interview_schedule" to "anon";

grant update on table "public"."interview_schedule" to "anon";

grant delete on table "public"."interview_schedule" to "authenticated";

grant insert on table "public"."interview_schedule" to "authenticated";

grant references on table "public"."interview_schedule" to "authenticated";

grant select on table "public"."interview_schedule" to "authenticated";

grant trigger on table "public"."interview_schedule" to "authenticated";

grant truncate on table "public"."interview_schedule" to "authenticated";

grant update on table "public"."interview_schedule" to "authenticated";

grant delete on table "public"."interview_schedule" to "service_role";

grant insert on table "public"."interview_schedule" to "service_role";

grant references on table "public"."interview_schedule" to "service_role";

grant select on table "public"."interview_schedule" to "service_role";

grant trigger on table "public"."interview_schedule" to "service_role";

grant truncate on table "public"."interview_schedule" to "service_role";

grant update on table "public"."interview_schedule" to "service_role";

grant delete on table "public"."jobs" to "anon";

grant insert on table "public"."jobs" to "anon";

grant references on table "public"."jobs" to "anon";

grant select on table "public"."jobs" to "anon";

grant trigger on table "public"."jobs" to "anon";

grant truncate on table "public"."jobs" to "anon";

grant update on table "public"."jobs" to "anon";

grant delete on table "public"."jobs" to "authenticated";

grant insert on table "public"."jobs" to "authenticated";

grant references on table "public"."jobs" to "authenticated";

grant select on table "public"."jobs" to "authenticated";

grant trigger on table "public"."jobs" to "authenticated";

grant truncate on table "public"."jobs" to "authenticated";

grant update on table "public"."jobs" to "authenticated";

grant delete on table "public"."jobs" to "service_role";

grant insert on table "public"."jobs" to "service_role";

grant references on table "public"."jobs" to "service_role";

grant select on table "public"."jobs" to "service_role";

grant trigger on table "public"."jobs" to "service_role";

grant truncate on table "public"."jobs" to "service_role";

grant update on table "public"."jobs" to "service_role";

grant delete on table "public"."question_bank" to "anon";

grant insert on table "public"."question_bank" to "anon";

grant references on table "public"."question_bank" to "anon";

grant select on table "public"."question_bank" to "anon";

grant trigger on table "public"."question_bank" to "anon";

grant truncate on table "public"."question_bank" to "anon";

grant update on table "public"."question_bank" to "anon";

grant delete on table "public"."question_bank" to "authenticated";

grant insert on table "public"."question_bank" to "authenticated";

grant references on table "public"."question_bank" to "authenticated";

grant select on table "public"."question_bank" to "authenticated";

grant trigger on table "public"."question_bank" to "authenticated";

grant truncate on table "public"."question_bank" to "authenticated";

grant update on table "public"."question_bank" to "authenticated";

grant delete on table "public"."question_bank" to "service_role";

grant insert on table "public"."question_bank" to "service_role";

grant references on table "public"."question_bank" to "service_role";

grant select on table "public"."question_bank" to "service_role";

grant trigger on table "public"."question_bank" to "service_role";

grant truncate on table "public"."question_bank" to "service_role";

grant update on table "public"."question_bank" to "service_role";

grant delete on table "public"."request_integration_tool" to "anon";

grant insert on table "public"."request_integration_tool" to "anon";

grant references on table "public"."request_integration_tool" to "anon";

grant select on table "public"."request_integration_tool" to "anon";

grant trigger on table "public"."request_integration_tool" to "anon";

grant truncate on table "public"."request_integration_tool" to "anon";

grant update on table "public"."request_integration_tool" to "anon";

grant delete on table "public"."request_integration_tool" to "authenticated";

grant insert on table "public"."request_integration_tool" to "authenticated";

grant references on table "public"."request_integration_tool" to "authenticated";

grant select on table "public"."request_integration_tool" to "authenticated";

grant trigger on table "public"."request_integration_tool" to "authenticated";

grant truncate on table "public"."request_integration_tool" to "authenticated";

grant update on table "public"."request_integration_tool" to "authenticated";

grant delete on table "public"."request_integration_tool" to "service_role";

grant insert on table "public"."request_integration_tool" to "service_role";

grant references on table "public"."request_integration_tool" to "service_role";

grant select on table "public"."request_integration_tool" to "service_role";

grant trigger on table "public"."request_integration_tool" to "service_role";

grant truncate on table "public"."request_integration_tool" to "service_role";

grant update on table "public"."request_integration_tool" to "service_role";

grant delete on table "public"."scheduling-agent-chat-history" to "anon";

grant insert on table "public"."scheduling-agent-chat-history" to "anon";

grant references on table "public"."scheduling-agent-chat-history" to "anon";

grant select on table "public"."scheduling-agent-chat-history" to "anon";

grant trigger on table "public"."scheduling-agent-chat-history" to "anon";

grant truncate on table "public"."scheduling-agent-chat-history" to "anon";

grant update on table "public"."scheduling-agent-chat-history" to "anon";

grant delete on table "public"."scheduling-agent-chat-history" to "authenticated";

grant insert on table "public"."scheduling-agent-chat-history" to "authenticated";

grant references on table "public"."scheduling-agent-chat-history" to "authenticated";

grant select on table "public"."scheduling-agent-chat-history" to "authenticated";

grant trigger on table "public"."scheduling-agent-chat-history" to "authenticated";

grant truncate on table "public"."scheduling-agent-chat-history" to "authenticated";

grant update on table "public"."scheduling-agent-chat-history" to "authenticated";

grant delete on table "public"."scheduling-agent-chat-history" to "service_role";

grant insert on table "public"."scheduling-agent-chat-history" to "service_role";

grant references on table "public"."scheduling-agent-chat-history" to "service_role";

grant select on table "public"."scheduling-agent-chat-history" to "service_role";

grant trigger on table "public"."scheduling-agent-chat-history" to "service_role";

grant truncate on table "public"."scheduling-agent-chat-history" to "service_role";

grant update on table "public"."scheduling-agent-chat-history" to "service_role";

grant delete on table "public"."screening_answers" to "anon";

grant insert on table "public"."screening_answers" to "anon";

grant references on table "public"."screening_answers" to "anon";

grant select on table "public"."screening_answers" to "anon";

grant trigger on table "public"."screening_answers" to "anon";

grant truncate on table "public"."screening_answers" to "anon";

grant update on table "public"."screening_answers" to "anon";

grant delete on table "public"."screening_answers" to "authenticated";

grant insert on table "public"."screening_answers" to "authenticated";

grant references on table "public"."screening_answers" to "authenticated";

grant select on table "public"."screening_answers" to "authenticated";

grant trigger on table "public"."screening_answers" to "authenticated";

grant truncate on table "public"."screening_answers" to "authenticated";

grant update on table "public"."screening_answers" to "authenticated";

grant delete on table "public"."screening_answers" to "service_role";

grant insert on table "public"."screening_answers" to "service_role";

grant references on table "public"."screening_answers" to "service_role";

grant select on table "public"."screening_answers" to "service_role";

grant trigger on table "public"."screening_answers" to "service_role";

grant truncate on table "public"."screening_answers" to "service_role";

grant update on table "public"."screening_answers" to "service_role";

grant delete on table "public"."screening_questions" to "anon";

grant insert on table "public"."screening_questions" to "anon";

grant references on table "public"."screening_questions" to "anon";

grant select on table "public"."screening_questions" to "anon";

grant trigger on table "public"."screening_questions" to "anon";

grant truncate on table "public"."screening_questions" to "anon";

grant update on table "public"."screening_questions" to "anon";

grant delete on table "public"."screening_questions" to "authenticated";

grant insert on table "public"."screening_questions" to "authenticated";

grant references on table "public"."screening_questions" to "authenticated";

grant select on table "public"."screening_questions" to "authenticated";

grant trigger on table "public"."screening_questions" to "authenticated";

grant truncate on table "public"."screening_questions" to "authenticated";

grant update on table "public"."screening_questions" to "authenticated";

grant delete on table "public"."screening_questions" to "service_role";

grant insert on table "public"."screening_questions" to "service_role";

grant references on table "public"."screening_questions" to "service_role";

grant select on table "public"."screening_questions" to "service_role";

grant trigger on table "public"."screening_questions" to "service_role";

grant truncate on table "public"."screening_questions" to "service_role";

grant update on table "public"."screening_questions" to "service_role";

grant delete on table "public"."sections" to "anon";

grant insert on table "public"."sections" to "anon";

grant references on table "public"."sections" to "anon";

grant select on table "public"."sections" to "anon";

grant trigger on table "public"."sections" to "anon";

grant truncate on table "public"."sections" to "anon";

grant update on table "public"."sections" to "anon";

grant delete on table "public"."sections" to "authenticated";

grant insert on table "public"."sections" to "authenticated";

grant references on table "public"."sections" to "authenticated";

grant select on table "public"."sections" to "authenticated";

grant trigger on table "public"."sections" to "authenticated";

grant truncate on table "public"."sections" to "authenticated";

grant update on table "public"."sections" to "authenticated";

grant delete on table "public"."sections" to "service_role";

grant insert on table "public"."sections" to "service_role";

grant references on table "public"."sections" to "service_role";

grant select on table "public"."sections" to "service_role";

grant trigger on table "public"."sections" to "service_role";

grant truncate on table "public"."sections" to "service_role";

grant update on table "public"."sections" to "service_role";

grant delete on table "public"."state_json" to "anon";

grant insert on table "public"."state_json" to "anon";

grant references on table "public"."state_json" to "anon";

grant select on table "public"."state_json" to "anon";

grant trigger on table "public"."state_json" to "anon";

grant truncate on table "public"."state_json" to "anon";

grant update on table "public"."state_json" to "anon";

grant delete on table "public"."state_json" to "authenticated";

grant insert on table "public"."state_json" to "authenticated";

grant references on table "public"."state_json" to "authenticated";

grant select on table "public"."state_json" to "authenticated";

grant trigger on table "public"."state_json" to "authenticated";

grant truncate on table "public"."state_json" to "authenticated";

grant update on table "public"."state_json" to "authenticated";

grant delete on table "public"."state_json" to "service_role";

grant insert on table "public"."state_json" to "service_role";

grant references on table "public"."state_json" to "service_role";

grant select on table "public"."state_json" to "service_role";

grant trigger on table "public"."state_json" to "service_role";

grant truncate on table "public"."state_json" to "service_role";

grant update on table "public"."state_json" to "service_role";

grant delete on table "public"."template_question_relation" to "anon";

grant insert on table "public"."template_question_relation" to "anon";

grant references on table "public"."template_question_relation" to "anon";

grant select on table "public"."template_question_relation" to "anon";

grant trigger on table "public"."template_question_relation" to "anon";

grant truncate on table "public"."template_question_relation" to "anon";

grant update on table "public"."template_question_relation" to "anon";

grant delete on table "public"."template_question_relation" to "authenticated";

grant insert on table "public"."template_question_relation" to "authenticated";

grant references on table "public"."template_question_relation" to "authenticated";

grant select on table "public"."template_question_relation" to "authenticated";

grant trigger on table "public"."template_question_relation" to "authenticated";

grant truncate on table "public"."template_question_relation" to "authenticated";

grant update on table "public"."template_question_relation" to "authenticated";

grant delete on table "public"."template_question_relation" to "service_role";

grant insert on table "public"."template_question_relation" to "service_role";

grant references on table "public"."template_question_relation" to "service_role";

grant select on table "public"."template_question_relation" to "service_role";

grant trigger on table "public"."template_question_relation" to "service_role";

grant truncate on table "public"."template_question_relation" to "service_role";

grant update on table "public"."template_question_relation" to "service_role";

create policy "admin can create and update all user can fetch company data"
on "public"."recruiter"
as permissive
for all
to authenticated
using ((id IN ( SELECT recruiter_relation.recruiter_id
   FROM recruiter_relation
  WHERE (recruiter_relation.user_id = auth.uid()))))
with check ((EXISTS ( SELECT 1
   FROM recruiter_user
  WHERE ((recruiter_user.user_id = auth.uid()) AND (recruiter_user.role = 'admin'::user_roles)))));


create policy "anon_read_only"
on "public"."public_jobs"
as permissive
for select
to anon
using ((status = 'published'::public_job_status));


create policy "autenticated_write_only"
on "public"."recruiter_relation"
as permissive
for all
to authenticated
using (true)
with check (false);


create policy "authenticated_access_only"
on "public"."recruiter_user"
as permissive
for all
to authenticated
using ((user_id IN ( SELECT recruiter_relation.user_id
   FROM recruiter_relation
  WHERE (recruiter_relation.recruiter_id = ( SELECT recruiter_relation_1.recruiter_id
           FROM recruiter_relation recruiter_relation_1
          WHERE (recruiter_relation_1.user_id = auth.uid()))))))
with check (((user_id = auth.uid()) OR ((user_id IN ( SELECT recruiter_relation.user_id
   FROM recruiter_relation
  WHERE (recruiter_relation.recruiter_id = ( SELECT recruiter_relation_1.recruiter_id
           FROM recruiter_relation recruiter_relation_1
          WHERE (recruiter_relation_1.user_id = auth.uid()))))) AND ((role = 'recruiter'::user_roles) OR (role = 'interviewer'::user_roles) OR (role = 'scheduler'::user_roles)))));



