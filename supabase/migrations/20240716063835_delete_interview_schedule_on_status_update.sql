
CREATE OR REPLACE FUNCTION delete_interview_schedule_on_status_update()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status = 'disqualified' AND NEW.status = 'new' THEN
    DELETE FROM interview_schedule WHERE application_id = NEW.id;
    DELETE FROM candidate_request_availability WHERE application_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;