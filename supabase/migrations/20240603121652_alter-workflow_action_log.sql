alter table "public"."workflow_action_logs" drop constraint "workflow_action_logs_application_id_fkey";

alter table "public"."workflow_action_logs" drop column "application_id";

alter table "public"."workflow_action_logs" add column "meta" jsonb;
