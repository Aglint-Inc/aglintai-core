-- Copy code
DROP FUNCTION IF EXISTS job_application_filter_sort;

CREATE OR REPLACE FUNCTION job_application_filter_sort(
  jb_id uuid,
  min_lat float =0, 
  min_long float =0, 
  max_lat float=0, 
  max_long float=0,
  j_status text='new',
  from_rec_num numeric=0,
  end_rec_num numeric=100,
  min_resume_score numeric = 0,
  max_resume_score numeric = 100,
  min_interview_score numeric = 0,
  max_interview_score numeric = 100,
  sort_column_text text = 'resume_score',
  is_sort_desc boolean = true,
  text_search_qry text = '',
  is_locat_filter_on boolean=false
)
RETURNS TABLE (
  job_app json,
  cand json,
  total_results bigint
) LANGUAGE plpgsql AS $$ 
BEGIN
  -- Initialize total_results variable
  total_results := 0;
  -- Return the paginated results along with total_results
  RETURN QUERY 
  WITH filtered_results AS (
    SELECT
      json_build_object(
        'application_id', ja.application_id,
        'created_at', ja.created_at, 
        'resume_score', ja.resume_score, 
        'feedback', ja.feedback, 
        'conversation', ja.conversation, 
        'status', ja.status, 
        'jd_score', ja.jd_score, 
        'job_id', ja.job_id, 
        'interview_score', ja.interview_score, 
        'api_status', ja.api_status, 
        'json_resume', ja.json_resume, 
        'resume', ja.resume, 
        'candidate_id', ja.candidate_id, 
        'emails', ja.emails
      ) AS job_app,
      row_to_json(c) AS cand
    FROM
      job_applications ja      
      JOIN candidates c ON ja.candidate_id = c.id     
    WHERE
      ja.job_id = jb_id
      AND ja.status = j_status
      AND ja.resume_score >= min_resume_score AND ja.resume_score <= max_resume_score
      AND ja.interview_score >= min_interview_score AND ja.interview_score <= max_interview_score
      AND (
        length(text_search_qry) = 0
        OR to_tsvector(lower(concat(c.first_name, ' ', c.last_name, ' ', c.email))) @@ to_tsquery('english', lower(text_search_qry))
      )
      AND (
        NOT is_locat_filter_on -- If is_locat_filter_on is false, skip the geolocation filter
        OR (is_locat_filter_on and ja.geolocation && ST_SetSRID(ST_MakeBox2D(ST_Point(min_long, min_lat), ST_Point(max_long, max_lat)), 4326))
      )
      AND 
      c.email not LIKE 'temp-%'
  )
  SELECT 
    fr.job_app,
    fr.cand,
    count(*) OVER () AS total_results
  FROM filtered_results fr
ORDER BY
    CASE 
        WHEN sort_column_text = 'resume_score' AND is_sort_desc THEN fr.job_app->>'resume_score'
    END DESC,
    CASE 
        WHEN sort_column_text = 'resume_score' AND NOT is_sort_desc THEN fr.job_app->>'resume_score'
    END ASC ,
    CASE 
        WHEN sort_column_text = 'full_name' AND is_sort_desc THEN concat(fr.cand->>'first_name',' ',fr.cand->>'last_name')
    END DESC,
    CASE 
        WHEN sort_column_text = 'full_name' AND NOT is_sort_desc THEN concat(fr.cand->>'first_name',' ',fr.cand->>'last_name')
    END ASC,
    CASE 
        WHEN sort_column_text = 'email' AND is_sort_desc THEN fr.cand->>'email'
    END DESC,
    CASE 
        WHEN sort_column_text = 'email' AND NOT is_sort_desc THEN fr.cand->>'email'
    END ASC,
    CASE 
        WHEN sort_column_text = 'created_at' AND is_sort_desc THEN fr.job_app->>'created_at'
    END DESC,
    CASE 
        WHEN sort_column_text = 'created_at' AND NOT is_sort_desc THEN fr.job_app->>'created_at'
    END ASC ,
    CASE 
        WHEN sort_column_text = 'interview_score' AND is_sort_desc THEN fr.job_app->>'interview_score'
    END DESC,
    CASE 
        WHEN sort_column_text = 'interview_score' AND NOT is_sort_desc THEN fr.job_app->>'interview_score'
    END ASC 
  LIMIT (end_rec_num-from_rec_num)
  OFFSET from_rec_num;
END;
$$;


SELECT * FROM job_application_filter_sort('e6b08dc4-78c0-49ca-8b4d-44db6a1a3055');