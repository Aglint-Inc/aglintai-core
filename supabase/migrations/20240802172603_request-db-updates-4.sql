set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_session_request(application uuid DEFAULT NULL::uuid, sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  request_id uuid;
  session_id uuid;
BEGIN
    IF application IS NOT NULL 
       AND request IS NOT NULL 
       AND request ->> 'assigner_id' IS NOT NULL 
       AND request ->> 'assignee_id' IS NOT NULL 
    THEN
        INSERT INTO request(application_id, assigner_id, assignee_id, title, type, status, priority)
        VALUES (application, 
                (request->>'assigner_id')::uuid, 
                (request->>'assignee_id')::uuid, 
                coalesce(request->>'title', 'New request'),
                coalesce(request->>'type', 'schedule_request'),
                coalesce(request->>'status', 'to_do'),
                coalesce(request->>'priority', 'standard')
                )
        RETURNING id INTO request_id;

        IF request_id IS NOT NULL AND array_length(sessions, 1) > 0 THEN
            FOR session_id IN SELECT UNNEST(sessions) LOOP
                INSERT INTO request_relation(request_id, session_id)
                VALUES (request_id, session_id);
            END LOOP;
        END IF;
    END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.move_to_interview(applications uuid[] DEFAULT '{}'::uuid[], sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
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
      WITH applications_cte AS (
        SELECT UNNEST(move_to_interview.applications)::uuid as application_id
      ), sessions_cte AS (
        SELECT UNNEST(move_to_interview.sessions)::uuid as session_id
      )
      SELECT meeting_details.application_id, array_agg(meeting_details.session_id) as session_ids
      FROM meeting_details
      INNER JOIN applications_cte ON applications_cte.application_id = meeting_details.application_id
      INNER JOIN sessions_cte ON sessions_cte.session_id = meeting_details.parent_session_id
      GROUP BY meeting_details.application_id
    ) 
    LOOP
      PERFORM create_session_request(response.application_id, response.session_ids, request);
    END LOOP;
END;
$function$
;


