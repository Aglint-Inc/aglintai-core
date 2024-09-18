DROP FUNCTION IF EXISTS per_module_interview_statistics;

CREATE OR REPLACE FUNCTION per_module_interview_statistics(
    module_id UUID
)
RETURNS TABLE (
    total BIGINT,
    completed BIGINT,
    duration NUMERIC,
    time_to_schedule jsonb
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE interview_meeting.status = 'completed') AS completed,
        AVG(interview_session.session_duration)::NUMERIC AS duration,
        jsonb_build_object(
            'days', EXTRACT(DAY FROM AVG(interview_meeting.created_at - applications.created_at)),
            'hours', EXTRACT(HOUR FROM AVG(interview_meeting.created_at - applications.created_at)),
            'minutes', EXTRACT(MINUTE FROM AVG(interview_meeting.created_at - applications.created_at))
        ) AS time_to_schedule
    FROM 
        interview_meeting
    JOIN 
        interview_session ON interview_meeting.id = interview_session.meeting_id
    JOIN 
        applications ON applications.id = interview_meeting.application_id
    WHERE interview_session.module_id = per_module_interview_statistics.module_id;
END;
$$ LANGUAGE plpgsql;