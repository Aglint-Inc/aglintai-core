alter table "public"."applications" alter column "source" drop default;

alter type "public"."application_source" rename to "application_source__old_version_to_be_dropped";

create type "public"."application_source" as enum ('ashby', 'lever', 'greenhouse', 'resume_upload', 'manual_upload', 'csv_upload', 'apply_link', 'candidate_database');

alter table "public"."applications" alter column source type "public"."application_source" using source::text::"public"."application_source";

alter table "public"."applications" alter column "source" set default 'manual_upload'::application_source;

drop type "public"."application_source__old_version_to_be_dropped";


