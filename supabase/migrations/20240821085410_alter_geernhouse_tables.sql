
CREATE UNIQUE INDEX applications_remote_id_key_index ON public.applications USING btree (remote_id);

CREATE UNIQUE INDEX departments_remote_id_key_index ON public.departments USING btree (remote_id);

CREATE UNIQUE INDEX office_locations_remote_id_key_index ON public.office_locations USING btree (remote_id);

CREATE UNIQUE INDEX public_jobs_remote_id_key_index ON public.public_jobs USING btree (remote_id);

CREATE UNIQUE INDEX recruiter_user_remote_id_key_index ON public.recruiter_user USING btree (remote_id);

alter table "public"."applications" add constraint "applications_remote_id_key" UNIQUE using index "applications_remote_id_key_index";

alter table "public"."departments" add constraint "departments_remote_id_key" UNIQUE using index "departments_remote_id_key_index";

alter table "public"."office_locations" add constraint "office_locations_remote_id_key" UNIQUE using index "office_locations_remote_id_key_index";

alter table "public"."public_jobs" add constraint "public_jobs_remote_id_key" UNIQUE using index "public_jobs_remote_id_key_index";

alter table "public"."recruiter_user" add constraint "recruiter_user_remote_id_key" UNIQUE using index "recruiter_user_remote_id_key_index";

alter table "public"."public_jobs" add column "remote_sync_time" text;