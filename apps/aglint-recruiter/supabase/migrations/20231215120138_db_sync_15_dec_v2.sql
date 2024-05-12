alter table "public"."job_applications" add column "applied_at" timestamp with time zone not null default now();

alter table "public"."job_applications" add column "is_resume_fetching" boolean default false;


