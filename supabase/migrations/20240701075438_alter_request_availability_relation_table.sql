alter table "public"."request_availability_relation" drop constraint "request_availability_relation_session_id_fkey";

alter table "public"."request_availability_relation" drop column "session_id";

alter table "public"."request_availability_relation" alter column "id" set default gen_random_uuid();

alter table "public"."request_availability_relation" alter column "id" drop identity;

alter table "public"."request_availability_relation" alter column "id" set data type uuid using "id"::uuid;


