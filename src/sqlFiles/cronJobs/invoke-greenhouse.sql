select
  cron.schedule(
    'invoke-greenhouse',
    '*/1 * * * *', -- every minute
    $$
    select saveGreenHouseResume();
    $$
);