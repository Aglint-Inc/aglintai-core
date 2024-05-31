alter table "public"."application_logs" alter column "logged_by" drop default;

alter type "public"."application_logger" rename to "application_logger__old_version_to_be_dropped";

create type "public"."application_logger" as enum ('email_agent', 'phone_agent', 'user', 'system', 'candidate');

alter table "public"."application_logs" alter column logged_by type "public"."application_logger" using logged_by::text::"public"."application_logger";

alter table "public"."application_logs" alter column "logged_by" set default 'system'::application_logger;

drop type "public"."application_logger__old_version_to_be_dropped";