alter table "public"."recruiter_preferences" add column "integrations" boolean not null default false;

alter table "public"."recruiter_preferences" add column "request" boolean not null default false;

alter table "public"."recruiter_preferences" add column "roles" boolean default false;

alter table "public"."recruiter_preferences" add column "scheduling" boolean not null default false;

alter table "public"."recruiter_preferences" add column "workflow" boolean not null default false;


