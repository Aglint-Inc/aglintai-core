alter table "public"."workflow" add column "recruiter_id" uuid;

alter table "public"."workflow" add constraint "workflow_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow" validate constraint "workflow_recruiter_id_fkey";


