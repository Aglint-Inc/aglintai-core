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
       AND request ->> 'type' IS NOT NULL 
       AND request ->> 'title' IS NOT NULL 
    THEN
        INSERT INTO request(application_id, assigner_id, assignee_id, type, title)
        VALUES (application, 
                (request->>'assigner_id')::uuid, 
                (request->>'assignee_id')::uuid, 
                request->>'type', 
                request->>'title')
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