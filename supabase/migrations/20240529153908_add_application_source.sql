create type "public"."application_source" as enum ('ashby', 'lever', 'greenhouse', 'resume_upload', 'manual_upload', 'csv_upload', 'apply_link');

alter table "public"."applications" add column "source" application_source not null default 'manual_upload'::application_source;


