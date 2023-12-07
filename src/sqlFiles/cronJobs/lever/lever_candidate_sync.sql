SELECT cron.schedule (
    'lever_candidate_sync',
    '0 7 * * *', -- Run at 7:00 AM PT
    $$
    SELECT leverCandidateSync();
    $$
);