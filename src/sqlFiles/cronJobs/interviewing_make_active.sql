
select
  cron.schedule (
    'interviewing_make_active',
    '*/30 * * * *', -- every 30 minute
    $$
    SELECT interviewing_state_active();
    $$
  );