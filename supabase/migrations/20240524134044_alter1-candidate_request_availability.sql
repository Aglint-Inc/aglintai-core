alter table "public"."candidate_request_availability" drop constraint "candidate_request_availability_recrruiter_id_fkey";

alter table "public"."candidate_request_availability" drop column "recrruiter_id";

alter table "public"."candidate_request_availability" add column "recruiter_id" uuid not null;

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_request_availability" validate constraint "candidate_request_availability_recruiter_id_fkey";


