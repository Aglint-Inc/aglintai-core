create type "public"."db_search_type" as enum ('aglint', 'candidate');

create type "public"."email_fetch_status" as enum ('not fetched', 'success', 'unable to fetch');

create type "public"."file_type" as enum ('resume', 'coverletter', 'cv', 'image');

create type "public"."recruiter_roles" as enum ('admin', 'recruiter', 'human resource');

drop policy "authenticated_read_access_only" on "public"."new_application";

drop policy "authenticated_read_access_only" on "public"."new_assessment_results";

drop policy "authenticated_access_only" on "public"."new_candidate";

drop policy "authenticated_read_access_only" on "public"."new_candidate_files";

drop policy "authenticated_and_admin_acess_only" on "public"."recruiter";

drop policy "authenticated_access_only" on "public"."recruiter_user";

revoke delete on table "public"."aggregated_data" from "anon";

revoke insert on table "public"."aggregated_data" from "anon";

revoke references on table "public"."aggregated_data" from "anon";

revoke select on table "public"."aggregated_data" from "anon";

revoke trigger on table "public"."aggregated_data" from "anon";

revoke truncate on table "public"."aggregated_data" from "anon";

revoke update on table "public"."aggregated_data" from "anon";

revoke delete on table "public"."aggregated_data" from "authenticated";

revoke insert on table "public"."aggregated_data" from "authenticated";

revoke references on table "public"."aggregated_data" from "authenticated";

revoke select on table "public"."aggregated_data" from "authenticated";

revoke trigger on table "public"."aggregated_data" from "authenticated";

revoke truncate on table "public"."aggregated_data" from "authenticated";

revoke update on table "public"."aggregated_data" from "authenticated";

revoke delete on table "public"."aggregated_data" from "service_role";

revoke insert on table "public"."aggregated_data" from "service_role";

revoke references on table "public"."aggregated_data" from "service_role";

revoke select on table "public"."aggregated_data" from "service_role";

revoke trigger on table "public"."aggregated_data" from "service_role";

revoke truncate on table "public"."aggregated_data" from "service_role";

revoke update on table "public"."aggregated_data" from "service_role";

revoke delete on table "public"."job_applications" from "anon";

revoke insert on table "public"."job_applications" from "anon";

revoke references on table "public"."job_applications" from "anon";

revoke select on table "public"."job_applications" from "anon";

revoke trigger on table "public"."job_applications" from "anon";

revoke truncate on table "public"."job_applications" from "anon";

revoke update on table "public"."job_applications" from "anon";

revoke delete on table "public"."job_applications" from "authenticated";

revoke insert on table "public"."job_applications" from "authenticated";

revoke references on table "public"."job_applications" from "authenticated";

revoke select on table "public"."job_applications" from "authenticated";

revoke trigger on table "public"."job_applications" from "authenticated";

revoke truncate on table "public"."job_applications" from "authenticated";

revoke update on table "public"."job_applications" from "authenticated";

revoke delete on table "public"."job_applications" from "service_role";

revoke insert on table "public"."job_applications" from "service_role";

revoke references on table "public"."job_applications" from "service_role";

revoke select on table "public"."job_applications" from "service_role";

revoke trigger on table "public"."job_applications" from "service_role";

revoke truncate on table "public"."job_applications" from "service_role";

revoke update on table "public"."job_applications" from "service_role";

revoke delete on table "public"."new_application" from "anon";

revoke insert on table "public"."new_application" from "anon";

revoke references on table "public"."new_application" from "anon";

revoke select on table "public"."new_application" from "anon";

revoke trigger on table "public"."new_application" from "anon";

revoke truncate on table "public"."new_application" from "anon";

revoke update on table "public"."new_application" from "anon";

revoke delete on table "public"."new_application" from "authenticated";

revoke insert on table "public"."new_application" from "authenticated";

revoke references on table "public"."new_application" from "authenticated";

revoke select on table "public"."new_application" from "authenticated";

revoke trigger on table "public"."new_application" from "authenticated";

revoke truncate on table "public"."new_application" from "authenticated";

revoke update on table "public"."new_application" from "authenticated";

revoke delete on table "public"."new_application" from "service_role";

revoke insert on table "public"."new_application" from "service_role";

revoke references on table "public"."new_application" from "service_role";

revoke select on table "public"."new_application" from "service_role";

revoke trigger on table "public"."new_application" from "service_role";

revoke truncate on table "public"."new_application" from "service_role";

revoke update on table "public"."new_application" from "service_role";

revoke delete on table "public"."new_assessment_results" from "anon";

revoke insert on table "public"."new_assessment_results" from "anon";

revoke references on table "public"."new_assessment_results" from "anon";

revoke select on table "public"."new_assessment_results" from "anon";

revoke trigger on table "public"."new_assessment_results" from "anon";

revoke truncate on table "public"."new_assessment_results" from "anon";

revoke update on table "public"."new_assessment_results" from "anon";

revoke delete on table "public"."new_assessment_results" from "authenticated";

revoke insert on table "public"."new_assessment_results" from "authenticated";

revoke references on table "public"."new_assessment_results" from "authenticated";

revoke select on table "public"."new_assessment_results" from "authenticated";

revoke trigger on table "public"."new_assessment_results" from "authenticated";

revoke truncate on table "public"."new_assessment_results" from "authenticated";

revoke update on table "public"."new_assessment_results" from "authenticated";

revoke delete on table "public"."new_assessment_results" from "service_role";

revoke insert on table "public"."new_assessment_results" from "service_role";

revoke references on table "public"."new_assessment_results" from "service_role";

revoke select on table "public"."new_assessment_results" from "service_role";

revoke trigger on table "public"."new_assessment_results" from "service_role";

revoke truncate on table "public"."new_assessment_results" from "service_role";

