CREATE OR REPLACE FUNCTION public.move_to_interview(applications uuid[] DEFAULT '{}'::uuid[], sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  application_id uuid;
  new_sessions uuid[];
BEGIN
    UPDATE applications
    SET status = 'interview'
    WHERE id = ANY(move_to_interview.applications);
    FOR application_id IN SELECT UNNEST(applications) LOOP
        SELECT array_agg(new_session_id) INTO new_sessions
          FROM json_to_recordset(
              (SELECT (clone_sessions(application_id))::json->'old_new_session_ids')
          ) AS x(new_session_id uuid, old_session_id uuid)
          WHERE old_session_id = ANY(sessions);
        PERFORM create_session_request(application_id, new_sessions, request);
    END LOOP;
END;
$function$
;


