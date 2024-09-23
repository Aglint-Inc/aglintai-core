create extension if not exists "citext" with schema "public" version '1.6';

create type "public"."activity_type" as enum ('aglint', 'user', 'candidate');

create type "public"."agent_type" as enum ('scheduler', 'job', 'sourcing', 'screening');

create type "public"."agent_types" as enum ('scheduler', 'screening', 'job_assistant', 'sourcing');

create type "public"."application_logger" as enum ('email_agent', 'phone_agent', 'user', 'system', 'candidate');

create type "public"."application_match" as enum ('top_match', 'good_match', 'average_match', 'poor_match', 'not_a_match', 'unknown_match');

create type "public"."application_processing_status" as enum ('not started', 'processing', 'failed', 'success');

create type "public"."application_source" as enum ('ashby', 'lever', 'greenhouse', 'resume_upload', 'manual_upload', 'csv_upload', 'apply_link', 'candidate_database');

create type "public"."assessment_mode" as enum ('classic', 'verbal', 'visual');

create type "public"."cancel_type" as enum ('reschedule', 'declined');

create type "public"."db_search_type" as enum ('aglint', 'candidate');

create type "public"."email_fetch_status" as enum ('not fetched', 'success', 'unable to fetch');

create type "public"."email_slack_types" as enum ('interviewEnd_slack_interviewers', 'interviewerConfirmation_slack_interviewers', 'interviewStart_slack_interviewers', 'agent_email_candidate', 'applicantReject_email_applicant', 'applicationRecieved_email_applicant', 'confInterview_email_organizer', 'confirmInterview_email_applicant', 'debrief_email_interviewer', 'interReschedReq_email_recruiter', 'interviewCancel_email_applicant', 'InterviewCancelReq_email_recruiter', 'interviewReschedule_email_applicant', 'interviewStart_email_applicant', 'interviewStart_email_interviewers', 'phoneScreen_email_candidate', 'phoneScreenRemind_email_applicant', 'selfScheduleReminder_email_applicant', 'sendAvailReqReminder_email_applicant', 'sendSelfScheduleRequest_email_applicant', 'sendAvailabilityRequest_email_applicant', 'availabilityReqResend_email_candidate', 'interviewDetails_calender_interviewer', 'rescheduleSelfSchedule_email_applicant', 'interviewStart_email_organizer', 'meetingDeclined_email_organizer', 'meetingAccepted_email_organizer', 'candidateBook_slack_interviewerForFeedback', 'candidateBook_email_interviewerForFeedback', 'interviewEnd_slack_interviewerForFeedback', 'interviewEnd_email_interviewerForFeedback', 'candidateBook_slack_interviewerForConfirmation', 'onSignup_email_admin', 'onInvite_email_user', 'interviewEnd_email_shadowTraineeForMeetingAttendence', 'interviewEnd_email_rShadowTraineeForMeetingAttendence', 'interviewEnd_slack_shadowTraineeForMeetingAttendence', 'interviewEnd_slack_rShadowTraineeForMeetingAttendence', 'onQualified_email_trainee', 'onQualified_email_approved', 'onQualified_slack_trainee', 'onQualified_slack_approved', 'onTrainingComplete_slack_approverForTraineeMeetingQualification', 'onTrainingComplete_email_approverForTraineeMeetingQualification', 'interviewerResumed_email_admin', 'interviewEnd_slack_organizerForMeetingStatus', 'interviewEnd_email_organizerForMeetingStatus', 'onRequestSchedule_emailAgent_getCandidateAvailability', 'onRequestSchedule_emailLink_getCandidateAvailability', 'onReceivingAvailReq_agent_sendSelfScheduleRequest', 'onReceivingAvailReq_agent_confirmSlot', 'onRequestSchedule_emailLink_sendSelfSchedulingLink', 'onRequestSchedule_phoneAgent_selfSchedule', 'onRequestSchedule_emailAgent_selfSchedule', 'onRequestReschedule_emailLink_resendAvailRequest', 'onRequestCancel_agent_cancelEvents', 'onRequestCancel_slack_interviewersOrganizer', 'onRequestInterviewerDecline_agent_changeInterviewer');

create type "public"."employment_type_enum" as enum ('fulltime', 'parttime', 'contractor');

create type "public"."file_type" as enum ('resume', 'coverletter', 'cv', 'image');

create type "public"."icon_status_activity" as enum ('success', 'waiting', 'error');

create type "public"."interview_schedule_status" as enum ('waiting', 'confirmed', 'completed', 'cancelled', 'reschedule', 'not_scheduled');

create type "public"."interview_schedule_type" as enum ('in_person_meeting', 'google_meet', 'phone_call', 'zoom');

create type "public"."interviewer_type" as enum ('qualified', 'shadow', 'reverse_shadow');

create type "public"."meeting_flow" as enum ('self_scheduling', 'candidate_request', 'debrief', 'mail_agent', 'phone_agent', 'hybrid');

create type "public"."modules" as enum ('standard', 'scheduler', 'assessment', 'jobs');

create type "public"."permissions_type" as enum ('jobs_create', 'jobs_read', 'jobs_update', 'jobs_delete', 'jobs_publish', 'jobs_unpublish', 'jobs_archive', 'jobs_restore', 'jobs_assignHiringManager', 'jobs_assignRecruiter', 'jobs_assignCoordinator', 'jobs_assignSourcer', 'candidates_add', 'candidates_read', 'candidates_update', 'candidates_delete', 'candidates_moveStage', 'profileScore_view', 'profileScore_update', 'interviews_schedule', 'interviews_read', 'interviews_update', 'interviews_delete', 'reports_generate', 'reports_view', 'reports_export', 'settings_view', 'settings_update', 'tasks_enabled', 'jobs_enabled', 'scheduler_enabled', 'sourcing_enabled', 'phone_screening_enabled', 'assessment_enabled', 'integrations_enabled', 'company_setting_enabled', 'workflow_enabled', 'workflow_create', 'workflow_read', 'workflow_update', 'workflow_delete', 'team_enabled', 'team_create', 'team_read', 'team_update', 'team_delete', 'tasks_create', 'tasks_read', 'tasks_update', 'tasks_delete', 'scheduler_create', 'scheduler_read', 'scheduler_update', 'scheduler_delete', 'scheduler_request_availability', 'scheduler_send_scheduling', 'scheduler_interview_types_create', 'scheduler_interview_types_read', 'scheduler_interview_types_update', 'scheduler_interviewer_edit', 'settings_scheduler_enable', 'settings_scheduler_update', 'settings_company_enable', 'settings_company_update', 'settings_team_enable', 'settings_team_update', 'settings_roles_enable', 'settings_roles_update');

create type "public"."progress_type" as enum ('standard', 'interview_schedule', 'email_messages', 'call_completed', 'call_failed', 'email_failed', 'call_disconnected', 'email_follow_up', 'call_follow_up', 'email_follow_up_reminder', 'call_follow_up_reminder', 'request_availability_list', 'request_availability', 'self_schedule', 'send_email', 'request_submitted', 'schedule', 'closed', 'completed');

create type "public"."public_job_status" as enum ('draft', 'published', 'closed');

create type "public"."public_job_type" as enum ('contract', 'full time', 'part time', 'temporary', 'volunteer', 'internship');

create type "public"."public_job_workplace" as enum ('hybrid', 'on site', 'off site');

create type "public"."question_level" as enum ('basic', 'intermediate', 'advanced');

create type "public"."question_type" as enum ('scq', 'mcq', 'qna', 'code');

create type "public"."recruiter_rolesx" as enum ('admin', 'member', 'interviewer', 'scheduler', 'recruiter');

create type "public"."resume_processing_state" as enum ('unavailable', 'fetching', 'processing', 'unparsable', 'processed', 'unscorable');

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

create type "public"."workflow_cron_run_status" as enum ('not_started', 'processing', 'failed', 'success', 'stopped');

create type "public"."workflow_cron_trigger_tables" as enum ('interview_meeting', 'interview_session_relation', 'interview_filter_json', 'candidate_request_availability', 'interview_module_relation', 'interview_training_progress', 'request');

create type "public"."workflow_phase" as enum ('before', 'after', 'now');

create type "public"."workflow_trigger" as enum ('selfScheduleReminder', 'interviewStart', 'sendAvailReqReminder', 'interviewerConfirmation', 'interviewEnd', 'meetingDeclined', 'meetingAccepted', 'candidateBook', 'onQualified', 'onTrainingComplete', 'onReceivingAvailReq', 'onRequestSchedule', 'onRequestCancel', 'onRequestReschedule', 'onRequestInterviewerDecline');

create type "public"."workflow_type" as enum ('system', 'job');

create sequence "public"."departments_id_seq";

create sequence "public"."office_locations_id_seq";

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


create table "public"."applications" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "applied_at" timestamp with time zone not null default now(),
    "job_id" uuid not null,
    "candidate_file_id" uuid,
    "score_json" jsonb,
    "overall_score" numeric not null default '-1'::numeric,
    "processing_status" application_processing_status not null default 'not started'::application_processing_status,
    "status" text not null default 'new'::text,
    "retry" numeric not null default '0'::numeric,
    "status_emails_sent" jsonb not null default '{}'::jsonb,
    "is_resume_fetching" boolean not null default false,
    "phone_screening" jsonb,
    "candidate_id" uuid,
    "overall_interview_score" numeric not null default '-1'::numeric,
    "converted_at" timestamp with time zone,
    "feedback" jsonb,
    "bookmarked" boolean not null default false,
    "is_new" boolean not null default false,
    "source" application_source not null default 'manual_upload'::application_source,
    "processing_started_at" timestamp with time zone,
    "remote_data" jsonb,
    "remote_id" text,
    "recruiter_id" uuid not null
);


alter table "public"."applications" enable row level security;

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


create table "public"."candidate_portal_job" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "banner" text,
    "images" text[],
    "job_id" uuid default gen_random_uuid(),
    "application_id" uuid default gen_random_uuid(),
    "greetings" text
);


create table "public"."candidate_portal_message" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid default gen_random_uuid(),
    "message" text,
    "is_readed" boolean,
    "title" text,
    "availability_id" uuid,
    "filter_id" uuid
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
    "id" uuid not null default gen_random_uuid(),
    "user_timezone" text,
    "booking_confirmed" boolean not null default false,
    "visited" boolean default false,
    "slots" jsonb[],
    "request_id" uuid,
    "availability_id" text,
    "filter_id" text
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


create table "public"."departments" (
    "id" integer not null default nextval('departments_id_seq'::regclass),
    "name" text not null,
    "recruiter_id" uuid not null,
    "remote_id" text
);


create table "public"."integrations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid not null,
    "schedule_agent_email" text default 'agent@ai.aglinthq.com'::text,
    "twilio_phone_number" text default '+12512066348'::text,
    "domain_admin_email" text,
    "service_json" text,
    "ashby_key" text,
    "ashby_last_synced" text,
    "ashby_sync_token" text,
    "google_workspace_domain" text,
    "greenhouse_key" text,
    "lever_key" text,
    "zoom_auth" text,
    "greenhouse_metadata" jsonb default '{}'::jsonb
);


create table "public"."interview_filter_json" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "filter_json" jsonb not null,
    "session_ids" uuid[] not null default '{}'::uuid[],
    "created_by" uuid default auth.uid(),
    "selected_options" jsonb[],
    "viewed_on" timestamp with time zone,
    "confirmed_on" timestamp with time zone,
    "is_flow_agent" boolean not null default false,
    "schedule_options" jsonb,
    "request_id" uuid,
    "application_id" uuid not null
);


create table "public"."interview_meeting" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "meeting_json" jsonb,
    "status" interview_schedule_status not null default 'not_scheduled'::interview_schedule_status,
    "instructions" text,
    "meeting_link" text,
    "confirmed_date" timestamp with time zone,
    "start_time" timestamp with time zone,
    "end_time" timestamp with time zone,
    "cal_event_id" text,
    "candidate_feedback" jsonb,
    "organizer_id" uuid,
    "meeting_flow" meeting_flow not null default 'self_scheduling'::meeting_flow,
    "application_id" uuid not null,
    "schedule_request_id" uuid,
    "recruiter_id" uuid not null,
    "job_id" uuid not null,
    "confirmed_candidate_tz" text
);


create table "public"."interview_meeting_log" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "meeting_id" uuid,
    "status" text,
    "start_time" timestamp with time zone,
    "end_time" timestamp with time zone,
    "organizer_id" uuid,
    "meeting_flow" text,
    "delta" jsonb not null
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
    "created_by" uuid default auth.uid(),
    "is_archived" boolean not null default false,
    "department_id" integer
);


create table "public"."interview_module_approve_users" (
    "id" uuid not null default gen_random_uuid(),
    "module_id" uuid not null,
    "user_id" uuid not null
);


create table "public"."interview_module_relation" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "module_id" uuid not null,
    "pause_json" jsonb,
    "training_status" status_training not null default 'qualified'::status_training,
    "number_of_reverse_shadow" bigint not null default '0'::bigint,
    "number_of_shadow" bigint not null default '0'::bigint,
    "is_archived" boolean not null default false,
    "training_approver" uuid
);


create table "public"."interview_plan" (
    "created_at" timestamp with time zone not null default now(),
    "id" uuid not null default gen_random_uuid(),
    "job_id" uuid,
    "name" text not null default ''::text,
    "plan_order" numeric not null default '1'::numeric,
    "application_id" uuid,
    "recruiter_id" uuid not null
);


create table "public"."interview_progress" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid,
    "job_id" uuid,
    "name" text,
    "order" numeric,
    "is_completed" boolean,
    "update_at" timestamp without time zone,
    "icon" text,
    "description" text
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
    "members_meta" jsonb not null default '{"sourcer": false, "recruiter": false, "hiring_manager": false, "previous_interviewers": false, "recruiting_coordinator": false}'::jsonb,
    "parent_session_id" uuid,
    "recruiter_id" uuid not null
);


create table "public"."interview_session_cancel" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "session_relation_id" uuid,
    "reason" text not null,
    "is_resolved" boolean not null default false,
    "session_id" uuid not null,
    "type" cancel_type not null default 'declined'::cancel_type,
    "other_details" jsonb,
    "cancel_user_id" uuid,
    "is_ignored" boolean not null default false,
    "request_id" uuid,
    "application_id" uuid
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


create table "public"."interview_training_progress" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "session_relation_id" uuid not null,
    "is_approved" boolean not null default false,
    "is_attended" boolean not null default false,
    "approved_user_id" uuid
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


create table "public"."office_locations" (
    "id" integer not null default nextval('office_locations_id_seq'::regclass),
    "city" text not null,
    "line1" text not null,
    "line2" text,
    "region" text not null,
    "country" text not null,
    "zipcode" text,
    "timezone" text not null,
    "is_headquarter" boolean not null,
    "recruiter_id" uuid not null,
    "name" text,
    "remote_id" text
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
    "name" text not null,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "is_enable" boolean default true,
    "description" text,
    "title" text not null,
    "meta" jsonb default '{"module": false, "description": "", "dependency_tree": {"child": [], "parent": null, "sibling": null}}'::jsonb
);


alter table "public"."permissions" enable row level security;

create table "public"."public_jobs" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "job_title" text,
    "description" text,
    "slug" text not null default ''::text,
    "job_type" public_job_type default 'full time'::public_job_type,
    "workplace_type" public_job_workplace default 'on site'::public_job_workplace,
    "screening_setting" jsonb default '{}'::jsonb,
    "job_criteria" jsonb default '{}'::jsonb,
    "posted_by" text not null default 'Aglint'::text,
    "active_status" jsonb not null default '{"closed": {"isActive": false, "timeStamp": null}, "sourcing": {"isActive": false, "timeStamp": null}, "interviewing": {"isActive": false, "timeStamp": null}}'::jsonb,
    "updated_at" timestamp without time zone default now(),
    "recruiter_id" uuid not null,
    "new_screening_setting" jsonb not null default '{"interview": {"isManual": true, "qualificationRange": null}, "screening": {"isManual": true, "qualificationRange": null}, "interviewMail": {"isManual": true, "timestamp": null}, "feedbackVisible": false, "disqualifiedMail": {"isManual": true, "timestamp": null}}'::jsonb,
    "parameter_weights" jsonb not null default '{"skills": 0, "education": 0, "experience": 0}'::jsonb,
    "jd_json" jsonb,
    "draft" jsonb,
    "status" public_job_status not null default 'draft'::public_job_status,
    "is_ats_sync" boolean not null default false,
    "jd_changed" boolean default false,
    "scoring_criteria_loading" boolean not null default false,
    "hiring_manager" uuid,
    "recruiter" uuid,
    "recruiting_coordinator" uuid,
    "sourcer" uuid,
    "interview_coordinator" uuid,
    "interview_plan_warning_ignore" boolean not null default false,
    "interview_session_warning_ignore" boolean not null default false,
    "department_id" integer,
    "remote_id" text,
    "location_id" integer,
    "remote_sync_time" text,
    "is_pinned" boolean not null default false
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
    "company_overview" text,
    "e_o_statement" text,
    "m_v_statement" text,
    "employment_type" jsonb not null default '{"contract": true, "fulltime": true, "parttime": true, "temporary": true, "volunteer": true, "internship": true}'::jsonb,
    "workplace_type" jsonb not null default '{"hybrid": true, "onsite": true, "offsite": true}'::jsonb,
    "employee_size" text,
    "socials" jsonb default '{"custom": {}, "twitter": "", "youtube": "", "facebook": "", "linkedin": "", "instagram": ""}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "scheduling_settings" jsonb default '{"timeZone": {"utc": "+05:30", "name": "(GMT+05:30) Mumbai, Delhi, Bengaluru, Kolkata, Chennai", "label": "Asia/Calcutta (GMT+05:30)", "tzCode": "Asia/Calcutta"}, "break_hour": {"end_time": "13:00", "start_time": "12:00"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Interviews", "value": 8}, "weeklyLimit": {"type": "Interviews", "value": 41}}, "debrief_defaults": {"sourcer": false, "recruiter": false, "hiring_manager": true, "previous_interviewers": false, "recruiting_coordinator": false}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "outOfOffice": ["Maternity Leave", "Vacation", "PTO", "Out of Office"], "SoftConflicts": ["Daily Standup", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"], "recruitingBlocks": ["Dedicated Recruiting", "Recruiting Block"]}, "isAutomaticTimeZone": false}'::jsonb,
    "scheduling_reason" jsonb default '{"internal": {"decline": ["Conflict with Another Meeting", "Unexpected Urgency", "Travel Delays or Issues", "Technical Difficulties", "Other"], "cancellation": ["Position Filled", "Budget Constraints", "Reevaluation of Hiring Needs", "Other"], "rescheduling": ["Conflict with Another Meeting", "Unexpected Urgency", "Travel Delays or Issues", "Technical Difficulties", "Other"]}, "candidate": {"cancellation": ["Conflicting Schedule", "Health Reasons", "Unexpected Emergency", "Job Offer Accepted", "Other"], "rescheduling": ["Request for a Different Time", "Request for a Different Date", "Additional Preparation Needed", "Change of Interview Mode", "Other"]}}'::jsonb,
    "primary_admin" uuid not null
);


alter table "public"."recruiter" enable row level security;

create table "public"."recruiter_preferences" (
    "recruiter_id" uuid not null,
    "scoring" boolean not null default false,
    "about" text,
    "banner_image" text,
    "company_images" text[],
    "greetings" text,
    "integrations" boolean not null default false,
    "request" boolean not null default false,
    "roles" boolean default false,
    "scheduling" boolean not null default false,
    "workflow" boolean not null default false,
    "analytics" boolean not null default false,
    "candidate_portal" boolean not null default false,
    "ats" text not null default 'Aglint'::text,
    "agent" boolean not null default false,
    "reports" boolean not null default false,
    "themes" boolean not null default false
);


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
    "first_name" text not null,
    "last_name" text,
    "email" text not null,
    "profile_image" text,
    "phone" text,
    "joined_at" timestamp with time zone default now(),
    "position" text,
    "email_auth" jsonb,
    "email_outreach_templates" jsonb[],
    "schedule_auth" jsonb,
    "scheduling_settings" jsonb default '{"timeZone": {"utc": "-08:00", "name": "(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle", "label": "America/Los_Angeles (GMT-08:00)", "tzCode": "America/Los_Angeles"}, "break_hour": {"end_time": "13:30", "start_time": "13:00"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "Juneteenth National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Hours", "value": 4}, "weeklyLimit": {"type": "Hours", "value": 20}}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "outOfOffice": ["Maternity leave", "vacation", "pto", "out of office", "ooo"], "SoftConflicts": ["Daily Standup", "Sync Up", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"], "recruitingBlocks": ["dedicated recruiting", "Recruiting Block"]}, "isAutomaticTimeZone": false}'::jsonb,
    "employment" employment_type_enum not null default 'fulltime'::employment_type_enum,
    "linked_in" text,
    "status" text not null,
    "department_id" integer,
    "office_location_id" integer,
    "remote_id" text,
    "is_calendar_connected" boolean not null default false,
    "calendar_sync" jsonb,
    "calendar_sync_token" text
);


alter table "public"."recruiter_user" enable row level security;

create table "public"."request" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid default gen_random_uuid(),
    "assigner_id" uuid default auth.uid(),
    "assignee_id" uuid default auth.uid(),
    "title" text,
    "status" text not null default 'to_do'::text,
    "type" text not null,
    "is_new" boolean not null default false,
    "priority" text not null default 'standard'::text,
    "schedule_end_date" timestamp with time zone,
    "schedule_start_date" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."request_integration_tool" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid default gen_random_uuid(),
    "tool_name" text,
    "description" text
);


create table "public"."request_log" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "request_id" uuid not null,
    "assignee_id" uuid,
    "status" text,
    "type" text,
    "priority" text,
    "delta" jsonb not null
);


create table "public"."request_note" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "note" text,
    "updated_at" timestamp with time zone default now(),
    "request_id" uuid default gen_random_uuid(),
    "pinned" boolean default false
);


create table "public"."request_progress" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "request_id" uuid not null,
    "event_type" text not null,
    "log" text default ''::text,
    "meta" jsonb,
    "status" text not null,
    "is_progress_step" boolean not null default false,
    "target_api" email_slack_types,
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."request_relation" (
    "id" uuid not null default gen_random_uuid(),
    "request_id" uuid not null,
    "session_id" uuid,
    "cancel_id" uuid
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


alter table "public"."role_permissions" enable row level security;

create table "public"."roles" (
    "id" uuid not null default uuid_generate_v4(),
    "recruiter_id" uuid not null,
    "name" text not null,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now(),
    "description" text
);


alter table "public"."roles" enable row level security;

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


create table "public"."tour" (
    "recruiter_relation_id" bigint generated by default as identity not null,
    "type" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."tour" enable row level security;

create table "public"."user_chat" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "metadata" jsonb,
    "function" text,
    "type" text not null,
    "content" text not null
);


create table "public"."workflow" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "trigger" workflow_trigger not null,
    "phase" workflow_phase not null,
    "interval" numeric not null default '0'::numeric,
    "title" text not null default ''::text,
    "recruiter_id" uuid not null,
    "auto_connect" boolean not null default false,
    "description" text,
    "is_paused" boolean not null default false,
    "workflow_type" workflow_type not null default 'system'::workflow_type,
    "request_id" uuid
);


create table "public"."workflow_action" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "workflow_id" uuid not null,
    "order" numeric not null,
    "payload" jsonb not null default '{}'::jsonb,
    "target_api" email_slack_types not null,
    "action_type" text not null
);


create table "public"."workflow_action_logs" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "tries" numeric not null default '0'::numeric,
    "workflow_id" uuid not null,
    "workflow_action_id" uuid not null,
    "meta" jsonb,
    "execute_at" timestamp with time zone not null,
    "related_table" workflow_cron_trigger_tables not null,
    "related_table_pkey" uuid not null,
    "status" workflow_cron_run_status not null default 'not_started'::workflow_cron_run_status
);


create table "public"."workflow_job_relation" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "job_id" uuid not null default gen_random_uuid(),
    "workflow_id" uuid not null default gen_random_uuid()
);


alter sequence "public"."departments_id_seq" owned by "public"."departments"."id";

alter sequence "public"."office_locations_id_seq" owned by "public"."office_locations"."id";

CREATE UNIQUE INDEX aglint_candidates_pkey ON public.aglint_candidates USING btree (aglint_id);

CREATE UNIQUE INDEX ai_videos_pkey ON public.ai_videos USING btree (id);

CREATE UNIQUE INDEX application_email_status_pkey ON public.application_email_status USING btree (id);

CREATE UNIQUE INDEX application_logs_pkey ON public.application_logs USING btree (id);

