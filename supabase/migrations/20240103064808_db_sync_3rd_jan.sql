create type "public"."application_processing_status" as enum ('not started', 'processing', 'failed');

create type "public"."application_status" as enum ('new', 'assessment', 'qualified', 'disqualified');

drop function if exists "public"."applications_inview"(job_id uuid, min_lat double precision, min_long double precision, max_lat double precision, max_long double precision);

drop function if exists "public"."ashbyjobreference"();

create table "public"."new_application" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "applied_at" timestamp with time zone not null default now(),
    "candidate_id" uuid,
    "job_id" uuid not null,
    "candidate_file_id" uuid,
    "score_json" jsonb not null,
    "overall_score" numeric,
    "processing_status" application_processing_status not null default 'not started'::application_processing_status,
    "status" application_status not null default 'new'::application_status,
    "retry" numeric not null default '0'::numeric,
    "status_emails_sent" jsonb not null default '{}'::jsonb
);


alter table "public"."new_application" enable row level security;

create table "public"."new_assessment_results" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "interview_duration" numeric not null default '0'::numeric,
    "ai_interviewer_id" numeric not null,
    "inteview_score" numeric not null default '0'::numeric,
    "feedback" jsonb not null,
    "conversation" jsonb[] not null,
    "interviewing_date" timestamp with time zone not null default now(),
    "application_id" uuid
);


alter table "public"."new_assessment_results" enable row level security;

create table "public"."new_candidate" (
    "created_at" timestamp with time zone not null default now(),
    "recruiter_id" uuid not null,
    "email" citext not null,
    "avatar" text,
    "city" text,
    "state" text,
    "country" text,
    "experince_in_months" numeric,
    "last_updated" timestamp with time zone not null,
    "update_from" uuid not null,
    "id" uuid not null default uuid_generate_v4(),
    "first_name" citext not null default 'not set'::citext,
    "last_name" citext,
    "geolocation" geometry
);


alter table "public"."new_candidate" enable row level security;

create table "public"."new_candidate_files" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "candidate_id" uuid,
    "type" text not null default 'resume'::text,
    "file_url" text,
    "resume_text" text,
    "resume_json" jsonb,
    "skills_embedding" vector,
    "education_embedding" vector,
    "experience_embedding" vector,
    "resume_embedding" vector
);


alter table "public"."new_candidate_files" enable row level security;

alter table "public"."application_reference" alter column "recruiter_id" set not null;

alter table "public"."job_applications" alter column "is_resume_fetching" set not null;

alter table "public"."public_jobs" enable row level security;

alter table "public"."recruiter" add column "created_at" timestamp with time zone not null default now();

alter table "public"."recruiter_user" alter column "recruiter_id" drop not null;

alter table "public"."recruiter_user" enable row level security;

CREATE UNIQUE INDEX new_application_pkey ON public.new_application USING btree (id);

CREATE UNIQUE INDEX new_assessment_results_pkey ON public.new_assessment_results USING btree (id);

CREATE UNIQUE INDEX new_candidate_files_pkey ON public.new_candidate_files USING btree (id);

CREATE UNIQUE INDEX new_candidate_pkey ON public.new_candidate USING btree (id);

alter table "public"."new_application" add constraint "new_application_pkey" PRIMARY KEY using index "new_application_pkey";

alter table "public"."new_assessment_results" add constraint "new_assessment_results_pkey" PRIMARY KEY using index "new_assessment_results_pkey";

alter table "public"."new_candidate" add constraint "new_candidate_pkey" PRIMARY KEY using index "new_candidate_pkey";

alter table "public"."new_candidate_files" add constraint "new_candidate_files_pkey" PRIMARY KEY using index "new_candidate_files_pkey";

alter table "public"."new_application" add constraint "new_application_candidate_file_id_fkey" FOREIGN KEY (candidate_file_id) REFERENCES new_candidate_files(id) ON DELETE SET NULL not valid;

alter table "public"."new_application" validate constraint "new_application_candidate_file_id_fkey";

alter table "public"."new_application" add constraint "new_application_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES new_candidate(id) ON DELETE SET NULL not valid;

