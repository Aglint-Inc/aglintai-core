alter table "public"."request" add column "schedule_end_date" timestamp with time zone default now();

alter table "public"."request" add column "schedule_start_date" timestamp with time zone default now();


