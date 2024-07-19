create extension if not exists "citext" with schema "public" version '1.6';

create type "public"."activity_type" as enum ('aglint', 'user', 'candidate');

create type "public"."agent_type" as enum ('scheduler', 'job', 'sourcing', 'screening');

create type "public"."agent_types" as enum ('scheduler', 'screening', 'job_assistant', 'sourcing');

create type "public"."application_logger" as enum ('email_agent', 'phone_agent', 'user', 'system', 'candidate');

create type "public"."application_match" as enum ('top_match', 'good_match', 'average_match', 'poor_match', 'not_a_match', 'unknown_match');

create type "public"."application_processing_status" as enum ('not started', 'processing', 'failed', 'success');

create type "public"."application_source" as enum ('ashby', 'lever', 'greenhouse', 'resume_upload', 'manual_upload', 'csv_upload', 'apply_link', 'candidate_database');

create type "public"."application_status" as enum ('new', 'assessment', 'qualified', 'disqualified', 'screening', 'interview');

create type "public"."assessment_mode" as enum ('classic', 'verbal', 'visual');

create type "public"."cancel_type" as enum ('reschedule', 'declined');

create type "public"."db_search_type" as enum ('aglint', 'candidate');

create type "public"."email_fetch_status" as enum ('not fetched', 'success', 'unable to fetch');

create type "public"."email_slack_types" as enum ('interviewEnd_slack_interviewers', 'interviewerConfirmation_slack_interviewers', 'interviewStart_slack_interviewers', 'agent_email_candidate', 'applicantReject_email_applicant', 'applicationRecieved_email_applicant', 'confInterview_email_organizer', 'confirmInterview_email_applicant', 'debrief_email_interviewer', 'interReschedReq_email_recruiter', 'interviewCancel_email_applicant', 'InterviewCancelReq_email_recruiter', 'interviewReschedule_email_applicant', 'interviewStart_email_applicant', 'interviewStart_email_interviewers', 'phoneScreen_email_candidate', 'phoneScreenRemind_email_applicant', 'selfScheduleReminder_email_applicant', 'sendAvailReqReminder_email_applicant', 'sendSelfScheduleRequest_email_applicant', 'sendAvailabilityRequest_email_applicant', 'availabilityReqResend_email_candidate', 'interviewDetails_calender_interviewer', 'rescheduleSelfSchedule_email_applicant', 'interviewStart_email_organizer', 'meetingDeclined_email_organizer', 'meetingAccepted_email_organizer', 'candidateBook_slack_interviewerForFeedback', 'candidateBook_email_interviewerForFeedback', 'interviewEnd_slack_interviewerForFeedback', 'interviewEnd_email_interviewerForFeedback', 'candidateBook_slack_interviewerForConfirmation');

create type "public"."employment_type_enum" as enum ('fulltime', 'parttime', 'contractor');

create type "public"."file_type" as enum ('resume', 'coverletter', 'cv', 'image');

create type "public"."icon_status_activity" as enum ('success', 'waiting', 'error');

create type "public"."interview_schedule_status" as enum ('waiting', 'confirmed', 'completed', 'cancelled', 'reschedule', 'not_scheduled');

create type "public"."interview_schedule_type" as enum ('in_person_meeting', 'google_meet', 'phone_call', 'zoom');

create type "public"."interviewer_type" as enum ('qualified', 'shadow', 'reverse_shadow');

create type "public"."meeting_flow" as enum ('self_scheduling', 'candidate_request', 'debrief', 'mail_agent', 'phone_agent');

create type "public"."modules" as enum ('standard', 'scheduler', 'assessment', 'jobs');

create type "public"."permissions_type" as enum ('jobs_create', 'jobs_read', 'jobs_update', 'jobs_delete', 'jobs_publish', 'jobs_unpublish', 'jobs_archive', 'jobs_restore', 'jobs_assignHiringManager', 'jobs_assignRecruiter', 'jobs_assignCoordinator', 'jobs_assignSourcer', 'candidates_add', 'candidates_read', 'candidates_update', 'candidates_delete', 'candidates_moveStage', 'profileScore_view', 'profileScore_update', 'interviews_schedule', 'interviews_read', 'interviews_update', 'interviews_delete', 'reports_generate', 'reports_view', 'reports_export', 'settings_view', 'settings_update', 'tasks_enabled', 'jobs_enabled', 'scheduler_enabled', 'sourcing_enabled', 'phone_screening_enabled', 'assessment_enabled', 'integrations_enabled', 'company_setting_enabled', 'workflow_enabled', 'workflow_create', 'workflow_read', 'workflow_update', 'workflow_delete', 'team_enabled', 'team_create', 'team_read', 'team_update', 'team_delete', 'tasks_create', 'tasks_read', 'tasks_update', 'tasks_delete', 'scheduler_create', 'scheduler_read', 'scheduler_update', 'scheduler_delete', 'scheduler_request_availability', 'scheduler_send_scheduling', 'scheduler_interview_types_create', 'scheduler_interview_types_read', 'scheduler_interview_types_update', 'scheduler_interviewer_edit', 'settings_scheduler_enable', 'settings_scheduler_update', 'settings_company_enable', 'settings_company_update', 'settings_team_enable', 'settings_team_update', 'settings_roles_enable', 'settings_roles_update');

create type "public"."progress_type" as enum ('standard', 'interview_schedule', 'email_messages', 'call_completed', 'call_failed', 'email_failed', 'call_disconnected', 'email_follow_up', 'call_follow_up', 'email_follow_up_reminder', 'call_follow_up_reminder', 'request_availability_list', 'request_availability', 'self_schedule', 'send_email', 'request_submitted', 'schedule', 'closed', 'completed');

create type "public"."public_job_status" as enum ('draft', 'published', 'closed');

create type "public"."public_job_type" as enum ('contract', 'full time', 'part time', 'temporary', 'volunteer', 'internship');

create type "public"."public_job_workplace" as enum ('hybrid', 'on site', 'off site');

create type "public"."question_level" as enum ('basic', 'intermediate', 'advanced');

create type "public"."question_type" as enum ('scq', 'mcq', 'qna', 'code');

create type "public"."recruiter_rolesx" as enum ('admin', 'member', 'interviewer', 'scheduler', 'recruiter');

create type "public"."resume_processing_state" as enum ('unavailable', 'fetching', 'processing', 'unparsable', 'processed');

create type "public"."sender_type" as enum ('aglint', 'you', 'system', 'user');

create type "public"."session_accepted_status" as enum ('waiting', 'accepted', 'declined', 'request_reschedule');

create type "public"."session_type" as enum ('panel', 'individual', 'debrief');

create type "public"."status_training" as enum ('qualified', 'training');

create type "public"."sub_task_status" as enum ('completed', 'pending', 'in_progress', 'failed', 'closed');

create type "public"."task_agent_type" as enum ('phone', 'email', 'job');

create type "public"."task_priority" as enum ('high', 'low', 'medium');

create type "public"."task_status" as enum ('pending', 'in_progress', 'completed', 'closed', 'not_started', 'scheduled', 'cancelled', 'overdue', 'on_hold', 'failed');

create type "public"."task_type_enum" as enum ('schedule', 'training', 'empty', 'availability', 'self_schedule');

create type "public"."template_type" as enum ('cognitive', 'language', 'personality', 'culture', 'programming', 'role', 'situational', 'software', 'typing');

create type "public"."user_roles" as enum ('admin', 'recruiter', 'interviewer', 'recruiting_coordinator', 'sourcer', 'hiring_manager');

create type "public"."workflow_phase" as enum ('before', 'after', 'now');

create type "public"."workflow_trigger" as enum ('selfScheduleReminder', 'interviewStart', 'sendAvailReqReminder', 'interviewerConfirmation', 'interviewEnd', 'meetingDeclined', 'meetingAccepted', 'candidateBook');

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


create table "public"."ai_videos" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "video_id" character varying,
    "video_url" character varying,
    "file_url" character varying,
    "error" jsonb
);


create table "public"."application_email_status" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid not null,
    "email" email_slack_types not null
);


create table "public"."application_logs" (
    "created_at" timestamp with time zone not null default now(),
    "title" text,
    "task_id" uuid,
    "description" text,
    "application_id" uuid not null,
    "id" uuid not null default gen_random_uuid(),
    "created_by" uuid,
    "metadata" jsonb,
    "logged_by" application_logger not null default 'system'::application_logger,
    "module" modules not null default 'standard'::modules
);


create table "public"."application_reference" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "ats_json" json not null,
    "is_processed" boolean not null default false,
    "recruiter_id" uuid not null
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
    "candidate_id" uuid,
    "overall_interview_score" numeric not null default '-1'::numeric,
    "converted_at" timestamp with time zone,
    "feedback" jsonb,
    "bookmarked" boolean not null default false,
    "is_new" boolean not null default false,
    "source" application_source not null default 'manual_upload'::application_source,
    "processing_started_at" timestamp with time zone
);


alter table "public"."applications" enable row level security;

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


create table "public"."assessment_results" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "duration" numeric,
    "application_id" uuid not null,
    "responses" jsonb[],
    "result" jsonb[],
    "assessment_id" uuid,
    "is_submitted" boolean default false
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


create table "public"."cancel_data" (
    "row_to_json" json
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


create table "public"."candidate_request_availability" (
    "created_at" timestamp with time zone not null default now(),
    "date_range" jsonb default '{"end_date": null, "start_date": null}'::jsonb,
    "availability" jsonb default '{}'::jsonb,
    "number_of_days" integer,
    "number_of_slots" bigint,
    "is_task_created" boolean default true,
    "total_slots" bigint,
    "application_id" uuid not null,
    "recruiter_id" uuid not null,
    "slots" jsonb,
    "id" uuid not null default gen_random_uuid(),
    "user_timezone" text,
    "booking_confirmed" boolean not null default false,
    "visited" boolean default false
);


create table "public"."candidate_search_history" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid not null,
    "is_search_jd" boolean default false,
    "query_json" jsonb,
    "search_results" jsonb[] default '{}'::jsonb[],
    "bookmarked_candidates" text[] default '{}'::text[],
    "search_query" text,
    "db_search" db_search_type default 'candidate'::db_search_type,
    "candidates" text[] not null default '{}'::text[],
    "used_credits" jsonb not null default '{"email_credits": 0, "export_credits": 0, "mobile_credits": 0}'::jsonb
);


create table "public"."candidates" (
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid,
    "email" citext not null,
    "avatar" text,
    "city" text,
    "state" text,
    "country" text,
    "experience_in_months" numeric,
    "last_updated" timestamp with time zone not null default now(),
    "id" uuid not null default uuid_generate_v4(),
    "first_name" citext not null default 'not set'::citext,
    "last_name" citext,
    "geolocation" geometry,
    "linkedin" text,
    "phone" text,
    "current_company" text,
    "timezone" text,
    "current_job_title" text
);


alter table "public"."candidates" enable row level security;

create table "public"."company_email_template" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid not null default gen_random_uuid(),
    "subject" text not null,
    "body" text not null,
    "from_name" text,
    "type" email_slack_types not null
);


create table "public"."company_search_cache" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "company_name" text not null,
    "website_url" text,
    "search_result" jsonb not null
);


create table "public"."env" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "value" text
);


create table "public"."function_url" (
    "value" text
);


create table "public"."greenhouse_reference" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid not null,
    "public_job_id" uuid not null,
    "posting_id" text not null,
    "greenhouse_id" text not null,
    "resume" text,
    "resume_saved" boolean not null default false
);


create table "public"."integrations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid not null default gen_random_uuid(),
    "schedule_agent_email" text default 'agent@ai.aglinthq.com'::text,
    "twilio_phone_number" text default '+12512066348'::text,
    "domain_admin_email" text,
    "service_json" text
);


create table "public"."interview_filter_json" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "filter_json" jsonb not null,
    "schedule_id" uuid not null,
    "session_ids" uuid[] not null default '{}'::uuid[],
    "created_by" uuid default auth.uid(),
    "selected_options" jsonb[],
    "viewed_on" timestamp with time zone,
    "confirmed_on" timestamp with time zone
);


create table "public"."interview_meeting" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "interview_schedule_id" uuid not null,
    "meeting_json" jsonb,
    "status" interview_schedule_status not null default 'confirmed'::interview_schedule_status,
    "instructions" text,
    "meeting_link" text,
    "confirmed_date" timestamp with time zone,
    "start_time" timestamp with time zone,
    "end_time" timestamp with time zone,
    "cal_event_id" text,
    "candidate_feedback" jsonb,
    "organizer_id" uuid,
    "meeting_flow" meeting_flow not null default 'self_scheduling'::meeting_flow
);


create table "public"."interview_module" (
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "recruiter_id" uuid not null,
    "id" uuid not null default gen_random_uuid(),
    "duration_available" jsonb default '{"activeDuration": 30, "availabletimeSlots": []}'::jsonb,
    "description" text,
    "settings" jsonb,
    "instructions" text,
    "department" text,
    "created_by" uuid default auth.uid(),
    "is_archived" boolean not null default false
);


create table "public"."interview_module_relation" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "module_id" uuid not null,
    "pause_json" jsonb,
    "training_status" status_training not null default 'qualified'::status_training
);


create table "public"."interview_plan" (
    "created_at" timestamp with time zone not null default now(),
    "id" uuid not null default gen_random_uuid(),
    "job_id" uuid not null
);


create table "public"."interview_schedule" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid not null,
    "schedule_name" text not null,
    "created_by" uuid not null default auth.uid(),
    "calender_event_api_status" jsonb default '{"error": null, "api_status": "not_started"}'::jsonb,
    "coordinator_id" uuid,
    "is_get_more_option" boolean not null default false,
    "is_completed" boolean not null default false,
    "recruiter_id" uuid not null
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
    "meeting_id" uuid,
    "members_meta" jsonb not null default '{"sourcer": false, "recruiter": false, "hiring_manager": false, "previous_interviewers": false, "recruiting_coordinator": false}'::jsonb
);


create table "public"."interview_session_cancel" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "session_relation_id" uuid,
    "reason" text not null,
    "is_resolved" boolean not null default false,
    "session_id" uuid not null,
    "schedule_id" uuid,
    "type" cancel_type not null default 'declined'::cancel_type,
    "other_details" jsonb,
    "cancel_user_id" uuid,
    "is_ignored" boolean not null default false
);


create table "public"."interview_session_relation" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null,
    "interviewer_type" status_training not null default 'qualified'::status_training,
    "interview_module_relation_id" uuid,
    "training_type" interviewer_type,
    "user_id" uuid,
    "is_confirmed" boolean not null default false,
    "feedback" jsonb,
    "accepted_status" session_accepted_status not null default 'waiting'::session_accepted_status
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


create table "public"."job_email_template" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "job_id" uuid not null,
    "subject" text,
    "body" text,
    "from_name" text,
    "type" email_slack_types not null
);


create table "public"."job_reference" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "ats_json" jsonb,
    "public_job_id" uuid not null,
    "ats" text,
    "ats_job_id" text not null,
    "recruiter_id" uuid not null
);


create table "public"."lever_job_reference" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "last_synced_at" timestamp without time zone default now(),
    "posting_id" uuid not null,
    "job_id" uuid not null,
    "recruiter_id" uuid
);


create table "public"."lever_reference" (
    "created_at" timestamp with time zone not null default now(),
    "last_synced" timestamp with time zone not null default now(),
    "application_id" uuid not null,
    "opportunity_id" uuid not null,
    "posting_id" uuid not null,
    "public_job_id" uuid not null,
    "stage" text,
    "feedback" jsonb
);


create table "public"."logs" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "recruiter_id" uuid,
    "user_id" uuid,
    "method" text,
    "type" text not null,
    "status" text not null,
    "parent_log_id" bigint,
    "meta" jsonb,
    "message" text
);


create table "public"."new_tasks" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "due_date" timestamp with time zone,
    "assignee" uuid[] not null,
    "start_date" timestamp with time zone default now(),
    "application_id" uuid,
    "recruiter_id" uuid,
    "schedule_date_range" jsonb,
    "created_by" uuid not null,
    "type" task_type_enum default 'schedule'::task_type_enum,
    "status" task_status not null default 'not_started'::task_status,
    "agent" task_agent_type,
    "filter_id" uuid,
    "priority" task_priority not null default 'medium'::task_priority,
    "task_owner" uuid,
    "trigger_count" numeric not null default '0'::numeric,
    "task_action" jsonb default '{}'::jsonb,
    "request_availability_id" uuid
);


create table "public"."new_tasks_progress" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "created_by" jsonb not null,
    "progress_type" progress_type not null default 'standard'::progress_type,
    "jsonb_data" jsonb,
    "task_id" uuid not null,
    "title_meta" jsonb default '{}'::jsonb
);


create table "public"."notify_me" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp without time zone default now(),
    "email" text not null,
    "job_id" text,
    "job_title" text
);


create table "public"."outreached_emails" (
    "id" bigint generated by default as identity not null,
    "candidate_id" text not null,
    "email" jsonb not null default '{}'::jsonb,
    "email_sent" boolean not null default false,
    "recruiter_user_id" uuid not null
);


create table "public"."permissions" (
    "id" bigint generated by default as identity not null,
    "name" permissions_type not null,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "is_enable" boolean default true,
    "description" text,
    "title" text not null,
    "dependency_tree" jsonb not null default '{"child": [], "parent": null, "sibling": null}'::jsonb
);


create table "public"."plan_count" (
    "count" bigint
);


create table "public"."public_jobs" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "company_details" text,
    "overview" text,
    "logo" text,
    "company" text,
    "location" text,
    "job_title" text,
    "description" text,
    "skills" text[],
    "slug" text not null default ''::text,
    "job_type" public_job_type default 'full time'::public_job_type,
    "workplace_type" public_job_workplace default 'on site'::public_job_workplace,
    "screening_setting" jsonb default '{}'::jsonb,
    "screening_questions" jsonb[] default ARRAY['{"id": "_TtFCnB4eaNdK5RZ-LsAL", "copy": "Skill", "category": "skill", "questions": []}'::jsonb, '{"id": "OHA290kmXtmow8f85UDWs", "copy": "Behavior", "category": "behavior", "questions": []}'::jsonb, '{"id": "LTezJA4H_rfZKdt1Rll9-", "copy": "communication", "category": "communication", "questions": []}'::jsonb, '{"id": "Myjsxafr-GsUMSO4O2-bJ", "copy": "Performance", "category": "performance", "questions": []}'::jsonb, '{"id": "wQcmD1Y72rtd4cMuk2CG1", "copy": "Education", "category": "education", "questions": []}'::jsonb, '{"id": "thq14SF4XYQk_XgTEx61e", "copy": "General", "category": "general", "questions": []}'::jsonb],
    "job_criteria" jsonb default '{}'::jsonb,
    "posted_by" text not null default 'Aglint'::text,
    "active_status" jsonb not null default '{"closed": {"isActive": false, "timeStamp": null}, "sourcing": {"isActive": false, "timeStamp": null}, "interviewing": {"isActive": false, "timeStamp": null}}'::jsonb,
    "updated_at" timestamp without time zone default now(),
    "department" text,
    "recruiter_id" uuid not null,
    "new_screening_setting" jsonb not null default '{"interview": {"isManual": true, "qualificationRange": null}, "screening": {"isManual": true, "qualificationRange": null}, "interviewMail": {"isManual": true, "timestamp": null}, "feedbackVisible": false, "disqualifiedMail": {"isManual": true, "timestamp": null}}'::jsonb,
    "parameter_weights" jsonb not null default '{"skills": 0, "education": 0, "experience": 0}'::jsonb,
    "jd_json" jsonb,
    "end_video" jsonb,
    "intro_videos" jsonb,
    "start_video" jsonb,
    "video_assessment" boolean not null default false,
    "draft" jsonb,
    "status" public_job_status not null default 'draft'::public_job_status,
    "interview_instructions" text,
    "assessment" boolean default false,
    "is_ats_sync" boolean not null default false,
    "phone_screening" jsonb,
    "jd_changed" boolean default false,
    "phone_screen_enabled" boolean default false,
    "job_details_embedding" vector,
    "experience_in_months" numeric,
    "location_json" jsonb,
    "screening_template" uuid,
    "interview_success" text,
    "interview_plan" jsonb,
    "scoring_criteria_loading" boolean not null default false,
    "hiring_manager" uuid,
    "recruiter" uuid,
    "recruiting_coordinator" uuid,
    "sourcer" uuid,
    "interview_coordinator" uuid,
    "interview_plan_warning_ignore" boolean not null default false,
    "interview_session_warning_ignore" boolean not null default false
);


alter table "public"."public_jobs" enable row level security;

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


