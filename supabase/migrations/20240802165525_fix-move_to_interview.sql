set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.move_to_interview(applications uuid[] DEFAULT '{}'::uuid[], sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  response record;
BEGIN
    RAISE LOG '🪵 move_to_interview %', applications;
    UPDATE applications
    SET status = 'interview'
    WHERE id = ANY(move_to_interview.applications);
    FOR response IN (
      SELECT meeting_details.application_id as application_id, array_agg(meeting_details.session_id) as session_ids
      FROM meeting_details
      WHERE meeting_details.application_id = ANY(move_to_interview.applications) AND parent_session_id = ANY(move_to_interview.applications)
      GROUP BY meeting_details.application_id
    ) 
    LOOP
      RAISE LOG '🪵 move_to_interview loop %', applications;
      PERFORM create_session_request(response.application_id, response.session_ids, request) FROM updated_session;
    END LOOP;
END;
$function$
;