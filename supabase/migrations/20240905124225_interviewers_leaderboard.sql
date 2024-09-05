drop function if exists public.interviewers_leaderboard_by_v;

CREATE
OR REPLACE FUNCTION interviewers_leaderboard_by_v(
  recruiter_id uuid,
  departments numeric[] DEFAULT ARRAY[]::numeric[],
  locations numeric[] DEFAULT ARRAY[]::numeric[],
  jobs uuid[] DEFAULT ARRAY[]::uuid[],
  start_datetime timestamp with time zone DEFAULT null::timestamp with time zone,
  end_datetime timestamp with time zone DEFAULT now()
) RETURNS TABLE (
  user_id uuid,
  duration bigint,
  total_hours bigint,
  accepted bigint,
  rejected bigint,
  feedback int
) AS $function$
BEGIN
    RETURN QUERY SELECT interview_module_relation.user_id
        , SUM(interview_session.session_duration::int) as duration
        , COUNT(accepted_status) AS total_hours
        , COUNT(accepted_status) FILTER (WHERE interview_session_relation.accepted_status = 'accepted') AS accepted
        , COUNT(accepted_status) FILTER (WHERE interview_session_relation.accepted_status = 'declined') AS rejected
        , 0 AS feedback
        FROM interview_session_relation
            JOIN interview_module_relation ON interview_module_relation.id = interview_session_relation.interview_module_relation_id
            JOIN interview_session on interview_session.id = interview_session_relation.session_id
            JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
            JOIN public_jobs ON public_jobs.id = interview_meeting.job_id
        WHERE
            interview_meeting.recruiter_id = interviewers_leaderboard_by_v.recruiter_id
            AND interview_meeting.status = 'completed' 
            AND interview_session_relation.accepted_status in ('accepted','declined')
            AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
            AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
            AND (CARDINALITY(jobs) = 0 OR interview_meeting.job_id = ANY(jobs))
            AND (start_datetime IS NULL OR interview_meeting.start_time >= start_datetime)
            AND interview_meeting.start_time <= end_datetime
        GROUP BY interview_module_relation.user_id;
END;
$function$ LANGUAGE plpgsql;