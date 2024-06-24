revoke delete on table "public"."scheduling-agent-chat-history" from "anon";

revoke insert on table "public"."scheduling-agent-chat-history" from "anon";

revoke references on table "public"."scheduling-agent-chat-history" from "anon";

revoke select on table "public"."scheduling-agent-chat-history" from "anon";

revoke trigger on table "public"."scheduling-agent-chat-history" from "anon";

revoke truncate on table "public"."scheduling-agent-chat-history" from "anon";

revoke update on table "public"."scheduling-agent-chat-history" from "anon";

revoke delete on table "public"."scheduling-agent-chat-history" from "authenticated";

revoke insert on table "public"."scheduling-agent-chat-history" from "authenticated";

revoke references on table "public"."scheduling-agent-chat-history" from "authenticated";

revoke select on table "public"."scheduling-agent-chat-history" from "authenticated";

revoke trigger on table "public"."scheduling-agent-chat-history" from "authenticated";

revoke truncate on table "public"."scheduling-agent-chat-history" from "authenticated";

revoke update on table "public"."scheduling-agent-chat-history" from "authenticated";

revoke delete on table "public"."scheduling-agent-chat-history" from "service_role";

revoke insert on table "public"."scheduling-agent-chat-history" from "service_role";

revoke references on table "public"."scheduling-agent-chat-history" from "service_role";

revoke select on table "public"."scheduling-agent-chat-history" from "service_role";

revoke trigger on table "public"."scheduling-agent-chat-history" from "service_role";

revoke truncate on table "public"."scheduling-agent-chat-history" from "service_role";

revoke update on table "public"."scheduling-agent-chat-history" from "service_role";

alter table "public"."scheduling-agent-chat-history" drop constraint "public_scheduling-agent-chat-history_application_id_fkey";

alter table "public"."scheduling-agent-chat-history" drop constraint "public_scheduling-agent-chat-history_company_id_fkey";

alter table "public"."scheduling-agent-chat-history" drop constraint "public_scheduling-agent-chat-history_filter_json_id_fkey";

alter table "public"."scheduling-agent-chat-history" drop constraint "public_scheduling-agent-chat-history_job_id_fkey";

alter table "public"."scheduling-agent-chat-history" drop constraint "public_scheduling-agent-chat-history_task_id_fkey";

alter table "public"."scheduling-agent-chat-history" drop constraint "scheduling-agent-chat-history_filter_json_id_key";

alter table "public"."scheduling-agent-chat-history" drop constraint "scheduling-agent-chat-history_pkey";

drop index if exists "public"."scheduling-agent-chat-history_filter_json_id_key";

drop index if exists "public"."scheduling-agent-chat-history_pkey";

drop table "public"."scheduling-agent-chat-history";

create table "public"."scheduling_agent_chat_history" (
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid,
    "job_id" uuid not null,
    "chat_history" jsonb[] not null default '{}'::jsonb[],
    "company_id" uuid,
    "filter_json_id" uuid not null,
    "task_id" uuid,
    "agent_processing" boolean not null default false,
    "thread_id" uuid not null,
    "email_from_name" text not null,
    "email_subject" text not null
);


alter table "public"."scheduling_agent_chat_history" enable row level security;

CREATE UNIQUE INDEX "scheduling-agent-chat-history_filter_json_id_key" ON public.scheduling_agent_chat_history USING btree (filter_json_id);

CREATE UNIQUE INDEX "scheduling-agent-chat-history_pkey" ON public.scheduling_agent_chat_history USING btree (filter_json_id, thread_id);

alter table "public"."scheduling_agent_chat_history" add constraint "scheduling-agent-chat-history_pkey" PRIMARY KEY using index "scheduling-agent-chat-history_pkey";

alter table "public"."scheduling_agent_chat_history" add constraint "public_scheduling-agent-chat-history_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."scheduling_agent_chat_history" validate constraint "public_scheduling-agent-chat-history_application_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "public_scheduling-agent-chat-history_company_id_fkey" FOREIGN KEY (company_id) REFERENCES recruiter(id) not valid;

alter table "public"."scheduling_agent_chat_history" validate constraint "public_scheduling-agent-chat-history_company_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "public_scheduling-agent-chat-history_filter_json_id_fkey" FOREIGN KEY (filter_json_id) REFERENCES interview_filter_json(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."scheduling_agent_chat_history" validate constraint "public_scheduling-agent-chat-history_filter_json_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "public_scheduling-agent-chat-history_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) not valid;

alter table "public"."scheduling_agent_chat_history" validate constraint "public_scheduling-agent-chat-history_job_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "public_scheduling-agent-chat-history_task_id_fkey" FOREIGN KEY (task_id) REFERENCES new_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."scheduling_agent_chat_history" validate constraint "public_scheduling-agent-chat-history_task_id_fkey";

alter table "public"."scheduling_agent_chat_history" add constraint "scheduling-agent-chat-history_filter_json_id_key" UNIQUE using index "scheduling-agent-chat-history_filter_json_id_key";

grant delete on table "public"."scheduling_agent_chat_history" to "anon";

grant insert on table "public"."scheduling_agent_chat_history" to "anon";

grant references on table "public"."scheduling_agent_chat_history" to "anon";

grant select on table "public"."scheduling_agent_chat_history" to "anon";

grant trigger on table "public"."scheduling_agent_chat_history" to "anon";

grant truncate on table "public"."scheduling_agent_chat_history" to "anon";

grant update on table "public"."scheduling_agent_chat_history" to "anon";

grant delete on table "public"."scheduling_agent_chat_history" to "authenticated";

grant insert on table "public"."scheduling_agent_chat_history" to "authenticated";

grant references on table "public"."scheduling_agent_chat_history" to "authenticated";

grant select on table "public"."scheduling_agent_chat_history" to "authenticated";

grant trigger on table "public"."scheduling_agent_chat_history" to "authenticated";

grant truncate on table "public"."scheduling_agent_chat_history" to "authenticated";

grant update on table "public"."scheduling_agent_chat_history" to "authenticated";

grant delete on table "public"."scheduling_agent_chat_history" to "service_role";

grant insert on table "public"."scheduling_agent_chat_history" to "service_role";

grant references on table "public"."scheduling_agent_chat_history" to "service_role";

grant select on table "public"."scheduling_agent_chat_history" to "service_role";

grant trigger on table "public"."scheduling_agent_chat_history" to "service_role";

grant truncate on table "public"."scheduling_agent_chat_history" to "service_role";

grant update on table "public"."scheduling_agent_chat_history" to "service_role";