revoke update on table "public"."new_assessment_results" from "service_role";

revoke delete on table "public"."new_candidate" from "anon";

revoke insert on table "public"."new_candidate" from "anon";

revoke references on table "public"."new_candidate" from "anon";

revoke select on table "public"."new_candidate" from "anon";

revoke trigger on table "public"."new_candidate" from "anon";

revoke truncate on table "public"."new_candidate" from "anon";

revoke update on table "public"."new_candidate" from "anon";

revoke delete on table "public"."new_candidate" from "authenticated";

revoke insert on table "public"."new_candidate" from "authenticated";

revoke references on table "public"."new_candidate" from "authenticated";

revoke select on table "public"."new_candidate" from "authenticated";

revoke trigger on table "public"."new_candidate" from "authenticated";

revoke truncate on table "public"."new_candidate" from "authenticated";

revoke update on table "public"."new_candidate" from "authenticated";

revoke delete on table "public"."new_candidate" from "service_role";

revoke insert on table "public"."new_candidate" from "service_role";

revoke references on table "public"."new_candidate" from "service_role";

revoke select on table "public"."new_candidate" from "service_role";

revoke trigger on table "public"."new_candidate" from "service_role";

revoke truncate on table "public"."new_candidate" from "service_role";

revoke update on table "public"."new_candidate" from "service_role";

revoke delete on table "public"."new_candidate_files" from "anon";

revoke insert on table "public"."new_candidate_files" from "anon";

revoke references on table "public"."new_candidate_files" from "anon";

revoke select on table "public"."new_candidate_files" from "anon";

revoke trigger on table "public"."new_candidate_files" from "anon";

revoke truncate on table "public"."new_candidate_files" from "anon";

revoke update on table "public"."new_candidate_files" from "anon";

revoke delete on table "public"."new_candidate_files" from "authenticated";

revoke insert on table "public"."new_candidate_files" from "authenticated";

revoke references on table "public"."new_candidate_files" from "authenticated";

revoke select on table "public"."new_candidate_files" from "authenticated";

revoke trigger on table "public"."new_candidate_files" from "authenticated";

revoke truncate on table "public"."new_candidate_files" from "authenticated";

revoke update on table "public"."new_candidate_files" from "authenticated";

revoke delete on table "public"."new_candidate_files" from "service_role";

revoke insert on table "public"."new_candidate_files" from "service_role";

revoke references on table "public"."new_candidate_files" from "service_role";

revoke select on table "public"."new_candidate_files" from "service_role";

revoke trigger on table "public"."new_candidate_files" from "service_role";

revoke truncate on table "public"."new_candidate_files" from "service_role";

revoke update on table "public"."new_candidate_files" from "service_role";

alter table "public"."greenhouse_reference" drop constraint "greenhouse_reference_application_id_fkey";

alter table "public"."job_applications" drop constraint "job_applications_candidate_id_fkey";

alter table "public"."job_applications" drop constraint "job_applications_job_id_fkey";

alter table "public"."new_application" drop constraint "new_application_candidate_file_id_fkey";

alter table "public"."new_application" drop constraint "new_application_candidate_id_fkey";

alter table "public"."new_application" drop constraint "new_application_job_id_fkey";

alter table "public"."new_assessment_results" drop constraint "new_assessment_results_application_id_fkey";

alter table "public"."new_candidate" drop constraint "new_candidate_recruiter_id_fkey";

alter table "public"."new_candidate" drop constraint "new_candidate_update_from_fkey";

alter table "public"."new_candidate_files" drop constraint "new_candidate_files_candidate_id_fkey";

alter table "public"."outreached_emails" drop constraint "outreached_emails_candidate_id_fkey";

alter table "public"."outreached_emails" drop constraint "outreached_emails_recruiter_id_fkey";

alter table "public"."candidate_search_history" drop constraint "candidate_search_history_recruiter_id_fkey";

alter table "public"."candidates" drop constraint "candidates_recruiter_id_fkey";

drop function if exists "public"."calc_cosine_sim"(emb1 vector, emb2 vector);

drop function if exists "public"."calc_sim_score"(job_ids uuid[], skill_qry_emb vector, edu_qry_emb vector, exp_qry_emb vector, resume_qry_emb vector, max_records integer, ts_query text, filter_companies text);

drop function if exists "public"."calc_sim_score2"(job_ids uuid[], skill_qry_emb vector, edu_qry_emb vector, exp_qry_emb vector, resume_qry_emb vector, max_records integer, ts_query text, filter_companies text);

drop function if exists "public"."calculate_resume_score"(score_json jsonb, app_id uuid);

drop function if exists "public"."filter_candidates2"(rec_id uuid, max_records numeric, offset_records numeric, location_filter text, name_filter text, job_title_filter text, is_location_desc boolean, is_name_desc boolean, is_job_title_desc boolean);

drop function if exists "public"."kw_match_documents"(query_text text, match_count integer);

drop function if exists "public"."match_job_applications"(query_embedding vector, match_threshold double precision, match_count integer, job_ids uuid[]);

drop function if exists "public"."test_filter2"(rec_id uuid, location_filter text, name_filter text, job_title_filter text, page_size integer, page_number integer, sort_param text, is_name_sort_desc boolean, is_location_sort_desc boolean, is_job_title_sort_desc boolean);

drop function if exists "public"."job_application_filter_sort"(jb_id uuid, min_lat double precision, min_long double precision, max_lat double precision, max_long double precision, j_status text, from_rec_num numeric, end_rec_num numeric, min_resume_score numeric, max_resume_score numeric, min_interview_score numeric, max_interview_score numeric, sort_column_text text, is_sort_desc boolean, text_search_qry text, is_locat_filter_on boolean);

alter table "public"."candidates" drop constraint "candidates_pkey";

