DROP FUNCTION IF EXISTS filter_candidates;

CREATE FUNCTION filter_candidates (
  job_ids uuid[]
) RETURNS TABLE (
  application_id uuid,
  created_at text,
  first_name citext,
  last_name citext,
  job_title text,
  email citext,
  resume_link text,
  json_resume jsonb,
  profile_image text,
  candidate_id uuid,
  job_id uuid
) LANGUAGE plpgsql AS $$ 
BEGIN 
  RETURN QUERY 
    SELECT DISTINCT ON (ja.candidate_id)
      ja.application_id,
      ja.created_at::text,
      c.first_name,
      c.last_name,
      COALESCE(ja.json_resume->'basics'->>'currentJobTitle', ''),
      c.email,
      ja.resume,
      ja.json_resume,
      c.profile_image,
      ja.candidate_id,
      ja.job_id,
    FROM
      job_applications ja
      JOIN candidates c ON ja.candidate_id = c.id
    WHERE
      ja.job_id = ANY(job_ids)
    ORDER BY ja.candidate_id
    LIMIT max_records;
END;
$$;
