DROP FUNCTION IF EXISTS interviewers_analytic_rejections;

CREATE OR REPLACE FUNCTION interviewers_analytic_rejections(
  recruiter_id uuid,
  departments numeric[] DEFAULT ARRAY[]::numeric[],
  locations numeric[] DEFAULT ARRAY[]::numeric[],
  jobs uuid[] DEFAULT ARRAY[]::uuid[],
  start_datetime timestamp with time zone DEFAULT null::timestamp with time zone,
  end_datetime timestamp with time zone DEFAULT now()
  )
  RETURNS TABLE(
    user_id uuid,
    decline bigint,
    lead_time numeric,
    reason text[],
    note text[]
  ) AS $$
  BEGIN
    RETURN QUERY select interview_module_relation.user_id as user_id
      , COUNT(*) as decline
      , AVG(extract(epoch from interview_session_cancel.created_at - interview_session.created_at)) as lead_time
      , ARRAY_AGG(interview_session_cancel.reason) as reasons
      , ARRAY_AGG(interview_session_cancel.other_details ->> 'note') as notes
      FROM interview_session_cancel 
      JOIN interview_session ON interview_session.id = interview_session_cancel.session_id 
      JOIN interview_session_relation ON interview_session_cancel.session_relation_id = interview_session_relation.id
      JOIN interview_module_relation ON interview_module_relation.id = interview_session_relation.interview_module_relation_id
      JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
      JOIN public_jobs ON public_jobs.id = interview_meeting.job_id
      WHERE interview_session_cancel.session_relation_id IS NOT NULL
      AND interview_meeting.recruiter_id = interviewers_analytic_rejections.recruiter_id
      AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
      AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
      AND (CARDINALITY(jobs) = 0 OR public_jobs.id = ANY(jobs))
      AND (start_datetime IS NULL OR interview_session.created_at >= start_datetime)
      AND interview_session.created_at <= end_datetime
      GROUP BY interview_module_relation.user_id;
  END;
  $$ LANGUAGE plpgsql;