create table "public"."recruiter" (
    "id" uuid not null default uuid_generate_v4(),
    "recruiter_type" text,
    "name" text,
    "email" text,
    "company_website" text,
    "industry" text,
    "logo" text,
    "phone_number" text,
    "primary_contact" jsonb,
    "hr_contact" jsonb,
    "available_roles" text[] not null default '{}'::text[],
    "departments" text[] not null default '{}'::text[],
    "technology_score" text[] not null default '{}'::text[],
    "company_overview" text,
    "e_o_statement" text,
    "application_process" text,
    "m_v_statement" text,
    "employment_type" jsonb not null default '{"contract": true, "fulltime": true, "parttime": true, "temporary": true, "volunteer": true, "internship": true}'::jsonb,
    "workplace_type" jsonb not null default '{"hybrid": true, "onsite": true, "offsite": true}'::jsonb,
    "company_values" text,
    "benefits" text,
    "employee_size" text,
    "office_locations" jsonb[] default '{}'::jsonb[],
    "socials" jsonb default '{"custom": {}, "twitter": "", "youtube": "", "facebook": "", "linkedin": "", "instagram": ""}'::jsonb,
    "lever_key" text,
    "ai_avatar" jsonb,
    "audio_avatar_id" numeric not null default '0'::numeric,
    "video_assessment" boolean default false,
    "ats_familiar" text,
    "use_of_purpose" jsonb,
    "recruiter_active" boolean default false,
    "greenhouse_key" text,
    "assistant_id" text,
    "ashby_key" text,
    "ashby_sync_token" text,
    "ashby_last_synced" timestamp with time zone,
    "created_at" timestamp with time zone not null default now(),
    "service_json" text,
    "scheduling_settings" jsonb default '{"timeZone": {"utc": "-08:00", "name": "(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle", "label": "America/Los_Angeles (GMT-08:00)", "tzCode": "America/Los_Angeles"}, "break_hour": {"end_time": "13:30", "start_time": "13:00"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "Juneteenth National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Hours", "value": 4}, "weeklyLimit": {"type": "Hours", "value": 20}}, "debrief_defaults": {"sourcer": false, "recruiter": false, "hiring_manager": false, "previous_interviewers": false, "recruiting_coordinator": false}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "outOfOffice": ["Maternity Leave", "Vacation", "PTO", "Out of Office"], "SoftConflicts": ["Daily Standup", "Sync Up", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"], "recruitingBlocks": ["Dedicated Recruiting", "Recruiting Block"]}, "isAutomaticTimeZone": false}'::jsonb,
    "zoom_auth" text,
    "google_workspace_domain" text,
    "scheduling_reason" jsonb default '{"internal": {"decline": ["Conflict with Another Meeting", "Unexpected Urgency", "Travel Delays or Issues", "Technical Difficulties", "Other"], "cancellation": ["Position Filled", "Budget Constraints", "Reevaluation of Hiring Needs", "Other"], "rescheduling": ["Conflict with Another Meeting", "Unexpected Urgency", "Travel Delays or Issues", "Technical Difficulties", "Other"]}, "candidate": {"cancellation": ["Conflicting Schedule", "Health Reasons", "Unexpected Emergency", "Job Offer Accepted", "Other"], "rescheduling": ["Request for a Different Time", "Request for a Different Date", "Additional Preparation Needed", "Change of Interview Mode", "Other"]}}'::jsonb,
    "domain_admin_email" text
);


alter table "public"."recruiter" enable row level security;

create table "public"."recruiter_relation" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid not null,
    "user_id" uuid not null,
    "is_active" boolean not null default false,
    "created_by" uuid not null default auth.uid(),
    "manager_id" uuid,
    "role" user_roles not null,
    "role_id" uuid
);


alter table "public"."recruiter_relation" enable row level security;

create table "public"."recruiter_user" (
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "first_name" text,
    "last_name" text,
    "email" text,
    "profile_image" text,
    "phone" text,
    "joined_at" timestamp with time zone default now(),
    "join_status" text not null default 'invited'::text,
    "position" text,
    "email_auth" jsonb,
    "email_outreach_templates" jsonb[],
    "schedule_auth" jsonb,
    "scheduling_settings" jsonb default '{"timeZone": {"utc": "-08:00", "name": "(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle", "label": "America/Los_Angeles (GMT-08:00)", "tzCode": "America/Los_Angeles"}, "break_hour": {"end_time": "13:30", "start_time": "13:00"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "Juneteenth National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Hours", "value": 4}, "weeklyLimit": {"type": "Hours", "value": 20}}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "outOfOffice": ["Maternity leave", "vacation", "pto", "out of office", "ooo"], "SoftConflicts": ["Daily Standup", "Sync Up", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"], "recruitingBlocks": ["dedicated recruiting", "Recruiting Block"]}, "isAutomaticTimeZone": false}'::jsonb,
    "department" text,
    "interview_location" text,
    "employment" employment_type_enum not null default 'fulltime'::employment_type_enum,
    "is_suspended" boolean not null default false,
    "linked_in" text
);


alter table "public"."recruiter_user" enable row level security;

create table "public"."request_integration_tool" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid default gen_random_uuid(),
    "tool_name" text,
    "description" text
);


create table "public"."request_session_relation" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null,
    "request_availability_id" uuid not null
);


create table "public"."role_permissions" (
    "id" uuid not null default gen_random_uuid(),
    "role_id" uuid not null,
    "permission_id" integer not null,
    "recruiter_id" uuid not null
);


create table "public"."roles" (
    "id" uuid not null default uuid_generate_v4(),
    "recruiter_id" uuid not null,
    "name" text not null,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now(),
    "description" text
);


create table "public"."rp_logs" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid not null,
    "logs" jsonb not null default '{}'::jsonb
);


alter table "public"."rp_logs" enable row level security;

create table "public"."rp_token_usage" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid not null,
    "token_used_json" jsonb,
    "total_token_used" numeric,
    "task" text
);


alter table "public"."rp_token_usage" enable row level security;

create table "public"."scheduling_agent_chat_history" (
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid,
    "job_id" uuid not null,
    "chat_history" jsonb[] not null default '{}'::jsonb[],
    "company_id" uuid,
    "filter_json_id" uuid not null,
    "task_id" uuid,
    "agent_processing" boolean not null default false,
    "thread_id" uuid not null,
    "email_from_name" text not null,
    "email_subject" text not null
);


alter table "public"."scheduling_agent_chat_history" enable row level security;

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


create table "public"."session_count" (
    "count" bigint
);


create table "public"."sessions_count" (
    "count" bigint
);


create table "public"."support_groups" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now(),
    "user_ids" uuid[] not null default '{}'::uuid[],
    "company_id" uuid
);


create table "public"."support_ticket" (
    "idx" uuid not null default uuid_generate_v4(),
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now(),
    "user_id" uuid,
    "company_id" uuid,
    "job_id" uuid not null,
    "title" text not null,
    "type" text not null,
    "action_pending" jsonb not null default '{}'::jsonb,
    "assign_to" uuid,
    "content" jsonb[] not null default '{}'::jsonb[],
    "state" text not null default 'created'::text,
    "priority" text not null default 'low'::text,
    "user_name" text not null,
    "email_updates" boolean not null default false,
    "email" text,
    "attachments" text[],
    "support_group_id" uuid,
    "application_id" uuid,
    "id" text not null default ''::text
);


create table "public"."task_session_relation" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null,
    "task_id" uuid not null
);


create table "public"."template_question_relation" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "template_id" uuid not null,
    "question_id" uuid not null,
    "order" numeric
);


create table "public"."threads" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "thread_id" text,
    "assistant_id" text,
    "candidate_name" text,
    "candidate_email" text,
    "candidate_phone" text,
    "chat_end" boolean,
    "applied" boolean,
    "file_url" text,
    "document_text" text,
    "designation" text
);


create table "public"."workflow" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "trigger" workflow_trigger not null,
    "phase" workflow_phase not null,
    "interval" numeric not null default '0'::numeric,
    "title" text,
    "recruiter_id" uuid not null,
    "auto_connect" boolean not null default false,
    "description" text
);


create table "public"."workflow_action" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workflow_id" uuid not null default gen_random_uuid(),
    "order" numeric not null,
    "payload" jsonb,
    "email_template_id" uuid not null
);


create table "public"."workflow_action_logs" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "tries" numeric not null default '0'::numeric,
    "status" application_processing_status not null default 'not started'::application_processing_status,
    "workflow_id" uuid not null,
    "workflow_action_id" uuid not null,
    "meta" jsonb,
    "execute_at" timestamp with time zone not null
);


create table "public"."workflow_job_relation" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "job_id" uuid not null default gen_random_uuid(),
    "workflow_id" uuid not null default gen_random_uuid()
);


CREATE UNIQUE INDEX "Threads_pkey" ON public.threads USING btree (id);

CREATE UNIQUE INDEX aglint_candidates_pkey ON public.aglint_candidates USING btree (aglint_id);

CREATE UNIQUE INDEX ai_videos_pkey ON public.ai_videos USING btree (id);

CREATE UNIQUE INDEX application_email_status_pkey ON public.application_email_status USING btree (id);

CREATE UNIQUE INDEX application_logs_pkey ON public.application_logs USING btree (id);

CREATE UNIQUE INDEX application_reference_pkey ON public.application_reference USING btree (id);

CREATE INDEX applications_candidate_file_id_idx ON public.applications USING btree (candidate_file_id);

CREATE INDEX applications_candidate_id_idx ON public.applications USING btree (candidate_id);

CREATE INDEX applications_job_id_idx ON public.applications USING btree (job_id);

CREATE UNIQUE INDEX assessment_job_relation_pkey ON public.assessment_job_relation USING btree (id);

CREATE UNIQUE INDEX assessment_pkey ON public.assessment USING btree (id);

CREATE UNIQUE INDEX assessment_question_pkey ON public.assessment_question USING btree (id);

CREATE UNIQUE INDEX assessment_template_pkey ON public.assessment_template USING btree (id);

CREATE UNIQUE INDEX candidate_list_pkey ON public.candidate_list USING btree (id);

CREATE UNIQUE INDEX candidate_request_availability_pkey ON public.candidate_request_availability USING btree (id);

CREATE UNIQUE INDEX candidate_search_history_pkey ON public.candidate_search_history USING btree (id);

CREATE UNIQUE INDEX candidate_ukey ON public.candidates USING btree (recruiter_id, email);

CREATE UNIQUE INDEX candidates_id_key ON public.candidates USING btree (id);

CREATE UNIQUE INDEX company_email_template_pkey ON public.company_email_template USING btree (id);

CREATE UNIQUE INDEX company_search_cache_pkey ON public.company_search_cache USING btree (id);

CREATE UNIQUE INDEX env_pkey ON public.env USING btree (id);

CREATE UNIQUE INDEX greenhouse_reference_pkey ON public.greenhouse_reference USING btree (id);

CREATE UNIQUE INDEX integrations_pkey ON public.integrations USING btree (id);

CREATE UNIQUE INDEX integrations_recruiter_id_key ON public.integrations USING btree (recruiter_id);

CREATE UNIQUE INDEX interview_filter_json_pkey ON public.interview_filter_json USING btree (id);

CREATE INDEX interview_meeting_interview_schedule_id_idx ON public.interview_meeting USING btree (interview_schedule_id);

CREATE UNIQUE INDEX interview_meeting_pkey ON public.interview_meeting USING btree (id);

CREATE INDEX interview_module_relation_user_id_module_id_idx ON public.interview_module_relation USING btree (user_id, module_id);

CREATE UNIQUE INDEX interview_panel_pkey ON public.interview_module USING btree (id);

CREATE UNIQUE INDEX interview_panel_relation_pkey ON public.interview_module_relation USING btree (id);

CREATE UNIQUE INDEX interview_plan_job_id_key ON public.interview_plan USING btree (job_id);

CREATE UNIQUE INDEX interview_plan_pkey ON public.interview_plan USING btree (id);

CREATE UNIQUE INDEX interview_schedule_application_id_key ON public.interview_schedule USING btree (application_id);

CREATE UNIQUE INDEX interview_schedule_pkey ON public.interview_schedule USING btree (id);

CREATE UNIQUE INDEX interview_session_cancel_pkey ON public.interview_session_cancel USING btree (id);

CREATE INDEX interview_session_meeting_id_interview_plan_id_module_id_idx ON public.interview_session USING btree (meeting_id, interview_plan_id, module_id);

CREATE UNIQUE INDEX interview_session_pkey ON public.interview_session USING btree (id);

CREATE INDEX interview_session_relation_session_id_interview_module_rela_idx ON public.interview_session_relation USING btree (session_id, interview_module_relation_id, user_id);

CREATE UNIQUE INDEX inteview_session_relation_pkey ON public.interview_session_relation USING btree (id);

CREATE UNIQUE INDEX job_assiatan_chat_messages_pkey ON public.job_assiatan_chat_messages USING btree (id);

CREATE UNIQUE INDEX job_assiatan_chat_pkey ON public.job_assiatan_chat USING btree (id);

CREATE UNIQUE INDEX job_email_template_pkey ON public.job_email_template USING btree (id);

CREATE UNIQUE INDEX job_email_type ON public.job_email_template USING btree (job_id, type);

CREATE UNIQUE INDEX job_reference_pkey ON public.job_reference USING btree (id);

CREATE UNIQUE INDEX lever_job_reference_pkey ON public.lever_job_reference USING btree (id);

CREATE UNIQUE INDEX lever_reference_pkey ON public.lever_reference USING btree (application_id);

CREATE UNIQUE INDEX logs_pkey ON public.logs USING btree (id);

CREATE UNIQUE INDEX new_application_pkey ON public.applications USING btree (id);

CREATE UNIQUE INDEX new_assessment_results_pkey ON public.assessment_results USING btree (id);

CREATE UNIQUE INDEX new_candidate_files_pkey ON public.candidate_files USING btree (id);

CREATE UNIQUE INDEX new_candidate_pkey ON public.candidates USING btree (id);

CREATE UNIQUE INDEX new_tasks_pkey ON public.new_tasks USING btree (id);

CREATE UNIQUE INDEX new_tasks_progress_pkey ON public.new_tasks_progress USING btree (id);

CREATE UNIQUE INDEX notify_me_pkey ON public.notify_me USING btree (id);

CREATE UNIQUE INDEX outreached_emails_pkey ON public.outreached_emails USING btree (id);

CREATE UNIQUE INDEX permissions_name_key ON public.permissions USING btree (name);

CREATE UNIQUE INDEX permissions_pkey ON public.permissions USING btree (id);

CREATE UNIQUE INDEX public_jobs_pkey ON public.public_jobs USING btree (id);

CREATE UNIQUE INDEX question_bank_pkey ON public.question_bank USING btree (id);

CREATE UNIQUE INDEX recruiter_email_slack_type_ukey ON public.company_email_template USING btree (recruiter_id, type);

CREATE UNIQUE INDEX recruiter_id_pkey ON public.recruiter USING btree (id);

CREATE UNIQUE INDEX recruiter_relation_pkey ON public.recruiter_relation USING btree (id);

CREATE UNIQUE INDEX recruiter_relation_ukey ON public.recruiter_relation USING btree (user_id, recruiter_id);

CREATE UNIQUE INDEX recruiter_user_pkey ON public.recruiter_user USING btree (user_id);

CREATE UNIQUE INDEX request_availability_relation_pkey ON public.request_session_relation USING btree (id);

CREATE UNIQUE INDEX request_integration_tool_pkey ON public.request_integration_tool USING btree (id);

CREATE UNIQUE INDEX request_session_relation_session_id_key ON public.request_session_relation USING btree (session_id);

CREATE UNIQUE INDEX role_permissions_pkey ON public.role_permissions USING btree (id);

CREATE UNIQUE INDEX role_permissions_unique_key ON public.role_permissions USING btree (role_id, permission_id, recruiter_id);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

CREATE UNIQUE INDEX rp_logs_pkey ON public.rp_logs USING btree (id);

CREATE UNIQUE INDEX rp_token_usage_pkey ON public.rp_token_usage USING btree (id);

CREATE UNIQUE INDEX "scheduling-agent-chat-history_filter_json_id_key" ON public.scheduling_agent_chat_history USING btree (filter_json_id);

CREATE UNIQUE INDEX "scheduling-agent-chat-history_pkey" ON public.scheduling_agent_chat_history USING btree (filter_json_id, thread_id);

CREATE UNIQUE INDEX screening_answers_id_key ON public.screening_answers USING btree (screening_id);

CREATE UNIQUE INDEX screening_answers_pkey ON public.screening_answers USING btree (screening_id);

CREATE UNIQUE INDEX screening_questions_id_key ON public.screening_questions USING btree (id);

CREATE UNIQUE INDEX screening_questions_pkey ON public.screening_questions USING btree (id);

CREATE UNIQUE INDEX support_groups_pkey ON public.support_groups USING btree (id);

CREATE UNIQUE INDEX support_ticket_pkey ON public.support_ticket USING btree (id);

CREATE UNIQUE INDEX task_session_relation_pkey ON public.task_session_relation USING btree (id);

CREATE UNIQUE INDEX template_question_relation_pkey ON public.template_question_relation USING btree (id);

CREATE UNIQUE INDEX workflow_action_logs_pkey ON public.workflow_action_logs USING btree (id);

CREATE UNIQUE INDEX workflow_action_pkey ON public.workflow_action USING btree (id);

CREATE UNIQUE INDEX workflow_job_relation_pkey ON public.workflow_job_relation USING btree (id);

CREATE UNIQUE INDEX workflow_pkey ON public.workflow USING btree (id);

alter table "public"."aglint_candidates" add constraint "aglint_candidates_pkey" PRIMARY KEY using index "aglint_candidates_pkey";

alter table "public"."ai_videos" add constraint "ai_videos_pkey" PRIMARY KEY using index "ai_videos_pkey";

alter table "public"."application_email_status" add constraint "application_email_status_pkey" PRIMARY KEY using index "application_email_status_pkey";

alter table "public"."application_logs" add constraint "application_logs_pkey" PRIMARY KEY using index "application_logs_pkey";

alter table "public"."application_reference" add constraint "application_reference_pkey" PRIMARY KEY using index "application_reference_pkey";

alter table "public"."applications" add constraint "new_application_pkey" PRIMARY KEY using index "new_application_pkey";

alter table "public"."assessment" add constraint "assessment_pkey" PRIMARY KEY using index "assessment_pkey";

alter table "public"."assessment_job_relation" add constraint "assessment_job_relation_pkey" PRIMARY KEY using index "assessment_job_relation_pkey";

alter table "public"."assessment_question" add constraint "assessment_question_pkey" PRIMARY KEY using index "assessment_question_pkey";

alter table "public"."assessment_results" add constraint "new_assessment_results_pkey" PRIMARY KEY using index "new_assessment_results_pkey";

alter table "public"."assessment_template" add constraint "assessment_template_pkey" PRIMARY KEY using index "assessment_template_pkey";

alter table "public"."candidate_files" add constraint "new_candidate_files_pkey" PRIMARY KEY using index "new_candidate_files_pkey";

alter table "public"."candidate_list" add constraint "candidate_list_pkey" PRIMARY KEY using index "candidate_list_pkey";

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_pkey" PRIMARY KEY using index "candidate_request_availability_pkey";

alter table "public"."candidate_search_history" add constraint "candidate_search_history_pkey" PRIMARY KEY using index "candidate_search_history_pkey";

alter table "public"."candidates" add constraint "new_candidate_pkey" PRIMARY KEY using index "new_candidate_pkey";

alter table "public"."company_email_template" add constraint "company_email_template_pkey" PRIMARY KEY using index "company_email_template_pkey";

alter table "public"."company_search_cache" add constraint "company_search_cache_pkey" PRIMARY KEY using index "company_search_cache_pkey";

alter table "public"."env" add constraint "env_pkey" PRIMARY KEY using index "env_pkey";

alter table "public"."greenhouse_reference" add constraint "greenhouse_reference_pkey" PRIMARY KEY using index "greenhouse_reference_pkey";

alter table "public"."integrations" add constraint "integrations_pkey" PRIMARY KEY using index "integrations_pkey";

alter table "public"."interview_filter_json" add constraint "interview_filter_json_pkey" PRIMARY KEY using index "interview_filter_json_pkey";

alter table "public"."interview_meeting" add constraint "interview_meeting_pkey" PRIMARY KEY using index "interview_meeting_pkey";

alter table "public"."interview_module" add constraint "interview_panel_pkey" PRIMARY KEY using index "interview_panel_pkey";

alter table "public"."interview_module_relation" add constraint "interview_panel_relation_pkey" PRIMARY KEY using index "interview_panel_relation_pkey";

alter table "public"."interview_plan" add constraint "interview_plan_pkey" PRIMARY KEY using index "interview_plan_pkey";

alter table "public"."interview_schedule" add constraint "interview_schedule_pkey" PRIMARY KEY using index "interview_schedule_pkey";

alter table "public"."interview_session" add constraint "interview_session_pkey" PRIMARY KEY using index "interview_session_pkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_pkey" PRIMARY KEY using index "interview_session_cancel_pkey";

alter table "public"."interview_session_relation" add constraint "inteview_session_relation_pkey" PRIMARY KEY using index "inteview_session_relation_pkey";

alter table "public"."job_assiatan_chat" add constraint "job_assiatan_chat_pkey" PRIMARY KEY using index "job_assiatan_chat_pkey";

alter table "public"."job_assiatan_chat_messages" add constraint "job_assiatan_chat_messages_pkey" PRIMARY KEY using index "job_assiatan_chat_messages_pkey";

alter table "public"."job_email_template" add constraint "job_email_template_pkey" PRIMARY KEY using index "job_email_template_pkey";

alter table "public"."job_reference" add constraint "job_reference_pkey" PRIMARY KEY using index "job_reference_pkey";

alter table "public"."lever_job_reference" add constraint "lever_job_reference_pkey" PRIMARY KEY using index "lever_job_reference_pkey";

alter table "public"."lever_reference" add constraint "lever_reference_pkey" PRIMARY KEY using index "lever_reference_pkey";

