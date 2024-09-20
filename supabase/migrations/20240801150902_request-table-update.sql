alter table "public"."request" add column "status" text not null;

alter table "public"."request" add column "type" text not null;

alter table "public"."request" add constraint "request_status_check" CHECK ((status = ANY (ARRAY['to_do'::text, 'in_progress'::text, 'blocked'::text, 'completed'::text]))) not valid;

alter table "public"."request" validate constraint "request_status_check";

alter table "public"."request" add constraint "request_type_check" CHECK ((type = ANY (ARRAY['schedule_request'::text]))) not valid;

alter table "public"."request" validate constraint "request_type_check";


