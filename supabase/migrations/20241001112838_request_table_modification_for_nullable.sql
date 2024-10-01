alter table "public"."request" alter column "application_id" set not null;

alter table "public"."request" alter column "assignee_id" set not null;

alter table "public"."request" alter column "assigner_id" set not null;

alter table "public"."request" alter column "schedule_end_date" set not null;

alter table "public"."request" alter column "schedule_start_date" set not null;

alter table "public"."request" alter column "title" set not null;


