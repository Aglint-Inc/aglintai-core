alter table "public"."interview_plan" drop constraint "interview_plan_job_id_key";

drop index if exists "public"."interview_plan_job_id_key";

alter table "public"."interview_plan" add column "iaActive" boolean;

alter table "public"."interview_plan" add column "name" text not null default ''::text;

alter table "public"."interview_plan" add column "order" numeric not null default '0'::numeric;

ALTER TABLE "public"."office_locations"
  ADD COLUMN "name" text NOT NULL DEFAULT '';

ALTER TABLE "public"."office_locations"
  ALTER COLUMN "name" DROP DEFAULT;

alter table "public"."departments" add column "remote_id" text;

alter table "public"."office_locations" add column "remote_id" text;

alter table "public"."recruiter_user" add column "remote_id" text;

alter table "public"."integrations" add column "greenhouse_metadata" jsonb default '{}'::jsonb;
