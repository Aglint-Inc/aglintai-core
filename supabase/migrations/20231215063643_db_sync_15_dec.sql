SET pgaudit.log = 'none';
create extension if not exists "postgis" with schema "extensions";
SET pgaudit.log = 'ddl';
-- Added manulay to fix migration for supabse branching.

revoke delete on table "public"."documents" from "anon";

revoke insert on table "public"."documents" from "anon";

revoke references on table "public"."documents" from "anon";

revoke select on table "public"."documents" from "anon";

revoke trigger on table "public"."documents" from "anon";

revoke truncate on table "public"."documents" from "anon";

revoke update on table "public"."documents" from "anon";

revoke delete on table "public"."documents" from "authenticated";

revoke insert on table "public"."documents" from "authenticated";

revoke references on table "public"."documents" from "authenticated";

revoke select on table "public"."documents" from "authenticated";

revoke trigger on table "public"."documents" from "authenticated";

revoke truncate on table "public"."documents" from "authenticated";

revoke update on table "public"."documents" from "authenticated";

revoke delete on table "public"."documents" from "service_role";

revoke insert on table "public"."documents" from "service_role";

revoke references on table "public"."documents" from "service_role";

revoke select on table "public"."documents" from "service_role";

revoke trigger on table "public"."documents" from "service_role";

revoke truncate on table "public"."documents" from "service_role";

revoke update on table "public"."documents" from "service_role";

revoke delete on table "public"."function" from "anon";

revoke insert on table "public"."function" from "anon";

revoke references on table "public"."function" from "anon";

revoke select on table "public"."function" from "anon";

revoke trigger on table "public"."function" from "anon";

revoke truncate on table "public"."function" from "anon";

revoke update on table "public"."function" from "anon";

revoke delete on table "public"."function" from "authenticated";

revoke insert on table "public"."function" from "authenticated";

revoke references on table "public"."function" from "authenticated";

revoke select on table "public"."function" from "authenticated";

revoke trigger on table "public"."function" from "authenticated";

revoke truncate on table "public"."function" from "authenticated";

revoke update on table "public"."function" from "authenticated";

revoke delete on table "public"."function" from "service_role";

revoke insert on table "public"."function" from "service_role";

revoke references on table "public"."function" from "service_role";

revoke select on table "public"."function" from "service_role";

revoke trigger on table "public"."function" from "service_role";

revoke truncate on table "public"."function" from "service_role";

revoke update on table "public"."function" from "service_role";

revoke delete on table "public"."function_url" from "anon";

revoke insert on table "public"."function_url" from "anon";

revoke references on table "public"."function_url" from "anon";

revoke select on table "public"."function_url" from "anon";

revoke trigger on table "public"."function_url" from "anon";

revoke truncate on table "public"."function_url" from "anon";

revoke update on table "public"."function_url" from "anon";

revoke delete on table "public"."function_url" from "authenticated";

revoke insert on table "public"."function_url" from "authenticated";

revoke references on table "public"."function_url" from "authenticated";

revoke select on table "public"."function_url" from "authenticated";

revoke trigger on table "public"."function_url" from "authenticated";

revoke truncate on table "public"."function_url" from "authenticated";

revoke update on table "public"."function_url" from "authenticated";

revoke delete on table "public"."function_url" from "service_role";

revoke insert on table "public"."function_url" from "service_role";

revoke references on table "public"."function_url" from "service_role";

revoke select on table "public"."function_url" from "service_role";

revoke trigger on table "public"."function_url" from "service_role";

revoke truncate on table "public"."function_url" from "service_role";

revoke update on table "public"."function_url" from "service_role";

revoke delete on table "public"."result" from "anon";

revoke insert on table "public"."result" from "anon";

revoke references on table "public"."result" from "anon";

revoke select on table "public"."result" from "anon";

revoke trigger on table "public"."result" from "anon";

revoke truncate on table "public"."result" from "anon";

revoke update on table "public"."result" from "anon";

revoke delete on table "public"."result" from "authenticated";

revoke insert on table "public"."result" from "authenticated";

revoke references on table "public"."result" from "authenticated";

revoke select on table "public"."result" from "authenticated";

revoke trigger on table "public"."result" from "authenticated";

revoke truncate on table "public"."result" from "authenticated";

revoke update on table "public"."result" from "authenticated";

revoke delete on table "public"."result" from "service_role";

revoke insert on table "public"."result" from "service_role";

revoke references on table "public"."result" from "service_role";

revoke select on table "public"."result" from "service_role";

revoke trigger on table "public"."result" from "service_role";

revoke truncate on table "public"."result" from "service_role";

