create type "public"."application_logs_type" as enum ('standard', 'schedule', 'interview');

create type "public"."employment_type_enum" as enum ('fulltime', 'parttime', 'contractor');

create type "public"."progress_type" as enum ('standard', 'interview_schedule', 'email_messages', 'call_completed');

create type "public"."session_type" as enum ('panel', 'individual', 'debrief');

create type "public"."sub_task_status" as enum ('completed', 'pending', 'in_progress', 'failed', 'closed');

create type "public"."task_agent_type" as enum ('phone', 'email', 'job');

create type "public"."task_priority" as enum ('high', 'low', 'medium');

create type "public"."task_status" as enum ('pending', 'in_progress', 'completed', 'closed', 'not_started', 'scheduled', 'cancelled');

create type "public"."task_type_enum" as enum ('schedule', 'training', 'empty');

revoke delete on table "public"."interview_availabilties" from "anon";

revoke insert on table "public"."interview_availabilties" from "anon";

revoke references on table "public"."interview_availabilties" from "anon";

revoke select on table "public"."interview_availabilties" from "anon";

revoke trigger on table "public"."interview_availabilties" from "anon";

revoke truncate on table "public"."interview_availabilties" from "anon";

revoke update on table "public"."interview_availabilties" from "anon";

revoke delete on table "public"."interview_availabilties" from "authenticated";

revoke insert on table "public"."interview_availabilties" from "authenticated";

revoke references on table "public"."interview_availabilties" from "authenticated";

revoke select on table "public"."interview_availabilties" from "authenticated";

revoke trigger on table "public"."interview_availabilties" from "authenticated";

revoke truncate on table "public"."interview_availabilties" from "authenticated";

revoke update on table "public"."interview_availabilties" from "authenticated";

revoke delete on table "public"."interview_availabilties" from "service_role";

revoke insert on table "public"."interview_availabilties" from "service_role";

revoke references on table "public"."interview_availabilties" from "service_role";

revoke select on table "public"."interview_availabilties" from "service_role";

revoke trigger on table "public"."interview_availabilties" from "service_role";

revoke truncate on table "public"."interview_availabilties" from "service_role";

revoke update on table "public"."interview_availabilties" from "service_role";

revoke delete on table "public"."interview_meeting_user" from "anon";

revoke insert on table "public"."interview_meeting_user" from "anon";

revoke references on table "public"."interview_meeting_user" from "anon";

revoke select on table "public"."interview_meeting_user" from "anon";

revoke trigger on table "public"."interview_meeting_user" from "anon";

revoke truncate on table "public"."interview_meeting_user" from "anon";

revoke update on table "public"."interview_meeting_user" from "anon";

revoke delete on table "public"."interview_meeting_user" from "authenticated";

revoke insert on table "public"."interview_meeting_user" from "authenticated";

revoke references on table "public"."interview_meeting_user" from "authenticated";

revoke select on table "public"."interview_meeting_user" from "authenticated";

revoke trigger on table "public"."interview_meeting_user" from "authenticated";

revoke truncate on table "public"."interview_meeting_user" from "authenticated";

revoke update on table "public"."interview_meeting_user" from "authenticated";

revoke delete on table "public"."interview_meeting_user" from "service_role";

revoke insert on table "public"."interview_meeting_user" from "service_role";

revoke references on table "public"."interview_meeting_user" from "service_role";

revoke select on table "public"."interview_meeting_user" from "service_role";

revoke trigger on table "public"."interview_meeting_user" from "service_role";

revoke truncate on table "public"."interview_meeting_user" from "service_role";

revoke update on table "public"."interview_meeting_user" from "service_role";

revoke delete on table "public"."jobs" from "anon";

revoke insert on table "public"."jobs" from "anon";

revoke references on table "public"."jobs" from "anon";

revoke select on table "public"."jobs" from "anon";

revoke trigger on table "public"."jobs" from "anon";

revoke truncate on table "public"."jobs" from "anon";

revoke update on table "public"."jobs" from "anon";

revoke delete on table "public"."jobs" from "authenticated";

revoke insert on table "public"."jobs" from "authenticated";

revoke references on table "public"."jobs" from "authenticated";

revoke select on table "public"."jobs" from "authenticated";

revoke trigger on table "public"."jobs" from "authenticated";

revoke truncate on table "public"."jobs" from "authenticated";

revoke update on table "public"."jobs" from "authenticated";

revoke delete on table "public"."jobs" from "service_role";

revoke insert on table "public"."jobs" from "service_role";

revoke references on table "public"."jobs" from "service_role";

revoke select on table "public"."jobs" from "service_role";

revoke trigger on table "public"."jobs" from "service_role";

revoke truncate on table "public"."jobs" from "service_role";

revoke update on table "public"."jobs" from "service_role";

alter table "public"."interview_availabilties" drop constraint "interview_availabilties_user_id_fkey";

alter table "public"."interview_meeting" drop constraint "public_interview_meeting_module_id_fkey";

alter table "public"."interview_meeting_user" drop constraint "public_interview_meeting_user_interview_meeting_id_fkey";

alter table "public"."interview_meeting_user" drop constraint "public_interview_meeting_user_interviewer_id_fkey";

alter table "public"."interview_module_relation" drop constraint "interview_panel_relation_user_id_fkey";

alter table "public"."scheduling-agent-chat-history" drop constraint "public_scheduling-agent-chat-history_schedule_id_fkey";

alter table "public"."screening_answers" drop constraint "public_screening_answers_id_fkey";

alter table "public"."candidate_phone_call" drop constraint "public_candidate_phone_call_applicant_id_fkey";

alter table "public"."interview_schedule" drop constraint "public_interview_schedule_coordinator_id_fkey";

drop function if exists "public"."fetch_interview_data"(rec_id uuid, text_search_filter text, status_filter text[], job_id_filter uuid[], sch_type text[], date_range_filter tsrange, sort_by text, page_number integer);

drop function if exists "public"."get_interview_data_count"(rec_id uuid, text_search_filter text, status_filter text[], job_id_filter uuid[], sch_type text[], date_range_filter tsrange);

drop function if exists "public"."update_interview_schedule_status"();

drop function if exists "public"."get_interview_schedule_by_job_id"(target_job_id uuid);

drop function if exists "public"."get_interview_schedule_by_meeting_id"(target_meeting_id uuid);

drop function if exists "public"."get_interview_schedule_by_module_id"(target_module_id uuid);

drop function if exists "public"."get_interview_schedule_by_user_id"(target_user_id uuid);

drop function if exists "public"."getjob"(jobid uuid);

drop function if exists "public"."getjobs"(recruiterid uuid);

drop function if exists "public"."job_application_filter_sort"(jb_id uuid, min_lat double precision, min_long double precision, max_lat double precision, max_long double precision, j_status text, from_rec_num numeric, end_rec_num numeric, min_resume_score numeric, max_resume_score numeric, min_interview_score numeric, max_interview_score numeric, sort_column_text text, is_sort_desc boolean, text_search_qry text, sort_by_schedule text, is_locat_filter_on boolean);

alter table "public"."interview_availabilties" drop constraint "interview_availabilties_pkey";

alter table "public"."interview_meeting_user" drop constraint "interview_meeting_user_pkey";

drop index if exists "public"."interview_availabilties_pkey";

drop index if exists "public"."interview_meeting_user_pkey";

drop table "public"."interview_availabilties";

drop table "public"."interview_meeting_user";

drop table "public"."jobs";

--== manual fix ==--
alter table "public"."interview_meeting" drop column "status";
alter table "public"."interview_schedule" drop column "status";

-- alter type "public"."interview_schedule_status" rename to "interview_schedule_status__old_version_to_be_dropped"; -- not req

drop type "public"."interview_schedule_status";
create type "public"."interview_schedule_status" as enum ('waiting', 'confirmed', 'completed', 'cancelled', 'reschedule', 'not_scheduled');
alter table "public"."interview_meeting" add column "status" interview_schedule_status not null default 'confirmed'::interview_schedule_status;
--== fix end ==--

create table "public"."application_logs" (
    "created_at" timestamp with time zone not null default now(),
    "title" text,
    "logger" uuid not null,
    "type" application_logs_type not null default 'standard'::application_logs_type,
    "task_id" uuid,
    "description" text,
    "application_id" uuid not null,
    "id" uuid not null default gen_random_uuid(),
    "created_by" uuid
);


create table "public"."function_url" (
    "value" text
);


create table "public"."interview_filter_json" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "filter_json" jsonb not null,
    "schedule_id" uuid default gen_random_uuid(),
    "session_ids" uuid[] not null default '{}'::uuid[],
    "created_by" uuid default auth.uid()
);


create table "public"."interview_plan" (
    "created_at" timestamp with time zone not null default now(),
    "coordinator_id" uuid default auth.uid(),
    "id" uuid not null default gen_random_uuid(),
    "job_id" uuid not null
);


create table "public"."interview_schedule_activity" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "schedule_id" uuid not null,
    "title" text not null,
    "filter_id" uuid,
    "application_id" uuid,
    "user_id" uuid
);


create table "public"."interview_session" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "module_id" uuid,
    "interview_plan_id" uuid,
    "session_order" numeric not null default '1'::numeric,
    "session_duration" numeric not null default '30'::numeric,
    "break_duration" numeric default '0'::numeric,
    "interviewer_cnt" numeric default '1'::numeric,
    "session_type" session_type not null default 'panel'::session_type,
    "location" text,
    "schedule_type" interview_schedule_type not null default 'google_meet'::interview_schedule_type,
    "name" text,
    "meeting_id" uuid
);


create table "public"."interview_session_relation" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null,
    "interviewer_type" status_training not null default 'qualified'::status_training,
    "interview_module_relation_id" uuid,
    "training_type" interviewer_type,
    "user_id" uuid,
    "is_confirmed" boolean not null default false,
    "feedback" jsonb
);


create table "public"."interviewer_feedback" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null default gen_random_uuid(),
    "interviewer_id" uuid default gen_random_uuid(),
    "feedback" text
);


alter table "public"."interviewer_feedback" enable row level security;

create table "public"."new_tasks" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "due_date" timestamp with time zone,
    "assignee" uuid[] not null,
    "start_date" timestamp with time zone default now(),
    "session_ids" jsonb[],
    "application_id" uuid,
    "recruiter_id" uuid,
    "schedule_date_range" jsonb,
    "created_by" uuid not null,
    "type" task_type_enum,
    "status" task_status not null default 'not_started'::task_status,
    "agent" task_agent_type,
    "task_triggered" boolean default false,
    "filter_id" uuid,
    "priority" task_priority not null default 'medium'::task_priority
);


