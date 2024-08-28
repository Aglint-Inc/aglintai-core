alter table "public"."request_progress" add column "updated_at" timestamp with time zone not null default now();


