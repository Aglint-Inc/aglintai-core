alter table "public"."workflow" alter column "is_paused" set default false;

alter table "public"."workflow" alter column "workflow_type" set default 'system'::workflow_type;


