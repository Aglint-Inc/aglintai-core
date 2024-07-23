alter table "public"."recruiter" add column "primary_admin" uuid;

alter table "public"."recruiter" add constraint "recruiter_primary_admin_fkey" FOREIGN KEY (primary_admin) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."recruiter" validate constraint "recruiter_primary_admin_fkey";
