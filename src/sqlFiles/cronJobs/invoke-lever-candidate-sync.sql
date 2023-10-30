SELECT cron.schedule (
    'interviewing_make_active',
    '0 7 * * *', -- Run at 7:00 AM PT
    $$
    SELECT leverCandidateSync();
    $$
);
