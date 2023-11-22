select
  cron.schedule(
    'second-retry-score-gen--every-minute',
    '*/1 * * * *', -- every minute
    $$
    select secondretrybatchcalcresumejdscore();
    $$
);