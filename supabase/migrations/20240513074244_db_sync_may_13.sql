create extension if not exists "pg_jsonschema" with schema "extensions";

create extension if not exists "wrappers" with schema "extensions";


create type "public"."cancel_type" as enum ('reschedule', 'declined');

create type "public"."session_accepted_status" as enum ('waiting', 'accepted', 'declined', 'request_reschedule');

drop policy "admin can create and update all user can fetch company data" on "public"."recruiter";

drop policy "authenticated_access_only" on "public"."recruiter_user";

drop policy "autenticated_write_only" on "public"."recruiter_relation";

alter table "public"."candidate_phone_call" drop constraint "public_candidate_phone_call_sub_task_id_fkey";

alter table "public"."interview_plan" drop constraint "public_interview_plan_coordinator_id_fkey";

alter table "public"."recruiter_relation" drop constraint "recruiter_relation_user_id_fkey";

alter table "public"."recruiter_user" drop constraint "recruiter_user_recruiter_id_fkey";

alter table "public"."scheduling-agent-chat-history" drop constraint "scheduling-agent-chat-history_candidate_email_key";

drop function if exists "public"."fetch_interview_data_by_application_id"(app_id uuid);

drop function if exists "public"."getjobaaaaaa"(jobid uuid);

drop function if exists "public"."get_interview_schedule_by_module_id"(target_module_id uuid);

drop function if exists "public"."getjob"(jobid uuid);

drop function if exists "public"."getjobs"(recruiterid uuid);

drop function if exists "public"."job_application_filter_sort"(jb_id uuid, min_lat double precision, min_long double precision, max_lat double precision, max_long double precision, j_status text, from_rec_num numeric, end_rec_num numeric, min_resume_score numeric, max_resume_score numeric, min_interview_score numeric, max_interview_score numeric, sort_column_text text, is_sort_desc boolean, text_search_qry text, sort_by_schedule text, is_locat_filter_on boolean);

alter table "public"."scheduling-agent-chat-history" drop constraint "scheduling-agent-chat-history_pkey";

drop index if exists "public"."scheduling-agent-chat-history_candidate_email_key";

drop index if exists "public"."scheduling-agent-chat-history_pkey";

-- MANUAL FIX --

-- ORIGINAL SQL --
-- alter type "public"."user_roles" rename to "user_roles__old_version_to_be_dropped";
-- create type "public"."user_roles" as enum ('admin', 'recruiter', 'interviewer', 'recruiting_coordinator', 'sourcer', 'hiring_manager');
-- drop type "public"."user_roles__old_version_to_be_dropped";
-- FIX FOR version 10 and above --

BEGIN;
  ALTER TYPE user_roles RENAME VALUE 'scheduler' TO 'recruiting_coordinator';
  ALTER TYPE user_roles ADD VALUE 'sourcer';
  ALTER TYPE user_roles ADD VALUE 'hiring_manager';
COMMIT;

-- DONE --


create table "public"."aggregated_data" (
    "json_agg" json
);


create table "public"."cancel_data" (
    "row_to_json" json
);


create table "public"."interview_schedule_phone_call" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "retell_call_id" text not null,
    "task_id" uuid default gen_random_uuid()
);


alter table "public"."interview_schedule_phone_call" enable row level security;

create table "public"."interview_session_cancel" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "session_relation_id" uuid,
    "reason" text not null,
    "is_resolved" boolean not null default false,
    "session_id" uuid not null,
    "schedule_id" uuid,
    "type" cancel_type not null default 'declined'::cancel_type,
    "other_details" jsonb
);


create table "public"."schedule_data" (
    "jsonb_agg" jsonb
);

alter table "public"."applications" add column "feedback" jsonb;

alter table "public"."candidate_phone_call" drop column "sub_task_id";

alter table "public"."candidate_phone_call" add column "task_id" uuid;

alter table "public"."candidates" add column "timezone" text;

alter table "public"."integrations" add column "domain_admin_email" text not null;

alter table "public"."integrations" add column "service_json" text;

alter table "public"."interview_meeting" add column "cal_event_id" text;

alter table "public"."interview_meeting" add column "candidate_feedback" jsonb;

alter table "public"."interview_plan" drop column "coordinator_id";

alter table "public"."interview_session_relation" add column "accepted_status" session_accepted_status not null default 'waiting'::session_accepted_status;

alter table "public"."new_tasks" drop column "task_triggered";

alter table "public"."new_tasks" alter column "type" set default 'schedule'::task_type_enum;

alter table "public"."new_tasks_progress" add column "title_meta" jsonb default '{}'::jsonb;

alter table "public"."public_jobs" add column "hiring_manager" uuid;

alter table "public"."public_jobs" add column "interview_coordinator" uuid;

alter table "public"."public_jobs" add column "recruiter" uuid;

alter table "public"."public_jobs" add column "recruiting_coordinator" uuid;

alter table "public"."public_jobs" add column "sourcer" uuid;

alter table "public"."public_jobs" alter column "department" set data type text using "department"::text;

alter table "public"."public_jobs" alter column "email_template" set default '{"interview": {"body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''ve Been Selected for an Assessment with [companyName]", "fromName": "[companyName]"}, "rejection": {"body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "[companyName]"}, "phone_screening": {"body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName] </p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "[companyName]"}, "interview_resend": {"body": "<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "[companyName]"}, "application_received": {"body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "[companyName]"}, "phone_screening_resend": {"body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "[companyName]"}, "debrief_calendar_invite": {"body": "<p>Dear [teamMemberName],</p><p>Please join the debrief session to discuss [firstName]''s interview for [jobTitle]. Your insights are valuable to the selection process.</p><p>Cheers,</p><p>[companyName] Recruitment Team</p>", "default": true, "subject": "Interview Debrief for [firstName]", "fromName": "[companyName]"}, "candidate_invite_confirmation": {"body": "<p>Dear [firstName],</p><p>We are pleased to confirm your interview for the [jobTitle] position . Please find the details of your interview below.</p><p>[viewDetailsLink]</p><p>Regards,</p><p>[companyName] </p><p>Recruitment Team</p>", "default": true, "subject": "Confirmation: Interview Scheduled at [companyName]", "fromName": "[companyName]"}, "candidate_availability_request": {"body": "<p>You have selected for the Interview at [companyName]</p><p>Hi [firstName], Choose a time slot that suits you best and take the first step towards joining our team. We look forward to meeting you!</p><h4>[scheduleName]</h4><p>[pickYourSlotLink]</p><p>Best regards,</p><p>[companyName] Recruitment Team</p>", "default": true, "subject": "You have been selected for the interview at [companyName]", "fromName": "[companyName]"}}'::jsonb;

