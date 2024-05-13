drop function if exists "public"."match_job_applications"(query_embedding vector, match_threshold double precision, match_count integer, recruiter_id uuid);

alter table "public"."rp_token_usage" drop constraint "rp_token_usage_pkey";

drop index if exists "public"."rp_token_usage_pkey";

drop table "public"."rp_token_usage";

alter table "public"."job_applications" add column "used_token" jsonb[] not null default '{}'::jsonb[];

alter table "public"."public_jobs" drop column "video_assessment";

alter table "public"."recruiter" drop column "video_assessment";


