DROP FUNCTION IF EXISTS per_module_candidate_pipeline;

CREATE OR REPLACE FUNCTION per_module_candidate_pipeline(
    module_id UUID
)
RETURNS TABLE (
    applied BIGINT,
    screened BIGINT,
    interviewed BIGINT,
    offered BIGINT
)
AS $$
BEGIN
    RETURN QUERY SELECT count(*) as applied
, COUNT(*) FILTER (WHERE candidate_files.resume_json IS NOT NULL) as screened
, COUNT(*) FILTER (WHERE interview_meeting.status = 'completed') as interviewed
, COUNT(*) FILTER (WHERE applications.status = 'qualified') as offered
FROM interview_session 
JOIN interview_meeting ON interview_session.meeting_id = interview_meeting.id
JOIN applications ON interview_meeting.application_id = applications.id
JOIN candidate_files ON applications.candidate_id = candidate_files.candidate_id
WHERE interview_session.module_id = per_module_candidate_pipeline.module_id;
END;
$$ LANGUAGE plpgsql;