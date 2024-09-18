
DROP FUNCTION IF EXISTS per_module_interviewer_performance;

CREATE OR REPLACE FUNCTION per_module_interviewer_performance(
    module_id UUID
)
RETURNS TABLE (
    candidate_feedback_avg NUMERIC,
    total_interviews NUMERIC,
    interviewer_feedback_count NUMERIC,
    recommendation_success BIGINT,
    interviewers_count NUMERIC
)
AS $$
BEGIN
    RETURN QUERY WITH temp_res AS (
  SELECT coalesce((candidate_feedback->>'rating')::INT,0) AS candidate_feedback
  , COUNT (DISTINCT interview_meeting.id) AS interview_count
  , COUNT(*) filter(WHERE interview_session_relation.feedback->'recommendation' IS NOT NULL) AS interviewer_feedback_count
  , (AVG((interview_session_relation.feedback->'recommendation')::int)>6) = (applications.status = 'qualified') AS success
  , COUNT(interview_session_relation) AS interviewers_count
  FROM interview_session_relation 
    JOIN interview_session ON interview_session.id = interview_session_relation.session_id 
    JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
    JOIN applications on applications.id= interview_meeting.application_id
  WHERE interview_session_relation.is_confirmed
  AND interview_meeting.status ='completed'
  AND interview_session.module_id = per_module_interviewer_performance.module_id
  group by interview_meeting.application_id, candidate_feedback, applications.status
)
SELECT AVG(temp_res.candidate_feedback) AS candidate_feedback_avg
, SUM(temp_res.interview_count) AS total_interviews
, SUM(temp_res.interviewer_feedback_count) AS interviewer_feedback_count
, COUNT(*) FILTER (WHERE temp_res.success) AS recommendation_success
, SUM(temp_res.interviewers_count) AS interviewers_count 
FROM temp_res;
END;
$$ LANGUAGE plpgsql;