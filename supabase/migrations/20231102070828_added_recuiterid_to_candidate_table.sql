alter table "public"."candidates" add column "recruiter_id" uuid;

alter table "public"."candidates" add constraint "candidates_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE SET NULL not valid;

alter table "public"."candidates" validate constraint "candidates_recruiter_id_fkey";


