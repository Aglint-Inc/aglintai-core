DROP FUNCTION IF EXISTS job_application_filter_sort;

CREATE FUNCTION job_application_filter_sort(
  jb_id uuid,
  j_status text,
  min_resume_score numeric=0,
  max_resume_score numeric=100,
  min_interview_score numeric=0,
  max_interview_score numeric=100,
  sort_column_text text ='resume_score',
  is_sort_desc boolean=true,
  text_search_qry text '',
  from_rec_num numberic,
  end_rec_num numeric
)
RETURNS TABLE
(
  application_id uuid,
  created_at text,
  resume_score numeric,
  last_name citext,
  feedback jsonb,
  conversation jsonb[],
  status text,
  jd_score jsonb,
  job_id uuid,
  interview_score numeric,
  api_status text,
  json_resume jsonb,
  resume text,
  candidate_id uuid,
  emails json,
  first_name text,
  last_name text,
  candidates jsonb,
  total_results bigint
) LANGUAGE plpgsql AS $$ 
BEGIN
  -- Initialize total_results variable
  total_results := 0;

  -- Return the paginated results along with total_results
  RETURN QUERY 
  WITH filtered_results AS (
      ja.application_id  as application_id,
      ja.created_at::text as created_at,
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
      ja.job_id=jb_id
      AND
      ja.status=j_status
      and
      ja.resume_score>=min_resume_score and ja.resume_score <= max_resume_score
      and 
      ja.interview_score >= min_interview_score and ja.interview_score <= max_interview_score
      and
      case
      when length(text_search_qry)>0 then to_tsvector(lower(concat(c.first_name,' ',c.last_name,' ',c.email))) @@ to_tsquery('english', lower(text_search_qry))
    
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

