select
  cron.schedule (
    'invoke-job-schedule-function',
    '0 */2 * * *', 
    $$
    select
      net.http_post(
          url:='https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/jobs-interview-schedule',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
      ) as request_id;
    $$
  );
