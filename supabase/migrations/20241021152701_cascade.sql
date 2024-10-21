alter table "public"."request" drop constraint "request_application_id_fkey";

alter table "public"."request_relation" drop constraint "request_relation_session_id_fkey";

alter table "public"."request_relation" alter column "session_id" set not null;

alter table "public"."request" add constraint "request_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request" validate constraint "request_application_id_fkey";

alter table "public"."request_relation" add constraint "request_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request_relation" validate constraint "request_relation_session_id_fkey";


