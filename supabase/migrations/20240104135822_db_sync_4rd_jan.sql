alter table "public"."job_reference" alter column "ats_job_id" set data type text using "ats_job_id"::text;

alter table "public"."new_application" add column "is_resume_fetching" boolean not null default false;

alter table "public"."new_application" alter column "score_json" drop not null;

alter table "public"."new_candidate" alter column "last_updated" set default now();

alter table "public"."public_jobs" add column "jd_json_2" jsonb;

alter table "public"."recruiter" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.greenhousecandidatesync()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
    DECLARE
        result JSONB;
        request_results JSONB;
        app_id UUID;
        function_url TEXT;
    BEGIN
        -- Initialize an empty JSON array for the results
        result := '[]'::JSONB;

        -- Loop through the selected application IDs
        FOR app_id IN (
            SELECT public_job_id
            FROM job_reference
            WHERE ats='greenhouse'
            ORDER BY created_at ASC
        )
        LOOP

            SELECT value INTO function_url FROM env WHERE name = 'greenhouse-sync';
            -- Make the HTTP request for each application_id
            SELECT
                net.http_post(
                    url := function_url,
                    body := jsonb_build_object('job_id', app_id)
                ) INTO request_results;

            -- Append the request result to the result array
            result := result || jsonb_build_object('request_result', request_results);
        END LOOP;

        -- Return the final result as a JSONB array
        RETURN result;
    END;
    $function$
;

CREATE OR REPLACE FUNCTION public.ashbyjobreference(rec_id uuid)
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
      SELECT
         app.ats_json AS ats_json,
         job.public_job_id AS job_id,
         job.recruiter_id AS recruiter_id,
         rec.ashby_key AS apikey
         FROM
         application_reference app
         JOIN
         job_reference job ON (app.ats_json -> 'job'->>'id')::text = job.ats_job_id and job.recruiter_id = app.recruiter_id
         JOIN
         recruiter rec ON rec.id = job.recruiter_id
         WHERE app.recruiter_id = rec_id and app.is_processed=false
         ORDER BY
         (app.ats_json->>'id')::text
         LIMIT 25
   ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.job_application_filter_sort(jb_id uuid, min_lat double precision DEFAULT 0, min_long double precision DEFAULT 0, max_lat double precision DEFAULT 0, max_long double precision DEFAULT 0, j_status text DEFAULT 'new'::text, from_rec_num numeric DEFAULT 0, end_rec_num numeric DEFAULT 100, min_resume_score numeric DEFAULT 0, max_resume_score numeric DEFAULT 100, min_interview_score numeric DEFAULT 0, max_interview_score numeric DEFAULT 100, sort_column_text text DEFAULT 'resume_score'::text, is_sort_desc boolean DEFAULT true, text_search_qry text DEFAULT ''::text, is_locat_filter_on boolean DEFAULT false)
 RETURNS TABLE(job_app json, cand json, total_results bigint)
 LANGUAGE plpgsql
AS $function$ 
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
        'applied_at', ja.applied_at, 
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
        'emails', ja.emails,
        'applied_at', ja.applied_at,
        'is_resume_fetching', ja.is_resume_fetching
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
  )
  SELECT 
    fr.job_app,
    fr.cand,
    count(*) OVER () AS total_results
  FROM filtered_results fr
ORDER BY
    CASE 
        WHEN sort_column_text = 'resume_score' AND is_sort_desc THEN (fr.job_app->>'resume_score')::numeric
    END DESC,
    CASE 
        WHEN sort_column_text = 'resume_score' AND NOT is_sort_desc THEN (fr.job_app->>'resume_score')::numeric
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
        WHEN sort_column_text = 'applied_at' AND is_sort_desc THEN fr.job_app->>'applied_at'
    END DESC,
    CASE 
        WHEN sort_column_text = 'applied_at' AND NOT is_sort_desc THEN fr.job_app->>'applied_at'
    END ASC ,
    CASE 
        WHEN sort_column_text = 'interview_score' AND is_sort_desc THEN (fr.job_app->>'interview_score')::numeric
    END DESC,
    CASE 
        WHEN sort_column_text = 'interview_score' AND NOT is_sort_desc THEN (fr.job_app->>'interview_score')::numeric
    END ASC 
  LIMIT (end_rec_num-from_rec_num)
  OFFSET from_rec_num;
END;
$function$
;