alter table "public"."new_application" validate constraint "new_application_candidate_id_fkey";

alter table "public"."new_application" add constraint "new_application_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON DELETE CASCADE not valid;

alter table "public"."new_application" validate constraint "new_application_job_id_fkey";

alter table "public"."new_assessment_results" add constraint "new_assessment_results_application_id_fkey" FOREIGN KEY (application_id) REFERENCES new_application(id) ON DELETE CASCADE not valid;

alter table "public"."new_assessment_results" validate constraint "new_assessment_results_application_id_fkey";

alter table "public"."new_candidate" add constraint "new_candidate_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."new_candidate" validate constraint "new_candidate_recruiter_id_fkey";

alter table "public"."new_candidate" add constraint "new_candidate_update_from_fkey" FOREIGN KEY (update_from) REFERENCES new_application(id) ON DELETE SET NULL not valid;

alter table "public"."new_candidate" validate constraint "new_candidate_update_from_fkey";

alter table "public"."new_candidate_files" add constraint "new_candidate_files_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES new_candidate(id) ON DELETE SET NULL not valid;

alter table "public"."new_candidate_files" validate constraint "new_candidate_files_candidate_id_fkey";

set check_function_bodies = off;

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
         job_reference job ON (app.ats_json -> 'job'->>'id')::uuid = job.ats_job_id and job.recruiter_id = app.recruiter_id
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
        'emails', ja.emails ,
        'applied_at', ja.applied_at
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
        WHEN sort_column_text = 'applied_at' AND is_sort_desc THEN fr.job_app->>'applied_at'
    END DESC,
    CASE 
        WHEN sort_column_text = 'applied_at' AND NOT is_sort_desc THEN fr.job_app->>'applied_at'
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

grant delete on table "public"."new_application" to "anon";

grant insert on table "public"."new_application" to "anon";

grant references on table "public"."new_application" to "anon";

grant select on table "public"."new_application" to "anon";

grant trigger on table "public"."new_application" to "anon";

grant truncate on table "public"."new_application" to "anon";

grant update on table "public"."new_application" to "anon";

grant delete on table "public"."new_application" to "authenticated";

grant insert on table "public"."new_application" to "authenticated";

grant references on table "public"."new_application" to "authenticated";

grant select on table "public"."new_application" to "authenticated";

grant trigger on table "public"."new_application" to "authenticated";

grant truncate on table "public"."new_application" to "authenticated";

grant update on table "public"."new_application" to "authenticated";

grant delete on table "public"."new_application" to "service_role";

grant insert on table "public"."new_application" to "service_role";

grant references on table "public"."new_application" to "service_role";

grant select on table "public"."new_application" to "service_role";

grant trigger on table "public"."new_application" to "service_role";

grant truncate on table "public"."new_application" to "service_role";

grant update on table "public"."new_application" to "service_role";

grant delete on table "public"."new_assessment_results" to "anon";

grant insert on table "public"."new_assessment_results" to "anon";

grant references on table "public"."new_assessment_results" to "anon";

grant select on table "public"."new_assessment_results" to "anon";

grant trigger on table "public"."new_assessment_results" to "anon";

grant truncate on table "public"."new_assessment_results" to "anon";

grant update on table "public"."new_assessment_results" to "anon";

grant delete on table "public"."new_assessment_results" to "authenticated";

grant insert on table "public"."new_assessment_results" to "authenticated";

grant references on table "public"."new_assessment_results" to "authenticated";

grant select on table "public"."new_assessment_results" to "authenticated";

grant trigger on table "public"."new_assessment_results" to "authenticated";

grant truncate on table "public"."new_assessment_results" to "authenticated";

grant update on table "public"."new_assessment_results" to "authenticated";

grant delete on table "public"."new_assessment_results" to "service_role";

grant insert on table "public"."new_assessment_results" to "service_role";

grant references on table "public"."new_assessment_results" to "service_role";

grant select on table "public"."new_assessment_results" to "service_role";

grant trigger on table "public"."new_assessment_results" to "service_role";

grant truncate on table "public"."new_assessment_results" to "service_role";

