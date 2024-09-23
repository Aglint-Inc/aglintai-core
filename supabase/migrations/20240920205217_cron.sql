SELECT
  cron.schedule(
    'lever-resume-save',
    '10 seconds',
    $$
    SELECT lever_resume_save();
    $$
);

SELECT
  cron.schedule(
    'batchtriggergreenhouse',
    '*/1 * * * *',
    $$
    SELECT batchtriggergreenhouse();
    $$
);

SELECT
  cron.schedule(
    'batchscorecron-second',
    '*/1 * * * *',
    $$
    SELECT batchscorecron('second');
    $$
);

SELECT
  cron.schedule(
    'batchscorecron-third',
    '*/1 * * * *',
    $$
    SELECT batchscorecron('third');
    $$
);

SELECT
  cron.schedule(
    'overviewgenerate',
    '*/1 * * * *',
    $$
    SELECT overviewgenerate();
    $$
);

SELECT
  cron.schedule(
    'ashby_sync',
    '0 * * * *',
    $$
    SELECT ashbySync();
    $$
);

SELECT
  cron.schedule(
    'ashby-application-sync',
    '*/1 * * * *',
    $$
    SELECT ashbyApplicationSync();
    $$
);

SELECT
  cron.schedule(
    'lever_candidate_sync',
    '0 7 * * *',
    $$
    SELECT leverCandidateSync();
    $$
);

SELECT
  cron.schedule(
    'get-emails-candidatedb',
    '*/1 * * * *',
    $$
    SELECT outreachHandler();
    $$
);

SELECT
  cron.schedule(
    'email-send-candidatedb',
    '*/1 * * * *',
    $$
    SELECT emailCronCandidateDb();
    $$
);

SELECT
  cron.schedule(
    'daily_interview_module_pause',
    '0 0 * * *',
    $$
    UPDATE interview_module_relation
    SET pause_json = null
    WHERE pause_json IS NOT null
    AND (pause_json -> 'isManual')::boolean = false
    AND (pause_json ->> 'end_date')::timestamp with time zone < NOW();
    $$
);

SELECT
  cron.schedule(
    'batchscorecron-first',
    '*/1 * * * *',
    $$
    SELECT batchscorecron('first');
    $$
);

SELECT
  cron.schedule(
    'interview_schedule_status_update',
    '*/30 * * * *',
    $$
    SELECT update_meeting_status();
    $$
);

SELECT
  cron.schedule(
    'expire_new_applications',
    '0 * * * *',
    $$
    SELECT expire_new_applications();
    $$
);

SELECT
  cron.schedule(
    'invoke-workflow_action_log_cron-every-minute',
    '* * * * *',
    $$
    SELECT workflow_action_log_cron();
    $$
);

SELECT
  cron.schedule(
    'invoke-workflow_action_log_set_fail_cron-every-5-minute',
    '*/5 * * * *',
    $$
    SELECT workflow_action_log_set_fail_cron();
    $$
);

SELECT
  cron.schedule(
    'fail_processing_applications',
    '*/3 * * * *',
    $$
    SELECT fail_processing_applications();
    $$
);

SELECT
  cron.schedule(
    'expire_new_requests',
    '*/1 * * * *',
    $$
    SELECT expire_new_requests();
    $$
);

SELECT
  cron.schedule(
    'invoke-workflow_action_log_cron-every-5-minutes',
    '*/5 * * * *',
    $$
    SELECT workflow_action_log_cron();
    $$
);

SELECT
  cron.schedule(
    'check_calendar_status',
    '0 */6 * * *',
    $$
    SELECT check_user_auth();
    $$
);

SELECT
  cron.schedule(
    'greenhouse_full_sync',
    '0 7 * * *',
    $$
    SELECT greenhouse_sync();
    $$
);

SELECT
  cron.schedule(
    'calendar-webhook-sync',
    '0 0 */5 * *',
    $$
    SELECT resync_calendar();
    $$
);
