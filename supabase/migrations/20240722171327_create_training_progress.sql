CREATE OR REPLACE FUNCTION create_training_progress()
RETURNS TRIGGER AS $$
DECLARE
  session_relation RECORD;
BEGIN
  IF OLD.status = 'confirmed' AND NEW.status = 'completed' THEN
    FOR session_relation IN
      SELECT interview_session_relation.id 
      FROM interview_session_relation 
      JOIN interview_session ON interview_session.id = interview_session_relation.session_id
      JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
      WHERE interview_session_relation.is_confirmed = true
        AND (interview_session_relation.training_type = 'shadow' 
          OR interview_session_relation.training_type = 'reverse_shadow') 
        AND interview_meeting.id = NEW.id
    LOOP
      -- Insert into interview_training_progress
      INSERT INTO interview_training_progress (session_relation_id)
      VALUES (session_relation.id);
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_create_training_progress
AFTER UPDATE OF status ON public.interview_meeting
FOR EACH ROW
WHEN (OLD.status = 'confirmed' AND NEW.status = 'completed')
EXECUTE FUNCTION create_training_progress();