alter table "public"."recruiter" drop column "roles";

alter table "public"."recruiter" add column "domain_admin_email" text;

alter table "public"."recruiter" add column "scheduling_reason" jsonb;

alter table "public"."recruiter" alter column "email_template" set default '{"interview": {"body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''''re pleased to announce that you''''ve been selected for an assessment.</p><p>You''''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''''ve Been Selected for an Assessment with [companyName]", "fromName": "[companyName]"}, "rejection": {"body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "[companyName]"}, "phone_screening": {"body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "[companyName]"}, "init_email_agent": {"body": "<p>Hi [candidateFirstName],</p><p>Congratulations! You have been selected for an interview at [companyName] for the [jobRole] position. Your qualifications are impressive, and we''''re excited to meet you and discuss them further.</p><p>Please let me know your availability within the following date range: [startDate] - [endDate] ([companyTimeZone]).</p><p>Also, to make sure we find an interview time that works well for you, could you tell us your general location.</p><p>Or use the following link to schedule your interview: [selfScheduleLink]</p><p>Looking forward to connecting with you!</p><p>Best regards,<br>[companyName] Recruitment Team</p>", "default": true, "subject": "Schedule Your Interview with [companyName] - Important Next Step", "fromName": "[companyName]"}, "interview_resend": {"body": "<p>Dear [firstName],</p><p>We noticed that you haven''''t given your assessment for the [jobTitle] position at [companyName]. Don''''t miss this opportunity!</p><p>You''''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "[companyName]"}, "application_received": {"body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "[companyName]"}, "phone_screening_resend": {"body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "[companyName]"}, "debrief_calendar_invite": {"body": "<p>Dear [teamMemberName],</p><p>Please join the debrief session to discuss [firstName]''''s interview for [jobTitle]. Your insights are valuable to the selection process.</p><p>Cheers,</p><p>[companyName] Recruitment Team</p>", "default": true, "subject": "Interview Debrief for [firstName]", "fromName": "[companyName]"}, "cancel_interview_session": {"body": "<p>Dear [firstName],</p> <p>I regret to inform you that we need to cancel your scheduled interview session [sessionName] at [companyName].</p> <p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p> <p>Best regards,<br> [companyName]</p>", "default": true, "subject": "Interview Cancellation: [jobTitle] Position", "fromName": "[companyName]"}, "candidate_invite_confirmation": {"body": "<p>Dear [firstName],</p><p>We are pleased to confirm your interview for the [jobTitle] position . Please find the details of your interview below.</p><p>[viewDetailsLink]<p/><p>Regards,</p><p>[companyName] Recruitment Team</p>", "default": true, "subject": "Confirmation: Interview Scheduled at [companyName]", "fromName": "[companyName]"}, "candidate_availability_request": {"body": "<p>You have selected for the Interview at [companyName]</p><p>Hi [firstName], Choose a time slot that suits you best and take the first step towards joining our team. We look forward to meeting you!</p><h4>[scheduleName]</h4><p>[pickYourSlotLink]</p><p>Best regards,</p><p>[companyName] Recruitment Team</p>", "default": true, "subject": "You have been selected for the interview at [companyName]", "fromName": "[companyName]"}}'::jsonb;

alter table "public"."recruiter" alter column "scheduling_settings" set default '{"timeZone": {"utc": "-08:00", "name": "(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle", "label": "America/Los_Angeles (GMT-08:00)", "tzCode": "America/Los_Angeles"}, "break_hour": {"end_time": "13:30", "start_time": "13:00"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "Juneteenth National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Hours", "value": 4}, "weeklyLimit": {"type": "Hours", "value": 20}}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "outOfOffice": ["Maternity leave", "vacation", "pto", "out of office", "ooo"], "SoftConflicts": ["Daily Standup", "Sync Up", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"], "recruitingBlocks": ["dedicated recruiting", "Recruiting Block"]}, "isAutomaticTimeZone": false}'::jsonb;

alter table "public"."recruiter_relation" add column "manager_id" uuid;

alter table "public"."recruiter_relation" add column "role" user_roles not null;

alter table "public"."recruiter_user" drop column "recruiter_id";

alter table "public"."recruiter_user" drop column "role";

alter table "public"."recruiter_user" add column "linked_in" text;

alter table "public"."recruiter_user" alter column "scheduling_settings" set default '{"timeZone": {"utc": "-08:00", "name": "(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle", "label": "America/Los_Angeles (GMT-08:00)", "tzCode": "America/Los_Angeles"}, "break_hour": {"end_time": "13:30", "start_time": "13:00"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "Juneteenth National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Hours", "value": 4}, "weeklyLimit": {"type": "Hours", "value": 20}}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "outOfOffice": ["Maternity leave", "vacation", "pto", "out of office", "ooo"], "SoftConflicts": ["Daily Standup", "Sync Up", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"], "recruitingBlocks": ["dedicated recruiting", "Recruiting Block"]}, "isAutomaticTimeZone": false}'::jsonb;

alter table "public"."scheduling-agent-chat-history" drop column "time_zone";

alter table "public"."scheduling-agent-chat-history" add column "agent_processing" boolean not null default false;

alter table "public"."scheduling-agent-chat-history" add column "thread_id" uuid not null;

alter table "public"."scheduling-agent-chat-history" alter column "filter_json_id" set not null;

drop type "public"."public_job_department";

CREATE UNIQUE INDEX interview_schedule_phone_call_pkey ON public.interview_schedule_phone_call USING btree (id);

CREATE UNIQUE INDEX interview_session_cancel_pkey ON public.interview_session_cancel USING btree (id);

CREATE UNIQUE INDEX "scheduling-agent-chat-history_pkey" ON public."scheduling-agent-chat-history" USING btree (filter_json_id, thread_id);

alter table "public"."interview_schedule_phone_call" add constraint "interview_schedule_phone_call_pkey" PRIMARY KEY using index "interview_schedule_phone_call_pkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_pkey" PRIMARY KEY using index "interview_session_cancel_pkey";

alter table "public"."scheduling-agent-chat-history" add constraint "scheduling-agent-chat-history_pkey" PRIMARY KEY using index "scheduling-agent-chat-history_pkey";

alter table "public"."candidate_phone_call" add constraint "candidate_phone_call_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."candidate_phone_call" validate constraint "candidate_phone_call_task_id_fkey";

alter table "public"."interview_schedule_phone_call" add constraint "interview_schedule_phone_call_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_schedule_phone_call" validate constraint "interview_schedule_phone_call_task_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_schedule_id_fkey" FOREIGN KEY (schedule_id) REFERENCES interview_schedule(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_schedule_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_session_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_session_relation_id_fkey" FOREIGN KEY (session_relation_id) REFERENCES interview_session_relation(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_session_relation_id_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_hiring_manager_fkey" FOREIGN KEY (hiring_manager) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_hiring_manager_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_interview_coordinator_fkey" FOREIGN KEY (interview_coordinator) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_interview_coordinator_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_recruiter_fkey" FOREIGN KEY (recruiter) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_recruiter_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_recruiting_coordinator_fkey" FOREIGN KEY (recruiting_coordinator) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_recruiting_coordinator_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_sourcer_fkey" FOREIGN KEY (sourcer) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_sourcer_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_manager_id_fkey" FOREIGN KEY (manager_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_manager_id_fkey";

set check_function_bodies = off;

create or replace view "public"."debreif_meeting_interviewers" as  SELECT recruiter_user.first_name,
    recruiter_user.last_name,
    recruiter_user.profile_image,
    recruiter_user.email,
    recruiter_user.user_id,
    interview_session_relation.interviewer_type,
    interview_session_relation.training_type,
    interview_session_relation.is_confirmed,
    interview_session.meeting_id,
    interview_session.id AS session_id
   FROM ((interview_session_relation
     LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
     LEFT JOIN recruiter_user ON ((recruiter_user.user_id = interview_session_relation.user_id)));


CREATE OR REPLACE FUNCTION public.get_all_interview_session_by_user_id(target_user_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    schedule_data JSONB;
    user_data JSONB;
    result_data JSONB;
BEGIN
    BEGIN
        SELECT 
            jsonb_agg(
                json_build_object(
                    'interview_meeting', json_build_object(
                        'meeting_id', intmeet.id,
                        'start_time', intmeet.start_time,
                        'end_time', intmeet.end_time,
                        'session_duration', intses.session_duration,
                        'status', intmeet.status,
                        'session_name', intses.name,
                        'schedule_type', intses.schedule_type,
                        'job_title', pj.job_title
                    ),
                    'users', (
                        SELECT 
                            json_agg(
                                json_build_object(
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
                                    'accepted_status', intsr.accepted_status,
                                    'weekly_meetings', (
                                        SELECT 
                                            json_agg(
                                                json_build_object(
                                                    'start_time', im2.start_time,
                                                    'end_time', im2.end_time,
                                                    'duration', ints2.session_duration
                                                )
                                            ) 
                                        FROM 
                                            interview_session_relation intsr2
                                            JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                                            JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                                            JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                                            JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                                        WHERE 
                                            recuser2.user_id = recuser.user_id
                                            AND intsr2.is_confirmed = true
                                            AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
                                            AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
                                    )
                                )
                            )
                        FROM 
                            interview_session_relation intsr
                            JOIN interview_module_relation intmr ON intmr.id = intsr.interview_module_relation_id  
                            LEFT JOIN recruiter_user recuser ON recuser.user_id = intmr.user_id
                            JOIN interview_session ints ON intsr.session_id = ints.id
                            JOIN interview_module indmod1 ON indmod1.id = ints.module_id
                            JOIN interview_meeting im ON ints.meeting_id = im.id
                        WHERE 
                            im.id = intmeet.id
                    )
                )
            )
        INTO 
            schedule_data
        FROM 
            interview_meeting intmeet
            JOIN interview_session intses ON intses.meeting_id = intmeet.id
            JOIN interview_module indmod ON indmod.id = intses.module_id
            JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id
            JOIN applications app ON app.id = insc.application_id
            JOIN public_jobs pj ON pj.id = app.job_id
            LEFT JOIN interview_session_relation intsesrel ON intses.id = intsesrel.session_id
            LEFT JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
            LEFT JOIN recruiter_user ru ON ru.user_id = intmodrel.user_id
        WHERE 
            intmodrel.user_id = target_user_id 
            AND intmeet.status IN ('completed', 'confirmed', 'cancelled') 
            AND intsesrel.is_confirmed = true
        GROUP BY 
            intmeet.id, insc.id , intses.id, app.id, pj.id;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                schedule_data := '[]'::jsonb;
    END;

    BEGIN
        SELECT 
            json_build_object('data', row_to_json(recuser))
        INTO 
            user_data 
        FROM  
            recruiter_user recuser  
        WHERE 
            user_id = target_user_id;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                user_data := NULL;
    END;

    result_data := jsonb_build_object(
        'schedule_data', COALESCE(schedule_data, '[]'::jsonb),
        'user_data', user_data
    );

    RETURN result_data;
    
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_rec_id(target_rec_id uuid)
 RETURNS TABLE(interview_meeting json, users json)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        json_build_object(
                            'meeting_id',intmeet.id,
                            'start_time', intmeet.start_time,
                            'end_time', intmeet.end_time,
                            'session_duration', intses.session_duration,
                            'status', intmeet.status,
                            'session_name', intses.name,
                            'schedule_type', intses.schedule_type,
                            'job_title', pj.job_title,
                            'job_id', pj.id
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
                    'interviewer_type',intsr.interviewer_type,
                    'location', recuser.interview_location,
                    'scheduling_settings', recuser.scheduling_settings,
                    'weekly_meetings', (
                        SELECT json_agg(json_build_object(
                            'start_time', im2.start_time,
                            'end_time', im2.end_time,
                            'duration', ints2.session_duration,
                            'accepted_status' ,intsr2.accepted_status
                        )) 
                        FROM interview_session_relation intsr2
                        JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                        JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                        JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                        JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                        WHERE recuser2.user_id = recuser.user_id
                        AND intsr2.is_confirmed = true
                        AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
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
        ) AS users
    FROM interview_meeting intmeet
    JOIN interview_session intses ON intses.meeting_id = intmeet.id
    JOIN interview_module indmod ON indmod.id = intses.module_id
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id
    JOIN applications app ON app.id = insc.application_id
    JOIN public_jobs pj ON pj.id = app.job_id
    LEFT JOIN interview_session_relation intsesrel ON intses.id = intsesrel.session_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
    LEFT JOIN recruiter_user ru ON ru.user_id = intmodrel.user_id
    WHERE pj.recruiter_id = target_rec_id AND intmeet.status IN ('completed', 'confirmed', 'cancelled') 
    AND intsesrel.is_confirmed = true
    GROUP BY intmeet.id, insc.id , intses.id, app.id, pj.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interviewer_meetings(target_user_id uuid)
 RETURNS TABLE(interviewer_meetings json)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT json_build_object(
                            'start_time', im2.start_time,
                            'end_time', im2.end_time,
                            'duration', ints2.session_duration
                        )
    FROM interview_session_relation intsr2
    JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
    JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
    JOIN interview_session ints2 ON intsr2.session_id = ints2.id
    JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
    WHERE recuser2.user_id = target_user_id  -- Changed to target_user_id
    AND intsr2.is_confirmed = true
    AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
    AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjobsv2(recruiter_id uuid)
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
  job_id UUID;
  job_results JSONB[] DEFAULT ARRAY[]::JSONB[];
BEGIN
  FOR job_id IN SELECT id FROM public_jobs WHERE public_jobs.recruiter_id = getJobsV2.recruiter_id LOOP
    job_results := ARRAY_APPEND(job_results, (SELECT row_to_json(getJob(job_id)))::JSONB);
  END LOOP;
  RETURN job_results;
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
    interview_session.id AS session_id,
    interview_session.name AS session_name,
    interview_session.break_duration,
    interview_session.session_order,
    interview_session.session_duration,
    interview_session.session_type
   FROM (interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)));


create or replace view "public"."meeting_interviewers" as  SELECT recruiter_user.first_name,
    recruiter_user.last_name,
    recruiter_user.profile_image,
    recruiter_user.email,
    recruiter_user.user_id,
    interview_session_relation.id AS session_relation_id,
    interview_session_relation.interviewer_type,
    interview_session_relation.training_type,
    interview_session_relation.is_confirmed,
    interview_session.meeting_id,
    interview_session.id AS session_id
   FROM (((interview_session_relation
     LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
     LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
     LEFT JOIN recruiter_user ON ((recruiter_user.user_id = interview_module_relation.user_id)));


CREATE OR REPLACE FUNCTION public.new_get_interview_schedule_by_meeting_id(target_meeting_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    schedule_data JSONB;
    cancel_data JSONB;
    result_data JSONB;
BEGIN
    BEGIN
        SELECT 
            jsonb_build_object(
                'interview_meeting', row_to_json(intmeet),
                'interview_session', row_to_json(intses),
                'schedule', row_to_json(insc),
                'applications', row_to_json(app),
                'candidates', row_to_json(cand),
                'interview_module', row_to_json(intmod),
                'file', (
                    SELECT json_build_object(
                        'id', cf.id,
                        'created_at', cf.created_at, 
                        'file_url', cf.file_url, 
                        'candidate_id', cf.candidate_id, 
                        'resume_text', cf.resume_text, 
                        'resume_json', cf.resume_json, 
                        'type', cf.type
                    ) 
                ),
                'job', (
                    SELECT json_build_object(
                        'id', pj.id,
                        'created_at', pj.created_at, 
                        'job_title', pj.job_title, 
                        'description', pj.description, 
                        'parameter_weights', pj.parameter_weights, 
                        'recruiter_id', pj.recruiter_id, 
                        'jd_json', pj.jd_json,
                        'location', pj.location
                    ) 
                ),
                'users', COALESCE((
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'id', ru.user_id,
                            'first_name', ru.first_name,
                            'last_name', ru.last_name,
                            'email', ru.email,
                            'profile_image', ru.profile_image,
                            'position', ru.position,
                            'department', ru.department,
                            'interview_session_relation', row_to_json(isr),
                            'location', ru.interview_location,
                            'scheduling_settings', ru.scheduling_settings,
                            'weekly_meetings', (
                                SELECT json_agg(json_build_object(
                                    'start_time', im2.start_time,
                                    'end_time', im2.end_time
                                )) 
                                FROM interview_session_relation intsr2
                                JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                                JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                                JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                                JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                                WHERE recuser2.user_id = ru.user_id
                                AND intsr2.is_confirmed = true
                                AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
                                AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
                            )
                        )::jsonb
                    )
                    FROM interview_session_relation isr
                    JOIN interview_module_relation inm ON inm.id = isr.interview_module_relation_id
                    JOIN recruiter_user ru ON ru.user_id = inm.user_id
                    WHERE isr.session_id = intses.id
                ), '[]'::jsonb),
                'coordinator', (
                    SELECT json_build_object(
                        'id', rec.user_id,
                        'first_name', rec.first_name,
                        'last_name', rec.last_name,
                        'email', rec.email,
                        'profile_image', rec.profile_image,
                        'position', rec.position
                    ) 
                )
            )
        INTO schedule_data
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
        GROUP BY intmeet.id, intses.id, intmod.id, insc.id, rec.user_id, app.id, cand.id, cf.id, pj.id;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                schedule_data := NULL;
    END;

    BEGIN
        SELECT jsonb_agg( 
            jsonb_build_object(
                'interview_session_cancel', row_to_json(intsescan),
                'interview_session_relation', row_to_json(intsesrel),
                'recruiter_user',json_build_object(
                        'id', recuser.user_id,
                        'first_name', recuser.first_name,
                        'last_name', recuser.last_name,
                        'email', recuser.email,
                        'profile_image', recuser.profile_image,
                        'position', recuser.position
                    ), 
                'candidate', row_to_json(cand)
                    ))
        INTO cancel_data
        FROM interview_session_cancel intsescan
        LEFT JOIN interview_session intses ON intses.id = intsescan.session_id 
        LEFT JOIN interview_meeting intmeet ON intmeet.id = intses.meeting_id
        LEFT JOIN interview_session_relation intsesrel ON intsesrel.id = intsescan.session_relation_id
        LEFT JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
        LEFT JOIN recruiter_user recuser ON recuser.user_id = intmodrel.user_id
        LEFT JOIN interview_schedule intsch ON intsch.id = intsescan.schedule_id
        LEFT JOIN applications app ON app.id = intsch.application_id
        LEFT JOIN candidates cand ON cand.id = app.candidate_id
        WHERE intmeet.id = target_meeting_id AND intsescan.is_resolved=false;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                cancel_data := NULL;
    END;

    result_data := jsonb_build_object(
        'schedule_data', schedule_data,
        'cancel_data', cancel_data
    );

    RETURN result_data;
    
     -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.new_get_interview_schedule_by_user_id(target_user_id uuid)
 RETURNS TABLE(interview_meeting json, users json)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        json_build_object(
                            'meeting_id',intmeet.id,
                            'start_time', intmeet.start_time,
                            'end_time', intmeet.end_time,
                            'session_duration', intses.session_duration,
                            'status', intmeet.status,
                            'session_name', intses.name,
                            'schedule_type', intses.schedule_type,
                            'job_title', pj.job_title,
                            'job_id', pj.id
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
                    'interviewer_type',intsr.interviewer_type,
                    'location', recuser.interview_location,
                    'scheduling_settings', recuser.scheduling_settings,
                    'accepted_status' ,intsr.accepted_status,
                    'weekly_meetings', (
                        SELECT json_agg(json_build_object(
                            'start_time', im2.start_time,
                            'end_time', im2.end_time,
                            'duration', ints2.session_duration
                        )) 
                        FROM interview_session_relation intsr2
                        JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                        JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                        JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                        JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                        WHERE recuser2.user_id = recuser.user_id
                        AND intsr2.is_confirmed = true
                        AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
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
        ) AS users
    FROM interview_meeting intmeet
    JOIN interview_session intses ON intses.meeting_id = intmeet.id
    JOIN interview_module indmod ON indmod.id = intses.module_id
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id
    JOIN applications app ON app.id = insc.application_id
    JOIN public_jobs pj ON pj.id = app.job_id
    LEFT JOIN interview_session_relation intsesrel ON intses.id = intsesrel.session_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
    LEFT JOIN recruiter_user ru ON ru.user_id = intmodrel.user_id
    WHERE intmodrel.user_id = target_user_id AND intmeet.status IN ('completed', 'confirmed', 'cancelled') 
    AND intsesrel.is_confirmed = true
    GROUP BY intmeet.id, insc.id , intses.id, app.id, pj.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_create_interview_plan()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  insert into interview_plan(job_id)
  values (new.id);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.batchsavegreenhouse_test(rec_id uuid)
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions and filter by recruiter_id
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
        SELECT
           gr.application_id AS application_id,
           gr.resume AS resume
       FROM greenhouse_reference gr
       JOIN public_jobs pj ON gr.public_job_id = pj.id
       WHERE gr.resume_saved = false 
         AND gr.resume IS NOT NULL
         AND pj.recruiter_id = rec_id -- Filter by recruiter_id
       ORDER BY gr.created_at ASC
       LIMIT 100
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.connectassessmenttemplate(assessmentid uuid, recruiterid uuid, templateid uuid, jobid uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
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
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.delete_session(session_id uuid, interview_plan_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.duplicateassessment(assessmentid uuid, newassessmentid uuid, recruiterid uuid, newtitle text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.get_conversion_count(recruiter_id uuid, type text)
 RETURNS TABLE(timeline timestamp with time zone, count bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
RETURN QUERY
  SELECT
  DATE_TRUNC(get_conversion_count.type, applications.converted_at) AS timeline,
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
      INNER JOIN public_jobs ON public_jobs.id = applications.job_id
    WHERE
      public_jobs.recruiter_id = get_conversion_count.recruiter_id
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
  AND applications.converted_at >= NOW() - INTERVAL '1 day' * (CASE
        WHEN get_conversion_count.type = 'year' THEN 36500
        WHEN get_conversion_count.type = 'month' THEN 365
        WHEN get_conversion_count.type = 'week' THEN 30
        WHEN get_conversion_count.type = 'day' THEN 7
    END)
GROUP BY timeline
ORDER BY timeline;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_data_job(application_id_param uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.get_interview_leaderboard(recruiter_id uuid, type text)
 RETURNS TABLE(user_id uuid, first_name text, last_name text, profile_image text, user_position text, duration numeric, interviews bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
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
                  AND interview_meeting.end_time >= NOW() - INTERVAL '1 day' * (CASE
        WHEN get_interview_leaderboard.type = 'year' THEN 36500
        WHEN get_interview_leaderboard.type = 'month' THEN 365
        WHEN get_interview_leaderboard.type = 'week' THEN 30
        WHEN get_interview_leaderboard.type = 'day' THEN 7
    END)
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

CREATE OR REPLACE FUNCTION public.get_interview_meeting_status_count(recruiter_id uuid, type text)
 RETURNS TABLE(timeline timestamp with time zone, completed bigint, cancelled bigint, not_scheduled bigint, waiting bigint, confirmed bigint, reschedule bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    DATE_TRUNC(get_interview_meeting_status_count.type, interview_meeting.created_at) AS timeline, 
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
      AND interview_meeting.created_at >= NOW() - INTERVAL '1 day' * (CASE
        WHEN get_interview_meeting_status_count.type = 'year' THEN 36500
        WHEN get_interview_meeting_status_count.type = 'month' THEN 365
        WHEN get_interview_meeting_status_count.type = 'week' THEN 30
        WHEN get_interview_meeting_status_count.type = 'day' THEN 7
    END)
    GROUP BY timeline 
    ORDER BY timeline;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_modules(rec_id uuid)
 RETURNS TABLE(interview_modules jsonb, users jsonb, upcoming_meeting_count integer, completed_meeting_count integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
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
 SECURITY DEFINER
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
 SECURITY DEFINER
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
 RETURNS TABLE(interview_meeting json, users json)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        json_build_object(
                            'meeting_id',intmeet.id,
                            'start_time', intmeet.start_time,
                            'end_time', intmeet.end_time,
                            'session_duration', intses.session_duration,
                            'status', intmeet.status,
                            'session_name', intses.name,
                            'schedule_type', intses.schedule_type,
                            'job_title', pj.job_title
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
                    'interviewer_type',intsr.interviewer_type,
                    'location', recuser.interview_location,
                    'scheduling_settings', recuser.scheduling_settings,
                    'accepted_status' ,intsr.accepted_status,
                    'weekly_meetings', (
                        SELECT json_agg(json_build_object(
                            'start_time', im2.start_time,
                            'end_time', im2.end_time,
                            'duration', ints2.session_duration
                        )) 
                        FROM interview_session_relation intsr2
                        JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                        JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                        JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                        JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                        WHERE recuser2.user_id = recuser.user_id
                        AND intsr2.is_confirmed = true
                        AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
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
        ) AS users
    FROM interview_meeting intmeet
    JOIN interview_session intses ON intses.meeting_id = intmeet.id
    JOIN interview_module indmod ON indmod.id = intses.module_id
    JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id
    JOIN applications app ON app.id = insc.application_id
    JOIN public_jobs pj ON pj.id = app.job_id
    LEFT JOIN interview_session_relation intsesrel ON intses.id = intsesrel.session_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
    LEFT JOIN recruiter_user ru ON ru.user_id = intmodrel.user_id
    WHERE indmod.id = target_module_id AND intmeet.status IN ('completed', 'confirmed', 'cancelled') 
    AND intsesrel.is_confirmed = true
    GROUP BY intmeet.id, insc.id , intses.id, app.id, pj.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_user_id(target_user_id uuid)
 RETURNS TABLE(interview_meeting json, interview_session json, schedule json, users json)
 LANGUAGE plpgsql
 SECURITY DEFINER
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
            'is_confirmed', intsesrel.is_confirmed
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

CREATE OR REPLACE FUNCTION public.get_interview_training_status_count(recruiter_id uuid)
 RETURNS TABLE(id uuid, name text, training_status_count jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.getapplicationprocessingstatuscount(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.getassessments(recruiterid uuid)
 RETURNS TABLE(id uuid, created_at timestamp with time zone, title text, description text, type template_type, recruiter_id uuid, level question_level, mode assessment_mode, question_count bigint, duration numeric, jobs jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
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
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.getjob(jobid uuid)
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, created_at timestamp with time zone, department text, description text, description_hash numeric, draft jsonb, email_template jsonb, id uuid, jd_json jsonb, job_title text, job_type public_job_type, location text, parameter_weights jsonb, phone_screen_enabled boolean, posted_by text, recruiter_id uuid, scoring_criteria_loading boolean, status public_job_status, workplace_type public_job_workplace, hiring_manager uuid, recruiter uuid, recruiting_coordinator uuid, sourcer uuid, interview_coordinator uuid, count jsonb, processing_count jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY 
  SELECT pbj.active_status, pbj.assessment, pbj.company, pbj.created_at, pbj.department, pbj.description, pbj.description_hash, pbj.draft, pbj.email_template, pbj.id, pbj.jd_json, pbj.job_title, pbj.job_type, pbj.location, pbj.parameter_weights, pbj.phone_screen_enabled, pbj.posted_by, pbj.recruiter_id, pbj.scoring_criteria_loading, pbj.status, pbj.workplace_type, pbj.hiring_manager, pbj.recruiter, pbj.recruiting_coordinator, pbj.sourcer, pbj.interview_coordinator,
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

CREATE OR REPLACE FUNCTION public.getjobassessments(jobid uuid)
 RETURNS TABLE(id uuid, created_at timestamp with time zone, title text, description text, type template_type, recruiter_id uuid, level question_level, mode assessment_mode, duration numeric)
 LANGUAGE plpgsql
 SECURITY DEFINER
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
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, created_at timestamp with time zone, department text, description text, description_hash numeric, draft jsonb, email_template jsonb, id uuid, jd_json jsonb, job_title text, job_type public_job_type, location text, parameter_weights jsonb, phone_screen_enabled boolean, posted_by text, recruiter_id uuid, scoring_criteria_loading boolean, status public_job_status, workplace_type public_job_workplace, count jsonb, processing_count jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.getresumematches(jobid uuid, section application_status, topmatch integer DEFAULT 80, goodmatch integer DEFAULT 60, averagematch integer DEFAULT 40, poormatch integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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
          job_id = jobId AND
          status = section
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
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.insert_debrief_session(interview_plan_id uuid, session_order integer, session_duration integer, break_duration integer, location text, schedule_type interview_schedule_type, name text, members jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
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
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.job_application_filter_sort(jb_id uuid, min_lat double precision DEFAULT 0, min_long double precision DEFAULT 0, max_lat double precision DEFAULT 0, max_long double precision DEFAULT 0, j_status text DEFAULT 'new'::text, from_rec_num numeric DEFAULT 0, end_rec_num numeric DEFAULT 100, min_resume_score numeric DEFAULT '-1'::integer, max_resume_score numeric DEFAULT 100, min_interview_score numeric DEFAULT 0, max_interview_score numeric DEFAULT 100, sort_column_text text DEFAULT 'overall_score'::text, is_sort_desc boolean DEFAULT true, text_search_qry text DEFAULT ''::text, sort_by_schedule text DEFAULT 'asc'::text, is_locat_filter_on boolean DEFAULT false)
 RETURNS TABLE(job_app json, cand json, tasks json, candfiles json, assres jsonb, schedule json, interview_session_meetings jsonb, fil_res bigint)
 LANGUAGE plpgsql
AS $function$ 
 
BEGIN
  fil_res := 0;
  RETURN QUERY 
  WITH filtered_results AS (
    SELECT
      row_to_json(ja) AS job_app,
      row_to_json(c) AS cand,
      (SELECT json_agg(new_tasks.*)
      FROM new_tasks
      WHERE ja.id = new_tasks.application_id
      ) AS tasks,
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
        OR (LOWER(c.first_name || ' ' || c.last_name || ' ' || c.email) LIKE LOWER('%' || text_search_qry || '%'))
      )
      AND (
        NOT is_locat_filter_on -- If is_locat_filter_on is false, skip the geolocation filter
        OR (is_locat_filter_on and c.geolocation && ST_SetSRID(ST_MakeBox2D(ST_Point(min_long, min_lat), ST_Point(max_long, max_lat)), 4326))
      )
  )
  SELECT 
    fr.job_app,
    fr.cand,
    fr.tasks,
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

CREATE OR REPLACE FUNCTION public.overviewgenerate()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    aggregated_data JSONB;  -- Variable to store the aggregated JSON data
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
BEGIN
    -- Aggregate the selected application data into a JSON array
    SELECT json_agg(row_to_json(test)) 
    INTO aggregated_data  -- Store the result into aggregated_data
    FROM (
        SELECT
            id as file_id,
            resume_json
        FROM candidate_files
        WHERE resume_json IS NOT NULL  AND resume_json->>'basics' IS NOT NULL AND resume_json->>'positions' IS NOT NULL  AND resume_json->>'skills' IS NOT NULL AND resume_json->>'overview' IS NULL 
        ORDER BY created_at DESC
        LIMIT 50
    ) as test;

    IF aggregated_data IS NULL THEN
        RETURN '{"message": "No records found"}';
    END IF;

    
    SELECT value INTO function_url FROM env WHERE name = 'overview-handler';
    -- Make a single HTTP request for the aggregated data
    SELECT
        net.http_post(
            url := function_url,
            body := aggregated_data  -- Use aggregated_data here
        ) INTO request_results;

    -- Return the HTTP request result
    RETURN request_results;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.reorder_sessions(sessions jsonb, interview_plan_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.search_members(recruiter_id_param uuid, name_param text)
 RETURNS TABLE(member_info json)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
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
        'profile_image', recUser.profile_image
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

CREATE OR REPLACE FUNCTION public.update_debrief_session(session_id uuid, session_duration integer, break_duration integer, location text, schedule_type interview_schedule_type, name text, members jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
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
 SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.updatequestionorder(start_point integer, question_ids uuid[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
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

grant delete on table "public"."aggregated_data" to "anon";

grant insert on table "public"."aggregated_data" to "anon";

grant references on table "public"."aggregated_data" to "anon";

grant select on table "public"."aggregated_data" to "anon";

grant trigger on table "public"."aggregated_data" to "anon";

grant truncate on table "public"."aggregated_data" to "anon";

grant update on table "public"."aggregated_data" to "anon";

grant delete on table "public"."aggregated_data" to "authenticated";

grant insert on table "public"."aggregated_data" to "authenticated";

grant references on table "public"."aggregated_data" to "authenticated";

grant select on table "public"."aggregated_data" to "authenticated";

grant trigger on table "public"."aggregated_data" to "authenticated";

grant truncate on table "public"."aggregated_data" to "authenticated";

grant update on table "public"."aggregated_data" to "authenticated";

grant delete on table "public"."aggregated_data" to "service_role";

grant insert on table "public"."aggregated_data" to "service_role";

grant references on table "public"."aggregated_data" to "service_role";

grant select on table "public"."aggregated_data" to "service_role";

grant trigger on table "public"."aggregated_data" to "service_role";

grant truncate on table "public"."aggregated_data" to "service_role";

grant update on table "public"."aggregated_data" to "service_role";

grant delete on table "public"."cancel_data" to "anon";

grant insert on table "public"."cancel_data" to "anon";

grant references on table "public"."cancel_data" to "anon";

grant select on table "public"."cancel_data" to "anon";

grant trigger on table "public"."cancel_data" to "anon";

grant truncate on table "public"."cancel_data" to "anon";

grant update on table "public"."cancel_data" to "anon";

grant delete on table "public"."cancel_data" to "authenticated";

grant insert on table "public"."cancel_data" to "authenticated";

grant references on table "public"."cancel_data" to "authenticated";

grant select on table "public"."cancel_data" to "authenticated";

grant trigger on table "public"."cancel_data" to "authenticated";

grant truncate on table "public"."cancel_data" to "authenticated";

grant update on table "public"."cancel_data" to "authenticated";

grant delete on table "public"."cancel_data" to "service_role";

grant insert on table "public"."cancel_data" to "service_role";

grant references on table "public"."cancel_data" to "service_role";

grant select on table "public"."cancel_data" to "service_role";

grant trigger on table "public"."cancel_data" to "service_role";

grant truncate on table "public"."cancel_data" to "service_role";

grant update on table "public"."cancel_data" to "service_role";

grant delete on table "public"."interview_schedule_phone_call" to "anon";

grant insert on table "public"."interview_schedule_phone_call" to "anon";

grant references on table "public"."interview_schedule_phone_call" to "anon";

grant select on table "public"."interview_schedule_phone_call" to "anon";

grant trigger on table "public"."interview_schedule_phone_call" to "anon";

grant truncate on table "public"."interview_schedule_phone_call" to "anon";

grant update on table "public"."interview_schedule_phone_call" to "anon";

grant delete on table "public"."interview_schedule_phone_call" to "authenticated";

grant insert on table "public"."interview_schedule_phone_call" to "authenticated";

grant references on table "public"."interview_schedule_phone_call" to "authenticated";

grant select on table "public"."interview_schedule_phone_call" to "authenticated";

grant trigger on table "public"."interview_schedule_phone_call" to "authenticated";

grant truncate on table "public"."interview_schedule_phone_call" to "authenticated";

grant update on table "public"."interview_schedule_phone_call" to "authenticated";

grant delete on table "public"."interview_schedule_phone_call" to "service_role";

grant insert on table "public"."interview_schedule_phone_call" to "service_role";

grant references on table "public"."interview_schedule_phone_call" to "service_role";

grant select on table "public"."interview_schedule_phone_call" to "service_role";

grant trigger on table "public"."interview_schedule_phone_call" to "service_role";

grant truncate on table "public"."interview_schedule_phone_call" to "service_role";

grant update on table "public"."interview_schedule_phone_call" to "service_role";

grant delete on table "public"."interview_session_cancel" to "anon";

grant insert on table "public"."interview_session_cancel" to "anon";

grant references on table "public"."interview_session_cancel" to "anon";

grant select on table "public"."interview_session_cancel" to "anon";

grant trigger on table "public"."interview_session_cancel" to "anon";

grant truncate on table "public"."interview_session_cancel" to "anon";

grant update on table "public"."interview_session_cancel" to "anon";

grant delete on table "public"."interview_session_cancel" to "authenticated";

grant insert on table "public"."interview_session_cancel" to "authenticated";

grant references on table "public"."interview_session_cancel" to "authenticated";

grant select on table "public"."interview_session_cancel" to "authenticated";

grant trigger on table "public"."interview_session_cancel" to "authenticated";

grant truncate on table "public"."interview_session_cancel" to "authenticated";

grant update on table "public"."interview_session_cancel" to "authenticated";

grant delete on table "public"."interview_session_cancel" to "service_role";

grant insert on table "public"."interview_session_cancel" to "service_role";

grant references on table "public"."interview_session_cancel" to "service_role";

grant select on table "public"."interview_session_cancel" to "service_role";

grant trigger on table "public"."interview_session_cancel" to "service_role";

grant truncate on table "public"."interview_session_cancel" to "service_role";

grant update on table "public"."interview_session_cancel" to "service_role";

grant delete on table "public"."schedule_data" to "anon";

grant insert on table "public"."schedule_data" to "anon";

grant references on table "public"."schedule_data" to "anon";

grant select on table "public"."schedule_data" to "anon";

grant trigger on table "public"."schedule_data" to "anon";

grant truncate on table "public"."schedule_data" to "anon";

grant update on table "public"."schedule_data" to "anon";

grant delete on table "public"."schedule_data" to "authenticated";

grant insert on table "public"."schedule_data" to "authenticated";

grant references on table "public"."schedule_data" to "authenticated";

grant select on table "public"."schedule_data" to "authenticated";

grant trigger on table "public"."schedule_data" to "authenticated";

grant truncate on table "public"."schedule_data" to "authenticated";

grant update on table "public"."schedule_data" to "authenticated";

grant delete on table "public"."schedule_data" to "service_role";

grant insert on table "public"."schedule_data" to "service_role";

grant references on table "public"."schedule_data" to "service_role";

grant select on table "public"."schedule_data" to "service_role";

grant trigger on table "public"."schedule_data" to "service_role";

grant truncate on table "public"."schedule_data" to "service_role";

grant update on table "public"."schedule_data" to "service_role";

create policy "recruiter_authencated_access_only"
on "public"."recruiter"
as permissive
for all
to authenticated
using ((id = ( SELECT recruiter_relation.recruiter_id
   FROM recruiter_relation
  WHERE (recruiter_relation.recruiter_id = recruiter.id))))
with check ((EXISTS ( SELECT true
   FROM recruiter_relation
  WHERE ((recruiter_relation.recruiter_id = recruiter.id) AND (recruiter_relation.role = 'admin'::user_roles)))));


create policy "recruiter_user_authenticated_accesss_only"
on "public"."recruiter_user"
as permissive
for all
to authenticated
using ((user_id = ( SELECT recruiter_relation.user_id
   FROM recruiter_relation
  WHERE (recruiter_relation.user_id = recruiter_user.user_id))))
with check ((user_id = ( SELECT auth.uid() AS uid)));


create policy "autenticated_write_only"
on "public"."recruiter_relation"
as permissive
for all
to authenticated
using ((user_id = ( SELECT auth.uid() AS uid)))
with check (false);


CREATE TRIGGER create_interview_plan AFTER INSERT ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION trigger_create_interview_plan();


