set check_function_bodies = off;

CREATE OR REPLACE FUNCTION storage.extension(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
_filename text;
BEGIN
    select string_to_array(name, '/') into _parts;
    select _parts[array_length(_parts,1)] into _filename;
    -- @todo return the last part instead of 2
    return split_part(_filename, '.', 2);
END
$function$
;

CREATE OR REPLACE FUNCTION storage.filename(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[array_length(_parts,1)];
END
$function$
;

CREATE OR REPLACE FUNCTION storage.foldername(name text)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[1:array_length(_parts,1)-1];
END
$function$
;

grant delete on table "storage"."s3_multipart_uploads" to "postgres";

grant insert on table "storage"."s3_multipart_uploads" to "postgres";

grant references on table "storage"."s3_multipart_uploads" to "postgres";

grant select on table "storage"."s3_multipart_uploads" to "postgres";

grant trigger on table "storage"."s3_multipart_uploads" to "postgres";

grant truncate on table "storage"."s3_multipart_uploads" to "postgres";

grant update on table "storage"."s3_multipart_uploads" to "postgres";

grant delete on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant insert on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant references on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant select on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant trigger on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant truncate on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant update on table "storage"."s3_multipart_uploads_parts" to "postgres";



insert into storage.buckets (id, name, created_at, updated_at, public, avif_autodetection) values 
('resume-job-post', 'resume-job-post', now(), now(), true, false),
('ai_videos', 'ai_videos', now(), now(), true, false),
('company-logo', 'company-logo', now(), now(), true, false),
('recruiter-user', 'recruiter-user', now(), now(), true, false),
('avatar_voice', 'avatar_voice', now(), now(), true, false),
('avatar_video', 'avatar_video', now(), now(), true, false),
('candidate-files', 'candidate-files', now(), now(), true, false),
('interview_setting_videos', 'interview_setting_videos', now(), now(), true, false);


create policy "CRUD for authenticated users 1hygbsd_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'candidate-files'::text));


create policy "CRUD for authenticated users 1hygbsd_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'candidate-files'::text));


create policy "CRUD for authenticated users 1hygbsd_2"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'candidate-files'::text));


create policy "CRUD for authenticated users 1hygbsd_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using ((bucket_id = 'candidate-files'::text));


create policy "access avatar voices for anyone 1pnoc7g_0"
on "storage"."objects"
as permissive
for select
to authenticated, anon
using ((bucket_id = 'avatar_voice'::text));


create policy "access avatar voices for anyone 1pnoc7g_1"
on "storage"."objects"
as permissive
for insert
to authenticated, anon
with check ((bucket_id = 'avatar_voice'::text));


create policy "allow haygen webhook to upload video g3t7pr_0"
on "storage"."objects"
as permissive
for select
to anon
using ((bucket_id = 'ai_videos'::text));


create policy "allow haygen webhook to upload video g3t7pr_1"
on "storage"."objects"
as permissive
for insert
to anon
with check ((bucket_id = 'ai_videos'::text));


create policy "give select insert update access to all users gtgxg0_0"
on "storage"."objects"
as permissive
for select
to supabase_replication_admin, authenticated, anon, service_role, supabase_read_only_user
using ((bucket_id = 'resume-job-post'::text));


create policy "give select insert update access to all users gtgxg0_1"
on "storage"."objects"
as permissive
for insert
to supabase_replication_admin, authenticated, anon, service_role, supabase_read_only_user
with check ((bucket_id = 'resume-job-post'::text));


create policy "give select insert update access to all users gtgxg0_2"
on "storage"."objects"
as permissive
for update
to supabase_replication_admin, authenticated, anon, service_role, supabase_read_only_user
using ((bucket_id = 'resume-job-post'::text));


create policy "insert and update access to authenticated users mvsl4r_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'company-logo'::text));


create policy "insert and update access to authenticated users mvsl4r_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'company-logo'::text));


create policy "insert and update access to authenticated users mvsl4r_2"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'company-logo'::text));


create policy "insert and update access to authenticated users on 9cuyul_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'recruiter-user'::text));


create policy "insert and update access to authenticated users on 9cuyul_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'recruiter-user'::text));


create policy "insert and update access to authenticated users on 9cuyul_2"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'recruiter-user'::text));


create policy "interview_setting_videos txx7s5_0"
on "storage"."objects"
as permissive
for update
to authenticated, anon, service_role
using ((bucket_id = 'interview_setting_videos'::text));


create policy "interview_setting_videos txx7s5_1"
on "storage"."objects"
as permissive
for select
to authenticated, anon, service_role
using ((bucket_id = 'interview_setting_videos'::text));


create policy "interview_setting_videos txx7s5_2"
on "storage"."objects"
as permissive
for insert
to authenticated, anon, service_role
with check ((bucket_id = 'interview_setting_videos'::text));


create policy "interview_setting_videos txx7s5_3"
on "storage"."objects"
as permissive
for delete
to authenticated, anon, service_role
using ((bucket_id = 'interview_setting_videos'::text));