CREATE INDEX applications_candidate_file_id_idx ON public.applications USING btree (candidate_file_id);

CREATE INDEX applications_candidate_id_idx ON public.applications USING btree (candidate_id);

CREATE INDEX applications_job_id_idx ON public.applications USING btree (job_id);

CREATE UNIQUE INDEX applications_remote_id_key ON public.applications USING btree (remote_id);

CREATE UNIQUE INDEX candidate_list_pkey ON public.candidate_list USING btree (id);

CREATE UNIQUE INDEX candidate_portal_job_pkey ON public.candidate_portal_job USING btree (id);

CREATE UNIQUE INDEX candidate_portal_message_pkey ON public.candidate_portal_message USING btree (id);

CREATE UNIQUE INDEX candidate_request_availability_pkey ON public.candidate_request_availability USING btree (id);

CREATE UNIQUE INDEX candidate_search_history_pkey ON public.candidate_search_history USING btree (id);

CREATE UNIQUE INDEX candidate_ukey ON public.candidates USING btree (recruiter_id, email);

CREATE UNIQUE INDEX candidates_id_key ON public.candidates USING btree (id);

CREATE UNIQUE INDEX company_email_template_pkey ON public.company_email_template USING btree (id);

CREATE UNIQUE INDEX company_search_cache_pkey ON public.company_search_cache USING btree (id);

CREATE UNIQUE INDEX departments_pkey ON public.departments USING btree (id);

CREATE UNIQUE INDEX departments_remote_id_key ON public.departments USING btree (remote_id);

CREATE UNIQUE INDEX integrations_pkey ON public.integrations USING btree (id);

CREATE UNIQUE INDEX integrations_recruiter_id_key ON public.integrations USING btree (recruiter_id);

CREATE UNIQUE INDEX interview_filter_json_pkey ON public.interview_filter_json USING btree (id);

CREATE UNIQUE INDEX interview_meeting_log_pkey ON public.interview_meeting_log USING btree (id);

CREATE UNIQUE INDEX interview_meeting_pkey ON public.interview_meeting USING btree (id);

CREATE UNIQUE INDEX interview_module_approve_users_pkey ON public.interview_module_approve_users USING btree (id);

CREATE INDEX interview_module_relation_user_id_module_id_idx ON public.interview_module_relation USING btree (user_id, module_id);

CREATE UNIQUE INDEX interview_panel_pkey ON public.interview_module USING btree (id);

CREATE UNIQUE INDEX interview_panel_relation_pkey ON public.interview_module_relation USING btree (id);

CREATE UNIQUE INDEX interview_plan_pkey ON public.interview_plan USING btree (id);

CREATE UNIQUE INDEX interview_progress_pkey ON public.interview_progress USING btree (id);

CREATE UNIQUE INDEX interview_session_cancel_pkey ON public.interview_session_cancel USING btree (id);

CREATE INDEX interview_session_meeting_id_interview_plan_id_module_id_idx ON public.interview_session USING btree (meeting_id, interview_plan_id, module_id);

CREATE UNIQUE INDEX interview_session_pkey ON public.interview_session USING btree (id);

CREATE INDEX interview_session_relation_session_id_interview_module_rela_idx ON public.interview_session_relation USING btree (session_id, interview_module_relation_id, user_id);

CREATE UNIQUE INDEX interview_training_progress_pkey ON public.interview_training_progress USING btree (id);

CREATE UNIQUE INDEX inteview_session_relation_pkey ON public.interview_session_relation USING btree (id);

CREATE UNIQUE INDEX job_email_template_pkey ON public.job_email_template USING btree (id);

CREATE UNIQUE INDEX job_email_type ON public.job_email_template USING btree (job_id, type);

CREATE UNIQUE INDEX logs_pkey ON public.logs USING btree (id);

CREATE UNIQUE INDEX new_application_pkey ON public.applications USING btree (id);

CREATE UNIQUE INDEX new_candidate_files_pkey ON public.candidate_files USING btree (id);

CREATE UNIQUE INDEX new_candidate_pkey ON public.candidates USING btree (id);

CREATE UNIQUE INDEX new_tasks_pkey ON public.new_tasks USING btree (id);

CREATE UNIQUE INDEX new_tasks_progress_pkey ON public.new_tasks_progress USING btree (id);

CREATE UNIQUE INDEX notify_me_pkey ON public.notify_me USING btree (id);

CREATE UNIQUE INDEX office_locations_pkey ON public.office_locations USING btree (id);

CREATE UNIQUE INDEX office_locations_remote_id_key ON public.office_locations USING btree (remote_id);

CREATE UNIQUE INDEX outreached_emails_pkey ON public.outreached_emails USING btree (id);

CREATE UNIQUE INDEX permissions_name_key ON public.permissions USING btree (name);

CREATE UNIQUE INDEX permissions_pkey ON public.permissions USING btree (id);

CREATE UNIQUE INDEX public_jobs_pkey ON public.public_jobs USING btree (id);

CREATE UNIQUE INDEX public_jobs_remote_id_key ON public.public_jobs USING btree (remote_id);

CREATE UNIQUE INDEX question_bank_pkey ON public.question_bank USING btree (id);

CREATE UNIQUE INDEX recruiter_email_slack_type_ukey ON public.company_email_template USING btree (recruiter_id, type);

CREATE UNIQUE INDEX recruiter_id_pkey ON public.recruiter USING btree (id);

CREATE UNIQUE INDEX recruiter_relation_pkey ON public.recruiter_relation USING btree (id);

CREATE UNIQUE INDEX recruiter_relation_ukey ON public.recruiter_relation USING btree (user_id, recruiter_id);

CREATE UNIQUE INDEX recruiter_user_email_key ON public.recruiter_user USING btree (email);

CREATE UNIQUE INDEX recruiter_user_pkey ON public.recruiter_user USING btree (user_id);

CREATE UNIQUE INDEX recruiter_user_remote_id_key ON public.recruiter_user USING btree (remote_id);

CREATE UNIQUE INDEX recuriter_preferences_pkey ON public.recruiter_preferences USING btree (recruiter_id);

CREATE UNIQUE INDEX request_availability_relation_pkey ON public.request_session_relation USING btree (id);

CREATE UNIQUE INDEX request_integration_tool_pkey ON public.request_integration_tool USING btree (id);

CREATE UNIQUE INDEX request_log_pkey ON public.request_log USING btree (id);

CREATE UNIQUE INDEX request_note_pkey ON public.request_note USING btree (id);

CREATE UNIQUE INDEX request_pkey ON public.request USING btree (id);

CREATE UNIQUE INDEX request_progress_pkey ON public.request_progress USING btree (id);

CREATE UNIQUE INDEX request_relation_pkey ON public.request_relation USING btree (id);

CREATE UNIQUE INDEX role_permissions_pkey ON public.role_permissions USING btree (id);

CREATE UNIQUE INDEX role_permissions_unique_key ON public.role_permissions USING btree (role_id, permission_id, recruiter_id);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

CREATE UNIQUE INDEX roles_recruiter_id_name_unique ON public.roles USING btree (recruiter_id, name);

CREATE UNIQUE INDEX rp_logs_pkey ON public.rp_logs USING btree (id);

CREATE UNIQUE INDEX rp_token_usage_pkey ON public.rp_token_usage USING btree (id);

CREATE UNIQUE INDEX "scheduling-agent-chat-history_filter_json_id_key" ON public.scheduling_agent_chat_history USING btree (filter_json_id);

CREATE UNIQUE INDEX "scheduling-agent-chat-history_pkey" ON public.scheduling_agent_chat_history USING btree (filter_json_id, thread_id);

CREATE UNIQUE INDEX support_groups_pkey ON public.support_groups USING btree (id);

CREATE UNIQUE INDEX support_ticket_pkey ON public.support_ticket USING btree (id);

CREATE UNIQUE INDEX task_session_relation_pkey ON public.task_session_relation USING btree (id);

CREATE UNIQUE INDEX tour_pkey ON public.tour USING btree (recruiter_relation_id, type);

CREATE UNIQUE INDEX unique_deps ON public.departments USING btree (recruiter_id, name);

CREATE UNIQUE INDEX unique_user_module ON public.interview_module_relation USING btree (user_id, module_id);

CREATE UNIQUE INDEX user_chat_pkey ON public.user_chat USING btree (id);

CREATE UNIQUE INDEX workflow_action_logs_pkey ON public.workflow_action_logs USING btree (id);

CREATE UNIQUE INDEX workflow_action_pkey ON public.workflow_action USING btree (id);

CREATE UNIQUE INDEX workflow_job_relation_pkey ON public.workflow_job_relation USING btree (id);

CREATE UNIQUE INDEX workflow_pkey ON public.workflow USING btree (id);

alter table "public"."aglint_candidates" add constraint "aglint_candidates_pkey" PRIMARY KEY using index "aglint_candidates_pkey";

alter table "public"."ai_videos" add constraint "ai_videos_pkey" PRIMARY KEY using index "ai_videos_pkey";

alter table "public"."application_email_status" add constraint "application_email_status_pkey" PRIMARY KEY using index "application_email_status_pkey";

alter table "public"."application_logs" add constraint "application_logs_pkey" PRIMARY KEY using index "application_logs_pkey";

alter table "public"."applications" add constraint "new_application_pkey" PRIMARY KEY using index "new_application_pkey";

alter table "public"."candidate_files" add constraint "new_candidate_files_pkey" PRIMARY KEY using index "new_candidate_files_pkey";

alter table "public"."candidate_list" add constraint "candidate_list_pkey" PRIMARY KEY using index "candidate_list_pkey";

alter table "public"."candidate_portal_job" add constraint "candidate_portal_job_pkey" PRIMARY KEY using index "candidate_portal_job_pkey";

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_pkey" PRIMARY KEY using index "candidate_portal_message_pkey";

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_pkey" PRIMARY KEY using index "candidate_request_availability_pkey";

alter table "public"."candidate_search_history" add constraint "candidate_search_history_pkey" PRIMARY KEY using index "candidate_search_history_pkey";

alter table "public"."candidates" add constraint "new_candidate_pkey" PRIMARY KEY using index "new_candidate_pkey";

alter table "public"."company_email_template" add constraint "company_email_template_pkey" PRIMARY KEY using index "company_email_template_pkey";

alter table "public"."company_search_cache" add constraint "company_search_cache_pkey" PRIMARY KEY using index "company_search_cache_pkey";

alter table "public"."departments" add constraint "departments_pkey" PRIMARY KEY using index "departments_pkey";

alter table "public"."integrations" add constraint "integrations_pkey" PRIMARY KEY using index "integrations_pkey";

alter table "public"."interview_filter_json" add constraint "interview_filter_json_pkey" PRIMARY KEY using index "interview_filter_json_pkey";

alter table "public"."interview_meeting" add constraint "interview_meeting_pkey" PRIMARY KEY using index "interview_meeting_pkey";

alter table "public"."interview_meeting_log" add constraint "interview_meeting_log_pkey" PRIMARY KEY using index "interview_meeting_log_pkey";

alter table "public"."interview_module" add constraint "interview_panel_pkey" PRIMARY KEY using index "interview_panel_pkey";

alter table "public"."interview_module_approve_users" add constraint "interview_module_approve_users_pkey" PRIMARY KEY using index "interview_module_approve_users_pkey";

alter table "public"."interview_module_relation" add constraint "interview_panel_relation_pkey" PRIMARY KEY using index "interview_panel_relation_pkey";

alter table "public"."interview_plan" add constraint "interview_plan_pkey" PRIMARY KEY using index "interview_plan_pkey";

alter table "public"."interview_progress" add constraint "interview_progress_pkey" PRIMARY KEY using index "interview_progress_pkey";

alter table "public"."interview_session" add constraint "interview_session_pkey" PRIMARY KEY using index "interview_session_pkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_pkey" PRIMARY KEY using index "interview_session_cancel_pkey";

alter table "public"."interview_session_relation" add constraint "inteview_session_relation_pkey" PRIMARY KEY using index "inteview_session_relation_pkey";

alter table "public"."interview_training_progress" add constraint "interview_training_progress_pkey" PRIMARY KEY using index "interview_training_progress_pkey";

alter table "public"."job_email_template" add constraint "job_email_template_pkey" PRIMARY KEY using index "job_email_template_pkey";

alter table "public"."logs" add constraint "logs_pkey" PRIMARY KEY using index "logs_pkey";

alter table "public"."new_tasks" add constraint "new_tasks_pkey" PRIMARY KEY using index "new_tasks_pkey";

alter table "public"."new_tasks_progress" add constraint "new_tasks_progress_pkey" PRIMARY KEY using index "new_tasks_progress_pkey";

alter table "public"."notify_me" add constraint "notify_me_pkey" PRIMARY KEY using index "notify_me_pkey";

alter table "public"."office_locations" add constraint "office_locations_pkey" PRIMARY KEY using index "office_locations_pkey";

alter table "public"."outreached_emails" add constraint "outreached_emails_pkey" PRIMARY KEY using index "outreached_emails_pkey";

alter table "public"."permissions" add constraint "permissions_pkey" PRIMARY KEY using index "permissions_pkey";

alter table "public"."public_jobs" add constraint "public_jobs_pkey" PRIMARY KEY using index "public_jobs_pkey";

alter table "public"."question_bank" add constraint "question_bank_pkey" PRIMARY KEY using index "question_bank_pkey";

alter table "public"."recruiter" add constraint "recruiter_id_pkey" PRIMARY KEY using index "recruiter_id_pkey";

alter table "public"."recruiter_preferences" add constraint "recuriter_preferences_pkey" PRIMARY KEY using index "recuriter_preferences_pkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_pkey" PRIMARY KEY using index "recruiter_relation_pkey";

alter table "public"."recruiter_user" add constraint "recruiter_user_pkey" PRIMARY KEY using index "recruiter_user_pkey";

alter table "public"."request" add constraint "request_pkey" PRIMARY KEY using index "request_pkey";

alter table "public"."request_integration_tool" add constraint "request_integration_tool_pkey" PRIMARY KEY using index "request_integration_tool_pkey";

alter table "public"."request_log" add constraint "request_log_pkey" PRIMARY KEY using index "request_log_pkey";

alter table "public"."request_note" add constraint "request_note_pkey" PRIMARY KEY using index "request_note_pkey";

alter table "public"."request_progress" add constraint "request_progress_pkey" PRIMARY KEY using index "request_progress_pkey";

alter table "public"."request_relation" add constraint "request_relation_pkey" PRIMARY KEY using index "request_relation_pkey";

alter table "public"."request_session_relation" add constraint "request_availability_relation_pkey" PRIMARY KEY using index "request_availability_relation_pkey";

alter table "public"."role_permissions" add constraint "role_permissions_pkey" PRIMARY KEY using index "role_permissions_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."rp_logs" add constraint "rp_logs_pkey" PRIMARY KEY using index "rp_logs_pkey";

alter table "public"."rp_token_usage" add constraint "rp_token_usage_pkey" PRIMARY KEY using index "rp_token_usage_pkey";

alter table "public"."scheduling_agent_chat_history" add constraint "scheduling-agent-chat-history_pkey" PRIMARY KEY using index "scheduling-agent-chat-history_pkey";

alter table "public"."support_groups" add constraint "support_groups_pkey" PRIMARY KEY using index "support_groups_pkey";

alter table "public"."support_ticket" add constraint "support_ticket_pkey" PRIMARY KEY using index "support_ticket_pkey";

alter table "public"."task_session_relation" add constraint "task_session_relation_pkey" PRIMARY KEY using index "task_session_relation_pkey";

alter table "public"."tour" add constraint "tour_pkey" PRIMARY KEY using index "tour_pkey";

alter table "public"."user_chat" add constraint "user_chat_pkey" PRIMARY KEY using index "user_chat_pkey";

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

alter table "public"."applications" add constraint "applications_candidate_file_id_fkey" FOREIGN KEY (candidate_file_id) REFERENCES candidate_files(id) ON DELETE SET NULL not valid;

alter table "public"."applications" validate constraint "applications_candidate_file_id_fkey";

alter table "public"."applications" add constraint "applications_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_candidate_id_fkey";

alter table "public"."applications" add constraint "applications_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_job_id_fkey";

alter table "public"."applications" add constraint "applications_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_recruiter_id_fkey";

alter table "public"."applications" add constraint "applications_remote_id_key" UNIQUE using index "applications_remote_id_key";

alter table "public"."applications" add constraint "applications_status_check" CHECK ((status = ANY (ARRAY['new'::text, 'interview'::text, 'qualified'::text, 'disqualified'::text]))) NOT VALID not valid;

alter table "public"."applications" validate constraint "applications_status_check";

alter table "public"."candidate_files" add constraint "candidate_files_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."candidate_files" validate constraint "candidate_files_candidate_id_fkey";

alter table "public"."candidate_list" add constraint "candidate_list_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_list" validate constraint "candidate_list_recruiter_id_fkey";

alter table "public"."candidate_portal_job" add constraint "candidate_portal_job_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_portal_job" validate constraint "candidate_portal_job_application_id_fkey";

alter table "public"."candidate_portal_job" add constraint "candidate_portal_job_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_portal_job" validate constraint "candidate_portal_job_job_id_fkey";

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_portal_message" validate constraint "candidate_portal_message_application_id_fkey";

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_availability_id_fkey" FOREIGN KEY (availability_id) REFERENCES candidate_request_availability(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."candidate_portal_message" validate constraint "candidate_portal_message_availability_id_fkey";

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_filter_id_fkey" FOREIGN KEY (filter_id) REFERENCES interview_filter_json(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."candidate_portal_message" validate constraint "candidate_portal_message_filter_id_fkey";

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_request_availability" validate constraint "candidate_request_availability_application_id_fkey";

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_request_availability" validate constraint "candidate_request_availability_recruiter_id_fkey";

alter table "public"."candidate_request_availability" add constraint "public_candidate_request_availability_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."candidate_request_availability" validate constraint "public_candidate_request_availability_request_id_fkey";

alter table "public"."candidate_search_history" add constraint "candidate_search_history_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_search_history" validate constraint "candidate_search_history_recruiter_id_fkey";

alter table "public"."candidates" add constraint "candidate_ukey" UNIQUE using index "candidate_ukey";

alter table "public"."candidates" add constraint "candidates_id_key" UNIQUE using index "candidates_id_key";

alter table "public"."candidates" add constraint "candidates_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidates" validate constraint "candidates_recruiter_id_fkey";

alter table "public"."company_email_template" add constraint "company_email_template_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."company_email_template" validate constraint "company_email_template_recruiter_id_fkey";

alter table "public"."company_email_template" add constraint "recruiter_email_slack_type_ukey" UNIQUE using index "recruiter_email_slack_type_ukey";

alter table "public"."departments" add constraint "departments_remote_id_key" UNIQUE using index "departments_remote_id_key";

alter table "public"."departments" add constraint "fk_recruiter" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."departments" validate constraint "fk_recruiter";

alter table "public"."departments" add constraint "unique_deps" UNIQUE using index "unique_deps";

alter table "public"."integrations" add constraint "integrations_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."integrations" validate constraint "integrations_recruiter_id_fkey";

alter table "public"."integrations" add constraint "integrations_recruiter_id_key" UNIQUE using index "integrations_recruiter_id_key";

alter table "public"."interview_filter_json" add constraint "interview_filter_json_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."interview_filter_json" validate constraint "interview_filter_json_application_id_fkey";

alter table "public"."interview_filter_json" add constraint "public_interview_filter_json_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_filter_json" validate constraint "public_interview_filter_json_created_by_fkey";

alter table "public"."interview_filter_json" add constraint "public_interview_filter_json_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."interview_filter_json" validate constraint "public_interview_filter_json_request_id_fkey";

alter table "public"."interview_meeting" add constraint "interview_meeting_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_meeting" validate constraint "interview_meeting_application_id_fkey";

alter table "public"."interview_meeting" add constraint "interview_meeting_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_meeting" validate constraint "interview_meeting_job_id_fkey";

