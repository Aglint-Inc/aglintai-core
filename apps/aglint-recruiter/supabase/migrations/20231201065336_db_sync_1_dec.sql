drop function if exists "public"."filter_candidates"(job_ids uuid[], max_records numeric);

alter table "public"."candidates" drop column "embedding";

alter table "public"."job_applications" add column "badges" jsonb not null default '{"skills": 0, "schools": 0, "positions": 0, "leadership": 0, "careerGrowth": 0, "jobStability": 0}'::jsonb;

alter table "public"."public_jobs" add column "assessment" boolean default false;

alter table "public"."recruiter" add column "ashby_key" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.count_candidates(job_ids uuid[])
 RETURNS TABLE(total_records numeric)
 LANGUAGE plpgsql
AS $function$ 
DECLARE
  candidate_count numeric;
BEGIN 
  SELECT count(DISTINCT ja.candidate_id) INTO candidate_count
  FROM
    job_applications ja
    JOIN candidates c ON ja.candidate_id = c.id
  WHERE
    ja.job_id = ANY(job_ids);

  RETURN QUERY SELECT candidate_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.filter_candidates2(rec_id uuid, max_records numeric DEFAULT 100, offset_records numeric DEFAULT 0, location_filter text DEFAULT ''::text, name_filter text DEFAULT ''::text, job_title_filter text DEFAULT ''::text, is_location_desc boolean DEFAULT false, is_name_desc boolean DEFAULT true, is_job_title_desc boolean DEFAULT false)
 RETURNS TABLE(application_id uuid, created_at text, first_name citext, last_name citext, job_title text, email citext, resume_link text, json_resume jsonb, profile_image text, candidate_id uuid, job_id uuid, total_results bigint)
 LANGUAGE plpgsql
AS $function$ 
DECLARE
    total_count bigint;
BEGIN
    -- Get total results count
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
        total_count
    FROM
        job_applications ja
        JOIN candidates c ON ja.candidate_id = c.id
    WHERE
        c.recruiter_id=rec_id
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
    );
    -- Return total_results count
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
        total_count
    FROM
        job_applications ja
        JOIN candidates c ON ja.candidate_id = c.id
    WHERE
        c.recruiter_id=rec_id
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
  ORDER BY
    ja.candidate_id
    LIMIT max_records
    OFFSET offset_records;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.test_filter2(rec_id uuid, location_filter text, name_filter text, job_title_filter text, page_size integer, page_number integer, sort_param text DEFAULT 'first_name'::text, is_name_sort_desc boolean DEFAULT false, is_location_sort_desc boolean DEFAULT false, is_job_title_sort_desc boolean DEFAULT false)
 RETURNS TABLE(application_id uuid, created_at text, first_name citext, last_name citext, job_title text, email citext, resume_link text, json_resume jsonb, profile_image text, candidate_id uuid, job_id uuid, total_results bigint)
 LANGUAGE plpgsql
AS $function$ 
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
$function$
;

CREATE OR REPLACE FUNCTION public.calc_cosine_sim(emb1 vector, emb2 vector)
 RETURNS TABLE(similarity double precision)
 LANGUAGE plpgsql
AS $function$ begin return query 
select
  coalesce(1 -(emb1 <=> emb2), 0);

end;
$function$
;

CREATE OR REPLACE FUNCTION public.calc_sim_score(job_ids uuid[], skill_qry_emb vector, edu_qry_emb vector, exp_qry_emb vector, resume_qry_emb vector, max_records integer DEFAULT 25, ts_query text DEFAULT ''::text, filter_companies text DEFAULT ''::text)
 RETURNS TABLE(application_id uuid, created_at text, first_name citext, last_name citext, job_title text, email citext, resume_link text, json_resume jsonb, profile_image text, candidate_id uuid, job_id uuid, similarity double precision, sim_exp double precision, sim_res double precision, sim_skills double precision, sim_educ double precision)
 LANGUAGE plpgsql
