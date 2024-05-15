select
  cron.schedule (
    'change status job_sourcing',
    '*/30 * * * *', -- every 30 minute
    $$
    select
    move_scheduled_jobs_sourcing_to_active();
    $$
  );