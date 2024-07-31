alter table "public"."recruiter_relation" drop constraint "recruiter_relation_role_id_fkey";

alter table "public"."recruiter_relation" add constraint "recruiter_relation_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL not valid;

alter table "public"."recruiter_relation" validate constraint "recruiter_relation_role_id_fkey";
