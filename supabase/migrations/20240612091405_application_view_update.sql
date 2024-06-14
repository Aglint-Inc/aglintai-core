drop view if exists "public"."application_view";

drop table if exists "public"."application_email_status";

create table "public"."application_email_status" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid not null,
    "email" email_types not null
);

CREATE UNIQUE INDEX application_email_status_pkey ON public.application_email_status USING btree (id);

alter table "public"."application_email_status" add constraint "application_email_status_pkey" PRIMARY KEY using index "application_email_status_pkey";

alter table "public"."application_email_status" add constraint "application_email_status_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."application_email_status" validate constraint "application_email_status_application_id_fkey";

set check_function_bodies = off;

create or replace view "public"."application_view" as  SELECT applications.id,
    applications.job_id,
    applications.created_at,
    applications.applied_at,
    applications.overall_score AS resume_score,
    applications.overall_interview_score AS interview_score,
    applications.processing_status,
    applications.bookmarked,
    applications.is_new,
    applications.status,
    (applications.score_json -> 'badges'::text) AS badges,
    candidates.candidate_id,
    candidates.email,
    candidates.name,
    candidates.city,
    candidates.linkedin,
    candidates.phone,
    candidates.state,
    candidates.country,
    candidates.current_job_title,
    meeting_details.meeting_details,
    applications.candidate_file_id,
    candidate_files.file_url,
    email_statuses.email_status,
    (
        CASE
            WHEN ((candidate_files.resume_json IS NOT NULL) OR (candidate_files.file_url IS NOT NULL)) THEN
            CASE
                WHEN (applications.is_resume_fetching = true) THEN 'fetching'::text
                WHEN ((applications.processing_status = 'processing'::application_processing_status) OR (applications.processing_status = 'not started'::application_processing_status)) THEN 'processing'::text
                WHEN (applications.score_json IS NOT NULL) THEN 'processed'::text
                ELSE 'unparsable'::text
            END
            ELSE 'unavailable'::text
        END)::resume_processing_state AS resume_processing_state
   FROM ((((applications
     LEFT JOIN ( SELECT candidates_1.id AS candidate_id,
            candidates_1.email,
            (((candidates_1.first_name)::text || ' '::text) || (candidates_1.last_name)::text) AS name,
            candidates_1.city,
            candidates_1.linkedin,
            candidates_1.phone,
            candidates_1.state,
            candidates_1.country,
            candidates_1.current_job_title
           FROM candidates candidates_1) candidates ON ((candidates.candidate_id = applications.candidate_id)))
     LEFT JOIN ( SELECT application_email_status.application_id,
            jsonb_build_object(application_email_status.email, application_email_status.created_at) AS email_status
           FROM application_email_status) email_statuses ON ((email_statuses.application_id = applications.id)))
     LEFT JOIN ( SELECT meeting_details_1.application_id,
            jsonb_agg(meeting_details_1.*) AS meeting_details
           FROM meeting_details meeting_details_1
          GROUP BY meeting_details_1.application_id) meeting_details ON ((meeting_details.application_id = applications.id)))
     LEFT JOIN ( SELECT candidate_files_1.id,
            candidate_files_1.resume_json,
            candidate_files_1.file_url
           FROM candidate_files candidate_files_1) candidate_files ON ((candidate_files.id = applications.candidate_file_id)));

grant delete on table "public"."application_email_status" to "anon";

grant insert on table "public"."application_email_status" to "anon";

grant references on table "public"."application_email_status" to "anon";

grant select on table "public"."application_email_status" to "anon";

grant trigger on table "public"."application_email_status" to "anon";

grant truncate on table "public"."application_email_status" to "anon";

grant update on table "public"."application_email_status" to "anon";

grant delete on table "public"."application_email_status" to "authenticated";

grant insert on table "public"."application_email_status" to "authenticated";

grant references on table "public"."application_email_status" to "authenticated";

grant select on table "public"."application_email_status" to "authenticated";

grant trigger on table "public"."application_email_status" to "authenticated";

grant truncate on table "public"."application_email_status" to "authenticated";

grant update on table "public"."application_email_status" to "authenticated";

grant delete on table "public"."application_email_status" to "service_role";

grant insert on table "public"."application_email_status" to "service_role";

grant references on table "public"."application_email_status" to "service_role";

grant select on table "public"."application_email_status" to "service_role";

grant trigger on table "public"."application_email_status" to "service_role";

grant truncate on table "public"."application_email_status" to "service_role";

grant update on table "public"."application_email_status" to "service_role";