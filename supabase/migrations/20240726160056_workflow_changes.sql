create type "public"."workflow_cron_run_status" as enum ('not_started', 'processing', 'failed', 'success', 'stopped');

create type "public"."workflow_cron_trigger_tables" as enum ('interview_meeting', 'interview_session_relation');

create type "public"."workflow_type" as enum ('system', 'job');

alter table "public"."workflow_action" drop constraint "workflow_action_email_template_id_fkey";

alter table "public"."workflow" add column "is_paused" boolean not null;

alter table "public"."workflow" add column "workflow_type" workflow_type not null;

alter table "public"."workflow_action" drop column "email_template_id";

alter table "public"."workflow_action" add column "target_api" email_slack_types not null;

alter table "public"."workflow_action_logs" add column "related_table" workflow_cron_trigger_tables not null;

alter table "public"."workflow_action_logs" add column "related_table_pkey" uuid not null;

alter table "public"."workflow_action_logs" alter column "status" set default 'not_started'::workflow_cron_run_status;

alter table "public"."workflow_action_logs" alter column "status" set data type workflow_cron_run_status using "status"::text::workflow_cron_run_status;


