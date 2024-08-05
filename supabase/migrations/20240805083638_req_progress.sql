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

alter table "public"."request_progress" drop constraint "request_progress_logger_type_check";

alter table "public"."request_progress" drop constraint "request_progress_parent_request_id_fkey";

alter table "public"."request_completed_event" drop constraint "request_completed_event_pkey";

drop index if exists "public"."request_completed_event_pkey";

drop table "public"."request_completed_event";

alter table "public"."request_progress" drop column "logger_type";

alter table "public"."request_progress" drop column "parent_request_id";

alter table "public"."request_progress" drop column "title";

alter table "public"."request_progress" add column "event_type" text not null;

alter table "public"."request_progress" add column "log" text not null default ''::text;

alter table "public"."request_progress" add column "log_type" text not null default 'heading'::text;

alter table "public"."request_progress" add column "meta" jsonb;

alter table "public"."request_progress" add column "status" text not null;

alter table "public"."request_progress" alter column "request_id" drop default;

alter publication supabase_realtime add  table public.request_progress;