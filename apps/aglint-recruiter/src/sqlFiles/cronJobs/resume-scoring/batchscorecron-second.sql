select
  cron.schedule(
    'batchscorecron-second',
    '*/1 * * * *', -- every minute
    $$
    select batchscorecron('second');
    $$
);