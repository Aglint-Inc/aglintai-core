DROP FUNCTION IF EXISTS test_filter2;

CREATE FUNCTION test_filter2(
  rec_id uuid,
  location_filter text,
  name_filter text,
  job_title_filter text,
  page_size integer,
  page_number integer,
  sort_param text ='first_name',
  is_name_sort_desc boolean = false,
  is_location_sort_desc boolean = false,
  is_job_title_sort_desc boolean = false
)
RETURNS TABLE
(
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
  job_id uuid,
  total_results bigint
) LANGUAGE plpgsql AS $$ 
BEGIN
  -- Initialize total_results variable
  total_results := 0;

  -- Return the paginated results along with total_results
  RETURN QUERY 
  WITH filtered_results AS (
    SELECT DISTINCT ON (ja.candidate_id)
      ja.application_id,
      ja.created_at::text,
      c.first_name,
      c.last_name,
      COALESCE(ja.json_resume->'basics'->>'currentJobTitle', '') as job_title,
      c.email,
      ja.resume,
      ja.json_resume,
      c.profile_image,
      ja.candidate_id,
      ja.job_id
    FROM
      job_applications ja
      JOIN candidates c ON ja.candidate_id = c.id
    WHERE
      c.recruiter_id = rec_id
      AND
      ja.json_resume is not null
      AND
      ja.json_resume->'basics' is not null
      AND (
        CASE
          WHEN LENGTH(location_filter) > 0 THEN to_tsvector(lower(COALESCE(ja.json_resume->'basics'->>'location', ''))) @@ to_tsquery('english', lower(location_filter))
          ELSE true 
        END
      )
      AND (
        CASE
          WHEN LENGTH(name_filter) > 0 THEN to_tsvector(lower(concat(COALESCE(ja.json_resume->'basics'->>'firstName', ''),' ',COALESCE(ja.json_resume->'basics'->>'lastName', '')))) @@ to_tsquery('english', lower(name_filter))
          ELSE true 
        END
      )
      AND (
        CASE
          WHEN LENGTH(job_title_filter) > 0 THEN to_tsvector(lower(COALESCE(ja.json_resume->'basics'->>'currentJobTitle', ''))) @@ to_tsquery('english', lower(job_title_filter))
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
    fr.json_resume,
    fr.profile_image,
    fr.candidate_id,
    fr.job_id,
    count(*) OVER () AS total_results
  FROM filtered_results fr
ORDER BY
   CASE
      WHEN sort_param = 'first_name' AND is_name_sort_desc THEN lower(fr.first_name) END DESC,
    CASE
      WHEN sort_param = 'first_name' AND NOT is_name_sort_desc THEN lower(fr.first_name) END ASC,
    CASE
      WHEN sort_param = 'location' AND is_location_sort_desc THEN lower(COALESCE(fr.json_resume->'basics'->>'location', '')) END DESC,
    CASE
      WHEN sort_param = 'location' AND NOT is_location_sort_desc THEN lower(COALESCE(fr.json_resume->'basics'->>'location', '')) END ASC,
    CASE
      WHEN sort_param = 'job_title' AND is_job_title_sort_desc THEN lower(COALESCE(fr.json_resume->'basics'->>'currentJobTitle', '')) END DESC,
    CASE
    WHEN sort_param = 'job_title' AND NOT is_job_title_sort_desc THEN lower(COALESCE(fr.json_resume->'basics'->>'currentJobTitle', '')) END ASC

  LIMIT page_size
  OFFSET (page_number - 1) * page_size;
END;
$$;



SELECT * FROM test_filter2(
  rec_id := '99114fab-6ff3-4b7d-aaea-6c6c32ca66aa'::uuid,
  location_filter := '',
  name_filter := '',
  job_title_filter := '',
  page_size := 100,
  page_number := 1,
  sort_param := 'job_title',
  is_name_sort_desc := false,
is_location_sort_desc := false,
is_job_title_sort_desc := true
);

