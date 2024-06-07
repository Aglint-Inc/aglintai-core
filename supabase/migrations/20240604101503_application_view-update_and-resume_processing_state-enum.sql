create type "public"."resume_processing_state" as enum ('unavailable', 'fetching', 'processing', 'unparsable', 'processed');

drop view if exists "public"."application_view";

create or replace view "public"."application_view" as  SELECT applications.job_id,
    applications.created_at,
    applications.applied_at,
    applications.overall_score AS resume_score,
    applications.overall_interview_score AS interview_score,
    applications.status_emails_sent AS email_status,
    applications.processing_status,
    applications.bookmarked,
    applications.is_new,
    applications.status,
    (applications.score_json -> 'badges'::text) AS badges,
    candidates.id,
    candidates.email,
    candidates.name,
    candidates.city,
    candidates.state,
    candidates.country,
    candidates.current_job_title,
    meeting_details.meeting_details,
    (
        CASE
            WHEN ((candidate_files.resume_json IS NOT NULL) OR (candidate_files.file_url IS NOT NULL)) THEN
            CASE
                WHEN (applications.is_resume_fetching = true) THEN 'fetching'::text
                WHEN (applications.processing_status = 'processing'::application_processing_status) THEN 'processing'::text
                WHEN (applications.score_json IS NOT NULL) THEN 'processed'::text
                ELSE 'unparsable'::text
            END
            ELSE 'unavailable'::text
        END)::resume_processing_state AS resume_processing_state
   FROM (((applications
     LEFT JOIN ( SELECT candidates_1.id,
            candidates_1.email,
            (((candidates_1.first_name)::text || ' '::text) || (candidates_1.last_name)::text) AS name,
            candidates_1.city,
            candidates_1.state,
            candidates_1.country,
            candidates_1.current_job_title
           FROM candidates candidates_1) candidates ON ((candidates.id = applications.candidate_id)))
     LEFT JOIN ( SELECT meeting_details_1.application_id,
            jsonb_agg(meeting_details_1.*) AS meeting_details
           FROM meeting_details meeting_details_1
          GROUP BY meeting_details_1.application_id) meeting_details ON ((meeting_details.application_id = applications.id)))
     LEFT JOIN ( SELECT candidate_files_1.id,
            candidate_files_1.resume_json,
            candidate_files_1.file_url
           FROM candidate_files candidate_files_1) candidate_files ON ((candidate_files.id = applications.candidate_file_id)));



