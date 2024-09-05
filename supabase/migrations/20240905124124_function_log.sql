DROP TRIGGER IF EXISTS track_interview_meeting_changes on interview_meeting;
drop function if exists public.create_interview_meeting_log;

CREATE OR REPLACE FUNCTION create_interview_meeting_log() 
RETURNS TRIGGER 
AS $$
DECLARE
    temp_column_name TEXT;
    old_value TEXT;
    new_value TEXT;
    query TEXT;
    delta_json jsonb = '{}'::jsonb;
BEGIN
    -- Iterate over the columns
    FOREACH temp_column_name IN ARRAY ARRAY['status', 'start_time', 'end_time', 'organizer_id', 'meeting_flow', 'delta']
    LOOP
        -- Dynamically construct the query to handle different data types
        old_value := COALESCE(row_to_json(OLD)->>temp_column_name, 'null');
        new_value := COALESCE(row_to_json(NEW)->>temp_column_name, 'null');
        -- insert log if values have changed
        IF old_value IS DISTINCT FROM new_value THEN
            delta_json := delta_json || jsonb_build_object(temp_column_name, old_value); 
        END IF;
    END LOOP;

    INSERT INTO public.interview_meeting_log (
        meeting_id
        , status
        , start_time
        , end_time
        , organizer_id
        , meeting_flow
        , delta
        )
        VALUES (
            New.id
            , NEW.status
            , NEW.start_time
            , NEW.end_time
            , NEW.organizer_id
            , NEW.meeting_flow
            , delta_json
        );  
    RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER track_interview_meeting_changes
  AFTER INSERT OR UPDATE OF 
    status
    , start_time
    , end_time
    , organizer_id
    , meeting_flow
  ON interview_meeting
FOR EACH ROW
EXECUTE FUNCTION create_interview_meeting_log();


DROP TRIGGER IF EXISTS track_request_changes on request;
DROP FUNCTION IF EXISTS create_request_meeting_log;

CREATE OR REPLACE FUNCTION create_request_meeting_log() 
RETURNS TRIGGER 
AS $$
DECLARE
    temp_column_name TEXT;
    old_value TEXT;
    new_value TEXT;
    query TEXT;
    delta_json jsonb = '{}'::jsonb;
BEGIN
    -- Iterate over the columns
    FOREACH temp_column_name IN ARRAY ARRAY['assignee_id', 'status', 'type', 'priority']
    LOOP
        -- Dynamically construct the query to handle different data types
        old_value := COALESCE(row_to_json(OLD)->>temp_column_name, 'null');
        new_value := COALESCE(row_to_json(NEW)->>temp_column_name, 'null');
        -- insert log if values have changed
        IF old_value IS DISTINCT FROM new_value THEN
            delta_json := delta_json || jsonb_build_object(temp_column_name, old_value); 
        END IF;
    END LOOP;

    INSERT INTO public.request_log (
        request_id
        , assignee_id
        , status
        , type
        , priority  
        , delta
        )
        VALUES (
            NEW.id
            , NEW.assignee_id
            , NEW.status
            , NEW.type
            , NEW.priority
            , delta_json
        );  
    RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER track_request_changes
  AFTER INSERT OR UPDATE OF 
    assignee_id
    , status
    , type
    , priority
  ON request
FOR EACH ROW
EXECUTE FUNCTION create_request_meeting_log();