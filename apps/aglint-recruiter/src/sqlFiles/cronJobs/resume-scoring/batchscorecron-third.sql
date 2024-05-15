select
  cron.schedule(
    'batchscorecron-third',
    '*/1 * * * *', -- every minute
    $$
    select batchscorecron('third');
    $$
);