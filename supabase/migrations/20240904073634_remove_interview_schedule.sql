revoke delete on table "public"."interview_schedule" from "anon";

revoke insert on table "public"."interview_schedule" from "anon";

revoke references on table "public"."interview_schedule" from "anon";

revoke select on table "public"."interview_schedule" from "anon";

revoke trigger on table "public"."interview_schedule" from "anon";

revoke truncate on table "public"."interview_schedule" from "anon";

revoke update on table "public"."interview_schedule" from "anon";

revoke delete on table "public"."interview_schedule" from "authenticated";

revoke insert on table "public"."interview_schedule" from "authenticated";

revoke references on table "public"."interview_schedule" from "authenticated";

revoke select on table "public"."interview_schedule" from "authenticated";

revoke trigger on table "public"."interview_schedule" from "authenticated";

revoke truncate on table "public"."interview_schedule" from "authenticated";

revoke update on table "public"."interview_schedule" from "authenticated";

revoke delete on table "public"."interview_schedule" from "service_role";

revoke insert on table "public"."interview_schedule" from "service_role";

revoke references on table "public"."interview_schedule" from "service_role";

revoke select on table "public"."interview_schedule" from "service_role";

revoke trigger on table "public"."interview_schedule" from "service_role";

revoke truncate on table "public"."interview_schedule" from "service_role";

revoke update on table "public"."interview_schedule" from "service_role";

alter table "public"."interview_schedule" drop constraint "interview_schedule_application_id_fkey";

alter table "public"."interview_schedule" drop constraint "interview_schedule_application_id_key";

alter table "public"."interview_schedule" drop constraint "interview_schedule_created_by_fkey";

alter table "public"."interview_schedule" drop constraint "public_interview_schedule_coordinator_id_fkey";

alter table "public"."interview_schedule" drop constraint "public_interview_schedule_recruiter_id_fkey";

alter table "public"."interview_schedule" drop constraint "interview_schedule_pkey";

drop index if exists "public"."interview_schedule_application_id_key";

drop index if exists "public"."interview_schedule_pkey";

drop table "public"."interview_schedule";


