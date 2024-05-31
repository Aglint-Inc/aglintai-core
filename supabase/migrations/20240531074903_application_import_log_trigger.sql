set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_application_import_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE 
  title TEXT;
  logged_by TEXT;
  recruiter_id UUID;
  created_by UUID := NULL;
BEGIN

  SELECT public_jobs.recruiter_id INTO recruiter_id
  FROM public_jobs
  WHERE public_jobs.id = NEW.job_id;

  CASE NEW.source
    WHEN 'lever' THEN
      title := 'Application imported from Lever';
      logged_by := 'system';
    WHEN 'greenhouse' THEN
      title := 'Application imported from Greenhouse';
      logged_by := 'system';
    WHEN 'ashby' THEN
      title := 'Application imported from Ashby';
      logged_by := 'system';
    WHEN 'apply_link' THEN
      title := 'Application received from Application link';
      logged_by := 'candidate';
    WHEN 'resume_upload' THEN
      title := 'Application uploaded through Resume upload';
      logged_by := 'user';
      created_by := recruiter_id;
    WHEN 'csv_upload' THEN
      title := 'Application uploaded through CSV upload';
      logged_by := 'user';
      created_by := recruiter_id;
    WHEN 'manual_upload' THEN
      title := 'Application uploaded through Manual upload';
      logged_by := 'user';
      created_by := recruiter_id;
  END CASE;

  INSERT INTO application_logs(application_id, title, created_by, logged_by, module)
  VALUES (NEW.id, title, created_by, logged_by, 'jobs');

  RETURN NEW;
END;
$function$
;

CREATE TRIGGER application_import_log AFTER INSERT ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_application_import_log();