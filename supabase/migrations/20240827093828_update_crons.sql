select
  cron.schedule(
    'expire_new_requests',
    '*/1 * * * *', 
    $$
    select expire_new_requests();
    $$
);