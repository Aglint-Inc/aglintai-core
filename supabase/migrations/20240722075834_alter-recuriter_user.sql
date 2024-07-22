alter table "public"."recruiter_user" add column "status" text;

alter table "public"."recruiter_user" add constraint "recruiter_user_status_check" CHECK ((status = ANY (ARRAY['invited'::text, 'active'::text, 'suspended'::text]))) not valid;

alter table "public"."recruiter_user" validate constraint "recruiter_user_status_check";

UPDATE recruiter_user
SET status = 
  CASE 
    WHEN is_suspended THEN 'suspend'
    WHEN join_status = 'joined' THEN 'active'
    ELSE 'invited'
  END;

ALTER TABLE "public"."recruiter_user"
ALTER COLUMN "status" SET NOT NULL;

alter table "public"."recruiter_user" drop column "is_suspended";

alter table "public"."recruiter_user" drop column "join_status";
