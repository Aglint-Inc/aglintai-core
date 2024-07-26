create type "public"."workflow_cron_run_status" as enum ('not_started', 'processing', 'failed', 'success', 'stopped');

create type "public"."workflow_type" as enum ('system', 'job');

alter table "public"."workflow_action" drop constraint "workflow_action_email_template_id_fkey";

alter table "public"."workflow" add column "is_paused" boolean not null default false;

alter table "public"."workflow" add column "workflow_type" workflow_type not null default 'system'::workflow_type;

alter table "public"."workflow_action" drop column "email_template_id";

alter table "public"."workflow_action" add column "target_api" text not null;

alter table "public"."workflow_action_logs" add column "related_table_name" text not null;

alter table "public"."workflow_action_logs" add column "related_table_primary_key" uuid not null;

alter table "public"."workflow_action_logs" drop column "status" ;
alter table "public"."workflow_action_logs" add column "status" workflow_cron_run_status not null default 'not_started'::workflow_cron_run_status;

alter table "public"."workflow_action_logs" alter column "status" set data type workflow_cron_run_status using "status"::text::workflow_cron_run_status;

alter table "public"."workflow_action" add constraint "target_check" CHECK ((target_api = ANY (ARRAY['onQualified_slack_trainee'::text, 'onQualified_email_trainee'::text, 'onTrainingComplete_slack_approverForTraineeMeetingQualification'::text, 'onTrainingComplete_email_approverForTraineeMeetingQualification'::text, 'interviewEnd_slack_shadowTraineeForMeetingAttendence'::text, 'interviewEnd_slack_rShadowTraineeForMeetingAttendence'::text, 'interviewEnd_email_rShadowTraineeForMeetingAttendence'::text, 'interviewEnd_email_shadowTraineeForMeetingAttendence'::text, 'interviewEnd_email_organizerForMeetingStatus'::text, 'interviewEnd_slack_organizerForMeetingStatus'::text]))) not valid;

alter table "public"."workflow_action" validate constraint "target_check";