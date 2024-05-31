set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  title TEXT;
BEGIN
  IF NEW.processing_status = 'success' AND NEW.overall_score IS NOT NULL AND NEW.overall_score >= 0 THEN
      title := 'Application was scored ' || NEW.overall_score || ' %';
      INSERT INTO application_logs(application_id, title, logged_by, module)
      VALUES (NEW.id, title, 'system', 'jobs');
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER application_score_log AFTER UPDATE OF processing_status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_application_score_log();