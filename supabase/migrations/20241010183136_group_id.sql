alter table "public"."public_jobs" alter column "parameter_weights" set default '{"skills": 0, "education": 0, "experience": 0}'::jsonb;

alter table "public"."request_progress" drop column "target_api";

alter table "public"."request_progress" add column "grouped_progress_id" uuid not null;


