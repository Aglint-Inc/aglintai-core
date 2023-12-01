select
  cron.schedule(
    'invoke-retry-score-gen--every-minute',
    '*/1 * * * *', -- every minute
    $$
    select retrybatchcalcresumejdscore();
    $$
);