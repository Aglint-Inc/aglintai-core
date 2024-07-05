CREATE UNIQUE INDEX request_session_relation_session_id_key ON public.request_session_relation USING btree (session_id);

alter table "public"."request_session_relation" add constraint "request_session_relation_session_id_key" UNIQUE using index "request_session_relation_session_id_key";


