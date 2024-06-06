
CREATE OR REPLACE FUNCTION public.create_new_workflow_action_log(workflow_id uuid, workflow_action_id uuid, interval_minutes numeric, phase text, meta json)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    execute_at TIMESTAMP;
BEGIN
    -- Calculate execution time based on the phase and interval
    IF phase = 'before' THEN
        execute_at := NOW() - (interval_minutes * INTERVAL '1 minute');
    ELSE
        execute_at := NOW() + (interval_minutes * INTERVAL '1 minute');
    END IF;

    -- Insert record into workflow_action_logs
    INSERT INTO workflow_action_logs (workflow_id, workflow_action_id, meta, execute_at)
    VALUES (workflow_id, workflow_action_id, meta, execute_at);
END;
$function$
;
