alter table "public"."candidate_request_availability"
add column "slots" jsonb;
alter table "public"."candidate_request_availability" drop column "id";

alter table "public"."candidate_request_availability" add column "id" uuid not null;

CREATE UNIQUE INDEX candidate_request_availability_pkey ON public.candidate_request_availability USING btree (id);

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_pkey" PRIMARY KEY using index "candidate_request_availability_pkey";