create or replace view "public"."candidate_applications_view" as  SELECT concat(candidates.first_name, ' ', candidates.last_name) AS candidate_name,
    candidates.id AS candidate_id,
    candidates.email AS candidate_email,
    applications.job_id,
    applications.id AS application_id,
    applications.status AS application_status,
    to_tsvector((((candidates.first_name)::text || ' '::text) || (candidates.last_name)::text)) AS full_text_search
   FROM ((applications
     LEFT JOIN candidates ON ((candidates.id = applications.candidate_id)))
     LEFT JOIN public_jobs ON ((public_jobs.id = applications.job_id)));
