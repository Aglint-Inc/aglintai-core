revoke delete on table "public"."request_completed_event" from "anon";

revoke insert on table "public"."request_completed_event" from "anon";

revoke references on table "public"."request_completed_event" from "anon";

revoke select on table "public"."request_completed_event" from "anon";

revoke trigger on table "public"."request_completed_event" from "anon";

revoke truncate on table "public"."request_completed_event" from "anon";

revoke update on table "public"."request_completed_event" from "anon";

revoke delete on table "public"."request_completed_event" from "authenticated";

revoke insert on table "public"."request_completed_event" from "authenticated";

revoke references on table "public"."request_completed_event" from "authenticated";

revoke select on table "public"."request_completed_event" from "authenticated";

revoke trigger on table "public"."request_completed_event" from "authenticated";

revoke truncate on table "public"."request_completed_event" from "authenticated";

revoke update on table "public"."request_completed_event" from "authenticated";

revoke delete on table "public"."request_completed_event" from "service_role";

revoke insert on table "public"."request_completed_event" from "service_role";

revoke references on table "public"."request_completed_event" from "service_role";

revoke select on table "public"."request_completed_event" from "service_role";

revoke trigger on table "public"."request_completed_event" from "service_role";

revoke truncate on table "public"."request_completed_event" from "service_role";

revoke update on table "public"."request_completed_event" from "service_role";

alter table "public"."request_completed_event" drop constraint "public_request_completed_event_request_id_fkey";

alter table "public"."request_completed_event" drop constraint "request_completed_event_pkey";

drop index if exists "public"."request_completed_event_pkey";

drop table "public"."request_completed_event";

create table "public"."scheduling_event_logs" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "request_id" uuid not null,
    "log" text,
    "event_type" text not null,
    "status" text not null,
    "meta" jsonb
);


alter table "public"."scheduling_event_logs" enable row level security;

CREATE UNIQUE INDEX scheduling_event_logs_pkey ON public.scheduling_event_logs USING btree (id);

alter table "public"."scheduling_event_logs" add constraint "scheduling_event_logs_pkey" PRIMARY KEY using index "scheduling_event_logs_pkey";

grant delete on table "public"."scheduling_event_logs" to "anon";

grant insert on table "public"."scheduling_event_logs" to "anon";

grant references on table "public"."scheduling_event_logs" to "anon";

grant select on table "public"."scheduling_event_logs" to "anon";

grant trigger on table "public"."scheduling_event_logs" to "anon";

grant truncate on table "public"."scheduling_event_logs" to "anon";

grant update on table "public"."scheduling_event_logs" to "anon";

grant delete on table "public"."scheduling_event_logs" to "authenticated";

grant insert on table "public"."scheduling_event_logs" to "authenticated";

grant references on table "public"."scheduling_event_logs" to "authenticated";

grant select on table "public"."scheduling_event_logs" to "authenticated";

grant trigger on table "public"."scheduling_event_logs" to "authenticated";

grant truncate on table "public"."scheduling_event_logs" to "authenticated";

grant update on table "public"."scheduling_event_logs" to "authenticated";

grant delete on table "public"."scheduling_event_logs" to "service_role";

grant insert on table "public"."scheduling_event_logs" to "service_role";

grant references on table "public"."scheduling_event_logs" to "service_role";

grant select on table "public"."scheduling_event_logs" to "service_role";

grant trigger on table "public"."scheduling_event_logs" to "service_role";

grant truncate on table "public"."scheduling_event_logs" to "service_role";

grant update on table "public"."scheduling_event_logs" to "service_role";


