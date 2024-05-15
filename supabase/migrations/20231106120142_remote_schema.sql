alter table "public"."candidates" drop column "json_resume";

alter table "public"."candidates" drop column "resume";

alter table "public"."candidates" drop column "resume_text";

alter table "public"."job_applications" add column "json_resume" jsonb;

alter table "public"."job_applications" add column "resume" text;

alter table "public"."public_jobs" add column "status" text not null default 'draft'::text;

CREATE UNIQUE INDEX candidates_email_key ON public.candidates USING btree (email);

alter table "public"."candidates" add constraint "candidates_email_key" UNIQUE using index "candidates_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_combined_resume_score(jd_data jsonb, parameter_weights jsonb)
 RETURNS integer
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
  qualification jsonb;
  skills_score numeric;
  key text;
  relation_score integer;
  relevance_score integer;
  overall_score numeric := 0;
  parameter_weight numeric;
BEGIN
  -- Extracting skills score and multiplying by 100 according to your JavaScript function logic
  skills_score := COALESCE((jd_data ->> 'skills_score')::numeric * 100, 0);
  overall_score := overall_score + (skills_score * COALESCE((parameter_weights ->> 'skills')::numeric, 0) / 100);

  -- Extracting qualifications
  qualification := jd_data -> 'qualification';

  -- Loop through each qualification to calculate its score
  FOR key IN SELECT jsonb_object_keys(qualification)
  LOOP
    -- Calculate relation score
    relation_score := (SELECT COUNT(*) FROM jsonb_array_elements_text((qualification -> key) -> 'isRelated') WHERE value::boolean) % 5 * 10;

    -- Calculate relevance score
    CASE (qualification -> key) ->> 'relevance'
      WHEN 'low match' THEN relevance_score := 0;
      WHEN 'less match' THEN relevance_score := 0;
      WHEN 'average match' THEN relevance_score := 25;
      WHEN 'more match' THEN relevance_score := 50;
      WHEN 'high match' THEN relevance_score := 50;
      ELSE relevance_score := 0; -- default case if no match found
    END CASE;

    -- Add to overall score after weighting
    parameter_weight := COALESCE((parameter_weights ->> key)::numeric, 0);
    overall_score := overall_score + ((relation_score + relevance_score) * parameter_weight / 100);
  END LOOP;

  -- Return the truncated integer part of the overall score
  RETURN TRUNC(overall_score);
END;
$function$
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
       LIMIT 5
    )
    LOOP

        UPDATE job_applications
        SET api_status = 'processing'
        WHERE application_id = app_data.application_id;
        -- Convert the row to JSON
        request_results := row_to_json(app_data);

        -- Make the HTTP request for each application data
        SELECT
            net.http_post(
                url := 'https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/process_resume_and_jd_v1',
                body := request_results
            ) INTO request_results;

        -- Append the request result to the result array
        result := result || jsonb_build_object('request_result', request_results);
    END LOOP;

    UPDATE job_applications
    SET api_status = 'processing'
    WHERE api_status = 'not started'
    AND candidate_id IN (SELECT candidate_id FROM job_applications WHERE api_status = 'processing' LIMIT 5);

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;