revoke update on table "public"."result" from "service_role";

revoke delete on table "public"."weight_record" from "anon";

revoke insert on table "public"."weight_record" from "anon";

revoke references on table "public"."weight_record" from "anon";

revoke select on table "public"."weight_record" from "anon";

revoke trigger on table "public"."weight_record" from "anon";

revoke truncate on table "public"."weight_record" from "anon";

revoke update on table "public"."weight_record" from "anon";

revoke delete on table "public"."weight_record" from "authenticated";

revoke insert on table "public"."weight_record" from "authenticated";

revoke references on table "public"."weight_record" from "authenticated";

revoke select on table "public"."weight_record" from "authenticated";

revoke trigger on table "public"."weight_record" from "authenticated";

revoke truncate on table "public"."weight_record" from "authenticated";

revoke update on table "public"."weight_record" from "authenticated";

revoke delete on table "public"."weight_record" from "service_role";

revoke insert on table "public"."weight_record" from "service_role";

revoke references on table "public"."weight_record" from "service_role";

revoke select on table "public"."weight_record" from "service_role";

revoke trigger on table "public"."weight_record" from "service_role";

revoke truncate on table "public"."weight_record" from "service_role";

revoke update on table "public"."weight_record" from "service_role";

alter table "public"."candidates" drop constraint "candidates_email_key";

alter table "public"."documents" drop constraint "documents_pkey";

drop index if exists "public"."candidates_email_key";

drop index if exists "public"."documents_pkey";

drop table "public"."documents";

drop table "public"."function";

drop table "public"."function_url";

drop table "public"."result";

drop table "public"."weight_record";

create table "public"."json_resume" (
    "?column?" jsonb
);


create table "public"."outreached_emails" (
    "id" bigint generated by default as identity not null,
    "recruiter_id" uuid not null,
    "candidate_id" uuid not null,
    "email" jsonb not null default '{}'::jsonb
);


alter table "public"."application_reference" add column "recruiter_id" uuid;

alter table "public"."candidate_search_history" add column "search_query" text;

alter table "public"."job_applications" add column "geolocation" geometry;

alter table "public"."public_jobs" add column "is_ats_sync" boolean not null default false;

alter table "public"."public_jobs" alter column "parameter_weights" set default '{"skills": 45, "education": 5, "experience": 50}'::jsonb;

alter table "public"."recruiter" drop column "outreach_templates";

alter table "public"."recruiter" add column "ashby_last_synced" timestamp with time zone;

alter table "public"."recruiter" add column "email_outreach_templates" jsonb[];

drop sequence if exists "public"."documents_id_seq";

CREATE UNIQUE INDEX outreached_emails_pkey ON public.outreached_emails USING btree (id);

alter table "public"."outreached_emails" add constraint "outreached_emails_pkey" PRIMARY KEY using index "outreached_emails_pkey";

alter table "public"."outreached_emails" add constraint "outreached_emails_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."outreached_emails" validate constraint "outreached_emails_candidate_id_fkey";

alter table "public"."outreached_emails" add constraint "outreached_emails_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."outreached_emails" validate constraint "outreached_emails_recruiter_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.applications_inview(job_id uuid, min_lat double precision, min_long double precision, max_lat double precision, max_long double precision)
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
        SELECT application_id, st_y(geolocation::geometry) as lat, st_x(geolocation::geometry) as long
        FROM public.job_applications
        WHERE geolocation && ST_SetSRID(ST_MakeBox2D(ST_Point(min_long, min_lat), ST_Point(max_long, max_lat)), 4326)
        AND job_id = job_id  -- Added condition to filter by job_id
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.batchsavegreenhouse_test(rec_id uuid)
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions and filter by recruiter_id
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
        SELECT
           gr.application_id AS application_id,
           gr.resume AS resume
       FROM greenhouse_reference gr
       JOIN public_jobs pj ON gr.public_job_id = pj.id
       WHERE gr.resume_saved = false 
         AND gr.resume IS NOT NULL
         AND pj.recruiter_id = rec_id -- Filter by recruiter_id
       ORDER BY gr.created_at ASC
       LIMIT 100
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.calc_sim_score2(job_ids uuid[], skill_qry_emb vector, edu_qry_emb vector, exp_qry_emb vector, resume_qry_emb vector, max_records integer DEFAULT 25, ts_query text DEFAULT ''::text, filter_companies text DEFAULT ''::text)
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
      CASE
        WHEN LENGTH(ts_query) > 0 THEN 
          to_tsvector(COALESCE(lower(ja.json_resume->'basics'->>'currentJobTitle'), '')) @@ to_tsquery('english', ts_query) 
        ELSE true
        end
      AND
      CASE
        WHEN LENGTH(filter_companies) > 0 THEN to_tsvector(COALESCE(lower(ja.resume_text),'')) @@ to_tsquery('english', filter_companies)
        ELSE true 
      END
    ORDER BY ja.candidate_id, similarity DESC
    LIMIT max_records;
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
       FROM application_reference app
       JOIN job_reference job ON (app.ats_json -> 'job'->>'id')::uuid = job.ats_job_id
       JOIN recruiter rec ON rec.id = job.recruiter_id
       WHERE app.is_processed = false AND rec.id = rec_id limit 25
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.batchcalcresumejdscore()
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
           ja.application_id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.jd_score AS jd_score,
           ja.resume AS resume,
           ja.json_resume AS json_resume,
           ja.resume_text AS resume_text,
           ja.job_id as job_id,
           pj.company as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           0 as retry
       FROM job_applications ja
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.api_status='not started' and ja.resume is not null  and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 50
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.levercandidatesync()
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
            SELECT job_id
            FROM lever_job_reference
            ORDER BY created_at ASC
        )
        LOOP

            SELECT value INTO function_url FROM env WHERE name = 'lever-sync';
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

