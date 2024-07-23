set check_function_bodies = off;

DROP TRIGGER IF EXISTS trigger_delete_session_relation_on_module_archive ON public.interview_module_relation; 

DROP FUNCTION IF EXISTS delete_session_relation_on_module_archive;

CREATE OR REPLACE FUNCTION public.trigger_module_relation_archive()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  DELETE FROM 
    interview_session_relation
  USING (
    SELECT
    interview_session_relation.id
  FROM
    interview_session_relation
  LEFT JOIN
    interview_session ON
      interview_session_relation.session_id = interview_session.id
  LEFT JOIN
    interview_meeting ON
      interview_meeting.id = interview_session.meeting_id
  WHERE
    interview_session_relation.interview_module_relation_id = NEW.id AND
    (
      interview_session.interview_plan_id IS NOT NULL OR
      interview_meeting.status = 'not_scheduled' OR
      interview_meeting.status = 'cancelled'
    )
  ) AS session_relations
  WHERE
    interview_session_relation.id = session_relations.id;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER module_relation_archive AFTER UPDATE OF is_archived ON public.interview_module_relation FOR EACH ROW WHEN ((new.is_archived = true)) EXECUTE FUNCTION trigger_module_relation_archive();


