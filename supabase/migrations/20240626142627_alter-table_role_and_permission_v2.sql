alter table "public"."permissions" drop constraint "permissions_recruiter_id_fkey";

alter table "public"."role_permissions" drop constraint "role_permissions_permission_id_fkey";

alter table "public"."role_permissions" drop constraint "role_permissions_recruiter_id_fkey";

alter table "public"."role_permissions" drop constraint "role_permissions_role_id_fkey";

alter table "public"."roles" drop constraint "roles_recruiter_id_fkey";

alter table "public"."permissions" drop column "recruiter_id";

alter table "public"."role_permissions" add constraint "role_permissions_permission_id_fkey" FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_permission_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_recruiter_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_role_id_fkey";

alter table "public"."roles" add constraint "roles_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."roles" validate constraint "roles_recruiter_id_fkey";

CREATE TRIGGER new_recruiter AFTER INSERT ON public.recruiter FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request(
  'https://dev.aglinthq.com/api/pre-seed' -- deployed app url
  , 'POST', '{"Content-type":"application/json"}', '{}', '1000');


