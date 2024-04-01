DROP FUNCTION IF EXISTS get_interview_session_data;

CREATE OR REPLACE FUNCTION get_interview_session_data(plan_id uuid,company_id uuid)
RETURNS TABLE (
  interview_sessions jsonb[],
  interviewers jsonb[],
  service_cred text,
  interview_modules jsonb[]
) AS $$
DECLARE
  session_record interview_session;
  interviewers jsonb[] := '{}'::jsonb[];  -- Initialize outside loop for efficiency
BEGIN
  -- Open cursor to fetch interview sessions (consider error handling)
  FOR session_record IN
    SELECT *
    FROM interview_session AS int_sess
    WHERE int_sess.interview_plan_id = plan_id
  LOOP
    -- Append each session as JSONB directly to interview_sessions
    interview_sessions := interview_sessions || ROW_TO_JSON(session_record)::jsonb;

    -- Select interviewers for the current session and append directly
    interviewers := interviewers || (
      SELECT jsonb_agg(jsonb_build_object(
        'user_id', recruiter_user.user_id,
       'first_name', recruiter_user.first_name,
       'last_name', recruiter_user.last_name,
       'scheduling_settings',recruiter_user.scheduling_settings,
       'schedule_auth',recruiter_user.schedule_auth,
       'profile_image',recruiter_user.profile_image,       
       'email',recruiter_user.email,
       'session_id',session_record.id,
       'training_type',sess_reln.training_type,
       'pause_json',interview_module_relation.pause_json
       ))
      FROM interview_session_relation sess_reln
      LEFT JOIN interview_module_relation ON sess_reln.interview_module_relation_id = interview_module_relation.id
      LEFT JOIN recruiter_user ON interview_module_relation.user_id = recruiter_user.user_id
      WHERE sess_reln.session_id = session_record.id
    );

    interview_modules := interview_modules||(select jsonb_agg(interview_module.*) from interview_module where  interview_module.id=session_record.module_id);


  END LOOP;

  SELECT INTO service_cred r.service_json
      FROM recruiter r
      WHERE r.id = company_id; 

  -- Return the interview_sessions and interviewers arrays
  RETURN QUERY SELECT interview_sessions, interviewers, service_cred,interview_modules;
END;
$$ LANGUAGE plpgsql;



-- Call the function with your plan ID
SELECT * FROM get_interview_session_data('76f6d467-950a-4d11-95c5-c45804f44786','d353b3a0-3e19-45d0-8623-4bd35577f548');

