CREATE OR REPLACE FUNCTION public.workflow_action_log_cron()
RETURNS boolean
LANGUAGE plpgsql
AS $function$
DECLARE
    url_x text;
    headers_x jsonb;
    wa_record record;
BEGIN
    url_x := 'https://dev.aglinthq.com/api/workflow-cron';
    headers_x := '{"Content-Type": "application/json"}'::jsonb;

    FOR wa_record IN
        SELECT json_build_object('id', w_a_l.id,'workflow_id', w_a_l.workflow_id, 'workflow_action_id', w_a_l.workflow_action_id, 'meta', w_a_l.meta, 'payload', w_a.payload, 'execution_time', w_a_l.execute_at ) AS body,
               w_a_l.id AS id,
               w_a_l.tries AS tries
        FROM workflow_action_logs w_a_l
        JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
        WHERE (w_a_l.status = 'not started' AND w_a_l.execute_at < CURRENT_TIMESTAMP + INTERVAL '1 minute')
           OR (w_a_l.status = 'failed' AND w_a_l.tries <= 3 AND w_a_l.started_at > CURRENT_TIMESTAMP - INTERVAL '6 minutes')
    LOOP
        PERFORM net.http_post(
            url := url_x,
            headers := headers_x,
            body := wa_record.body::jsonb
        );

        UPDATE workflow_action_logs
        SET status = 'processing', tries = wa_record.tries + 1, started_at = NOW()
        WHERE id = wa_record.id;
    END LOOP;

    RETURN true;
END;
$function$;
-- select
--   cron.schedule(
--     'invoke-workflow_action_log_cron-every-minute',
--     '* * * * *', -- every minute
--     $$
--     select
--       workflow_action_log_cron();
--     $$
--   );