select cron.unschedule('invoke-workflow_action_log_cron-every-5-minutes');

drop trigger if exists "event_trigger_workflow_action_logs_insert" on "public"."workflow_action_logs";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.executeimmediatejoboninsert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    url text;
    payload jsonb;
    headers jsonb;
BEGIN
  PERFORM run_workflow_action(new.id);
  RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.run_workflow_action(action_id numeric)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    url_x text;
    headers_x jsonb;
    wa_record record;
BEGIN
    SELECT decrypted_secret 
    INTO url_x
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    
    url_x := concat(url_x, '/api/workflow-cron');

    headers_x := '{"Content-Type": "application/json"}'::jsonb;

    FOR wa_record IN
        SELECT w_a_l.*, w_a.payload
        FROM workflow_action_logs w_a_l
        JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
        WHERE w_a_l.id = action_id and w_a_l.tries=0 and w_a_l.status = 'not_started'
    LOOP
        PERFORM net.http_post(
            url := url_x,
            headers := headers_x,
            body := json_build_object(
                'id', wa_record.id,
                'workflow_id', wa_record.workflow_id,
                'workflow_action_id', wa_record.workflow_action_id,
                'meta', wa_record.meta,
                'payload', wa_record.payload,
                'execution_time', wa_record.execute_at
            )::jsonb
        );

        UPDATE workflow_action_logs
        SET status = 'processing', tries = wa_record.tries + 1, started_at = NOW()
        WHERE id = wa_record.id;
    END LOOP;

    RETURN true;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_action_log_cron()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    url_x text;
    headers_x jsonb;
    wa_record record;
BEGIN
   

    FOR wa_record IN
        SELECT w_a_l.id AS id,
               w_a_l.tries AS tries
        FROM workflow_action_logs w_a_l
        JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
        WHERE (w_a_l.status = 'not_started' AND w_a_l.execute_at < CURRENT_TIMESTAMP + INTERVAL '1 minute' AND w_a_l.tries=0)
    LOOP
        
        PERFORM run_workflow_action(wa_record.id);

    END LOOP;
    RETURN true;
END;
$function$
;

CREATE TRIGGER exec_immidiate_job AFTER INSERT ON public.workflow_action_logs FOR EACH ROW EXECUTE FUNCTION executeimmediatejoboninsert();


