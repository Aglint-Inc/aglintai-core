drop trigger if exists "trigger_delete_interview_schedule" on "public"."applications";

drop function if exists "public"."delete_interview_schedule_on_status_update"();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_interview_meetings_on_status_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF OLD.status = 'disqualified' AND NEW.status = 'new' THEN
    DELETE FROM interview_meeting WHERE application_id = NEW.id;
    DELETE FROM candidate_request_availability WHERE application_id = NEW.id;
    DELETE FROM interview_filter_json WHERE application_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER trigger_delete_interview_meetings AFTER UPDATE OF status ON public.applications FOR EACH ROW WHEN (((old.status = 'disqualified'::text) AND (new.status = 'new'::text))) EXECUTE FUNCTION delete_interview_meetings_on_status_update();