CREATE OR REPLACE FUNCTION public.retrybatchcalcresumejdscore()
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
           ja.application_id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.jd_score AS jd_score,
           ja.resume AS resume,
           ja.json_resume AS json_resume,
           ja.resume_text AS resume_text,
           ja.job_id as job_id,
           pj.company as company,
           pj.parameter_weights as parameter_weights,
           pj.jd_json as jd_json,
           1 as retry
       FROM job_applications ja
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.api_status in ('failed')  and retry < 1 and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 25
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.secondretrybatchcalcresumejdscore()
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
          ja.application_id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.jd_score AS jd_score,
           ja.resume AS resume,
           ja.json_resume AS json_resume,
           ja.resume_text AS resume_text,
           ja.job_id as job_id,
           pj.company as company,
           pj.parameter_weights as parameter_weights,
           pj.jd_json as jd_json,
           2 as retry
       FROM job_applications ja
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.api_status in ('failed')  and retry >= 1 and retry < 2 and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 10
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

grant delete on table "public"."json_resume" to "anon";

grant insert on table "public"."json_resume" to "anon";

grant references on table "public"."json_resume" to "anon";

grant select on table "public"."json_resume" to "anon";

grant trigger on table "public"."json_resume" to "anon";

grant truncate on table "public"."json_resume" to "anon";

grant update on table "public"."json_resume" to "anon";

grant delete on table "public"."json_resume" to "authenticated";

grant insert on table "public"."json_resume" to "authenticated";

grant references on table "public"."json_resume" to "authenticated";

grant select on table "public"."json_resume" to "authenticated";

grant trigger on table "public"."json_resume" to "authenticated";

grant truncate on table "public"."json_resume" to "authenticated";

grant update on table "public"."json_resume" to "authenticated";

grant delete on table "public"."json_resume" to "service_role";

grant insert on table "public"."json_resume" to "service_role";

grant references on table "public"."json_resume" to "service_role";

grant select on table "public"."json_resume" to "service_role";

grant trigger on table "public"."json_resume" to "service_role";

grant truncate on table "public"."json_resume" to "service_role";

grant update on table "public"."json_resume" to "service_role";

grant delete on table "public"."outreached_emails" to "anon";

grant insert on table "public"."outreached_emails" to "anon";

grant references on table "public"."outreached_emails" to "anon";

grant select on table "public"."outreached_emails" to "anon";

grant trigger on table "public"."outreached_emails" to "anon";

grant truncate on table "public"."outreached_emails" to "anon";

grant update on table "public"."outreached_emails" to "anon";

grant delete on table "public"."outreached_emails" to "authenticated";

grant insert on table "public"."outreached_emails" to "authenticated";

grant references on table "public"."outreached_emails" to "authenticated";

grant select on table "public"."outreached_emails" to "authenticated";

grant trigger on table "public"."outreached_emails" to "authenticated";

grant truncate on table "public"."outreached_emails" to "authenticated";

grant update on table "public"."outreached_emails" to "authenticated";

grant delete on table "public"."outreached_emails" to "service_role";

grant insert on table "public"."outreached_emails" to "service_role";

grant references on table "public"."outreached_emails" to "service_role";

grant select on table "public"."outreached_emails" to "service_role";

grant trigger on table "public"."outreached_emails" to "service_role";

grant truncate on table "public"."outreached_emails" to "service_role";

grant update on table "public"."outreached_emails" to "service_role";


