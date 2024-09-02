create table "public"."candidate_portal_job" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "banner" text,
    "images" text[],
    "job_id" uuid default gen_random_uuid(),
    "application_id" uuid default gen_random_uuid(),
    "greetings" text
);


alter table "public"."candidate_portal_job" enable row level security;

create table "public"."candidate_portal_message" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "application_id" uuid default gen_random_uuid(),
    "message" text,
    "sender_id" uuid default gen_random_uuid(),
    "is_readed" boolean,
    "title" text
);


alter table "public"."candidate_portal_message" enable row level security;

create table "public"."candidate_portal_plan" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "stage_name" text,
    "stage" numeric,
    "is_completed" boolean,
    "application_id" uuid default gen_random_uuid()
);


alter table "public"."candidate_portal_plan" enable row level security;

CREATE UNIQUE INDEX candidate_interview_plan_pkey ON public.candidate_portal_plan USING btree (id);

CREATE UNIQUE INDEX candidate_portal_job_pkey ON public.candidate_portal_job USING btree (id);

CREATE UNIQUE INDEX candidate_portal_message_pkey ON public.candidate_portal_message USING btree (id);

alter table "public"."candidate_portal_job" add constraint "candidate_portal_job_pkey" PRIMARY KEY using index "candidate_portal_job_pkey";

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_pkey" PRIMARY KEY using index "candidate_portal_message_pkey";

alter table "public"."candidate_portal_plan" add constraint "candidate_interview_plan_pkey" PRIMARY KEY using index "candidate_interview_plan_pkey";

alter table "public"."candidate_portal_job" add constraint "candidate_portal_job_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) not valid;

alter table "public"."candidate_portal_job" validate constraint "candidate_portal_job_application_id_fkey";

alter table "public"."candidate_portal_job" add constraint "candidate_portal_job_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) not valid;

alter table "public"."candidate_portal_job" validate constraint "candidate_portal_job_job_id_fkey";

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) not valid;

alter table "public"."candidate_portal_message" validate constraint "candidate_portal_message_application_id_fkey";

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES recruiter_user(user_id) not valid;

alter table "public"."candidate_portal_message" validate constraint "candidate_portal_message_sender_id_fkey";

alter table "public"."candidate_portal_plan" add constraint "candidate_interview_plan_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_portal_plan" validate constraint "candidate_interview_plan_application_id_fkey";

grant delete on table "public"."candidate_portal_job" to "anon";

grant insert on table "public"."candidate_portal_job" to "anon";

grant references on table "public"."candidate_portal_job" to "anon";

grant select on table "public"."candidate_portal_job" to "anon";

grant trigger on table "public"."candidate_portal_job" to "anon";

grant truncate on table "public"."candidate_portal_job" to "anon";

grant update on table "public"."candidate_portal_job" to "anon";

grant delete on table "public"."candidate_portal_job" to "authenticated";

grant insert on table "public"."candidate_portal_job" to "authenticated";

grant references on table "public"."candidate_portal_job" to "authenticated";

grant select on table "public"."candidate_portal_job" to "authenticated";

grant trigger on table "public"."candidate_portal_job" to "authenticated";

grant truncate on table "public"."candidate_portal_job" to "authenticated";

grant update on table "public"."candidate_portal_job" to "authenticated";

grant delete on table "public"."candidate_portal_job" to "service_role";

grant insert on table "public"."candidate_portal_job" to "service_role";

grant references on table "public"."candidate_portal_job" to "service_role";

grant select on table "public"."candidate_portal_job" to "service_role";

grant trigger on table "public"."candidate_portal_job" to "service_role";

grant truncate on table "public"."candidate_portal_job" to "service_role";

grant update on table "public"."candidate_portal_job" to "service_role";

grant delete on table "public"."candidate_portal_message" to "anon";

grant insert on table "public"."candidate_portal_message" to "anon";

grant references on table "public"."candidate_portal_message" to "anon";

grant select on table "public"."candidate_portal_message" to "anon";

grant trigger on table "public"."candidate_portal_message" to "anon";

grant truncate on table "public"."candidate_portal_message" to "anon";

grant update on table "public"."candidate_portal_message" to "anon";

grant delete on table "public"."candidate_portal_message" to "authenticated";

grant insert on table "public"."candidate_portal_message" to "authenticated";

grant references on table "public"."candidate_portal_message" to "authenticated";

grant select on table "public"."candidate_portal_message" to "authenticated";

grant trigger on table "public"."candidate_portal_message" to "authenticated";

grant truncate on table "public"."candidate_portal_message" to "authenticated";

grant update on table "public"."candidate_portal_message" to "authenticated";

grant delete on table "public"."candidate_portal_message" to "service_role";

grant insert on table "public"."candidate_portal_message" to "service_role";

grant references on table "public"."candidate_portal_message" to "service_role";

grant select on table "public"."candidate_portal_message" to "service_role";

grant trigger on table "public"."candidate_portal_message" to "service_role";

grant truncate on table "public"."candidate_portal_message" to "service_role";

grant update on table "public"."candidate_portal_message" to "service_role";

grant delete on table "public"."candidate_portal_plan" to "anon";

grant insert on table "public"."candidate_portal_plan" to "anon";

grant references on table "public"."candidate_portal_plan" to "anon";

grant select on table "public"."candidate_portal_plan" to "anon";

grant trigger on table "public"."candidate_portal_plan" to "anon";

grant truncate on table "public"."candidate_portal_plan" to "anon";

grant update on table "public"."candidate_portal_plan" to "anon";

grant delete on table "public"."candidate_portal_plan" to "authenticated";

grant insert on table "public"."candidate_portal_plan" to "authenticated";

grant references on table "public"."candidate_portal_plan" to "authenticated";

grant select on table "public"."candidate_portal_plan" to "authenticated";

grant trigger on table "public"."candidate_portal_plan" to "authenticated";

grant truncate on table "public"."candidate_portal_plan" to "authenticated";

grant update on table "public"."candidate_portal_plan" to "authenticated";

grant delete on table "public"."candidate_portal_plan" to "service_role";

grant insert on table "public"."candidate_portal_plan" to "service_role";

grant references on table "public"."candidate_portal_plan" to "service_role";

grant select on table "public"."candidate_portal_plan" to "service_role";

grant trigger on table "public"."candidate_portal_plan" to "service_role";

grant truncate on table "public"."candidate_portal_plan" to "service_role";

grant update on table "public"."candidate_portal_plan" to "service_role";


