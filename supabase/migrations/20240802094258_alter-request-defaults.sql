alter table "public"."request" alter column "status" set default 'to_do'::text;

alter table "public"."request_relation" alter column "cancel_id" drop default;

alter table "public"."request_relation" alter column "request_id" drop default;

alter table "public"."request_relation" alter column "session_id" drop default;
