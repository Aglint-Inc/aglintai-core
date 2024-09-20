set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_application_disqualification()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE interview_meeting
  SET status = 'cancelled'
  WHERE id IN (
    SELECT interview_meeting.id
    FROM interview_meeting 
    INNER JOIN interview_schedule ON interview_schedule.id = interview_meeting.interview_schedule_id
    WHERE interview_schedule.application_id = NEW.id
      AND interview_meeting.status NOT IN ('cancelled', 'completed', 'not_scheduled')
  );

  UPDATE new_tasks
  SET status = 'cancelled'
  WHERE application_id = NEW.id
    AND status NOT IN ('cancelled', 'closed', 'completed');

  RETURN NEW;
END;
$function$
;

CREATE TRIGGER application_disqualification AFTER UPDATE OF status ON public.applications FOR EACH ROW WHEN ((new.status = 'disqualified'::application_status)) EXECUTE FUNCTION trigger_application_disqualification();


