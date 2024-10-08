set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_interview_session_data(session_ids uuid[], company_id uuid, meet_start_date timestamp without time zone DEFAULT NULL::timestamp without time zone, meet_end_date timestamp without time zone DEFAULT NULL::timestamp without time zone)
 RETURNS TABLE(interview_sessions jsonb[], interviewers jsonb[], service_cred text, interview_modules jsonb[], comp_schedule_setting jsonb, int_meetings jsonb[])
 LANGUAGE plpgsql
AS $function$DECLARE
  session_record interview_session;
  interviewers jsonb[] := '{}'::jsonb[]; 
BEGIN
  -- Open cursor to fetch interview sessions (consider error handling)
  FOR session_record IN
    SELECT *
    FROM interview_session AS int_sess
    WHERE int_sess.id = any(session_ids)
  LOOP
    -- Append each session as JSONB directly to interview_sessions
    interview_sessions := interview_sessions || ROW_TO_JSON(session_record)::jsonb;

 IF session_record.session_type = 'debrief' THEN
     interviewers := interviewers || (
      SELECT jsonb_agg(jsonb_build_object(
      'user_id', rec_user.user_id,
      'first_name', rec_user.first_name,
      'position', rec_user.position,
      'last_name', rec_user.last_name,
      'scheduling_settings', rec_user.scheduling_settings,
      'schedule_auth', rec_user.schedule_auth,
      'profile_image', rec_user.profile_image,       
      'email', rec_user.email,
      'session_id', sess_reln.session_id,
      'training_type', sess_reln.training_type,
      'interviewer_type', sess_reln.interviewer_type,
      'session_relation_id',sess_reln.id,
      'pause_json', null,
      'interview_module_relation_id', null
      )) 
        FROM recruiter_user rec_user
        LEFT JOIN interview_session_relation sess_reln ON sess_reln.user_id = rec_user.user_id
        WHERE sess_reln.session_id = session_record.id
      );
    ELSE
      interviewers := interviewers || (
        SELECT jsonb_agg(jsonb_build_object(
          'user_id', recruiter_user.user_id,
        'first_name', recruiter_user.first_name,
        'last_name', recruiter_user.last_name,
        'position', recruiter_user.position,
        'scheduling_settings',recruiter_user.scheduling_settings,
        'schedule_auth',recruiter_user.schedule_auth,
        'profile_image',recruiter_user.profile_image,       
        'email',recruiter_user.email,
        'session_id',session_record.id,
        'session_relation_id',sess_reln.id,
        'training_type',sess_reln.training_type,
        'interviewer_type', sess_reln.interviewer_type,
        'pause_json',interview_module_relation.pause_json,
        'interview_module_relation_id',sess_reln.interview_module_relation_id
        ))
        FROM interview_session_relation sess_reln
        LEFT JOIN interview_module_relation ON sess_reln.interview_module_relation_id = interview_module_relation.id
        LEFT JOIN recruiter_user ON interview_module_relation.user_id = recruiter_user.user_id
        WHERE sess_reln.session_id = session_record.id
      );
    END IF;

    interview_modules := interview_modules||(select jsonb_agg(interview_module.*) from interview_module where  interview_module.id=session_record.module_id);

  END LOOP;

  IF meet_start_date IS NOT NULL THEN
    SELECT ARRAY(select 
      jsonb_build_object(
            'meeting_start_time', interview_meeting.start_time,
            'meeting_id', interview_meeting.id,
            'int_session_id', interview_session.id,
            'meeting_duration', interview_session.session_duration,
            'interv_user_id', interview_module_relation.user_id  
        )
     from 
      interview_module_relation
      right join interview_session_relation on interview_session_relation.interview_module_relation_id=interview_module_relation.id
      right join interview_session on interview_session.id = interview_session_relation.session_id
      left join interview_meeting on interview_meeting.id = interview_session.meeting_id
      where interview_module_relation.user_id = any(select interview_module_relation.user_id from 
      interview_module_relation
      right join interview_session_relation on interview_session_relation.interview_module_relation_id=interview_module_relation.id
      where interview_session_relation.session_id = any(session_ids) 
    ) and interview_session_relation.is_confirmed=true and interview_meeting.status in ('confirmed','completed')) INTO int_meetings;
  END IF ;

  SELECT INTO service_cred integr.service_json
      FROM recruiter r
      JOIN integrations integr ON integr.recruiter_id = r.id
      WHERE r.id = company_id; 
  
  SELECT scheduling_settings INTO comp_schedule_setting
  FROM recruiter
  WHERE id = company_id;


  -- Return the interview_sessions and interviewers arrays
  RETURN QUERY SELECT interview_sessions, interviewers, service_cred, interview_modules, comp_schedule_setting, coalesce(int_meetings,Array[]::jsonb[]);
END;$function$
;

CREATE OR REPLACE FUNCTION public.greenhouse_sync()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
BASE_URL text;
BEGIN
  SELECT value into BASE_URL from env where name = 'BASE_URL';
  PERFORM 
    net.http_post(
      url := BASE_URL||'/api/trpc/ats/greenhouse/fullSync',
      body := jsonb_build_object('recruiter_id', recruiter_id),
      headers := '{ "Content-Type": "application/json"}'
    )
  FROM integrations WHERE greenhouse_key IS NOT NULL;
END;$function$
;

CREATE OR REPLACE FUNCTION public.trigger_interview_meeting_status_to_waiting()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    ses_id uuid; -- Declare variable to hold session_id
BEGIN
    -- Fetch session_id based on meeting_id from the interview_session table
    SELECT id 
    INTO ses_id  
    FROM interview_session 
    WHERE meeting_id = NEW.id;

    -- Update the interview_session_relation table using the fetched session_id
    UPDATE interview_session_relation
    SET 
        accepted_status = 'waiting',
        training_type = CASE 
            WHEN training_type IN ('shadow', 'reverse_shadow') THEN NULL
            ELSE training_type
        END
    WHERE session_id = ses_id;

    -- Delete from interview_session_cancel for the updated session
    DELETE FROM interview_session_cancel 
    WHERE session_id = ses_id;

    -- Return the updated row (mandatory in an AFTER UPDATE trigger)
    RETURN NEW;
END;
$function$
;


