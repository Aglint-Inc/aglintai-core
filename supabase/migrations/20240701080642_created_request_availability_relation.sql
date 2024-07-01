create table "public"."request_session_relation" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null default gen_random_uuid(),
    "request_availability_id" uuid not null default gen_random_uuid()
);


alter table "public"."request_session_relation" enable row level security;

CREATE UNIQUE INDEX request_session_relation_pkey ON public.request_session_relation USING btree (id);

alter table "public"."request_session_relation" add constraint "request_session_relation_pkey" PRIMARY KEY using index "request_session_relation_pkey";

alter table "public"."request_session_relation" add constraint "request_session_relation_request_availability_id_fkey" FOREIGN KEY (request_availability_id) REFERENCES candidate_request_availability(id) ON DELETE CASCADE not valid;

alter table "public"."request_session_relation" validate constraint "request_session_relation_request_availability_id_fkey";

alter table "public"."request_session_relation" add constraint "request_session_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE not valid;

alter table "public"."request_session_relation" validate constraint "request_session_relation_session_id_fkey";

grant delete on table "public"."request_session_relation" to "anon";

grant insert on table "public"."request_session_relation" to "anon";

grant references on table "public"."request_session_relation" to "anon";

grant select on table "public"."request_session_relation" to "anon";

grant trigger on table "public"."request_session_relation" to "anon";

grant truncate on table "public"."request_session_relation" to "anon";

grant update on table "public"."request_session_relation" to "anon";

grant delete on table "public"."request_session_relation" to "authenticated";

grant insert on table "public"."request_session_relation" to "authenticated";

grant references on table "public"."request_session_relation" to "authenticated";

grant select on table "public"."request_session_relation" to "authenticated";

grant trigger on table "public"."request_session_relation" to "authenticated";

grant truncate on table "public"."request_session_relation" to "authenticated";

grant update on table "public"."request_session_relation" to "authenticated";

grant delete on table "public"."request_session_relation" to "service_role";

grant insert on table "public"."request_session_relation" to "service_role";

grant references on table "public"."request_session_relation" to "service_role";

grant select on table "public"."request_session_relation" to "service_role";

grant trigger on table "public"."request_session_relation" to "service_role";

grant truncate on table "public"."request_session_relation" to "service_role";

grant update on table "public"."request_session_relation" to "service_role";


