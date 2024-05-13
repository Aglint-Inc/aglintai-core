select
  cron.schedule(
    'batchtriggergreenhouse',
    '*/1 * * * *', 
    $$
    select batchtriggergreenhouse();
    $$
);

select
  cron.schedule(
    'batchscorecron-second',
    '*/1 * * * *', 
    $$
    select batchscorecron('second');
    $$
);

select
  cron.schedule(
    'batchscorecron-third',
    '*/1 * * * *', 
    $$
    select batchscorecron('third');
    $$
);

select
  cron.schedule(
    'overviewgenerate',
    '*/1 * * * *', 
    $$
    select overviewgenerate();
    $$
);

select
  cron.schedule(
    'ashby_sync',
    '0 * * * *', 
    $$
    SELECT ashbySync();
    $$
);

select
  cron.schedule(
    'ashby-application-sync',
    '*/1 * * * *', 
    $$
    select ashbyApplicationSync();
    $$
);


select
  cron.schedule(
    'lever_candidate_sync',
    '0 7 * * *', 
    $$
    SELECT leverCandidateSync();
    $$
);

select
  cron.schedule(
    'greenhouse_candidate_sync',
    '0 7 * * *', 
    $$
    SELECT greenhouseCandidateSync();
    $$
);

select
  cron.schedule(
    'get-emails-candidatedb',
    '*/1 * * * *', 
    $$
    select outreachHandler();
    $$
);

select
  cron.schedule(
    'email-send-cndidatedb',
    '*/1 * * * *', 
    $$
    select emailCronCandidateDb();
    $$
);

select
  cron.schedule(
    'daily_interview_module_pause',
    '0 0 * * *', 
    $$
    UPDATE
      interview_module_relation
    SET
      pause_json = null
    WHERE
      pause_json IS NOT null
      AND (pause_json -> 'isManual')::boolean = false
      AND (pause_json ->> 'end_date')::timestamp with time zone < NOW()
    $$
);

select
  cron.schedule(
    'batchscorecron-first',
    '*/1 * * * *', 
    $$
    select batchscorecron('first');
    $$
);

select
  cron.schedule(
    'interview_schedule_status_update',
    '*/30 * * * *', 
    $$
    select update_meeting_status();
    $$
);

select
  cron.schedule(
    'scheduler_cron_trigger',
    '*/1 * * * *', 
    $$
    SELECT schedulercron();
    $$
);