alter table "public"."interview_meeting" add constraint "interview_meeting_organizer_id_fkey" FOREIGN KEY (organizer_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_meeting" validate constraint "interview_meeting_organizer_id_fkey";

alter table "public"."interview_meeting" add constraint "interview_meeting_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_meeting" validate constraint "interview_meeting_recruiter_id_fkey";

alter table "public"."interview_meeting_log" add constraint "interview_meeting_log_meeting_id_fkey" FOREIGN KEY (meeting_id) REFERENCES interview_meeting(id) ON DELETE SET NULL not valid;

alter table "public"."interview_meeting_log" validate constraint "interview_meeting_log_meeting_id_fkey";

alter table "public"."interview_module" add constraint "interview_module_department_id_fkey" FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL not valid;

alter table "public"."interview_module" validate constraint "interview_module_department_id_fkey";

alter table "public"."interview_module" add constraint "interview_panel_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."interview_module" validate constraint "interview_panel_recruiter_id_fkey";

alter table "public"."interview_module" add constraint "public_interview_module_created_by_fkey" FOREIGN KEY (created_by) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_module" validate constraint "public_interview_module_created_by_fkey";

alter table "public"."interview_module_approve_users" add constraint "interview_module_approve_users_module_id_fkey" FOREIGN KEY (module_id) REFERENCES interview_module(id) ON DELETE CASCADE not valid;

alter table "public"."interview_module_approve_users" validate constraint "interview_module_approve_users_module_id_fkey";

alter table "public"."interview_module_approve_users" add constraint "interview_module_approve_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_module_approve_users" validate constraint "interview_module_approve_users_user_id_fkey";

alter table "public"."interview_module_relation" add constraint "interview_panel_relation_panel_id_fkey" FOREIGN KEY (module_id) REFERENCES interview_module(id) ON DELETE CASCADE not valid;

alter table "public"."interview_module_relation" validate constraint "interview_panel_relation_panel_id_fkey";

alter table "public"."interview_module_relation" add constraint "public_interview_module_relation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_module_relation" validate constraint "public_interview_module_relation_user_id_fkey";

alter table "public"."interview_module_relation" add constraint "unique_user_module" UNIQUE using index "unique_user_module";

alter table "public"."interview_plan" add constraint "interview_plan_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_plan" validate constraint "interview_plan_application_id_fkey";

alter table "public"."interview_plan" add constraint "interview_plan_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_plan" validate constraint "interview_plan_recruiter_id_fkey";

alter table "public"."interview_plan" add constraint "public_interview_plan_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."interview_plan" validate constraint "public_interview_plan_job_id_fkey";

alter table "public"."interview_progress" add constraint "interview_progress_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."interview_progress" validate constraint "interview_progress_application_id_fkey";

alter table "public"."interview_progress" add constraint "interview_progress_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."interview_progress" validate constraint "interview_progress_job_id_fkey";

alter table "public"."interview_session" add constraint "interview_session_parent_session_id_fkey" FOREIGN KEY (parent_session_id) REFERENCES interview_session(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."interview_session" validate constraint "interview_session_parent_session_id_fkey";

alter table "public"."interview_session" add constraint "interview_session_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_session" validate constraint "interview_session_recruiter_id_fkey";

alter table "public"."interview_session" add constraint "public_interview_session_interview_plan_id_fkey" FOREIGN KEY (interview_plan_id) REFERENCES interview_plan(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_session" validate constraint "public_interview_session_interview_plan_id_fkey";

alter table "public"."interview_session" add constraint "public_interview_session_meeting_id_fkey" FOREIGN KEY (meeting_id) REFERENCES interview_meeting(id) ON DELETE CASCADE not valid;

alter table "public"."interview_session" validate constraint "public_interview_session_meeting_id_fkey";

alter table "public"."interview_session" add constraint "public_interview_session_module_id_fkey" FOREIGN KEY (module_id) REFERENCES interview_module(id) ON DELETE SET NULL not valid;

alter table "public"."interview_session" validate constraint "public_interview_session_module_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE SET NULL not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_application_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_cancel_user_id_fkey" FOREIGN KEY (cancel_user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_cancel_user_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_request_id_fkey";

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

alter table "public"."interview_training_progress" add constraint "interview_training_progress_approved_user_id_fkey" FOREIGN KEY (approved_user_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_training_progress" validate constraint "interview_training_progress_approved_user_id_fkey";

alter table "public"."interview_training_progress" add constraint "interview_training_progress_session_relation_id_fkey" FOREIGN KEY (session_relation_id) REFERENCES interview_session_relation(id) ON DELETE CASCADE not valid;

alter table "public"."interview_training_progress" validate constraint "interview_training_progress_session_relation_id_fkey";

alter table "public"."job_email_template" add constraint "job_email_template_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."job_email_template" validate constraint "job_email_template_job_id_fkey";

alter table "public"."job_email_template" add constraint "job_email_type" UNIQUE using index "job_email_type";

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

alter table "public"."office_locations" add constraint "fk_recruiter" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."office_locations" validate constraint "fk_recruiter";

alter table "public"."office_locations" add constraint "office_locations_remote_id_key" UNIQUE using index "office_locations_remote_id_key";

alter table "public"."outreached_emails" add constraint "outreached_emails_recruiter_user_id_fkey" FOREIGN KEY (recruiter_user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."outreached_emails" validate constraint "outreached_emails_recruiter_user_id_fkey";

alter table "public"."permissions" add constraint "permissions_name_key" UNIQUE using index "permissions_name_key";

alter table "public"."public_jobs" add constraint "public_jobs_department_id_fkey" FOREIGN KEY (department_id) REFERENCES departments(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_department_id_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_hiring_manager_fkey" FOREIGN KEY (hiring_manager) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_hiring_manager_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_interview_coordinator_fkey" FOREIGN KEY (interview_coordinator) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_interview_coordinator_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_location_id_fkey" FOREIGN KEY (location_id) REFERENCES office_locations(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_location_id_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_recruiter_fkey" FOREIGN KEY (recruiter) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_recruiter_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_recruiter_id_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_recruiting_coordinator_fkey" FOREIGN KEY (recruiting_coordinator) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_recruiting_coordinator_fkey";

alter table "public"."public_jobs" add constraint "public_jobs_remote_id_key" UNIQUE using index "public_jobs_remote_id_key";

alter table "public"."public_jobs" add constraint "public_jobs_sourcer_fkey" FOREIGN KEY (sourcer) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."public_jobs" validate constraint "public_jobs_sourcer_fkey";

alter table "public"."recruiter" add constraint "recruiter_primary_admin_fkey" FOREIGN KEY (primary_admin) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."recruiter" validate constraint "recruiter_primary_admin_fkey";

alter table "public"."recruiter_preferences" add constraint "recruiter_preferences_ats_check" CHECK ((ats = ANY (ARRAY['Aglint'::text, 'Ashby'::text, 'Greenhouse'::text, 'Lever'::text]))) NOT VALID not valid;

alter table "public"."recruiter_preferences" validate constraint "recruiter_preferences_ats_check";

alter table "public"."recruiter_preferences" add constraint "recuriter_preferences_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_preferences" validate constraint "recuriter_preferences_recruiter_id_fkey";

alter table "public"."recruiter_relation" add constraint "public_recruiter_relation_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "public_recruiter_relation_user_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_created_by_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_manager_id_fkey" FOREIGN KEY (manager_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_manager_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_recruiter_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_role_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_ukey" UNIQUE using index "recruiter_relation_ukey";

alter table "public"."recruiter_user" add constraint "recruiter_user_department_id_fkey" FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL NOT VALID not valid;

alter table "public"."recruiter_user" validate constraint "recruiter_user_department_id_fkey";

alter table "public"."recruiter_user" add constraint "recruiter_user_email_key" UNIQUE using index "recruiter_user_email_key";

alter table "public"."recruiter_user" add constraint "recruiter_user_office_location_id_fkey" FOREIGN KEY (office_location_id) REFERENCES office_locations(id) ON DELETE SET NULL NOT VALID not valid;

alter table "public"."recruiter_user" validate constraint "recruiter_user_office_location_id_fkey";

alter table "public"."recruiter_user" add constraint "recruiter_user_remote_id_key" UNIQUE using index "recruiter_user_remote_id_key";

alter table "public"."recruiter_user" add constraint "recruiter_user_status_check" CHECK ((status = ANY (ARRAY['invited'::text, 'active'::text, 'suspended'::text]))) not valid;

alter table "public"."recruiter_user" validate constraint "recruiter_user_status_check";

alter table "public"."recruiter_user" add constraint "recruiter_user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."recruiter_user" validate constraint "recruiter_user_user_id_fkey";

alter table "public"."request" add constraint "request_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."request" validate constraint "request_application_id_fkey";

alter table "public"."request" add constraint "request_assignee_id_fkey" FOREIGN KEY (assignee_id) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."request" validate constraint "request_assignee_id_fkey";

alter table "public"."request" add constraint "request_assigner_id_fkey" FOREIGN KEY (assigner_id) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."request" validate constraint "request_assigner_id_fkey";

alter table "public"."request" add constraint "request_priority_check" CHECK ((priority = ANY (ARRAY['urgent'::text, 'standard'::text]))) not valid;

alter table "public"."request" validate constraint "request_priority_check";

alter table "public"."request" add constraint "request_status_check" CHECK ((status = ANY (ARRAY['to_do'::text, 'in_progress'::text, 'blocked'::text, 'completed'::text]))) not valid;

alter table "public"."request" validate constraint "request_status_check";

alter table "public"."request" add constraint "request_type_check" CHECK ((type = ANY (ARRAY['schedule_request'::text, 'cancel_schedule_request'::text, 'reschedule_request'::text, 'decline_request'::text]))) not valid;

alter table "public"."request" validate constraint "request_type_check";

alter table "public"."request_integration_tool" add constraint "request_integration_tool_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."request_integration_tool" validate constraint "request_integration_tool_recruiter_id_fkey";

alter table "public"."request_log" add constraint "request_log_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request_log" validate constraint "request_log_request_id_fkey";

alter table "public"."request_note" add constraint "request_note_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON DELETE CASCADE not valid;

alter table "public"."request_note" validate constraint "request_note_request_id_fkey";

alter table "public"."request_progress" add constraint "request_progress_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request_progress" validate constraint "request_progress_request_id_fkey";

alter table "public"."request_relation" add constraint "request_relation_cancel_id_fkey" FOREIGN KEY (cancel_id) REFERENCES interview_session_cancel(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."request_relation" validate constraint "request_relation_cancel_id_fkey";

alter table "public"."request_relation" add constraint "request_relation_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request_relation" validate constraint "request_relation_request_id_fkey";

alter table "public"."request_relation" add constraint "request_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."request_relation" validate constraint "request_relation_session_id_fkey";

alter table "public"."request_session_relation" add constraint "request_availability_relation_request_availability_id_fkey" FOREIGN KEY (request_availability_id) REFERENCES candidate_request_availability(id) ON DELETE CASCADE not valid;

alter table "public"."request_session_relation" validate constraint "request_availability_relation_request_availability_id_fkey";

alter table "public"."request_session_relation" add constraint "request_availability_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE not valid;

alter table "public"."request_session_relation" validate constraint "request_availability_relation_session_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_permission_id_fkey" FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_permission_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_recruiter_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_role_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_unique_key" UNIQUE using index "role_permissions_unique_key";

alter table "public"."roles" add constraint "roles_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."roles" validate constraint "roles_recruiter_id_fkey";

alter table "public"."roles" add constraint "roles_recruiter_id_name_unique" UNIQUE using index "roles_recruiter_id_name_unique";

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

alter table "public"."tour" add constraint "tour_recruiter_relation_id_fkey" FOREIGN KEY (recruiter_relation_id) REFERENCES recruiter_relation(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tour" validate constraint "tour_recruiter_relation_id_fkey";

alter table "public"."tour" add constraint "tour_type_check" CHECK ((type = ANY (ARRAY['workflow_intro'::text, 'profile_score_intro'::text]))) not valid;

alter table "public"."tour" validate constraint "tour_type_check";

alter table "public"."user_chat" add constraint "user_chat_type_check" CHECK ((type = ANY (ARRAY['user'::text, 'agent'::text]))) not valid;

alter table "public"."user_chat" validate constraint "user_chat_type_check";

alter table "public"."user_chat" add constraint "user_chat_user_id_fkey" FOREIGN KEY (user_id) REFERENCES recruiter_user(user_id) ON DELETE CASCADE not valid;

alter table "public"."user_chat" validate constraint "user_chat_user_id_fkey";

alter table "public"."workflow" add constraint "workflow_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow" validate constraint "workflow_recruiter_id_fkey";

alter table "public"."workflow" add constraint "workflow_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow" validate constraint "workflow_request_id_fkey";

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

create or replace view "public"."all_interviewers" as  SELECT ru.user_id,
    ru.first_name,
    ru.last_name,
    ru.email,
    ru.profile_image,
    ru."position",
    ru.schedule_auth,
    ru.scheduling_settings,
    ru.status,
    ru.department_id,
    ru.office_location_id,
    recrel.recruiter_id,
    COALESCE(array_agg(DISTINCT
        CASE
            WHEN (intmodrel.training_status = 'qualified'::status_training) THEN intmod.name
            ELSE NULL::text
        END), '{}'::text[]) AS qualified_module_names,
    COALESCE(array_agg(DISTINCT
        CASE
            WHEN (intmodrel.training_status = 'training'::status_training) THEN intmod.name
            ELSE NULL::text
        END), '{}'::text[]) AS training_module_names,
    (( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND (intm.status = 'confirmed'::interview_schedule_status) AND (intsesrel.is_confirmed = true))))::integer AS upcoming_meeting_count,
    (( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND (intm.status = 'completed'::interview_schedule_status) AND (intsesrel.is_confirmed = true))))::integer AS completed_meeting_count,
    ( SELECT (COALESCE(sum(intses.session_duration), (0)::numeric) / 60.0)
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '7 days'::interval)))) AS total_hours_this_week,
    ( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '7 days'::interval)))) AS total_interviews_this_week,
    ( SELECT (COALESCE(sum(intses.session_duration), (0)::numeric) / 60.0)
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= CURRENT_DATE) AND (intm.start_time < (CURRENT_DATE + '1 day'::interval)))) AS total_hours_today,
    ( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= CURRENT_DATE) AND (intm.start_time < (CURRENT_DATE + '1 day'::interval)))) AS total_interviews_today,
    ru.is_calendar_connected,
    ( SELECT jsonb_object_agg(daily_counts.day, daily_counts.meeting_count) AS jsonb_object_agg
           FROM ( SELECT date_trunc('day'::text, intm.start_time) AS day,
                    count(*) AS meeting_count
                   FROM (((interview_session_relation intsesrel
                     JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
                     JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
                     JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
                  WHERE ((intmodrel_1.user_id = ru.user_id) AND (intm.status = 'completed'::interview_schedule_status) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= (CURRENT_DATE - '1 mon'::interval)))
                  GROUP BY (date_trunc('day'::text, intm.start_time))) daily_counts) AS completed_meeting_last_month,
    ( SELECT COALESCE(array_agg(DISTINCT interview_plan.job_id), ARRAY[]::uuid[]) AS "coalesce"
           FROM (((((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN recruiter_user ON ((interview_module_relation.user_id = recruiter_user.user_id)))
             LEFT JOIN recruiter_user debrief_user ON ((interview_session_relation.user_id = recruiter_user.user_id)))
             LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
             LEFT JOIN interview_plan ON ((interview_plan.id = interview_session.interview_plan_id)))
          WHERE ((interview_plan.job_id IS NOT NULL) AND ((ru.user_id = recruiter_user.user_id) OR (ru.user_id = debrief_user.user_id)))) AS job_ids
   FROM (((recruiter_user ru
     LEFT JOIN recruiter_relation recrel ON ((recrel.user_id = ru.user_id)))
     LEFT JOIN interview_module_relation intmodrel ON ((intmodrel.user_id = ru.user_id)))
     LEFT JOIN interview_module intmod ON ((intmod.id = intmodrel.module_id)))
  GROUP BY ru.user_id, recrel.recruiter_id;


CREATE OR REPLACE FUNCTION public.ashbyapplicationsync()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB := '[]'::JSONB;  -- Variable to store the result
    function_url TEXT;
    rec_id uuid;
    request_results JSONB;
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    FOR rec_id IN (SELECT id FROM recruiter WHERE ashby_key IS NOT NULL)
    LOOP
        IF ashbyjobreference(rec_id) IS NOT NULL THEN
            request_results := net.http_post(
                url := concat(host,'/api/ashby/batchsave'),
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
    host text;
BEGIN
    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    -- Make a single HTTP request for the aggregated data
   
    request_results := net.http_post(
        url := concat(host,'/api/ashby/cron')
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
           r.name as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           0 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
       JOIN recruiter r ON r.id = pj.recruiter_id
       JOIN recruiter_preferences rp ON rp.recruiter_id = r.id
       WHERE ja.processing_status='not started' AND pj.status='published' AND ja.candidate_file_id IS NOT NULL AND pj.jd_json IS NOT NULL AND rp.scoring --boolen check
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
    host text;
BEGIN
    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    IF function_value = 'first' THEN
        -- Check if resumescorefirst() returns NULL
        IF batchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            request_results := net.http_post(
                url := concat(host,'/api/resumecron/batchscore'),
                body := jsonb_build_object('function', function_value)
                -- Optionally, add headers or other parameters if required
            );
        END IF;
    ELSIF function_value = 'second' THEN
        -- Check if resumescoresecond() returns NULL
        IF retrybatchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            request_results := net.http_post(
                url := concat(host,'/api/resumecron/batchscore'),
                body := jsonb_build_object('function', function_value)
                -- Optionally, add headers or other parameters if required
            );
        END IF;
    ELSIF function_value = 'third' THEN
        -- Check if resumescoresecond() returns NULL
        IF secondretrybatchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            request_results := net.http_post(
                url := concat(host,'/api/resumecron/batchscore'),
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
    rec_id UUID;
    request_results JSONB;
    function_url TEXT;
    secret_key TEXT;
BEGIN
    -- Fetch the URL from the vault
    SELECT decrypted_secret 
    INTO function_url
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';


    SELECT decrypted_secret 
    INTO secret_key
    FROM vault.decrypted_secrets 
    WHERE name = 'SECRET_KEY';

    -- Loop through recruiters with Greenhouse integration
    FOR rec_id IN 
        SELECT recruiter_id 
        FROM integrations 
        JOIN recruiter ON recruiter.id = integrations.recruiter_id 
        WHERE integrations.greenhouse_key IS NOT NULL
    LOOP
        -- Check if there are applications with resume fetching enabled
        IF EXISTS (
            SELECT id 
            FROM applications
            WHERE is_resume_fetching 
              AND source = 'greenhouse' 
              AND recruiter_id = rec_id 
              AND remote_data IS NOT NULL
            ORDER BY created_at ASC
        ) THEN
            -- Make the HTTP POST request to the batch save endpoint
            request_results := net.http_post(
                url := concat(function_url, '/api/greenhouse/batchsave'),
                body := jsonb_build_object('recruiter_id', rec_id,'secret_key',secret_key),
                headers := jsonb_build_object('Content-Type', 'application/json')
            );
        END IF;
    END LOOP;

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

CREATE OR REPLACE FUNCTION public.calculate_experience(start_time jsonb, end_time jsonb)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    start_year INTEGER;
    start_month INTEGER;
    end_year INTEGER;
    end_month INTEGER;
    current_year INTEGER;
    current_month INTEGER;
    total_months INTEGER;
BEGIN
    -- Extract the start year and month
    start_year := (start_time->>'year')::INTEGER;
    start_month := (start_time->>'month')::INTEGER;

    -- If start year or month is 0, return 0 experience
    IF start_year is null OR start_month is null THEN
        RETURN 0;
    END IF;

    -- Extract the end year and month
    end_year := (end_time->>'year')::INTEGER;
    end_month := (end_time->>'month')::INTEGER;

    -- If end year or month is 0, use the current date
    IF end_year is null OR end_month is null THEN
        SELECT EXTRACT(YEAR FROM CURRENT_DATE), EXTRACT(MONTH FROM CURRENT_DATE)
        INTO current_year, current_month;
        end_year := current_year;
        end_month := current_month;
    END IF;

    -- Calculate total experience in months
    total_months := (end_year - start_year) * 12 + (end_month - start_month);

    -- Return the total experience
    RETURN total_months;
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

CREATE OR REPLACE FUNCTION public.call_webhook_on_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    url text;
    payload jsonb;
    headers jsonb;
BEGIN
    -- Fetch the webhook URL from the vault
    SELECT decrypted_secret 
    INTO url
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    -- Build the payload based on the type of operation
    IF TG_OP = 'INSERT' THEN
        payload := jsonb_build_object(
            'operation_type', 'INSERT',
            'table_name', TG_TABLE_NAME,
            'new_data', row_to_json(NEW)
        );
    ELSIF TG_OP = 'UPDATE' THEN
        payload := jsonb_build_object(
            'operation_type', 'UPDATE',
            'table_name', TG_TABLE_NAME,
            'old_data', row_to_json(OLD),
            'new_data', row_to_json(NEW)
        );
    ELSIF TG_OP = 'DELETE' THEN
        payload := jsonb_build_object(
            'operation_type', 'DELETE',
            'table_name', TG_TABLE_NAME,
            'old_data', row_to_json(OLD)
        );
    END IF;

    -- Set headers for the HTTP request
    headers := jsonb_build_object(
        'Content-Type', 'application/json'
    );

    PERFORM net.http_post(
        url := concat(url,'/api/db-events'),
        headers := headers,
        body := payload::jsonb
    );

    RETURN NULL;
END;
$function$
;

create or replace view "public"."candidate_applications_view" as  SELECT concat(candidates.first_name, ' ', candidates.last_name) AS candidate_name,
    candidates.id AS candidate_id,
    candidates.email AS candidate_email,
    applications.job_id,
    applications.id AS application_id,
    applications.status AS application_status,
    to_tsvector((((candidates.first_name)::text || ' '::text) || (candidates.last_name)::text)) AS full_text_search,
    public_jobs.job_title AS job_role,
    candidates.recruiter_id AS company_id
   FROM ((applications
     LEFT JOIN candidates ON ((candidates.id = applications.candidate_id)))
     LEFT JOIN public_jobs ON ((public_jobs.id = applications.job_id)));


CREATE OR REPLACE FUNCTION public.candidate_exp_analytic(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(app_id uuid, total_exp bigint, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY select position_list.app_id
    , SUM(calculate_experience(position->'start',position->'end')) as total_exp
    , count(*) as count
    from (
        select 
        applications.id as app_id,
        jsonb_array_elements(candidate_files.resume_json->'positions') as position
        FROM applications
        JOIN candidate_files ON applications.candidate_file_id = candidate_files.id
        JOIN public_jobs ON applications.job_id = public_jobs.id
        where  public_jobs.recruiter_id = candidate_exp_analytic.recruiter_id
            AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
            AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
            AND (CARDINALITY(jobs) = 0 OR public_jobs.id = ANY(jobs))
            AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
            AND applications.created_at <= end_datetime
    ) AS position_list 
    where
    position_list.position->'start'->>'month' is not null
    AND position_list.position->'end'->>'month' is not null
    GROUP BY position_list.app_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.candidate_skills_analysis(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(skill text, frequency bigint)
 LANGUAGE plpgsql
AS $function$
  BEGIN
    RETURN QUERY SELECT skill_list.skill
      , COUNT(*) AS frequency
      FROM (
          SELECT jsonb_array_elements_text(candidate_files.resume_json -> 'skills') AS skill
          FROM candidates
            JOIN candidate_files ON candidates.id = candidate_files.candidate_id
            JOIN applications ON applications.candidate_id = candidates.id
            JOIN public_jobs ON public_jobs.id = applications.job_id
          WHERE candidate_files.resume_json -> 'skills' IS NOT NULL
            AND public_jobs.recruiter_id = candidate_skills_analysis.recruiter_id
            AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
            AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
            AND (CARDINALITY(jobs) = 0 OR applications.job_id = ANY(jobs))
            AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
            AND applications.created_at <= end_datetime
      ) AS skill_list
      GROUP BY skill_list.skill ORDER BY frequency DESC;
  END;
  $function$
;

CREATE OR REPLACE FUNCTION public.check_user_auth()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    rec RECORD;
    response text;
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    FOR rec IN
        SELECT id
        FROM public.recruiter
    LOOP

        -- Make the HTTP POST request
        response := (
            SELECT content
            FROM http_post(
                concat(host,'/api/scheduling/calendar_check_recruiter'),
                json_build_object('recruiter_id', rec.id)::text,
                'application/json'
            )
        );
        
        RAISE NOTICE 'User ID: %, Response: %', rec.id, response;
        BEGIN
        EXCEPTION
            WHEN others THEN
                RAISE NOTICE 'Response is not valid JSON for User ID: %', user_record.user_id;
        END;
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

CREATE OR REPLACE FUNCTION public.count_requests()
 RETURNS TABLE(date text, created_at_count bigint, completed_at_count bigint, on_progress_count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        to_char(dates.date, 'DD-MM-YYYY') AS date,
        COUNT(r.id) FILTER (WHERE r.created_at::date = dates.date) AS created_at_count,
        COUNT(r.id) FILTER (WHERE r.completed_at::date = dates.date) AS completed_at_count,
        COUNT(r.id) FILTER (WHERE r.status = 'in_progress' AND r.created_at::date <= dates.date AND (r.completed_at::date IS NULL OR r.completed_at::date > dates.date)) AS on_progress_count
    FROM 
        (
            SELECT DISTINCT created_at::date AS date FROM public.request WHERE created_at IS NOT NULL
            UNION
            SELECT DISTINCT completed_at::date AS date FROM public.request WHERE completed_at IS NOT NULL
        ) AS dates
    LEFT JOIN 
        public.request r ON r.created_at::date = dates.date OR r.completed_at::date = dates.date
    WHERE 
        dates.date IS NOT NULL
    GROUP BY 
        dates.date
    ORDER BY 
        dates.date ASC;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_auth_user(email text, password text, user_id uuid, app_meta_data jsonb, user_meta_data jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
  declare
  encrypted_pw text;
BEGIN
  -- user_id := gen_random_uuid();
  encrypted_pw := crypt(password, gen_salt('bf'));
  
  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at,created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token,raw_app_meta_data,raw_user_meta_data)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00',  '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '',app_meta_data,user_meta_data);
  
  INSERT INTO auth.identities (id, user_id,provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), user_id,gen_random_uuid(), format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_interview_meeting_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    temp_column_name TEXT;
    old_value TEXT;
    new_value TEXT;
    query TEXT;
    delta_json jsonb = '{}'::jsonb;
BEGIN
    -- Iterate over the columns
    FOREACH temp_column_name IN ARRAY ARRAY['status', 'start_time', 'end_time', 'organizer_id', 'meeting_flow', 'delta']
    LOOP
        -- Dynamically construct the query to handle different data types
        old_value := COALESCE(row_to_json(OLD)->>temp_column_name, 'null');
        new_value := COALESCE(row_to_json(NEW)->>temp_column_name, 'null');
        -- insert log if values have changed
        IF old_value IS DISTINCT FROM new_value THEN
            delta_json := delta_json || jsonb_build_object(temp_column_name, old_value); 
        END IF;
    END LOOP;

    INSERT INTO public.interview_meeting_log (
        meeting_id
        , status
        , start_time
        , end_time
        , organizer_id
        , meeting_flow
        , delta
        )
        VALUES (
            New.id
            , NEW.status
            , NEW.start_time
            , NEW.end_time
            , NEW.organizer_id
            , NEW.meeting_flow
            , delta_json
        );  
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_new_workflow_action_log(triggered_table workflow_cron_trigger_tables, triggered_table_pkey uuid, workflow_id uuid, workflow_action_id uuid, interval_minutes numeric, phase text, meta json, base_time timestamp with time zone DEFAULT now())
 RETURNS numeric
 LANGUAGE plpgsql
AS $function$
DECLARE
    execute_at TIMESTAMP with time zone;
    inserted_id numeric;
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

    -- Insert record into workflow_action_logs and return the inserted ID
    INSERT INTO workflow_action_logs (
        workflow_id, workflow_action_id, meta, execute_at, related_table, related_table_pkey
    )
    VALUES (
        workflow_id, workflow_action_id, meta, execute_at, triggered_table, triggered_table_pkey
    )
    RETURNING id INTO inserted_id;

    RETURN inserted_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_request_meeting_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    temp_column_name TEXT;
    old_value TEXT;
    new_value TEXT;
    query TEXT;
    delta_json jsonb = '{}'::jsonb;
BEGIN
    -- Iterate over the columns
    FOREACH temp_column_name IN ARRAY ARRAY['assignee_id', 'status', 'type', 'priority']
    LOOP
        -- Dynamically construct the query to handle different data types
        old_value := COALESCE(row_to_json(OLD)->>temp_column_name, 'null');
        new_value := COALESCE(row_to_json(NEW)->>temp_column_name, 'null');
        -- insert log if values have changed
        IF old_value IS DISTINCT FROM new_value THEN
            delta_json := delta_json || jsonb_build_object(temp_column_name, old_value); 
        END IF;
    END LOOP;

    INSERT INTO public.request_log (
        request_id
        , assignee_id
        , status
        , type
        , priority  
        , delta
        )
        VALUES (
            NEW.id
            , NEW.assignee_id
            , NEW.status
            , NEW.type
            , NEW.priority
            , delta_json
        );  
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_session_request(application uuid DEFAULT NULL::uuid, sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    request_id uuid;
    session_id uuid;
BEGIN
  IF application IS NOT NULL
  AND request IS NOT NULL
  AND request ->> 'assigner_id' IS NOT NULL
  AND request ->> 'assignee_id' IS NOT NULL 
  THEN
    INSERT INTO
      request (
        application_id,
        assigner_id,
        assignee_id,
        title,
        type,
        status,
        priority,
        schedule_end_date,
        schedule_start_date
      )
    VALUES
      (
        application,
        (request ->> 'assigner_id')::uuid,
        (request ->> 'assignee_id')::uuid,
        COALESCE(request ->> 'title', 'New request'),
        COALESCE(request ->> 'type', 'schedule_request'),
        COALESCE(request ->> 'status', 'to_do'),
        COALESCE(request ->> 'priority', 'standard'),
        COALESCE(request ->> 'schedule_end_date', NULL)::timestamp with time zone,
        COALESCE(request ->> 'schedule_start_date', NULL)::timestamp with time zone
      )
    RETURNING
      id INTO request_id;
    IF request_id IS NOT NULL AND request ->> 'note' IS NOT NULL AND TRIM(request ->> 'note') <> '' 
    THEN
      INSERT INTO
        request_note (request_id, note)
      VALUES
        (request_id, request ->> 'note');
    END IF;
    IF request_id IS NOT NULL AND array_length(sessions, 1) > 0 
    THEN 
      FOR session_id IN
        SELECT
          UNNEST(sessions) 
        LOOP
          INSERT INTO
            request_relation (request_id, session_id)
          VALUES
            (request_id, session_id);
        END LOOP;
    END IF;
  END IF;
  RETURN request_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_training_progress()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  session_relation RECORD;
BEGIN
  IF OLD.status = 'confirmed' AND NEW.status = 'completed' THEN
    FOR session_relation IN
      SELECT interview_session_relation.id 
      FROM interview_session_relation 
      JOIN interview_session ON interview_session.id = interview_session_relation.session_id
      JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
      WHERE interview_session_relation.is_confirmed = true
        AND (interview_session_relation.training_type = 'shadow' 
          OR interview_session_relation.training_type = 'reverse_shadow') 
        AND interview_meeting.id = NEW.id
    LOOP
      -- Insert into interview_training_progress
      INSERT INTO interview_training_progress (session_relation_id)
      VALUES (session_relation.id);
    END LOOP;
  END IF;
  RETURN NEW;
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

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    claims jsonb;
    allpermissions jsonb;
    role_name text;
    recruiter_id uuid;
BEGIN
    -- Retrieve and convert permissions to JSONB array
    SELECT jsonb_agg(permissions.name) INTO allpermissions
    FROM public.permissions
    JOIN public.role_permissions ON role_permissions.permission_id = permissions.id
    JOIN public.roles ON roles.id = role_permissions.role_id
    JOIN public.recruiter_relation ON recruiter_relation.role_id = roles.id
    WHERE permissions.is_enable = true 
      AND recruiter_relation.user_id = (event->>'user_id')::uuid;

    -- Handle case where no permissions are found
    allpermissions := COALESCE(allpermissions, '[]'::jsonb);

    -- Retrieve the role name
    SELECT roles.name, recruiter_relation.recruiter_id INTO role_name ,recruiter_id
    FROM public.roles
    JOIN public.recruiter_relation ON recruiter_relation.role_id = roles.id
    WHERE recruiter_relation.user_id = (event->>'user_id')::uuid;

    -- Proceed with claims
    claims := event->'claims';

    -- Check if 'app_metadata' exists in claims
    IF jsonb_typeof(claims->'app_metadata') IS NULL THEN
        -- If 'app_metadata' does not exist, create an empty object
        claims := jsonb_set(claims, '{app_metadata}', '{}');
    END IF;

    -- Set a claim of 'permissions' and 'role'
    claims := jsonb_set(
        claims, 
        '{app_metadata, role_permissions}', 
        jsonb_build_object('permissions', allpermissions, 'role', role_name,'recruiter_id',recruiter_id)
    );

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified event
    RETURN event;
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

CREATE OR REPLACE FUNCTION public.delete_interview_meetings_on_status_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF OLD.status = 'disqualified' AND NEW.status = 'new' THEN
    DELETE FROM interview_meeting WHERE application_id = NEW.id;
    DELETE FROM candidate_request_availability WHERE application_id = NEW.id;
    DELETE FROM interview_filter_json WHERE application_id = NEW.id;
  END IF;
  RETURN NEW;
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
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    -- Call the getoutreachemails function to retrieve outreach emails
    outreach_emails := emailHandlerCandidateDb();

    -- Check if there are any outreach emails to process
    IF array_length(outreach_emails, 1) IS NOT NULL THEN
        -- Retrieve the function URL from the 'env' table
        SELECT value INTO function_url FROM env WHERE name = 'email-handler-candidatedb';

        -- Send a single POST request with the entire array as the body
        request_results := net.http_post(
            url := concat(host,'/api/candidatedb/cron-email-sender'),
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

CREATE OR REPLACE FUNCTION public.expire_new_requests()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  UPDATE request
  SET is_new = false
  WHERE is_new = true AND created_at < now() - interval '6 hours';
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
    retry = 2
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

CREATE OR REPLACE FUNCTION public.get_all_interviewers(recruiter_id_param uuid, start_time_param timestamp with time zone, end_time_param timestamp with time zone, department_ids_params integer[], office_location_ids_params integer[], job_ids_params uuid[], module_ids_params uuid[])
 RETURNS TABLE(user_id uuid, first_name text, last_name text, email text, profile_image text, "position" text, schedule_auth jsonb, scheduling_settings jsonb, status text, department_id integer, office_location_id integer, recruiter_id uuid, is_calendar_connected boolean, upcoming_meeting_count bigint, completed_meeting_count bigint, completed_meetings jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        ru.user_id,
        ru.first_name,
        ru.last_name,
        ru.email,
        ru.profile_image,
        ru."position",
        ru.schedule_auth,
        ru.scheduling_settings,
        ru.status,
        ru.department_id,
        ru.office_location_id,
        recrel.recruiter_id,
        ru.is_calendar_connected,
        (SELECT count(*) FROM interview_session_relation intsesrel
            JOIN interview_session intses ON intses.id = intsesrel.session_id
            JOIN interview_meeting intm ON intm.id = intses.meeting_id
            JOIN interview_module_relation intmodrel_1 ON intmodrel_1.id = intsesrel.interview_module_relation_id
            WHERE (intmodrel_1.user_id = ru.user_id OR intsesrel.user_id = ru.user_id)
            AND intm.status = 'confirmed' 
            AND intm.start_time >= start_time_param 
            AND intm.start_time < end_time_param
            AND intsesrel.is_confirmed = true) AS upcoming_meeting_count,
        (SELECT count(*) FROM interview_session_relation intsesrel
            JOIN interview_session intses ON intses.id = intsesrel.session_id
            JOIN interview_meeting intm ON intm.id = intses.meeting_id
            JOIN interview_module_relation intmodrel_1 ON intmodrel_1.id = intsesrel.interview_module_relation_id
            WHERE (intmodrel_1.user_id = ru.user_id OR intsesrel.user_id = ru.user_id)
            AND intm.status = 'completed' 
            AND intm.start_time >= start_time_param 
            AND intm.start_time < end_time_param
            AND intsesrel.is_confirmed = true) AS completed_meeting_count,
        (SELECT jsonb_object_agg(daily_counts.day, daily_counts.meeting_count)
            FROM (SELECT date_trunc('day', intm.start_time) AS day, count(*) AS meeting_count
                FROM interview_session_relation intsesrel
                JOIN interview_session intses ON intses.id = intsesrel.session_id
                JOIN interview_meeting intm ON intm.id = intses.meeting_id
                JOIN interview_module_relation intmodrel_1 ON intmodrel_1.id = intsesrel.interview_module_relation_id
                WHERE (intmodrel_1.user_id = ru.user_id OR intsesrel.user_id = ru.user_id)
                AND intm.status = 'completed' 
                AND intsesrel.is_confirmed = true 
                AND intm.start_time >= start_time_param 
                AND intm.start_time < end_time_param
                GROUP BY date_trunc('day', intm.start_time)) daily_counts) AS completed_meetings
    FROM recruiter_user ru
    LEFT JOIN recruiter_relation recrel ON recrel.user_id = ru.user_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.user_id = ru.user_id
    LEFT JOIN interview_module intmod ON intmod.id = intmodrel.module_id
    WHERE recrel.recruiter_id = recruiter_id_param
    AND (department_ids_params IS NULL OR department_ids_params = '{}' OR ru.department_id = ANY(department_ids_params))
    AND (office_location_ids_params IS NULL OR office_location_ids_params = '{}' OR ru.office_location_id = ANY(office_location_ids_params))
    AND (
        job_ids_params IS NULL OR job_ids_params = '{}' OR EXISTS (
            SELECT 1
            FROM (
                SELECT COALESCE(array_agg(DISTINCT interview_plan.job_id), array[]::uuid[]) AS user_job_ids
                FROM interview_session_relation
                LEFT JOIN interview_module_relation ON interview_session_relation.interview_module_relation_id = interview_module_relation.id
                LEFT JOIN recruiter_user ON interview_module_relation.user_id = recruiter_user.user_id
                LEFT JOIN recruiter_user debrief_user ON interview_session_relation.user_id = recruiter_user.user_id
                LEFT JOIN interview_session ON interview_session.id = interview_session_relation.session_id
                LEFT JOIN interview_plan ON interview_plan.id = interview_session.interview_plan_id
                WHERE interview_plan.job_id IS NOT NULL
                AND (ru.user_id = recruiter_user.user_id OR ru.user_id = debrief_user.user_id)
            ) AS job_ids_subquery
            WHERE job_ids_subquery.user_job_ids && job_ids_params
        )
    )
    AND (
        module_ids_params IS NULL OR module_ids_params = '{}' OR EXISTS (
            SELECT 1
            FROM (
                SELECT COALESCE(array_agg(DISTINCT interview_module.id), array[]::uuid[]) AS user_module_ids
                FROM interview_session_relation
                LEFT JOIN interview_module_relation ON interview_session_relation.interview_module_relation_id = interview_module_relation.id
                LEFT JOIN recruiter_user ON interview_module_relation.user_id = recruiter_user.user_id
                LEFT JOIN recruiter_user debrief_user ON interview_session_relation.user_id = recruiter_user.user_id
                LEFT JOIN interview_session ON interview_session.id = interview_session_relation.session_id
                LEFT JOIN interview_module ON interview_module.id = interview_session.module_id
                WHERE (ru.user_id = recruiter_user.user_id OR ru.user_id = debrief_user.user_id)
            ) AS module_ids_subquery
            WHERE module_ids_subquery.user_module_ids && module_ids_params
        )
    )
    GROUP BY ru.user_id, recrel.recruiter_id;
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

CREATE OR REPLACE FUNCTION public.get_completed_requests_candidate_list(rec_id uuid)
 RETURNS TABLE(applications jsonb[], jobs jsonb[], assignerlist jsonb[], assigneelist jsonb[])
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY  
    WITH candidates_cte AS (
        SELECT DISTINCT
            a.id AS application_id,
            CONCAT(c.first_name, ' ', COALESCE(c.last_name, '')) AS candidate_name,
            pj.id AS job_id,
            pj.job_title,
            r.assigner_id,
            r.assignee_id,
            CONCAT(ru_assigner.first_name, ' ', COALESCE(ru_assigner.last_name,'')) AS assigner_name,
            CONCAT(ru_assignee.first_name, ' ', COALESCE(ru_assignee.last_name,'')) AS assignee_name
        FROM
            public.applications a
            INNER JOIN public.public_jobs pj ON pj.id = a.job_id
            INNER JOIN public.candidates c ON a.candidate_id = c.id
            INNER JOIN public.request r ON a.id = r.application_id
            LEFT JOIN public.recruiter_user ru_assigner ON r.assigner_id = ru_assigner.user_id
            LEFT JOIN public.recruiter_user ru_assignee ON r.assignee_id = ru_assignee.user_id
        WHERE
            c.recruiter_id = rec_id
            AND r.status = 'completed'
    ),
    applications AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'application_id', application_id,
                    'candidate_name', candidate_name
                )
            )::jsonb[] AS applications
        FROM
            candidates_cte
    ),
    jobs AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'job_id', job_id,
                    'job_title', job_title
                )
            )::jsonb[] AS jobs
        FROM
            candidates_cte
    ),
    assignerList AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'id', assigner_id,
                    'name', assigner_name
                )
            )::jsonb[] AS assignerList
        FROM
            candidates_cte
    ),
    assigneeList AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'id', assignee_id,
                    'name', assignee_name
                )
            )::jsonb[] AS assigneeList
        FROM
            candidates_cte
    )
    
    SELECT
        applications.applications,
        jobs.jobs,
        assignerList.assignerList,
        assigneeList.assigneeList
    FROM
        applications, jobs, assignerList, assigneeList;
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

CREATE OR REPLACE FUNCTION public.get_filtered_job_ids(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS SETOF uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
  departments_length numeric;
  jobs_length numeric;
BEGIN
  departments_length := coalesce(
    array_length(get_filtered_job_ids.departments, 1),
    0
  );
  jobs_length := coalesce(array_length(get_filtered_job_ids.jobs, 1), 0);
  RETURN QUERY
    WITH
      department_jobs AS (
        SELECT
          public_jobs.id
        FROM
          public_jobs
        WHERE
          (
            (
              departments_length = 0
              AND jobs_length = 0
            )
            OR (public_jobs.department_id = ANY (departments))
          )
          AND public_jobs.recruiter_id = get_filtered_job_ids.recruiter_id
      ),
      all_jobs AS (
        SELECT
          department_jobs.id
        FROM
          department_jobs
        UNION
        SELECT
          unnest(COALESCE(jobs, ARRAY[]::uuid[]))
      )
    SELECT
      id
    FROM
      all_jobs;
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
AS $function$DECLARE
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
      'session_relation_id',sess_reln.id,
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
        'session_relation_id',sess_reln.id,
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

  SELECT INTO service_cred integr.service_json
      FROM recruiter r
      JOIN integrations integr ON integr.recruiter_id = r.id
      WHERE r.id = company_id; 
  
  SELECT scheduling_settings INTO comp_schedule_setting
  FROM recruiter
  WHERE id = company_id;


  -- Return the interview_sessions and interviewers arrays
  RETURN QUERY SELECT interview_sessions, interviewers, service_cred, interview_modules, comp_schedule_setting, coalesce(int_meetings,Array[]::jsonb[]);
END;$function$
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
    WHERE ru.status = 'active' AND recrel.recruiter_id = rec_id
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

CREATE OR REPLACE FUNCTION public.get_request_count_stats(assigner_id uuid)
 RETURNS TABLE(date date, counts json)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  with count_cte as (
    select 
      request.created_at::date as count_date,
      request.type,
      request.status,
      request.priority,
      count(*) as count
    from
      request
    where 
      request.assigner_id = get_request_count_stats.assigner_id
    group by
      count_date, request.type, request.status, request.priority
  ), date_series as (
      select 
        generate_series(
          greatest((now() - '30 days'::interval)::date, (SELECT min(count_date) FROM count_cte)),
          now()::date, 
          '1 day'::interval
        )::date as date
  ), status_cte as (
    select 'to_do' as placeholder_status
    union
    select 'in_progress' as placeholder_status
    union
    select 'blocked' as placeholder_status
    union
    select 'completed' as placeholder_status
  ), type_cte as (
    select 'schedule_request' as placeholder_type
    union
    select 'cancel_schedule_request' as placeholder_type
    union
    select 'reschedule_request' as placeholder_type
    union
    select 'decline_request' as placeholder_type
  ), priority_cte as (
    select 'standard' as placeholder_priority
    union
    select 'urgent' as placeholder_priority
  ), expanded_cte as (
    select 
      date_series.date,
      type_cte.placeholder_type as type,
      status_cte.placeholder_status as status,
      priority_cte.placeholder_priority as priority,
      coalesce(count_cte.count, 0) as count
    from 
      date_series
    cross join 
      status_cte
    cross join 
      type_cte
    cross join
      priority_cte
    left join 
      count_cte on 
        date_series.date = count_cte.count_date and 
        status_cte.placeholder_status = count_cte.status and 
        type_cte.placeholder_type = count_cte.type and
        priority_cte.placeholder_priority = count_cte.priority
  ), priority_aggregate_cte as (
    select 
      expanded_cte.date, 
      expanded_cte.status,
      expanded_cte.type, 
      json_object_agg(
        expanded_cte.priority,
        expanded_cte.count
      ) as priority_count
    from
      expanded_cte
    group by
      expanded_cte.date, expanded_cte.status, expanded_cte.type
  ), type_aggregate_cte as (
    select 
      priority_aggregate_cte.date,
      priority_aggregate_cte.status,
      json_object_agg(
        priority_aggregate_cte.type,
        priority_aggregate_cte.priority_count
      ) as type_count
    from 
      priority_aggregate_cte
    group by 
      priority_aggregate_cte.date, priority_aggregate_cte.status
  )
  select 
    type_aggregate_cte.date,
    json_object_agg(
      type_aggregate_cte.status,
      type_aggregate_cte.type_count
    ) as counts
  from 
    type_aggregate_cte
  group by 
    type_aggregate_cte.date
  order by 
  type_aggregate_cte.date;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_request_count_stats_new(assigner_id uuid)
 RETURNS TABLE(date date, counts json)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  with
    init_cte as (
      select
        (
          case
            when request.status = 'completed' then 'completed'
            else 'created'
          end
        ) as custom_status,
        request.completed_at::date as cte_completed_at,
        request.created_at::date as cte_created_at,
        request.type,
        request.priority,
        count(*) as count
      from
        request
      where
        request.assigner_id = get_request_count_stats_new.assigner_id or
        request.assignee_id = get_request_count_stats_new.assigner_id
      group by
        custom_status,
        cte_completed_at,
        cte_created_at,
        request.type,
        request.priority
    ),
    count_cte as (
      select
        a.custom_status as status,
        (
          case
            when a.custom_status = 'completed' then a.cte_completed_at
            else a.cte_created_at
          end
        ) as date,
        a.type,
        a.priority,
        a.count + (coalesce(b.count, 0)) as count
      from
        init_cte as a
        left join init_cte as b on b.custom_status = 'completed'
        and a.custom_status = 'created'
        and b.cte_created_at = a.cte_created_at
        and b.type = a.type
        and b.priority = a.priority
    ),
    date_series as (
      select
        generate_series(
          greatest(
            (now() - '9 days'::interval)::date,
            (
              SELECT
                min(count_cte.date)
              FROM
                count_cte
            )
          ),
          now()::date,
          '1 day'::interval
        )::date as date
    ),
    status_cte as (
      select
        'created' as placeholder_status
      union
      select
        'completed' as placeholder_status
    ),
    type_cte as (
      select
        'schedule_request' as placeholder_type
      union
      select
        'cancel_schedule_request' as placeholder_type
      union
      select
        'reschedule_request' as placeholder_type
      union
      select
        'decline_request' as placeholder_type
    ),
    priority_cte as (
      select
        'standard' as placeholder_priority
      union
      select
        'urgent' as placeholder_priority
    ),
    expanded_cte as (
      select
        date_series.date,
        type_cte.placeholder_type as
      type,
      status_cte.placeholder_status as status,
      priority_cte.placeholder_priority as priority,
      coalesce(count_cte.count, 0) as count
      from
        date_series
        cross join status_cte
        cross join type_cte
        cross join priority_cte
        left join count_cte on date_series.date = count_cte.date
        and status_cte.placeholder_status = count_cte.status
        and type_cte.placeholder_type = count_cte.type
        and priority_cte.placeholder_priority = count_cte.priority
    ),
    priority_aggregate_cte as (
      select
        expanded_cte.date,
        expanded_cte.status,
        expanded_cte.type,
        json_object_agg(expanded_cte.priority, expanded_cte.count) as priority_count
      from
        expanded_cte
      group by
        expanded_cte.date,
        expanded_cte.status,
        expanded_cte.type
    ),
    type_aggregate_cte as (
      select
        priority_aggregate_cte.date,
        priority_aggregate_cte.status,
        json_object_agg(
          priority_aggregate_cte.type,
          priority_aggregate_cte.priority_count
        ) as type_count
      from
        priority_aggregate_cte
      group by
        priority_aggregate_cte.date,
        priority_aggregate_cte.status
    )
  select
    type_aggregate_cte.date,
    json_object_agg(
      type_aggregate_cte.status,
      type_aggregate_cte.type_count
    ) as counts
  from
    type_aggregate_cte
  group by
    type_aggregate_cte.date
  order by
    type_aggregate_cte.date;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_request_stats(assigner_id uuid, curr_date date DEFAULT (now())::date)
 RETURNS TABLE(date text, created bigint, completed bigint, on_going bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  WITH
  request_cte AS (
    SELECT
      request.created_at,
      request.completed_at,
      request.status
    FROM
      request
    WHERE
      request.assignee_id = get_request_stats.assigner_id
      OR request.assigner_id = get_request_stats.assigner_id
  ),
  date_cte AS (
    SELECT DISTINCT
      request_cte.created_at::date as date
    FROM
      request_cte
    WHERE
      request_cte.created_at IS NOT NULL
    UNION
    SELECT DISTINCT
      request_cte.completed_at::date as date
    FROM
      request_cte
    WHERE
      request_cte.completed_at IS NOT NULL
  ),
  date_series AS (
    SELECT
      GENERATE_SERIES(
        GREATEST(
          (get_request_stats.curr_date::date - '9 days'::interval)::date,
          (
            SELECT
              MIN(date_cte.date)
            FROM
              date_cte
          )
        ),
        get_request_stats.curr_date::date,
        '1 day'::interval
      )::date as date
  ),
  count_cte AS (
    SELECT
      date_series.date,
      COUNT(*) FILTER (
        WHERE
          date_series.date = request_cte.created_at::date
      ) as created,
      COUNT(*) FILTER (
        WHERE
          date_series.date = request_cte.completed_at::date
      ) as completed,
      COUNT(*) FILTER (
        WHERE
          date_series.date = request_cte.created_at::date
          AND status = 'in_progress'
      ) as on_going
    FROM
      date_series
      LEFT JOIN request_cte ON request_cte.created_at::date = date_series.date
      OR request_cte.completed_at::date = date_series.date
    GROUP BY
      date_series.date
    ORDER BY
      date_series.date DESC
  ),
  final_count_cte AS (
    SELECT
      count_cte.*,
      (SUM(count_cte.on_going) OVER ())::bigint as sum,
      ROW_NUMBER() OVER ()
    FROM
      count_cte
  )
  SELECT
    final_count_cte.date::text,
    final_count_cte.created::bigint,
    final_count_cte.completed::bigint,
    (
      CASE
        WHEN final_count_cte.row_number = 1 THEN final_count_cte.sum
        ELSE 0
      END
    )::bigint as on_going
  FROM
    final_count_cte
  ORDER BY
    final_count_cte.date ASC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_requests_candidate_list(rec_id uuid)
 RETURNS TABLE(applications jsonb[], jobs jsonb[], assignerlist jsonb[], assigneelist jsonb[])
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY  
    WITH candidates_cte AS (
        SELECT DISTINCT
            a.id AS application_id,
            CONCAT(c.first_name, ' ', COALESCE(c.last_name, '')) AS candidate_name,
            pj.id AS job_id,
            pj.job_title,
            r.assigner_id,
            r.assignee_id,
            CONCAT(ru_assigner.first_name, ' ', COALESCE(ru_assigner.last_name,'')) AS assigner_name,
            CONCAT(ru_assignee.first_name, ' ', COALESCE(ru_assignee.last_name,'')) AS assignee_name
        FROM
            public.applications a
            INNER JOIN public.public_jobs pj ON pj.id = a.job_id
            INNER JOIN public.candidates c ON a.candidate_id = c.id
            INNER JOIN public.request r ON a.id = r.application_id
            LEFT JOIN public.recruiter_user ru_assigner ON r.assigner_id = ru_assigner.user_id
            LEFT JOIN public.recruiter_user ru_assignee ON r.assignee_id = ru_assignee.user_id
        WHERE
            c.recruiter_id = rec_id
    ),
    applications AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'application_id', application_id,
                    'candidate_name', candidate_name
                )
            )::jsonb[] AS applications
        FROM
            candidates_cte
    ),
    jobs AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'job_id', job_id,
                    'job_title', job_title
                )
            )::jsonb[] AS jobs
        FROM
            candidates_cte
    ),
    assignerList AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'id', assigner_id,
                    'name', assigner_name
                )
            )::jsonb[] AS assignerList
        FROM
            candidates_cte
    ),
    assigneeList AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'id', assignee_id,
                    'name', assignee_name
                )
            )::jsonb[] AS assigneeList
        FROM
            candidates_cte
    )
    
    SELECT
        coalesce(applications.applications, ARRAY[]::jsonb[]) as applications,
        coalesce(jobs.jobs, ARRAY[]::jsonb[]) as jobs,
        coalesce(assignerList.assignerList, ARRAY[]::jsonb[]) as assignerList,
        coalesce(assigneeList.assigneeList, ARRAY[]::jsonb[]) as assigneeList
    FROM
        applications, jobs, assignerList, assigneeList;
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

