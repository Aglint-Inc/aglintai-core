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
    meeting_details.meeting_details
   FROM ((applications
     LEFT JOIN ( SELECT candidates_1.id,
            candidates_1.email,
            (((candidates_1.first_name)::text || ' '::text) || (candidates_1.last_name)::text) AS name,
            candidates_1.city,
            candidates_1.state,
            candidates_1.country
           FROM candidates candidates_1) candidates ON ((candidates.id = applications.candidate_id)))
     LEFT JOIN ( SELECT meeting_details_1.application_id,
            jsonb_agg(meeting_details_1.*) AS meeting_details
           FROM meeting_details meeting_details_1
          GROUP BY meeting_details_1.application_id) meeting_details ON ((meeting_details.application_id = applications.id)));



