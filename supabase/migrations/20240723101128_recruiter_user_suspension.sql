set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_recruiter_user_suspension()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE 
    interview_module_relation
  SET 
    is_archived = true
  WHERE 
    interview_module_relation.user_id = NEW.user_id;
  DELETE FROM 
    interview_session_relation
  WHERE
    interview_session_relation.user_id = NEW.user_id;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER recruiter_user_suspension AFTER UPDATE OF status ON public.recruiter_user FOR EACH ROW WHEN ((new.status = 'suspended'::text)) EXECUTE FUNCTION trigger_recruiter_user_suspension();


