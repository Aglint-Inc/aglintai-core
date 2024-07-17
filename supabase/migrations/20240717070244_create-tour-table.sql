create table "public"."tour" (
    "recruiter_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "type" text not null
);


alter table "public"."tour" enable row level security;

CREATE UNIQUE INDEX tour_pkey ON public.tour USING btree (recruiter_id, type);

alter table "public"."tour" add constraint "tour_pkey" PRIMARY KEY using index "tour_pkey";

alter table "public"."tour" add constraint "tour_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tour" validate constraint "tour_recruiter_id_fkey";

alter table "public"."tour" add constraint "tour_type_check" CHECK ((type = 'workflow_tip'::text)) not valid;

alter table "public"."tour" validate constraint "tour_type_check";

grant delete on table "public"."tour" to "anon";

grant insert on table "public"."tour" to "anon";

grant references on table "public"."tour" to "anon";

grant select on table "public"."tour" to "anon";

grant trigger on table "public"."tour" to "anon";

grant truncate on table "public"."tour" to "anon";

grant update on table "public"."tour" to "anon";

grant delete on table "public"."tour" to "authenticated";

grant insert on table "public"."tour" to "authenticated";

grant references on table "public"."tour" to "authenticated";

grant select on table "public"."tour" to "authenticated";

grant trigger on table "public"."tour" to "authenticated";

grant truncate on table "public"."tour" to "authenticated";

grant update on table "public"."tour" to "authenticated";

grant delete on table "public"."tour" to "service_role";

grant insert on table "public"."tour" to "service_role";

grant references on table "public"."tour" to "service_role";

grant select on table "public"."tour" to "service_role";

grant trigger on table "public"."tour" to "service_role";

grant truncate on table "public"."tour" to "service_role";

grant update on table "public"."tour" to "service_role";


