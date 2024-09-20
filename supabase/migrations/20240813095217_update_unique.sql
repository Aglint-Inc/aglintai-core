alter table "public"."request_session_relation" drop constraint "request_session_relation_session_id_key";

drop index if exists "public"."request_session_relation_session_id_key";