CREATE OR REPLACE FUNCTION public.greenhouse_sync()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
BASE_URL text;
BEGIN
  SELECT value into BASE_URL from env where name = 'BASE_URL';
  PERFORM 
    net.http_post(
      url := BASE_URL||'/api/sync/greenhouse/full_db',
      body := jsonb_build_object('recruiter_id', recruiter_id, 'key', greenhouse_key),
      headers := '{ "Content-Type": "application/json"}'
    )
  FROM integrations WHERE greenhouse_key IS NOT NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.insert_debrief_session(recruiter_id uuid, interview_plan_id uuid, session_order integer, session_duration integer, break_duration integer, location text, schedule_type interview_schedule_type, name text, members jsonb, members_meta jsonb)
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
            recruiter_id,
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
            recruiter_id,
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

CREATE OR REPLACE FUNCTION public.insert_interview_session(recruiter_id uuid, module_id uuid, interview_plan_id uuid, session_order integer, session_duration integer, break_duration integer, interviewer_cnt integer, session_type session_type, location text, schedule_type interview_schedule_type, name text, interview_module_relation_entries jsonb)
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
            recruiter_id,
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
            recruiter_id,
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

create or replace view "public"."interview_types_view" as  SELECT intmod.id,
    intmod.name,
    intmod.department_id,
    intmod.created_by,
    intmod.is_archived,
    intmod.description,
    intmod.recruiter_id,
    departments.name AS department_name,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('user_id', ru.user_id, 'first_name', ru.first_name, 'last_name', ru.last_name, 'email', ru.email, 'profile_image', ru.profile_image, 'position', ru."position")) AS jsonb_agg
           FROM recruiter_user ru
          WHERE (ru.user_id IN ( SELECT intmodrel.user_id
                   FROM interview_module_relation intmodrel
                  WHERE ((intmodrel.module_id = intmod.id) AND (intmodrel.is_archived = false))))), '[]'::jsonb) AS users,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'confirmed'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS upcoming_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'completed'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS completed_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'cancelled'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS canceled_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'confirmed'::interview_schedule_status) AND (inses.module_id = intmod.id) AND (intm.start_time >= date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone) + '1 mon'::interval)))))::integer AS this_month_confirmed_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'completed'::interview_schedule_status) AND (inses.module_id = intmod.id) AND (intm.start_time >= date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone) + '1 mon'::interval)))))::integer AS this_month_completed_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'cancelled'::interview_schedule_status) AND (inses.module_id = intmod.id) AND (intm.start_time >= date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone) + '1 mon'::interval)))))::integer AS this_month_cancelled_meeting_count,
    ( SELECT COALESCE((avg((EXTRACT(epoch FROM (intm.end_time - intm.start_time)) / (60)::numeric)))::integer, 0) AS avg_duration_minutes
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'completed'::interview_schedule_status) AND (inses.module_id = intmod.id) AND (intm.start_time >= date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('month'::text, (CURRENT_DATE)::timestamp with time zone) + '1 mon'::interval)))) AS avg_meeting_duration,
    ( SELECT COALESCE(array_agg(DISTINCT public_jobs.job_title), ARRAY[]::text[]) AS "coalesce"
           FROM (((interview_meeting
             LEFT JOIN interview_session ON ((interview_session.meeting_id = interview_meeting.id)))
             LEFT JOIN applications ON ((applications.id = interview_meeting.application_id)))
             LEFT JOIN public_jobs ON ((public_jobs.id = applications.job_id)))
          WHERE ((interview_session.module_id = intmod.id) AND (public_jobs.status = 'published'::public_job_status))) AS job_names
   FROM (interview_module intmod
     LEFT JOIN departments ON ((departments.id = intmod.department_id)))
  ORDER BY intmod.created_at DESC;


