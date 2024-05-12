DROP FUNCTION IF EXISTS test_filter3;

CREATE FUNCTION test_filter3(
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
  candfile_id uuid,
  total_results bigint
) LANGUAGE plpgsql AS $$ 
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
$$;

SELECT * FROM test_filter3(
  rec_id := '08acecdf-4f44-4e12-a67b-63e5e76b2495'::uuid,
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