alter table "public"."job_applications" drop constraint "job_applications_pkey";

alter table "public"."new_application" drop constraint "new_application_pkey";

alter table "public"."new_assessment_results" drop constraint "new_assessment_results_pkey";

alter table "public"."new_candidate" drop constraint "new_candidate_pkey";

alter table "public"."new_candidate_files" drop constraint "new_candidate_files_pkey";

drop index if exists "public"."candidates_pkey";

drop index if exists "public"."job_applications_pkey";

drop index if exists "public"."new_application_pkey";

drop index if exists "public"."new_assessment_results_pkey";

drop index if exists "public"."new_candidate_files_pkey";

drop index if exists "public"."new_candidate_pkey";

drop table "public"."aggregated_data";

drop table "public"."job_applications";

drop table "public"."new_application";

drop table "public"."new_assessment_results";

drop table "public"."new_candidate";

drop table "public"."new_candidate_files";

alter type "public"."application_processing_status" rename to "application_processing_status__old_version_to_be_dropped";

create type "public"."application_processing_status" as enum ('not started', 'processing', 'failed', 'success');

alter type "public"."application_status" rename to "application_status__old_version_to_be_dropped";

create type "public"."application_status" as enum ('new', 'assessment', 'qualified', 'disqualified', 'screening');

create table "public"."aglint_candidates" (
    "aglint_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "id" text not null,
    "city" text,
    "name" text,
    "email" text,
    "state" text,
    "title" text,
    "country" text,
    "headline" text,
    "functions" text[],
    "last_name" text,
    "photo_url" text,
    "seniority" text,
    "first_name" text,
    "github_url" text,
    "departments" text[],
    "show_intent" boolean,
    "twitter_url" text,
    "email_status" text,
    "facebook_url" text,
    "linkedin_url" text,
    "organization" jsonb,
    "subdepartments" text[],
    "intent_strength" text,
    "organization_id" text,
    "employment_history" jsonb[],
    "is_likely_to_engage" boolean,
    "revealed_for_current_team" boolean,
    "extrapolated_email_confidence" text,
    "search_query" jsonb not null,
    "phone_numbers" jsonb,
    "email_fetch_status" email_fetch_status not null default 'not fetched'::email_fetch_status
);


create table "public"."applications" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "applied_at" timestamp with time zone not null default now(),
    "job_id" uuid not null,
    "candidate_file_id" uuid,
    "score_json" jsonb,
    "overall_score" numeric not null default '-1'::numeric,
    "processing_status" application_processing_status not null default 'not started'::application_processing_status,
    "status" application_status not null default 'new'::application_status,
    "retry" numeric not null default '0'::numeric,
    "status_emails_sent" jsonb not null default '{}'::jsonb,
    "is_resume_fetching" boolean not null default false,
    "assessment_id" uuid,
    "phone_screening" jsonb,
    "candidate_id" uuid
);


alter table "public"."applications" enable row level security;

create table "public"."assessment_results" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "interview_duration" text not null,
    "ai_interviewer_id" numeric not null,
    "interview_score" numeric not null default '0'::numeric,
    "feedback" jsonb not null,
    "conversation" jsonb[] not null,
    "interviewing_date" timestamp with time zone not null default now(),
    "application_id" uuid not null
);


create table "public"."candidate_files" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "candidate_id" uuid not null,
    "file_url" text,
    "resume_text" text,
    "resume_json" jsonb,
    "skills_embedding" vector,
    "education_embedding" vector,
    "experience_embedding" vector,
    "resume_embedding" vector,
    "type" file_type default 'resume'::file_type
);


alter table "public"."candidate_files" enable row level security;

create table "public"."candidate_list" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "candidates" text[] not null default '{}'::text[],
    "name" text not null,
    "recruiter_id" uuid not null
);


create table "public"."company_search_cache" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "company_name" text not null,
    "website_url" text,
    "search_result" jsonb not null
);


create table "public"."job_assiatan_chat" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "job_id" uuid not null,
    "name" text,
    "thread_id" text not null,
    "updated_at" timestamp with time zone not null default now(),
    "last_message" text
);


create table "public"."job_assiatan_chat_messages" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "job_assiatan_chat_id" uuid not null,
    "sender" text not null,
    "type" text not null,
    "message_id" text not null,
    "content" jsonb not null
);


create table "public"."recruiter_relation" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid not null,
    "user_id" uuid not null,
    "is_active" boolean not null default false,
    "created_by" uuid not null default auth.uid()
);


alter table "public"."recruiter_relation" enable row level security;

drop type "public"."application_processing_status__old_version_to_be_dropped";

drop type "public"."application_status__old_version_to_be_dropped";

alter table "public"."candidate_search_history" add column "candidates" text[] not null default '{}'::text[];

alter table "public"."candidate_search_history" add column "db_search" db_search_type default 'candidate'::db_search_type;

alter table "public"."candidate_search_history" add column "used_credits" jsonb not null default '{"email_credits": 0, "export_credits": 0, "mobile_credits": 0}'::jsonb;

alter table "public"."candidates" drop column "company";

alter table "public"."candidates" drop column "job_location";

alter table "public"."candidates" drop column "job_title";

alter table "public"."candidates" drop column "profile_image";

alter table "public"."candidates" add column "avatar" text;

alter table "public"."candidates" add column "city" text;

alter table "public"."candidates" add column "country" text;

alter table "public"."candidates" add column "current_company" text;

alter table "public"."candidates" add column "experience_in_months" numeric;

alter table "public"."candidates" add column "geolocation" geometry;

alter table "public"."candidates" add column "last_updated" timestamp with time zone not null default now();

alter table "public"."candidates" add column "state" text;

alter table "public"."candidates" alter column "first_name" set default 'not set'::citext;

