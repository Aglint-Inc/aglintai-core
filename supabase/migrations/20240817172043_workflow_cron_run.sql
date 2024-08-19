SELECT
  cron.schedule(
    'invoke-workflow_action_log_cron-every-5-minutes',
    '*/5 * * * *', 
    $$
    SELECT workflow_action_log_cron();
    $$
);