create table "public"."new_tasks_progress" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "created_by" jsonb not null,
    "progress_type" progress_type not null default 'standard'::progress_type,
    "jsonb_data" jsonb,
    "task_id" uuid not null
);


create table "public"."phone_call_logs" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "error_log" jsonb,
    "phone_call_id" uuid default gen_random_uuid(),
    "applicant_id" uuid default gen_random_uuid()
);


alter table "public"."phone_call_logs" enable row level security;

create table "public"."sub_task_progress" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "created_by" jsonb not null,
    "progress_type" progress_type not null default 'standard'::progress_type,
    "jsonb_data" jsonb,
    "sub_task_id" uuid not null
);


create table "public"."sub_tasks" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "completion_date" timestamp with time zone,
    "task_id" uuid not null,
    "status" sub_task_status not null default 'pending'::sub_task_status,
    "assignee" uuid[] not null,
    "agent" task_agent_type,
    "start_date" timestamp with time zone default now(),
    "session_ids" jsonb[]
);


create table "public"."tasks" (
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid not null,
    "name" text not null,
    "status" task_status not null default 'pending'::task_status,
    "id" uuid not null default gen_random_uuid(),
    "application_id" uuid,
    "interviewer_Id" uuid,
    "created_by" jsonb not null default '{"id": null, "name": "system"}'::jsonb
);


-- alter table "public"."interview_meeting" alter column status type "public"."interview_schedule_status" using status::text::"public"."interview_schedule_status";

alter table "public"."applications" add column "converted_at" timestamp with time zone;

alter table "public"."candidate_phone_call" add column "sub_task_id" uuid;

alter table "public"."candidate_phone_call" add column "transcript" jsonb[];

alter table "public"."interview_meeting" drop column "break_time";

alter table "public"."interview_meeting" drop column "duration";

alter table "public"."interview_meeting" drop column "module_id";

alter table "public"."interview_meeting" add column "confirmed_date" timestamp with time zone;

alter table "public"."interview_meeting" add column "instructions" text;

alter table "public"."interview_meeting" add column "meeting_link" text;

alter table "public"."interview_meeting" alter column "end_time" drop not null;

alter table "public"."interview_meeting" alter column "end_time" set data type timestamp with time zone using "end_time"::timestamp with time zone;

alter table "public"."interview_meeting" alter column "start_time" drop not null;

alter table "public"."interview_meeting" alter column "start_time" set data type timestamp with time zone using "start_time"::timestamp with time zone;

alter table "public"."interview_module" add column "created_by" uuid default auth.uid();

alter table "public"."interview_module" add column "department" text;

alter table "public"."interview_module" add column "instructions" text;

alter table "public"."interview_module" add column "is_archived" boolean not null default false;

alter table "public"."interview_schedule" drop column "completion_time";

alter table "public"."interview_schedule" drop column "confirmed_option";

alter table "public"."interview_schedule" drop column "filter_json";

alter table "public"."interview_schedule" drop column "interview_plan";

alter table "public"."interview_schedule" drop column "meeting_json";

alter table "public"."interview_schedule" drop column "resend_invite";

alter table "public"."interview_schedule" drop column "schedule_type";

alter table "public"."interview_schedule" add column "is_completed" boolean not null default false;

alter table "public"."interview_schedule" add column "is_get_more_option" boolean not null default false;

alter table "public"."interview_schedule" add column "recruiter_id" uuid not null;

alter table "public"."public_jobs" alter column "email_template" set default '{"interview": {"body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''''re pleased to announce that you''''ve been selected for an assessment.</p><p>You''''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''''ve Been Selected for an Assessment with [companyName]", "fromName": "aglint"}, "rejection": {"body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "aglint"}, "phone_screening": {"body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "aglint"}, "interview_resend": {"body": "<p>Dear [firstName],</p><p>We noticed that you haven''''t given your assessment for the [jobTitle] position at [companyName]. Don''''t miss this opportunity!</p><p>You''''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "aglint"}, "application_received": {"body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "aglint"}, "phone_screening_resend": {"body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "aglint"}}'::jsonb;

alter table "public"."recruiter" add column "google_workspace_domain" text;

alter table "public"."recruiter" add column "zoom_auth" text;

alter table "public"."recruiter" alter column "email_template" set default '{"interview": {"body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''''re pleased to announce that you''''ve been selected for an assessment.</p><p>You''''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''''ve Been Selected for an Assessment with [companyName]", "fromName": "[companyName]"}, "rejection": {"body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "[companyName]"}, "phone_screening": {"body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "[companyName]"}, "interview_resend": {"body": "<p>Dear [firstName],</p><p>We noticed that you haven''''t given your assessment for the [jobTitle] position at [companyName]. Don''''t miss this opportunity!</p><p>You''''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "[companyName]"}, "application_received": {"body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "[companyName]"}, "phone_screening_resend": {"body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "[companyName]"}, "debrief_calendar_invite": {"body": "<p>Dear [teamMemberName],</p><p>Please join the debrief session to discuss [firstName]''s interview for [jobTitle]. Your insights are valuable to the selection process.</p><p>Cheers,</p><p>[companyName] Recruitment Team</p>", "default": true, "subject": "Interview Debrief for [firstName]", "fromName": "[companyName]"}, "candidate_invite_confirmation": {"body": "<p>Dear [firstName],</p><p>We are pleased to confirm your interview for the [jobTitle] position . Please find the details of your interview below.</p><p>[viewDetailsLink]<p/><p>Regards,</p><p>[companyName] Recruitment Team</p>", "default": true, "subject": "Confirmation: Interview Scheduled at [companyName]", "fromName": "[companyName]"}, "candidate_availability_request": {"body": "<p>You have selected for the Interview at [companyName]</p><p>Hi [firstName], Choose a time slot that suits you best and take the first step towards joining our team. We look forward to meeting you!</p><h4>[scheduleName]</h4><p>[pickYourSlotLink]</p><p>Best regards,</p><p>[companyName] Recruitment Team</p>", "default": true, "subject": "You have been selected for the interview at [companyName]", "fromName": "[companyName]"}}'::jsonb;

alter table "public"."recruiter" alter column "scheduling_settings" set default '{"timeZone": {"utc": "-08:00", "name": "(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle", "label": "America/Los_Angeles (GMT-08:00)", "tzCode": "America/Los_Angeles"}, "break_hour": {"end_time": "13:30", "start_time": "13:00"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "Juneteenth National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Hours", "value": 4}, "weeklyLimit": {"type": "Hours", "value": 20}}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "SoftConflicts": ["Daily Standup", "Sync Up", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"]}, "isAutomaticTimeZone": false}'::jsonb;

alter table "public"."recruiter_user" add column "employment" employment_type_enum not null default 'fulltime'::employment_type_enum;

alter table "public"."recruiter_user" add column "is_suspended" boolean not null default false;

alter table "public"."recruiter_user" alter column "scheduling_settings" set default '{"timeZone": {"utc": "-08:00", "name": "(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle", "label": "America/Los_Angeles (GMT-08:00)", "tzCode": "America/Los_Angeles"}, "break_hour": {"break_at": "13:00", "break_time": "60"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "Juneteenth National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Hours", "value": 4}, "weeklyLimit": {"type": "Hours", "value": 20}}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "SoftConflicts": ["Daily Standup", "Sync Up", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"]}, "isAutomaticTimeZone": false}'::jsonb;

alter table "public"."scheduling-agent-chat-history" drop column "date_range";

alter table "public"."scheduling-agent-chat-history" drop column "schedule_id";

alter table "public"."scheduling-agent-chat-history" drop column "scheduling_progress";

alter table "public"."scheduling-agent-chat-history" add column "filter_json_id" uuid;

alter table "public"."scheduling-agent-chat-history" add column "task_id" uuid;

alter table "public"."scheduling-agent-chat-history" add column "time_zone" text;

CREATE UNIQUE INDEX application_logs_pkey ON public.application_logs USING btree (id);

CREATE UNIQUE INDEX interview_filter_json_pkey ON public.interview_filter_json USING btree (id);

CREATE UNIQUE INDEX interview_plan_job_id_key ON public.interview_plan USING btree (job_id);

CREATE UNIQUE INDEX interview_plan_pkey ON public.interview_plan USING btree (id);

CREATE UNIQUE INDEX interview_session_pkey ON public.interview_session USING btree (id);

CREATE UNIQUE INDEX interviewer_feedback_pkey ON public.interviewer_feedback USING btree (id);

CREATE UNIQUE INDEX inteview_session_relation_pkey ON public.interview_session_relation USING btree (id);

CREATE UNIQUE INDEX new_tasks_pkey ON public.new_tasks USING btree (id);

CREATE UNIQUE INDEX new_tasks_progress_pkey ON public.new_tasks_progress USING btree (id);

CREATE UNIQUE INDEX phone_call_logs_pkey ON public.phone_call_logs USING btree (id);

CREATE UNIQUE INDEX schedule_activity_pkey ON public.interview_schedule_activity USING btree (id);

CREATE UNIQUE INDEX "scheduling-agent-chat-history_candidate_email_key" ON public."scheduling-agent-chat-history" USING btree (candidate_email);

CREATE UNIQUE INDEX "scheduling-agent-chat-history_filter_json_id_key" ON public."scheduling-agent-chat-history" USING btree (filter_json_id);

CREATE UNIQUE INDEX sub_task_progress_pkey ON public.sub_task_progress USING btree (id);

CREATE UNIQUE INDEX sub_tasks_pkey ON public.sub_tasks USING btree (id);

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);

alter table "public"."application_logs" add constraint "application_logs_pkey" PRIMARY KEY using index "application_logs_pkey";

alter table "public"."interview_filter_json" add constraint "interview_filter_json_pkey" PRIMARY KEY using index "interview_filter_json_pkey";

alter table "public"."interview_plan" add constraint "interview_plan_pkey" PRIMARY KEY using index "interview_plan_pkey";

alter table "public"."interview_schedule_activity" add constraint "schedule_activity_pkey" PRIMARY KEY using index "schedule_activity_pkey";

alter table "public"."interview_session" add constraint "interview_session_pkey" PRIMARY KEY using index "interview_session_pkey";

alter table "public"."interview_session_relation" add constraint "inteview_session_relation_pkey" PRIMARY KEY using index "inteview_session_relation_pkey";

alter table "public"."interviewer_feedback" add constraint "interviewer_feedback_pkey" PRIMARY KEY using index "interviewer_feedback_pkey";

alter table "public"."new_tasks" add constraint "new_tasks_pkey" PRIMARY KEY using index "new_tasks_pkey";

alter table "public"."new_tasks_progress" add constraint "new_tasks_progress_pkey" PRIMARY KEY using index "new_tasks_progress_pkey";

