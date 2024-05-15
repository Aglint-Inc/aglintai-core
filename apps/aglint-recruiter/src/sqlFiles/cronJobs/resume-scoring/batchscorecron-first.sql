select
  cron.schedule(
    'batchscorecron-first',
    '*/1 * * * *', -- every minute
    $$
    select batchscorecron('first');
    $$
);