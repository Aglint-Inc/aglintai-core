drop function if exists create_new_workflow_action_log;

CREATE OR REPLACE FUNCTION public.create_new_workflow_action_log(
    workflow_id UUID,
    workflow_action_id UUID,
    interval_minutes NUMERIC,
    phase TEXT,
    meta JSON,
    base_time TIMESTAMP with time zone DEFAULT NOW()  -- Optional argument with default value
)
RETURNS VOID
LANGUAGE plpgsql
AS $function$
DECLARE
    execute_at TIMESTAMP with time zone;
BEGIN
    IF base_time IS NULL THEN
        base_time := NOW();
    END IF;
    -- Calculate execution time based on the phase and interval
    IF phase = 'before' THEN
        execute_at := base_time - (interval_minutes * INTERVAL '1 minute');
    ELSE
        execute_at := base_time + (interval_minutes * INTERVAL '1 minute');
    END IF;

    -- Insert record into workflow_action_logs
    INSERT INTO workflow_action_logs (workflow_id, workflow_action_id, meta, execute_at)
    VALUES (workflow_id, workflow_action_id, meta, execute_at);
END;
$function$;
