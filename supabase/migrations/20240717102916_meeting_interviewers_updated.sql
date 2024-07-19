CREATE OR REPLACE VIEW public.meeting_interviewers AS
WITH interview_data AS (
  SELECT
    interview_session_relation.id as session_relation_id,
    interview_session_relation.interviewer_type,
    interview_session_relation.training_type,
    interview_session_relation.is_confirmed,
    interview_session.meeting_id,
    interview_session.id as session_id,
    interview_session.session_type,
    interview_meeting.end_time,
    interview_meeting.start_time,
    interview_meeting.status,  -- Including status in the CTE
    interview_session.session_duration,
    COALESCE(debrief_user.first_name, recruiter_user.first_name) as first_name,
    COALESCE(debrief_user.last_name, recruiter_user.last_name) as last_name,
    COALESCE(debrief_user.profile_image, recruiter_user.profile_image) as profile_image,
    COALESCE(debrief_user.email, recruiter_user.email) as email,
    COALESCE(debrief_user.user_id, recruiter_user.user_id) as user_id,
    COALESCE(debrief_user.scheduling_settings->'timeZone'->>'tzCode', recruiter_user.scheduling_settings->'timeZone'->>'tzCode') as tz_code,
    COALESCE(debrief_user.position, recruiter_user.position) as position ,
    interview_session_relation.accepted_status,
    (SELECT json_agg(row_to_json(interview_session_cancel))
     FROM interview_session_cancel 
     WHERE interview_session_cancel.session_relation_id = interview_session_relation.id) as cancel_reasons
  FROM
    interview_session_relation
    LEFT JOIN interview_module_relation ON interview_session_relation.interview_module_relation_id = interview_module_relation.id
    LEFT JOIN interview_session ON interview_session.id = interview_session_relation.session_id
    LEFT JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
    LEFT JOIN recruiter_user ON recruiter_user.user_id = interview_module_relation.user_id
    LEFT JOIN recruiter_user debrief_user ON debrief_user.user_id = interview_session_relation.user_id
),
time_boundaries AS (
  SELECT
    CURRENT_DATE AS today_start,
    CURRENT_DATE + interval '1 day' - interval '1 second' AS today_end,
    date_trunc('week', CURRENT_DATE) + interval '1 day' AS week_start,  -- Start from Monday
    date_trunc('week', CURRENT_DATE) + interval '7 days' - interval '1 second' AS week_end  -- End on Sunday
)
SELECT
  session_relation_id,
  interviewer_type,
  training_type,
  is_confirmed,
  meeting_id,
  session_id,
  session_type,
  first_name,
  last_name,
  profile_image,
  email,
  user_id,
  tz_code,
  position,
  (
    SELECT COUNT(*)
    FROM interview_data id2, time_boundaries tb
    WHERE id2.user_id = interview_data.user_id
      AND id2.end_time BETWEEN tb.today_start AND tb.today_end
      AND id2.is_confirmed = true
      AND (id2.status = 'confirmed' OR id2.status = 'completed')
  ) AS totalInterviewsToday,
  (
    SELECT COUNT(*)
    FROM interview_data id3, time_boundaries tb
    WHERE id3.user_id = interview_data.user_id
      AND id3.start_time >= tb.week_start AND id3.end_time <= tb.week_end
      AND id3.is_confirmed = true
      AND (id3.status = 'confirmed' OR id3.status = 'completed')
  ) AS totalInterviewsThisWeek,
  (
    SELECT COALESCE(SUM(id4.session_duration), 0) / 60.0
    FROM interview_data id4, time_boundaries tb
    WHERE id4.user_id = interview_data.user_id
      AND id4.end_time BETWEEN tb.today_start AND tb.today_end
      AND id4.is_confirmed = true
      AND (id4.status = 'confirmed' OR id4.status = 'completed')
  ) AS totalHoursToday,
  (
    SELECT COALESCE(SUM(id5.session_duration), 0) / 60.0
    FROM interview_data id5, time_boundaries tb
    WHERE id5.user_id = interview_data.user_id
      AND id5.start_time >= tb.week_start AND id5.end_time <= tb.week_end
      AND id5.is_confirmed = true
      AND (id5.status = 'confirmed' OR id5.status = 'completed')
  ) AS totalHoursThisWeek,
  accepted_status,
  cancel_reasons
FROM
  interview_data;