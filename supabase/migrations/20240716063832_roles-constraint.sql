CREATE UNIQUE INDEX roles_recruiter_id_name_unique ON public.roles USING btree (recruiter_id, name);

alter table "public"."roles" add constraint "roles_recruiter_id_name_unique" UNIQUE using index "roles_recruiter_id_name_unique";