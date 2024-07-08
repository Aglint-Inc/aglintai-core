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

select
  cron.schedule(
    'expire_new_applications',
    '0 * * * *', 
    $$
      UPDATE applications
      SET is_new false
      WHERE is_new = true AND applied_at < now() - interval '6 hours' 
    $$
);

select
  cron.schedule(
    'invoke-workflow_action_log_cron-every-minute',
    '* * * * *', 
    $$
    select workflow_action_log_cron();
    $$
);

select
  cron.schedule(
    'invoke-workflow_action_log_set_fail_cron-every-5-minute',
    '*/5 * * * *', 
    $$
    select workflow_action_log_set_fail_cron();
    $$
);


select
  cron.schedule(
    'fail_processing_applications',
    '*/3 * * * *', 
    $$
      with processing_applications as (
        select 
          id,
          retry
        from
          applications
        where 
          processing_status = 'processing' and 
          processing_started_at < now() - interval '5 minutes' 
      ) 
      update 
        applications
      set 
        processing_status = 'failed',
        retry = processing_applications.retry + 1
      from 
        processing_applications
      where 
        applications.id = processing_applications.id;
    $$
);