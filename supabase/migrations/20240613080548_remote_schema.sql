drop view if exists "public"."application_view";

alter type "public"."email_slack_types" rename to "email_slack_types__old_version_to_be_dropped";

create type "public"."email_slack_types" as enum ('interviewEnd_slack_interviewers', 'interviewerConfirmation_slack_interviewers', 'interviewStart_slack_interviewers', 'agent_email_candidate', 'applicantReject_email_applicant', 'applicationRecieved_email_applicant', 'confInterview_email_organizer', 'confirmInterview_email_applicant', 'debrief_email_interviewer', 'interReschedReq_email_recruiter', 'interviewCancel_email_applicant', 'InterviewCancelReq_email_recruiter', 'interviewReschedule_email_applicant', 'interviewStart_email_applicant', 'interviewStart_email_interviewers', 'phoneScreen_email_candidate', 'phoneScreenRemind_email_applicant', 'selfScheduleReminder_email_applicant', 'sendAvailReqReminder_email_applicant', 'sendSelfScheduleRequest_email_applicant', 'sendAvailabilityRequest_email_applicant', 'availabilityReqResend_email_candidate');

alter table "public"."application_email_status" alter column email type "public"."email_slack_types" using email::text::"public"."email_slack_types";

alter table "public"."company_email_template" alter column type type "public"."email_slack_types" using type::text::"public"."email_slack_types";

drop type "public"."email_slack_types__old_version_to_be_dropped";

alter table "public"."interview_filter_json" add column "confirmed_on" timestamp with time zone;

alter table "public"."interview_filter_json" add column "viewed_on" timestamp with time zone;

create or replace view "public"."application_view" as  SELECT applications.id,
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
    candidates.candidate_id,
    candidates.email,
    candidates.name,
    candidates.city,
    candidates.linkedin,
    candidates.phone,
    candidates.state,
    candidates.country,
    candidates.current_job_title,
    meeting_details.meeting_details,
    applications.candidate_file_id,
    candidate_files.file_url,
    email_statuses.email_status,
    (
        CASE
            WHEN ((candidate_files.resume_json IS NOT NULL) OR (candidate_files.file_url IS NOT NULL)) THEN
            CASE
                WHEN (applications.is_resume_fetching = true) THEN 'fetching'::text
                WHEN ((applications.processing_status = 'processing'::application_processing_status) OR (applications.processing_status = 'not started'::application_processing_status)) THEN 'processing'::text
                WHEN (applications.score_json IS NOT NULL) THEN 'processed'::text
                ELSE 'unparsable'::text
            END
            ELSE 'unavailable'::text
        END)::resume_processing_state AS resume_processing_state
   FROM ((((applications
     LEFT JOIN ( SELECT candidates_1.id AS candidate_id,
            candidates_1.email,
            (((candidates_1.first_name)::text || ' '::text) || (candidates_1.last_name)::text) AS name,
            candidates_1.city,
            candidates_1.linkedin,
            candidates_1.phone,
            candidates_1.state,
            candidates_1.country,
            candidates_1.current_job_title
           FROM candidates candidates_1) candidates ON ((candidates.candidate_id = applications.candidate_id)))
     LEFT JOIN ( SELECT application_email_status.application_id,
            jsonb_build_object(application_email_status.email, application_email_status.created_at) AS email_status
           FROM application_email_status) email_statuses ON ((email_statuses.application_id = applications.id)))
     LEFT JOIN ( SELECT meeting_details_1.application_id,
            jsonb_agg(meeting_details_1.*) AS meeting_details
           FROM meeting_details meeting_details_1
          GROUP BY meeting_details_1.application_id) meeting_details ON ((meeting_details.application_id = applications.id)))
     LEFT JOIN ( SELECT candidate_files_1.id,
            candidate_files_1.resume_json,
            candidate_files_1.file_url
           FROM candidate_files candidate_files_1) candidate_files ON ((candidate_files.id = applications.candidate_file_id)));

