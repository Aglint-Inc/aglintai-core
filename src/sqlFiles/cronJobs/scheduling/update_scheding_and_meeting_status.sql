
drop function if exists update_interview_schedule_status;

CREATE FUNCTION update_interview_schedule_status()
RETURNS VOID AS
$$
DECLARE
    schedule_id_var uuid;
BEGIN
    -- Loop through each row in interview_schedule
    FOR schedule_id_var IN SELECT id FROM interview_schedule LOOP
        -- Check if all meetings associated with the current schedule_id have ended
        IF NOT EXISTS (
            SELECT 1
            FROM interview_meeting 
            WHERE interview_schedule_id = schedule_id_var AND to_timestamp(end_time, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') > NOW()
        ) THEN
            -- If all meetings have ended, update status in interview_schedule
            UPDATE interview_schedule
            SET status = 'completed'
            WHERE id = schedule_id_var AND status <> 'completed'AND status <> 'cancelled'; -- Update only if status is not already 'Completed'
        END IF;
    END LOOP;
END;
$$
LANGUAGE plpgsql;



select from update_interview_schedule_status();




DROP FUNCTION IF EXISTS update_meeting_status;

CREATE OR REPLACE FUNCTION update_meeting_status()
RETURNS VOID AS
$$
BEGIN
    -- Loop through each row in interview_schedule
    UPDATE interview_meeting
    SET status = 'completed'
    WHERE to_timestamp(end_time, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') > NOW() AND status <> 'completed'AND status <> 'cancelled';
END;
$$
LANGUAGE plpgsql;


select from update_meeting_status();


SELECT cron.schedule (
    'interview_schedule_status_update', -- Job name
    '*/30 * * * *', -- Cron expression for every 30 minutes
    $$
    select from update_meeting_status();
    select from update_interview_schedule_status();
    $$ 
);


