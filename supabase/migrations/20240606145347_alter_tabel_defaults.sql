
alter table "public"."interview_filter_json" alter column "schedule_id" drop default;

alter table "public"."interview_filter_json" alter column "schedule_id" set not null;

alter table "public"."workflow" alter column "phase" set not null;

alter table "public"."workflow" alter column "recruiter_id" set not null;

alter table "public"."workflow_action" alter column "workflow_id" set not null;

alter table "public"."workflow_job_relation" alter column "job_id" set not null;

alter table "public"."workflow_job_relation" alter column "workflow_id" set not null;

