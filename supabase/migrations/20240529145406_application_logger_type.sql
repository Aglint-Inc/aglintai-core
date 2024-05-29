create type "public"."application_logger" as enum ('email_agent', 'phone_agent', 'user', 'system');

alter table "public"."application_logs" drop constraint "application_logs_filter_id_fkey";

alter table "public"."application_logs" drop column "filter_id";

alter table "public"."application_logs" drop column "logger";

alter table "public"."application_logs" add column "logged_by" application_logger not null default 'system'::application_logger;