AS $function$ 
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
      (
        (
          COALESCE(1 - (ja.experience_embedding <=> exp_qry_emb), 0) * 0.5 +
          COALESCE(1 - (ja.resume_embedding <=> resume_qry_emb), 0) * 0.2 +
          COALESCE(1 - (ja.skills_embedding <=> skill_qry_emb), 0) * 0.2 + 
          COALESCE(1 - (ja.education_embedding <=> edu_qry_emb), 0) * 0.1 
        )
      ) AS similarity,
      COALESCE(1 - (ja.experience_embedding <=> exp_qry_emb), 0),
      COALESCE(1 - (ja.resume_embedding <=> resume_qry_emb), 0),
      COALESCE(1 - (ja.skills_embedding <=> skill_qry_emb), 0),
      COALESCE(1 - (ja.education_embedding <=> edu_qry_emb), 0)
    FROM
      job_applications ja
      JOIN candidates c ON ja.candidate_id = c.id
    WHERE
      ja.job_id = ANY(job_ids) AND
      to_tsvector(COALESCE(lower(ja.json_resume->'basics'->>'currentJobTitle'), '')) @@ to_tsquery('english', ts_query) AND
      CASE
        WHEN LENGTH(filter_companies) > 0 THEN to_tsvector(COALESCE(lower(ja.resume_text),'')) @@ to_tsquery('english', filter_companies)
        ELSE true 
      END
    ORDER BY ja.candidate_id, similarity DESC
    LIMIT max_records;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.calculate_resume_score(score_json jsonb, app_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    weight_record jsonb;
    total_score numeric := 0;
BEGIN
    -- Fetching weights from the database
    SELECT
        pj.parameter_weights
    INTO
        weight_record
    FROM
        job_applications ja
    JOIN
        public_jobs pj ON ja.job_id = pj.id
    WHERE
        ja.application_id = app_id;

    -- Checking if the record exists
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;

    -- Checking and handling missing keys in score_json
    IF NOT (score_json->'scores'->>'skills' IS NOT NULL AND score_json->'scores'->>'education' IS NOT NULL AND score_json->'scores'->>'experience' IS NOT NULL) THEN
        -- Handle missing keys here (set default values or skip the calculation)
        -- For simplicity, we'll set default values to 0 in this example
        RETURN FALSE;
    END IF;

    -- Calculating the total score
    total_score := TRUNC(((score_json->'scores'->>'skills')::numeric * COALESCE((weight_record->>'skills')::numeric, 0) +
        (score_json->'scores'->>'education')::numeric * COALESCE((weight_record->>'education')::numeric, 0) +
        (score_json->'scores'->>'experience')::numeric * COALESCE((weight_record->>'experience')::numeric, 0))/100);

    -- Updating the job_applications table with the calculated score
    UPDATE job_applications
    SET resume_score = total_score,
    jd_score = score_json,
    api_status = 'success'
    WHERE application_id = app_id;

    -- Returning true for success
    RETURN true;
    -- RETURN total_score;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_combined_resume_score(jd_data jsonb, parameter_weights jsonb)
 RETURNS integer
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
  overall_score numeric := 0;
BEGIN
  -- Add the weighted score to the overall score
  overall_score := TRUNC(((jd_data->'scores'->>'skills')::numeric * COALESCE((parameter_weights->>'skills')::numeric, 0) +
      (jd_data->'scores'->>'education')::numeric * COALESCE((parameter_weights->>'education')::numeric, 0) +
      (jd_data->'scores'->>'experience')::numeric * COALESCE((parameter_weights->>'experience')::numeric, 0))/100, 0);

  -- Return the truncated integer part of the overall score
  RETURN TRUNC(overall_score);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjobapplicationcountforcandidates(candidate_ids uuid[])
 RETURNS TABLE(candidate_id uuid, job_ids uuid[], job_titles text[])
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        ja.candidate_id,
        ARRAY_AGG(pj.id) AS job_ids,
        ARRAY_AGG(pj.job_title) AS job_titles
    FROM
        job_applications AS ja
    JOIN
        public_jobs AS pj ON ja.job_id = pj.id
    WHERE
        ja.candidate_id = ANY(candidate_ids)
    GROUP BY
        ja.candidate_id;
END;
$function$
;


