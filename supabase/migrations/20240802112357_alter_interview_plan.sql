alter table "public"."interview_plan" drop constraint "interview_plan_job_id_key";

drop index if exists "public"."interview_plan_job_id_key";

alter table "public"."interview_plan" add column "iaActive" boolean;

alter table "public"."interview_plan" add column "name" text not null default ''::text;

alter table "public"."interview_plan" add column "order" numeric not null default '0'::numeric;


