alter table "public"."candidate_request_availability" add column "application_id" uuid not null;

alter table "public"."candidate_request_availability" add column "recrruiter_id" uuid not null;

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_request_availability" validate constraint "candidate_request_availability_application_id_fkey";

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_recrruiter_id_fkey" FOREIGN KEY (recrruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_request_availability" validate constraint "candidate_request_availability_recrruiter_id_fkey";