alter table "public"."logs" add constraint "logs_pkey" PRIMARY KEY using index "logs_pkey";

alter table "public"."new_tasks" add constraint "new_tasks_pkey" PRIMARY KEY using index "new_tasks_pkey";

alter table "public"."new_tasks_progress" add constraint "new_tasks_progress_pkey" PRIMARY KEY using index "new_tasks_progress_pkey";

alter table "public"."notify_me" add constraint "notify_me_pkey" PRIMARY KEY using index "notify_me_pkey";

alter table "public"."outreached_emails" add constraint "outreached_emails_pkey" PRIMARY KEY using index "outreached_emails_pkey";

alter table "public"."permissions" add constraint "permissions_pkey" PRIMARY KEY using index "permissions_pkey";

alter table "public"."public_jobs" add constraint "public_jobs_pkey" PRIMARY KEY using index "public_jobs_pkey";

alter table "public"."question_bank" add constraint "question_bank_pkey" PRIMARY KEY using index "question_bank_pkey";

alter table "public"."recruiter" add constraint "recruiter_id_pkey" PRIMARY KEY using index "recruiter_id_pkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_pkey" PRIMARY KEY using index "recruiter_relation_pkey";

alter table "public"."recruiter_user" add constraint "recruiter_user_pkey" PRIMARY KEY using index "recruiter_user_pkey";

alter table "public"."request_integration_tool" add constraint "request_integration_tool_pkey" PRIMARY KEY using index "request_integration_tool_pkey";

alter table "public"."request_session_relation" add constraint "request_availability_relation_pkey" PRIMARY KEY using index "request_availability_relation_pkey";

alter table "public"."role_permissions" add constraint "role_permissions_pkey" PRIMARY KEY using index "role_permissions_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."rp_logs" add constraint "rp_logs_pkey" PRIMARY KEY using index "rp_logs_pkey";

alter table "public"."rp_token_usage" add constraint "rp_token_usage_pkey" PRIMARY KEY using index "rp_token_usage_pkey";

alter table "public"."scheduling_agent_chat_history" add constraint "scheduling-agent-chat-history_pkey" PRIMARY KEY using index "scheduling-agent-chat-history_pkey";

alter table "public"."screening_answers" add constraint "screening_answers_pkey" PRIMARY KEY using index "screening_answers_pkey";

alter table "public"."screening_questions" add constraint "screening_questions_pkey" PRIMARY KEY using index "screening_questions_pkey";

alter table "public"."support_groups" add constraint "support_groups_pkey" PRIMARY KEY using index "support_groups_pkey";

alter table "public"."support_ticket" add constraint "support_ticket_pkey" PRIMARY KEY using index "support_ticket_pkey";

alter table "public"."task_session_relation" add constraint "task_session_relation_pkey" PRIMARY KEY using index "task_session_relation_pkey";

alter table "public"."template_question_relation" add constraint "template_question_relation_pkey" PRIMARY KEY using index "template_question_relation_pkey";

alter table "public"."threads" add constraint "Threads_pkey" PRIMARY KEY using index "Threads_pkey";

alter table "public"."workflow" add constraint "workflow_pkey" PRIMARY KEY using index "workflow_pkey";

alter table "public"."workflow_action" add constraint "workflow_action_pkey" PRIMARY KEY using index "workflow_action_pkey";

alter table "public"."workflow_action_logs" add constraint "workflow_action_logs_pkey" PRIMARY KEY using index "workflow_action_logs_pkey";

alter table "public"."workflow_job_relation" add constraint "workflow_job_relation_pkey" PRIMARY KEY using index "workflow_job_relation_pkey";

alter table "public"."application_email_status" add constraint "application_email_status_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."application_email_status" validate constraint "application_email_status_application_id_fkey";

alter table "public"."application_logs" add constraint "application_logs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."application_logs" validate constraint "application_logs_created_by_fkey";

alter table "public"."application_logs" add constraint "application_logs_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON DELETE SET NULL not valid;

alter table "public"."application_logs" validate constraint "application_logs_task_id_fkey";

alter table "public"."application_logs" add constraint "public_application_logs_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."application_logs" validate constraint "public_application_logs_application_id_fkey";

alter table "public"."applications" add constraint "applications_assessment_id_fkey" FOREIGN KEY (assessment_id) REFERENCES assessment_results(id) ON DELETE SET NULL not valid;

alter table "public"."applications" validate constraint "applications_assessment_id_fkey";

alter table "public"."applications" add constraint "applications_candidate_file_id_fkey" FOREIGN KEY (candidate_file_id) REFERENCES candidate_files(id) ON DELETE SET NULL not valid;

alter table "public"."applications" validate constraint "applications_candidate_file_id_fkey";

alter table "public"."applications" add constraint "applications_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_candidate_id_fkey";

alter table "public"."applications" add constraint "applications_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_job_id_fkey";

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

alter table "public"."assessment_results" add constraint "assessment_results_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."assessment_results" validate constraint "assessment_results_application_id_fkey";

