DROP FUNCTION IF EXISTS reports_request_metrics;

CREATE OR REPLACE FUNCTION reports_request_metrics(
  recruiter_id uuid,
  departments numeric[] DEFAULT ARRAY[]::numeric[],
  locations numeric[] DEFAULT ARRAY[]::numeric[],
  jobs uuid[] DEFAULT ARRAY[]::uuid[],
  start_datetime timestamp with time zone DEFAULT null::timestamp with time zone,
  end_datetime timestamp with time zone DEFAULT now()
  )
RETURNS TABLE(
    request_id UUID,
  interviewing_coordinator TEXT,
  candidate_name TEXT,
  recruiting_coord TEXT,
  type TEXT,
  availability_req BOOLEAN,
  self_scheduling_req BOOLEAN,
  confirmation BOOLEAN,
  availability_received BOOLEAN,
  availability_followup BOOLEAN,
  self_scheduling_followup BOOLEAN,
  candidate_status TEXT
) AS $$
BEGIN
  RETURN QUERY select request.id as request_id
          , interview_coordinator_user.first_name ||' '|| interview_coordinator_user.last_name as interviewing_coordinator
          , candidates.first_name ||' '|| candidates.last_name as candidate_name
          , recruiting_coordinator_user.first_name ||' '|| recruiting_coordinator_user.last_name as recruiting_coord
          , interview_module.name as type
          , bool_or(request_progress.event_type = 'REQ_CAND_AVAIL_EMAIL_LINK') as availability_req
          , bool_or(request_progress.event_type = 'SELF_SCHEDULE_LINK') as self_scheduling_req
          , bool_or(request_progress.event_type = 'CAND_CONFIRM_SLOT') as confirmation
          , bool_or(request_progress.event_type = 'CAND_AVAIL_REC') as availability_received
          , bool_or(request_progress.event_type = 'REQ_AVAIL_FIRST_FOLLOWUP') as availability_followup
          , bool_or(request_progress.event_type = 'SELF_SCHEDULE_FIRST_FOLLOWUP') as self_scheduling_followup
          -- , interview_meeting.start_time as interview_date
          -- , bool_or(interview_meeting.status = 'confirmed' ) as confirmation
          -- , bool_or(interview_meeting.status = 'completed') as completed
          , applications.status as candidate_status
        from request
          JOIN request_note on request_note.request_id = request.id
          JOIN applications ON applications.id = request.application_id
          JOIN candidates ON candidates.id = applications.candidate_id
          JOIN request_relation ON request_relation.request_id = request.id
          JOIN interview_session ON interview_session.id = request_relation.session_id
          -- left JOIN interview_meeting ON interview_meeting.id = request_relation.session_id
          JOIN interview_module ON interview_module.id = interview_session.module_id
          JOIN public_jobs ON public_jobs.id = applications.job_id
          JOIN request_progress ON request_progress.request_id = request.id
          LEFT JOIN recruiter_user AS interview_coordinator_user ON interview_coordinator_user.user_id = public_jobs.interview_coordinator
          LEFT JOIN recruiter_user AS recruiting_coordinator_user ON recruiting_coordinator_user.user_id = public_jobs.recruiting_coordinator
        where request_progress.event_type IN ('REQ_CAND_AVAIL_EMAIL_LINK','CAND_AVAIL_REC','SELF_SCHEDULE_LINK', 'CAND_CONFIRM_SLOT')
          AND public_jobs.recruiter_id = reports_request_metrics.recruiter_id
          AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
          AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
          AND (CARDINALITY(jobs) = 0 OR applications.job_id = ANY(jobs))
          AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
          AND applications.created_at <= end_datetime
        group by request.id , interviewing_coordinator , candidate_name, recruiting_coord , interview_module.name, applications.status;
END;
$$ LANGUAGE plpgsql;
