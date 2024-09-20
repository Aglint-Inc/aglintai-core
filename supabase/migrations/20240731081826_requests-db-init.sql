create table "public"."request" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid default gen_random_uuid(),
    "assigner_id" uuid not null default auth.uid(),
    "assignee_id" uuid default auth.uid(),
    "title" text
);


create table "public"."request_progress" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "request_id" uuid not null default gen_random_uuid(),
    "title" text default ''::text,
    "parent_request_id" uuid,
    "logger_type" text not null
);


create table "public"."request_relation" (
    "id" uuid not null default gen_random_uuid(),
    "request_id" uuid not null default gen_random_uuid(),
    "session_id" uuid default gen_random_uuid(),
    "cancel_id" uuid default gen_random_uuid()
);


CREATE UNIQUE INDEX request_pkey ON public.request USING btree (id);

CREATE UNIQUE INDEX request_progress_pkey ON public.request_progress USING btree (id);

CREATE UNIQUE INDEX request_relation_pkey ON public.request_relation USING btree (id);

alter table "public"."request" add constraint "request_pkey" PRIMARY KEY using index "request_pkey";

alter table "public"."request_progress" add constraint "request_progress_pkey" PRIMARY KEY using index "request_progress_pkey";

alter table "public"."request_relation" add constraint "request_relation_pkey" PRIMARY KEY using index "request_relation_pkey";

alter table "public"."request" add constraint "request_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."request" validate constraint "request_application_id_fkey";

alter table "public"."request" add constraint "request_assignee_id_fkey" FOREIGN KEY (assignee_id) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."request" validate constraint "request_assignee_id_fkey";

alter table "public"."request" add constraint "request_assigner_id_fkey" FOREIGN KEY (assigner_id) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."request" validate constraint "request_assigner_id_fkey";

alter table "public"."request_progress" add constraint "request_progress_logger_type_check" CHECK ((logger_type = ANY (ARRAY['system'::text, 'user'::text, 'candidate'::text, 'email_agent'::text, 'phone_agent'::text]))) not valid;

alter table "public"."request_progress" validate constraint "request_progress_logger_type_check";

alter table "public"."request_progress" add constraint "request_progress_parent_request_id_fkey" FOREIGN KEY (parent_request_id) REFERENCES request_progress(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request_progress" validate constraint "request_progress_parent_request_id_fkey";

alter table "public"."request_progress" add constraint "request_progress_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request_progress" validate constraint "request_progress_request_id_fkey";

alter table "public"."request_relation" add constraint "request_relation_cancel_id_fkey" FOREIGN KEY (cancel_id) REFERENCES interview_session_cancel(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."request_relation" validate constraint "request_relation_cancel_id_fkey";

alter table "public"."request_relation" add constraint "request_relation_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request_relation" validate constraint "request_relation_request_id_fkey";

alter table "public"."request_relation" add constraint "request_relation_session_id_fkey" FOREIGN KEY (session_id) REFERENCES interview_session(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."request_relation" validate constraint "request_relation_session_id_fkey";

grant delete on table "public"."request" to "anon";

grant insert on table "public"."request" to "anon";

grant references on table "public"."request" to "anon";

grant select on table "public"."request" to "anon";

grant trigger on table "public"."request" to "anon";

grant truncate on table "public"."request" to "anon";

grant update on table "public"."request" to "anon";

grant delete on table "public"."request" to "authenticated";

grant insert on table "public"."request" to "authenticated";

grant references on table "public"."request" to "authenticated";

grant select on table "public"."request" to "authenticated";

grant trigger on table "public"."request" to "authenticated";

grant truncate on table "public"."request" to "authenticated";

grant update on table "public"."request" to "authenticated";

grant delete on table "public"."request" to "service_role";

grant insert on table "public"."request" to "service_role";

grant references on table "public"."request" to "service_role";

grant select on table "public"."request" to "service_role";

grant trigger on table "public"."request" to "service_role";

grant truncate on table "public"."request" to "service_role";

grant update on table "public"."request" to "service_role";

grant delete on table "public"."request_progress" to "anon";

grant insert on table "public"."request_progress" to "anon";

grant references on table "public"."request_progress" to "anon";

grant select on table "public"."request_progress" to "anon";

grant trigger on table "public"."request_progress" to "anon";

grant truncate on table "public"."request_progress" to "anon";

grant update on table "public"."request_progress" to "anon";

grant delete on table "public"."request_progress" to "authenticated";

grant insert on table "public"."request_progress" to "authenticated";

grant references on table "public"."request_progress" to "authenticated";

grant select on table "public"."request_progress" to "authenticated";

grant trigger on table "public"."request_progress" to "authenticated";

grant truncate on table "public"."request_progress" to "authenticated";

grant update on table "public"."request_progress" to "authenticated";

grant delete on table "public"."request_progress" to "service_role";

grant insert on table "public"."request_progress" to "service_role";

grant references on table "public"."request_progress" to "service_role";

grant select on table "public"."request_progress" to "service_role";

grant trigger on table "public"."request_progress" to "service_role";

grant truncate on table "public"."request_progress" to "service_role";

grant update on table "public"."request_progress" to "service_role";

grant delete on table "public"."request_relation" to "anon";

grant insert on table "public"."request_relation" to "anon";

grant references on table "public"."request_relation" to "anon";

grant select on table "public"."request_relation" to "anon";

grant trigger on table "public"."request_relation" to "anon";

grant truncate on table "public"."request_relation" to "anon";

grant update on table "public"."request_relation" to "anon";

grant delete on table "public"."request_relation" to "authenticated";

grant insert on table "public"."request_relation" to "authenticated";

grant references on table "public"."request_relation" to "authenticated";

grant select on table "public"."request_relation" to "authenticated";

grant trigger on table "public"."request_relation" to "authenticated";

grant truncate on table "public"."request_relation" to "authenticated";

grant update on table "public"."request_relation" to "authenticated";

grant delete on table "public"."request_relation" to "service_role";

grant insert on table "public"."request_relation" to "service_role";

grant references on table "public"."request_relation" to "service_role";

grant select on table "public"."request_relation" to "service_role";

grant trigger on table "public"."request_relation" to "service_role";

grant truncate on table "public"."request_relation" to "service_role";

grant update on table "public"."request_relation" to "service_role";


