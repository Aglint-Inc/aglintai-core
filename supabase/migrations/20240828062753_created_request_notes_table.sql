create table "public"."request_note" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "note" text,
    "updated_at" timestamp with time zone default now(),
    "request_id" uuid default gen_random_uuid(),
    "pinned" boolean default false
);


CREATE UNIQUE INDEX request_note_pkey ON public.request_note USING btree (id);

alter table "public"."request_note" add constraint "request_note_pkey" PRIMARY KEY using index "request_note_pkey";

alter table "public"."request_note" add constraint "request_note_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON DELETE CASCADE not valid;

alter table "public"."request_note" validate constraint "request_note_request_id_fkey";

grant delete on table "public"."request_note" to "anon";

grant insert on table "public"."request_note" to "anon";

grant references on table "public"."request_note" to "anon";

grant select on table "public"."request_note" to "anon";

grant trigger on table "public"."request_note" to "anon";

grant truncate on table "public"."request_note" to "anon";

grant update on table "public"."request_note" to "anon";

grant delete on table "public"."request_note" to "authenticated";

grant insert on table "public"."request_note" to "authenticated";

grant references on table "public"."request_note" to "authenticated";

grant select on table "public"."request_note" to "authenticated";

grant trigger on table "public"."request_note" to "authenticated";

grant truncate on table "public"."request_note" to "authenticated";

grant update on table "public"."request_note" to "authenticated";

grant delete on table "public"."request_note" to "service_role";

grant insert on table "public"."request_note" to "service_role";

grant references on table "public"."request_note" to "service_role";

grant select on table "public"."request_note" to "service_role";

grant trigger on table "public"."request_note" to "service_role";

grant truncate on table "public"."request_note" to "service_role";

grant update on table "public"."request_note" to "service_role";