CREATE OR REPLACE FUNCTION public.interviewers_analytic_extra(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(user_id uuid, average_weekly_count numeric, average_weekly_duration numeric, upcoming numeric, qualified numeric, training numeric)
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY WITH weekly_counts AS (
     SELECT 
        interview_module_relation.user_id
        , DATE_TRUNC('week', interview_meeting.created_at) AS created_at
        , COUNT(*) AS weekly_count
        , SUM(interview_session.session_duration) AS weekly_duration
        , count(interview_meeting.status) FILTER (WHERE interview_meeting.status::text = 'confirmed') AS upcoming
        , count(interview_module_relation.training_status) FILTER (WHERE interview_module_relation.training_status = 'qualified') AS qualified
        , count(interview_module_relation.training_status) FILTER (WHERE interview_module_relation.training_status = 'training') AS training
    FROM interview_session_relation
      JOIN interview_module_relation ON interview_module_relation.id = interview_session_relation.interview_module_relation_id
      JOIN interview_session on interview_session.id = interview_session_relation.session_id
      JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
      JOIN public_jobs ON interview_meeting.job_id = public_jobs.id
    WHERE
      interview_meeting.recruiter_id = interviewers_analytic_extra.recruiter_id
      AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
      AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
      AND (CARDINALITY(jobs) = 0 OR interview_meeting.job_id = ANY(jobs))
      AND (start_datetime IS NULL OR interview_meeting.start_time >= start_datetime)
      AND interview_meeting.start_time <= end_datetime
    GROUP BY 
        interview_module_relation.user_id,DATE_TRUNC('week', interview_meeting.created_at)
)
SELECT 
    weekly_counts.user_id
    , ROUND(AVG(weekly_count),1) AS average_weekly_count
    , ROUND(AVG(weekly_duration),1) AS average_weekly_duration
    , SUM(weekly_counts.upcoming) AS upcoming
    , SUM(weekly_counts.qualified) AS qualified
    , SUM(weekly_counts.training) AS training
FROM 
    weekly_counts
GROUP BY 
    weekly_counts.user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.interviewers_analytic_rejections(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(user_id uuid, decline bigint, lead_time numeric, reason text[], note text[])
 LANGUAGE plpgsql
AS $function$
  BEGIN
    RETURN QUERY select interview_module_relation.user_id as user_id
      , COUNT(*) as decline
      , AVG(extract(epoch from interview_session_cancel.created_at - interview_session.created_at)) as lead_time
      , ARRAY_AGG(interview_session_cancel.reason) as reasons
      , ARRAY_AGG(interview_session_cancel.other_details ->> 'note') as notes
      FROM interview_session_cancel 
      JOIN interview_session ON interview_session.id = interview_session_cancel.session_id 
      JOIN interview_session_relation ON interview_session_cancel.session_relation_id = interview_session_relation.id
      JOIN interview_module_relation ON interview_module_relation.id = interview_session_relation.interview_module_relation_id
      JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
      JOIN public_jobs ON public_jobs.id = interview_meeting.job_id
      WHERE interview_session_cancel.session_relation_id IS NOT NULL
      AND interview_meeting.recruiter_id = interviewers_analytic_rejections.recruiter_id
      AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
      AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
      AND (CARDINALITY(jobs) = 0 OR public_jobs.id = ANY(jobs))
      AND (start_datetime IS NULL OR interview_session.created_at >= start_datetime)
      AND interview_session.created_at <= end_datetime
      GROUP BY interview_module_relation.user_id;
  END;
  $function$
;

CREATE OR REPLACE FUNCTION public.interviewers_leaderboard_by_v(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(user_id uuid, duration bigint, total_hours bigint, accepted bigint, rejected bigint, feedback integer)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY SELECT interview_module_relation.user_id
        , SUM(interview_session.session_duration::int) as duration
        , COUNT(accepted_status) AS total_hours
        , COUNT(accepted_status) FILTER (WHERE interview_session_relation.accepted_status = 'accepted') AS accepted
        , COUNT(accepted_status) FILTER (WHERE interview_session_relation.accepted_status = 'declined') AS rejected
        , 0 AS feedback
        FROM interview_session_relation
            JOIN interview_module_relation ON interview_module_relation.id = interview_session_relation.interview_module_relation_id
            JOIN interview_session on interview_session.id = interview_session_relation.session_id
            JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
            JOIN public_jobs ON public_jobs.id = interview_meeting.job_id
        WHERE
            interview_meeting.recruiter_id = interviewers_leaderboard_by_v.recruiter_id
            AND interview_meeting.status = 'completed' 
            AND interview_session_relation.accepted_status in ('accepted','declined')
            AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
            AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
            AND (CARDINALITY(jobs) = 0 OR interview_meeting.job_id = ANY(jobs))
            AND (start_datetime IS NULL OR interview_meeting.start_time >= start_datetime)
            AND interview_meeting.start_time <= end_datetime
        GROUP BY interview_module_relation.user_id;
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

CREATE OR REPLACE FUNCTION public.jobs_locations_count(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(country text, state text, city text, app_count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY SELECT candidates.country, candidates.state, candidates.city, count(*) as app_count
  FROM candidates
  JOIN applications ON applications.candidate_id = candidates.id
  JOIN public_jobs ON public_jobs.id = applications.job_id
  WHERE public_jobs.recruiter_id = jobs_locations_count.recruiter_id
  AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
  AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
  AND (CARDINALITY(jobs) = 0 OR applications.job_id = ANY(jobs))
  AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
  AND applications.created_at <= end_datetime
  GROUP BY candidates.country, candidates.state, candidates.city, applications.job_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.lever_resume_save()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    rec_id uuid;
    app_id uuid;
    request_results JSONB;
    function_url TEXT;
BEGIN

    FOR rec_id IN 
        SELECT recruiter_id 
        FROM integrations 
        JOIN recruiter ON recruiter.id = integrations.recruiter_id 
        WHERE integrations.lever_key IS NOT NULL
    LOOP
        SELECT decrypted_secret 
        INTO function_url
        FROM vault.decrypted_secrets 
        WHERE name = 'APP_URL';

        FOR app_id IN 
            SELECT applications.id 
            FROM applications 
            JOIN public_jobs ON public_jobs.id = applications.job_id 
            WHERE public_jobs.posted_by = 'Lever' 
            AND applications.is_resume_fetching = TRUE 
            AND applications.processing_status <> 'failed' LIMIT 10
        LOOP
            request_results := net.http_post(
                url := concat(function_url,'/api/lever/saveResume' ),
                body := jsonb_build_object('application_id', app_id),
                headers := jsonb_build_object('Content-Type', 'application/json')
            );
            RAISE NOTICE 'HTTP request result for application_id %: %', app_id, request_results;
        END LOOP;

    END LOOP;
END $function$
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
        host text;
    BEGIN

         SELECT decrypted_secret 
         INTO host
         FROM vault.decrypted_secrets 
         WHERE name = 'APP_URL';

        -- Initialize an empty JSON array for the results
        result := '[]'::JSONB;

        -- Loop through the selected application IDs
        FOR app_id IN (
            SELECT job_id
            FROM lever_job_reference
            ORDER BY created_at ASC
        )
        LOOP
            SELECT
                net.http_post(
                    url := concat(host,'/api/lever/candidateSync'),
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
    interview_meeting.application_id,
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
          WHERE ((interview_session_relation.session_id = interview_session.id) AND (interview_session_relation.is_confirmed = true))) AS confirmed_user_ids,
    ( SELECT array_agg(interview_module_relation.id) AS array_agg
           FROM (interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
          WHERE ((interview_session_relation.session_id = interview_session.id) AND (interview_session_relation.is_confirmed = true))) AS confirmed_module_relation_ids,
    interview_session.parent_session_id,
    interview_meeting.schedule_request_id,
    interview_meeting.confirmed_candidate_tz
   FROM (((interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)))
     LEFT JOIN applications ON ((applications.id = interview_meeting.application_id)))
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
            COALESCE(debrief_user."position", recruiter_user."position") AS "position",
            interview_session_relation.accepted_status,
            ( SELECT json_agg(row_to_json(interview_session_cancel.*)) AS json_agg
                   FROM interview_session_cancel
                  WHERE (interview_session_cancel.session_relation_id = interview_session_relation.id)) AS cancel_reasons,
            interview_session_relation.interview_module_relation_id,
            interview_module_relation.module_id,
                CASE
                    WHEN (interview_session.interview_plan_id IS NOT NULL) THEN interview_plan.job_id
                    ELSE applications.job_id
                END AS job_id,
            COALESCE(debrief_user.schedule_auth, recruiter_user.schedule_auth) AS schedule_auth,
            COALESCE(debrief_user.scheduling_settings, recruiter_user.scheduling_settings) AS scheduling_settings
           FROM (((((((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
             LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
             LEFT JOIN interview_plan ON ((interview_plan.id = interview_session.interview_plan_id)))
             LEFT JOIN applications ON ((applications.id = interview_meeting.application_id)))
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
          WHERE ((id2.user_id = interview_data.user_id) AND (id2.end_time >= tb.today_start) AND (id2.end_time <= tb.today_end) AND (id2.is_confirmed = true) AND ((id2.status = 'confirmed'::interview_schedule_status) OR (id2.status = 'completed'::interview_schedule_status)))) AS totalinterviewstoday,
    ( SELECT count(*) AS count
           FROM interview_data id3,
            time_boundaries tb
          WHERE ((id3.user_id = interview_data.user_id) AND (id3.start_time >= tb.week_start) AND (id3.end_time <= tb.week_end) AND (id3.is_confirmed = true) AND ((id3.status = 'confirmed'::interview_schedule_status) OR (id3.status = 'completed'::interview_schedule_status)))) AS totalinterviewsthisweek,
    ( SELECT (COALESCE(sum(id4.session_duration), (0)::numeric) / 60.0)
           FROM interview_data id4,
            time_boundaries tb
          WHERE ((id4.user_id = interview_data.user_id) AND (id4.end_time >= tb.today_start) AND (id4.end_time <= tb.today_end) AND (id4.is_confirmed = true) AND ((id4.status = 'confirmed'::interview_schedule_status) OR (id4.status = 'completed'::interview_schedule_status)))) AS totalhourstoday,
    ( SELECT (COALESCE(sum(id5.session_duration), (0)::numeric) / 60.0)
           FROM interview_data id5,
            time_boundaries tb
          WHERE ((id5.user_id = interview_data.user_id) AND (id5.start_time >= tb.week_start) AND (id5.end_time <= tb.week_end) AND (id5.is_confirmed = true) AND ((id5.status = 'confirmed'::interview_schedule_status) OR (id5.status = 'completed'::interview_schedule_status)))) AS totalhoursthisweek,
    interview_data.accepted_status,
    interview_data.cancel_reasons,
    interview_data.interview_module_relation_id,
    interview_data.module_id,
    interview_data.job_id,
    interview_data.schedule_auth,
    interview_data.scheduling_settings
   FROM interview_data;


create or replace view "public"."module_relations_view" as  WITH interview_data AS (
         SELECT interview_module_relation.id,
            interview_module_relation.pause_json,
            interview_module_relation.training_status AS module_training_status,
            interview_module_relation.user_id,
            interview_module_relation.module_id,
            interview_module_relation.number_of_shadow,
            interview_module_relation.number_of_reverse_shadow,
            interview_module_relation.is_archived,
            recruiter_user.first_name,
            recruiter_user."position",
            recruiter_user.profile_image,
            recruiter_user.scheduling_settings,
            recruiter_user.phone,
            interview_module.name AS module_name,
            interview_module.description AS module_description,
            ( SELECT json_agg(json_build_object('interview_session', row_to_json(interview_session.*), 'interview_meeting', row_to_json(interview_meeting.*), 'interview_session_relation', row_to_json(interview_session_relation.*))) AS json_agg
                   FROM (((interview_session_relation
                     LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
                     LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
                     LEFT JOIN interview_module interview_module_1 ON ((interview_module_1.id = interview_session.module_id)))
                  WHERE ((interview_session_relation.interview_module_relation_id = interview_module_relation.id) AND ((interview_meeting.status = 'completed'::interview_schedule_status) OR (interview_meeting.status = 'confirmed'::interview_schedule_status)) AND (interview_session_relation.is_confirmed = true))) AS meetings
           FROM ((interview_module_relation
             LEFT JOIN interview_module ON ((interview_module.id = interview_module_relation.module_id)))
             LEFT JOIN recruiter_user ON ((interview_module_relation.user_id = recruiter_user.user_id)))
        )
 SELECT interview_data.id,
    interview_data.pause_json,
    interview_data.module_training_status,
    interview_data.user_id,
    interview_data.module_id,
    interview_data.number_of_shadow,
    interview_data.number_of_reverse_shadow,
    interview_data.first_name,
    interview_data."position",
    interview_data.profile_image,
    interview_data.scheduling_settings,
    interview_data.phone,
    interview_data.meetings,
    interview_data.module_name,
    interview_data.module_description,
    interview_data.is_archived,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS completed_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS cancelled_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS confirmed_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_completed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_completed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'confirmed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_confirmed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'confirmed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_confirmed_count,
    ( SELECT sum((((meeting_elements.value -> 'interview_session'::text) ->> 'session_duration'::text))::numeric) AS sum
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS completed_meeting_duration
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

CREATE OR REPLACE FUNCTION public.move_to_interview(applications uuid[] DEFAULT '{}'::uuid[], sessions uuid[] DEFAULT '{}'::uuid[], requests jsonb[] DEFAULT NULL::jsonb[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  response record;
BEGIN
    UPDATE applications
    SET status = 'interview'
    WHERE id = ANY(move_to_interview.applications);
    FOR response IN (
      WITH requests_cte AS (
        SELECT UNNEST(move_to_interview.requests)::jsonb as request
      ), sessions_cte AS (
        SELECT UNNEST(move_to_interview.sessions)::uuid as session_id
      )
      SELECT requests_cte.request, array_agg(meeting_details.session_id) as session_ids
      FROM meeting_details
      INNER JOIN requests_cte ON (requests_cte.request->>'application_id')::uuid = meeting_details.application_id
      INNER JOIN sessions_cte ON sessions_cte.session_id = meeting_details.parent_session_id
      GROUP BY requests_cte.request
    ) 
    LOOP
      PERFORM create_session_request((response.request ->> 'application_id')::uuid, response.session_ids, response.request - 'application_id');
    END LOOP;
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
                            'department', '',
                            'interview_session_relation', row_to_json(isr),
                            'location', '',
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
                            'department', '',
                            'interview_session_relation', row_to_json(isr),
                            'location', '',
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
                'recruiter_user',(
                     CASE WHEN intsescan.session_relation_id is NULL THEN
                    json_build_object(
                        'id', canceluser.user_id,
                        'first_name', canceluser.first_name,
                        'last_name', canceluser.last_name,
                        'email', canceluser.email,
                        'profile_image', canceluser.profile_image,
                        'position', canceluser.position
                    )
                    ELSE  json_build_object(
                        'id', recuser.user_id,
                        'first_name', recuser.first_name,
                        'last_name', recuser.last_name,
                        'email', recuser.email,
                        'profile_image', recuser.profile_image,
                        'position', recuser.position
                    )
                    END
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
        LEFT JOIN recruiter_user canceluser ON canceluser.user_id = intsescan.cancel_user_id
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

CREATE OR REPLACE FUNCTION public.new_permission_to_role_mapper()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.is_enable THEN
    WITH temp_roles as ( SELECT id as role_id, recruiter_id from roles where name = 'admin' ) --  selection sequence matters
    INSERT INTO role_permissions ( role_id, recruiter_id, permission_id) -- here
    SELECT temp_roles.*, NEW.id AS permission_id
    FROM temp_roles;
  ELSE
    DELETE FROM role_permissions WHERE permission_id = NEW.id;
  END IF;
  RETURN NEW;
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
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    -- Call the getoutreachemails function to retrieve outreach emails
    outreach_emails := getoutreachemails();

    -- Check if there are any outreach emails to process
    IF array_length(outreach_emails, 1) IS NOT NULL THEN
        -- Retrieve the function URL from the 'env' table
        SELECT value INTO function_url FROM env WHERE name = 'outreach-handler';

        -- Send a single POST request with the entire array as the body
        request_results := net.http_post(
            url := concat(host,'/api/ashby/batchsave'),
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
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
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

    
    -- Make a single HTTP request for the aggregated data
    SELECT
        net.http_post(
            url := concat(host,'/api/google/overview-handler'),
            body := aggregated_data  -- Use aggregated_data here
        ) INTO request_results;

    -- Return the HTTP request result
    RETURN request_results;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.per_module_candidate_pipeline(module_id uuid)
 RETURNS TABLE(applied bigint, screened bigint, interviewed bigint, offered bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY SELECT count(*) as applied
, COUNT(*) FILTER (WHERE candidate_files.resume_json IS NOT NULL) as screened
, COUNT(*) FILTER (WHERE interview_meeting.status = 'completed') as interviewed
, COUNT(*) FILTER (WHERE applications.status = 'qualified') as offered
FROM interview_session 
JOIN interview_meeting ON interview_session.meeting_id = interview_meeting.id
JOIN applications ON interview_meeting.application_id = applications.id
JOIN candidate_files ON applications.candidate_id = candidate_files.candidate_id
WHERE interview_session.module_id = per_module_candidate_pipeline.module_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.per_module_interview_statistics(module_id uuid)
 RETURNS TABLE(total bigint, completed bigint, duration numeric, time_to_schedule jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE interview_meeting.status = 'completed') AS completed,
        AVG(interview_session.session_duration)::NUMERIC AS duration,
        jsonb_build_object(
            'days', EXTRACT(DAY FROM AVG(interview_meeting.created_at - applications.created_at)),
            'hours', EXTRACT(HOUR FROM AVG(interview_meeting.created_at - applications.created_at)),
            'minutes', EXTRACT(MINUTE FROM AVG(interview_meeting.created_at - applications.created_at))
        ) AS time_to_schedule
    FROM 
        interview_meeting
    JOIN 
        interview_session ON interview_meeting.id = interview_session.meeting_id
    JOIN 
        applications ON applications.id = interview_meeting.application_id
    WHERE interview_session.module_id = per_module_interview_statistics.module_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.per_module_interviewer_performance(module_id uuid)
 RETURNS TABLE(candidate_feedback_avg numeric, total_interviews numeric, interviewer_feedback_count numeric, recommendation_success bigint, interviewers_count numeric)
 LANGUAGE plpgsql
AS $function$BEGIN
    RETURN QUERY WITH temp_res AS (
  SELECT coalesce((candidate_feedback->>'rating')::INT,0) AS candidate_feedback
  , COUNT (DISTINCT interview_meeting.id) AS interview_count
  , COUNT(*) filter(WHERE interview_session_relation.feedback->'recommendation' IS NOT NULL) AS interviewer_feedback_count
  , (AVG((interview_session_relation.feedback->'recommendation')::int)>6) = (applications.status = 'qualified') AS success
  , COUNT(interview_session_relation) AS interviewers_count
  FROM interview_session_relation 
    JOIN interview_session ON interview_session.id = interview_session_relation.session_id 
    JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
    JOIN applications on applications.id= interview_meeting.application_id
  WHERE interview_session_relation.is_confirmed
  AND interview_meeting.status ='completed'
  AND interview_session.module_id = per_module_interviewer_performance.module_id
  group by interview_meeting.application_id, candidate_feedback, applications.status
)
SELECT AVG(temp_res.candidate_feedback) AS candidate_feedback_avg
, SUM(temp_res.interview_count) AS total_interviews
, SUM(temp_res.interviewer_feedback_count) AS interviewer_feedback_count
, COUNT(*) FILTER (WHERE temp_res.success) AS recommendation_success
, SUM(temp_res.interviewers_count) AS interviewers_count 
FROM temp_res;
END;$function$
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

CREATE OR REPLACE FUNCTION public.reports_request_metrics(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(request_id uuid, interviewing_coordinator text, candidate_name text, recruiting_coord text, type text, availability_req boolean, self_scheduling_req boolean, confirmation boolean, availability_received boolean, availability_followup boolean, self_scheduling_followup boolean, candidate_status text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY select request.id as request_id
          , interview_coordinator_user.first_name ||' '|| interview_coordinator_user.last_name as interviewing_coordinator
          , candidates.first_name ||' '|| candidates.last_name as candidate_name
          , recruiting_coordinator_user.first_name ||' '|| recruiting_coordinator_user.last_name as recruiting_coord
          , interview_module.name as type
          , bool_or(request_progress.event_type = 'REQ_CAND_AVAIL_EMAIL_LINK') as availability_req
          , bool_or(request_progress.event_type = 'SELF_SCHEDULE_LINK') as self_scheduling_req
          , bool_or(request_progress.event_type = 'CAND_CONFIRM_SLOT') as confirmation
          , bool_or(request_progress.event_type = 'CAND_AVAIL_REC') as availability_received
          , bool_or(request_progress.event_type = 'REQ_AVAIL_FIRST_FOLLOWUP') as availability_followup
          , bool_or(request_progress.event_type = 'SELF_SCHEDULE_FIRST_FOLLOWUP') as self_scheduling_followup
          -- , interview_meeting.start_time as interview_date
          -- , bool_or(interview_meeting.status = 'confirmed' ) as confirmation
          -- , bool_or(interview_meeting.status = 'completed') as completed
          , applications.status as candidate_status
        from request
          JOIN request_note on request_note.request_id = request.id
          JOIN applications ON applications.id = request.application_id
          JOIN candidates ON candidates.id = applications.candidate_id
          JOIN request_relation ON request_relation.request_id = request.id
          JOIN interview_session ON interview_session.id = request_relation.session_id
          -- left JOIN interview_meeting ON interview_meeting.id = request_relation.session_id
          JOIN interview_module ON interview_module.id = interview_session.module_id
          JOIN public_jobs ON public_jobs.id = applications.job_id
          JOIN request_progress ON request_progress.request_id = request.id
          LEFT JOIN recruiter_user AS interview_coordinator_user ON request.assignee_id = public_jobs.interview_coordinator
          LEFT JOIN recruiter_user AS recruiting_coordinator_user ON recruiting_coordinator_user.user_id = public_jobs.recruiting_coordinator
        where request_progress.event_type IN ('REQ_CAND_AVAIL_EMAIL_LINK','CAND_AVAIL_REC','SELF_SCHEDULE_LINK', 'CAND_CONFIRM_SLOT')
          AND public_jobs.recruiter_id = reports_request_metrics.recruiter_id
          AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
          AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
          AND (CARDINALITY(jobs) = 0 OR applications.job_id = ANY(jobs))
          AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
          AND applications.created_at <= end_datetime
        group by request.id , interviewing_coordinator , candidate_name, recruiting_coord , interview_module.name, applications.status;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.reset_auth_users_identities(user_email text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM auth.users
    where email=user_email;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.resync_calendar()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    rec_user RECORD;
    response text;
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    FOR rec_user IN
        SELECT user_id
        FROM public.recruiter_user
        where recruiter_user.is_calendar_connected = true
    LOOP

        -- Make the HTTP POST request
        response := (
            SELECT content
            FROM http_post(
                concat(host,'/api/google-calender/resync'),
                json_build_object('user_id', rec_user.user_id)::text,
                'application/json'
            )
        );
        
        RAISE NOTICE 'User ID: %, Response: %', rec_user.user_id, response;
        BEGIN
        EXCEPTION
            WHEN others THEN
                RAISE NOTICE 'Response is not valid JSON for User ID: %', rec_user.user_id;
        END;
    END LOOP;
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
           r.name as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           1 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
       JOIN recruiter r ON r.id = pj.recruiter_id
       WHERE ja.processing_status in ('failed') and pj.status='published'  and retry < 1 and pj.jd_json is not null 
       ORDER BY ja.created_at ASC
       LIMIT 25
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.run_workflow_action(action_id numeric)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    url_x text;
    headers_x jsonb;
    wa_record record;
BEGIN
    SELECT decrypted_secret 
    INTO url_x
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    
    url_x := concat(url_x, '/api/workflow-cron');

    headers_x := '{"Content-Type": "application/json"}'::jsonb;

    FOR wa_record IN
        SELECT w_a_l.*, w_a.payload
        FROM workflow_action_logs w_a_l
        JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
        WHERE w_a_l.id = action_id
    LOOP
        PERFORM net.http_post(
            url := url_x,
            headers := headers_x,
            body := json_build_object(
                'id', wa_record.id,
                'workflow_id', wa_record.workflow_id,
                'workflow_action_id', wa_record.workflow_action_id,
                'meta', wa_record.meta,
                'payload', wa_record.payload,
                'execution_time', wa_record.execute_at
            )::jsonb
        );

        UPDATE workflow_action_logs
        SET status = 'processing', tries = wa_record.tries + 1, started_at = NOW()
        WHERE id = wa_record.id;
    END LOOP;

    RETURN true;
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

CREATE OR REPLACE FUNCTION public.scheduling_analytics_completed_interviews(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type text DEFAULT 'month'::text)
 RETURNS TABLE(date date, count bigint)
 LANGUAGE plpgsql
AS $function$
DECLARE
  trunc_field text;
  interval_field text;
  series_field text;
  group_field text;
BEGIN
  trunc_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then 'month'
      when scheduling_analytics_completed_interviews.type = 'quarter' then 'week'
      else 'day'
    end
  );
  interval_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then '12 months'
      when scheduling_analytics_completed_interviews.type = 'quarter' then '12 weeks'
      else '30 days'
    end
  );
  series_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then '11 months'
      when scheduling_analytics_completed_interviews.type = 'quarter' then '11 weeks'
      else '29 days'
    end
  );
  group_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then '1 month'
      when scheduling_analytics_completed_interviews.type = 'quarter' then '1 week'
      else '1 day'
    end
  );
   RETURN QUERY
    with
      interviews as (
        select
          interview_meeting.status,
          interview_meeting.end_time::date as end_time,
          applications.job_id,
          public_jobs.recruiter_id
        from
          interview_meeting
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_interviews as (
        select
          date_trunc(trunc_field, interviews.end_time)::date as end_time
        from
          interviews
        where
          interviews.recruiter_id = scheduling_analytics_completed_interviews.recruiter_id
          and interviews.status = 'completed'
          and date_trunc(trunc_field, interviews.end_time)::date <= date_trunc(trunc_field, now()::date)::date
          and date_trunc(trunc_field, interviews.end_time)::date >= date_trunc(trunc_field, now()::date)::date - (interval_field)::interval
          and interviews.job_id IN (
            SELECT
              *
            FROM
              get_filtered_job_ids (
                scheduling_analytics_completed_interviews.recruiter_id,
                scheduling_analytics_completed_interviews.departments,
                scheduling_analytics_completed_interviews.jobs
              )
          )
      ),
      valid_dates as (
        select
          filtered_interviews.end_time,
          count(*)
        from
          filtered_interviews
        group by
          filtered_interviews.end_time
      ),
      date_series as (
        select
          generate_series(
            (
              greatest(
                (
                  date_trunc(trunc_field, now()::date)::date - (series_field)::interval
                ),
                (
                  select
                    coalesce(
                      (
                        select
                          min(valid_dates.end_time)
                        from
                          valid_dates
                      ),
                      date_trunc(trunc_field, now()::date)::date
                    )
                )
              )
            )::date,
            date_trunc(trunc_field, now()::date)::date,
            (group_field)::interval
          ) as end_time
      )
    select
      (date_series.end_time)::date as date,
      coalesce(valid_dates.count, 0)::bigint as count
    from
      date_series
      left join valid_dates on valid_dates.end_time = date_series.end_time;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_decline_requests(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(completed_at date, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      requests as (
        select
          request.completed_at::date as date,
          request.type,
          applications.job_id,
          public_jobs.recruiter_id
        from
          request
          left join applications on applications.id = request.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_requests as (
        select
          date_trunc('month', requests.date)::date as date
        from
          requests
        where
          requests.recruiter_id = scheduling_analytics_decline_requests.recruiter_id
          and (
            requests.type = 'decline_request'
            or requests.type = 'cancel_schedule_request'
          )
          and requests.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_decline_requests.recruiter_id,
                  scheduling_analytics_decline_requests.departments,
                  scheduling_analytics_decline_requests.jobs
               )
            )
      ),
      valid_dates as (
          select
          filtered_requests.date,
          count(*)
        from
          filtered_requests
        group by
          filtered_requests.date
      ),
      date_series as (
        select
          generate_series(
            greatest(
              (
                date_trunc('month', now()::date)::date - '11 months'::interval
              )::date,
              (
                select
                  coalesce(
                    (
                      select
                        min(valid_dates.date)
                      from
                        valid_dates
                    ),
                    date_trunc('month', now())::date
                  )
              )
            )::date,
            date_trunc('month', now()::date)::date,
            '1 month'::interval
          ) as date
      )
    select
      (date_series.date)::date as date,
      coalesce(valid_dates.count, 0)::bigint as count
    from
      date_series
      left join valid_dates on valid_dates.date = date_series.date; 
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_filters(recruiter_id uuid)
 RETURNS TABLE(jobs jsonb[], departments jsonb[])
 LANGUAGE plpgsql
AS $function$
begin
  return query
  with
    jobs_cte as (
      select
        public_jobs.id,
        public_jobs.job_title
      from
        public_jobs
      where
        public_jobs.recruiter_id = scheduling_analytics_filters.recruiter_id
        and public_jobs.id is not null
        and public_jobs.job_title is not null
    ),
    departments_cte as (
      select
        departments.id,
        departments.name
      from
        departments
      where
        departments.recruiter_id = scheduling_analytics_filters.recruiter_id
        and departments.id is not null
        and departments.name is not null
    )
  select
    *
  from
    (
      select
        (
          array_agg(
            jsonb_build_object(
              'id',
              jobs_cte.id,
              'job_title',
              jobs_cte.job_title
            )
          )
        )::jsonb[] as jobs
      from
        jobs_cte
    ) as jobs
    cross join (
      select
        (
          array_agg(
            jsonb_build_object(
              'id',
              departments_cte.id,
              'name',
              departments_cte.name
            )
          )
        )::jsonb[] as departments
      from
        departments_cte
    ) as departments;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_interview_types(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(id uuid, name text, qualified bigint, training bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY 
    with
      modules as (
        select distinct
          interview_module.id,
          interview_module.name,
          interview_module.recruiter_id,
          public_jobs.id as job_id
        from
          interview_module
          left join interview_session on interview_session.module_id = interview_module.id
          left join interview_plan on interview_plan.id = interview_session.interview_plan_id
          left join public_jobs on public_jobs.id = interview_plan.job_id
      ),
      filtered_modules as (
        select distinct
          interview_module_relation.training_status,
          interview_module_relation.user_id,
          modules.id,
          modules.name
        from
          interview_module_relation
          left join modules on modules.id = interview_module_relation.module_id
        where
          interview_module_relation.is_archived = false
          and modules.recruiter_id = scheduling_analytics_interview_types.recruiter_id
          and modules.job_id IN (
            SELECT
              *
            FROM
              get_filtered_job_ids (
                scheduling_analytics_interview_types.recruiter_id,
                scheduling_analytics_interview_types.departments,
                scheduling_analytics_interview_types.jobs
              )
          )
      )
    select
      filtered_modules.id,
      filtered_modules.name,
      COUNT(*) FILTER (
        WHERE
          filtered_modules.training_status = 'qualified'
      ) as qualified,
      COUNT(*) FILTER (
        WHERE
          filtered_modules.training_status = 'training'
      ) as training
    from
      filtered_modules
    group by
      filtered_modules.id,
      filtered_modules.name
    order by
      qualified desc,
      training desc;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_interviewers(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type status_training DEFAULT 'qualified'::status_training)
 RETURNS TABLE(name text, user_id uuid, profile_image text, accepted bigint, declined bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      interviewers as (
          select
            interview_session_relation.accepted_status,
            interview_module_relation.training_status,
            interview_meeting.created_at::date as created_at,
            applications.job_id,
            public_jobs.recruiter_id,
            recruiter_user.user_id,
            (
              recruiter_user.first_name || ' ' || recruiter_user.last_name
            ) as name,
            recruiter_user.profile_image
          from
            interview_session_relation
            left join interview_module_relation on interview_module_relation.id = interview_session_relation.interview_module_relation_id
            left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
            left join interview_session on interview_session.id = interview_session_relation.session_id
            left join interview_meeting on interview_meeting.id = interview_session.meeting_id
            left join applications on applications.id = interview_meeting.application_id
            left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_interviewers as (
        select
          interviewers.user_id,
          interviewers.profile_image,
          interviewers.name,
          interviewers.accepted_status
        from
          interviewers
        where
          interviewers.recruiter_id = scheduling_analytics_interviewers.recruiter_id
          and interviewers.training_status = scheduling_analytics_interviewers.type
          and (
            interviewers.accepted_status = 'accepted'
            or interviewers.accepted_status = 'declined'
          )
          and interviewers.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_interviewers.recruiter_id,
                  scheduling_analytics_interviewers.departments,
                  scheduling_analytics_interviewers.jobs
               )
            )
      )
    select
      filtered_interviewers.name,
      filtered_interviewers.user_id,
      filtered_interviewers.profile_image,
      COUNT(*) FILTER (
        WHERE
          filtered_interviewers.accepted_status = 'accepted'
      ) as accepted,
      COUNT(*) FILTER (
        WHERE
          filtered_interviewers.accepted_status = 'declined'
      ) as declined
    from
      filtered_interviewers
    group by
      filtered_interviewers.name,
      filtered_interviewers.user_id,
      filtered_interviewers.profile_image;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_leaderboard(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type text DEFAULT 'all_time'::text)
 RETURNS TABLE(name text, "position" text, profile_image text, user_id uuid, duration numeric, interviews bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
   with
      sessions as (
        select
          interview_session.session_duration,
          interview_meeting.status,
          interview_meeting.end_time,
          recruiter_user.user_id,
          recruiter_user.profile_image,
          (
            recruiter_user.first_name || ' ' || recruiter_user.last_name
          ) as name,
          recruiter_user.position,
          applications.job_id,
          public_jobs.recruiter_id
        from
          interview_session_relation
          left join interview_module_relation on interview_module_relation.id = interview_module_relation.id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
          left join interview_session on interview_session.id = interview_session_relation.session_id
          left join interview_meeting on interview_meeting.id = interview_session.meeting_id
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_users as (
        select
          sessions.session_duration,
          sessions.name,
          sessions.position,
          sessions.profile_image,
          sessions.user_id
        from
          sessions
        where
          sessions.recruiter_id = scheduling_analytics_leaderboard.recruiter_id
          and sessions.status = 'completed'
          and sessions.end_time >= (
            case
              when scheduling_analytics_leaderboard.type = 'year' then (now() - '1 year'::interval)::date
              when scheduling_analytics_leaderboard.type = 'month' then (now() - '1 month'::interval)::date
              when scheduling_analytics_leaderboard.type = 'week' then (now() - '1 week'::interval)::date
              else '1900-01-01'::date
            end
          )
          and sessions.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_leaderboard.recruiter_id,
                  scheduling_analytics_leaderboard.departments,
                  scheduling_analytics_leaderboard.jobs
               )
            )
      )
    select
      filtered_users.name,
      filtered_users.position,
      filtered_users.profile_image,
      filtered_users.user_id,
      sum(filtered_users.session_duration) as duration,
      count(*) as interviews
    from
      filtered_users
    group by
      filtered_users.name,
      filtered_users.position,
      filtered_users.profile_image,
      filtered_users.user_id
    order by
      duration desc,
      interviews desc;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_reasons(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type cancel_type DEFAULT 'declined'::cancel_type)
 RETURNS TABLE(reason text, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      cancellations as (
        select
          interview_session_cancel.reason,
          interview_session_cancel.type,
          applications.job_id,
          public_jobs.recruiter_id
        from
          interview_session_cancel
          left join interview_session on interview_session.id = interview_session_cancel.session_id
          left join interview_meeting on interview_meeting.id = interview_session.meeting_id
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_cancellation as (
        select
          cancellations.reason
        from
          cancellations
        where
          cancellations.recruiter_id = scheduling_analytics_reasons.recruiter_id
          and cancellations.type = scheduling_analytics_reasons.type
          and cancellations.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_reasons.recruiter_id,
                  scheduling_analytics_reasons.departments,
                  scheduling_analytics_reasons.jobs
               )
            )
      )
    select
      filtered_cancellation.reason,
      count(*)
    from
      filtered_cancellation
    where
      filtered_cancellation.reason is not null
    group by
      filtered_cancellation.reason;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_recent_decline_reschedule(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(profile_image text, name text, note text, id uuid, type cancel_type)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY   
    with
      requests as (
        select
          interview_session_cancel.created_at::date as created_at,
          interview_session_cancel.id,
          interview_session_cancel.type,
          interview_session_cancel.other_details ->> 'note' as note,
          applications.job_id,
          public_jobs.recruiter_id,
          recruiter_user.profile_image,
          (
            recruiter_user.first_name || ' ' || recruiter_user.last_name
          ) as name
        from
          interview_session_cancel
          left join interview_session_relation on interview_session_relation.id = interview_session_cancel.session_relation_id
          left join interview_module_relation on interview_module_relation.id = interview_session_relation.interview_module_relation_id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
          left join interview_session on interview_session.id = interview_session_relation.session_id
          left join interview_meeting on interview_meeting.id = interview_session.meeting_id
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_requests as (
        select
          requests.profile_image,
          requests.name,
          requests.note,
          requests.id,
          requests.type
        from
          requests
        where
          requests.recruiter_id = scheduling_analytics_recent_decline_reschedule.recruiter_id
          and requests.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_recent_decline_reschedule.recruiter_id,
                  scheduling_analytics_recent_decline_reschedule.departments,
                  scheduling_analytics_recent_decline_reschedule.jobs
               )
            )
        order by 
          requests.created_at
      )
    select
      *
    from
      filtered_requests;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_tabs(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(cancelled bigint, waiting bigint, completed bigint, confirmed bigint, not_scheduled bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
      with
      meetings as (
         select
            interview_meeting.status,
            applications.job_id,
            public_jobs.recruiter_id
         from
            interview_meeting
            left join applications on applications.id = interview_meeting.application_id
            left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_meetings as (
         select
            meetings.status
         from
            meetings
         where
            meetings.recruiter_id = scheduling_analytics_tabs.recruiter_id
            and meetings.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_tabs.recruiter_id,
                  scheduling_analytics_tabs.departments,
                  scheduling_analytics_tabs.jobs
               )
            )
      )
      select
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'cancelled'
      ) as cancelled,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'waiting'
      ) as waiting,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'completed'
      ) as completed,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'confirmed'
      ) as confirmed,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'not_scheduled'
      ) as not_scheduled
      from
      filtered_meetings;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_training_progress(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], locations numeric[] DEFAULT ARRAY[]::numeric[])
 RETURNS TABLE(number_of_shadow bigint, noshadow numeric, number_of_reverse_shadow bigint, noreverseshadow numeric, user_id uuid, name text, "position" text)
 LANGUAGE plpgsql
AS $function$
DECLARE
  locations_length numeric;
BEGIN
  locations_length := coalesce(
    array_length(scheduling_analytics_training_progress.locations, 1),
    0
  );
   RETURN QUERY
    with
      modules as (
        select distinct
          interview_module.id,
          interview_module.name,
          interview_module.recruiter_id,
          interview_module.settings,
          public_jobs.id as job_id
        from
          interview_module
          left join interview_session on interview_session.module_id = interview_module.id
          left join interview_plan on interview_plan.id = interview_session.interview_plan_id
          left join public_jobs on public_jobs.id = interview_plan.id
      ),
      filtered_module_members as (
        select
          interview_module_relation.number_of_shadow,
          (modules.settings ->> 'noShadow')::numeric as noShadow,
          interview_module_relation.number_of_reverse_shadow,
          (modules.settings ->> 'noReverseShadow')::numeric as noReverseShadow,
          recruiter_user.user_id,
          modules.name,
          recruiter_user.position
        from
          interview_module_relation
          left join modules on modules.id = interview_module_relation.module_id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
        where
          modules.recruiter_id = scheduling_analytics_training_progress.recruiter_id
          and modules.job_id IN (
            SELECT
              *
            FROM
              get_filtered_job_ids (
                scheduling_analytics_training_progress.recruiter_id,
                scheduling_analytics_training_progress.departments,
                scheduling_analytics_training_progress.jobs
              )
          )
          and recruiter_user.office_location_id IN (
            SELECT
              office_locations.id
            FROM
              office_locations
            WHERE
              office_locations.recruiter_id = scheduling_analytics_training_progress.recruiter_id
              AND (
                locations_length = 0
                OR office_locations.id = ANY (scheduling_analytics_training_progress.locations)
              )
          )
      )
    select
      *
    from
      filtered_module_members
    order by
      number_of_shadow desc,
      noShadow desc,
      number_of_reverse_shadow desc,
      noReverseShadow desc;
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
           r.name as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           2 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
              JOIN recruiter r ON r.id = pj.recruiter_id
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

CREATE OR REPLACE FUNCTION public.swap_stage_order(plan_id_1 uuid, plan_id_2 uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  job_id_1 uuid;
  plan_order_1 numeric;
  job_id_2 uuid;
  plan_order_2 numeric;
BEGIN
  SELECT job_id, plan_order INTO job_id_1, plan_order_1
  FROM interview_plan
  WHERE id = plan_id_1;

  SELECT job_id, plan_order INTO job_id_2, plan_order_2
  FROM interview_plan
  WHERE id = plan_id_2;

  IF job_id_1 = job_id_2 THEN
    UPDATE interview_plan
    SET plan_order = plan_order_2
    WHERE id = plan_id_1;
    UPDATE interview_plan
    SET plan_order = plan_order_1
    WHERE id = plan_id_2;
  END IF;
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

CREATE OR REPLACE FUNCTION public.transfer_user_responsibilities(suspended_user uuid, task_owner uuid DEFAULT NULL::uuid, hiring_manager uuid DEFAULT NULL::uuid, recruiter uuid DEFAULT NULL::uuid, recruiting_coordinator uuid DEFAULT NULL::uuid, sourcer uuid DEFAULT NULL::uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  IF(transfer_user_responsibilities.hiring_manager IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      hiring_manager = transfer_user_responsibilities.hiring_manager
    WHERE 
      public_jobs.hiring_manager = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.recruiter IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      recruiter = transfer_user_responsibilities.recruiter
    WHERE 
      public_jobs.recruiter = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.recruiting_coordinator IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      recruiting_coordinator = transfer_user_responsibilities.recruiting_coordinator
    WHERE 
      public_jobs.recruiting_coordinator = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.sourcer IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      sourcer = transfer_user_responsibilities.sourcer
    WHERE 
      public_jobs.sourcer = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.task_owner IS NOT NULL) THEN
    UPDATE
      new_tasks
    SET
      assignee = new_assignees.assignee
    FROM
      (
        SELECT
          id,
          ARRAY(SELECT DISTINCT UNNEST(ARRAY_REPLACE(assignee, transfer_user_responsibilities.suspended_user, transfer_user_responsibilities.task_owner))) as assignee
        FROM
          new_tasks
        WHERE
          transfer_user_responsibilities.suspended_user = ANY(assignee)
      ) AS new_assignees
    WHERE
      new_tasks.id = new_assignees.id;
  END IF;
  UPDATE
    recruiter_user
  SET
    status = 'suspended'
  WHERE
    recruiter_user.user_id = transfer_user_responsibilities.suspended_user;
  RETURN;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_disqualification()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  UPDATE interview_meeting
  SET status = 'cancelled'
  WHERE id IN (
    SELECT interview_meeting.id
    FROM interview_meeting 
    WHERE interview_meeting.application_id = NEW.id
      AND interview_meeting.status NOT IN ('cancelled', 'completed', 'not_scheduled')
  );
  RETURN NEW;
END;$function$
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
BEGIN
  SELECT INTO score 
    score_application(applications.score_json -> 'scores', public_jobs.parameter_weights)
  FROM
    applications
  INNER JOIN
    public_jobs ON
      public_jobs.id = applications.job_id
  WHERE
    applications.id = NEW.id;
  IF score IS NOT NULL AND score >= 0 THEN
    INSERT INTO 
      application_logs (application_id, logged_by, module, title)
    VALUES
      (
        NEW.id,
        'system',
        'jobs',
        'Application was scored ' || score || '% by AglintAI'
      );
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log2()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  WITH scores AS (
    SELECT
      applications.id as application_id,
      score_application(applications.score_json -> 'scores', NEW.parameter_weights) as new_score,
      score_application(applications.score_json -> 'scores', OLD.parameter_weights) as old_score
    FROM
      applications
    WHERE
      applications.job_id = NEW.id
  )
  INSERT INTO 
    application_logs (application_id, logged_by, module, title)
  SELECT
    scores.application_id,
    'system',
    'jobs',
    'Application was scored ' || scores.new_score || '% due to updated score weights'
  FROM
    scores
  WHERE
    scores.new_score <> scores.old_score AND
    scores.new_score IS NOT NULL AND
    scores.new_score >= 0;
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

CREATE OR REPLACE FUNCTION public.trigger_candidate_portal()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  IF NEW.status = 'interview' THEN
   
   INSERT INTO "interview_progress" (application_id, name, is_completed, "order", update_at, icon, description)
      SELECT NEW.id, name, is_completed, "order", NOW(), icon, description
      FROM interview_progress
      WHERE job_id = NEW.job_id;
    
  END IF;
  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.trigger_clone_interview_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    company_id uuid;
    session_rec record;
    sesn_reln_record record;
    inserted_sesn_id uuid;
    inserted_meet_id uuid;
    inserted_plan_id uuid;
    int_plan_loop record;
BEGIN
  
    -- Loop through each interview plan related to the job
    FOR int_plan_loop IN 
        SELECT 
            interview_plan.id AS plan_id,
            interview_plan.name,
            interview_plan.plan_order
        FROM interview_plan 
        WHERE interview_plan.job_id = NEW.job_id
    LOOP
        -- Insert into interview_plan and get the inserted plan_id
        INSERT INTO interview_plan (name, plan_order, recruiter_id, application_id)
        VALUES (int_plan_loop.name, int_plan_loop.plan_order, NEW.recruiter_id, NEW.id)
        RETURNING id INTO inserted_plan_id;

        FOR session_rec IN
            SELECT 
                interview_session.id AS id,
                interview_session.break_duration,
                interview_session.interviewer_cnt,
                interview_session.location,
                interview_session.module_id,
                interview_session.name,
                interview_session.schedule_type,
                interview_session.session_duration,
                interview_session.session_order,
                interview_session.session_type,
                interview_session.recruiter_id
            FROM interview_session
            WHERE interview_session.interview_plan_id = int_plan_loop.plan_id
        LOOP
            -- Insert interview meeting and session within a single SQL command using CTEs
            WITH inserted_meeting_cte AS (
                INSERT INTO interview_meeting ( status, application_id, recruiter_id, job_id)
                VALUES ( 'not_scheduled', NEW.id, NEW.recruiter_id, NEW.job_id)
                RETURNING id
            ),
            inserted_session_cte AS (
                INSERT INTO interview_session (
                    break_duration,
                    interviewer_cnt,
                    location,
                    module_id,
                    name,
                    schedule_type,
                    session_duration,
                    session_order,
                    session_type,
                    parent_session_id,
                    meeting_id,
                    interview_plan_id,
                    recruiter_id
                )
                VALUES (
                    session_rec.break_duration,
                    session_rec.interviewer_cnt,
                    session_rec.location,
                    session_rec.module_id,
                    session_rec.name,
                    session_rec.schedule_type,
                    session_rec.session_duration,
                    session_rec.session_order,
                    session_rec.session_type,
                    session_rec.id,
                    (SELECT id FROM inserted_meeting_cte),
                    inserted_plan_id,
                    session_rec.recruiter_id
                )
                RETURNING id
            )
            SELECT 
                (SELECT id FROM inserted_meeting_cte),
                (SELECT id FROM inserted_session_cte)
            INTO inserted_meet_id, inserted_sesn_id;

            -- Insert relations for the session
            FOR sesn_reln_record IN 
            (
                SELECT 
                    interview_session_relation.interview_module_relation_id,
                    interview_session_relation.interviewer_type,
                    interview_session_relation.user_id,
                    interview_session_relation.training_type
                FROM interview_session_relation 
                WHERE interview_session_relation.session_id = session_rec.id
            )
            LOOP
                INSERT INTO interview_session_relation(
                    interview_module_relation_id,
                    interviewer_type,
                    user_id,
                    training_type,
                    session_id
                ) 
                VALUES (
                    sesn_reln_record.interview_module_relation_id,
                    sesn_reln_record.interviewer_type,
                    sesn_reln_record.user_id,
                    sesn_reln_record.training_type,
                    inserted_sesn_id
                );
            END LOOP;
        END LOOP;
    END LOOP;

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

CREATE OR REPLACE FUNCTION public.trigger_interview_session_count_invalidation()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  WITH interview_session_info AS (
    SELECT DISTINCT
      interview_session.id,
      interview_session.interviewer_cnt,
      count(interview_session_relation.id) OVER (PARTITION BY interview_session.id) AS session_count
    FROM
      interview_session
    LEFT JOIN
      interview_session_relation ON
      interview_session_relation.session_id = interview_session.id
    WHERE
      interview_session.id = OLD.session_id
  ), invalid_session AS (
    SELECT
      *
    FROM
      interview_session_info
    WHERE
      interview_session_info.interviewer_cnt > interview_session_info.session_count
  )
  UPDATE interview_session
  SET 
    interviewer_cnt = CASE 
                        WHEN invalid_session.interviewer_cnt = 0 THEN 0
                        ELSE invalid_session.session_count
                      END
  FROM 
    invalid_session
  WHERE 
    interview_session.id = invalid_session.id;
  RETURN OLD;
END;
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

CREATE OR REPLACE FUNCTION public.trigger_interview_stage_delete()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  WITH ordered_stages AS (
    select
      interview_plan.id,
      row_number() over(order by interview_plan.plan_order, interview_plan.name, interview_plan.id) as plan_order
    from
      interview_plan
    where
      interview_plan.job_id = OLD.job_id
  )
  UPDATE interview_plan
  SET plan_order = ordered_stages.plan_order
  FROM ordered_stages
  WHERE interview_plan.id = ordered_stages.id;
  RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_module_relation_archive()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  DELETE FROM 
    interview_session_relation
  USING (
    SELECT
    interview_session_relation.id
  FROM
    interview_session_relation
  LEFT JOIN
    interview_session ON
      interview_session_relation.session_id = interview_session.id
  LEFT JOIN
    interview_meeting ON
      interview_meeting.id = interview_session.meeting_id
  WHERE
    interview_session_relation.interview_module_relation_id = NEW.id AND
    (
      interview_session.interview_plan_id IS NOT NULL OR
      interview_meeting.status = 'not_scheduled' OR
      interview_meeting.status = 'cancelled'
    )
  ) AS session_relations
  WHERE
    interview_session_relation.id = session_relations.id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_recruiter_user_suspension()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE 
    interview_module_relation
  SET 
    is_archived = true
  WHERE 
    interview_module_relation.user_id = NEW.user_id;
  DELETE FROM 
    interview_session_relation
  WHERE
    interview_session_relation.user_id = NEW.user_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_completion()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET completed_at = (
    CASE 
      WHEN NEW.status = 'completed' THEN now()
      ELSE null
    END
  )
  WHERE id = NEW.id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_delete()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = OLD.request_id;
  RETURN OLD;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_insert()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF (to_jsonb(OLD.*) - 'updated_at') <> (to_jsonb(NEW.*) - 'updated_at') THEN
    NEW.updated_at = now();
    RETURN NEW;
  ELSE
    RETURN NULL;
  END IF;
END;
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

CREATE OR REPLACE FUNCTION public.trigger_set_request_to_new()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE request 
    SET is_new = true
    WHERE request.id = NEW.id;
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

CREATE OR REPLACE FUNCTION public.update_debrief_session(session_id uuid, session_duration integer, break_duration integer, location text, schedule_type interview_schedule_type, name text, members jsonb, members_meta jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
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
    UPDATE interview_session
    SET 
      session_duration = update_debrief_session.session_duration,
      break_duration = update_debrief_session.break_duration,
      location = update_debrief_session.location,
      schedule_type = update_debrief_session.schedule_type,
      name = update_debrief_session.name,
      members_meta = update_debrief_session.members_meta
    WHERE interview_session.id = update_debrief_session.session_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_interview_session(session_id uuid, module_id uuid, session_duration integer, break_duration integer, interviewer_cnt integer, session_type session_type, location text, schedule_type interview_schedule_type, name text, interview_module_relation_entries jsonb, interview_plan_id uuid, session_order integer)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM interview_session_relation WHERE interview_session_relation.session_id = update_interview_session.session_id;
    INSERT INTO interview_session_relation (interview_module_relation_id, session_id, interviewer_type, training_type)
    SELECT 
        (entry->>'id')::uuid AS interview_module_relation_id,
        update_interview_session.session_id AS session_id,
        (entry->>'interviewer_type')::status_training AS interviewer_type,
        (entry->>'training_type')::interviewer_type AS training_type
    FROM 
        jsonb_array_elements(interview_module_relation_entries) AS entry;
    UPDATE interview_session
    SET  
      module_id = update_interview_session.module_id,
      session_duration = update_interview_session.session_duration,
      break_duration = update_interview_session.break_duration,
      interviewer_cnt = update_interview_session.interviewer_cnt,
      session_type = update_interview_session.session_type,
      location = update_interview_session.location,
      schedule_type = update_interview_session.schedule_type,
      name = update_interview_session.name,
      interview_plan_id = update_interview_session.interview_plan_id
    WHERE interview_session.id = update_interview_session.session_id;
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
    WHERE end_time < NOW() - INTERVAL '1 day' AND status <> 'completed' AND status <> 'cancelled';
END;$function$
;

CREATE OR REPLACE FUNCTION public.update_or_delete_filter_json(session_ids_to_remove uuid[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    record RECORD;
BEGIN
    FOR record IN SELECT id, session_ids FROM interview_filter_json
    LOOP
        -- Calculate the difference between current session IDs and those to be removed
        record.session_ids := array(SELECT unnest(record.session_ids) EXCEPT SELECT unnest(session_ids_to_remove));

        IF array_length(record.session_ids, 1) IS NULL THEN
            -- If no session IDs are left, delete the record
            DELETE FROM interview_filter_json WHERE id = record.id;
        ELSE
            -- Otherwise, update the record with the new array of session IDs
            UPDATE interview_filter_json SET session_ids = record.session_ids WHERE id = record.id;
        END IF;
    END LOOP;
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
    SELECT decrypted_secret 
    INTO  url_x
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    
    url_x := concat(url_x,'/api/workflow-cron' );

    headers_x := '{"Content-Type": "application/json"}'::jsonb;

    FOR wa_record IN
        SELECT json_build_object('id', w_a_l.id,'workflow_id', w_a_l.workflow_id, 'workflow_action_id', w_a_l.workflow_action_id, 'meta', w_a_l.meta, 'payload', w_a.payload, 'execution_time', w_a_l.execute_at ) AS body,
               w_a_l.id AS id,
               w_a_l.tries AS tries
        FROM workflow_action_logs w_a_l
        JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
        WHERE (w_a_l.status = 'not_started' AND w_a_l.execute_at < CURRENT_TIMESTAMP + INTERVAL '1 minute')
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
            AND c_e_t.type <> 'interviewStart_email_applicant' AND 
                c_e_t.type <> 'interviewStart_email_organizer' and 
                (w.trigger::text = 'interviewStart' or w.trigger::text = 'interviewerConfirmation' or w.trigger::text = 'interviewEnd' and (c_e_t.type='interviewEnd_email_interviewerForFeedback' or c_e_t.type='interviewEnd_slack_interviewerForFeedback'  ))
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

create or replace view "public"."workflow_view" as  WITH job_cte AS (
         SELECT workflow_job_relation.workflow_id,
            array_agg(json_build_object('id', workflow_job_relation.job_id, 'job_title', public_jobs.job_title, 'department', departments.name, 'location', row_to_json(office_locations.*), 'status', public_jobs.status)) AS jobs
           FROM (((workflow_job_relation
             LEFT JOIN public_jobs ON ((workflow_job_relation.job_id = public_jobs.id)))
             LEFT JOIN departments ON ((departments.id = public_jobs.department_id)))
             LEFT JOIN office_locations ON ((office_locations.id = public_jobs.location_id)))
          WHERE (public_jobs.status <> 'closed'::public_job_status)
          GROUP BY workflow_job_relation.workflow_id
        ), action_cte AS (
         SELECT workflow_action.workflow_id,
            COALESCE(array_agg(DISTINCT
                CASE
                    WHEN ((workflow_action.action_type = 'end_point'::text) OR (workflow_action.action_type = 'agent_instruction'::text)) THEN 'system'::text
                    ELSE workflow_action.action_type
                END), ARRAY[]::text[]) AS tags
           FROM workflow_action
          GROUP BY workflow_action.workflow_id
        )
 SELECT workflow.id,
    workflow.created_at,
    workflow.trigger,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.auto_connect,
    workflow.description,
    COALESCE(job_cte.jobs, ARRAY[]::json[]) AS jobs,
    workflow.workflow_type,
    workflow.is_paused,
    array_append(action_cte.tags, (workflow.trigger)::text) AS tags,
    workflow.request_id
   FROM ((workflow
     LEFT JOIN job_cte ON ((job_cte.workflow_id = workflow.id)))
     LEFT JOIN action_cte ON ((action_cte.workflow_id = workflow.id)));


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
                CASE
                    WHEN (processing_state_cte.resume_processing_state = 'fetching'::resume_processing_state) THEN 'fetching'::resume_processing_state
                    WHEN (processing_state_cte.resume_processing_state = 'unavailable'::resume_processing_state) THEN 'unavailable'::resume_processing_state
                    WHEN COALESCE((recruiter_preferences.scoring <> true), true) THEN 'unscorable'::resume_processing_state
                    ELSE processing_state_cte.resume_processing_state
                END AS resume_processing_state,
                CASE
                    WHEN (processing_state_cte.resume_processing_state = 'fetching'::resume_processing_state) THEN ('-2'::integer)::numeric
                    WHEN (processing_state_cte.resume_processing_state = 'unparsable'::resume_processing_state) THEN ('-3'::integer)::numeric
                    WHEN (processing_state_cte.resume_processing_state = 'unavailable'::resume_processing_state) THEN ('-4'::integer)::numeric
                    WHEN COALESCE((recruiter_preferences.scoring <> true), true) THEN ('-5'::integer)::numeric
                    WHEN ((processing_state_cte.resume_processing_state = 'processed'::resume_processing_state) AND (public_jobs.parameter_weights IS NOT NULL)) THEN ( SELECT score_application(processing_state_cte.scores, public_jobs.parameter_weights) AS score_application)
                    ELSE ('-1'::integer)::numeric
                END AS resume_score
           FROM ((processing_state_cte
             LEFT JOIN public_jobs ON ((public_jobs.id = processing_state_cte.job_id)))
             LEFT JOIN recruiter_preferences ON ((public_jobs.recruiter_id = recruiter_preferences.recruiter_id)))
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
            candidates.current_job_title,
            candidates.timezone
           FROM (application_status_view
             LEFT JOIN candidates ON ((candidates.id = application_status_view.candidate_id)))
        ), meetings_cte AS (
         SELECT interview_meeting.application_id,
            interview_plan.id,
            interview_plan.plan_order,
            interview_plan.name,
            interview_meeting.status,
            interview_session.name AS session_name
           FROM ((interview_session
             JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
             JOIN interview_plan ON ((interview_plan.id = interview_session.interview_plan_id)))
        ), applications_all_meeting_cte AS (
         SELECT application_candidate_cte_1.id AS application_id,
            COALESCE(array_agg(meetings_cte.session_name) FILTER (WHERE (meetings_cte.session_name IS NOT NULL)), ARRAY[]::text[]) AS session_names
           FROM (application_candidate_cte application_candidate_cte_1
             LEFT JOIN meetings_cte ON ((meetings_cte.application_id = application_candidate_cte_1.id)))
          GROUP BY application_candidate_cte_1.id
        ), application_meeting_cte AS (
         SELECT meetings_cte.application_id,
            meetings_cte.id,
            meetings_cte.plan_order,
            meetings_cte.name,
            json_build_object('not_scheduled', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'not_scheduled'::interview_schedule_status)), 'confirmed', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'confirmed'::interview_schedule_status)), 'completed', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'completed'::interview_schedule_status)), 'waiting', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'waiting'::interview_schedule_status)), 'cancelled', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'cancelled'::interview_schedule_status)), 'reschedule', count(meetings_cte.status) FILTER (WHERE (meetings_cte.status = 'reschedule'::interview_schedule_status))) AS status
           FROM meetings_cte
          GROUP BY meetings_cte.application_id, meetings_cte.id, meetings_cte.plan_order, meetings_cte.name
        ), application_plan_cte AS (
         SELECT application_meeting_cte.application_id AS id,
            array_agg(json_build_object('id', application_meeting_cte.id, 'plan_order', application_meeting_cte.plan_order, 'name', application_meeting_cte.name, 'status', application_meeting_cte.status) ORDER BY application_meeting_cte.plan_order) AS interview_plans
           FROM application_meeting_cte
          GROUP BY application_meeting_cte.application_id
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
    application_task_cte.task_count,
    application_logs_cte.activity_count,
    application_latest_activity_cte.latest_activity,
    application_candidate_cte.application_match,
    application_candidate_cte.candidate_id,
    application_candidate_cte.timezone,
    applications_all_meeting_cte.session_names,
    COALESCE(application_plan_cte.interview_plans, ARRAY[]::json[]) AS interview_plans
   FROM (((((application_candidate_cte
     LEFT JOIN application_plan_cte ON ((application_plan_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_task_cte ON ((application_task_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_logs_cte ON ((application_logs_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_latest_activity_cte ON ((application_latest_activity_cte.application_id = application_candidate_cte.id)))
     LEFT JOIN applications_all_meeting_cte ON ((applications_all_meeting_cte.application_id = application_candidate_cte.id)));


create or replace view "public"."job_view" as  WITH application_status_view_cte AS (
         SELECT application_status_view.status,
            application_status_view.job_id,
            application_status_view.resume_processing_state,
            application_status_view.application_match
           FROM application_status_view
        ), job_cte AS (
         SELECT public_jobs.created_at,
            public_jobs.department_id,
            departments.name AS department,
            public_jobs.description,
            public_jobs.draft,
            public_jobs.id,
            public_jobs.jd_json,
            public_jobs.job_title,
            public_jobs.job_type,
            public_jobs.location_id,
            row_to_json(office_locations.*) AS location,
            public_jobs.parameter_weights,
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
            public_jobs.interview_session_warning_ignore,
            public_jobs.remote_sync_time,
            public_jobs.is_pinned
           FROM ((public_jobs
             LEFT JOIN departments ON ((departments.id = public_jobs.department_id)))
             LEFT JOIN office_locations ON ((office_locations.id = public_jobs.location_id)))
        ), status_count_default_cte AS (
         SELECT job_cte_1.id,
            defaults.status
           FROM (( SELECT 'new'::text AS status
                UNION
                 SELECT 'interview'::text AS status
                UNION
                 SELECT 'qualified'::text AS status
                UNION
                 SELECT 'disqualified'::text AS status) defaults
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
                 SELECT 'unparsable'::resume_processing_state AS resume_processing_state
                UNION
                 SELECT 'unscorable'::resume_processing_state AS resume_processing_state) defaults
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
        )
 SELECT job_cte.created_at,
    job_cte.department_id,
    job_cte.department,
    job_cte.description,
    job_cte.draft,
    job_cte.id,
    job_cte.jd_json,
    job_cte.job_title,
    job_cte.job_type,
    job_cte.location_id,
    job_cte.location,
    job_cte.parameter_weights,
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
    job_cte.remote_sync_time,
    job_section_count_cte.section_count,
    job_processing_count_cte.processing_count,
    job_application_match_cte.application_match,
    job_cte.is_pinned
   FROM (((job_cte
     LEFT JOIN job_section_count_cte ON ((job_section_count_cte.id = job_cte.id)))
     LEFT JOIN job_processing_count_cte ON ((job_processing_count_cte.id = job_cte.id)))
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

grant delete on table "public"."candidate_portal_job" to "anon";

grant insert on table "public"."candidate_portal_job" to "anon";

grant references on table "public"."candidate_portal_job" to "anon";

grant select on table "public"."candidate_portal_job" to "anon";

grant trigger on table "public"."candidate_portal_job" to "anon";

grant truncate on table "public"."candidate_portal_job" to "anon";

grant update on table "public"."candidate_portal_job" to "anon";

grant delete on table "public"."candidate_portal_job" to "authenticated";

grant insert on table "public"."candidate_portal_job" to "authenticated";

grant references on table "public"."candidate_portal_job" to "authenticated";

grant select on table "public"."candidate_portal_job" to "authenticated";

grant trigger on table "public"."candidate_portal_job" to "authenticated";

grant truncate on table "public"."candidate_portal_job" to "authenticated";

grant update on table "public"."candidate_portal_job" to "authenticated";

grant delete on table "public"."candidate_portal_job" to "service_role";

grant insert on table "public"."candidate_portal_job" to "service_role";

grant references on table "public"."candidate_portal_job" to "service_role";

grant select on table "public"."candidate_portal_job" to "service_role";

grant trigger on table "public"."candidate_portal_job" to "service_role";

grant truncate on table "public"."candidate_portal_job" to "service_role";

grant update on table "public"."candidate_portal_job" to "service_role";

grant delete on table "public"."candidate_portal_message" to "anon";

grant insert on table "public"."candidate_portal_message" to "anon";

grant references on table "public"."candidate_portal_message" to "anon";

grant select on table "public"."candidate_portal_message" to "anon";

grant trigger on table "public"."candidate_portal_message" to "anon";

grant truncate on table "public"."candidate_portal_message" to "anon";

grant update on table "public"."candidate_portal_message" to "anon";

grant delete on table "public"."candidate_portal_message" to "authenticated";

grant insert on table "public"."candidate_portal_message" to "authenticated";

grant references on table "public"."candidate_portal_message" to "authenticated";

grant select on table "public"."candidate_portal_message" to "authenticated";

grant trigger on table "public"."candidate_portal_message" to "authenticated";

grant truncate on table "public"."candidate_portal_message" to "authenticated";

grant update on table "public"."candidate_portal_message" to "authenticated";

grant delete on table "public"."candidate_portal_message" to "service_role";

grant insert on table "public"."candidate_portal_message" to "service_role";

grant references on table "public"."candidate_portal_message" to "service_role";

grant select on table "public"."candidate_portal_message" to "service_role";

grant trigger on table "public"."candidate_portal_message" to "service_role";

grant truncate on table "public"."candidate_portal_message" to "service_role";

grant update on table "public"."candidate_portal_message" to "service_role";

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

grant delete on table "public"."departments" to "anon";

grant insert on table "public"."departments" to "anon";

grant references on table "public"."departments" to "anon";

grant select on table "public"."departments" to "anon";

grant trigger on table "public"."departments" to "anon";

grant truncate on table "public"."departments" to "anon";

grant update on table "public"."departments" to "anon";

grant delete on table "public"."departments" to "authenticated";

grant insert on table "public"."departments" to "authenticated";

grant references on table "public"."departments" to "authenticated";

grant select on table "public"."departments" to "authenticated";

grant trigger on table "public"."departments" to "authenticated";

grant truncate on table "public"."departments" to "authenticated";

grant update on table "public"."departments" to "authenticated";

grant delete on table "public"."departments" to "service_role";

grant insert on table "public"."departments" to "service_role";

grant references on table "public"."departments" to "service_role";

grant select on table "public"."departments" to "service_role";

grant trigger on table "public"."departments" to "service_role";

grant truncate on table "public"."departments" to "service_role";

grant update on table "public"."departments" to "service_role";

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

grant delete on table "public"."interview_meeting_log" to "anon";

grant insert on table "public"."interview_meeting_log" to "anon";

grant references on table "public"."interview_meeting_log" to "anon";

grant select on table "public"."interview_meeting_log" to "anon";

grant trigger on table "public"."interview_meeting_log" to "anon";

grant truncate on table "public"."interview_meeting_log" to "anon";

grant update on table "public"."interview_meeting_log" to "anon";

grant delete on table "public"."interview_meeting_log" to "authenticated";

grant insert on table "public"."interview_meeting_log" to "authenticated";

grant references on table "public"."interview_meeting_log" to "authenticated";

grant select on table "public"."interview_meeting_log" to "authenticated";

grant trigger on table "public"."interview_meeting_log" to "authenticated";

grant truncate on table "public"."interview_meeting_log" to "authenticated";

grant update on table "public"."interview_meeting_log" to "authenticated";

grant delete on table "public"."interview_meeting_log" to "service_role";

grant insert on table "public"."interview_meeting_log" to "service_role";

grant references on table "public"."interview_meeting_log" to "service_role";

grant select on table "public"."interview_meeting_log" to "service_role";

grant trigger on table "public"."interview_meeting_log" to "service_role";

grant truncate on table "public"."interview_meeting_log" to "service_role";

grant update on table "public"."interview_meeting_log" to "service_role";

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

grant delete on table "public"."interview_module_approve_users" to "anon";

grant insert on table "public"."interview_module_approve_users" to "anon";

grant references on table "public"."interview_module_approve_users" to "anon";

grant select on table "public"."interview_module_approve_users" to "anon";

grant trigger on table "public"."interview_module_approve_users" to "anon";

grant truncate on table "public"."interview_module_approve_users" to "anon";

grant update on table "public"."interview_module_approve_users" to "anon";

grant delete on table "public"."interview_module_approve_users" to "authenticated";

grant insert on table "public"."interview_module_approve_users" to "authenticated";

grant references on table "public"."interview_module_approve_users" to "authenticated";

grant select on table "public"."interview_module_approve_users" to "authenticated";

grant trigger on table "public"."interview_module_approve_users" to "authenticated";

grant truncate on table "public"."interview_module_approve_users" to "authenticated";

grant update on table "public"."interview_module_approve_users" to "authenticated";

grant delete on table "public"."interview_module_approve_users" to "service_role";

grant insert on table "public"."interview_module_approve_users" to "service_role";

grant references on table "public"."interview_module_approve_users" to "service_role";

grant select on table "public"."interview_module_approve_users" to "service_role";

grant trigger on table "public"."interview_module_approve_users" to "service_role";

grant truncate on table "public"."interview_module_approve_users" to "service_role";

grant update on table "public"."interview_module_approve_users" to "service_role";

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

grant delete on table "public"."interview_progress" to "anon";

grant insert on table "public"."interview_progress" to "anon";

grant references on table "public"."interview_progress" to "anon";

grant select on table "public"."interview_progress" to "anon";

grant trigger on table "public"."interview_progress" to "anon";

grant truncate on table "public"."interview_progress" to "anon";

grant update on table "public"."interview_progress" to "anon";

grant delete on table "public"."interview_progress" to "authenticated";

grant insert on table "public"."interview_progress" to "authenticated";

grant references on table "public"."interview_progress" to "authenticated";

grant select on table "public"."interview_progress" to "authenticated";

grant trigger on table "public"."interview_progress" to "authenticated";

grant truncate on table "public"."interview_progress" to "authenticated";

grant update on table "public"."interview_progress" to "authenticated";

grant delete on table "public"."interview_progress" to "service_role";

grant insert on table "public"."interview_progress" to "service_role";

grant references on table "public"."interview_progress" to "service_role";

grant select on table "public"."interview_progress" to "service_role";

grant trigger on table "public"."interview_progress" to "service_role";

grant truncate on table "public"."interview_progress" to "service_role";

grant update on table "public"."interview_progress" to "service_role";

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

grant delete on table "public"."interview_training_progress" to "anon";

grant insert on table "public"."interview_training_progress" to "anon";

grant references on table "public"."interview_training_progress" to "anon";

grant select on table "public"."interview_training_progress" to "anon";

grant trigger on table "public"."interview_training_progress" to "anon";

grant truncate on table "public"."interview_training_progress" to "anon";

grant update on table "public"."interview_training_progress" to "anon";

grant delete on table "public"."interview_training_progress" to "authenticated";

grant insert on table "public"."interview_training_progress" to "authenticated";

grant references on table "public"."interview_training_progress" to "authenticated";

grant select on table "public"."interview_training_progress" to "authenticated";

grant trigger on table "public"."interview_training_progress" to "authenticated";

grant truncate on table "public"."interview_training_progress" to "authenticated";

grant update on table "public"."interview_training_progress" to "authenticated";

grant delete on table "public"."interview_training_progress" to "service_role";

grant insert on table "public"."interview_training_progress" to "service_role";

grant references on table "public"."interview_training_progress" to "service_role";

grant select on table "public"."interview_training_progress" to "service_role";

grant trigger on table "public"."interview_training_progress" to "service_role";

grant truncate on table "public"."interview_training_progress" to "service_role";

grant update on table "public"."interview_training_progress" to "service_role";

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

grant delete on table "public"."office_locations" to "anon";

grant insert on table "public"."office_locations" to "anon";

grant references on table "public"."office_locations" to "anon";

grant select on table "public"."office_locations" to "anon";

grant trigger on table "public"."office_locations" to "anon";

grant truncate on table "public"."office_locations" to "anon";

grant update on table "public"."office_locations" to "anon";

grant delete on table "public"."office_locations" to "authenticated";

grant insert on table "public"."office_locations" to "authenticated";

grant references on table "public"."office_locations" to "authenticated";

grant select on table "public"."office_locations" to "authenticated";

grant trigger on table "public"."office_locations" to "authenticated";

grant truncate on table "public"."office_locations" to "authenticated";

grant update on table "public"."office_locations" to "authenticated";

grant delete on table "public"."office_locations" to "service_role";

grant insert on table "public"."office_locations" to "service_role";

grant references on table "public"."office_locations" to "service_role";

grant select on table "public"."office_locations" to "service_role";

grant trigger on table "public"."office_locations" to "service_role";

grant truncate on table "public"."office_locations" to "service_role";

grant update on table "public"."office_locations" to "service_role";

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

grant delete on table "public"."permissions" to "supabase_auth_admin";

grant insert on table "public"."permissions" to "supabase_auth_admin";

grant references on table "public"."permissions" to "supabase_auth_admin";

grant select on table "public"."permissions" to "supabase_auth_admin";

grant trigger on table "public"."permissions" to "supabase_auth_admin";

grant truncate on table "public"."permissions" to "supabase_auth_admin";

grant update on table "public"."permissions" to "supabase_auth_admin";

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

grant delete on table "public"."recruiter_preferences" to "anon";

grant insert on table "public"."recruiter_preferences" to "anon";

grant references on table "public"."recruiter_preferences" to "anon";

grant select on table "public"."recruiter_preferences" to "anon";

grant trigger on table "public"."recruiter_preferences" to "anon";

grant truncate on table "public"."recruiter_preferences" to "anon";

grant update on table "public"."recruiter_preferences" to "anon";

grant delete on table "public"."recruiter_preferences" to "authenticated";

grant insert on table "public"."recruiter_preferences" to "authenticated";

grant references on table "public"."recruiter_preferences" to "authenticated";

grant select on table "public"."recruiter_preferences" to "authenticated";

grant trigger on table "public"."recruiter_preferences" to "authenticated";

grant truncate on table "public"."recruiter_preferences" to "authenticated";

grant update on table "public"."recruiter_preferences" to "authenticated";

grant delete on table "public"."recruiter_preferences" to "service_role";

grant insert on table "public"."recruiter_preferences" to "service_role";

grant references on table "public"."recruiter_preferences" to "service_role";

grant select on table "public"."recruiter_preferences" to "service_role";

grant trigger on table "public"."recruiter_preferences" to "service_role";

grant truncate on table "public"."recruiter_preferences" to "service_role";

grant update on table "public"."recruiter_preferences" to "service_role";

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

grant delete on table "public"."recruiter_relation" to "supabase_auth_admin";

grant insert on table "public"."recruiter_relation" to "supabase_auth_admin";

grant references on table "public"."recruiter_relation" to "supabase_auth_admin";

grant select on table "public"."recruiter_relation" to "supabase_auth_admin";

grant trigger on table "public"."recruiter_relation" to "supabase_auth_admin";

grant truncate on table "public"."recruiter_relation" to "supabase_auth_admin";

grant update on table "public"."recruiter_relation" to "supabase_auth_admin";

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

grant delete on table "public"."request" to "anon";

grant insert on table "public"."request" to "anon";

grant references on table "public"."request" to "anon";

grant select on table "public"."request" to "anon";

grant trigger on table "public"."request" to "anon";

grant truncate on table "public"."request" to "anon";

grant update on table "public"."request" to "anon";

grant delete on table "public"."request" to "authenticated";

grant insert on table "public"."request" to "authenticated";

grant references on table "public"."request" to "authenticated";

grant select on table "public"."request" to "authenticated";

grant trigger on table "public"."request" to "authenticated";

grant truncate on table "public"."request" to "authenticated";

grant update on table "public"."request" to "authenticated";

grant delete on table "public"."request" to "service_role";

grant insert on table "public"."request" to "service_role";

grant references on table "public"."request" to "service_role";

grant select on table "public"."request" to "service_role";

grant trigger on table "public"."request" to "service_role";

grant truncate on table "public"."request" to "service_role";

grant update on table "public"."request" to "service_role";

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

grant delete on table "public"."request_log" to "anon";

grant insert on table "public"."request_log" to "anon";

grant references on table "public"."request_log" to "anon";

grant select on table "public"."request_log" to "anon";

grant trigger on table "public"."request_log" to "anon";

grant truncate on table "public"."request_log" to "anon";

grant update on table "public"."request_log" to "anon";

grant delete on table "public"."request_log" to "authenticated";

grant insert on table "public"."request_log" to "authenticated";

grant references on table "public"."request_log" to "authenticated";

grant select on table "public"."request_log" to "authenticated";

grant trigger on table "public"."request_log" to "authenticated";

grant truncate on table "public"."request_log" to "authenticated";

grant update on table "public"."request_log" to "authenticated";

grant delete on table "public"."request_log" to "service_role";

grant insert on table "public"."request_log" to "service_role";

grant references on table "public"."request_log" to "service_role";

grant select on table "public"."request_log" to "service_role";

grant trigger on table "public"."request_log" to "service_role";

grant truncate on table "public"."request_log" to "service_role";

grant update on table "public"."request_log" to "service_role";

grant delete on table "public"."request_note" to "anon";

grant insert on table "public"."request_note" to "anon";

grant references on table "public"."request_note" to "anon";

grant select on table "public"."request_note" to "anon";

grant trigger on table "public"."request_note" to "anon";

grant truncate on table "public"."request_note" to "anon";

grant update on table "public"."request_note" to "anon";

grant delete on table "public"."request_note" to "authenticated";

grant insert on table "public"."request_note" to "authenticated";

grant references on table "public"."request_note" to "authenticated";

grant select on table "public"."request_note" to "authenticated";

grant trigger on table "public"."request_note" to "authenticated";

grant truncate on table "public"."request_note" to "authenticated";

grant update on table "public"."request_note" to "authenticated";

grant delete on table "public"."request_note" to "service_role";

grant insert on table "public"."request_note" to "service_role";

grant references on table "public"."request_note" to "service_role";

grant select on table "public"."request_note" to "service_role";

grant trigger on table "public"."request_note" to "service_role";

grant truncate on table "public"."request_note" to "service_role";

grant update on table "public"."request_note" to "service_role";

grant delete on table "public"."request_progress" to "anon";

grant insert on table "public"."request_progress" to "anon";

grant references on table "public"."request_progress" to "anon";

grant select on table "public"."request_progress" to "anon";

grant trigger on table "public"."request_progress" to "anon";

grant truncate on table "public"."request_progress" to "anon";

grant update on table "public"."request_progress" to "anon";

grant delete on table "public"."request_progress" to "authenticated";

grant insert on table "public"."request_progress" to "authenticated";

grant references on table "public"."request_progress" to "authenticated";

grant select on table "public"."request_progress" to "authenticated";

grant trigger on table "public"."request_progress" to "authenticated";

grant truncate on table "public"."request_progress" to "authenticated";

grant update on table "public"."request_progress" to "authenticated";

grant delete on table "public"."request_progress" to "service_role";

grant insert on table "public"."request_progress" to "service_role";

grant references on table "public"."request_progress" to "service_role";

grant select on table "public"."request_progress" to "service_role";

grant trigger on table "public"."request_progress" to "service_role";

grant truncate on table "public"."request_progress" to "service_role";

grant update on table "public"."request_progress" to "service_role";

grant delete on table "public"."request_relation" to "anon";

grant insert on table "public"."request_relation" to "anon";

grant references on table "public"."request_relation" to "anon";

grant select on table "public"."request_relation" to "anon";

grant trigger on table "public"."request_relation" to "anon";

grant truncate on table "public"."request_relation" to "anon";

grant update on table "public"."request_relation" to "anon";

grant delete on table "public"."request_relation" to "authenticated";

grant insert on table "public"."request_relation" to "authenticated";

grant references on table "public"."request_relation" to "authenticated";

grant select on table "public"."request_relation" to "authenticated";

grant trigger on table "public"."request_relation" to "authenticated";

grant truncate on table "public"."request_relation" to "authenticated";

grant update on table "public"."request_relation" to "authenticated";

grant delete on table "public"."request_relation" to "service_role";

grant insert on table "public"."request_relation" to "service_role";

grant references on table "public"."request_relation" to "service_role";

grant select on table "public"."request_relation" to "service_role";

grant trigger on table "public"."request_relation" to "service_role";

grant truncate on table "public"."request_relation" to "service_role";

grant update on table "public"."request_relation" to "service_role";

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

grant delete on table "public"."role_permissions" to "supabase_auth_admin";

grant insert on table "public"."role_permissions" to "supabase_auth_admin";

grant references on table "public"."role_permissions" to "supabase_auth_admin";

grant select on table "public"."role_permissions" to "supabase_auth_admin";

grant trigger on table "public"."role_permissions" to "supabase_auth_admin";

grant truncate on table "public"."role_permissions" to "supabase_auth_admin";

grant update on table "public"."role_permissions" to "supabase_auth_admin";

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

grant delete on table "public"."roles" to "supabase_auth_admin";

grant insert on table "public"."roles" to "supabase_auth_admin";

grant references on table "public"."roles" to "supabase_auth_admin";

grant select on table "public"."roles" to "supabase_auth_admin";

grant trigger on table "public"."roles" to "supabase_auth_admin";

grant truncate on table "public"."roles" to "supabase_auth_admin";

grant update on table "public"."roles" to "supabase_auth_admin";

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

grant delete on table "public"."tour" to "anon";

grant insert on table "public"."tour" to "anon";

grant references on table "public"."tour" to "anon";

grant select on table "public"."tour" to "anon";

grant trigger on table "public"."tour" to "anon";

grant truncate on table "public"."tour" to "anon";

grant update on table "public"."tour" to "anon";

grant delete on table "public"."tour" to "authenticated";

grant insert on table "public"."tour" to "authenticated";

grant references on table "public"."tour" to "authenticated";

grant select on table "public"."tour" to "authenticated";

grant trigger on table "public"."tour" to "authenticated";

grant truncate on table "public"."tour" to "authenticated";

grant update on table "public"."tour" to "authenticated";

grant delete on table "public"."tour" to "service_role";

grant insert on table "public"."tour" to "service_role";

grant references on table "public"."tour" to "service_role";

grant select on table "public"."tour" to "service_role";

grant trigger on table "public"."tour" to "service_role";

grant truncate on table "public"."tour" to "service_role";

grant update on table "public"."tour" to "service_role";

grant delete on table "public"."user_chat" to "anon";

grant insert on table "public"."user_chat" to "anon";

grant references on table "public"."user_chat" to "anon";

grant select on table "public"."user_chat" to "anon";

grant trigger on table "public"."user_chat" to "anon";

grant truncate on table "public"."user_chat" to "anon";

grant update on table "public"."user_chat" to "anon";

grant delete on table "public"."user_chat" to "authenticated";

grant insert on table "public"."user_chat" to "authenticated";

grant references on table "public"."user_chat" to "authenticated";

grant select on table "public"."user_chat" to "authenticated";

grant trigger on table "public"."user_chat" to "authenticated";

grant truncate on table "public"."user_chat" to "authenticated";

grant update on table "public"."user_chat" to "authenticated";

grant delete on table "public"."user_chat" to "service_role";

grant insert on table "public"."user_chat" to "service_role";

grant references on table "public"."user_chat" to "service_role";

grant select on table "public"."user_chat" to "service_role";

grant trigger on table "public"."user_chat" to "service_role";

grant truncate on table "public"."user_chat" to "service_role";

grant update on table "public"."user_chat" to "service_role";

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


create policy "Allow auth admin to read user roles"
on "public"."permissions"
as permissive
for select
to supabase_auth_admin
using (true);


create policy "Allow authenticated to read permissions"
on "public"."permissions"
as permissive
for select
to authenticated
using (true);


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


create policy "Allow auth admin to read user roles"
on "public"."recruiter_relation"
as permissive
for select
to supabase_auth_admin
using (true);


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
using (true)
with check ((user_id = ( SELECT auth.uid() AS uid)));


create policy "Allow anonymous access"
on "public"."request"
as permissive
for select
to anon
using (true);


create policy "Allow auth admin to read user roles"
on "public"."role_permissions"
as permissive
for select
to supabase_auth_admin
using (true);


create policy "Allow authenticated to read role_permissions"
on "public"."role_permissions"
as permissive
for select
to authenticated
using (true);


create policy "Allow auth admin to read user roles"
on "public"."roles"
as permissive
for select
to supabase_auth_admin
using (true);


create policy "Allow authenticated to read roles"
on "public"."roles"
as permissive
for select
to authenticated
using (true);


create policy "tour authenticated insert"
on "public"."tour"
as permissive
for insert
to authenticated
with check ((recruiter_relation_id IN ( SELECT recruiter_relation.id
   FROM recruiter_relation)));


create policy "tour authenticated read"
on "public"."tour"
as permissive
for select
to authenticated
using ((recruiter_relation_id IN ( SELECT recruiter_relation.id
   FROM recruiter_relation)));


create policy "tour authenticator delete"
on "public"."tour"
as permissive
for delete
to authenticator
using (true);


create policy "tour authenticator update"
on "public"."tour"
as permissive
for update
to authenticator
using (true);


CREATE TRIGGER application_disqualification AFTER UPDATE OF status ON public.applications FOR EACH ROW WHEN ((new.status = 'disqualified'::text)) EXECUTE FUNCTION trigger_application_disqualification();

CREATE TRIGGER application_import_log AFTER INSERT ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_application_import_log();

CREATE TRIGGER application_score_log AFTER UPDATE OF processing_status ON public.applications FOR EACH ROW WHEN (((new.processing_status = 'success'::application_processing_status) AND ((new.score_json -> 'scores'::text) IS NOT NULL))) EXECUTE FUNCTION trigger_application_score_log();

CREATE TRIGGER application_status_log AFTER UPDATE OF status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_application_status_log();

CREATE TRIGGER candidate_move_new_to_interview AFTER UPDATE OF status ON public.applications FOR EACH ROW WHEN (((old.status = 'new'::text) AND (new.status = 'interview'::text))) EXECUTE FUNCTION trigger_candidate_portal();

CREATE TRIGGER clone_interview_session AFTER UPDATE OF status ON public.applications FOR EACH ROW WHEN ((new.status = 'interview'::text)) EXECUTE FUNCTION trigger_clone_interview_session();

CREATE TRIGGER conversion_timestamp_trigger AFTER UPDATE OF status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_conversion_timestamp();

CREATE TRIGGER set_application_to_new AFTER INSERT ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_set_application_to_new();

CREATE TRIGGER set_processing_started_at AFTER UPDATE OF processing_status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_set_processing_started_at();

CREATE TRIGGER trigger_delete_interview_meetings AFTER UPDATE OF status ON public.applications FOR EACH ROW WHEN (((old.status = 'disqualified'::text) AND (new.status = 'new'::text))) EXECUTE FUNCTION delete_interview_meetings_on_status_update();

CREATE TRIGGER event_trigger_candidate_request_availability_delete AFTER DELETE ON public.candidate_request_availability FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_candidate_request_availability_insert AFTER INSERT ON public.candidate_request_availability FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_candidate_request_availability_update AFTER UPDATE ON public.candidate_request_availability FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_filter_json_delete AFTER DELETE ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_filter_json_insert AFTER INSERT ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_filter_json_update AFTER UPDATE ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_meeting_delete AFTER DELETE ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_meeting_insert AFTER INSERT ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_meeting_update AFTER UPDATE ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER track_interview_meeting_changes AFTER INSERT OR UPDATE OF status, start_time, end_time, organizer_id, meeting_flow ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION create_interview_meeting_log();

CREATE TRIGGER trigger_create_training_progress AFTER UPDATE OF status ON public.interview_meeting FOR EACH ROW WHEN (((old.status = 'confirmed'::interview_schedule_status) AND (new.status = 'completed'::interview_schedule_status))) EXECUTE FUNCTION create_training_progress();

CREATE TRIGGER event_trigger_interview_module_relation_update AFTER UPDATE ON public.interview_module_relation FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER module_relation_archive AFTER UPDATE OF is_archived ON public.interview_module_relation FOR EACH ROW WHEN ((new.is_archived = true)) EXECUTE FUNCTION trigger_module_relation_archive();

CREATE TRIGGER interview_plan_warning AFTER DELETE ON public.interview_plan FOR EACH ROW EXECUTE FUNCTION trigger_interview_plan_warning();

CREATE TRIGGER interview_stage_delete AFTER DELETE ON public.interview_plan FOR EACH ROW EXECUTE FUNCTION trigger_interview_stage_delete();

CREATE TRIGGER interview_session_warning AFTER DELETE ON public.interview_session FOR EACH ROW EXECUTE FUNCTION trigger_interview_session_warning();

CREATE TRIGGER event_trigger_interview_session_cancel_insert AFTER INSERT ON public.interview_session_cancel FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_session_cancel_update AFTER UPDATE ON public.interview_session_cancel FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER decrement_interviewer_cnt_trigger AFTER DELETE ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION decrement_interviewer_cnt();

CREATE TRIGGER interview_session_count_invalidation AFTER DELETE ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION trigger_interview_session_count_invalidation();

CREATE TRIGGER update_interviewer_cnt_trigger AFTER INSERT ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION update_interviewer_cnt();

CREATE TRIGGER event_trigger_interview_training_progress_update AFTER UPDATE ON public.interview_training_progress FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER new_permission_mapper_trigger AFTER INSERT OR UPDATE ON public.permissions FOR EACH ROW EXECUTE FUNCTION new_permission_to_role_mapper();

CREATE TRIGGER application_score_log2 AFTER UPDATE OF parameter_weights ON public.public_jobs FOR EACH ROW WHEN ((new.parameter_weights <> old.parameter_weights)) EXECUTE FUNCTION trigger_application_score_log2();

CREATE TRIGGER jobs_email_template_insert_trigger AFTER INSERT ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION job_email_template_init();

CREATE TRIGGER rescore_applications AFTER UPDATE OF jd_json ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION trigger_rescore_applications();

CREATE TRIGGER workflow_auto_connect AFTER INSERT ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION trigger_workflow_auto_connect();

CREATE TRIGGER recruiter_user_suspension AFTER UPDATE OF status ON public.recruiter_user FOR EACH ROW WHEN ((new.status = 'suspended'::text)) EXECUTE FUNCTION trigger_recruiter_user_suspension();

CREATE TRIGGER event_trigger_request_insert AFTER INSERT ON public.request FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_request_update AFTER UPDATE ON public.request FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER request_completion AFTER UPDATE OF status ON public.request FOR EACH ROW WHEN ((((new.status = 'completed'::text) AND (new.completed_at IS NULL)) OR ((new.status <> 'completed'::text) AND (new.completed_at IS NOT NULL)))) EXECUTE FUNCTION trigger_request_completion();

CREATE TRIGGER request_update BEFORE UPDATE ON public.request FOR EACH ROW EXECUTE FUNCTION trigger_request_update();

CREATE TRIGGER set_request_to_new AFTER INSERT ON public.request FOR EACH ROW EXECUTE FUNCTION trigger_set_request_to_new();

CREATE TRIGGER track_request_changes AFTER INSERT OR UPDATE OF assignee_id, status, type, priority ON public.request FOR EACH ROW EXECUTE FUNCTION create_request_meeting_log();

CREATE TRIGGER event_trigger_request_progress_update AFTER UPDATE ON public.request_progress FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER request_progress_delete AFTER DELETE ON public.request_progress FOR EACH ROW EXECUTE FUNCTION trigger_request_progress_delete();

CREATE TRIGGER request_progress_insert AFTER INSERT ON public.request_progress FOR EACH ROW EXECUTE FUNCTION trigger_request_progress_insert();

CREATE TRIGGER request_progress_update AFTER UPDATE ON public.request_progress FOR EACH ROW EXECUTE FUNCTION trigger_request_progress_update();

CREATE TRIGGER workflow_action_deletion AFTER UPDATE OF trigger ON public.workflow FOR EACH ROW EXECUTE FUNCTION trigger_workflow_action_deletion();

CREATE TRIGGER event_trigger_workflow_action_logs_insert AFTER INSERT ON public.workflow_action_logs FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();


