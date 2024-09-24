CREATE OR REPLACE FUNCTION public.trigger_delete_integration_keys()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  UPDATE integrations
  SET ashby_key = null, greenhouse_key = null, lever_key = null
  WHERE recruiter_id = NEW.recruiter_id;
  RETURN NEW;
END;$function$
;

CREATE TRIGGER delete_integration_keys AFTER UPDATE OF ats ON public.recruiter_preferences FOR EACH ROW EXECUTE FUNCTION trigger_delete_integration_keys();

UPDATE integrations
SET ashby_key = null, greenhouse_key = null, lever_key = null;

