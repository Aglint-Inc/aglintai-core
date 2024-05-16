-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "request_status" AS ENUM('PENDING', 'SUCCESS', 'ERROR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "file_type" AS ENUM('resume', 'coverletter', 'cv', 'image');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "application_processing_status" AS ENUM('success', 'not started', 'processing', 'failed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "application_status" AS ENUM('screening', 'new', 'assessment', 'qualified', 'disqualified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "recruiter_roles" AS ENUM('admin', 'recruiter', 'human resource');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "db_search_type" AS ENUM('aglint', 'candidate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "email_fetch_status" AS ENUM('not fetched', 'success', 'unable to fetch');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_reference" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ats_json" jsonb,
	"public_job_id" uuid NOT NULL,
	"ats" text,
	"ats_job_id" text NOT NULL,
	"recruiter_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assessment_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"interview_duration" text NOT NULL,
	"ai_interviewer_id" numeric NOT NULL,
	"interview_score" numeric DEFAULT '0' NOT NULL,
	"feedback" jsonb NOT NULL,
	"conversation" jsonb[] NOT NULL,
	"interviewing_date" timestamp with time zone DEFAULT now() NOT NULL,
	"application_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "threads" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"thread_id" text,
	"assistant_id" text,
	"candidate_name" text,
	"candidate_email" text,
	"candidate_phone" text,
	"chat_end" boolean,
	"applied" boolean,
	"linkedin_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "application_reference" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ats_json" json NOT NULL,
	"is_processed" boolean DEFAULT false NOT NULL,
	"recruiter_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "aglint_candidates" (
	"aglint_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"id" text NOT NULL,
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
	"search_query" jsonb NOT NULL,
	"phone_numbers" jsonb,
	"email_fetch_status" "email_fetch_status" DEFAULT 'not fetched' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_assiatan_chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"job_id" uuid NOT NULL,
	"name" text,
	"thread_id" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "candidate_list" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"candidates" text[] DEFAULT '{}' NOT NULL,
	"name" text NOT NULL,
	"recruiter_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "env" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text,
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notify_me" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"email" text NOT NULL,
	"job_id" text,
	"job_title" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "candidates" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"recruiter_id" uuid NOT NULL,
	"email" "citext" NOT NULL,
	"avatar" text,
	"city" text,
	"state" text,
	"country" text,
	"experience_in_months" numeric,
	"last_updated" timestamp with time zone DEFAULT now() NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"first_name" "citext" DEFAULT 'not set' NOT NULL,
	"last_name" "citext",
	"geolocation" "geometry",
	"linkedin" text,
	"phone" text,
	"current_company" text,
	CONSTRAINT "candidate_ukey" UNIQUE("recruiter_id","email"),
	CONSTRAINT "candidates_id_key" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outreached_emails" (
	"id" bigint PRIMARY KEY NOT NULL,
	"candidate_id" text NOT NULL,
	"email" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"email_sent" boolean DEFAULT false NOT NULL,
	"recruiter_user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "public_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"company_details" text,
	"overview" text,
	"logo" text,
	"company" text,
	"location" text,
	"job_title" text,
	"description" text,
	"skills" text[],
	"slug" text DEFAULT '' NOT NULL,
	"job_type" text,
	"workplace_type" text,
	"screening_setting" jsonb DEFAULT '{}'::jsonb,
	"screening_questions" jsonb[] DEFAULT ARRAY['{"id": "_TtFCnB4eaNdK5RZ-LsAL", "copy": "Skill", "category": "skill", "questions": []}'::jsonb, '{"id": "OHA290kmXtmow8f85UDWs", "copy": "Behavior", "category": "behavior", "questions": []}'::jsonb, '{"id": "LTezJA4H_rfZKdt1Rll9-", "copy": "communication", "category": "communication", "questions": []}'::jsonb, '{"id": "Myjsxafr-GsUMSO4O2-bJ", "copy": "Performance", "category": "performance", "questions": []}'::jsonb, '{"id": "wQcmD1Y72rtd4cMuk2CG1", "copy": "Education", "category": "education", "questions": []}'::jsonb, '{"id": "thq14SF4XYQk_XgTEx61e", "copy": "General", "category": "general", "questions": []}'::jsonb],
	"job_criteria" jsonb DEFAULT '{}'::jsonb,
	"posted_by" text DEFAULT 'Aglint' NOT NULL,
	"email_template" jsonb DEFAULT '{"interview":{"body":"<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>","default":true,"subject":"Congratulations! You''ve Been Selected for an Assessment with [companyName]","fromName":"aglint"},"rejection":{"body":"<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>","default":true,"subject":"Your application at [companyName]","fromName":"aglint"},"phone_screening":{"body":"<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>","default":true,"subject":"Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]","fromName":"aglint"},"interview_resend":{"body":"<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p>","default":true,"subject":"Reminder: Schedule Your Assessment for [jobTitle] at [companyName]","fromName":"aglint"},"application_recieved":{"body":"<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>","default":true,"subject":"We received your application for a position at [companyName]","fromName":"aglint"},"phone_screening_resend":{"body":"<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>","default":true,"subject":"Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]","fromName":"aglint"}}'::jsonb NOT NULL,
	"active_status" jsonb DEFAULT '{"closed":{"isActive":false,"timeStamp":null},"sourcing":{"isActive":false,"timeStamp":null},"interviewing":{"isActive":false,"timeStamp":null}}'::jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"department" text,
	"recruiter_id" uuid NOT NULL,
	"new_screening_setting" jsonb DEFAULT '{"interview":{"isManual":true,"qualificationRange":null},"screening":{"isManual":true,"qualificationRange":null},"interviewMail":{"isManual":true,"timestamp":null},"feedbackVisible":false,"disqualifiedMail":{"isManual":true,"timestamp":null}}'::jsonb NOT NULL,
	"parameter_weights" jsonb DEFAULT '{"skills":45,"education":5,"experience":50}'::jsonb NOT NULL,
	"jd_json" jsonb,
	"end_video" jsonb,
	"intro_videos" jsonb,
	"start_video" jsonb,
	"video_assessment" boolean DEFAULT false NOT NULL,
	"draft" jsonb,
	"status" text DEFAULT 'draft' NOT NULL,
	"interview_instructions" text,
	"assessment" boolean DEFAULT false,
	"is_ats_sync" boolean DEFAULT false NOT NULL,
	"phone_screening" jsonb,
	"jd_changed" boolean DEFAULT false,
	"phone_screen_enabled" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lever_job_reference" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_synced_at" timestamp DEFAULT now(),
	"posting_id" uuid NOT NULL,
	"job_id" uuid NOT NULL,
	"recruiter_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lever_reference" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_synced" timestamp with time zone DEFAULT now() NOT NULL,
	"application_id" uuid PRIMARY KEY NOT NULL,
	"opportunity_id" uuid NOT NULL,
	"posting_id" uuid NOT NULL,
	"public_job_id" uuid NOT NULL,
	"stage" text,
	"feedback" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "support_groups" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"user_ids" uuid[] DEFAULT '{}' NOT NULL,
	"company_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "support_ticket" (
	"idx" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"user_id" uuid,
	"company_id" uuid,
	"job_id" uuid NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"action_pending" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"assign_to" uuid,
	"content" jsonb[] DEFAULT '{}' NOT NULL,
	"state" text DEFAULT 'created' NOT NULL,
	"priority" text DEFAULT 'low' NOT NULL,
	"user_name" text NOT NULL,
	"email_updates" boolean DEFAULT false NOT NULL,
	"email" text,
	"attachments" text[],
	"support_group_id" uuid,
	"application_id" uuid,
	"id" text PRIMARY KEY DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recruiter" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"recruiter_type" text,
	"name" text,
	"email" text,
	"company_website" text,
	"industry" text,
	"logo" text,
	"phone_number" text,
	"primary_contact" jsonb,
	"hr_contact" jsonb,
	"available_roles" text[] DEFAULT '{}' NOT NULL,
	"departments" text[] DEFAULT '{}' NOT NULL,
	"technology_score" text[] DEFAULT '{}' NOT NULL,
	"company_overview" text,
	"e_o_statement" text,
	"application_process" text,
	"m_v_statement" text,
	"employment_type" jsonb DEFAULT '{"contract":true,"fulltime":true,"parttime":true,"temporary":true,"volunteer":true,"internship":true}'::jsonb NOT NULL,
	"workplace_type" jsonb DEFAULT '{"hybrid":true,"onsite":true,"offsite":true}'::jsonb NOT NULL,
	"email_template" jsonb DEFAULT '{"interview":{"body":"<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>","default":true,"subject":"Congratulations! You''ve Been Selected for an Assessment with [companyName]","fromName":"aglint"},"rejection":{"body":"<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>","default":true,"subject":"Your application at [companyName]","fromName":"aglint"},"phone_screening":{"body":"<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>","default":true,"subject":"Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]","fromName":"aglint"},"interview_resend":{"body":"<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p>","default":true,"subject":"Reminder: Schedule Your Assessment for [jobTitle] at [companyName]","fromName":"aglint"},"application_recieved":{"body":"<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>","default":true,"subject":"We received your application for a position at [companyName]","fromName":"aglint"},"phone_screening_resend":{"body":"<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>","default":true,"subject":"Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]","fromName":"aglint"}}'::jsonb NOT NULL,
	"company_values" text,
	"benefits" text,
	"employee_size" text,
	"office_locations" jsonb[] DEFAULT '{}',
	"socials" jsonb DEFAULT '{"custom":{},"twitter":"","youtube":"","facebook":"","linkedin":"","instagram":""}'::jsonb,
	"roles" jsonb DEFAULT '{"admin":{"sourcing":true,"screening":true,"job_posting":true,"manage_roles":true,"manage_users":{"admin":true,"recruiter":true,"interviewer":true,"human resource":true},"edit_workflow":true,"send_interview_link":true,"view_candidates_profile":true},"recruiter":{"sourcing":true,"screening":true,"job_posting":true,"manage_roles":false,"manage_users":{"admin":false,"recruiter":false,"interviewer":true,"human resource":false},"edit_workflow":true,"send_interview_link":true,"view_candidates_profile":true},"human resource":{"sourcing":true,"screening":true,"job_posting":true,"manage_roles":false,"manage_users":{"admin":false,"recruiter":true,"interviewer":true,"human resource":false},"edit_workflow":true,"send_interview_link":true,"view_candidates_profile":true}}'::jsonb NOT NULL,
	"lever_key" text,
	"ai_avatar" jsonb,
	"audio_avatar_id" numeric DEFAULT '0' NOT NULL,
	"video_assessment" boolean DEFAULT false,
	"ats_familiar" text,
	"use_of_purpose" jsonb,
	"recruiter_user_id" uuid,
	"recruiter_active" boolean DEFAULT false,
	"greenhouse_key" text,
	"assistant_id" text,
	"ashby_key" text,
	"ashby_sync_token" text,
	"ashby_last_synced" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recruiter_user" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid PRIMARY KEY NOT NULL,
	"recruiter_id" uuid,
	"first_name" text,
	"last_name" text,
	"email" text,
	"profile_image" text,
	"phone" text,
	"joined_at" timestamp with time zone DEFAULT now(),
	"join_status" text DEFAULT 'invited' NOT NULL,
	"is_deactivated" boolean DEFAULT false,
	"position" text,
	"email_auth" jsonb,
	"email_outreach_templates" jsonb[],
	"role" "recruiter_roles" DEFAULT 'admin' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recruiter_relation" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"recruiter_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"created_by" uuid DEFAULT auth.uid() NOT NULL,
	CONSTRAINT "recruiter_relation_ukey" UNIQUE("recruiter_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai_videos" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"video_id" varchar,
	"video_url" varchar,
	"file_url" varchar,
	"error" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "greenhouse_reference" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"application_id" uuid NOT NULL,
	"public_job_id" uuid NOT NULL,
	"posting_id" text NOT NULL,
	"greenhouse_id" text NOT NULL,
	"resume" text,
	"resume_saved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_assiatan_chat_messages" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"job_assiatan_chat_id" uuid NOT NULL,
	"sender" text NOT NULL,
	"type" text NOT NULL,
	"message_id" text NOT NULL,
	"content" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rp_logs" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"application_id" uuid NOT NULL,
	"logs" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "json_resume" (
	"?column?" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_at" timestamp with time zone DEFAULT now() NOT NULL,
	"job_id" uuid NOT NULL,
	"candidate_file_id" uuid,
	"score_json" jsonb,
	"overall_score" numeric DEFAULT '-1' NOT NULL,
	"processing_status" "application_processing_status" DEFAULT 'not started' NOT NULL,
	"status" "application_status" DEFAULT 'new' NOT NULL,
	"retry" numeric DEFAULT '0' NOT NULL,
	"status_emails_sent" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"is_resume_fetching" boolean DEFAULT false NOT NULL,
	"assessment_id" uuid,
	"phone_screening" jsonb,
	"candidate_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_search_cache" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"company_name" text NOT NULL,
	"website_url" text,
	"search_result" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rp_token_usage" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"application_id" uuid NOT NULL,
	"token_used_json" jsonb,
	"total_token_used" numeric,
	"task" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "candidate_search_history" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"recruiter_id" uuid NOT NULL,
	"is_search_jd" boolean DEFAULT false,
	"query_json" jsonb,
	"search_results" jsonb[] DEFAULT '{}',
	"bookmarked_candidates" text[] DEFAULT '{}',
	"search_query" text,
	"db_search" "db_search_type" DEFAULT 'candidate',
	"candidates" text[] DEFAULT '{}' NOT NULL,
	"used_credits" jsonb DEFAULT '{"email_credits":0,"export_credits":0,"mobile_credits":0}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "candidate_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"candidate_id" uuid NOT NULL,
	"file_url" text,
	"resume_text" text,
	"resume_json" jsonb,
	"skills_embedding" "vector",
	"education_embedding" "vector",
	"experience_embedding" "vector",
	"resume_embedding" "vector",
	"type" "file_type" DEFAULT 'resume'
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_reference" ADD CONSTRAINT "job_reference_public_job_id_fkey" FOREIGN KEY ("public_job_id") REFERENCES "public"."public_jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_reference" ADD CONSTRAINT "job_reference_recruiter_id_fkey" FOREIGN KEY ("recruiter_id") REFERENCES "public"."recruiter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assessment_results" ADD CONSTRAINT "assessment_results_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_assiatan_chat" ADD CONSTRAINT "job_assiatan_chat_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."public_jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidate_list" ADD CONSTRAINT "candidate_list_recruiter_id_fkey" FOREIGN KEY ("recruiter_id") REFERENCES "public"."recruiter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidates" ADD CONSTRAINT "candidates_recruiter_id_fkey" FOREIGN KEY ("recruiter_id") REFERENCES "public"."recruiter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "outreached_emails" ADD CONSTRAINT "outreached_emails_recruiter_user_id_fkey" FOREIGN KEY ("recruiter_user_id") REFERENCES "public"."recruiter_user"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public_jobs" ADD CONSTRAINT "public_jobs_recruiter_id_fkey" FOREIGN KEY ("recruiter_id") REFERENCES "public"."recruiter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lever_job_reference" ADD CONSTRAINT "lever_job_reference_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."public_jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lever_job_reference" ADD CONSTRAINT "lever_job_reference_recruiter_id_fkey" FOREIGN KEY ("recruiter_id") REFERENCES "public"."recruiter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lever_reference" ADD CONSTRAINT "lever_reference_public_job_id_fkey" FOREIGN KEY ("public_job_id") REFERENCES "public"."public_jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "support_groups" ADD CONSTRAINT "support_groups_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."recruiter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "support_ticket" ADD CONSTRAINT "support_ticket_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."recruiter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "support_ticket" ADD CONSTRAINT "support_ticket_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."public_jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "support_ticket" ADD CONSTRAINT "support_ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recruiter_user" ADD CONSTRAINT "recruiter_user_recruiter_id_fkey" FOREIGN KEY ("recruiter_id") REFERENCES "public"."recruiter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recruiter_user" ADD CONSTRAINT "recruiter_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recruiter_relation" ADD CONSTRAINT "recruiter_relation_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recruiter_relation" ADD CONSTRAINT "recruiter_relation_recruiter_id_fkey" FOREIGN KEY ("recruiter_id") REFERENCES "public"."recruiter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recruiter_relation" ADD CONSTRAINT "recruiter_relation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_assiatan_chat_messages" ADD CONSTRAINT "job_assiatan_chat_messages_job_assiatan_chat_id_fkey" FOREIGN KEY ("job_assiatan_chat_id") REFERENCES "public"."job_assiatan_chat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessment_results"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_candidate_file_id_fkey" FOREIGN KEY ("candidate_file_id") REFERENCES "public"."candidate_files"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."public_jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidate_search_history" ADD CONSTRAINT "candidate_search_history_recruiter_id_fkey" FOREIGN KEY ("recruiter_id") REFERENCES "public"."recruiter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidate_files" ADD CONSTRAINT "candidate_files_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/