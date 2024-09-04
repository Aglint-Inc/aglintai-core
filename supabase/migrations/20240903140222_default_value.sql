-- Update all null values in the payload column to the default value
UPDATE public.workflow_action
SET payload = '{}'::jsonb
WHERE payload IS NULL;

alter table "public"."workflow_action" alter column "payload" set default '{}'::jsonb;

alter table "public"."workflow_action" alter column "payload" set not null;


