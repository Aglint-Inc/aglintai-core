drop function if exists "public"."move_to_interview"(applications uuid[], sessions uuid[], request jsonb);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.move_to_interview(applications uuid[] DEFAULT '{}'::uuid[], sessions uuid[] DEFAULT '{}'::uuid[], requests jsonb[] DEFAULT NULL::jsonb[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  response record;
BEGIN
    UPDATE applications
    SET status = 'interview'
    WHERE id = ANY(move_to_interview.applications);
    FOR response IN (
      WITH requests_cte AS (
        SELECT UNNEST(move_to_interview.requests)::jsonb as request
      ), sessions_cte AS (
        SELECT UNNEST(move_to_interview.sessions)::uuid as session_id
      )
      SELECT requests_cte.request, array_agg(meeting_details.session_id) as session_ids
      FROM meeting_details
      INNER JOIN requests_cte ON (requests_cte.request->>'application_id')::uuid = meeting_details.application_id
      INNER JOIN sessions_cte ON sessions_cte.session_id = meeting_details.parent_session_id
      GROUP BY requests_cte.request
    ) 
    LOOP
      PERFORM create_session_request((response.request ->> 'application_id')::uuid, response.session_ids, response.request - 'application_id');
    END LOOP;
END;
$function$
;


