CREATE OR REPLACE FUNCTION public.workflow_action_log_set_fail_cron()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN 
  Update workflow_action_logs set status = 'failed' where started_at < CURRENT_TIMESTAMP - INTERVAL '4 minutes';
  RETURN true;
END;
$function$
;

-- select
--   cron.schedule (
--     'invoke-workflow_action_log_set_fail_cron-every-5-minute',
--     '*/5 * * * *', -- every 5th min
--     $$
--     select
--       workflow_action_log_set_fail_cron();
--     $$
--   );
