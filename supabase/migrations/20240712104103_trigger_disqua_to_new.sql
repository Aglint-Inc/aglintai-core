CREATE OR REPLACE FUNCTION delete_interview_schedule_on_status_update()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status = 'disqualified' AND NEW.status = 'new' THEN
    DELETE FROM interview_schedule WHERE application_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER trigger_delete_interview_schedule
AFTER UPDATE OF status ON public.applications
FOR EACH ROW
WHEN (OLD.status = 'disqualified' AND NEW.status = 'new')
EXECUTE FUNCTION delete_interview_schedule_on_status_update();



ALTER TABLE public.interview_module_relation
DROP CONSTRAINT IF EXISTS unique_user_module;

ALTER TABLE public.interview_module_relation
ADD CONSTRAINT unique_user_module UNIQUE (user_id, module_id);
