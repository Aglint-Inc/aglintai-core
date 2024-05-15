alter table "public"."job_applications" drop column "profile_image";

alter table "public"."job_applications" add column "api_status" text not null default 'not started'::text;