alter table "public"."phone_call_logs" add constraint "phone_call_logs_pkey" PRIMARY KEY using index "phone_call_logs_pkey";

alter table "public"."sub_task_progress" add constraint "sub_task_progress_pkey" PRIMARY KEY using index "sub_task_progress_pkey";

alter table "public"."sub_tasks" add constraint "sub_tasks_pkey" PRIMARY KEY using index "sub_tasks_pkey";

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."application_logs" add constraint "public_application_logs_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."application_logs" validate constraint "public_application_logs_application_id_fkey";

alter table "public"."application_logs" add constraint "public_application_logs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."application_logs" validate constraint "public_application_logs_created_by_fkey";

alter table "public"."application_logs" add constraint "public_application_logs_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON DELETE CASCADE not valid;

alter table "public"."application_logs" validate constraint "public_application_logs_task_id_fkey";

alter table "public"."candidate_phone_call" add constraint "public_candidate_phone_call_sub_task_id_fkey" FOREIGN KEY (sub_task_id) REFERENCES sub_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."candidate_phone_call" validate constraint "public_candidate_phone_call_sub_task_id_fkey";

alter table "public"."interview_filter_json" add constraint "public_interview_filter_json_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_filter_json" validate constraint "public_interview_filter_json_created_by_fkey";

alter table "public"."interview_filter_json" add constraint "public_interview_filter_json_schedule_id_fkey" FOREIGN KEY (schedule_id) REFERENCES interview_schedule(id) ON DELETE CASCADE not valid;

alter table "public"."interview_filter_json" validate constraint "public_interview_filter_json_schedule_id_fkey";

alter table "public"."interview_module" add constraint "public_interview_module_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_module" validate constraint "public_interview_module_created_by_fkey";

alter table "public"."interview_module_relation" add constraint "public_interview_module_relation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_module_relation" validate constraint "public_interview_module_relation_user_id_fkey";

alter table "public"."interview_plan" add constraint "interview_plan_job_id_key" UNIQUE using index "interview_plan_job_id_key";

