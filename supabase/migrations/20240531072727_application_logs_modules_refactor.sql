create type "public"."modules" as enum ('standard', 'scheduler', 'assessment', 'jobs');

alter table "public"."application_logs" drop column "type";

alter table "public"."application_logs" add column "module" modules not null default 'standard'::modules;

drop type "public"."application_logs_type";