-- alter table "public"."candidates" alter column "recruiter_id" set not null;

alter table "public"."candidates" enable row level security;

alter table "public"."outreached_emails" drop column "recruiter_id";

alter table "public"."outreached_emails" add column "email_sent" boolean not null default false;

alter table "public"."outreached_emails" add column "recruiter_user_id" uuid not null;

alter table "public"."outreached_emails" alter column "candidate_id" set data type text using "candidate_id"::text;

alter table "public"."public_jobs" drop column "jd_json_2";

alter table "public"."public_jobs" add column "jd_changed" boolean default false;

alter table "public"."public_jobs" add column "phone_screen_enabled" boolean default false;

alter table "public"."public_jobs" add column "phone_screening" jsonb;

alter table "public"."public_jobs" alter column "email_template" set default '{"interview": {"body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''ve Been Selected for an Assessment with [companyName]", "fromName": "aglint"}, "rejection": {"body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "aglint"}, "phone_screening": {"body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "aglint"}, "interview_resend": {"body": "<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "aglint"}, "application_recieved": {"body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "aglint"}, "phone_screening_resend": {"body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "aglint"}}'::jsonb;

alter table "public"."recruiter" drop column "email_outreach_templates";

alter table "public"."recruiter" alter column "email_template" set default '{"interview": {"body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''ve Been Selected for an Assessment with [companyName]", "fromName": "aglint"}, "rejection": {"body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "aglint"}, "phone_screening": {"body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "aglint"}, "interview_resend": {"body": "<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "aglint"}, "application_recieved": {"body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "aglint"}, "phone_screening_resend": {"body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "aglint"}}'::jsonb;

alter table "public"."recruiter" alter column "recruiter_user_id" set data type uuid using "recruiter_user_id"::uuid;

alter table "public"."recruiter_user" add column "email_auth" jsonb;

alter table "public"."recruiter_user" add column "email_outreach_templates" jsonb[];

alter table "public"."recruiter_user" add column "position" text;

alter table "public"."recruiter_user" alter column "role" set default 'admin'::recruiter_roles;

alter table "public"."recruiter_user" alter column "role" set data type recruiter_roles using "role"::recruiter_roles;

alter table "public"."rp_logs" enable row level security;

CREATE UNIQUE INDEX aglint_candidates_pkey ON public.aglint_candidates USING btree (aglint_id);

CREATE UNIQUE INDEX candidate_list_pkey ON public.candidate_list USING btree (id);

CREATE UNIQUE INDEX candidate_ukey ON public.candidates USING btree (recruiter_id, email);

CREATE UNIQUE INDEX candidates_id_key ON public.candidates USING btree (id);

CREATE UNIQUE INDEX company_search_cache_pkey ON public.company_search_cache USING btree (id);

CREATE UNIQUE INDEX job_assiatan_chat_messages_pkey ON public.job_assiatan_chat_messages USING btree (id);

CREATE UNIQUE INDEX job_assiatan_chat_pkey ON public.job_assiatan_chat USING btree (id);

CREATE UNIQUE INDEX recruiter_relation_pkey ON public.recruiter_relation USING btree (id);

CREATE UNIQUE INDEX recruiter_relation_ukey ON public.recruiter_relation USING btree (user_id, recruiter_id);

CREATE UNIQUE INDEX new_application_pkey ON public.applications USING btree (id);

CREATE UNIQUE INDEX new_assessment_results_pkey ON public.assessment_results USING btree (id);

CREATE UNIQUE INDEX new_candidate_files_pkey ON public.candidate_files USING btree (id);

CREATE UNIQUE INDEX new_candidate_pkey ON public.candidates USING btree (id);

alter table "public"."aglint_candidates" add constraint "aglint_candidates_pkey" PRIMARY KEY using index "aglint_candidates_pkey";

alter table "public"."applications" add constraint "new_application_pkey" PRIMARY KEY using index "new_application_pkey";

alter table "public"."assessment_results" add constraint "new_assessment_results_pkey" PRIMARY KEY using index "new_assessment_results_pkey";

alter table "public"."candidate_files" add constraint "new_candidate_files_pkey" PRIMARY KEY using index "new_candidate_files_pkey";

alter table "public"."candidate_list" add constraint "candidate_list_pkey" PRIMARY KEY using index "candidate_list_pkey";

alter table "public"."candidates" add constraint "new_candidate_pkey" PRIMARY KEY using index "new_candidate_pkey";

alter table "public"."company_search_cache" add constraint "company_search_cache_pkey" PRIMARY KEY using index "company_search_cache_pkey";

alter table "public"."job_assiatan_chat" add constraint "job_assiatan_chat_pkey" PRIMARY KEY using index "job_assiatan_chat_pkey";

alter table "public"."job_assiatan_chat_messages" add constraint "job_assiatan_chat_messages_pkey" PRIMARY KEY using index "job_assiatan_chat_messages_pkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_pkey" PRIMARY KEY using index "recruiter_relation_pkey";

alter table "public"."applications" add constraint "applications_assessment_id_fkey" FOREIGN KEY (assessment_id) REFERENCES assessment_results(id) ON DELETE SET NULL not valid;

alter table "public"."applications" validate constraint "applications_assessment_id_fkey";

alter table "public"."applications" add constraint "applications_candidate_file_id_fkey" FOREIGN KEY (candidate_file_id) REFERENCES candidate_files(id) ON DELETE SET NULL not valid;

alter table "public"."applications" validate constraint "applications_candidate_file_id_fkey";

alter table "public"."applications" add constraint "applications_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_candidate_id_fkey";

alter table "public"."applications" add constraint "applications_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_job_id_fkey";

alter table "public"."assessment_results" add constraint "assessment_results_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."assessment_results" validate constraint "assessment_results_application_id_fkey";