alter table "public"."assessment_results" add constraint "public_assessment_results_assessment_id_fkey" FOREIGN KEY (assessment_id) REFERENCES assessment(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."assessment_results" validate constraint "public_assessment_results_assessment_id_fkey";

alter table "public"."candidate_files" add constraint "candidate_files_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."candidate_files" validate constraint "candidate_files_candidate_id_fkey";

alter table "public"."candidate_list" add constraint "candidate_list_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_list" validate constraint "candidate_list_recruiter_id_fkey";

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_request_availability" validate constraint "candidate_request_availability_application_id_fkey";

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_request_availability" validate constraint "candidate_request_availability_recruiter_id_fkey";

alter table "public"."candidate_search_history" add constraint "candidate_search_history_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_search_history" validate constraint "candidate_search_history_recruiter_id_fkey";

alter table "public"."candidates" add constraint "candidate_ukey" UNIQUE using index "candidate_ukey";

alter table "public"."candidates" add constraint "candidates_id_key" UNIQUE using index "candidates_id_key";

alter table "public"."candidates" add constraint "candidates_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidates" validate constraint "candidates_recruiter_id_fkey";

alter table "public"."company_email_template" add constraint "company_email_template_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."company_email_template" validate constraint "company_email_template_recruiter_id_fkey";

alter table "public"."company_email_template" add constraint "recruiter_email_slack_type_ukey" UNIQUE using index "recruiter_email_slack_type_ukey";

alter table "public"."integrations" add constraint "integrations_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."integrations" validate constraint "integrations_recruiter_id_fkey";

alter table "public"."integrations" add constraint "integrations_recruiter_id_key" UNIQUE using index "integrations_recruiter_id_key";

alter table "public"."interview_filter_json" add constraint "public_interview_filter_json_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_filter_json" validate constraint "public_interview_filter_json_created_by_fkey";

alter table "public"."interview_filter_json" add constraint "public_interview_filter_json_schedule_id_fkey" FOREIGN KEY (schedule_id) REFERENCES interview_schedule(id) ON DELETE CASCADE not valid;

alter table "public"."interview_filter_json" validate constraint "public_interview_filter_json_schedule_id_fkey";

alter table "public"."interview_meeting" add constraint "interview_meeting_organizer_id_fkey" FOREIGN KEY (organizer_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_meeting" validate constraint "interview_meeting_organizer_id_fkey";

alter table "public"."interview_meeting" add constraint "public_interview_meeting_interview_schedule_id_fkey" FOREIGN KEY (interview_schedule_id) REFERENCES interview_schedule(id) ON DELETE CASCADE not valid;

alter table "public"."interview_meeting" validate constraint "public_interview_meeting_interview_schedule_id_fkey";

alter table "public"."interview_module" add constraint "interview_panel_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."interview_module" validate constraint "interview_panel_recruiter_id_fkey";

alter table "public"."interview_module" add constraint "public_interview_module_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_module" validate constraint "public_interview_module_created_by_fkey";

alter table "public"."interview_module_relation" add constraint "interview_panel_relation_panel_id_fkey" FOREIGN KEY (module_id) REFERENCES interview_module(id) ON DELETE CASCADE not valid;

alter table "public"."interview_module_relation" validate constraint "interview_panel_relation_panel_id_fkey";

alter table "public"."interview_module_relation" add constraint "public_interview_module_relation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_module_relation" validate constraint "public_interview_module_relation_user_id_fkey";

alter table "public"."interview_plan" add constraint "interview_plan_job_id_key" UNIQUE using index "interview_plan_job_id_key";

alter table "public"."interview_plan" add constraint "public_interview_plan_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."interview_plan" validate constraint "public_interview_plan_job_id_fkey";

alter table "public"."interview_schedule" add constraint "interview_schedule_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."interview_schedule" validate constraint "interview_schedule_application_id_fkey";

alter table "public"."interview_schedule" add constraint "interview_schedule_application_id_key" UNIQUE using index "interview_schedule_application_id_key";

alter table "public"."interview_schedule" add constraint "public_interview_schedule_coordinator_id_fkey" FOREIGN KEY (coordinator_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_schedule" validate constraint "public_interview_schedule_coordinator_id_fkey";

alter table "public"."interview_schedule" add constraint "public_interview_schedule_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_schedule" validate constraint "public_interview_schedule_created_by_fkey";

alter table "public"."interview_schedule" add constraint "public_interview_schedule_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."interview_schedule" validate constraint "public_interview_schedule_recruiter_id_fkey";

alter table "public"."interview_session" add constraint "public_interview_session_interview_plan_id_fkey" FOREIGN KEY (interview_plan_id) REFERENCES interview_plan(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_session" validate constraint "public_interview_session_interview_plan_id_fkey";

alter table "public"."interview_session" add constraint "public_interview_session_meeting_id_fkey" FOREIGN KEY (meeting_id) REFERENCES interview_meeting(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session" validate constraint "public_interview_session_meeting_id_fkey";

alter table "public"."interview_session" add constraint "public_interview_session_module_id_fkey" FOREIGN KEY (module_id) REFERENCES interview_module(id) ON DELETE SET NULL not valid;

alter table "public"."interview_session" validate constraint "public_interview_session_module_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_cancel_user_id_fkey" FOREIGN KEY (cancel_user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_cancel_user_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_schedule_id_fkey" FOREIGN KEY (schedule_id) REFERENCES interview_schedule(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_schedule_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_session_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_session_relation_id_fkey" FOREIGN KEY (session_relation_id) REFERENCES interview_session_relation(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_session_relation_id_fkey";

alter table "public"."interview_session_relation" add constraint "public_interview_session_relation_interview_module_relation_id_" FOREIGN KEY (interview_module_relation_id) REFERENCES interview_module_relation(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_relation" validate constraint "public_interview_session_relation_interview_module_relation_id_";

alter table "public"."interview_session_relation" add constraint "public_interview_session_relation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_relation" validate constraint "public_interview_session_relation_user_id_fkey";

alter table "public"."interview_session_relation" add constraint "public_inteview_session_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_relation" validate constraint "public_inteview_session_relation_session_id_fkey";

alter table "public"."job_assiatan_chat" add constraint "job_assiatan_chat_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."job_assiatan_chat" validate constraint "job_assiatan_chat_job_id_fkey";

alter table "public"."job_assiatan_chat_messages" add constraint "job_assiatan_chat_messages_job_assiatan_chat_id_fkey" FOREIGN KEY (job_assiatan_chat_id) REFERENCES job_assiatan_chat(id) ON DELETE CASCADE not valid;

alter table "public"."job_assiatan_chat_messages" validate constraint "job_assiatan_chat_messages_job_assiatan_chat_id_fkey";

alter table "public"."job_email_template" add constraint "job_email_template_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."job_email_template" validate constraint "job_email_template_job_id_fkey";

alter table "public"."job_email_template" add constraint "job_email_type" UNIQUE using index "job_email_type";

alter table "public"."job_reference" add constraint "job_reference_public_job_id_fkey" FOREIGN KEY (public_job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."job_reference" validate constraint "job_reference_public_job_id_fkey";

alter table "public"."job_reference" add constraint "job_reference_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."job_reference" validate constraint "job_reference_recruiter_id_fkey";

alter table "public"."lever_job_reference" add constraint "lever_job_reference_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."lever_job_reference" validate constraint "lever_job_reference_job_id_fkey";

alter table "public"."lever_job_reference" add constraint "lever_job_reference_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."lever_job_reference" validate constraint "lever_job_reference_recruiter_id_fkey";

alter table "public"."lever_reference" add constraint "lever_reference_public_job_id_fkey" FOREIGN KEY (public_job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."lever_reference" validate constraint "lever_reference_public_job_id_fkey";

alter table "public"."logs" add constraint "logs_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE SET NULL not valid;

alter table "public"."logs" validate constraint "logs_recruiter_id_fkey";

alter table "public"."logs" add constraint "logs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."logs" validate constraint "logs_user_id_fkey";

alter table "public"."new_tasks" add constraint "new_tasks_request_availability_id_fkey" FOREIGN KEY (request_availability_id) REFERENCES candidate_request_availability(id) ON DELETE CASCADE not valid;

alter table "public"."new_tasks" validate constraint "new_tasks_request_availability_id_fkey";

alter table "public"."new_tasks" add constraint "public_new_tasks_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."new_tasks" validate constraint "public_new_tasks_application_id_fkey";

alter table "public"."new_tasks" add constraint "public_new_tasks_cretaed_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."new_tasks" validate constraint "public_new_tasks_cretaed_by_fkey";

alter table "public"."new_tasks" add constraint "public_new_tasks_filter_id_fkey" FOREIGN KEY (filter_id) REFERENCES interview_filter_json(id) ON DELETE SET NULL not valid;

alter table "public"."new_tasks" validate constraint "public_new_tasks_filter_id_fkey";

alter table "public"."new_tasks_progress" add constraint "public_new_tasks_progress_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON DELETE CASCADE not valid;

alter table "public"."new_tasks_progress" validate constraint "public_new_tasks_progress_task_id_fkey";

alter table "public"."outreached_emails" add constraint "outreached_emails_recruiter_user_id_fkey" FOREIGN KEY (recruiter_user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."outreached_emails" validate constraint "outreached_emails_recruiter_user_id_fkey";

alter table "public"."permissions" add constraint "permissions_name_key" UNIQUE using index "permissions_name_key";

alter table "public"."public_jobs" add constraint "public_jobs_hiring_manager_fkey" FOREIGN KEY (hiring_manager) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_hiring_manager_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_interview_coordinator_fkey" FOREIGN KEY (interview_coordinator) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_interview_coordinator_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_recruiter_fkey" FOREIGN KEY (recruiter) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_recruiter_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_recruiter_id_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_recruiting_coordinator_fkey" FOREIGN KEY (recruiting_coordinator) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_recruiting_coordinator_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_sourcer_fkey" FOREIGN KEY (sourcer) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_sourcer_fkey";

alter table "public"."public_jobs" add constraint "public_public_jobs_screening_template_fkey" FOREIGN KEY (screening_template) REFERENCES screening_questions(id) not valid;

alter table "public"."public_jobs" validate constraint "public_public_jobs_screening_template_fkey";

alter table "public"."recruiter_relation" add constraint "public_recruiter_relation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "public_recruiter_relation_user_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_created_by_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_manager_id_fkey" FOREIGN KEY (manager_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_manager_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_recruiter_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_role_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_ukey" UNIQUE using index "recruiter_relation_ukey";

alter table "public"."recruiter_user" add constraint "recruiter_user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_user" validate constraint "recruiter_user_user_id_fkey";

alter table "public"."request_integration_tool" add constraint "public_request_integration_tool_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) not valid;

alter table "public"."request_integration_tool" validate constraint "public_request_integration_tool_recruiter_id_fkey";

alter table "public"."request_session_relation" add constraint "request_availability_relation_request_availability_id_fkey" FOREIGN KEY (request_availability_id) REFERENCES candidate_request_availability(id) ON DELETE CASCADE not valid;

alter table "public"."request_session_relation" validate constraint "request_availability_relation_request_availability_id_fkey";

alter table "public"."request_session_relation" add constraint "request_availability_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE not valid;

alter table "public"."request_session_relation" validate constraint "request_availability_relation_session_id_fkey";

alter table "public"."request_session_relation" add constraint "request_session_relation_session_id_key" UNIQUE using index "request_session_relation_session_id_key";

alter table "public"."role_permissions" add constraint "role_permissions_permission_id_fkey" FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_permission_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_recruiter_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_role_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_unique_key" UNIQUE using index "role_permissions_unique_key";

alter table "public"."roles" add constraint "roles_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."roles" validate constraint "roles_recruiter_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "public_scheduling-agent-chat-history_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."scheduling_agent_chat_history" validate constraint "public_scheduling-agent-chat-history_application_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "public_scheduling-agent-chat-history_company_id_fkey" FOREIGN KEY (company_id) REFERENCES recruiter(id) not valid;

alter table "public"."scheduling_agent_chat_history" validate constraint "public_scheduling-agent-chat-history_company_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "public_scheduling-agent-chat-history_filter_json_id_fkey" FOREIGN KEY (filter_json_id) REFERENCES interview_filter_json(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."scheduling_agent_chat_history" validate constraint "public_scheduling-agent-chat-history_filter_json_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "public_scheduling-agent-chat-history_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) not valid;

alter table "public"."scheduling_agent_chat_history" validate constraint "public_scheduling-agent-chat-history_job_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "public_scheduling-agent-chat-history_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."scheduling_agent_chat_history" validate constraint "public_scheduling-agent-chat-history_task_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "scheduling-agent-chat-history_filter_json_id_key" UNIQUE using index "scheduling-agent-chat-history_filter_json_id_key";

alter table "public"."screening_answers" add constraint "public_screening_answers_screening_id_fkey" FOREIGN KEY (screening_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."screening_answers" validate constraint "public_screening_answers_screening_id_fkey";

alter table "public"."screening_answers" add constraint "screening_answers_id_key" UNIQUE using index "screening_answers_id_key";

alter table "public"."screening_questions" add constraint "public_screening_questions_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."screening_questions" validate constraint "public_screening_questions_recruiter_id_fkey";

alter table "public"."screening_questions" add constraint "screening_questions_id_key" UNIQUE using index "screening_questions_id_key";

alter table "public"."support_groups" add constraint "support_groups_company_id_fkey" FOREIGN KEY (company_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."support_groups" validate constraint "support_groups_company_id_fkey";

alter table "public"."support_ticket" add constraint "support_ticket_company_id_fkey" FOREIGN KEY (company_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."support_ticket" validate constraint "support_ticket_company_id_fkey";

alter table "public"."support_ticket" add constraint "support_ticket_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."support_ticket" validate constraint "support_ticket_job_id_fkey";

alter table "public"."support_ticket" add constraint "support_ticket_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."support_ticket" validate constraint "support_ticket_user_id_fkey";

alter table "public"."task_session_relation" add constraint "task_session_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."task_session_relation" validate constraint "task_session_relation_session_id_fkey";

alter table "public"."task_session_relation" add constraint "task_session_relation_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."task_session_relation" validate constraint "task_session_relation_task_id_fkey";

alter table "public"."template_question_relation" add constraint "template_question_relation_question_id_fkey" FOREIGN KEY (question_id) REFERENCES question_bank(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."template_question_relation" validate constraint "template_question_relation_question_id_fkey";

alter table "public"."template_question_relation" add constraint "template_question_relation_template_id_fkey" FOREIGN KEY (template_id) REFERENCES assessment_template(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."template_question_relation" validate constraint "template_question_relation_template_id_fkey";

alter table "public"."workflow" add constraint "workflow_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow" validate constraint "workflow_recruiter_id_fkey";

alter table "public"."workflow_action" add constraint "workflow_action_email_template_id_fkey" FOREIGN KEY (email_template_id) REFERENCES company_email_template(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."workflow_action" validate constraint "workflow_action_email_template_id_fkey";

alter table "public"."workflow_action" add constraint "workflow_action_workflow_id_fkey" FOREIGN KEY (workflow_id) REFERENCES workflow(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow_action" validate constraint "workflow_action_workflow_id_fkey";

alter table "public"."workflow_action_logs" add constraint "workflow_action_logs_workflow_action_id_fkey" FOREIGN KEY (workflow_action_id) REFERENCES workflow_action(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow_action_logs" validate constraint "workflow_action_logs_workflow_action_id_fkey";

alter table "public"."workflow_action_logs" add constraint "workflow_action_logs_workflow_id_fkey" FOREIGN KEY (workflow_id) REFERENCES workflow(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow_action_logs" validate constraint "workflow_action_logs_workflow_id_fkey";

alter table "public"."workflow_job_relation" add constraint "workflow_job_relation_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow_job_relation" validate constraint "workflow_job_relation_job_id_fkey";

alter table "public"."workflow_job_relation" add constraint "workflow_job_relation_workflow_id_fkey" FOREIGN KEY (workflow_id) REFERENCES workflow(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow_job_relation" validate constraint "workflow_job_relation_workflow_id_fkey";

set check_function_bodies = off;

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

CREATE OR REPLACE FUNCTION public.ashbyjobreference(rec_id uuid)
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
         app.ats_json AS ats_json,
         job.public_job_id AS job_id,
         job.recruiter_id AS recruiter_id,
         rec.ashby_key AS apikey
         FROM
         application_reference app
         JOIN
         job_reference job ON (app.ats_json -> 'job'->>'id')::text = job.ats_job_id and job.recruiter_id = app.recruiter_id
         JOIN
         recruiter rec ON rec.id = job.recruiter_id
         WHERE app.recruiter_id = rec_id and app.is_processed=false
         ORDER BY
         (app.ats_json->>'id')::text
         LIMIT 25
   ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.ashbysync()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
BEGIN
    -- Make a single HTTP request for the aggregated data
    SELECT value INTO function_url FROM env WHERE name = 'ashby-sync';
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
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions and filter by recruiter_id
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
       SELECT
           application_id AS application_id,
           resume AS resume
       FROM greenhouse_reference
       WHERE resume_saved = false and resume is not null
       ORDER BY created_at ASC
       LIMIT 100
    ) as data;

    -- Check if result is not NULL and make an HTTP request if it's not empty
    IF result IS NOT NULL THEN
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

CREATE OR REPLACE FUNCTION public.count_candidates(job_ids uuid[])
 RETURNS TABLE(total_records numeric)
 LANGUAGE plpgsql
AS $function$ 
DECLARE
  candidate_count numeric;
BEGIN 
  SELECT count(DISTINCT ja.candidate_id) INTO candidate_count
  FROM
    job_applications ja
    JOIN candidates c ON ja.candidate_id = c.id
  WHERE
    ja.job_id = ANY(job_ids);

  RETURN QUERY SELECT candidate_count;
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


CREATE OR REPLACE FUNCTION public.decrement_interviewer_cnt()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check if the session type is 'debrief'
    IF (SELECT session_type FROM public.interview_session WHERE id = OLD.session_id) = 'debrief' THEN
        -- Update the interviewer_cnt
        UPDATE public.interview_session
        SET interviewer_cnt = interviewer_cnt - 1
        WHERE id = OLD.session_id;
    END IF;
    RETURN OLD;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_session(session_id uuid, interview_plan_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  overall_count INTEGER;
  session_order_to_delete INTEGER;
BEGIN
    DELETE FROM interview_session
    WHERE id = session_id
    RETURNING session_order INTO session_order_to_delete;
    
    SELECT COUNT(*)
    INTO overall_count
    FROM interview_session
    WHERE interview_session.interview_plan_id = delete_session.interview_plan_id
      AND session_order > session_order_to_delete;

    IF overall_count <> 0 THEN
        UPDATE interview_session
        SET session_order = session_order - 1
        WHERE interview_session.interview_plan_id = delete_session.interview_plan_id
          AND session_order > session_order_to_delete;

        UPDATE interview_session
        SET break_duration = 0
        WHERE id = (
            SELECT id 
            FROM interview_session
            WHERE interview_session.interview_plan_id = delete_session.interview_plan_id
            ORDER BY session_order DESC
            LIMIT 1
        );
    END IF;
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

CREATE OR REPLACE FUNCTION public.expire_new_applications()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  UPDATE applications
  SET is_new = false
  WHERE is_new = true AND applied_at < now() - interval '6 hours';
end;
$function$
;

CREATE OR REPLACE FUNCTION public.fail_processing_applications()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  with processing_applications as (
    select 
      id,
      retry
    from
      applications
    where 
      processing_status = 'processing' and 
      processing_started_at < now() - interval '5 minutes' 
  ) 
  update 
    applications
  set 
    processing_status = 'failed',
    retry = 0
  from 
    processing_applications
  where 
    applications.id = processing_applications.id;
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

CREATE OR REPLACE FUNCTION public.get_applicant_badges(job_id uuid, badge_constants jsonb DEFAULT '{}'::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE 
  counts jsonb;
BEGIN
  with score_json_cte as (
  select score_json -> 'badges' as badges, applications.job_id
  from applications
  where score_json -> 'badges' is not null and applications.job_id = get_applicant_badges.job_id
), badges_cte as (
  select coalesce((badges -> 'careerGrowth')::numeric, 0) as careerGrowthCount, coalesce((badges -> 'jobStability')::numeric, 0) as jobStabilityCount, coalesce((badges -> 'leadership')::numeric, 0) as leadershipCount, coalesce((badges -> 'jobHopping')::numeric, 0) as jobHoppingCount, coalesce((badges -> 'positions')::numeric, 0) as positionsCount, coalesce((badges -> 'schools')::numeric, 0) as schoolsCount, coalesce((badges -> 'skills')::numeric, 0) as skillsCount, score_json_cte.job_id
  from score_json_cte
), careerGrowth_cte as (
  select 
    badges_cte.job_id,
    count(careerGrowthCount)
  from 
    badges_cte
  where
    careerGrowthCount > coalesce((badge_constants -> 'careerGrowth')::numeric, 89)
  group by
    badges_cte.job_id
), jobStability_cte as (
  select 
    badges_cte.job_id,
    count(jobStabilityCount)
  from 
    badges_cte
  where
    jobStabilityCount > coalesce((badge_constants -> 'jobStability')::numeric, 89)
  group by
    badges_cte.job_id
), leadership_cte as (
  select 
    badges_cte.job_id,
    count(leadershipCount)
  from 
    badges_cte
  where
    leadershipCount > coalesce((badge_constants -> 'leadership')::numeric, 69)
  group by
    badges_cte.job_id
), jobHopping_cte as (
  select 
    badges_cte.job_id,
    count(jobHoppingCount)
  from 
    badges_cte
  where
    jobHoppingCount > coalesce((badge_constants -> 'jobHopping')::numeric, 0)
  group by
    badges_cte.job_id
), positions_cte as (
  select 
    badges_cte.job_id,
    count(positionsCount)
  from 
    badges_cte
  where
    positionsCount > coalesce((badge_constants -> 'positions')::numeric, 0)
  group by
    badges_cte.job_id
), schools_cte as (
  select 
    badges_cte.job_id,
    count(schoolsCount)
  from 
    badges_cte
  where
    schoolsCount > coalesce((badge_constants -> 'schools')::numeric, 0)
  group by
    badges_cte.job_id
), skills_cte as (
  select 
    badges_cte.job_id,
    count(skillsCount)
  from 
    badges_cte
  where
    skillsCount > coalesce((badge_constants -> 'skills')::numeric, 0)
  group by
    badges_cte.job_id
)
select 
  json_build_object (
    'careerGrowth',
    coalesce(careerGrowth_cte.count, 0),
    'jobStability',
    coalesce(jobStability_cte.count, 0),
    'leadership',
    coalesce(leadership_cte.count, 0),
    'jobHopping',
    coalesce(jobHopping_cte.count, 0),
    'positions',
    coalesce(positions_cte.count, 0),
    'schools',
    coalesce(schools_cte.count, 0),
    'skills',
    coalesce(skills_cte.count, 0) 
  )
into 
  counts
from 
  score_json_cte
left join 
  careerGrowth_cte on careerGrowth_cte.job_id = score_json_cte.job_id
left join 
  jobStability_cte on jobStability_cte.job_id = score_json_cte.job_id
left join 
  leadership_cte on leadership_cte.job_id = score_json_cte.job_id
left join 
  jobHopping_cte on jobHopping_cte.job_id = score_json_cte.job_id
left join 
  positions_cte on positions_cte.job_id = score_json_cte.job_id
left join 
  schools_cte on schools_cte.job_id = score_json_cte.job_id
left join 
  skills_cte on skills_cte.job_id = score_json_cte.job_id
limit 1;
RETURN counts;
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

CREATE OR REPLACE FUNCTION public.get_combined_resume_score(jd_data jsonb, parameter_weights jsonb)
 RETURNS integer
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
  overall_score numeric := 0;
BEGIN
  -- Add the weighted score to the overall score
  overall_score := TRUNC(((jd_data->'scores'->>'skills')::numeric * COALESCE((parameter_weights->>'skills')::numeric, 0) +
      (jd_data->'scores'->>'education')::numeric * COALESCE((parameter_weights->>'education')::numeric, 0) +
      (jd_data->'scores'->>'experience')::numeric * COALESCE((parameter_weights->>'experience')::numeric, 0))/100, 0);

  -- Return the truncated integer part of the overall score
  RETURN TRUNC(overall_score);
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
                                    'profile_image', user_rel.profile_image,
                                    'scheduling_settings', user_rel.scheduling_settings,
                                    'schedule_auth', user_rel.schedule_auth
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
                                    'scheduling_settings', user_rel.scheduling_settings,
                                    'schedule_auth', user_rel.schedule_auth
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
                                    'scheduling_settings', user_rel.scheduling_settings,
                                    'schedule_auth', user_rel.schedule_auth
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
                                    'scheduling_settings', user_rel.scheduling_settings,
                                    'schedule_auth', user_rel.schedule_auth
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
 RETURNS TABLE(interview_modules jsonb, users jsonb, upcoming_meeting_count integer, completed_meeting_count integer, canceled_meeting_count integer)
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
        (SELECT COUNT(*) FROM interview_meeting intm JOIN interview_session inses ON inses.meeting_id=intm.id WHERE  intm.status='completed' AND inses.module_id=intmod.id)::integer AS completed_meeting_count,
         (SELECT COUNT(*) FROM interview_meeting intm JOIN interview_session inses ON inses.meeting_id=intm.id WHERE  intm.status='cancelled' AND inses.module_id=intmod.id)::integer AS canceled_meeting_count
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

CREATE OR REPLACE FUNCTION public.get_interview_schedule_by_module_id(target_module_id uuid)
 RETURNS TABLE(interview_meeting json, users json, candidate json)
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
                    'is_confirmed',intsr.is_confirmed,
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
    WHERE indmod.id = target_module_id AND intmeet.status IN ('completed', 'confirmed', 'cancelled') 
    AND intsesrel.is_confirmed = true
    GROUP BY intmeet.id, insc.id , intses.id, app.id, pj.id;
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

CREATE OR REPLACE FUNCTION public.get_interview_session_data(session_ids uuid[], company_id uuid, meet_start_date timestamp without time zone, meet_end_date timestamp without time zone)
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
      'position', rec_user.position,
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
        'position', recruiter_user.position,
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
            'meeting_duration', interview_session.session_duration,
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
  RETURN QUERY SELECT interview_sessions, interviewers, service_cred, interview_modules, comp_schedule_setting, coalesce(int_meetings,Array[]::jsonb[]);
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

CREATE OR REPLACE FUNCTION public.get_job_workflows(recruiter_id uuid)
 RETURNS TABLE(id uuid, job_title text, workflow_count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  select 
    public_jobs.id,
    public_jobs.job_title,
    count(*) as workflow_count
  from 
    workflow_job_relation
  inner join
    public_jobs on
      public_jobs.id = workflow_job_relation.job_id
  where
    public_jobs.recruiter_id = get_job_workflows.recruiter_id
  group by
    public_jobs.id,
    public_jobs.job_title;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_present_scheduled_jobs()
 RETURNS SETOF json
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
    SELECT
      json_build_object(
        'job_id', id::uuid,
        'job_title', job_title::text,
        'time_stamp', TO_TIMESTAMP(active_status -> 'interviewing' ->> 'timeStamp', 'YYYY-MM-DD')::timestamp,
        'current_date', current_date::timestamp
      )
    FROM
      public.public_jobs
    WHERE
    active_status -> 'closed' ->> 'isActive' = 'false' AND
      active_status -> 'interviewing' ->> 'timeStamp' IS NOT NULL
      AND to_timestamp(
        active_status -> 'interviewing' ->> 'timeStamp',
        'YYYY-MM-DD'
      ) = current_date;
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

CREATE OR REPLACE FUNCTION public.getjobapplicationcountforcandidates(candidate_ids uuid[])
 RETURNS TABLE(candidate_id uuid, job_ids uuid[], job_titles text[])
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        ja.candidate_id,
        ARRAY_AGG(pj.id) AS job_ids,
        ARRAY_AGG(pj.job_title) AS job_titles
    FROM
        job_applications AS ja
    JOIN
        public_jobs AS pj ON ja.job_id = pj.id
    WHERE
        ja.candidate_id = ANY(candidate_ids)
    GROUP BY
        ja.candidate_id;
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

CREATE OR REPLACE FUNCTION public.getresumematch(jobid uuid, section application_status, topmatch integer DEFAULT 80, goodmatch integer DEFAULT 60, averagematch integer DEFAULT 40, poormatch integer DEFAULT 20)
 RETURNS TABLE(match text, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT categories.match, COALESCE(match_category.count, 0) AS count
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
    ON categories.match = match_category.match;
END
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

CREATE OR REPLACE FUNCTION public.greenhousecandidatesync()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
    DECLARE
        result JSONB;
        request_results JSONB;
        app_id UUID;
        function_url TEXT;
    BEGIN
        -- Initialize an empty JSON array for the results
        result := '[]'::JSONB;

        -- Loop through the selected application IDs
        FOR app_id IN (
            SELECT public_job_id
            FROM job_reference
            WHERE ats='greenhouse'
            ORDER BY created_at ASC
        )
        LOOP

            SELECT value INTO function_url FROM env WHERE name = 'greenhouse-sync';
            -- Make the HTTP request for each application_id
            SELECT
                net.http_post(
                    url := function_url,
                    body := jsonb_build_object('job_id', app_id)
                ) INTO request_results;

            -- Append the request result to the result array
            result := result || jsonb_build_object('request_result', request_results);
        END LOOP;

        -- Return the final result as a JSONB array
        RETURN result;
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
    'Interview reminder',
    '<p><strong>Scheduled with candidate :</strong><br><a target="_blank" rel="noopener noreferrer" class="c-link" href="https://dev.aglinthq.com/scheduling/view?meeting_id=5ad7e0df-be62-4461-a069-33e884b70c4f&amp;tab=candidate_details"><strong>Ashis Sarthak Singh - Staff Frontend Engineer</strong></a></p><p><strong>Meeting Place :</strong> In Person Meeting<br><strong>Meeting Time :</strong> July 15 03:30 AM - 04:00 AM IST<br><strong>Duration :</strong> 30 Minute      </p>',
    '',
    'interviewStart_slack_interviewers',
    p_recruiter_id
),
(
    '<p>Interview Confirmation for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerFirstName">{{organizerFirstName}}</span> </p><p>Please find the details for the interview below:</p><p><strong>Job:</strong> <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span></p><p><strong>Candidate name:</strong> <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> <br></p><p>Thank you,</p><p>Aglint AI Team</p>',
    'Aglint Ai',
    'confInterview_email_organizer',
    p_recruiter_id
),
(
    '<p>Reschedule Request from <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Interview</p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> ,</p><p></p><p><span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> is requesting to reschedule their interview between <span class="temp-variable" data-type="temp-variable" data-id="startDate">{{startDate}}</span> and <span class="temp-variable" data-type="temp-variable" data-id="endDate">{{endDate}}</span> stating the reason: <span class="temp-variable" data-type="temp-variable" data-id="rescheduleReason">{{rescheduleReason}}</span>.</p><p></p><p>Additional notes from <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>: <span class="temp-variable" data-type="temp-variable" data-id="additionalRescheduleNotes">{{additionalRescheduleNotes}}</span>.</p><p></p><p>Please review the request and take the necessary steps from here.</p><p>Here is the link to reschedule: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p>Here is the link to cancel: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p>Thank you,</p><p>Aglint AI Team</p>',
    'Aglint Ai',
    'interReschedReq_email_recruiter',
    p_recruiter_id
),
(
    '<p>Reminder: Provide Your Availability for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p style="text-align: start">I hope this message finds you well.</p><p style="text-align: start">I am writing to follow up on my previous email regarding the interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We are very interested in discussing your application and learning more about your experiences.</p><p style="text-align: start">If you could please click on the link below to select your availability for an interview, it would be greatly appreciated:</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="availabilityReqLink">{{availabilityReqLink}}</span></p><p style="text-align: start">If you have any questions or need further information, please feel free to reach out.</p><p style="text-align: start">Thank you, and I look forward to hearing from you soon.</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'sendAvailReqReminder_email_applicant',
    p_recruiter_id
),
(
    '<p>Your Interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> is Confirmed</p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>We are pleased to confirm your interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position. Please find the details of your interview below.</p><p></p><p>Regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'confirmInterview_email_applicant',
    p_recruiter_id
),
(
    '<p>Interview Reminder: <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> ,</p><p></p><p>This is a friendly reminder about your upcoming interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please ensure you are prepared and join the interview on time. We are excited to learn more about your experiences and insights.</p><p></p><p>Please find the details of your interview below.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><pre><code class="language-yaml"></code></pre>',
    '{{organizerName}}',
    'interviewStart_email_applicant',
    p_recruiter_id
),
(
    'Invitation to a Phone Screening Session for {{firstName}} - {{jobTitle}} Position at {{companyName}}',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="recruiterName">{{recruiterName}}</span>,</p><p></p><p>Please find the details for the interview below:</p><p>Candidate name: <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> from job <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> <br></p><p>Thank you</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
    '{{recruiterName}}',
    'phoneScreen_email_candidate',
    p_recruiter_id
),
(
    '<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> Accepted Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span></p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> ,</p><p></p><p>We are pleased to inform you that the <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> has accepted the interview request for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>View Schedule details <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span></p><p></p><p>Best regards,</p><p>Aglint AI</p>',
    'Aglint Ai',
    'meetingAccepted_email_organizer',
    p_recruiter_id
),
(
    '<p>Provide Availability for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>Thank you for applying for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We have reviewed your application and are impressed with your qualifications and experiences. We would like to invite you to participate in an interview to further discuss how your skills and experiences align with our needs.</p><p></p><p>To streamline the scheduling process, please click on the link below to select your availability for an interview:</p><p><span class="temp-variable" data-type="temp-variable" data-id="availabilityReqLink">{{availabilityReqLink}}</span></p><p>Looking forward to your response.</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{companyName}}',
    'sendAvailabilityRequest_email_applicant',
    p_recruiter_id
),
(
    '<p>Cancellation Request from <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Interview</p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p></p><p>We have received a request from <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> <span class="temp-variable" data-type="temp-variable" data-id="candidateLastName">{{candidateLastName}}</span> to reschedule their interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position.</p><p></p><p>Cancel Reason: <span class="temp-variable" data-type="temp-variable" data-id="cancelReason">{{cancelReason}}</span></p><p>Adittional Note: <span class="temp-variable" data-type="temp-variable" data-id="additionalRescheduleNotes">{{additionalRescheduleNotes}}</span></p><p></p><p>Please review the request and take the necessary steps from here.</p><p>Here is the link to reschedule: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p>Here is the link to cancel: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p>Thank you,<br>Agllint AI Team</p><p></p><p></p>',
    'Aglint Ai',
    'InterviewCancelReq_email_recruiter',
    p_recruiter_id
),
(
    '<p>Invitation to Debrief Session for <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> ''s Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span> ,</p><p></p><p>Please join the debrief session to discuss <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> ''s interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> . Your insights are valuable to the selection process.</p><p>Thanks,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'debrief_email_interviewer',
    p_recruiter_id
),
(
    '<p>Interview Cancellation: <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position</p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>,</p><p></p><p>I regret to inform you that we need to cancel your scheduled interview session at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> .</p><p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span><br><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><p></p>',
    '{{organizerName}}',
    'interviewCancel_email_applicant',
    p_recruiter_id
),
(
    '<p>Reminder: Feedback Required for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Interview </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span>,</p><p>This is a friendly reminder to provide your feedback for the recent interview you conducted with <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>  for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> .</p><p></p><p>Please submit your feedback at your earliest convenience.</p><p>Thank you for your time and assistance.</p><p>Best regards,</p><p>Aglint AI Team</p>',
    'Aglint Ai',
    'candidateBook_email_interviewerForFeedback',
    p_recruiter_id
),
(
    '',
    '',
    '',
    'interviewEnd_slack_interviewerForFeedback',
    p_recruiter_id
),
(
    '',
    '',
    '',
    'interviewEnd_slack_interviewers',
    p_recruiter_id
),
(
    '',
    '',
    '',
    'interviewerConfirmation_slack_interviewers',
    p_recruiter_id
),
(
    '<p>Schedule Your Interview with <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> - Important Next Step</p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>   </p><p></p><p>Congratulations! You have been selected for an interview at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position. Your qualifications are impressive, and we are excited to meet you and discuss them further.</p><p>Please let me know your availability within the following date range: <span class="temp-variable" data-type="temp-variable" data-id="dateRange">{{dateRange}}</span> . Optionally you can let me know your location to find the slots in your preffered region .</p><p>to find suitable slots.</p><p>Alternatively you can use the following link to schedule your interview: <span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p></p><p>Looking forward to connecting with you</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
    'Aglint Ai',
    'agent_email_candidate',
    p_recruiter_id
),
(
    '<p>Reminder: Upcoming Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerFirstName">{{organizerFirstName}}</span> ,</p><p></p><p>This is a friendly reminder about the upcoming interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>.</p><p></p><p>Please ensure everything is set for a smooth interview process.</p><p>Please find the details of your interview below:</p><p></p><p>Best regards,</p><p>Aglint AI Team</p>',
    'Aglint Ai',
    'interviewStart_email_organizer',
    p_recruiter_id
),
(
    '<p>Interview Confirmation for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> ,</p><p></p><p>Please find the interview details below:</p><p><strong>Schedule:</strong></p><p>Find detailed schedule: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p><strong>Candidate Profile:</strong></p><p>Review candidate profile, resume, and score: <span class="temp-variable" data-type="temp-variable" data-id="candidateProfileLink">{{candidateProfileLink}}</span></p><p></p><p><strong>Interview Instructions:</strong></p><p>Please review the interview instructions: <span class="temp-variable" data-type="temp-variable" data-id="interviewInstructionLink">{{interviewInstructionLink}}</span></p><p></p><p><strong>Feedback Link:</strong></p><p>After the interview, kindly provide your feedback: <span class="temp-variable" data-type="temp-variable" data-id="interviewFeedbackLink">{{interviewFeedbackLink}}</span></p><p></p><p><strong>Reschedule or Cancel:</strong></p><p>If you need to reschedule or cancel this meeting, please use the following link: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p>Thank you,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span><br><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'interviewDetails_calender_interviewer',
    p_recruiter_id
),
(
    '<p>Availability Re Request</p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p>I hope this message finds you well.</p><p>I am writing to follow up regarding the availability check for your upcoming interview. It appears that the initial link we sent to confirm your availability might not have been received or may have encountered an issue.</p><p>To ensure we can schedule your interview at a convenient time, please find the link below to select your preferred time slots:</p><p><span class="temp-variable" data-type="temp-variable" data-id="availabilityReqLink">{{availabilityReqLink}}</span></p><h4></h4><p>We apologize for any inconvenience this may have caused and appreciate your understanding.</p><p></p><p>Thank you for your cooperation. We look forward to speaking with you soon.<br></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><p></p><p></p>',
    '{{companyName}}',
    'availabilityReqResend_email_candidate',
    p_recruiter_id
),
(
    '<p>Reminder: Feedback Required for <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>''s Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position</p>',
    '<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span>,</p><p>This is a friendly reminder to provide your feedback for the recent interview you conducted with {{candidateName}} for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Your feedback is crucial in helping us make informed decisions. Please submit your feedback at your earliest convenience using the following link:</p><p><span class="temp-variable" data-type="temp-variable" data-id="interviewFeedbackLink">{{interviewFeedbackLink}}</span> </p><p>Thank you for your time and assistance.</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'interviewEnd_email_interviewerForFeedback',
    p_recruiter_id
),
(
    '',
    '',
    '',
    'candidateBook_slack_interviewerForConfirmation',
    p_recruiter_id
),
(
    '<p>Scheduling Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p style="text-align: start">Thank you for submitting your application for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We are pleased to announce that you have been selected for an assessment.</p><p style="text-align: start"></p><p style="text-align: start">You are welcome to choose an assessment time that suits your schedule.</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p style="text-align: start"></p><p style="text-align: start">We wish you the best of luck and are eager to hear your insights!</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'sendSelfScheduleRequest_email_applicant',
    p_recruiter_id
),
(
    '<p>Reminder: Schedule Your Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>This is a friendly reminder about the self-schedule interview request you received for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please use the following link to schedule your interview: <span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'selfScheduleReminder_email_applicant',
    p_recruiter_id
),
(
    '<p>Re-requesting Interview Scheduling for  <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>We hope this message finds you well. Recently, we sent you an invitation to schedule your assessment for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>We noticed that you haven''t had the chance to select a time yet.</p><p>To ensure the process moves smoothly, we kindly ask you to choose an assessment time that suits your schedule at your earliest convenience.</p><p><span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p></p><p>We wish you the best of luck and look forward to hearing your insights!</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'rescheduleSelfSchedule_email_applicant',
    p_recruiter_id
),
(
    '<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> Declined Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span></p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> ,</p><p></p><p>We regret to inform you that the <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> has declined the interview request for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please arrange for an alternative interviewer or reschedule as needed.</p><p>Change Interviewer <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span></p><p>Rescedule <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span></p><p></p><p>Best regards,</p><p>Aglint Ai</p><p></p>',
    'Aglint Ai',
    'meetingDeclined_email_organizer',
    p_recruiter_id
),
(
    '<p>Reminder</p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span> ,</p><p></p><p>This is a friendly reminder about the upcoming interview you will be conducting for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> .</p><p></p><p>Please be prepared to join the interview on time.</p><p></p><p>Please find the interview details bellow.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><pre><code class="language-markdown"></code></pre>',
    '{{organizerName}}',
    'interviewStart_email_interviewers',
    p_recruiter_id
);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.insert_debrief_session(interview_plan_id uuid, session_order integer, session_duration integer, break_duration integer, location text, schedule_type interview_schedule_type, name text, members jsonb, members_meta jsonb)
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
            name,
            members_meta
        )
        VALUES (
            interview_plan_id,
            session_order,
            session_duration,
            break_duration,
            'debrief'::session_type,
            location,
            schedule_type,
            name, 
            members_meta
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

CREATE OR REPLACE FUNCTION public.insert_email_templates(recruiter_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    template_data text;
    template_row text[];
    template_type text;
    template_id uuid;
    template_created_at timestamp with time zone;
    template_from_name text;
    template_subject text;
    template_body text;
BEGIN
    -- Sample CSV data as text (assuming you have it loaded or read from somewhere)
    template_data := 'debrief_email_interviewer,0a853069-11e1-4535-b934-a4d6c63de108,2024-05-29 14:31:34.671027+00,{ { interviewerFirstName } },d353b3a0-3e19-45d0-8623-4bd35577f548,Invitation to Debrief Session for { { candidateName } }\''s Interview for {{jobRole}},"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"interviewerFirstName\">{{interviewerFirstName}}</span>,</p><p></p><p>Please join the debrief session to discuss <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateName\">{{candidateName}}</span>\''s interview for <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"jobRole\">{{jobRole}}</span>. Your insights are valuable to the selection process.</p><p>Thanks,</p><p><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{companyName}}</span> Recruitment Team</p>"
applicantReject_email_applicant,5ea9c5ab-5db7-4dbd-a7d9-3ab746c1f06e,2024-06-10 09:13:04.296532+00,{{ recruiterFullName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Your application at {{ companyName }},"<p>Hi {{ candidateFirstName }},</p><p>Thank you for your interest in the {{ jobTitle }} position.</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>{{ companyName }}</p>"
interviewStart_slack_interviewers,5982f1ac-a435-467f-96c3-c56582ed8ba8,2024-06-07 09:55:31.009397+00,,d353b3a0-3e19-45d0-8623-4bd35577f548,Interview reminder,"Interview reminder"
phoneScreen_email_candidate,4e0609a2-33db-436d-83a3-3d39da234a0e,2024-05-30 07:09:49.95669+00,{{ recruiterFullName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Invitation to a Phone Screening Session for {{firstName}} - {{jobTitle}} Position at {{companyName}},"<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well. We appreciate your interest in the {{ jobTitle }} position at {{ companyName }}, and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: {{ phoneScreeningLink }}</p><p>Best regards,</p><p>{{ companyName }}</p>"
interviewEnd_slack_interviewers,80fe6406-7f15-4205-9037-7a0df51cf2b8,2024-06-06 14:20:30.664329+00,,d353b3a0-3e19-45d0-8623-4bd35577f548,Slack RSVP Message,"Coding Interview scheduled with candidate: Aman Aman - Staff Frontend Engineer Meeting Place: google_meet Meeting Time: June 10 04:00 AM - 04:30 AM IST Duration: 30 Minutes"
interviewerConfirmation_slack_interviewers,b51a20bb-ae5a-4dc3-a6e5-96a6b8a952b7,2024-06-06 09:21:32.785312+00,,d353b3a0-3e19-45d0-8623-4bd35577f548,Confirmation Slack Message To Interviewer,"Initial Screening scheduled with candidate: Muharrem Muharrem - Staff Software Engineer Meeting Place: google_meet Meeting Time: June 13 04:30 AM - 05:00 AM IST Duration: 30 Minutes"
interviewCancel_email_applicant,3bef4198-e7d7-48cd-b127-61d23dfbe309,2024-05-30 07:14:36.704522+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Interview Cancellation: {{jobRole}} Position,"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateName\">{{ candidateName }}</span>,</p><p></p><p>I regret to inform you that we need to cancel your scheduled interview session at <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span>.</p><p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p><p></p><p>Best regards,</p><p><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"recruiterName\">{{ recruiterName }}</span><br><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span></p>"
interviewStart_email_applicant,80587302-95f6-49e9-b467-b954937ef996,2024-06-05 07:03:07.427382+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Interview Reminder: {{jobRole}} Position at {{companyName}},"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateFirstName\">{{ candidateFirstName }}</span>,</p><p></p><p style=\"text-align: start\">This is a friendly reminder of your upcoming interview for the <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"jobRole\">{{ jobRole }}</span> position at <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span> scheduled for <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"startDate\">{{ startDate }}</span> <strong>at</strong> <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"time\">{{ time }}</span>.</p><p style=\"text-align: start\"></p><p style=\"text-align: start\">We look forward to a successful interview!</p><p style=\"text-align: start\"></p><p style=\"text-align: start\">Warm regards,</p><p style=\"text-align: start\">The <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span> Team</p>"
selfScheduleReminder_email_applicant,68d46030-fc59-4b69-b388-4ccd02a3d685,2024-06-11 04:22:27.85218+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Reminder: Schedule Your Interview for {{jobRole}} at {{companyName}},"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateFirstName\">{{ candidateFirstName }}</span>,</p><p></p><p>This is a friendly reminder about the self-schedule interview request you received for the <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"jobRole\">{{ jobRole }}</span> position at <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span>.</p><p></p><p>Please use the following link to schedule your interview: <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"selfScheduleLink\">{{ selfScheduleLink }}</span></p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,</p><p><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"recruiterName\">{{ recruiterName }}</span><br><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span></p>"
rescheduleRequest_email_candidate,bb456baf-8ca5-4c15-bd95-235e9b4cb889,2024-06-06 09:33:08.96832+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Request to Reschedule Interview for {{jobRole}} Position,"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateName\">{{ candidateName }}</span>,</p><p></p><p>We need to reschedule your interview for the <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"jobRole\">{{ jobRole }}</span> position at <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span>. Please use the link below to select a new date and time that works for you.</p><p></p><p>Reschedule your interview: <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"rescheduleLink\">{{ rescheduleLink }}</span></p><p>Sorry for any inconvenience this may cause, and we look forward to speaking with you soon.</p><p></p><p>Best regards,</p><p><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"recruiterName\">{{ recruiterName }}</span><br><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span></p>"
rescheduleConfirm_email_candidate,1352fa6a-9799-4765-9d98-3a20a5aa1e88,2024-05-28 05:24:14.334442+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Interview Rescheduled for {{jobRole}} Position,"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateName\">{{ candidateName }}</span>,</p><p></p><p>Your interview for the <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"jobRole\">{{ jobRole }}</span> position at <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span> has been rescheduled as per your request.</p><p></p><p>Please find the new details below:</p><p>Date: <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"newDate\">{{ newDate }}</span></p><p>Time: <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"newTime\">{{ newTime }}</span></p><p></p><p>Looking forward to our conversation!</p><p></p><p>Best regards,</p><p><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"recruiterName\">{{ recruiterName }}</span><br><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span></p>"
offerSend_email_candidate,16d95a4c-0af2-4ba6-996d-5c0a7ac03f5c,2024-06-12 04:36:56.188787+00,{{ recruiterFullName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Congratulations! You\''ve Been Selected for the {{ jobTitle }} Position at {{ companyName }},"<p>Dear {{ candidateFirstName }},</p><p>We are delighted to inform you that you have been selected for the {{ jobTitle }} position at {{ companyName }}.</p><p>Please find the attached offer letter for your review. If you have any questions or need further information, do not hesitate to reach out.</p><p>We are excited to have you join our team and look forward to your positive response.</p><p>Best regards,</p><p>{{ recruiterFullName }}</p>"
applicantReject_email_candidate,ebd38e2c-eeb7-46c6-b1c3-0fbd8a234a01,2024-06-10 09:27:50.265145+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Update on Your Application at {{ companyName }},"<p>Dear {{ candidateFirstName }},</p><p>Thank you for your interest in the {{ jobTitle }} position at {{ companyName }} and for taking the time to apply and interview with us.</p><p>We regret to inform you that we have decided to move forward with another candidate for this position.</p><p>We appreciate your effort and interest in our company and wish you all the best in your future endeavors.</p><p>Best regards,</p><p>{{ recruiterName }}</p>"
firstRound_email_candidate,6ef32992-fad7-4b0a-b321-11853ae89ef6,2024-05-27 09:44:41.226378+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Next Steps: First Round Interview for {{ jobTitle }} at {{ companyName }},"<p>Dear {{ candidateFirstName }},</p><p>Congratulations! We were impressed by your application for the {{ jobTitle }} position at {{ companyName }} and would like to invite you to the first round of interviews.</p><p>Below are the details:</p><p>Date: {{ interviewDate }}</p><p>Time: {{ interviewTime }}</p><p>Location: {{ interviewLocation }}</p><p>We look forward to learning more about your qualifications and experience during this interview.</p><p>Best regards,</p><p>{{ recruiterName }}</p>"
offerAccept_email_candidate,9983a586-f75c-4f7e-b032-d0e7b9d450cf,2024-06-11 09:19:21.74592+00,{{ recruiterFullName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Welcome to {{ companyName }}!,"<p>Dear {{ candidateFirstName }},</p><p>We are thrilled to welcome you to {{ companyName }} as our new {{ jobTitle }}!</p><p>Your start date is {{ startDate }}. Please find attached the details of your onboarding process.</p><p>Looking forward to working with you!</p><p>Best regards,</p><p>{{ recruiterFullName }}</p>"
';

    -- Split the CSV data into individual rows
    FOREACH template_row SLICE 1 IN ARRAY string_to_array(template_data, '\n')
    LOOP
        -- Split each row into columns
        template_row := string_to_array(template_row, ',');

        -- Assign variables from the row
        template_type := template_row[1];
        template_id := template_row[2]::uuid;
        template_created_at := template_row[3]::timestamp with time zone;
        template_from_name := template_row[4];
        -- template_to_id := template_row[5]::uuid;
        template_subject := template_row[6];
        template_body := template_row[7];

        -- Insert the data into the email_templates table
        INSERT INTO email_templates (
            template_type, 
          
            from_name, 
            recruiter_id, 
            subject, 
            body
        )
        VALUES (
            template_type,
            template_from_name, 
            recruiter_id, 
            template_subject, 
            template_body
        );
    END LOOP;
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
    '{{companyName}}',
    'applicantReject_email_applicant',
    p_job_id
),
(
    'We received your application for a position at {{companyName}}',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p>Thank you for your interest in the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position.</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
    '{{companyName}}',
    'applicationRecieved_email_applicant',
    p_job_id
);

END;
$function$
;

CREATE OR REPLACE FUNCTION public.interviewing_state_active()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public_jobs
  SET
    active_status = jsonb_set(
      active_status,
      '{interviewing, isActive}',
      'true',
      true
    )
  WHERE
    active_status -> 'closed' ->> 'isActive' = 'false' AND
    active_status -> 'interviewing' ->> 'timeStamp' IS NOT NULL
    AND to_timestamp(
      active_status -> 'interviewing' ->> 'timeStamp',
      'YYYY-MM-DD'
    ) = current_date;
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

CREATE OR REPLACE FUNCTION public.levercandidatesync()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
    DECLARE
        result JSONB;
        request_results JSONB;
        app_id UUID;
        function_url TEXT;
    BEGIN
        -- Initialize an empty JSON array for the results
        result := '[]'::JSONB;

        -- Loop through the selected application IDs
        FOR app_id IN (
            SELECT job_id
            FROM lever_job_reference
            ORDER BY created_at ASC
        )
        LOOP

            SELECT value INTO function_url FROM env WHERE name = 'lever-sync';
            -- Make the HTTP request for each application_id
            SELECT
                net.http_post(
                    url := function_url,
                    body := jsonb_build_object('job_id', app_id)
                ) INTO request_results;

            -- Append the request result to the result array
            result := result || jsonb_build_object('request_result', request_results);
        END LOOP;

        -- Return the final result as a JSONB array
        RETURN result;
    END;
    $function$
;

create type "public"."location_type" as ("city" text, "state" text, "country" text);

CREATE OR REPLACE FUNCTION public.match_documents(query_embedding vector, match_count integer DEFAULT 500, filter jsonb DEFAULT '{}'::jsonb)
 RETURNS TABLE(id uuid, content text, metadata jsonb, similarity double precision, json_resume jsonb)
 LANGUAGE plpgsql
AS $function$
#variable_conflict use_column
begin
  return query
  select
    job_applications.application_id as id,
    content,
    json_resume as metadata,
    1 - (job_applications.resume_embedding <=> query_embedding) as similarity,
    json_resume
  from job_applications
  where metadata @> filter
  order by job_applications.resume_embedding <=> query_embedding
  limit match_count;
end;
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
    interview_meeting.meeting_flow,
    applications.job_id,
    public_jobs.recruiter_id,
    interview_session.module_id,
    ( SELECT array_agg(
                CASE
                    WHEN (interview_session.session_type = 'debrief'::session_type) THEN debrief_user.user_id
                    ELSE recruiter_user.user_id
                END) AS array_agg
           FROM (((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN recruiter_user ON ((recruiter_user.user_id = interview_module_relation.user_id)))
             LEFT JOIN recruiter_user debrief_user ON ((debrief_user.user_id = interview_session_relation.user_id)))
          WHERE ((interview_session_relation.session_id = interview_session.id) AND (interview_session_relation.is_confirmed = true))) AS confirmed_user_ids
   FROM ((((interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)))
     LEFT JOIN interview_schedule ON ((interview_schedule.id = interview_meeting.interview_schedule_id)))
     LEFT JOIN applications ON ((applications.id = interview_schedule.application_id)))
     LEFT JOIN public_jobs ON ((applications.job_id = public_jobs.id)));


create or replace view "public"."meeting_interviewers" as  WITH interview_data AS (
         SELECT interview_session_relation.id AS session_relation_id,
            interview_session_relation.interviewer_type,
            interview_session_relation.training_type,
            interview_session_relation.is_confirmed,
            interview_session.meeting_id,
            interview_session.id AS session_id,
            interview_session.session_type,
            interview_meeting.end_time,
            interview_meeting.start_time,
            interview_meeting.status,
            interview_session.session_duration,
            COALESCE(debrief_user.first_name, recruiter_user.first_name) AS first_name,
            COALESCE(debrief_user.last_name, recruiter_user.last_name) AS last_name,
            COALESCE(debrief_user.profile_image, recruiter_user.profile_image) AS profile_image,
            COALESCE(debrief_user.email, recruiter_user.email) AS email,
            COALESCE(debrief_user.user_id, recruiter_user.user_id) AS user_id,
            COALESCE(((debrief_user.scheduling_settings -> 'timeZone'::text) ->> 'tzCode'::text), ((recruiter_user.scheduling_settings -> 'timeZone'::text) ->> 'tzCode'::text)) AS tz_code,
            COALESCE(debrief_user."position", recruiter_user."position") AS "position"
           FROM (((((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
             LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
             LEFT JOIN recruiter_user ON ((recruiter_user.user_id = interview_module_relation.user_id)))
             LEFT JOIN recruiter_user debrief_user ON ((debrief_user.user_id = interview_session_relation.user_id)))
        ), time_boundaries AS (
         SELECT CURRENT_DATE AS today_start,
            ((CURRENT_DATE + '1 day'::interval) - '00:00:01'::interval) AS today_end,
            (date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '1 day'::interval) AS week_start,
            ((date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '7 days'::interval) - '00:00:01'::interval) AS week_end
        )
 SELECT interview_data.session_relation_id,
    interview_data.interviewer_type,
    interview_data.training_type,
    interview_data.is_confirmed,
    interview_data.meeting_id,
    interview_data.session_id,
    interview_data.session_type,
    interview_data.first_name,
    interview_data.last_name,
    interview_data.profile_image,
    interview_data.email,
    interview_data.user_id,
    interview_data.tz_code,
    interview_data."position",
    ( SELECT count(*) AS count
           FROM interview_data id2,
            time_boundaries tb
          WHERE ((id2.user_id = interview_data.user_id) AND ((id2.end_time >= tb.today_start) AND (id2.end_time <= tb.today_end)) AND (id2.is_confirmed = true) AND ((id2.status = 'confirmed'::interview_schedule_status) OR (id2.status = 'completed'::interview_schedule_status)))) AS totalinterviewstoday,
    ( SELECT count(*) AS count
           FROM interview_data id3,
            time_boundaries tb
          WHERE ((id3.user_id = interview_data.user_id) AND (id3.start_time >= tb.week_start) AND (id3.end_time <= tb.week_end) AND (id3.is_confirmed = true) AND ((id3.status = 'confirmed'::interview_schedule_status) OR (id3.status = 'completed'::interview_schedule_status)))) AS totalinterviewsthisweek,
    ( SELECT (COALESCE(sum(id4.session_duration), (0)::numeric) / 60.0)
           FROM interview_data id4,
            time_boundaries tb
          WHERE ((id4.user_id = interview_data.user_id) AND ((id4.end_time >= tb.today_start) AND (id4.end_time <= tb.today_end)) AND (id4.is_confirmed = true) AND ((id4.status = 'confirmed'::interview_schedule_status) OR (id4.status = 'completed'::interview_schedule_status)))) AS totalhourstoday,
    ( SELECT (COALESCE(sum(id5.session_duration), (0)::numeric) / 60.0)
           FROM interview_data id5,
            time_boundaries tb
          WHERE ((id5.user_id = interview_data.user_id) AND (id5.start_time >= tb.week_start) AND (id5.end_time <= tb.week_end) AND (id5.is_confirmed = true) AND ((id5.status = 'confirmed'::interview_schedule_status) OR (id5.status = 'completed'::interview_schedule_status)))) AS totalhoursthisweek
   FROM interview_data;


CREATE OR REPLACE FUNCTION public.move_scheduled_jobs_sourcing_to_active()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public_jobs
  SET
    active_status = jsonb_set(
      active_status,
      '{sourcing, isActive}',
      'true',
      true
    )
  WHERE
    active_status -> 'closed' ->> 'isActive' = 'false'
    AND active_status -> 'sourcing' ->> 'timeStamp' IS NOT NULL
    AND to_date(
      active_status -> 'sourcing' ->> 'timeStamp',
      'YYYY-MM-DD'
    ) = current_date;
END;
$function$
;

create type "public"."my_table_type" as ("name" text, "age" integer, "city" text);

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
                'candidates', (
                    SELECT json_build_object(
                        'id', cand.id,
                        'email', cand.email,
                        'first_name' , cand.first_name,
                        'last_name' , cand.last_name,
                        'timezone' , cand.timezone
                    )
                    ),
                'interview_module', row_to_json(intmod),
                'job', (
                    SELECT json_build_object(
                        'id', pj.id,
                        'created_at', pj.created_at, 
                        'job_title', pj.job_title, 
                        'description', pj.description 
                    ) 
                ),
                'users', COALESCE((
                    SELECT jsonb_agg(
                         CASE WHEN intses.session_type = 'debrief' THEN
                            jsonb_build_object(
                            'id', debuser.user_id,
                            'first_name', debuser.first_name,
                            'last_name', debuser.last_name,
                            'email', debuser.email,
                            'profile_image', debuser.profile_image,
                            'position', debuser.position,
                            'department', debuser.department,
                            'interview_session_relation', row_to_json(isr),
                            'location', debuser.interview_location,
                            'scheduling_settings', debuser.scheduling_settings,
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
                                WHERE recuser2.user_id = debuser.user_id
                                AND intsr2.is_confirmed = true
                                AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
                                AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
                            )
                        )::jsonb
                            ELSE
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
                            END

                       
                    )
                    FROM interview_session_relation isr
                    LEFT JOIN interview_module_relation inm ON inm.id = isr.interview_module_relation_id
                    LEFT JOIN recruiter_user ru ON ru.user_id = inm.user_id
                    LEFT JOIN recruiter_user debuser ON debuser.user_id = isr.user_id
                    WHERE isr.session_id = intses.id
                ), '[]'::jsonb),
                'hiring_manager', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.hiring_manager
                ),
                'interview_coordinator', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.interview_coordinator
                ),
                'recruiter', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.recruiter
                ),
                'recruiting_coordinator', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.recruiting_coordinator
                ),
                'sourcer', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.sourcer
                ),
                 'organizer', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=intmeet.organizer_id
                )
            )
        INTO schedule_data
        FROM interview_meeting intmeet
        LEFT JOIN interview_session intses ON intses.meeting_id = intmeet.id 
        LEFT JOIN interview_module intmod ON intmod.id = intses.module_id
        LEFT JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id  
        LEFT JOIN applications app ON insc.application_id = app.id
        LEFT JOIN candidates cand ON app.candidate_id = cand.id 
        LEFT JOIN candidate_files cf ON cf.id = app.candidate_file_id  
        LEFT JOIN public_jobs pj ON pj.id = app.job_id
        WHERE intmeet.id = target_meeting_id
        GROUP BY intmeet.id, intses.id, intmod.id, insc.id, app.id, cand.id, cf.id, pj.id;
        
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
        WHERE intmeet.id = target_meeting_id;
        
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
 RETURNS TABLE(interview_meeting json, users json, candidate json)
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
                            'module_id',indmod.id
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
                    'is_confirmed',intsr.is_confirmed,
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
    WHERE intmodrel.user_id = target_user_id AND intmeet.status IN ('completed', 'confirmed', 'cancelled') 
    AND intsesrel.is_confirmed = true
    GROUP BY intmeet.id,indmod.id, insc.id , intses.id, app.id, pj.id;
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

CREATE OR REPLACE FUNCTION public.score_application(scores jsonb DEFAULT '{}'::jsonb, parameter_weights jsonb DEFAULT '{}'::jsonb)
 RETURNS numeric
 LANGUAGE plpgsql
AS $function$
  BEGIN
  RETURN 
    trunc((coalesce((scores -> 'skills')::numeric * (parameter_weights -> 'skills')::numeric, 0) +  
    coalesce((scores -> 'education')::numeric * (parameter_weights -> 'education')::numeric, 0) +
    coalesce((scores -> 'experience')::numeric * (parameter_weights -> 'experience')::numeric, 0)) / 100);
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

CREATE OR REPLACE FUNCTION public.set_active_rec(in_user_id uuid, in_recruiter_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
is_admin boolean;
BEGIN
      update recruiter_relation set is_active = (in_recruiter_id = recruiter_id) where user_id = in_user_id;
    RETURN true;
END;
$function$
;

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
  score numeric;
  title TEXT;
BEGIN
  IF NEW.processing_status = 'success' AND NEW.score_json -> 'scores' IS NOT NULL THEN
    select 
      score_application(
        applications.score_json -> 'scores',
        public_jobs.parameter_weights
      )
    into
      score
    from
      applications
    inner join
      public_jobs on
        public_jobs.id = applications.job_id
    where
      applications.id = NEW.id;
    IF score IS NOT NULL AND score >= 0 THEN
      title := 'Application was scored ' || score || '%';
      INSERT INTO application_logs(application_id, title, logged_by, module)
      VALUES (NEW.id, title, 'system', 'jobs');
    END IF;
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log2()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  score numeric;
  title TEXT;
BEGIN
  with scores as (
    select 
      application_status_view.id,
      application_status_view.resume_score
    from
      application_status_view
    where
      application_status_view.job_id = NEW.id and
      application_status_view.resume_score >= 0
  )
  insert into application_logs(application_id, title, logged_by, module)
  select 
    scores.id,
    'Application was scored ' || scores.resume_score || '%',
    'system',
    'jobs'
  from
    scores;
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

CREATE OR REPLACE FUNCTION public.trigger_interview_plan_warning()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare 
  plan_count integer;
begin
  select 
    coalesce(count(interview_plan.id), 0) as count into plan_count
  from 
    public_jobs 
  left join
    interview_plan on
      interview_plan.job_id = public_jobs.id
  where
    public_jobs.id = old.job_id;
  if plan_count = 0 then
    update 
      public_jobs
    set
      interview_plan_warning_ignore = false
    where
      public_jobs.id = old.job_id;
  end if;
  return old;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_interview_session_warning()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare 
  session_info record;
begin
  select 
    public_jobs.id as job_id,
    coalesce(count(interview_session.id), 0) as count into session_info
  from 
    public_jobs
  left join
    interview_plan on
      interview_plan.job_id = public_jobs.id
  left join
    interview_session on
        interview_session.interview_plan_id = interview_plan.id
  where 
    interview_plan.id = old.interview_plan_id
  group by
    public_jobs.id;
  if session_info.count = 0 then
    update 
      public_jobs
    set
      interview_session_warning_ignore = false
    where
      public_jobs.id = session_info.job_id;
  end if;
  return old;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_rescore_applications()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if old.jd_json <> new.jd_json then
    update 
      applications
    set 
      processing_status = 'not started',
      score_json = null,
      retry = 0
    where
      applications.job_id = new.id;
  end if;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_set_application_to_new()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  update applications 
  set is_new = true
  where id = new.id;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_set_processing_started_at()
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
            'meeting_duration', interview_session.session_duration,
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
  RETURN QUERY SELECT interview_sessions, interviewers, service_cred, interview_modules, comp_schedule_setting, coalesce(int_meetings,Array[]::jsonb[]);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_debrief_session(session_id uuid, session_duration integer, break_duration integer, location text, schedule_type interview_schedule_type, name text, members jsonb, members_meta jsonb)
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
      name = update_debrief_session.name,
      members_meta = update_debrief_session.members_meta
    WHERE interview_session.id = update_debrief_session.session_id;
    -- DELETE FROM interview_session_relation WHERE interview_session_relation.session_id = update_debrief_session.session_id;
    DELETE FROM 
        interview_session_relation
    WHERE user_id IN (
        SELECT
            user_id
        FROM 
            interview_session_relation
        WHERE
            interview_session_relation.session_id = update_debrief_session.session_id AND
            user_id NOT IN (
                SELECT 
                    (entry->>'id')::uuid AS user_id
                FROM 
                    jsonb_array_elements(members) AS entry
            )
    );

    INSERT INTO interview_session_relation (user_id, session_id)
    SELECT
        user_id,
        update_debrief_session.session_id AS session_id
    FROM
        (
            SELECT 
                (entry->>'id')::uuid AS user_id
            FROM 
                jsonb_array_elements(members) AS entry
        ) as temp
    WHERE
        user_id NOT IN (
            SELECT 
                interview_session_relation.user_id
            FROM
                interview_session_relation
            WHERE
                interview_session_relation.session_id = update_debrief_session.session_id
        );

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

CREATE OR REPLACE FUNCTION public.update_interviewer_cnt()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check if the session type is 'debrief'
    IF (SELECT session_type FROM public.interview_session WHERE id = NEW.session_id) = 'debrief' THEN
        -- Update the interviewer_cnt
        UPDATE public.interview_session
        SET interviewer_cnt = interviewer_cnt + 1
        WHERE id = NEW.session_id;
    END IF;
    RETURN NEW;
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
  Update workflow_action_logs set status = 'failed' where status = 'processing' and started_at < CURRENT_TIMESTAMP - INTERVAL '4 minutes';
  RETURN true;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_candidate_request_availability()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    -- if NEW.slots is not null then
        FOR wa_record IN
            select w_a.workflow_id as workflow_id, w_a.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase,
                  json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'email_type', c_e_t.type, 'avail_req_id', NEW.id, 'sessions') as meta
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
END;$function$
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


create or replace view "public"."application_status_view" as  WITH processing_state_cte AS (
         SELECT applications.id,
            applications.job_id,
            applications.created_at,
            applications.applied_at,
            applications.overall_interview_score AS interview_score,
            applications.processing_status,
            applications.bookmarked,
            applications.is_new,
            applications.status,
            (applications.score_json -> 'badges'::text) AS badges,
            applications.candidate_id,
            applications.candidate_file_id,
            candidate_files.file_url,
                CASE
                    WHEN (applications.is_resume_fetching = true) THEN 'fetching'::resume_processing_state
                    WHEN (candidate_files.file_url IS NULL) THEN 'unavailable'::resume_processing_state
                    WHEN ((applications.processing_status = 'not started'::application_processing_status) OR (applications.processing_status = 'processing'::application_processing_status)) THEN 'processing'::resume_processing_state
                    WHEN ((applications.score_json -> 'scores'::text) IS NOT NULL) THEN 'processed'::resume_processing_state
                    ELSE 'unparsable'::resume_processing_state
                END AS resume_processing_state,
            (applications.score_json -> 'scores'::text) AS scores
           FROM (applications
             LEFT JOIN candidate_files ON ((candidate_files.id = applications.candidate_file_id)))
        ), resume_processing_state AS (
         SELECT processing_state_cte.id,
            processing_state_cte.job_id,
            processing_state_cte.created_at,
            processing_state_cte.applied_at,
            processing_state_cte.interview_score,
            processing_state_cte.processing_status,
            processing_state_cte.bookmarked,
            processing_state_cte.is_new,
            processing_state_cte.status,
            processing_state_cte.badges,
            processing_state_cte.candidate_id,
            processing_state_cte.candidate_file_id,
            processing_state_cte.file_url,
            processing_state_cte.resume_processing_state,
                CASE
                    WHEN ((processing_state_cte.resume_processing_state = 'processed'::resume_processing_state) AND (public_jobs.parameter_weights IS NOT NULL)) THEN ( SELECT score_application(processing_state_cte.scores, public_jobs.parameter_weights) AS score_application)
                    WHEN (processing_state_cte.resume_processing_state = 'fetching'::resume_processing_state) THEN ('-2'::integer)::numeric
                    WHEN (processing_state_cte.resume_processing_state = 'unparsable'::resume_processing_state) THEN ('-3'::integer)::numeric
                    WHEN (processing_state_cte.resume_processing_state = 'unavailable'::resume_processing_state) THEN ('-4'::integer)::numeric
                    ELSE ('-1'::integer)::numeric
                END AS resume_score
           FROM (processing_state_cte
             LEFT JOIN public_jobs ON ((public_jobs.id = processing_state_cte.job_id)))
        )
 SELECT resume_processing_state.id,
    resume_processing_state.job_id,
    resume_processing_state.created_at,
    resume_processing_state.applied_at,
    resume_processing_state.interview_score,
    resume_processing_state.processing_status,
    resume_processing_state.bookmarked,
    resume_processing_state.is_new,
    resume_processing_state.status,
    resume_processing_state.badges,
    resume_processing_state.candidate_id,
    resume_processing_state.candidate_file_id,
    resume_processing_state.file_url,
    resume_processing_state.resume_processing_state,
    resume_processing_state.resume_score,
        CASE
            WHEN (resume_processing_state.resume_score >= (80)::numeric) THEN 'top_match'::application_match
            WHEN ((resume_processing_state.resume_score >= (60)::numeric) AND (resume_processing_state.resume_score < (80)::numeric)) THEN 'good_match'::application_match
            WHEN ((resume_processing_state.resume_score >= (40)::numeric) AND (resume_processing_state.resume_score < (60)::numeric)) THEN 'average_match'::application_match
            WHEN ((resume_processing_state.resume_score >= (20)::numeric) AND (resume_processing_state.resume_score < (40)::numeric)) THEN 'poor_match'::application_match
            WHEN ((resume_processing_state.resume_score >= (0)::numeric) AND (resume_processing_state.resume_score < (20)::numeric)) THEN 'not_a_match'::application_match
            ELSE 'unknown_match'::application_match
        END AS application_match
   FROM resume_processing_state;


create or replace view "public"."application_view" as  WITH application_candidate_cte AS (
         SELECT application_status_view.id,
            application_status_view.job_id,
            application_status_view.created_at,
            application_status_view.applied_at,
            application_status_view.interview_score,
            application_status_view.processing_status,
            application_status_view.bookmarked,
            application_status_view.is_new,
            application_status_view.status,
            application_status_view.badges,
            application_status_view.candidate_id,
            application_status_view.candidate_file_id,
            application_status_view.file_url,
            application_status_view.resume_processing_state,
            application_status_view.resume_score,
            application_status_view.application_match,
            candidates.email,
            TRIM(BOTH FROM (((COALESCE(candidates.first_name, ''::citext))::text || ' '::text) || (COALESCE(candidates.last_name, ''::citext))::text)) AS name,
            candidates.city,
            candidates.linkedin,
            candidates.phone,
            candidates.state,
            candidates.country,
            candidates.current_job_title
           FROM (application_status_view
             LEFT JOIN candidates ON ((candidates.id = application_status_view.candidate_id)))
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
    application_candidate_cte.file_url,
    application_candidate_cte.resume_processing_state,
    COALESCE(application_meeting_cte.meeting_details, '[]'::jsonb) AS meeting_details,
    application_task_cte.task_count,
    application_logs_cte.activity_count,
    application_latest_activity_cte.latest_activity,
    application_candidate_cte.application_match
   FROM ((((application_candidate_cte
     LEFT JOIN application_meeting_cte ON ((application_meeting_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_task_cte ON ((application_task_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_logs_cte ON ((application_logs_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_latest_activity_cte ON ((application_latest_activity_cte.application_id = application_candidate_cte.id)));


create or replace view "public"."job_view" as  WITH application_status_view_cte AS (
         SELECT application_status_view.status,
            application_status_view.job_id,
            application_status_view.resume_processing_state,
            application_status_view.application_match
           FROM application_status_view
        ), job_cte AS (
         SELECT public_jobs.assessment,
            public_jobs.company,
            public_jobs.created_at,
            public_jobs.department,
            public_jobs.description,
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
            public_jobs.interview_coordinator,
            public_jobs.interview_plan_warning_ignore,
            public_jobs.interview_session_warning_ignore
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
            COALESCE(count(application_status_view_cte.status), (0)::bigint) AS count
           FROM (status_count_default_cte
             LEFT JOIN application_status_view_cte ON (((status_count_default_cte.id = application_status_view_cte.job_id) AND (status_count_default_cte.status = application_status_view_cte.status))))
          GROUP BY status_count_default_cte.id, status_count_default_cte.status
        ), job_section_count_cte AS (
         SELECT status_count_cte.id,
            json_object_agg(status_count_cte.status, status_count_cte.count) AS section_count
           FROM status_count_cte
          GROUP BY status_count_cte.id
        ), application_match_default_cte AS (
         SELECT job_cte_1.id,
            defaults.application_match
           FROM (( SELECT 'top_match'::application_match AS application_match
                UNION
                 SELECT 'good_match'::application_match AS application_match
                UNION
                 SELECT 'average_match'::application_match AS application_match
                UNION
                 SELECT 'poor_match'::application_match AS application_match
                UNION
                 SELECT 'not_a_match'::application_match AS application_match
                UNION
                 SELECT 'unknown_match'::application_match AS application_match) defaults
             CROSS JOIN job_cte job_cte_1)
        ), application_match_cte AS (
         SELECT application_match_default_cte.id,
            application_match_default_cte.application_match,
            COALESCE(count(application_status_view_cte.application_match), (0)::bigint) AS count
           FROM (application_match_default_cte
             LEFT JOIN application_status_view_cte ON (((application_match_default_cte.id = application_status_view_cte.job_id) AND (application_match_default_cte.application_match = application_status_view_cte.application_match))))
          GROUP BY application_match_default_cte.id, application_match_default_cte.application_match
        ), job_application_match_cte AS (
         SELECT application_match_cte.id,
            json_object_agg(application_match_cte.application_match, application_match_cte.count) AS application_match
           FROM application_match_cte
          GROUP BY application_match_cte.id
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
            COALESCE(count(application_status_view_cte.resume_processing_state), (0)::bigint) AS count
           FROM (processing_count_default_cte
             LEFT JOIN application_status_view_cte ON (((processing_count_default_cte.id = application_status_view_cte.job_id) AND (processing_count_default_cte.resume_processing_state = application_status_view_cte.resume_processing_state))))
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
    job_cte.interview_plan_warning_ignore,
    job_cte.interview_session_warning_ignore,
    job_section_count_cte.section_count,
    job_processing_count_cte.processing_count,
    job_flags_cte.flags,
    job_application_match_cte.application_match
   FROM ((((job_cte
     LEFT JOIN job_section_count_cte ON ((job_section_count_cte.id = job_cte.id)))
     LEFT JOIN job_processing_count_cte ON ((job_processing_count_cte.id = job_cte.id)))
     LEFT JOIN job_flags_cte ON ((job_flags_cte.id = job_cte.id)))
     LEFT JOIN job_application_match_cte ON ((job_application_match_cte.id = job_cte.id)));


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

grant delete on table "public"."ai_videos" to "anon";

grant insert on table "public"."ai_videos" to "anon";

grant references on table "public"."ai_videos" to "anon";

grant select on table "public"."ai_videos" to "anon";

grant trigger on table "public"."ai_videos" to "anon";

grant truncate on table "public"."ai_videos" to "anon";

grant update on table "public"."ai_videos" to "anon";

grant delete on table "public"."ai_videos" to "authenticated";

grant insert on table "public"."ai_videos" to "authenticated";

grant references on table "public"."ai_videos" to "authenticated";

grant select on table "public"."ai_videos" to "authenticated";

grant trigger on table "public"."ai_videos" to "authenticated";

grant truncate on table "public"."ai_videos" to "authenticated";

grant update on table "public"."ai_videos" to "authenticated";

grant delete on table "public"."ai_videos" to "service_role";

grant insert on table "public"."ai_videos" to "service_role";

grant references on table "public"."ai_videos" to "service_role";

grant select on table "public"."ai_videos" to "service_role";

grant trigger on table "public"."ai_videos" to "service_role";

grant truncate on table "public"."ai_videos" to "service_role";

grant update on table "public"."ai_videos" to "service_role";

grant delete on table "public"."application_email_status" to "anon";

grant insert on table "public"."application_email_status" to "anon";

grant references on table "public"."application_email_status" to "anon";

grant select on table "public"."application_email_status" to "anon";

grant trigger on table "public"."application_email_status" to "anon";

grant truncate on table "public"."application_email_status" to "anon";

grant update on table "public"."application_email_status" to "anon";

grant delete on table "public"."application_email_status" to "authenticated";

grant insert on table "public"."application_email_status" to "authenticated";

grant references on table "public"."application_email_status" to "authenticated";

grant select on table "public"."application_email_status" to "authenticated";

grant trigger on table "public"."application_email_status" to "authenticated";

grant truncate on table "public"."application_email_status" to "authenticated";

grant update on table "public"."application_email_status" to "authenticated";

grant delete on table "public"."application_email_status" to "service_role";

grant insert on table "public"."application_email_status" to "service_role";

grant references on table "public"."application_email_status" to "service_role";

grant select on table "public"."application_email_status" to "service_role";

grant trigger on table "public"."application_email_status" to "service_role";

grant truncate on table "public"."application_email_status" to "service_role";

grant update on table "public"."application_email_status" to "service_role";

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

grant delete on table "public"."application_reference" to "anon";

grant insert on table "public"."application_reference" to "anon";

grant references on table "public"."application_reference" to "anon";

grant select on table "public"."application_reference" to "anon";

grant trigger on table "public"."application_reference" to "anon";

grant truncate on table "public"."application_reference" to "anon";

grant update on table "public"."application_reference" to "anon";

grant delete on table "public"."application_reference" to "authenticated";

grant insert on table "public"."application_reference" to "authenticated";

grant references on table "public"."application_reference" to "authenticated";

grant select on table "public"."application_reference" to "authenticated";

grant trigger on table "public"."application_reference" to "authenticated";

grant truncate on table "public"."application_reference" to "authenticated";

grant update on table "public"."application_reference" to "authenticated";

grant delete on table "public"."application_reference" to "service_role";

grant insert on table "public"."application_reference" to "service_role";

grant references on table "public"."application_reference" to "service_role";

grant select on table "public"."application_reference" to "service_role";

grant trigger on table "public"."application_reference" to "service_role";

grant truncate on table "public"."application_reference" to "service_role";

grant update on table "public"."application_reference" to "service_role";

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

grant delete on table "public"."candidate_request_availability" to "anon";

grant insert on table "public"."candidate_request_availability" to "anon";

grant references on table "public"."candidate_request_availability" to "anon";

grant select on table "public"."candidate_request_availability" to "anon";

grant trigger on table "public"."candidate_request_availability" to "anon";

grant truncate on table "public"."candidate_request_availability" to "anon";

grant update on table "public"."candidate_request_availability" to "anon";

grant delete on table "public"."candidate_request_availability" to "authenticated";

grant insert on table "public"."candidate_request_availability" to "authenticated";

grant references on table "public"."candidate_request_availability" to "authenticated";

grant select on table "public"."candidate_request_availability" to "authenticated";

grant trigger on table "public"."candidate_request_availability" to "authenticated";

grant truncate on table "public"."candidate_request_availability" to "authenticated";

grant update on table "public"."candidate_request_availability" to "authenticated";

grant delete on table "public"."candidate_request_availability" to "service_role";

grant insert on table "public"."candidate_request_availability" to "service_role";

grant references on table "public"."candidate_request_availability" to "service_role";

grant select on table "public"."candidate_request_availability" to "service_role";

grant trigger on table "public"."candidate_request_availability" to "service_role";

grant truncate on table "public"."candidate_request_availability" to "service_role";

grant update on table "public"."candidate_request_availability" to "service_role";

grant delete on table "public"."candidate_search_history" to "anon";

grant insert on table "public"."candidate_search_history" to "anon";

grant references on table "public"."candidate_search_history" to "anon";

grant select on table "public"."candidate_search_history" to "anon";

grant trigger on table "public"."candidate_search_history" to "anon";

grant truncate on table "public"."candidate_search_history" to "anon";

grant update on table "public"."candidate_search_history" to "anon";

grant delete on table "public"."candidate_search_history" to "authenticated";

grant insert on table "public"."candidate_search_history" to "authenticated";

grant references on table "public"."candidate_search_history" to "authenticated";

grant select on table "public"."candidate_search_history" to "authenticated";

grant trigger on table "public"."candidate_search_history" to "authenticated";

grant truncate on table "public"."candidate_search_history" to "authenticated";

grant update on table "public"."candidate_search_history" to "authenticated";

grant delete on table "public"."candidate_search_history" to "service_role";

grant insert on table "public"."candidate_search_history" to "service_role";

grant references on table "public"."candidate_search_history" to "service_role";

grant select on table "public"."candidate_search_history" to "service_role";

grant trigger on table "public"."candidate_search_history" to "service_role";

grant truncate on table "public"."candidate_search_history" to "service_role";

grant update on table "public"."candidate_search_history" to "service_role";

grant delete on table "public"."candidates" to "anon";

grant insert on table "public"."candidates" to "anon";

grant references on table "public"."candidates" to "anon";

grant select on table "public"."candidates" to "anon";

grant trigger on table "public"."candidates" to "anon";

grant truncate on table "public"."candidates" to "anon";

grant update on table "public"."candidates" to "anon";

grant delete on table "public"."candidates" to "authenticated";

grant insert on table "public"."candidates" to "authenticated";

grant references on table "public"."candidates" to "authenticated";

grant select on table "public"."candidates" to "authenticated";

grant trigger on table "public"."candidates" to "authenticated";

grant truncate on table "public"."candidates" to "authenticated";

grant update on table "public"."candidates" to "authenticated";

grant delete on table "public"."candidates" to "service_role";

grant insert on table "public"."candidates" to "service_role";

grant references on table "public"."candidates" to "service_role";

grant select on table "public"."candidates" to "service_role";

grant trigger on table "public"."candidates" to "service_role";

grant truncate on table "public"."candidates" to "service_role";

grant update on table "public"."candidates" to "service_role";

grant delete on table "public"."company_email_template" to "anon";

grant insert on table "public"."company_email_template" to "anon";

grant references on table "public"."company_email_template" to "anon";

grant select on table "public"."company_email_template" to "anon";

grant trigger on table "public"."company_email_template" to "anon";

grant truncate on table "public"."company_email_template" to "anon";

grant update on table "public"."company_email_template" to "anon";

grant delete on table "public"."company_email_template" to "authenticated";

grant insert on table "public"."company_email_template" to "authenticated";

grant references on table "public"."company_email_template" to "authenticated";

grant select on table "public"."company_email_template" to "authenticated";

grant trigger on table "public"."company_email_template" to "authenticated";

grant truncate on table "public"."company_email_template" to "authenticated";

grant update on table "public"."company_email_template" to "authenticated";

grant delete on table "public"."company_email_template" to "service_role";

grant insert on table "public"."company_email_template" to "service_role";

grant references on table "public"."company_email_template" to "service_role";

grant select on table "public"."company_email_template" to "service_role";

grant trigger on table "public"."company_email_template" to "service_role";

grant truncate on table "public"."company_email_template" to "service_role";

grant update on table "public"."company_email_template" to "service_role";

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

grant delete on table "public"."env" to "anon";

grant insert on table "public"."env" to "anon";

grant references on table "public"."env" to "anon";

grant select on table "public"."env" to "anon";

grant trigger on table "public"."env" to "anon";

grant truncate on table "public"."env" to "anon";

grant update on table "public"."env" to "anon";

grant delete on table "public"."env" to "authenticated";

grant insert on table "public"."env" to "authenticated";

grant references on table "public"."env" to "authenticated";

grant select on table "public"."env" to "authenticated";

grant trigger on table "public"."env" to "authenticated";

grant truncate on table "public"."env" to "authenticated";

grant update on table "public"."env" to "authenticated";

grant delete on table "public"."env" to "service_role";

grant insert on table "public"."env" to "service_role";

grant references on table "public"."env" to "service_role";

grant select on table "public"."env" to "service_role";

grant trigger on table "public"."env" to "service_role";

grant truncate on table "public"."env" to "service_role";

grant update on table "public"."env" to "service_role";

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

grant delete on table "public"."greenhouse_reference" to "anon";

grant insert on table "public"."greenhouse_reference" to "anon";

grant references on table "public"."greenhouse_reference" to "anon";

grant select on table "public"."greenhouse_reference" to "anon";

grant trigger on table "public"."greenhouse_reference" to "anon";

grant truncate on table "public"."greenhouse_reference" to "anon";

grant update on table "public"."greenhouse_reference" to "anon";

grant delete on table "public"."greenhouse_reference" to "authenticated";

grant insert on table "public"."greenhouse_reference" to "authenticated";

grant references on table "public"."greenhouse_reference" to "authenticated";

grant select on table "public"."greenhouse_reference" to "authenticated";

grant trigger on table "public"."greenhouse_reference" to "authenticated";

grant truncate on table "public"."greenhouse_reference" to "authenticated";

grant update on table "public"."greenhouse_reference" to "authenticated";

grant delete on table "public"."greenhouse_reference" to "service_role";

grant insert on table "public"."greenhouse_reference" to "service_role";

grant references on table "public"."greenhouse_reference" to "service_role";

grant select on table "public"."greenhouse_reference" to "service_role";

grant trigger on table "public"."greenhouse_reference" to "service_role";

grant truncate on table "public"."greenhouse_reference" to "service_role";

grant update on table "public"."greenhouse_reference" to "service_role";

grant delete on table "public"."integrations" to "anon";

grant insert on table "public"."integrations" to "anon";

grant references on table "public"."integrations" to "anon";

grant select on table "public"."integrations" to "anon";

grant trigger on table "public"."integrations" to "anon";

grant truncate on table "public"."integrations" to "anon";

grant update on table "public"."integrations" to "anon";

grant delete on table "public"."integrations" to "authenticated";

grant insert on table "public"."integrations" to "authenticated";

grant references on table "public"."integrations" to "authenticated";

grant select on table "public"."integrations" to "authenticated";

grant trigger on table "public"."integrations" to "authenticated";

grant truncate on table "public"."integrations" to "authenticated";

grant update on table "public"."integrations" to "authenticated";

grant delete on table "public"."integrations" to "service_role";

grant insert on table "public"."integrations" to "service_role";

grant references on table "public"."integrations" to "service_role";

grant select on table "public"."integrations" to "service_role";

grant trigger on table "public"."integrations" to "service_role";

grant truncate on table "public"."integrations" to "service_role";

grant update on table "public"."integrations" to "service_role";

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

grant delete on table "public"."job_reference" to "anon";

grant insert on table "public"."job_reference" to "anon";

grant references on table "public"."job_reference" to "anon";

grant select on table "public"."job_reference" to "anon";

grant trigger on table "public"."job_reference" to "anon";

grant truncate on table "public"."job_reference" to "anon";

grant update on table "public"."job_reference" to "anon";

grant delete on table "public"."job_reference" to "authenticated";

grant insert on table "public"."job_reference" to "authenticated";

grant references on table "public"."job_reference" to "authenticated";

grant select on table "public"."job_reference" to "authenticated";

grant trigger on table "public"."job_reference" to "authenticated";

grant truncate on table "public"."job_reference" to "authenticated";

grant update on table "public"."job_reference" to "authenticated";

grant delete on table "public"."job_reference" to "service_role";

grant insert on table "public"."job_reference" to "service_role";

grant references on table "public"."job_reference" to "service_role";

grant select on table "public"."job_reference" to "service_role";

grant trigger on table "public"."job_reference" to "service_role";

grant truncate on table "public"."job_reference" to "service_role";

grant update on table "public"."job_reference" to "service_role";

grant delete on table "public"."lever_job_reference" to "anon";

grant insert on table "public"."lever_job_reference" to "anon";

grant references on table "public"."lever_job_reference" to "anon";

grant select on table "public"."lever_job_reference" to "anon";

grant trigger on table "public"."lever_job_reference" to "anon";

grant truncate on table "public"."lever_job_reference" to "anon";

grant update on table "public"."lever_job_reference" to "anon";

grant delete on table "public"."lever_job_reference" to "authenticated";

grant insert on table "public"."lever_job_reference" to "authenticated";

grant references on table "public"."lever_job_reference" to "authenticated";

grant select on table "public"."lever_job_reference" to "authenticated";

grant trigger on table "public"."lever_job_reference" to "authenticated";

grant truncate on table "public"."lever_job_reference" to "authenticated";

grant update on table "public"."lever_job_reference" to "authenticated";

grant delete on table "public"."lever_job_reference" to "service_role";

grant insert on table "public"."lever_job_reference" to "service_role";

grant references on table "public"."lever_job_reference" to "service_role";

grant select on table "public"."lever_job_reference" to "service_role";

grant trigger on table "public"."lever_job_reference" to "service_role";

grant truncate on table "public"."lever_job_reference" to "service_role";

grant update on table "public"."lever_job_reference" to "service_role";

grant delete on table "public"."lever_reference" to "anon";

grant insert on table "public"."lever_reference" to "anon";

grant references on table "public"."lever_reference" to "anon";

grant select on table "public"."lever_reference" to "anon";

grant trigger on table "public"."lever_reference" to "anon";

grant truncate on table "public"."lever_reference" to "anon";

grant update on table "public"."lever_reference" to "anon";

grant delete on table "public"."lever_reference" to "authenticated";

grant insert on table "public"."lever_reference" to "authenticated";

grant references on table "public"."lever_reference" to "authenticated";

grant select on table "public"."lever_reference" to "authenticated";

grant trigger on table "public"."lever_reference" to "authenticated";

grant truncate on table "public"."lever_reference" to "authenticated";

grant update on table "public"."lever_reference" to "authenticated";

grant delete on table "public"."lever_reference" to "service_role";

grant insert on table "public"."lever_reference" to "service_role";

grant references on table "public"."lever_reference" to "service_role";

grant select on table "public"."lever_reference" to "service_role";

grant trigger on table "public"."lever_reference" to "service_role";

grant truncate on table "public"."lever_reference" to "service_role";

grant update on table "public"."lever_reference" to "service_role";

grant delete on table "public"."logs" to "anon";

grant insert on table "public"."logs" to "anon";

grant references on table "public"."logs" to "anon";

grant select on table "public"."logs" to "anon";

grant trigger on table "public"."logs" to "anon";

grant truncate on table "public"."logs" to "anon";

grant update on table "public"."logs" to "anon";

grant delete on table "public"."logs" to "authenticated";

grant insert on table "public"."logs" to "authenticated";

grant references on table "public"."logs" to "authenticated";

grant select on table "public"."logs" to "authenticated";

grant trigger on table "public"."logs" to "authenticated";

grant truncate on table "public"."logs" to "authenticated";

grant update on table "public"."logs" to "authenticated";

grant delete on table "public"."logs" to "service_role";

grant insert on table "public"."logs" to "service_role";

grant references on table "public"."logs" to "service_role";

grant select on table "public"."logs" to "service_role";

grant trigger on table "public"."logs" to "service_role";

grant truncate on table "public"."logs" to "service_role";

grant update on table "public"."logs" to "service_role";

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

grant delete on table "public"."notify_me" to "anon";

grant insert on table "public"."notify_me" to "anon";

grant references on table "public"."notify_me" to "anon";

grant select on table "public"."notify_me" to "anon";

grant trigger on table "public"."notify_me" to "anon";

grant truncate on table "public"."notify_me" to "anon";

grant update on table "public"."notify_me" to "anon";

grant delete on table "public"."notify_me" to "authenticated";

grant insert on table "public"."notify_me" to "authenticated";

grant references on table "public"."notify_me" to "authenticated";

grant select on table "public"."notify_me" to "authenticated";

grant trigger on table "public"."notify_me" to "authenticated";

grant truncate on table "public"."notify_me" to "authenticated";

grant update on table "public"."notify_me" to "authenticated";

grant delete on table "public"."notify_me" to "service_role";

grant insert on table "public"."notify_me" to "service_role";

grant references on table "public"."notify_me" to "service_role";

grant select on table "public"."notify_me" to "service_role";

grant trigger on table "public"."notify_me" to "service_role";

grant truncate on table "public"."notify_me" to "service_role";

grant update on table "public"."notify_me" to "service_role";

grant delete on table "public"."outreached_emails" to "anon";

grant insert on table "public"."outreached_emails" to "anon";

grant references on table "public"."outreached_emails" to "anon";

grant select on table "public"."outreached_emails" to "anon";

grant trigger on table "public"."outreached_emails" to "anon";

grant truncate on table "public"."outreached_emails" to "anon";

grant update on table "public"."outreached_emails" to "anon";

grant delete on table "public"."outreached_emails" to "authenticated";

grant insert on table "public"."outreached_emails" to "authenticated";

grant references on table "public"."outreached_emails" to "authenticated";

grant select on table "public"."outreached_emails" to "authenticated";

grant trigger on table "public"."outreached_emails" to "authenticated";

grant truncate on table "public"."outreached_emails" to "authenticated";

grant update on table "public"."outreached_emails" to "authenticated";

grant delete on table "public"."outreached_emails" to "service_role";

grant insert on table "public"."outreached_emails" to "service_role";

grant references on table "public"."outreached_emails" to "service_role";

grant select on table "public"."outreached_emails" to "service_role";

grant trigger on table "public"."outreached_emails" to "service_role";

grant truncate on table "public"."outreached_emails" to "service_role";

grant update on table "public"."outreached_emails" to "service_role";

grant delete on table "public"."permissions" to "anon";

grant insert on table "public"."permissions" to "anon";

grant references on table "public"."permissions" to "anon";

grant select on table "public"."permissions" to "anon";

grant trigger on table "public"."permissions" to "anon";

grant truncate on table "public"."permissions" to "anon";

grant update on table "public"."permissions" to "anon";

grant delete on table "public"."permissions" to "authenticated";

grant insert on table "public"."permissions" to "authenticated";

grant references on table "public"."permissions" to "authenticated";

grant select on table "public"."permissions" to "authenticated";

grant trigger on table "public"."permissions" to "authenticated";

grant truncate on table "public"."permissions" to "authenticated";

grant update on table "public"."permissions" to "authenticated";

grant delete on table "public"."permissions" to "service_role";

grant insert on table "public"."permissions" to "service_role";

grant references on table "public"."permissions" to "service_role";

grant select on table "public"."permissions" to "service_role";

grant trigger on table "public"."permissions" to "service_role";

grant truncate on table "public"."permissions" to "service_role";

grant update on table "public"."permissions" to "service_role";

grant delete on table "public"."plan_count" to "anon";

grant insert on table "public"."plan_count" to "anon";

grant references on table "public"."plan_count" to "anon";

grant select on table "public"."plan_count" to "anon";

grant trigger on table "public"."plan_count" to "anon";

grant truncate on table "public"."plan_count" to "anon";

grant update on table "public"."plan_count" to "anon";

grant delete on table "public"."plan_count" to "authenticated";

grant insert on table "public"."plan_count" to "authenticated";

grant references on table "public"."plan_count" to "authenticated";

grant select on table "public"."plan_count" to "authenticated";

grant trigger on table "public"."plan_count" to "authenticated";

grant truncate on table "public"."plan_count" to "authenticated";

grant update on table "public"."plan_count" to "authenticated";

grant delete on table "public"."plan_count" to "service_role";

grant insert on table "public"."plan_count" to "service_role";

grant references on table "public"."plan_count" to "service_role";

grant select on table "public"."plan_count" to "service_role";

grant trigger on table "public"."plan_count" to "service_role";

grant truncate on table "public"."plan_count" to "service_role";

grant update on table "public"."plan_count" to "service_role";

grant delete on table "public"."public_jobs" to "anon";

grant insert on table "public"."public_jobs" to "anon";

grant references on table "public"."public_jobs" to "anon";

grant select on table "public"."public_jobs" to "anon";

grant trigger on table "public"."public_jobs" to "anon";

grant truncate on table "public"."public_jobs" to "anon";

grant update on table "public"."public_jobs" to "anon";

grant delete on table "public"."public_jobs" to "authenticated";

grant insert on table "public"."public_jobs" to "authenticated";

grant references on table "public"."public_jobs" to "authenticated";

grant select on table "public"."public_jobs" to "authenticated";

grant trigger on table "public"."public_jobs" to "authenticated";

grant truncate on table "public"."public_jobs" to "authenticated";

grant update on table "public"."public_jobs" to "authenticated";

grant delete on table "public"."public_jobs" to "service_role";

grant insert on table "public"."public_jobs" to "service_role";

grant references on table "public"."public_jobs" to "service_role";

grant select on table "public"."public_jobs" to "service_role";

grant trigger on table "public"."public_jobs" to "service_role";

grant truncate on table "public"."public_jobs" to "service_role";

grant update on table "public"."public_jobs" to "service_role";

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

grant delete on table "public"."recruiter" to "anon";

grant insert on table "public"."recruiter" to "anon";

grant references on table "public"."recruiter" to "anon";

grant select on table "public"."recruiter" to "anon";

grant trigger on table "public"."recruiter" to "anon";

grant truncate on table "public"."recruiter" to "anon";

grant update on table "public"."recruiter" to "anon";

grant delete on table "public"."recruiter" to "authenticated";

grant insert on table "public"."recruiter" to "authenticated";

grant references on table "public"."recruiter" to "authenticated";

grant select on table "public"."recruiter" to "authenticated";

grant trigger on table "public"."recruiter" to "authenticated";

grant truncate on table "public"."recruiter" to "authenticated";

grant update on table "public"."recruiter" to "authenticated";

grant delete on table "public"."recruiter" to "service_role";

grant insert on table "public"."recruiter" to "service_role";

grant references on table "public"."recruiter" to "service_role";

grant select on table "public"."recruiter" to "service_role";

grant trigger on table "public"."recruiter" to "service_role";

grant truncate on table "public"."recruiter" to "service_role";

grant update on table "public"."recruiter" to "service_role";

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

grant delete on table "public"."recruiter_user" to "anon";

grant insert on table "public"."recruiter_user" to "anon";

grant references on table "public"."recruiter_user" to "anon";

grant select on table "public"."recruiter_user" to "anon";

grant trigger on table "public"."recruiter_user" to "anon";

grant truncate on table "public"."recruiter_user" to "anon";

grant update on table "public"."recruiter_user" to "anon";

grant delete on table "public"."recruiter_user" to "authenticated";

grant insert on table "public"."recruiter_user" to "authenticated";

grant references on table "public"."recruiter_user" to "authenticated";

grant select on table "public"."recruiter_user" to "authenticated";

grant trigger on table "public"."recruiter_user" to "authenticated";

grant truncate on table "public"."recruiter_user" to "authenticated";

grant update on table "public"."recruiter_user" to "authenticated";

grant delete on table "public"."recruiter_user" to "service_role";

grant insert on table "public"."recruiter_user" to "service_role";

grant references on table "public"."recruiter_user" to "service_role";

grant select on table "public"."recruiter_user" to "service_role";

grant trigger on table "public"."recruiter_user" to "service_role";

grant truncate on table "public"."recruiter_user" to "service_role";

grant update on table "public"."recruiter_user" to "service_role";

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

grant delete on table "public"."request_session_relation" to "anon";

grant insert on table "public"."request_session_relation" to "anon";

grant references on table "public"."request_session_relation" to "anon";

grant select on table "public"."request_session_relation" to "anon";

grant trigger on table "public"."request_session_relation" to "anon";

grant truncate on table "public"."request_session_relation" to "anon";

grant update on table "public"."request_session_relation" to "anon";

grant delete on table "public"."request_session_relation" to "authenticated";

grant insert on table "public"."request_session_relation" to "authenticated";

grant references on table "public"."request_session_relation" to "authenticated";

grant select on table "public"."request_session_relation" to "authenticated";

grant trigger on table "public"."request_session_relation" to "authenticated";

grant truncate on table "public"."request_session_relation" to "authenticated";

grant update on table "public"."request_session_relation" to "authenticated";

grant delete on table "public"."request_session_relation" to "service_role";

grant insert on table "public"."request_session_relation" to "service_role";

grant references on table "public"."request_session_relation" to "service_role";

grant select on table "public"."request_session_relation" to "service_role";

grant trigger on table "public"."request_session_relation" to "service_role";

grant truncate on table "public"."request_session_relation" to "service_role";

grant update on table "public"."request_session_relation" to "service_role";

grant delete on table "public"."role_permissions" to "anon";

grant insert on table "public"."role_permissions" to "anon";

grant references on table "public"."role_permissions" to "anon";

grant select on table "public"."role_permissions" to "anon";

grant trigger on table "public"."role_permissions" to "anon";

grant truncate on table "public"."role_permissions" to "anon";

grant update on table "public"."role_permissions" to "anon";

grant delete on table "public"."role_permissions" to "authenticated";

grant insert on table "public"."role_permissions" to "authenticated";

grant references on table "public"."role_permissions" to "authenticated";

grant select on table "public"."role_permissions" to "authenticated";

grant trigger on table "public"."role_permissions" to "authenticated";

grant truncate on table "public"."role_permissions" to "authenticated";

grant update on table "public"."role_permissions" to "authenticated";

grant delete on table "public"."role_permissions" to "service_role";

grant insert on table "public"."role_permissions" to "service_role";

grant references on table "public"."role_permissions" to "service_role";

grant select on table "public"."role_permissions" to "service_role";

grant trigger on table "public"."role_permissions" to "service_role";

grant truncate on table "public"."role_permissions" to "service_role";

grant update on table "public"."role_permissions" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."rp_logs" to "anon";

grant insert on table "public"."rp_logs" to "anon";

grant references on table "public"."rp_logs" to "anon";

grant select on table "public"."rp_logs" to "anon";

grant trigger on table "public"."rp_logs" to "anon";

grant truncate on table "public"."rp_logs" to "anon";

grant update on table "public"."rp_logs" to "anon";

grant delete on table "public"."rp_logs" to "authenticated";

grant insert on table "public"."rp_logs" to "authenticated";

grant references on table "public"."rp_logs" to "authenticated";

grant select on table "public"."rp_logs" to "authenticated";

grant trigger on table "public"."rp_logs" to "authenticated";

grant truncate on table "public"."rp_logs" to "authenticated";

grant update on table "public"."rp_logs" to "authenticated";

grant delete on table "public"."rp_logs" to "service_role";

grant insert on table "public"."rp_logs" to "service_role";

grant references on table "public"."rp_logs" to "service_role";

grant select on table "public"."rp_logs" to "service_role";

grant trigger on table "public"."rp_logs" to "service_role";

grant truncate on table "public"."rp_logs" to "service_role";

grant update on table "public"."rp_logs" to "service_role";

grant delete on table "public"."rp_token_usage" to "anon";

grant insert on table "public"."rp_token_usage" to "anon";

grant references on table "public"."rp_token_usage" to "anon";

grant select on table "public"."rp_token_usage" to "anon";

grant trigger on table "public"."rp_token_usage" to "anon";

grant truncate on table "public"."rp_token_usage" to "anon";

grant update on table "public"."rp_token_usage" to "anon";

grant delete on table "public"."rp_token_usage" to "authenticated";

grant insert on table "public"."rp_token_usage" to "authenticated";

grant references on table "public"."rp_token_usage" to "authenticated";

grant select on table "public"."rp_token_usage" to "authenticated";

grant trigger on table "public"."rp_token_usage" to "authenticated";

grant truncate on table "public"."rp_token_usage" to "authenticated";

grant update on table "public"."rp_token_usage" to "authenticated";

grant delete on table "public"."rp_token_usage" to "service_role";

grant insert on table "public"."rp_token_usage" to "service_role";

grant references on table "public"."rp_token_usage" to "service_role";

grant select on table "public"."rp_token_usage" to "service_role";

grant trigger on table "public"."rp_token_usage" to "service_role";

grant truncate on table "public"."rp_token_usage" to "service_role";

grant update on table "public"."rp_token_usage" to "service_role";

grant delete on table "public"."scheduling_agent_chat_history" to "anon";

grant insert on table "public"."scheduling_agent_chat_history" to "anon";

grant references on table "public"."scheduling_agent_chat_history" to "anon";

grant select on table "public"."scheduling_agent_chat_history" to "anon";

grant trigger on table "public"."scheduling_agent_chat_history" to "anon";

grant truncate on table "public"."scheduling_agent_chat_history" to "anon";

grant update on table "public"."scheduling_agent_chat_history" to "anon";

grant delete on table "public"."scheduling_agent_chat_history" to "authenticated";

grant insert on table "public"."scheduling_agent_chat_history" to "authenticated";

grant references on table "public"."scheduling_agent_chat_history" to "authenticated";

grant select on table "public"."scheduling_agent_chat_history" to "authenticated";

grant trigger on table "public"."scheduling_agent_chat_history" to "authenticated";

grant truncate on table "public"."scheduling_agent_chat_history" to "authenticated";

grant update on table "public"."scheduling_agent_chat_history" to "authenticated";

grant delete on table "public"."scheduling_agent_chat_history" to "service_role";

grant insert on table "public"."scheduling_agent_chat_history" to "service_role";

grant references on table "public"."scheduling_agent_chat_history" to "service_role";

grant select on table "public"."scheduling_agent_chat_history" to "service_role";

grant trigger on table "public"."scheduling_agent_chat_history" to "service_role";

grant truncate on table "public"."scheduling_agent_chat_history" to "service_role";

grant update on table "public"."scheduling_agent_chat_history" to "service_role";

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

grant delete on table "public"."session_count" to "anon";

grant insert on table "public"."session_count" to "anon";

grant references on table "public"."session_count" to "anon";

grant select on table "public"."session_count" to "anon";

grant trigger on table "public"."session_count" to "anon";

grant truncate on table "public"."session_count" to "anon";

grant update on table "public"."session_count" to "anon";

grant delete on table "public"."session_count" to "authenticated";

grant insert on table "public"."session_count" to "authenticated";

grant references on table "public"."session_count" to "authenticated";

grant select on table "public"."session_count" to "authenticated";

grant trigger on table "public"."session_count" to "authenticated";

grant truncate on table "public"."session_count" to "authenticated";

grant update on table "public"."session_count" to "authenticated";

grant delete on table "public"."session_count" to "service_role";

grant insert on table "public"."session_count" to "service_role";

grant references on table "public"."session_count" to "service_role";

grant select on table "public"."session_count" to "service_role";

grant trigger on table "public"."session_count" to "service_role";

grant truncate on table "public"."session_count" to "service_role";

grant update on table "public"."session_count" to "service_role";

grant delete on table "public"."sessions_count" to "anon";

grant insert on table "public"."sessions_count" to "anon";

grant references on table "public"."sessions_count" to "anon";

grant select on table "public"."sessions_count" to "anon";

grant trigger on table "public"."sessions_count" to "anon";

grant truncate on table "public"."sessions_count" to "anon";

grant update on table "public"."sessions_count" to "anon";

grant delete on table "public"."sessions_count" to "authenticated";

grant insert on table "public"."sessions_count" to "authenticated";

grant references on table "public"."sessions_count" to "authenticated";

grant select on table "public"."sessions_count" to "authenticated";

grant trigger on table "public"."sessions_count" to "authenticated";

grant truncate on table "public"."sessions_count" to "authenticated";

grant update on table "public"."sessions_count" to "authenticated";

grant delete on table "public"."sessions_count" to "service_role";

grant insert on table "public"."sessions_count" to "service_role";

grant references on table "public"."sessions_count" to "service_role";

grant select on table "public"."sessions_count" to "service_role";

grant trigger on table "public"."sessions_count" to "service_role";

grant truncate on table "public"."sessions_count" to "service_role";

grant update on table "public"."sessions_count" to "service_role";

grant delete on table "public"."support_groups" to "anon";

grant insert on table "public"."support_groups" to "anon";

grant references on table "public"."support_groups" to "anon";

grant select on table "public"."support_groups" to "anon";

grant trigger on table "public"."support_groups" to "anon";

grant truncate on table "public"."support_groups" to "anon";

grant update on table "public"."support_groups" to "anon";

grant delete on table "public"."support_groups" to "authenticated";

grant insert on table "public"."support_groups" to "authenticated";

grant references on table "public"."support_groups" to "authenticated";

grant select on table "public"."support_groups" to "authenticated";

grant trigger on table "public"."support_groups" to "authenticated";

grant truncate on table "public"."support_groups" to "authenticated";

grant update on table "public"."support_groups" to "authenticated";

grant delete on table "public"."support_groups" to "service_role";

grant insert on table "public"."support_groups" to "service_role";

grant references on table "public"."support_groups" to "service_role";

grant select on table "public"."support_groups" to "service_role";

grant trigger on table "public"."support_groups" to "service_role";

grant truncate on table "public"."support_groups" to "service_role";

grant update on table "public"."support_groups" to "service_role";

grant delete on table "public"."support_ticket" to "anon";

grant insert on table "public"."support_ticket" to "anon";

grant references on table "public"."support_ticket" to "anon";

grant select on table "public"."support_ticket" to "anon";

grant trigger on table "public"."support_ticket" to "anon";

grant truncate on table "public"."support_ticket" to "anon";

grant update on table "public"."support_ticket" to "anon";

grant delete on table "public"."support_ticket" to "authenticated";

grant insert on table "public"."support_ticket" to "authenticated";

grant references on table "public"."support_ticket" to "authenticated";

grant select on table "public"."support_ticket" to "authenticated";

grant trigger on table "public"."support_ticket" to "authenticated";

grant truncate on table "public"."support_ticket" to "authenticated";

grant update on table "public"."support_ticket" to "authenticated";

grant delete on table "public"."support_ticket" to "service_role";

grant insert on table "public"."support_ticket" to "service_role";

grant references on table "public"."support_ticket" to "service_role";

grant select on table "public"."support_ticket" to "service_role";

grant trigger on table "public"."support_ticket" to "service_role";

grant truncate on table "public"."support_ticket" to "service_role";

grant update on table "public"."support_ticket" to "service_role";

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

grant delete on table "public"."threads" to "anon";

grant insert on table "public"."threads" to "anon";

grant references on table "public"."threads" to "anon";

grant select on table "public"."threads" to "anon";

grant trigger on table "public"."threads" to "anon";

grant truncate on table "public"."threads" to "anon";

grant update on table "public"."threads" to "anon";

grant delete on table "public"."threads" to "authenticated";

grant insert on table "public"."threads" to "authenticated";

grant references on table "public"."threads" to "authenticated";

grant select on table "public"."threads" to "authenticated";

grant trigger on table "public"."threads" to "authenticated";

grant truncate on table "public"."threads" to "authenticated";

grant update on table "public"."threads" to "authenticated";

grant delete on table "public"."threads" to "service_role";

grant insert on table "public"."threads" to "service_role";

grant references on table "public"."threads" to "service_role";

grant select on table "public"."threads" to "service_role";

grant trigger on table "public"."threads" to "service_role";

grant truncate on table "public"."threads" to "service_role";

grant update on table "public"."threads" to "service_role";

grant delete on table "public"."workflow" to "anon";

grant insert on table "public"."workflow" to "anon";

grant references on table "public"."workflow" to "anon";

grant select on table "public"."workflow" to "anon";

grant trigger on table "public"."workflow" to "anon";

grant truncate on table "public"."workflow" to "anon";

grant update on table "public"."workflow" to "anon";

grant delete on table "public"."workflow" to "authenticated";

grant insert on table "public"."workflow" to "authenticated";

grant references on table "public"."workflow" to "authenticated";

grant select on table "public"."workflow" to "authenticated";

grant trigger on table "public"."workflow" to "authenticated";

grant truncate on table "public"."workflow" to "authenticated";

grant update on table "public"."workflow" to "authenticated";

grant delete on table "public"."workflow" to "service_role";

grant insert on table "public"."workflow" to "service_role";

grant references on table "public"."workflow" to "service_role";

grant select on table "public"."workflow" to "service_role";

grant trigger on table "public"."workflow" to "service_role";

grant truncate on table "public"."workflow" to "service_role";

grant update on table "public"."workflow" to "service_role";

grant delete on table "public"."workflow_action" to "anon";

grant insert on table "public"."workflow_action" to "anon";

grant references on table "public"."workflow_action" to "anon";

grant select on table "public"."workflow_action" to "anon";

grant trigger on table "public"."workflow_action" to "anon";

grant truncate on table "public"."workflow_action" to "anon";

grant update on table "public"."workflow_action" to "anon";

grant delete on table "public"."workflow_action" to "authenticated";

grant insert on table "public"."workflow_action" to "authenticated";

grant references on table "public"."workflow_action" to "authenticated";

grant select on table "public"."workflow_action" to "authenticated";

grant trigger on table "public"."workflow_action" to "authenticated";

grant truncate on table "public"."workflow_action" to "authenticated";

grant update on table "public"."workflow_action" to "authenticated";

grant delete on table "public"."workflow_action" to "service_role";

grant insert on table "public"."workflow_action" to "service_role";

grant references on table "public"."workflow_action" to "service_role";

grant select on table "public"."workflow_action" to "service_role";

grant trigger on table "public"."workflow_action" to "service_role";

grant truncate on table "public"."workflow_action" to "service_role";

grant update on table "public"."workflow_action" to "service_role";

grant delete on table "public"."workflow_action_logs" to "anon";

grant insert on table "public"."workflow_action_logs" to "anon";

grant references on table "public"."workflow_action_logs" to "anon";

grant select on table "public"."workflow_action_logs" to "anon";

grant trigger on table "public"."workflow_action_logs" to "anon";

grant truncate on table "public"."workflow_action_logs" to "anon";

grant update on table "public"."workflow_action_logs" to "anon";

grant delete on table "public"."workflow_action_logs" to "authenticated";

grant insert on table "public"."workflow_action_logs" to "authenticated";

grant references on table "public"."workflow_action_logs" to "authenticated";

grant select on table "public"."workflow_action_logs" to "authenticated";

grant trigger on table "public"."workflow_action_logs" to "authenticated";

grant truncate on table "public"."workflow_action_logs" to "authenticated";

grant update on table "public"."workflow_action_logs" to "authenticated";

grant delete on table "public"."workflow_action_logs" to "service_role";

grant insert on table "public"."workflow_action_logs" to "service_role";

grant references on table "public"."workflow_action_logs" to "service_role";

grant select on table "public"."workflow_action_logs" to "service_role";

grant trigger on table "public"."workflow_action_logs" to "service_role";

grant truncate on table "public"."workflow_action_logs" to "service_role";

grant update on table "public"."workflow_action_logs" to "service_role";

grant delete on table "public"."workflow_job_relation" to "anon";

grant insert on table "public"."workflow_job_relation" to "anon";

grant references on table "public"."workflow_job_relation" to "anon";

grant select on table "public"."workflow_job_relation" to "anon";

grant trigger on table "public"."workflow_job_relation" to "anon";

grant truncate on table "public"."workflow_job_relation" to "anon";

grant update on table "public"."workflow_job_relation" to "anon";

grant delete on table "public"."workflow_job_relation" to "authenticated";

grant insert on table "public"."workflow_job_relation" to "authenticated";

grant references on table "public"."workflow_job_relation" to "authenticated";

grant select on table "public"."workflow_job_relation" to "authenticated";

grant trigger on table "public"."workflow_job_relation" to "authenticated";

grant truncate on table "public"."workflow_job_relation" to "authenticated";

grant update on table "public"."workflow_job_relation" to "authenticated";

grant delete on table "public"."workflow_job_relation" to "service_role";

grant insert on table "public"."workflow_job_relation" to "service_role";

grant references on table "public"."workflow_job_relation" to "service_role";

grant select on table "public"."workflow_job_relation" to "service_role";

grant trigger on table "public"."workflow_job_relation" to "service_role";

grant truncate on table "public"."workflow_job_relation" to "service_role";

grant update on table "public"."workflow_job_relation" to "service_role";

create policy "authenticated delete access only"
on "public"."applications"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM public_jobs
  WHERE (public_jobs.id = applications.job_id))));


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


create policy "anon_read_only"
on "public"."public_jobs"
as permissive
for select
to anon
using ((status = 'published'::public_job_status));


create policy "authenticated_access_only"
on "public"."public_jobs"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = public_jobs.recruiter_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = public_jobs.recruiter_id))));


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


create policy "autenticated_write_only"
on "public"."recruiter_relation"
as permissive
for all
to authenticated
using ((user_id = ( SELECT auth.uid() AS uid)))
with check (false);


create policy "recruiter_user_authenticated_accesss_only"
on "public"."recruiter_user"
as permissive
for all
to authenticated
using ((user_id = ( SELECT recruiter_relation.user_id
   FROM recruiter_relation
  WHERE (recruiter_relation.user_id = recruiter_user.user_id))))
with check ((user_id = ( SELECT auth.uid() AS uid)));


CREATE TRIGGER application_import_log AFTER INSERT ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_application_import_log();

CREATE TRIGGER application_score_log AFTER UPDATE OF processing_status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_application_score_log();

CREATE TRIGGER application_status_log AFTER UPDATE OF status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_application_status_log();

CREATE TRIGGER conversion_timestamp_trigger AFTER UPDATE OF status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_conversion_timestamp();

CREATE TRIGGER set_application_to_new AFTER INSERT ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_set_application_to_new();

CREATE TRIGGER set_processing_started_at AFTER UPDATE OF processing_status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_set_processing_started_at();

CREATE TRIGGER after_insert_candidate_request_availability AFTER INSERT ON public.candidate_request_availability FOR EACH ROW EXECUTE FUNCTION workflow_log_on_insert_candidate_request_availability();

CREATE TRIGGER after_insert_interview_filter_json AFTER INSERT ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION workflow_log_on_insert_interview_filter_json();

CREATE TRIGGER after_update_interview_meeting AFTER UPDATE OF status ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION workflow_log_on_update_interview_meeting();

CREATE TRIGGER interview_plan_warning AFTER DELETE ON public.interview_plan FOR EACH ROW EXECUTE FUNCTION trigger_interview_plan_warning();

CREATE TRIGGER interview_session_warning AFTER DELETE ON public.interview_session FOR EACH ROW EXECUTE FUNCTION trigger_interview_session_warning();

CREATE TRIGGER after_update_interview_session_relation AFTER UPDATE OF is_confirmed ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION workflow_log_on_update_interview_session_relation();

CREATE TRIGGER decrement_interviewer_cnt_trigger AFTER DELETE ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION decrement_interviewer_cnt();

CREATE TRIGGER update_interviewer_cnt_trigger AFTER INSERT ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION update_interviewer_cnt();

CREATE TRIGGER application_score_log2 AFTER UPDATE OF parameter_weights ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION trigger_application_score_log2();

CREATE TRIGGER create_interview_plan AFTER INSERT ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION trigger_create_interview_plan();

CREATE TRIGGER jobs_email_template_insert_trigger AFTER INSERT ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION job_email_template_init();

CREATE TRIGGER rescore_applications AFTER UPDATE OF jd_json ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION trigger_rescore_applications();

CREATE TRIGGER workflow_auto_connect AFTER INSERT ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION trigger_workflow_auto_connect();

CREATE TRIGGER recruiter_insert_trigger AFTER INSERT ON public.recruiter FOR EACH ROW EXECUTE FUNCTION company_email_template_init();

CREATE TRIGGER workflow_action_deletion AFTER UPDATE OF trigger ON public.workflow FOR EACH ROW EXECUTE FUNCTION trigger_workflow_action_deletion();


