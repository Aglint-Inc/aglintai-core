set check_function_bodies = off;

CREATE
OR REPLACE FUNCTION public.create_session_request (
  application uuid DEFAULT NULL::uuid,
  sessions uuid[] DEFAULT '{}'::uuid[],
  request jsonb DEFAULT NULL::jsonb
) RETURNS uuid LANGUAGE plpgsql AS $function$
DECLARE
    request_id uuid;
    session_id uuid;
BEGIN
  IF application IS NOT NULL
  AND request IS NOT NULL
  AND request ->> 'assigner_id' IS NOT NULL
  AND request ->> 'assignee_id' IS NOT NULL 
  THEN
    INSERT INTO
      request (
        application_id,
        assigner_id,
        assignee_id,
        title,
        type,
        status,
        priority,
        schedule_end_date,
        schedule_start_date
      )
    VALUES
      (
        application,
        (request ->> 'assigner_id')::uuid,
        (request ->> 'assignee_id')::uuid,
        COALESCE(request ->> 'title', 'New request'),
        COALESCE(request ->> 'type', 'schedule_request'),
        COALESCE(request ->> 'status', 'to_do'),
        COALESCE(request ->> 'priority', 'standard'),
        COALESCE(request ->> 'schedule_end_date', NULL)::timestamp with time zone,
        COALESCE(request ->> 'schedule_start_date', NULL)::timestamp with time zone
      )
    RETURNING
      id INTO request_id;
    IF request_id IS NOT NULL AND request ->> 'note' IS NOT NULL AND TRIM(request ->> 'note') <> '' 
    THEN
      INSERT INTO
        request_note (request_id, note)
      VALUES
        (request_id, request ->> 'note');
    END IF;
    IF request_id IS NOT NULL AND array_length(sessions, 1) > 0 
    THEN 
      FOR session_id IN
        SELECT
          UNNEST(sessions) 
        LOOP
          INSERT INTO
            request_relation (request_id, session_id)
          VALUES
            (request_id, session_id);
        END LOOP;
    END IF;
  END IF;
  RETURN request_id;
END;
$function$;