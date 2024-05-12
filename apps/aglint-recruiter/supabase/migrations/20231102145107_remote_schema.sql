alter table "public"."public_jobs" add column "video_assessment" boolean default false;

alter table "public"."recruiter" add column "video_assessment" boolean;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.match_job_applications(query_embedding vector, match_threshold double precision, match_count integer, recruiter_id uuid)
 RETURNS TABLE(id uuid, first_name text, last_name text, job_title text, email text, resume text, similarity double precision)
 LANGUAGE sql
 STABLE
AS $function$
  SELECT
    candidates.id,
    candidates.first_name,
    candidates.last_name,
    candidates.job_title,
    candidates.email,
    candidates.resume,
    1 - (candidates.embedding <=> query_embedding) AS similarity
  FROM candidates
  WHERE
    1 - (candidates.embedding <=> query_embedding) > match_threshold
    AND candidates.recruiter_id = recruiter_id
  ORDER BY similarity DESC
  LIMIT match_count;
$function$
;


