CREATE OR REPLACE FUNCTION delete_session_relation_on_module_archive()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM interview_session_relation
    WHERE interview_session_relation.interview_module_relation_id = NEW.id
      AND EXISTS (
          SELECT 1
          FROM interview_module_relation
          JOIN interview_session ON interview_session.id = interview_session_relation.session_id
          LEFT JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
          WHERE interview_module_relation.id = NEW.id AND (interview_meeting is null OR  interview_meeting.status='not_scheduled' OR interview_meeting.status='cancelled')
      );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 

DROP TRIGGER IF EXISTS trigger_delete_session_relation_on_module_archive ON public.interview_module_relation; 

CREATE TRIGGER trigger_delete_session_relation_on_module_archive
AFTER UPDATE OF is_archived ON public.interview_module_relation
FOR EACH ROW
WHEN (OLD.is_archived = false AND NEW.is_archived = true)
EXECUTE FUNCTION delete_session_relation_on_module_archive();