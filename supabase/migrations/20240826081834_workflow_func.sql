set check_function_bodies = off;
drop function create_new_workflow_action_log;
CREATE OR REPLACE FUNCTION public.create_new_workflow_action_log(triggered_table workflow_cron_trigger_tables, triggered_table_pkey uuid, workflow_id uuid, workflow_action_id uuid, interval_minutes numeric, phase text, meta json, base_time timestamp with time zone DEFAULT now())
 RETURNS numeric
 LANGUAGE plpgsql
AS $function$
DECLARE
    execute_at TIMESTAMP with time zone;
    inserted_id numeric;
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

    -- Insert record into workflow_action_logs and return the inserted ID
    INSERT INTO workflow_action_logs (
        workflow_id, workflow_action_id, meta, execute_at, related_table, related_table_pkey
    )
    VALUES (
        workflow_id, workflow_action_id, meta, execute_at, triggered_table, triggered_table_pkey
    )
    RETURNING id INTO inserted_id;

    RETURN inserted_id;
END;
$function$
;