alter table "public"."candidate_files" add constraint "candidate_files_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_files" validate constraint "candidate_files_candidate_id_fkey";

alter table "public"."candidate_list" add constraint "candidate_list_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_list" validate constraint "candidate_list_recruiter_id_fkey";

alter table "public"."candidates" add constraint "candidate_ukey" UNIQUE using index "candidate_ukey";

alter table "public"."candidates" add constraint "candidates_id_key" UNIQUE using index "candidates_id_key";

alter table "public"."job_assiatan_chat" add constraint "job_assiatan_chat_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."job_assiatan_chat" validate constraint "job_assiatan_chat_job_id_fkey";

alter table "public"."job_assiatan_chat_messages" add constraint "job_assiatan_chat_messages_job_assiatan_chat_id_fkey" FOREIGN KEY (job_assiatan_chat_id) REFERENCES job_assiatan_chat(id) ON DELETE CASCADE not valid;

alter table "public"."job_assiatan_chat_messages" validate constraint "job_assiatan_chat_messages_job_assiatan_chat_id_fkey";

alter table "public"."outreached_emails" add constraint "outreached_emails_recruiter_user_id_fkey" FOREIGN KEY (recruiter_user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."outreached_emails" validate constraint "outreached_emails_recruiter_user_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_created_by_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_recruiter_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_ukey" UNIQUE using index "recruiter_relation_ukey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_user_id_fkey";

alter table "public"."candidate_search_history" add constraint "candidate_search_history_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_search_history" validate constraint "candidate_search_history_recruiter_id_fkey";

alter table "public"."candidates" add constraint "candidates_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidates" validate constraint "candidates_recruiter_id_fkey";

set check_function_bodies = off;

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

CREATE OR REPLACE FUNCTION public.calculate_resume_score(in_score_json jsonb, app_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    weight_record jsonb;
    total_score numeric := 0;
BEGIN
    -- Fetching weights from the database
    SELECT
        pj.parameter_weights
    INTO
        weight_record
    FROM
        applications ja
    JOIN
        public_jobs pj ON ja.job_id = pj.id
    WHERE
        ja.id = app_id;

    -- Checking if the record exists
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;

    -- Checking and handling missing keys in score_json
    IF NOT (in_score_json->'scores'->>'skills' IS NOT NULL AND in_score_json->'scores'->>'education' IS NOT NULL AND in_score_json->'scores'->>'experience' IS NOT NULL) THEN
        -- Handle missing keys here (set default values or skip the calculation)
        -- For simplicity, we'll set default values to 0 in this example
        RETURN FALSE;
    END IF;

    -- Calculating the total score
    total_score := TRUNC(((in_score_json->'scores'->>'skills')::numeric * COALESCE((weight_record->>'skills')::numeric, 0) +
        (in_score_json->'scores'->>'education')::numeric * COALESCE((weight_record->>'education')::numeric, 0) +
        (in_score_json->'scores'->>'experience')::numeric * COALESCE((weight_record->>'experience')::numeric, 0))/100);

    -- Updating the job_applications table with the calculated score
    UPDATE applications
    SET overall_score = total_score,
    score_json = in_score_json,
    processing_status = 'success'
    WHERE id = app_id;

    -- Returning true for success
    RETURN true;
    -- RETURN total_score;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.createrecuriterrelation(in_user_id uuid, in_recruiter_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
is_admin boolean;
BEGIN
   is_admin := Exists(select 1 from recruiter_user where recruiter_user.user_id = auth.uid() and role = 'admin');
   if is_admin then
      insert into recruiter_relation (user_id, recruiter_id, is_active, created_by) values (in_user_id, in_recruiter_id, true, auth.uid());
   else
      return false;
   end if;
    -- Return the final result as a UUID
    RETURN is_admin;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.createrecuriterrelation(in_user_id uuid, in_recruiter_id uuid, in_is_active boolean)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
is_admin boolean;
BEGIN
   is_admin := Exists(select 1 from recruiter_user where recruiter_user.user_id = auth.uid() and role = 'admin');
   if is_admin then
      insert into recruiter_relation (user_id, recruiter_id, is_active, created_by) values (in_user_id, in_recruiter_id, in_is_active, auth.uid());
   else
      return false;
   end if;
    -- Return the final result as a UUID
    RETURN is_admin;
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

CREATE OR REPLACE FUNCTION public.get_recruiter_name_id(in_application_id uuid)
 RETURNS TABLE(id uuid, name text)
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_message_row RECORD;
BEGIN
    -- Add a new message
    SELECT r.id, r.name INTO new_message_row
    FROM recruiter r
    JOIN public_jobs pj ON pj.recruiter_id = r.id
    JOIN applications a ON a.job_id = pj.id
    WHERE a.id = in_application_id;

    -- Return the inserted row
    RETURN QUERY SELECT new_message_row.id, new_message_row.name;
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

CREATE OR REPLACE FUNCTION public.batchcalcresumejdscore()
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
        SELECT ja.id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.score_json AS jd_score,
           cf.file_url AS resume,
           cf.id AS file_id,
           cf.resume_json AS json_resume,
           cf.resume_text AS resume_text,
           ja.job_id as job_id,
           pj.company as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           0 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.processing_status='not started' and pj.status='published' and ja.candidate_file_id is not null and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 50
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
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

CREATE OR REPLACE FUNCTION public.job_application_filter_sort(jb_id uuid, min_lat double precision DEFAULT 0, min_long double precision DEFAULT 0, max_lat double precision DEFAULT 0, max_long double precision DEFAULT 0, j_status text DEFAULT 'new'::text, from_rec_num numeric DEFAULT 0, end_rec_num numeric DEFAULT 100, min_resume_score numeric DEFAULT '-1'::integer, max_resume_score numeric DEFAULT 100, min_interview_score numeric DEFAULT 0, max_interview_score numeric DEFAULT 100, sort_column_text text DEFAULT 'overall_score'::text, is_sort_desc boolean DEFAULT true, text_search_qry text DEFAULT ''::text, is_locat_filter_on boolean DEFAULT false)
 RETURNS TABLE(job_app json, cand json, candfiles json, assres json, fil_res bigint)
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
      row_to_json(ar) AS assres
    FROM
      applications ja      
      JOIN candidates c ON ja.candidate_id = c.id     
      LEFT JOIN candidate_files cf ON cf.id = ja.candidate_file_id
      LEFT JOIN assessment_results ar ON ar.application_id = ja.id
    WHERE
      ja.job_id = jb_id
      AND ja.status::text = j_status
      AND (ja.overall_score >= min_resume_score AND ja.overall_score <= max_resume_score)
      AND COALESCE(ar.interview_score, 0) BETWEEN min_interview_score AND max_interview_score
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
    count(*) OVER () AS fil_res
  FROM filtered_results fr
ORDER BY
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
    END ASC ,
    CASE 
        WHEN sort_column_text = 'interview_score' AND is_sort_desc THEN (fr.assres->>'interview_score')::numeric
    END DESC,
    CASE 
        WHEN sort_column_text = 'interview_score' AND NOT is_sort_desc THEN (fr.assres->>'interview_score')::numeric
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

CREATE OR REPLACE FUNCTION public.retrybatchcalcresumejdscore()
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
       SELECT ja.id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.score_json AS jd_score,
           cf.file_url AS resume,
           cf.id AS file_id,
           cf.resume_json AS json_resume,
           cf.resume_text AS resume_text,
           ja.job_id as job_id,
           pj.company as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           1 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.processing_status in ('failed') and pj.status='published'  and retry < 1 and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 25
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.secondretrybatchcalcresumejdscore()
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
      SELECT ja.id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.score_json AS jd_score,
           cf.file_url AS resume,
           cf.id AS file_id,
           cf.resume_json AS json_resume,
           cf.resume_text AS resume_text,
           ja.job_id as job_id,
           pj.company as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           2 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.processing_status in ('failed') and pj.status='published'  and retry >= 1 and retry < 2 and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 10
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_resume_score(job_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    job_data record;
    parameter_weights_x jsonb;  -- Fixed parameter_weights for all rows
    result_score numeric;     -- Variable to store the result of get_combined_resume_score
BEGIN
    -- Fetch the fixed parameter_weights from the public_jobs table
    SELECT parameter_weights
    INTO parameter_weights_x
    FROM public_jobs
    WHERE id = job_id;
    -- Check if the parameter_weights were found, and if not, return false
    IF NOT FOUND THEN
        RETURN false;
    END IF;
    FOR job_data IN (
        SELECT score_json, id
        FROM applications
        WHERE applications.job_id = update_resume_score.job_id AND score_json IS NOT NULL
    )
    LOOP
        -- Call your get_combined_resume_score function with jd_score and fixed parameter_weights
        result_score := get_combined_resume_score(job_data.score_json, parameter_weights_x);
        -- Update the same row in the job_applications table with the result
        UPDATE applications
        SET overall_score = result_score
        WHERE id = job_data.id;
    END LOOP;
    -- If the loop completes without errors, return true
    RETURN true;
END $function$
;

grant delete on table "public"."aglint_candidates" to "anon";

grant insert on table "public"."aglint_candidates" to "anon";

grant references on table "public"."aglint_candidates" to "anon";

grant select on table "public"."aglint_candidates" to "anon";

grant trigger on table "public"."aglint_candidates" to "anon";

grant truncate on table "public"."aglint_candidates" to "anon";

grant update on table "public"."aglint_candidates" to "anon";

grant delete on table "public"."aglint_candidates" to "authenticated";

grant insert on table "public"."aglint_candidates" to "authenticated";

grant references on table "public"."aglint_candidates" to "authenticated";

grant select on table "public"."aglint_candidates" to "authenticated";

grant trigger on table "public"."aglint_candidates" to "authenticated";

grant truncate on table "public"."aglint_candidates" to "authenticated";

grant update on table "public"."aglint_candidates" to "authenticated";

grant delete on table "public"."aglint_candidates" to "service_role";

grant insert on table "public"."aglint_candidates" to "service_role";

grant references on table "public"."aglint_candidates" to "service_role";

grant select on table "public"."aglint_candidates" to "service_role";

grant trigger on table "public"."aglint_candidates" to "service_role";

grant truncate on table "public"."aglint_candidates" to "service_role";

grant update on table "public"."aglint_candidates" to "service_role";

grant delete on table "public"."applications" to "anon";

grant insert on table "public"."applications" to "anon";

grant references on table "public"."applications" to "anon";

grant select on table "public"."applications" to "anon";

grant trigger on table "public"."applications" to "anon";

grant truncate on table "public"."applications" to "anon";

grant update on table "public"."applications" to "anon";

grant delete on table "public"."applications" to "authenticated";

grant insert on table "public"."applications" to "authenticated";

grant references on table "public"."applications" to "authenticated";

grant select on table "public"."applications" to "authenticated";

grant trigger on table "public"."applications" to "authenticated";

grant truncate on table "public"."applications" to "authenticated";

grant update on table "public"."applications" to "authenticated";

grant delete on table "public"."applications" to "service_role";

grant insert on table "public"."applications" to "service_role";

grant references on table "public"."applications" to "service_role";

grant select on table "public"."applications" to "service_role";

grant trigger on table "public"."applications" to "service_role";

grant truncate on table "public"."applications" to "service_role";

grant update on table "public"."applications" to "service_role";

grant delete on table "public"."assessment_results" to "anon";

grant insert on table "public"."assessment_results" to "anon";

grant references on table "public"."assessment_results" to "anon";

grant select on table "public"."assessment_results" to "anon";

grant trigger on table "public"."assessment_results" to "anon";

grant truncate on table "public"."assessment_results" to "anon";

grant update on table "public"."assessment_results" to "anon";

grant delete on table "public"."assessment_results" to "authenticated";

grant insert on table "public"."assessment_results" to "authenticated";

grant references on table "public"."assessment_results" to "authenticated";

grant select on table "public"."assessment_results" to "authenticated";

grant trigger on table "public"."assessment_results" to "authenticated";

grant truncate on table "public"."assessment_results" to "authenticated";

grant update on table "public"."assessment_results" to "authenticated";

grant delete on table "public"."assessment_results" to "service_role";

grant insert on table "public"."assessment_results" to "service_role";

grant references on table "public"."assessment_results" to "service_role";

grant select on table "public"."assessment_results" to "service_role";

grant trigger on table "public"."assessment_results" to "service_role";

grant truncate on table "public"."assessment_results" to "service_role";

grant update on table "public"."assessment_results" to "service_role";

grant delete on table "public"."candidate_files" to "anon";

grant insert on table "public"."candidate_files" to "anon";

grant references on table "public"."candidate_files" to "anon";

grant select on table "public"."candidate_files" to "anon";

grant trigger on table "public"."candidate_files" to "anon";

grant truncate on table "public"."candidate_files" to "anon";

grant update on table "public"."candidate_files" to "anon";

grant delete on table "public"."candidate_files" to "authenticated";

grant insert on table "public"."candidate_files" to "authenticated";

grant references on table "public"."candidate_files" to "authenticated";

grant select on table "public"."candidate_files" to "authenticated";

grant trigger on table "public"."candidate_files" to "authenticated";

grant truncate on table "public"."candidate_files" to "authenticated";

grant update on table "public"."candidate_files" to "authenticated";

grant delete on table "public"."candidate_files" to "service_role";

grant insert on table "public"."candidate_files" to "service_role";

grant references on table "public"."candidate_files" to "service_role";

grant select on table "public"."candidate_files" to "service_role";

grant trigger on table "public"."candidate_files" to "service_role";

grant truncate on table "public"."candidate_files" to "service_role";

grant update on table "public"."candidate_files" to "service_role";

grant delete on table "public"."candidate_list" to "anon";

grant insert on table "public"."candidate_list" to "anon";

grant references on table "public"."candidate_list" to "anon";

grant select on table "public"."candidate_list" to "anon";

grant trigger on table "public"."candidate_list" to "anon";

grant truncate on table "public"."candidate_list" to "anon";

grant update on table "public"."candidate_list" to "anon";

grant delete on table "public"."candidate_list" to "authenticated";

grant insert on table "public"."candidate_list" to "authenticated";

grant references on table "public"."candidate_list" to "authenticated";

grant select on table "public"."candidate_list" to "authenticated";

grant trigger on table "public"."candidate_list" to "authenticated";

grant truncate on table "public"."candidate_list" to "authenticated";

grant update on table "public"."candidate_list" to "authenticated";

grant delete on table "public"."candidate_list" to "service_role";

grant insert on table "public"."candidate_list" to "service_role";

grant references on table "public"."candidate_list" to "service_role";

grant select on table "public"."candidate_list" to "service_role";

grant trigger on table "public"."candidate_list" to "service_role";

grant truncate on table "public"."candidate_list" to "service_role";

grant update on table "public"."candidate_list" to "service_role";

grant delete on table "public"."company_search_cache" to "anon";

grant insert on table "public"."company_search_cache" to "anon";

grant references on table "public"."company_search_cache" to "anon";

grant select on table "public"."company_search_cache" to "anon";

grant trigger on table "public"."company_search_cache" to "anon";

grant truncate on table "public"."company_search_cache" to "anon";

grant update on table "public"."company_search_cache" to "anon";

grant delete on table "public"."company_search_cache" to "authenticated";

grant insert on table "public"."company_search_cache" to "authenticated";

grant references on table "public"."company_search_cache" to "authenticated";

grant select on table "public"."company_search_cache" to "authenticated";

grant trigger on table "public"."company_search_cache" to "authenticated";

grant truncate on table "public"."company_search_cache" to "authenticated";

grant update on table "public"."company_search_cache" to "authenticated";

grant delete on table "public"."company_search_cache" to "service_role";

grant insert on table "public"."company_search_cache" to "service_role";

grant references on table "public"."company_search_cache" to "service_role";

grant select on table "public"."company_search_cache" to "service_role";

grant trigger on table "public"."company_search_cache" to "service_role";

grant truncate on table "public"."company_search_cache" to "service_role";

grant update on table "public"."company_search_cache" to "service_role";

grant delete on table "public"."job_assiatan_chat" to "anon";

grant insert on table "public"."job_assiatan_chat" to "anon";

grant references on table "public"."job_assiatan_chat" to "anon";

grant select on table "public"."job_assiatan_chat" to "anon";

grant trigger on table "public"."job_assiatan_chat" to "anon";

grant truncate on table "public"."job_assiatan_chat" to "anon";

grant update on table "public"."job_assiatan_chat" to "anon";

grant delete on table "public"."job_assiatan_chat" to "authenticated";

grant insert on table "public"."job_assiatan_chat" to "authenticated";

grant references on table "public"."job_assiatan_chat" to "authenticated";

grant select on table "public"."job_assiatan_chat" to "authenticated";

grant trigger on table "public"."job_assiatan_chat" to "authenticated";

grant truncate on table "public"."job_assiatan_chat" to "authenticated";

grant update on table "public"."job_assiatan_chat" to "authenticated";

grant delete on table "public"."job_assiatan_chat" to "service_role";

grant insert on table "public"."job_assiatan_chat" to "service_role";

grant references on table "public"."job_assiatan_chat" to "service_role";

grant select on table "public"."job_assiatan_chat" to "service_role";

grant trigger on table "public"."job_assiatan_chat" to "service_role";

grant truncate on table "public"."job_assiatan_chat" to "service_role";

grant update on table "public"."job_assiatan_chat" to "service_role";

grant delete on table "public"."job_assiatan_chat_messages" to "anon";

grant insert on table "public"."job_assiatan_chat_messages" to "anon";

grant references on table "public"."job_assiatan_chat_messages" to "anon";

grant select on table "public"."job_assiatan_chat_messages" to "anon";

grant trigger on table "public"."job_assiatan_chat_messages" to "anon";

grant truncate on table "public"."job_assiatan_chat_messages" to "anon";

grant update on table "public"."job_assiatan_chat_messages" to "anon";

grant delete on table "public"."job_assiatan_chat_messages" to "authenticated";

grant insert on table "public"."job_assiatan_chat_messages" to "authenticated";

grant references on table "public"."job_assiatan_chat_messages" to "authenticated";

grant select on table "public"."job_assiatan_chat_messages" to "authenticated";

grant trigger on table "public"."job_assiatan_chat_messages" to "authenticated";

grant truncate on table "public"."job_assiatan_chat_messages" to "authenticated";

grant update on table "public"."job_assiatan_chat_messages" to "authenticated";

grant delete on table "public"."job_assiatan_chat_messages" to "service_role";

grant insert on table "public"."job_assiatan_chat_messages" to "service_role";

grant references on table "public"."job_assiatan_chat_messages" to "service_role";

grant select on table "public"."job_assiatan_chat_messages" to "service_role";

grant trigger on table "public"."job_assiatan_chat_messages" to "service_role";

grant truncate on table "public"."job_assiatan_chat_messages" to "service_role";

grant update on table "public"."job_assiatan_chat_messages" to "service_role";

grant delete on table "public"."recruiter_relation" to "anon";

grant insert on table "public"."recruiter_relation" to "anon";

grant references on table "public"."recruiter_relation" to "anon";

grant select on table "public"."recruiter_relation" to "anon";

grant trigger on table "public"."recruiter_relation" to "anon";

grant truncate on table "public"."recruiter_relation" to "anon";

grant update on table "public"."recruiter_relation" to "anon";

grant delete on table "public"."recruiter_relation" to "authenticated";

grant insert on table "public"."recruiter_relation" to "authenticated";

grant references on table "public"."recruiter_relation" to "authenticated";

grant select on table "public"."recruiter_relation" to "authenticated";

grant trigger on table "public"."recruiter_relation" to "authenticated";

grant truncate on table "public"."recruiter_relation" to "authenticated";

grant update on table "public"."recruiter_relation" to "authenticated";

grant delete on table "public"."recruiter_relation" to "service_role";

grant insert on table "public"."recruiter_relation" to "service_role";

grant references on table "public"."recruiter_relation" to "service_role";

grant select on table "public"."recruiter_relation" to "service_role";

grant trigger on table "public"."recruiter_relation" to "service_role";

grant truncate on table "public"."recruiter_relation" to "service_role";

grant update on table "public"."recruiter_relation" to "service_role";

create policy "authenticated insert access only"
on "public"."applications"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM public_jobs
  WHERE (public_jobs.id = applications.job_id))));


create policy "authenticated_read_access_only"
on "public"."applications"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM public_jobs
  WHERE (public_jobs.id = applications.job_id))));


