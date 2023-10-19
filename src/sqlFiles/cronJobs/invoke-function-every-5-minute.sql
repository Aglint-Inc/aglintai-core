select
  cron.schedule(
    'invoke-function-every-5-minute',
    '*/1 * * * *', -- every minute
    $$
    select batchCalcResumeJDScore();
    $$
);
