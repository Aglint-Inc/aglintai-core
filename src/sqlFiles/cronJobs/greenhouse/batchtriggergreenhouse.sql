select
  cron.schedule(
    'batchtriggergreenhouse',
    '*/1 * * * *', -- every minute
    $$
    select batchtriggergreenhouse();
    $$
);