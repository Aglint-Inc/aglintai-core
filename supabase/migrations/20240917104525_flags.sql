alter table "public"."recruiter_preferences" add column "agent" boolean not null default false;

alter table "public"."recruiter_preferences" add column "reports" boolean not null default false;

alter table "public"."recruiter_preferences" add column "themes" boolean not null default false;


