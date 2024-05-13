alter table "public"."candidates" alter column "last_name" drop not null;

alter table "public"."job_applications" add column "processed_at" timestamp with time zone;

alter table "public"."job_applications" add column "resume_embedding" vector(1536);

alter table "public"."job_applications" add column "retry" numeric not null default '0'::numeric;

alter table "public"."job_applications" alter column "resume_text" set data type text using "resume_text"::text;

alter table "public"."lever_reference" add column "feedback" jsonb;

alter table "public"."lever_reference" add column "stage" text;

alter table "public"."public_jobs" add column "interview_instructions" text;

alter table "public"."recruiter" add column "ats_familiar" text;

alter table "public"."recruiter" add column "greenhouse_key" text;

alter table "public"."recruiter" add column "recruiter_active" boolean default false;

alter table "public"."recruiter" add column "recruiter_user_id" text;

alter table "public"."recruiter" add column "use_of_purpose" jsonb;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.retrybatchcalcresumejdscore()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB;
    request_results JSONB;
    app_data RECORD;
BEGIN
    -- Initialize an empty JSON array for the results
    result := '[]'::JSONB;

    -- Loop through the selected application data
    FOR app_data IN (
       SELECT
           ja.application_id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.jd_score AS jd_score,
           ja.resume AS resume,
           ja.json_resume AS json_resume,
           ja.resume_text AS resume_text,
           jsonb_build_object('description', pj.description, 'skills', pj.skills, 'job_title', pj.job_title) AS jd_json
       FROM job_applications ja
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.api_status in ('failed','processing')  and retry < 1 and current_timestamp > ja.processed_at + interval '5 minutes'
       ORDER BY ja.created_at ASC
       LIMIT 10
    )
    LOOP
        -- Convert the row to JSON
        request_results := row_to_json(app_data);
        
        -- Make the HTTP request for each application data
        SELECT
            net.http_post(
                url := 'https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/process_resume_and_jd_v1',
                body := request_results
            ) INTO request_results;

        UPDATE job_applications
            SET 
                api_status = 'processing',
                processed_at = CURRENT_TIMESTAMP,
                retry = retry + 1
            WHERE application_id = app_data.application_id;
        
        -- Append the request result to the result array
        result := result || jsonb_build_object('request_result', request_results);
    END LOOP;


    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_resume_score(job_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    job_data record;
    parameter_weights_x jsonb;  -- Fixed parameter_weights for all rows
    result_score numeric;     -- Variable to store the result of get_combined_resume_score
BEGIN
    -- Fetch the fixed parameter_weights from the public_jobs table
    SELECT parameter_weights
    INTO parameter_weights_x
    FROM public_jobs
    WHERE id = job_id;
    -- Check if the parameter_weights were found, and if not, return false
    IF NOT FOUND THEN
        RETURN false;
    END IF;
    FOR job_data IN (
        SELECT jd_score, application_id
        FROM job_applications
        WHERE job_applications.job_id = update_resume_score.job_id AND jd_score IS NOT NULL
    )
    LOOP
        -- Call your get_combined_resume_score function with jd_score and fixed parameter_weights
        result_score := get_combined_resume_score(job_data.jd_score, parameter_weights_x);
        -- Update the same row in the job_applications table with the result
        UPDATE job_applications
        SET resume_score = result_score
        WHERE application_id = job_data.application_id;
    END LOOP;
    -- If the loop completes without errors, return true
    RETURN true;
END $function$
;

CREATE OR REPLACE FUNCTION public.batchcalcresumejdscore()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB;
    request_results JSONB;
    app_data RECORD;
BEGIN
    -- Initialize an empty JSON array for the results
    result := '[]'::JSONB;

    -- Loop through the selected application data
    FOR app_data IN (
       SELECT
           ja.application_id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.jd_score AS jd_score,
           ja.resume AS resume,
           ja.json_resume AS json_resume,
           ja.resume_text AS resume_text,
           jsonb_build_object('description', pj.description, 'skills', pj.skills, 'job_title', pj.job_title) AS jd_json
       FROM job_applications ja
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.api_status = 'not started' AND ja.resume IS NOT NULL
       ORDER BY ja.created_at ASC
       LIMIT 50
    )
    LOOP
        -- Convert the row to JSON
        request_results := row_to_json(app_data);
        
        -- Make the HTTP request for each application data
        SELECT
            net.http_post(
                url := 'https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/process_resume_and_jd_v1',
                body := request_results
            ) INTO request_results;

        UPDATE job_applications
        SET api_status = 'processing',processed_at = current_timestamp
        WHERE application_id = app_data.application_id;
        
        -- Append the request result to the result array
        result := result || jsonb_build_object('request_result', request_results);
    END LOOP;


    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_combined_resume_score(jd_data jsonb, parameter_weights jsonb)
 RETURNS integer
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
  key text;
  value_score numeric;
  weight numeric;
  overall_score numeric := 0;
BEGIN
  -- Iterate over each key in the jd_data object
  FOR key IN SELECT jsonb_object_keys(jd_data)
  LOOP
    -- Get the value score for the current key
    value_score := COALESCE((jd_data ->> key)::numeric, 0);

    -- Get the weight for the current key
    weight := COALESCE((parameter_weights ->> key)::numeric, 0);

    -- Add the weighted score to the overall score
    overall_score := overall_score + (value_score * weight / 100);
  END LOOP;

  -- Return the truncated integer part of the overall score
  RETURN TRUNC(overall_score);
END;
$function$
;