alter table "public"."interview_plan" add constraint "public_interview_plan_coordinator_id_fkey" FOREIGN KEY (coordinator_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_plan" validate constraint "public_interview_plan_coordinator_id_fkey";

alter table "public"."interview_plan" add constraint "public_interview_plan_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."interview_plan" validate constraint "public_interview_plan_job_id_fkey";

alter table "public"."interview_schedule" add constraint "public_interview_schedule_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."interview_schedule" validate constraint "public_interview_schedule_recruiter_id_fkey";

alter table "public"."interview_schedule_activity" add constraint "public_interview_schedule_activity_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."interview_schedule_activity" validate constraint "public_interview_schedule_activity_application_id_fkey";

alter table "public"."interview_schedule_activity" add constraint "public_interview_schedule_activity_filter_id_fkey" FOREIGN KEY (filter_id) REFERENCES interview_filter_json(id) ON DELETE SET NULL not valid;

alter table "public"."interview_schedule_activity" validate constraint "public_interview_schedule_activity_filter_id_fkey";

alter table "public"."interview_schedule_activity" add constraint "public_interview_schedule_activity_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_schedule_activity" validate constraint "public_interview_schedule_activity_user_id_fkey";

alter table "public"."interview_schedule_activity" add constraint "public_schedule_activity_schedule_id_fkey" FOREIGN KEY (schedule_id) REFERENCES interview_schedule(id) ON DELETE CASCADE not valid;

alter table "public"."interview_schedule_activity" validate constraint "public_schedule_activity_schedule_id_fkey";

alter table "public"."interview_session" add constraint "public_interview_session_interview_plan_id_fkey" FOREIGN KEY (interview_plan_id) REFERENCES interview_plan(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_session" validate constraint "public_interview_session_interview_plan_id_fkey";

alter table "public"."interview_session" add constraint "public_interview_session_meeting_id_fkey" FOREIGN KEY (meeting_id) REFERENCES interview_meeting(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session" validate constraint "public_interview_session_meeting_id_fkey";

alter table "public"."interview_session" add constraint "public_interview_session_module_id_fkey" FOREIGN KEY (module_id) REFERENCES interview_module(id) ON DELETE SET NULL not valid;

alter table "public"."interview_session" validate constraint "public_interview_session_module_id_fkey";

alter table "public"."interview_session_relation" add constraint "public_interview_session_relation_interview_module_relation_id_" FOREIGN KEY (interview_module_relation_id) REFERENCES interview_module_relation(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_relation" validate constraint "public_interview_session_relation_interview_module_relation_id_";

alter table "public"."interview_session_relation" add constraint "public_interview_session_relation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_relation" validate constraint "public_interview_session_relation_user_id_fkey";

alter table "public"."interview_session_relation" add constraint "public_inteview_session_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_relation" validate constraint "public_inteview_session_relation_session_id_fkey";

alter table "public"."interviewer_feedback" add constraint "public_interviewer_feedback_interviewer_id_fkey" FOREIGN KEY (interviewer_id) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interviewer_feedback" validate constraint "public_interviewer_feedback_interviewer_id_fkey";

alter table "public"."interviewer_feedback" add constraint "public_interviewer_feedback_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interviewer_feedback" validate constraint "public_interviewer_feedback_session_id_fkey";

alter table "public"."new_tasks" add constraint "public_new_tasks_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."new_tasks" validate constraint "public_new_tasks_application_id_fkey";

alter table "public"."new_tasks" add constraint "public_new_tasks_cretaed_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."new_tasks" validate constraint "public_new_tasks_cretaed_by_fkey";

alter table "public"."new_tasks" add constraint "public_new_tasks_filter_id_fkey" FOREIGN KEY (filter_id) REFERENCES interview_filter_json(id) ON DELETE SET NULL not valid;

alter table "public"."new_tasks" validate constraint "public_new_tasks_filter_id_fkey";

alter table "public"."new_tasks_progress" add constraint "public_new_tasks_progress_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON DELETE CASCADE not valid;

alter table "public"."new_tasks_progress" validate constraint "public_new_tasks_progress_task_id_fkey";

alter table "public"."phone_call_logs" add constraint "public_phone_call_logs_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applications(id) not valid;

alter table "public"."phone_call_logs" validate constraint "public_phone_call_logs_applicant_id_fkey";

alter table "public"."phone_call_logs" add constraint "public_phone_call_logs_phone_call_id_fkey" FOREIGN KEY (phone_call_id) REFERENCES candidate_phone_call(id) not valid;

alter table "public"."phone_call_logs" validate constraint "public_phone_call_logs_phone_call_id_fkey";

alter table "public"."scheduling-agent-chat-history" add constraint "public_scheduling-agent-chat-history_filter_json_id_fkey" FOREIGN KEY (filter_json_id) REFERENCES interview_filter_json(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."scheduling-agent-chat-history" validate constraint "public_scheduling-agent-chat-history_filter_json_id_fkey";

alter table "public"."scheduling-agent-chat-history" add constraint "public_scheduling-agent-chat-history_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."scheduling-agent-chat-history" validate constraint "public_scheduling-agent-chat-history_task_id_fkey";

alter table "public"."scheduling-agent-chat-history" add constraint "scheduling-agent-chat-history_candidate_email_key" UNIQUE using index "scheduling-agent-chat-history_candidate_email_key";

alter table "public"."scheduling-agent-chat-history" add constraint "scheduling-agent-chat-history_filter_json_id_key" UNIQUE using index "scheduling-agent-chat-history_filter_json_id_key";

alter table "public"."screening_answers" add constraint "public_screening_answers_screening_id_fkey" FOREIGN KEY (screening_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."screening_answers" validate constraint "public_screening_answers_screening_id_fkey";

alter table "public"."sub_task_progress" add constraint "public_sub_task_progress_sub_task_id_fkey" FOREIGN KEY (sub_task_id) REFERENCES sub_tasks(id) ON DELETE CASCADE not valid;

alter table "public"."sub_task_progress" validate constraint "public_sub_task_progress_sub_task_id_fkey";

alter table "public"."sub_tasks" add constraint "public_sub_tasks_task_id_fkey" FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE not valid;

alter table "public"."sub_tasks" validate constraint "public_sub_tasks_task_id_fkey";

alter table "public"."tasks" add constraint "public_tasks_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "public_tasks_application_id_fkey";

alter table "public"."tasks" add constraint "public_tasks_interviewer_Id_fkey" FOREIGN KEY ("interviewer_Id") REFERENCES recruiter_user(user_id) not valid;

alter table "public"."tasks" validate constraint "public_tasks_interviewer_Id_fkey";

alter table "public"."tasks" add constraint "public_tasks_recruter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "public_tasks_recruter_id_fkey";

alter table "public"."candidate_phone_call" add constraint "public_candidate_phone_call_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_phone_call" validate constraint "public_candidate_phone_call_applicant_id_fkey";

alter table "public"."interview_schedule" add constraint "public_interview_schedule_coordinator_id_fkey" FOREIGN KEY (coordinator_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_schedule" validate constraint "public_interview_schedule_coordinator_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_session(session_id uuid, interview_plan_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    WITH deleted_session AS (
        DELETE FROM interview_session 
        WHERE id = session_id
        RETURNING session_order
    ),
    sessions_to_update AS (
        SELECT isess.id, isess.session_order
        FROM interview_session isess
        JOIN deleted_session ds ON isess.interview_plan_id = delete_session.interview_plan_id
        WHERE isess.session_order >= ds.session_order
    )
    UPDATE interview_session
    SET session_order = stu.session_order - 1
    FROM sessions_to_update stu
    WHERE interview_session.id = stu.id;

    UPDATE interview_session AS iss
    SET break_duration = 0
    WHERE iss.id = (
        SELECT isss.id 
        FROM interview_session isss 
        WHERE isss.interview_plan_id = delete_session.interview_plan_id
        ORDER BY isss.session_order DESC
        LIMIT 1
    );
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
    WHERE
        (ja.status = 'interview' OR insc.id IS NOT NULL)
        AND pj.recruiter_id = rec_id
        AND (
            status_filter IS NULL 
            OR (
                'completed' = ANY(status_filter) AND insc.is_completed = true
            ) 
            OR (
                'ongoing' = ANY(status_filter) AND insc.is_completed = false
            )
            OR (
                'not_scheduled' = ANY(status_filter) AND insc.id IS NULL
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
    LIMIT 50 -- Number of records per page
    OFFSET (page_number - 1) * 50; -- Calculate the starting position of records based on page number
END;
$function$
;

CREATE OR REPLACE FUNCTION public.fetch_slots_api_details(in_plan_id uuid, in_company_id uuid)
 RETURNS TABLE(interview_sessions jsonb, service_json text)
 LANGUAGE plpgsql
AS $function$ 
DECLARE
    int_sessions jsonb;
    rec_service_json text;
BEGIN
    -- Query to fetch interview sessions
    SELECT jsonb_agg(to_jsonb(int_sess))
    INTO int_sessions
    FROM interview_session int_sess
    WHERE int_sess.interview_plan_id = in_plan_id;

    -- Query to fetch service JSON
    SELECT rec.service_json
    INTO rec_service_json
    FROM recruiter rec
    WHERE id = in_company_id;

    -- Return the results with named keys
    RETURN QUERY 
    SELECT int_sessions, rec_service_json;
END; 
$function$
;

CREATE OR REPLACE FUNCTION public.get_conversion_count(recruiter_id uuid, day_count numeric)
 RETURNS TABLE(timeline timestamp with time zone, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY
  SELECT
  DATE_TRUNC(
    CASE
        WHEN get_conversion_count.day_count > 365 THEN 'year'
        WHEN get_conversion_count.day_count > 30 THEN 'month'
        WHEN get_conversion_count.day_count > 7 THEN 'week'
        WHEN get_conversion_count.day_count >= 0 THEN 'day'
    END
    , applications.converted_at) AS timeline,
  COUNT (*) AS count
FROM
  (
    SELECT
      applications.id,
      applications.converted_at
    FROM
      (
        SELECT
          applications.id,
          applications.converted_at,
          applications.job_id
        FROM
          applications
        WHERE
          status = 'qualified'
          AND converted_at IS NOT null
      ) AS applications
      LEFT JOIN public_jobs ON public_jobs.id = applications.job_id
    WHERE
      public_jobs.recruiter_id = get_conversion_count.recruiter_id
      AND applications.job_id IS NOT NULL
  ) as applications
WHERE
  applications.id IN (
    SELECT
      interview_schedule.application_id
    FROM
      interview_schedule
    WHERE
      interview_schedule.recruiter_id = get_conversion_count.recruiter_id
  )
  AND applications.converted_at >= NOW() - INTERVAL '1 day' * get_conversion_count.day_count
GROUP BY timeline
ORDER BY timeline;
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
        'completed' = ANY(status_filter) AND insc.is_completed = true
        ) 
        OR (
        'ongoing' = ANY(status_filter) AND insc.is_completed = false
        )
        OR (
        'not_scheduled' = ANY(status_filter) AND insc.id IS NULL
        )
        )
        AND (cord_ids IS NULL OR insc.coordinator_id =  ANY(cord_ids))
        AND ((text_search_filter IS NULL OR text_search_filter = '') OR  
             (LOWER(cand.first_name || ' ' || cand.last_name) LIKE LOWER('%' || text_search_filter || '%')))
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
            )   ;

    RETURN total_candidates_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_data_job(application_id_param uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    interview_data JSONB;
    interview_plan_data JSONB;
    application_data JSONB;
    result_data JSONB;
BEGIN
    SELECT jsonb_agg(
               json_build_object(
                   'interview_session', row_to_json(intses),
                   'interview_module', row_to_json(intmod),
                   'interview_session_relations', interview_session_relations
               )
           )
    INTO interview_data
    FROM interview_session intses 
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
                                    'profile_image', user_rel.profile_image
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
                                    'profile_image', user_rel_debrief.profile_image
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
    WHERE intses.interview_plan_id IN (
        SELECT interview_plan.id 
        FROM applications 
        JOIN interview_plan ON interview_plan.job_id = applications.job_id 
        WHERE applications.id = application_id_param
    );

    SELECT row_to_json(interview_plan)
    INTO interview_plan_data
    FROM applications 
    JOIN interview_plan ON interview_plan.job_id = applications.job_id 
    WHERE applications.id = application_id_param;


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


    -- Combine interview data and application data
    result_data := jsonb_build_object(
        'interview_data', interview_data,
        'application_data', application_data,
        'interview_plan_data',interview_plan_data
    );

    RETURN result_data;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_data_schedule(schedule_id_param uuid, application_id_param uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    interview_data JSONB;
    application_data JSONB;
    schedule_activity_data JSONB;
    result_data JSONB;
BEGIN
    -- Fetch interview data
    SELECT jsonb_agg(
               json_build_object(
                   'interview_session', row_to_json(intses),
                   'interview_module', row_to_json(intmod),
                   'interview_meeting', row_to_json(intmeet),
                   'interview_session_relations', interview_session_relations
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
                                    'profile_image', user_rel.profile_image
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
                                    'profile_image', user_rel_debrief.profile_image
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
    WHERE intmeet.interview_schedule_id=schedule_id_param;


    SELECT row_to_json(interview_schedule_activity)
    INTO schedule_activity_data
    FROM interview_schedule_activity 
    WHERE schedule_id = schedule_id_param;

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

    -- Combine interview data and application data
    result_data := jsonb_build_object(
        'interview_data', interview_data,
        'application_data', application_data,
        'schedule_activity_data',schedule_activity_data
    );

    RETURN result_data;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_leaderboard(recruiter_id uuid, day_count numeric)
 RETURNS TABLE(user_id uuid, first_name text, last_name text, profile_image text, user_position text, duration numeric, interviews bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
SELECT
  recruiter_user.user_id,
  recruiter_user.first_name,
  recruiter_user.last_name,
  recruiter_user.profile_image,
  recruiter_user.position AS user_position,
  interviewers.duration,
  interviewers.interviews
FROM
  recruiter_user
  INNER JOIN (
    SELECT
      interview_module_relation.user_id,
      SUM(interview_session.session_duration) AS duration,
      COUNT(*) AS interviews
    FROM
      interview_module_relation
      INNER JOIN (
        SELECT
          interview_session_relation.interview_module_relation_id,
          interview_session.session_duration
        FROM
          (
            SELECT
              interview_session.id,
              interview_session.session_duration
            FROM
              interview_session
              INNER JOIN (
                SELECT
                  interview_meeting.id
                FROM
                  interview_meeting
                  INNER JOIN interview_schedule ON interview_schedule.id = interview_meeting.interview_schedule_id
                WHERE
                  interview_schedule.recruiter_id = get_interview_leaderboard.recruiter_id
                  AND interview_meeting.status = 'completed'
                  AND interview_meeting.end_time >= NOW() - INTERVAL '1 day' * get_interview_leaderboard.day_count
              ) AS interview_meeting ON interview_meeting.id = interview_session.meeting_id
          ) AS interview_session
          INNER JOIN interview_session_relation ON interview_session.id = interview_session_relation.session_id
        WHERE
          interview_session_relation.is_confirmed = true
      ) AS interview_session ON interview_session.interview_module_relation_id = interview_module_relation.id
    GROUP BY
      interview_module_relation.user_id
  ) AS interviewers ON interviewers.user_id = recruiter_user.user_id
  ORDER BY interviewers.duration DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_meeting_status_count(recruiter_id uuid)
 RETURNS SETOF jsonb
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT
  jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
    'timestamp', month,
    'completed', completed,
    'not_scheduled', not_scheduled,
    'waiting', waiting,
    'confirmed', confirmed,
    'reschedule', reschedule
  )))
 AS result
  FROM (
  SELECT 
    DATE_TRUNC('month', interview_meeting.created_at) AS month, 
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed, 
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,
    SUM(CASE WHEN status = 'not_scheduled' THEN 1 ELSE 0 END) AS not_scheduled,
    SUM(CASE WHEN status = 'waiting' THEN 1 ELSE 0 END) AS waiting,
    SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed,
    SUM(CASE WHEN status = 'reschedule' THEN 1 ELSE 0 END) AS reschedule
    FROM interview_meeting 
    INNER JOIN interview_schedule ON interview_schedule.id = interview_meeting.interview_schedule_id
    WHERE 
      interview_schedule.recruiter_id = get_interview_meeting_status_count.recruiter_id 
    GROUP BY DATE_TRUNC('month', interview_meeting.created_at) ORDER BY
    month
  ) as subquery;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_session_data(session_ids uuid[], company_id uuid)
 RETURNS TABLE(interview_sessions jsonb[], interviewers jsonb[], service_cred text, interview_modules jsonb[], comp_schedule_setting jsonb)
 LANGUAGE plpgsql
AS $function$
DECLARE
  session_record interview_session;
  interviewers jsonb[] := '{}'::jsonb[];  -- Initialize outside loop for efficiency
BEGIN
  -- Open cursor to fetch interview sessions (consider error handling)
  FOR session_record IN
    SELECT *
    FROM interview_session AS int_sess
    WHERE int_sess.id = any(session_ids)
  LOOP
    -- Append each session as JSONB directly to interview_sessions
    interview_sessions := interview_sessions || ROW_TO_JSON(session_record)::jsonb;

 IF session_record.session_type = 'debrief' THEN
     interviewers := interviewers || (
      SELECT jsonb_agg(jsonb_build_object(
      'user_id', rec_user.user_id,
      'first_name', rec_user.first_name,
      'last_name', rec_user.last_name,
      'scheduling_settings', rec_user.scheduling_settings,
      'schedule_auth', rec_user.schedule_auth,
      'profile_image', rec_user.profile_image,       
      'email', rec_user.email,
      'session_id', sess_reln.session_id,
      'training_type', sess_reln.training_type,
      'interviewer_type', sess_reln.interviewer_type,
      'pause_json', null,
      'interview_module_relation_id', null
      )) 
        FROM recruiter_user rec_user
        LEFT JOIN interview_session_relation sess_reln ON sess_reln.user_id = rec_user.user_id
        WHERE sess_reln.session_id = session_record.id
      );
    ELSE
      interviewers := interviewers || (
        SELECT jsonb_agg(jsonb_build_object(
          'user_id', recruiter_user.user_id,
        'first_name', recruiter_user.first_name,
        'last_name', recruiter_user.last_name,
        'scheduling_settings',recruiter_user.scheduling_settings,
        'schedule_auth',recruiter_user.schedule_auth,
        'profile_image',recruiter_user.profile_image,       
        'email',recruiter_user.email,
        'session_id',session_record.id,
        'training_type',sess_reln.training_type,
        'interviewer_type', sess_reln.interviewer_type,
        'pause_json',interview_module_relation.pause_json,
        'interview_module_relation_id',sess_reln.interview_module_relation_id
        ))
        FROM interview_session_relation sess_reln
        LEFT JOIN interview_module_relation ON sess_reln.interview_module_relation_id = interview_module_relation.id
        LEFT JOIN recruiter_user ON interview_module_relation.user_id = recruiter_user.user_id
        WHERE sess_reln.session_id = session_record.id
      );
    END IF;

    interview_modules := interview_modules||(select jsonb_agg(interview_module.*) from interview_module where  interview_module.id=session_record.module_id);

  END LOOP;

  SELECT INTO service_cred r.service_json
      FROM recruiter r
      WHERE r.id = company_id; 
  
  SELECT scheduling_settings INTO comp_schedule_setting
  FROM recruiter
  WHERE id = company_id;


  -- Return the interview_sessions and interviewers arrays
  RETURN QUERY SELECT interview_sessions, interviewers, service_cred, interview_modules, comp_schedule_setting;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_training_status_count(recruiter_id uuid)
 RETURNS TABLE(id uuid, name text, training_status_count jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN 
  RETURN QUERY 
  SELECT
  interview_module.id,
  interview_module.name,
  modules.training_status_count
FROM
  interview_module
  INNER JOIN (
    SELECT
      modules.module_id AS id,
      jsonb_build_object(
        'qualified',
        qualified_count,
        'training',
        training_count
      ) AS training_status_count
    FROM
      (
        SELECT
          interview_module_relation.module_id AS module_id,
          SUM(
            CASE
              WHEN interview_module_relation.training_status = 'qualified' THEN 1
              ELSE 0
            END
          ) AS qualified_count,
          SUM(
            CASE
              WHEN interview_module_relation.training_status = 'training' THEN 1
              ELSE 0
            END
          ) AS training_count
        FROM
          interview_module_relation
        GROUP BY
          interview_module_relation.module_id
      ) AS modules
    GROUP BY
      modules.module_id,
      modules.qualified_count,
      modules.training_count
  ) AS modules ON modules.id = interview_module.id
  WHERE interview_module.recruiter_id = get_interview_training_status_count.recruiter_id
  ORDER BY ((modules.training_status_count->>'training')::int + (modules.training_status_count->>'qualified')::int) DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_test_interview(user_test_id uuid)
 RETURNS TABLE(rec_user json, interview_session_meetings jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        row_to_json(ru) AS rec_user,
        (
            SELECT jsonb_agg(int_ses_rels_one.interview_session_meeting)
            FROM (
                SELECT
                    jsonb_build_object(
                        'interview_session', row_to_json(intses),
                        'interview_meeting', row_to_json(intmeet),
                        'interview_module_relation', row_to_json(intModRel)
                    ) AS interview_session_meeting
                FROM interview_session_relation intsesrel
                LEFT JOIN interview_module_relation intmodrel ON intsesrel.interview_module_relation_id = intmodrel.id
                LEFT JOIN interview_session intses ON intsesrel.session_id = intses.id
                LEFT JOIN interview_meeting intmeet ON intmeet.session_id = intses.id
                LEFT JOIN interview_schedule intsch ON intsch.id = intmeet.interview_schedule_id
                WHERE intmodrel.user_id = ru.user_id
            ) AS int_ses_rels_one
        ) AS interview_session_meetings
    FROM recruiter_user ru 
    WHERE ru.join_status = 'joined' AND ru.user_id = user_test_id
    GROUP BY ru.user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getapplicationprocessingstatuscount(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE 
  sections jsonb;
BEGIN
  SELECT JSONB_OBJECT_AGG(processing_status, count) INTO sections
  FROM(
    SELECT categories.processing_status as processing_status, COALESCE(status_category.count, 0) AS count
      FROM (
      SELECT 'processing' AS processing_status UNION ALL
      SELECT 'not started' UNION ALL
      SELECT 'success' UNION ALL
      SELECT 'failed' 
    ) AS categories
    LEFT JOIN (
      SELECT 
      processing_status,
      COUNT(*) AS count
      FROM 
        applications
        WHERE 
          job_id = jobId 
        GROUP BY 
          processing_status
    ) AS status_category
    ON 
    categories.processing_status::application_processing_status = status_category.processing_status
  ) as s;
RETURN sections;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjobaaaaaa(jobid uuid)
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, created_at timestamp with time zone, department public_job_department, description text, description_hash numeric, draft jsonb, email_template jsonb, id uuid, jd_json jsonb, job_title text, job_type public_job_type, location text, parameter_weights jsonb, phone_screen_enabled boolean, posted_by text, recruiter_id uuid, scoring_criteria_loading boolean, status public_job_status, workplace_type public_job_workplace, count jsonb, processing_count jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  SELECT pbj.active_status, pbj.assessment, pbj.company, pbj.created_at, pbj.department, pbj.description, pbj.description_hash, pbj.draft, pbj.email_template, pbj.id, pbj.jd_json, pbj.job_title, pbj.job_type, pbj.location, pbj.parameter_weights, pbj.phone_screen_enabled, pbj.posted_by, pbj.recruiter_id, pbj.scoring_criteria_loading, pbj.status, pbj.workplace_type,
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
        WHERE pj.id = jobId
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
        WHERE pj.id = jobId
    )
    GROUP BY job_id, applications.processing_status
) AS p_apps ON p_apps.job_id = pbj.id AND p_apps.processing_status = processing_statuses.processing_status::application_processing_status
WHERE pbj.id = jobId
GROUP BY pbj.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.insert_debrief_session(interview_plan_id uuid, session_order integer, session_duration integer, break_duration integer, location text, schedule_type interview_schedule_type, name text, members jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    WITH sessions_to_update AS (
    SELECT id
    FROM interview_session 
    WHERE interview_session.interview_plan_id = insert_debrief_session.interview_plan_id
    AND interview_session.session_order >= insert_debrief_session.session_order
    )
    UPDATE interview_session
    SET session_order = interview_session.session_order + 1
    WHERE interview_session.id 
    IN (
      SELECT id
      FROM sessions_to_update
    );
    WITH new_interview_session AS (
        INSERT INTO interview_session (
            interview_plan_id, 
            session_order, 
            session_duration, 
            break_duration, 
            session_type, 
            location, 
            schedule_type, 
            name
        )
        VALUES (
            interview_plan_id,
            session_order,
            session_duration,
            break_duration,
            'debrief'::session_type,
            location,
            schedule_type,
            name
        )
        RETURNING id
    )
    INSERT INTO interview_session_relation (user_id, session_id, interviewer_type, training_type)
    SELECT 
        (entry->>'id')::uuid AS user_id,
        new_interview_session.id AS session_id,
        'qualified'::status_training AS interviewer_type,
        'qualified'::interviewer_type AS training_type
    FROM 
        jsonb_array_elements(members) AS entry,
        new_interview_session;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.insert_interview_session(module_id uuid, interview_plan_id uuid, session_order integer, session_duration integer, break_duration integer, interviewer_cnt integer, session_type session_type, location text, schedule_type interview_schedule_type, name text, interview_module_relation_entries jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    WITH sessions_to_update AS (
    SELECT id
    FROM interview_session 
    WHERE interview_session.interview_plan_id = insert_interview_session.interview_plan_id
    AND interview_session.session_order >= insert_interview_session.session_order
    )
    UPDATE interview_session
    SET session_order = interview_session.session_order + 1
    WHERE interview_session.id 
    IN (
      SELECT id
      FROM sessions_to_update
    );
    WITH new_interview_session AS (
        INSERT INTO interview_session (
            module_id, 
            interview_plan_id, 
            session_order, 
            session_duration, 
            break_duration, 
            interviewer_cnt, 
            session_type, 
            location, 
            schedule_type, 
            name
        )
        VALUES (
            module_id,
            interview_plan_id,
            session_order,
            session_duration,
            break_duration,
            interviewer_cnt,
            session_type,
            location,
            schedule_type,
            name
        )
        RETURNING id
    )
    INSERT INTO interview_session_relation (interview_module_relation_id, session_id, interviewer_type, training_type)
    SELECT 
        (entry->>'id')::uuid AS interview_module_relation_id,
        new_interview_session.id AS session_id,
        (entry->>'interviewer_type')::status_training AS interviewer_type,
        (entry->>'training_type')::interviewer_type AS training_type
    FROM 
        jsonb_array_elements(interview_module_relation_entries) AS entry,
        new_interview_session;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.reorder_sessions(sessions jsonb, interview_plan_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  var_session_data jsonb;
  var_session_id uuid;
  var_session_order numeric;
BEGIN
  FOR var_session_data IN SELECT * FROM jsonb_array_elements(sessions)
    LOOP
        var_session_id := (var_session_data->>'id')::uuid;
        var_session_order := (var_session_data->>'session_order')::numeric;
        UPDATE interview_session
        SET session_order = var_session_order
        WHERE id = var_session_id;
    END LOOP;

    UPDATE interview_session AS iss
    SET break_duration = 0
    WHERE iss.id = (
        SELECT isss.id 
        FROM interview_session isss 
        WHERE isss.interview_plan_id = reorder_sessions.interview_plan_id
        ORDER BY isss.session_order DESC
        LIMIT 1
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.schedulercron()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
BEGIN
    -- Make a single HTTP request for the aggregated data
    SELECT value INTO function_url FROM env WHERE name = 'scheduler-cron';
    -- Make a single HTTP request for the aggregated data
    
    request_results := net.http_post(
        url := function_url
        -- Add other parameters like headers or data if needed
    );
    -- Return the HTTP request result
    RETURN request_results;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.search_members(recruiter_id_param uuid, name_param text)
 RETURNS TABLE(member_info json)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        json_build_object(
        'user_id', recuser.user_id,
        'first_name', recUser.first_name, 
        'last_name', recUser.last_name, 
        'email', recUser.email, 
        'position', recUser.position,
        'profile_image', recUser.profile_image,
        'role', recUser.role
      ) AS member_info
    FROM 
        recruiter_relation AS recRel
    JOIN 
        recruiter_user AS recUser ON recUser.user_id = recRel.user_id
    WHERE 
        recRel.recruiter_id = recruiter_id_param
        AND (recUser.first_name ILIKE '%' || name_param || '%' OR 
             recUser.last_name ILIKE '%' || name_param || '%' OR
             recUser.email ILIKE '%' || name_param || '%' OR
             recUser.position ILIKE '%' || name_param || '%') LIMIT 10;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_conversion_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  update applications
  set converted_at = now()
  where id = old.id and old.status <> new.status;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.upd_get_interview_session_data(session_ids uuid[], company_id uuid, meet_start_date timestamp without time zone, meet_end_date timestamp without time zone)
 RETURNS TABLE(interview_sessions jsonb[], interviewers jsonb[], service_cred text, interview_modules jsonb[], comp_schedule_setting jsonb, int_meetings jsonb[])
 LANGUAGE plpgsql
AS $function$
DECLARE
  session_record interview_session;
  interviewers jsonb[] := '{}'::jsonb[]; 
BEGIN
  -- Open cursor to fetch interview sessions (consider error handling)
  FOR session_record IN
    SELECT *
    FROM interview_session AS int_sess
    WHERE int_sess.id = any(session_ids)
  LOOP
    -- Append each session as JSONB directly to interview_sessions
    interview_sessions := interview_sessions || ROW_TO_JSON(session_record)::jsonb;

 IF session_record.session_type = 'debrief' THEN
     interviewers := interviewers || (
      SELECT jsonb_agg(jsonb_build_object(
      'user_id', rec_user.user_id,
      'first_name', rec_user.first_name,
      'last_name', rec_user.last_name,
      'scheduling_settings', rec_user.scheduling_settings,
      'schedule_auth', rec_user.schedule_auth,
      'profile_image', rec_user.profile_image,       
      'email', rec_user.email,
      'session_id', sess_reln.session_id,
      'training_type', sess_reln.training_type,
      'interviewer_type', sess_reln.interviewer_type,
      'pause_json', null,
      'interview_module_relation_id', null
      )) 
        FROM recruiter_user rec_user
        LEFT JOIN interview_session_relation sess_reln ON sess_reln.user_id = rec_user.user_id
        WHERE sess_reln.session_id = session_record.id
      );
    ELSE
      interviewers := interviewers || (
        SELECT jsonb_agg(jsonb_build_object(
          'user_id', recruiter_user.user_id,
        'first_name', recruiter_user.first_name,
        'last_name', recruiter_user.last_name,
        'scheduling_settings',recruiter_user.scheduling_settings,
        'schedule_auth',recruiter_user.schedule_auth,
        'profile_image',recruiter_user.profile_image,       
        'email',recruiter_user.email,
        'session_id',session_record.id,
        'training_type',sess_reln.training_type,
        'interviewer_type', sess_reln.interviewer_type,
        'pause_json',interview_module_relation.pause_json,
        'interview_module_relation_id',sess_reln.interview_module_relation_id
        ))
        FROM interview_session_relation sess_reln
        LEFT JOIN interview_module_relation ON sess_reln.interview_module_relation_id = interview_module_relation.id
        LEFT JOIN recruiter_user ON interview_module_relation.user_id = recruiter_user.user_id
        WHERE sess_reln.session_id = session_record.id
      );
    END IF;

    interview_modules := interview_modules||(select jsonb_agg(interview_module.*) from interview_module where  interview_module.id=session_record.module_id);

  END LOOP;

  IF meet_start_date IS NOT NULL THEN
    SELECT ARRAY(select 
      jsonb_build_object(
            'meeting_start_time', interview_meeting.start_time,
            'meeting_id', interview_meeting.id,
            'int_session_id', interview_session.id,
            'session_duration', interview_session.session_duration,
            'interv_user_id', interview_module_relation.user_id  
        )
     from 
      interview_module_relation
      right join interview_session_relation on interview_session_relation.interview_module_relation_id=interview_module_relation.id
      right join interview_session on interview_session.id = interview_session_relation.session_id
      left join interview_meeting on interview_meeting.id = interview_session.meeting_id
      where interview_module_relation.user_id = any(select interview_module_relation.user_id from 
      interview_module_relation
      right join interview_session_relation on interview_session_relation.interview_module_relation_id=interview_module_relation.id
      where interview_session_relation.session_id = any(session_ids) 
    ) and interview_session_relation.is_confirmed=true and interview_meeting.status in ('confirmed','completed')) INTO int_meetings;
  END IF ;

  SELECT INTO service_cred r.service_json
      FROM recruiter r
      WHERE r.id = company_id; 
  
  SELECT scheduling_settings INTO comp_schedule_setting
  FROM recruiter
  WHERE id = company_id;


  -- Return the interview_sessions and interviewers arrays
  RETURN QUERY SELECT interview_sessions, interviewers, service_cred, interview_modules, comp_schedule_setting, int_meetings;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_debrief_session(session_id uuid, session_duration integer, break_duration integer, location text, schedule_type interview_schedule_type, name text, members jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE interview_session
    SET 
      session_duration = update_debrief_session.session_duration,
      break_duration = update_debrief_session.break_duration,
      location = update_debrief_session.location,
      schedule_type = update_debrief_session.schedule_type,
      name = update_debrief_session.name
    WHERE interview_session.id = update_debrief_session.session_id;
    DELETE FROM interview_session_relation WHERE interview_session_relation.session_id = update_debrief_session.session_id;
    INSERT INTO interview_session_relation (user_id, session_id)
    SELECT 
        (entry->>'id')::uuid AS user_id,
        update_debrief_session.session_id AS session_id
    FROM 
        jsonb_array_elements(members) AS entry;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_interview_session(session_id uuid, module_id uuid, session_duration integer, break_duration integer, interviewer_cnt integer, session_type session_type, location text, schedule_type interview_schedule_type, name text, interview_module_relation_entries jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE interview_session
    SET  
      module_id = update_interview_session.module_id,
      session_duration = update_interview_session.session_duration,
      break_duration = update_interview_session.break_duration,
      interviewer_cnt = update_interview_session.interviewer_cnt,
      session_type = update_interview_session.session_type,
      location = update_interview_session.location,
      schedule_type = update_interview_session.schedule_type,
      name = update_interview_session.name
    WHERE interview_session.id = update_interview_session.session_id;
    DELETE FROM interview_session_relation WHERE interview_session_relation.session_id = update_interview_session.session_id;
    INSERT INTO interview_session_relation (interview_module_relation_id, session_id, interviewer_type, training_type)
    SELECT 
        (entry->>'id')::uuid AS interview_module_relation_id,
        update_interview_session.session_id AS session_id,
        (entry->>'interviewer_type')::status_training AS interviewer_type,
        (entry->>'training_type')::interviewer_type AS training_type
    FROM 
        jsonb_array_elements(interview_module_relation_entries) AS entry;
END;
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

CREATE OR REPLACE FUNCTION public.batchscorecron(function_value text)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
BEGIN
 -- Check the value of function_value parameter
    IF function_value = 'first' THEN
        -- Check if resumescorefirst() returns NULL
        IF batchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            SELECT value INTO function_url FROM env WHERE name = 'resumecron-batchscore';
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
        (SELECT COUNT(*) FROM interview_meeting intm JOIN interview_session inses ON inses.meeting_id=intm.id  WHERE  intm.status='confirmed' AND inses.module_id=intmod.id)::integer AS upcoming_meeting_count,
        (SELECT COUNT(*) FROM interview_meeting intm JOIN interview_session inses ON inses.meeting_id=intm.id WHERE  intm.status='completed' AND inses.module_id=intmod.id)::integer AS completed_meeting_count
    FROM interview_module intmod
    WHERE intmod.recruiter_id = rec_id
    GROUP BY intmod.id
    ORDER BY intmod.created_at DESC;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_job_id(target_job_id uuid)
 RETURNS TABLE(interview_meeting jsonb, schedule jsonb, interview_session jsonb, candidates jsonb, users jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        row_to_json(intmeet)::jsonb AS interview_meeting,
        row_to_json(insc)::jsonb AS schedule,
        row_to_json(intses)::jsonb AS interview_session,
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
                SELECT intmodrel.user_id 
                FROM interview_session_relation intsesrel
                JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
                WHERE intsesrel.session_id = intses.id AND intsesrel.is_confirmed=true
            )
        ), '[]'::jsonb) AS users
    FROM interview_meeting intmeet
    JOIN interview_session intses ON intses.meeting_id = intmeet.id 
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id
    JOIN applications app ON insc.application_id = app.id  
    JOIN candidates cand ON app.candidate_id = cand.id 
    WHERE app.job_id = target_job_id AND intmeet.status='confirmed' AND intmeet.start_time > NOW()
    GROUP BY intmeet.id,intses.id, insc.id,cand.id
    ORDER BY intmeet.start_time ASC ; 
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_meeting_id(target_meeting_id uuid)
 RETURNS TABLE(interview_meeting json, interview_session json, schedule json, applications json, candidates json, interview_module json, file json, job json, users jsonb, coordinator json)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        row_to_json(intmeet) AS interview_meeting,
        row_to_json(intses) AS interview_session,
        row_to_json(insc) AS schedule,
        row_to_json(app) AS applications,
        row_to_json(cand) AS candidates,
        row_to_json(intmod) AS interview_module,
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
                    'position', ru.position,
                    'interviewer_type',isr.interviewer_type,
                    'training_type',isr.training_type
                )::jsonb
            )
            FROM interview_session_relation isr
            JOIN interview_module_relation inm ON inm.id = isr.interview_module_relation_id
            JOIN recruiter_user ru ON ru.user_id = inm.user_id
            WHERE isr.session_id = intses.id AND isr.is_confirmed=true
        ), '[]'::jsonb) AS users,
        json_build_object(
                    'id', rec.user_id,
                    'first_name', rec.first_name,
                    'last_name', rec.last_name,
                    'email', rec.email,
                    'profile_image', rec.profile_image,
                    'position', rec.position
        ) as coordinator
    FROM interview_meeting intmeet
    JOIN interview_session intses ON intses.meeting_id = intmeet.id 
    JOIN interview_module intmod ON intmod.id = intses.module_id
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id  
    JOIN recruiter_user rec ON rec.user_id = insc.coordinator_id  
    JOIN applications app ON insc.application_id = app.id
    JOIN candidates cand ON app.candidate_id = cand.id 
    JOIN candidate_files cf ON cf.id = app.candidate_file_id  
    JOIN public_jobs pj ON pj.id = app.job_id
    WHERE intmeet.id = target_meeting_id
    GROUP BY intmeet.id,intses.id,intmod.id, insc.id,rec.user_id, app.id, cand.id, cf.id, pj.id;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_module_id(target_module_id uuid)
 RETURNS TABLE(interview_meeting jsonb, interview_session jsonb, schedule jsonb, users jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        row_to_json(intmeet)::jsonb AS interview_meeting,
        row_to_json(intses)::jsonb AS interview_session,
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
                SELECT intmodrel.user_id 
                FROM interview_session_relation intsesrel
                JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
                WHERE intsesrel.session_id = intses.id AND intsesrel.is_confirmed=true
            )
        ), '[]'::jsonb) AS users
    FROM interview_meeting intmeet
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id
    JOIN interview_session intses ON intses.meeting_id = intmeet.id  
    WHERE intses.module_id = target_module_id AND intmeet.status IN ('completed','confirmed','cancelled')
    GROUP BY intmeet.id, insc.id, intses.id;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_user_id(target_user_id uuid)
 RETURNS TABLE(interview_meeting json, interview_session json, schedule json, users json)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        row_to_json(intmeet) AS interview_meeting,
        row_to_json(intses) AS interview_session,
        row_to_json(insc) AS schedule,
        json_agg(json_build_object(
            'id', intmodrel.user_id,
            'training_type', intsesrel.training_type,
            'first_name', ru.first_name,
            'last_name', ru.last_name,
            'email', ru.email,
            'profile_image', ru.profile_image,
            'is_confirmed', intsesrel.training_type
        )) AS users
    FROM interview_meeting intmeet
    JOIN interview_session intses ON intses.meeting_id = intmeet.id
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id
    LEFT JOIN interview_session_relation intsesrel ON intses.id = intsesrel.session_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
    LEFT JOIN recruiter_user ru ON ru.user_id = intmodrel.user_id
    WHERE intmodrel.user_id = target_user_id  AND intmeet.status IN ('completed','confirmed','cancelled') 
    AND intsesrel.is_confirmed = true
    GROUP BY intmeet.id, insc.id , intses.id;
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
        (SELECT COUNT(*) FROM interview_session_relation intsesrel
         JOIN interview_session intses ON intses.id=intsesrel.session_id 
         JOIN interview_meeting intm ON intm.id=intses.meeting_id 
         JOIN interview_module_relation intmodrel ON intmodrel.id=intsesrel.interview_module_relation_id 
         WHERE intmodrel.user_id= recrel.user_id AND intm.status='confirmed' AND intsesrel.is_confirmed=true)::integer AS upcoming_meeting_count,
        (SELECT COUNT(*) FROM interview_session_relation intsesrel
         JOIN interview_session intses ON intses.id=intsesrel.session_id 
         JOIN interview_meeting intm ON intm.id=intses.meeting_id 
         JOIN interview_module_relation intmodrel ON intmodrel.id=intsesrel.interview_module_relation_id 
         WHERE intmodrel.user_id= recrel.user_id AND intm.status='completed' AND intsesrel.is_confirmed=true)::integer AS completed_meeting_count
    FROM recruiter_relation recrel
    JOIN recruiter_user ru ON ru.user_id = recrel.user_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.user_id = ru.user_id 
    LEFT JOIN interview_module intmod ON intmod.id = intmodrel.module_id
    WHERE ru.join_status = 'joined' AND recrel.recruiter_id = rec_id
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
FROM (SELECT resumes.id, TRUNC(((resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths')::numeric/jsonb_array_length(resumes.resume_json -> 'positions')::numeric)::numeric/12) AS average_tenure
  FROM resumes
  WHERE resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths' IS NOT NULL 
  AND jsonb_array_length(resumes.resume_json -> 'positions') <> 0
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
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, created_at timestamp with time zone, department public_job_department, description text, description_hash numeric, draft jsonb, email_template jsonb, id uuid, jd_json jsonb, job_title text, job_type public_job_type, location text, parameter_weights jsonb, phone_screen_enabled boolean, posted_by text, recruiter_id uuid, scoring_criteria_loading boolean, status public_job_status, workplace_type public_job_workplace, count jsonb, processing_count jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  SELECT pbj.active_status, pbj.assessment, pbj.company, pbj.created_at, pbj.department, pbj.description, pbj.description_hash, pbj.draft, pbj.email_template, pbj.id, pbj.jd_json, pbj.job_title, pbj.job_type, pbj.location, pbj.parameter_weights, pbj.phone_screen_enabled, pbj.posted_by, pbj.recruiter_id, pbj.scoring_criteria_loading, pbj.status, pbj.workplace_type,
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

CREATE OR REPLACE FUNCTION public.getjobs(recruiterid uuid)
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, created_at timestamp with time zone, department public_job_department, description text, description_hash numeric, draft jsonb, email_template jsonb, id uuid, jd_json jsonb, job_title text, job_type public_job_type, location text, parameter_weights jsonb, phone_screen_enabled boolean, posted_by text, recruiter_id uuid, scoring_criteria_loading boolean, status public_job_status, workplace_type public_job_workplace, count jsonb, processing_count jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  SELECT pbj.active_status, pbj.assessment, pbj.company, pbj.created_at, pbj.department, pbj.description, pbj.description_hash, pbj.draft, pbj.email_template, pbj.id, pbj.jd_json, pbj.job_title, pbj.job_type, pbj.location, pbj.parameter_weights, pbj.phone_screen_enabled, pbj.posted_by, pbj.recruiter_id, pbj.scoring_criteria_loading, pbj.status, pbj.workplace_type,
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

CREATE OR REPLACE FUNCTION public.job_application_filter_sort(jb_id uuid, min_lat double precision DEFAULT 0, min_long double precision DEFAULT 0, max_lat double precision DEFAULT 0, max_long double precision DEFAULT 0, j_status text DEFAULT 'new'::text, from_rec_num numeric DEFAULT 0, end_rec_num numeric DEFAULT 100, min_resume_score numeric DEFAULT '-1'::integer, max_resume_score numeric DEFAULT 100, min_interview_score numeric DEFAULT 0, max_interview_score numeric DEFAULT 100, sort_column_text text DEFAULT 'overall_score'::text, is_sort_desc boolean DEFAULT true, text_search_qry text DEFAULT ''::text, sort_by_schedule text DEFAULT 'asc'::text, is_locat_filter_on boolean DEFAULT false)
 RETURNS TABLE(job_app json, cand json, candfiles json, assres jsonb, schedule json, interview_session_meetings jsonb, fil_res bigint)
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
        ) AS interview_session_meetings 
    FROM
      applications ja      
      JOIN candidates c ON ja.candidate_id = c.id     
      LEFT JOIN candidate_files cf ON cf.id = ja.candidate_file_id
      LEFT JOIN interview_plan intplan ON intplan.job_id=ja.job_id
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
    fr.interview_session_meetings,
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
      AND (cand.first_name ILIKE '%' || name_param || '%' OR cand.last_name ILIKE '%' || name_param || '%')
      LIMIT 10;
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

CREATE OR REPLACE FUNCTION public.update_meeting_status()
 RETURNS void
 LANGUAGE plpgsql
AS $function$BEGIN
  -- Loop through each row in interview_schedule
-- Loop through each row in interview_schedule
    UPDATE interview_meeting
    SET status = 'completed'
    WHERE end_time < NOW() AND status <> 'completed' AND status <> 'cancelled';
END;$function$
;

grant delete on table "public"."application_logs" to "anon";

grant insert on table "public"."application_logs" to "anon";

grant references on table "public"."application_logs" to "anon";

grant select on table "public"."application_logs" to "anon";

grant trigger on table "public"."application_logs" to "anon";

grant truncate on table "public"."application_logs" to "anon";

grant update on table "public"."application_logs" to "anon";

grant delete on table "public"."application_logs" to "authenticated";

grant insert on table "public"."application_logs" to "authenticated";

grant references on table "public"."application_logs" to "authenticated";

grant select on table "public"."application_logs" to "authenticated";

grant trigger on table "public"."application_logs" to "authenticated";

grant truncate on table "public"."application_logs" to "authenticated";

grant update on table "public"."application_logs" to "authenticated";

grant delete on table "public"."application_logs" to "service_role";

grant insert on table "public"."application_logs" to "service_role";

grant references on table "public"."application_logs" to "service_role";

grant select on table "public"."application_logs" to "service_role";

grant trigger on table "public"."application_logs" to "service_role";

grant truncate on table "public"."application_logs" to "service_role";

grant update on table "public"."application_logs" to "service_role";

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

grant delete on table "public"."interview_filter_json" to "anon";

grant insert on table "public"."interview_filter_json" to "anon";

grant references on table "public"."interview_filter_json" to "anon";

grant select on table "public"."interview_filter_json" to "anon";

grant trigger on table "public"."interview_filter_json" to "anon";

grant truncate on table "public"."interview_filter_json" to "anon";

grant update on table "public"."interview_filter_json" to "anon";

grant delete on table "public"."interview_filter_json" to "authenticated";

grant insert on table "public"."interview_filter_json" to "authenticated";

grant references on table "public"."interview_filter_json" to "authenticated";

grant select on table "public"."interview_filter_json" to "authenticated";

grant trigger on table "public"."interview_filter_json" to "authenticated";

grant truncate on table "public"."interview_filter_json" to "authenticated";

grant update on table "public"."interview_filter_json" to "authenticated";

grant delete on table "public"."interview_filter_json" to "service_role";

grant insert on table "public"."interview_filter_json" to "service_role";

grant references on table "public"."interview_filter_json" to "service_role";

grant select on table "public"."interview_filter_json" to "service_role";

grant trigger on table "public"."interview_filter_json" to "service_role";

grant truncate on table "public"."interview_filter_json" to "service_role";

grant update on table "public"."interview_filter_json" to "service_role";

grant delete on table "public"."interview_plan" to "anon";

grant insert on table "public"."interview_plan" to "anon";

grant references on table "public"."interview_plan" to "anon";

grant select on table "public"."interview_plan" to "anon";

grant trigger on table "public"."interview_plan" to "anon";

grant truncate on table "public"."interview_plan" to "anon";

grant update on table "public"."interview_plan" to "anon";

grant delete on table "public"."interview_plan" to "authenticated";

grant insert on table "public"."interview_plan" to "authenticated";

grant references on table "public"."interview_plan" to "authenticated";

grant select on table "public"."interview_plan" to "authenticated";

grant trigger on table "public"."interview_plan" to "authenticated";

grant truncate on table "public"."interview_plan" to "authenticated";

grant update on table "public"."interview_plan" to "authenticated";

grant delete on table "public"."interview_plan" to "service_role";

grant insert on table "public"."interview_plan" to "service_role";

grant references on table "public"."interview_plan" to "service_role";

grant select on table "public"."interview_plan" to "service_role";

grant trigger on table "public"."interview_plan" to "service_role";

grant truncate on table "public"."interview_plan" to "service_role";

grant update on table "public"."interview_plan" to "service_role";

grant delete on table "public"."interview_schedule_activity" to "anon";

grant insert on table "public"."interview_schedule_activity" to "anon";

grant references on table "public"."interview_schedule_activity" to "anon";

grant select on table "public"."interview_schedule_activity" to "anon";

grant trigger on table "public"."interview_schedule_activity" to "anon";

grant truncate on table "public"."interview_schedule_activity" to "anon";

grant update on table "public"."interview_schedule_activity" to "anon";

grant delete on table "public"."interview_schedule_activity" to "authenticated";

grant insert on table "public"."interview_schedule_activity" to "authenticated";

grant references on table "public"."interview_schedule_activity" to "authenticated";

grant select on table "public"."interview_schedule_activity" to "authenticated";

grant trigger on table "public"."interview_schedule_activity" to "authenticated";

grant truncate on table "public"."interview_schedule_activity" to "authenticated";

grant update on table "public"."interview_schedule_activity" to "authenticated";

grant delete on table "public"."interview_schedule_activity" to "service_role";

grant insert on table "public"."interview_schedule_activity" to "service_role";

grant references on table "public"."interview_schedule_activity" to "service_role";

grant select on table "public"."interview_schedule_activity" to "service_role";

grant trigger on table "public"."interview_schedule_activity" to "service_role";

grant truncate on table "public"."interview_schedule_activity" to "service_role";

grant update on table "public"."interview_schedule_activity" to "service_role";

grant delete on table "public"."interview_session" to "anon";

grant insert on table "public"."interview_session" to "anon";

grant references on table "public"."interview_session" to "anon";

grant select on table "public"."interview_session" to "anon";

grant trigger on table "public"."interview_session" to "anon";

grant truncate on table "public"."interview_session" to "anon";

grant update on table "public"."interview_session" to "anon";

grant delete on table "public"."interview_session" to "authenticated";

grant insert on table "public"."interview_session" to "authenticated";

grant references on table "public"."interview_session" to "authenticated";

grant select on table "public"."interview_session" to "authenticated";

grant trigger on table "public"."interview_session" to "authenticated";

grant truncate on table "public"."interview_session" to "authenticated";

grant update on table "public"."interview_session" to "authenticated";

grant delete on table "public"."interview_session" to "service_role";

grant insert on table "public"."interview_session" to "service_role";

grant references on table "public"."interview_session" to "service_role";

grant select on table "public"."interview_session" to "service_role";

grant trigger on table "public"."interview_session" to "service_role";

grant truncate on table "public"."interview_session" to "service_role";

grant update on table "public"."interview_session" to "service_role";

grant delete on table "public"."interview_session_relation" to "anon";

grant insert on table "public"."interview_session_relation" to "anon";

grant references on table "public"."interview_session_relation" to "anon";

grant select on table "public"."interview_session_relation" to "anon";

grant trigger on table "public"."interview_session_relation" to "anon";

grant truncate on table "public"."interview_session_relation" to "anon";

grant update on table "public"."interview_session_relation" to "anon";

grant delete on table "public"."interview_session_relation" to "authenticated";

grant insert on table "public"."interview_session_relation" to "authenticated";

grant references on table "public"."interview_session_relation" to "authenticated";

grant select on table "public"."interview_session_relation" to "authenticated";

grant trigger on table "public"."interview_session_relation" to "authenticated";

grant truncate on table "public"."interview_session_relation" to "authenticated";

grant update on table "public"."interview_session_relation" to "authenticated";

grant delete on table "public"."interview_session_relation" to "service_role";

grant insert on table "public"."interview_session_relation" to "service_role";

grant references on table "public"."interview_session_relation" to "service_role";

grant select on table "public"."interview_session_relation" to "service_role";

grant trigger on table "public"."interview_session_relation" to "service_role";

grant truncate on table "public"."interview_session_relation" to "service_role";

grant update on table "public"."interview_session_relation" to "service_role";

grant delete on table "public"."interviewer_feedback" to "anon";

grant insert on table "public"."interviewer_feedback" to "anon";

grant references on table "public"."interviewer_feedback" to "anon";

grant select on table "public"."interviewer_feedback" to "anon";

grant trigger on table "public"."interviewer_feedback" to "anon";

grant truncate on table "public"."interviewer_feedback" to "anon";

grant update on table "public"."interviewer_feedback" to "anon";

grant delete on table "public"."interviewer_feedback" to "authenticated";

grant insert on table "public"."interviewer_feedback" to "authenticated";

grant references on table "public"."interviewer_feedback" to "authenticated";

grant select on table "public"."interviewer_feedback" to "authenticated";

grant trigger on table "public"."interviewer_feedback" to "authenticated";

grant truncate on table "public"."interviewer_feedback" to "authenticated";

grant update on table "public"."interviewer_feedback" to "authenticated";

grant delete on table "public"."interviewer_feedback" to "service_role";

grant insert on table "public"."interviewer_feedback" to "service_role";

grant references on table "public"."interviewer_feedback" to "service_role";

grant select on table "public"."interviewer_feedback" to "service_role";

grant trigger on table "public"."interviewer_feedback" to "service_role";

grant truncate on table "public"."interviewer_feedback" to "service_role";

grant update on table "public"."interviewer_feedback" to "service_role";

grant delete on table "public"."new_tasks" to "anon";

grant insert on table "public"."new_tasks" to "anon";

grant references on table "public"."new_tasks" to "anon";

grant select on table "public"."new_tasks" to "anon";

grant trigger on table "public"."new_tasks" to "anon";

grant truncate on table "public"."new_tasks" to "anon";

grant update on table "public"."new_tasks" to "anon";

grant delete on table "public"."new_tasks" to "authenticated";

grant insert on table "public"."new_tasks" to "authenticated";

grant references on table "public"."new_tasks" to "authenticated";

grant select on table "public"."new_tasks" to "authenticated";

grant trigger on table "public"."new_tasks" to "authenticated";

grant truncate on table "public"."new_tasks" to "authenticated";

grant update on table "public"."new_tasks" to "authenticated";

grant delete on table "public"."new_tasks" to "service_role";

grant insert on table "public"."new_tasks" to "service_role";

grant references on table "public"."new_tasks" to "service_role";

grant select on table "public"."new_tasks" to "service_role";

grant trigger on table "public"."new_tasks" to "service_role";

grant truncate on table "public"."new_tasks" to "service_role";

grant update on table "public"."new_tasks" to "service_role";

grant delete on table "public"."new_tasks_progress" to "anon";

grant insert on table "public"."new_tasks_progress" to "anon";

grant references on table "public"."new_tasks_progress" to "anon";

grant select on table "public"."new_tasks_progress" to "anon";

grant trigger on table "public"."new_tasks_progress" to "anon";

grant truncate on table "public"."new_tasks_progress" to "anon";

grant update on table "public"."new_tasks_progress" to "anon";

grant delete on table "public"."new_tasks_progress" to "authenticated";

grant insert on table "public"."new_tasks_progress" to "authenticated";

grant references on table "public"."new_tasks_progress" to "authenticated";

grant select on table "public"."new_tasks_progress" to "authenticated";

grant trigger on table "public"."new_tasks_progress" to "authenticated";

grant truncate on table "public"."new_tasks_progress" to "authenticated";

grant update on table "public"."new_tasks_progress" to "authenticated";

grant delete on table "public"."new_tasks_progress" to "service_role";

grant insert on table "public"."new_tasks_progress" to "service_role";

grant references on table "public"."new_tasks_progress" to "service_role";

grant select on table "public"."new_tasks_progress" to "service_role";

grant trigger on table "public"."new_tasks_progress" to "service_role";

grant truncate on table "public"."new_tasks_progress" to "service_role";

grant update on table "public"."new_tasks_progress" to "service_role";

grant delete on table "public"."phone_call_logs" to "anon";

grant insert on table "public"."phone_call_logs" to "anon";

grant references on table "public"."phone_call_logs" to "anon";

grant select on table "public"."phone_call_logs" to "anon";

grant trigger on table "public"."phone_call_logs" to "anon";

grant truncate on table "public"."phone_call_logs" to "anon";

grant update on table "public"."phone_call_logs" to "anon";

grant delete on table "public"."phone_call_logs" to "authenticated";

grant insert on table "public"."phone_call_logs" to "authenticated";

grant references on table "public"."phone_call_logs" to "authenticated";

grant select on table "public"."phone_call_logs" to "authenticated";

grant trigger on table "public"."phone_call_logs" to "authenticated";

grant truncate on table "public"."phone_call_logs" to "authenticated";

grant update on table "public"."phone_call_logs" to "authenticated";

grant delete on table "public"."phone_call_logs" to "service_role";

grant insert on table "public"."phone_call_logs" to "service_role";

grant references on table "public"."phone_call_logs" to "service_role";

grant select on table "public"."phone_call_logs" to "service_role";

grant trigger on table "public"."phone_call_logs" to "service_role";

grant truncate on table "public"."phone_call_logs" to "service_role";

grant update on table "public"."phone_call_logs" to "service_role";

grant delete on table "public"."sub_task_progress" to "anon";

grant insert on table "public"."sub_task_progress" to "anon";

grant references on table "public"."sub_task_progress" to "anon";

grant select on table "public"."sub_task_progress" to "anon";

grant trigger on table "public"."sub_task_progress" to "anon";

grant truncate on table "public"."sub_task_progress" to "anon";

grant update on table "public"."sub_task_progress" to "anon";

grant delete on table "public"."sub_task_progress" to "authenticated";

grant insert on table "public"."sub_task_progress" to "authenticated";

grant references on table "public"."sub_task_progress" to "authenticated";

grant select on table "public"."sub_task_progress" to "authenticated";

grant trigger on table "public"."sub_task_progress" to "authenticated";

grant truncate on table "public"."sub_task_progress" to "authenticated";

grant update on table "public"."sub_task_progress" to "authenticated";

grant delete on table "public"."sub_task_progress" to "service_role";

grant insert on table "public"."sub_task_progress" to "service_role";

grant references on table "public"."sub_task_progress" to "service_role";

grant select on table "public"."sub_task_progress" to "service_role";

grant trigger on table "public"."sub_task_progress" to "service_role";

grant truncate on table "public"."sub_task_progress" to "service_role";

grant update on table "public"."sub_task_progress" to "service_role";

grant delete on table "public"."sub_tasks" to "anon";

grant insert on table "public"."sub_tasks" to "anon";

grant references on table "public"."sub_tasks" to "anon";

grant select on table "public"."sub_tasks" to "anon";

grant trigger on table "public"."sub_tasks" to "anon";

grant truncate on table "public"."sub_tasks" to "anon";

grant update on table "public"."sub_tasks" to "anon";

grant delete on table "public"."sub_tasks" to "authenticated";

grant insert on table "public"."sub_tasks" to "authenticated";

grant references on table "public"."sub_tasks" to "authenticated";

grant select on table "public"."sub_tasks" to "authenticated";

grant trigger on table "public"."sub_tasks" to "authenticated";

grant truncate on table "public"."sub_tasks" to "authenticated";

grant update on table "public"."sub_tasks" to "authenticated";

grant delete on table "public"."sub_tasks" to "service_role";

grant insert on table "public"."sub_tasks" to "service_role";

grant references on table "public"."sub_tasks" to "service_role";

grant select on table "public"."sub_tasks" to "service_role";

grant trigger on table "public"."sub_tasks" to "service_role";

grant truncate on table "public"."sub_tasks" to "service_role";

grant update on table "public"."sub_tasks" to "service_role";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";

CREATE TRIGGER conversion_timestamp_trigger AFTER UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_conversion_timestamp();