grant update on table "public"."new_assessment_results" to "service_role";

grant delete on table "public"."new_candidate" to "anon";

grant insert on table "public"."new_candidate" to "anon";

grant references on table "public"."new_candidate" to "anon";

grant select on table "public"."new_candidate" to "anon";

grant trigger on table "public"."new_candidate" to "anon";

grant truncate on table "public"."new_candidate" to "anon";

grant update on table "public"."new_candidate" to "anon";

grant delete on table "public"."new_candidate" to "authenticated";

grant insert on table "public"."new_candidate" to "authenticated";

grant references on table "public"."new_candidate" to "authenticated";

grant select on table "public"."new_candidate" to "authenticated";

grant trigger on table "public"."new_candidate" to "authenticated";

grant truncate on table "public"."new_candidate" to "authenticated";

grant update on table "public"."new_candidate" to "authenticated";

grant delete on table "public"."new_candidate" to "service_role";

grant insert on table "public"."new_candidate" to "service_role";

grant references on table "public"."new_candidate" to "service_role";

grant select on table "public"."new_candidate" to "service_role";

grant trigger on table "public"."new_candidate" to "service_role";

grant truncate on table "public"."new_candidate" to "service_role";

grant update on table "public"."new_candidate" to "service_role";

grant delete on table "public"."new_candidate_files" to "anon";

grant insert on table "public"."new_candidate_files" to "anon";

grant references on table "public"."new_candidate_files" to "anon";

grant select on table "public"."new_candidate_files" to "anon";

grant trigger on table "public"."new_candidate_files" to "anon";

grant truncate on table "public"."new_candidate_files" to "anon";

grant update on table "public"."new_candidate_files" to "anon";

grant delete on table "public"."new_candidate_files" to "authenticated";

grant insert on table "public"."new_candidate_files" to "authenticated";

grant references on table "public"."new_candidate_files" to "authenticated";

grant select on table "public"."new_candidate_files" to "authenticated";

grant trigger on table "public"."new_candidate_files" to "authenticated";

grant truncate on table "public"."new_candidate_files" to "authenticated";

grant update on table "public"."new_candidate_files" to "authenticated";

grant delete on table "public"."new_candidate_files" to "service_role";

grant insert on table "public"."new_candidate_files" to "service_role";

grant references on table "public"."new_candidate_files" to "service_role";

grant select on table "public"."new_candidate_files" to "service_role";

grant trigger on table "public"."new_candidate_files" to "service_role";

grant truncate on table "public"."new_candidate_files" to "service_role";

grant update on table "public"."new_candidate_files" to "service_role";

create policy "authenticated_read_access_only"
on "public"."new_application"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM public_jobs
  WHERE (public_jobs.id = new_application.job_id))));


create policy "authenticated_read_access_only"
on "public"."new_assessment_results"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM new_application
  WHERE (new_application.id = new_assessment_results.application_id))));


create policy "authenticated_access_only"
on "public"."new_candidate"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = recruiter.id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = recruiter.id))));


create policy "authenticated_read_access_only"
on "public"."new_candidate_files"
as permissive
for select
to authenticated
using (((EXISTS ( SELECT 1
   FROM new_application
  WHERE (new_application.candidate_file_id = new_application.id))) OR (EXISTS ( SELECT 1
   FROM new_candidate
  WHERE (new_candidate.id = new_candidate_files.candidate_id)))));


create policy "anon_read_only"
on "public"."public_jobs"
as permissive
for select
to anon
using ((status = 'published'::text));


create policy "authenticated_access_only"
on "public"."public_jobs"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = public_jobs.recruiter_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = public_jobs.recruiter_id))));


create policy "authenticated_and_admin_acess_only"
on "public"."recruiter"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter_user
  WHERE ((recruiter_user.recruiter_id = recruiter.id) OR (recruiter_user.email = recruiter.email)))))
with check ((EXISTS ( SELECT 1
   FROM recruiter_user
  WHERE ((recruiter_user.user_id = auth.uid()) AND (recruiter_user.role = 'admin'::text)))));


create policy "authenticated_access_only"
on "public"."recruiter_user"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