create policy "authenticated_update_access"
on "public"."applications"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM public_jobs
  WHERE (public_jobs.id = applications.job_id))))
with check ((EXISTS ( SELECT 1
   FROM public_jobs
  WHERE (public_jobs.id = applications.job_id))));


create policy "authenticated_insert_access"
on "public"."candidate_files"
as permissive
for insert
to authenticated
with check (((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.candidate_file_id = applications.id))) OR (EXISTS ( SELECT 1
   FROM candidates
  WHERE (candidates.id = candidate_files.candidate_id)))));


create policy "authenticated_read_access_only"
on "public"."candidate_files"
as permissive
for select
to authenticated
using (((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.candidate_file_id = applications.id))) OR (EXISTS ( SELECT 1
   FROM candidates
  WHERE (candidates.id = candidate_files.candidate_id)))));


create policy "authenticated_access_only"
on "public"."candidates"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = recruiter.id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = recruiter.id))));


create policy "autheticated_insert_access"
on "public"."candidates"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = recruiter.id))));


create policy "create policy ""authenticated_and_admin_access_only"""
on "public"."recruiter"
as permissive
for all
to authenticated
using ((id IN ( SELECT recruiter_relation.recruiter_id
   FROM recruiter_relation
  WHERE (recruiter_relation.user_id = auth.uid()))))
with check ((EXISTS ( SELECT 1
   FROM recruiter_user
  WHERE ((recruiter_user.user_id = auth.uid()) AND (recruiter_user.role = 'admin'::recruiter_roles)))));


create policy "autenticated_write_only"
on "public"."recruiter_relation"
as permissive
for all
to authenticated
using (((user_id = auth.uid()) OR (created_by = auth.uid())))
with check (false);


create policy "authenticated_access_only"
on "public"."recruiter_user"
as permissive
for all
to authenticated
using (((auth.uid() = user_id) OR (user_id IN ( SELECT recruiter_relation.user_id
   FROM recruiter_relation
  WHERE (recruiter_relation.created_by = auth.uid())))))
with check (((auth.uid() = user_id) OR (user_id IN ( SELECT recruiter_relation.user_id
   FROM recruiter_relation
  WHERE (recruiter_relation.created_by = auth.uid())))));



