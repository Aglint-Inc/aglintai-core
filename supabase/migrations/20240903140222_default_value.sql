alter table "public"."workflow_action" alter column "payload" set default '{}'::jsonb;

alter table "public"."workflow_action" alter column "payload" set not null;


