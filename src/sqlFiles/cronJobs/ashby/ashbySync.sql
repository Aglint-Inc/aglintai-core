SELECT cron.schedule (
    'ashby_sync',
    '0 * * * *', -- Run every hour
    $$
    SELECT ashbySync();
    $$
);