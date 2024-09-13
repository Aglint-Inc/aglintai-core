drop function if exists public.interviewers_analytic_extra;

CREATE
OR REPLACE FUNCTION interviewers_analytic_extra(
  recruiter_id uuid,
  departments numeric[] DEFAULT ARRAY[]::numeric[],
  locations numeric[] DEFAULT ARRAY[]::numeric[],
  jobs uuid[] DEFAULT ARRAY[]::uuid[],
  start_datetime timestamp with time zone DEFAULT null::timestamp with time zone,
  end_datetime timestamp with time zone DEFAULT now()
) RETURNS TABLE (
  user_id uuid,
  average_weekly_count numeric,
  average_weekly_duration numeric,
  upcoming numeric,
  qualified numeric,
  training numeric
) AS $function$
BEGIN
RETURN QUERY WITH weekly_counts AS (
     SELECT 
        interview_module_relation.user_id
        , DATE_TRUNC('week', interview_meeting.created_at) AS created_at
        , COUNT(*) AS weekly_count
        , SUM(interview_session.session_duration) AS weekly_duration
        , count(interview_meeting.status) FILTER (WHERE interview_meeting.status::text = 'confirmed') AS upcoming
        , count(interview_module_relation.training_status) FILTER (WHERE interview_module_relation.training_status = 'qualified') AS qualified
        , count(interview_module_relation.training_status) FILTER (WHERE interview_module_relation.training_status = 'training') AS training
    FROM interview_session_relation
      JOIN interview_module_relation ON interview_module_relation.id = interview_session_relation.interview_module_relation_id
      JOIN interview_session on interview_session.id = interview_session_relation.session_id
      JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
      JOIN public_jobs ON interview_meeting.job_id = public_jobs.id
    WHERE
      interview_meeting.recruiter_id = interviewers_analytic_extra.recruiter_id
      AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
      AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
      AND (CARDINALITY(jobs) = 0 OR interview_meeting.job_id = ANY(jobs))
      AND (start_datetime IS NULL OR interview_meeting.start_time >= start_datetime)
      AND interview_meeting.start_time <= end_datetime
    GROUP BY 
        interview_module_relation.user_id,DATE_TRUNC('week', interview_meeting.created_at)
)
SELECT 
    weekly_counts.user_id
    , ROUND(AVG(weekly_count),1) AS average_weekly_count
    , ROUND(AVG(weekly_duration),1) AS average_weekly_duration
    , SUM(weekly_counts.upcoming) AS upcoming
    , SUM(weekly_counts.qualified) AS qualified
    , SUM(weekly_counts.training) AS training
FROM 
    weekly_counts
GROUP BY 
    weekly_counts.user_id;
END;
$function$ LANGUAGE plpgsql;