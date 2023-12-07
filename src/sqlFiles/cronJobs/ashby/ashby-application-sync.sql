select
  cron.schedule(
    'ashby-application-sync',
    '*/1 * * * *', -- every 2 minute
    $$
    select ashbyApplicationSync();
    $$
);