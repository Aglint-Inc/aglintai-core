drop view if exists "public"."module_relations_view";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_interviewers(rec_id uuid)
 RETURNS TABLE(rec_user jsonb, qualified_module_names text[], training_module_names text[], upcoming_meeting_count integer, completed_meeting_count integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
     SELECT
        json_build_object(
            'user_id', ru.user_id,
            'first_name', ru.first_name,
            'last_name', ru.last_name,
            'email', ru.email,
            'profile_image', ru.profile_image,
            'position', ru.position,
            'schedule_auth', ru.schedule_auth
        )::JSONB as rec_user,
        array_agg(DISTINCT CASE WHEN intmodrel.training_status = 'qualified' THEN intmod.name ELSE NULL END)::TEXT[] as qualified_module_names,
        array_agg(DISTINCT CASE WHEN intmodrel.training_status = 'training' THEN intmod.name ELSE NULL END)::TEXT[] as training_module_names,
        (SELECT COUNT(*) FROM interview_session_relation intsesrel
         JOIN interview_session intses ON intses.id=intsesrel.session_id 
         JOIN interview_meeting intm ON intm.id=intses.meeting_id 
         JOIN interview_module_relation intmodrel ON intmodrel.id=intsesrel.interview_module_relation_id 
         WHERE intmodrel.user_id= recrel.user_id AND intm.status='confirmed' AND intsesrel.is_confirmed=true)::integer AS upcoming_meeting_count,
        (SELECT COUNT(*) FROM interview_session_relation intsesrel
         JOIN interview_session intses ON intses.id=intsesrel.session_id 
         JOIN interview_meeting intm ON intm.id=intses.meeting_id 
         JOIN interview_module_relation intmodrel ON intmodrel.id=intsesrel.interview_module_relation_id 
         WHERE intmodrel.user_id= recrel.user_id AND intm.status='completed' AND intsesrel.is_confirmed=true)::integer AS completed_meeting_count
    FROM recruiter_relation recrel
    JOIN recruiter_user ru ON ru.user_id = recrel.user_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.user_id = ru.user_id 
    LEFT JOIN interview_module intmod ON intmod.id = intmodrel.module_id
    WHERE ru.status = 'active' AND recrel.recruiter_id = rec_id
    GROUP BY recrel.id, ru.user_id;  -- Ensure correct grouping
END;
$function$
;

create or replace view "public"."interview_data_view" as  SELECT row_to_json(ja.*) AS applications,
    json_build_object('id', cand.id, 'first_name', cand.first_name, 'last_name', cand.last_name, 'current_job_title', cand.current_job_title, 'timezone', cand.timezone, 'phone', cand.phone, 'email', cand.email) AS candidates,
    json_build_object('id', pj.id, 'job_title', pj.job_title, 'department_id', pj.department_id, 'recruiting_coordinator', pj.recruiting_coordinator) AS public_jobs,
    row_to_json(insc.*) AS schedule,
    ( SELECT jsonb_agg(interview_sessions.interview_session_meeting) AS jsonb_agg
           FROM ( SELECT
                        CASE
                            WHEN (insc.id IS NULL) THEN jsonb_build_object('interview_session', row_to_json(intses.*), 'interview_meeting', NULL::unknown)
                            ELSE jsonb_build_object('interview_session', row_to_json(intses.*), 'interview_meeting', row_to_json(intmeet.*))
                        END AS interview_session_meeting
                   FROM ((interview_session intses
                     LEFT JOIN interview_meeting intmeet ON ((intmeet.id = intses.meeting_id)))
                     LEFT JOIN interview_schedule intsch ON ((intsch.id = intmeet.interview_schedule_id)))
                  WHERE (((insc.id IS NULL) AND (intses.interview_plan_id = intplan.id)) OR ((insc.id IS NOT NULL) AND (insc.id = intsch.id)))
                  ORDER BY intses.session_order) interview_sessions) AS interview_session_meetings,
    ( SELECT application_logs.created_at
           FROM application_logs
          WHERE (application_logs.application_id = ja.id)
          ORDER BY application_logs.created_at DESC
         LIMIT 1) AS last_log_time,
    pj.recruiter_id,
    (((((cand.first_name)::text || ' '::text) || (cand.last_name)::text) || ' '::text) || cand.current_job_title) AS search_query
   FROM ((((applications ja
     JOIN candidates cand ON ((ja.candidate_id = cand.id)))
     LEFT JOIN public_jobs pj ON ((pj.id = ja.job_id)))
     LEFT JOIN interview_plan intplan ON ((intplan.job_id = ja.job_id)))
     LEFT JOIN interview_schedule insc ON ((insc.application_id = ja.id)))
  WHERE ((ja.status = 'interview'::application_status) OR (insc.id IS NOT NULL));


create or replace view "public"."module_relations_view" as  WITH interview_data AS (
         SELECT interview_module_relation.id,
            interview_module_relation.pause_json,
            interview_module_relation.training_status AS module_training_status,
            interview_module_relation.user_id,
            interview_module_relation.module_id,
            interview_module_relation.number_of_shadow,
            interview_module_relation.number_of_reverse_shadow,
            interview_module_relation.is_archived,
            recruiter_user.first_name,
            recruiter_user."position",
            recruiter_user.profile_image,
            recruiter_user.scheduling_settings,
            recruiter_user.phone,
            interview_module.name AS module_name,
            interview_module.description AS module_description,
            ( SELECT json_agg(json_build_object('interview_session', row_to_json(interview_session.*), 'interview_meeting', row_to_json(interview_meeting.*), 'interview_session_relation', row_to_json(interview_session_relation.*))) AS json_agg
                   FROM (((interview_session_relation
                     LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
                     LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
                     LEFT JOIN interview_module interview_module_1 ON ((interview_module_1.id = interview_session.module_id)))
                  WHERE ((interview_session_relation.interview_module_relation_id = interview_module_relation.id) AND ((interview_meeting.status = 'completed'::interview_schedule_status) OR (interview_meeting.status = 'confirmed'::interview_schedule_status)) AND (interview_session_relation.is_confirmed = true))) AS meetings
           FROM ((interview_module_relation
             LEFT JOIN interview_module ON ((interview_module.id = interview_module_relation.module_id)))
             LEFT JOIN recruiter_user ON ((interview_module_relation.user_id = recruiter_user.user_id)))
        )
 SELECT interview_data.id,
    interview_data.pause_json,
    interview_data.module_training_status,
    interview_data.user_id,
    interview_data.module_id,
    interview_data.number_of_shadow,
    interview_data.number_of_reverse_shadow,
    interview_data.first_name,
    interview_data."position",
    interview_data.profile_image,
    interview_data.scheduling_settings,
    interview_data.phone,
    interview_data.meetings,
    interview_data.module_name,
    interview_data.module_description,
    interview_data.is_archived,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS completed_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS cancelled_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS confirmed_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_completed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_completed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'confirmed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_confirmed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'confirmed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_confirmed_count
   FROM interview_data;


CREATE OR REPLACE FUNCTION public.transfer_user_responsibilities(suspended_user uuid, task_owner uuid DEFAULT NULL::uuid, hiring_manager uuid DEFAULT NULL::uuid, recruiter uuid DEFAULT NULL::uuid, recruiting_coordinator uuid DEFAULT NULL::uuid, sourcer uuid DEFAULT NULL::uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  IF(transfer_user_responsibilities.hiring_manager IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      hiring_manager = transfer_user_responsibilities.hiring_manager
    WHERE 
      public_jobs.hiring_manager = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.recruiter IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      recruiter = transfer_user_responsibilities.recruiter
    WHERE 
      public_jobs.recruiter = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.recruiting_coordinator IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      recruiting_coordinator = transfer_user_responsibilities.recruiting_coordinator
    WHERE 
      public_jobs.recruiting_coordinator = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.sourcer IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      sourcer = transfer_user_responsibilities.sourcer
    WHERE 
      public_jobs.sourcer = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.task_owner IS NOT NULL) THEN
    UPDATE
      new_tasks
    SET
      assignee = new_assignees.assignee
    FROM
      (
        SELECT
          id,
          ARRAY(SELECT DISTINCT UNNEST(ARRAY_REPLACE(assignee, transfer_user_responsibilities.suspended_user, transfer_user_responsibilities.task_owner))) as assignee
        FROM
          new_tasks
        WHERE
          transfer_user_responsibilities.suspended_user = ANY(assignee)
      ) AS new_assignees
    WHERE
      new_tasks.id = new_assignees.id;
  END IF;
  UPDATE
    recruiter_user
  SET
    status = 'suspended'
  WHERE
    recruiter_user.user_id = transfer_user_responsibilities.suspended_user;
  RETURN;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_disqualification()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE interview_meeting
  SET status = 'cancelled'
  WHERE id IN (
    SELECT interview_meeting.id
    FROM interview_meeting 
    INNER JOIN interview_schedule ON interview_schedule.id = interview_meeting.interview_schedule_id
    WHERE interview_schedule.application_id = NEW.id
      AND interview_meeting.status NOT IN ('cancelled', 'completed', 'not_scheduled')
  );

  UPDATE new_tasks
  SET status = 'cancelled'
  WHERE application_id = NEW.id
    AND status NOT IN ('cancelled', 'closed', 'completed');

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  score numeric;
BEGIN
  SELECT INTO score 
    score_application(applications.score_json -> 'scores', public_jobs.parameter_weights)
  FROM
    applications
  INNER JOIN
    public_jobs ON
      public_jobs.id = applications.job_id
  WHERE
    applications.id = NEW.id;
  IF score IS NOT NULL AND score >= 0 THEN
    INSERT INTO 
      application_logs (application_id, logged_by, module, title)
    VALUES
      (
        NEW.id,
        'system',
        'jobs',
        'Application was scored ' || score || '% by AglintAI'
      );
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log2()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  WITH scores AS (
    SELECT
      applications.id as application_id,
      score_application(applications.score_json -> 'scores', NEW.parameter_weights) as new_score,
      score_application(applications.score_json -> 'scores', OLD.parameter_weights) as old_score
    FROM
      applications
    WHERE
      applications.job_id = NEW.id
  )
  INSERT INTO 
    application_logs (application_id, logged_by, module, title)
  SELECT
    scores.application_id,
    'system',
    'jobs',
    'Application was scored ' || scores.new_score || '% due to updated score weights'
  FROM
    scores
  WHERE
    scores.new_score <> scores.old_score AND
    scores.new_score IS NOT NULL AND
    scores.new_score >= 0;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_module_relation_archive()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  DELETE FROM 
    interview_session_relation
  USING (
    SELECT
    interview_session_relation.id
  FROM
    interview_session_relation
  LEFT JOIN
    interview_session ON
      interview_session_relation.session_id = interview_session.id
  LEFT JOIN
    interview_meeting ON
      interview_meeting.id = interview_session.meeting_id
  WHERE
    interview_session_relation.interview_module_relation_id = NEW.id AND
    (
      interview_session.interview_plan_id IS NOT NULL OR
      interview_meeting.status = 'not_scheduled' OR
      interview_meeting.status = 'cancelled'
    )
  ) AS session_relations
  WHERE
    interview_session_relation.id = session_relations.id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_recruiter_user_suspension()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE 
    interview_module_relation
  SET 
    is_archived = true
  WHERE 
    interview_module_relation.user_id = NEW.user_id;
  DELETE FROM 
    interview_session_relation
  WHERE
    interview_session_relation.user_id = NEW.user_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_session_relation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    IF NEW.is_confirmed THEN
        FOR wa_record IN
            SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase, i_m.start_time as start_time, w.trigger as trigger, i_m_s.session_duration as session_duration,
            json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', i_m.id, 'start_time', i_m.start_time, 'recruiter_user_id', m_i.user_id, 'email_type', c_e_t.type, 'session_id', NEW.session_id) as meta
            FROM 
            meeting_interviewers m_i 
            JOIN interview_session i_m_s ON i_m_s.id =  m_i.session_id
            JOIN interview_meeting i_m ON i_m.id = i_m_s.meeting_id
            JOIN interview_schedule i_s ON i_s.id = i_m.interview_schedule_id
            JOIN applications a ON i_s.application_id = a.id
            JOIN workflow_job_relation war ON war.job_id = a.job_id
            JOIN workflow w ON war.workflow_id = w.id
            JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
            WHERE m_i.session_relation_id = NEW.id 
            AND c_e_t.type <> 'interviewStart_email_applicant' AND 
                c_e_t.type <> 'interviewStart_email_organizer' and 
                (w.trigger::text = 'interviewStart' or w.trigger::text = 'interviewerConfirmation' or w.trigger::text = 'interviewEnd' and (c_e_t.type='interviewEnd_email_interviewerForFeedback' or c_e_t.type='interviewEnd_slack_interviewerForFeedback'  ))
        LOOP
            IF wa_record.trigger = 'interviewEnd' THEN
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, wa_record.start_time + (wa_record.session_duration * INTERVAL '1 minute'));
            ELSIF wa_record.trigger = 'interviewStart' THEN
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, wa_record.start_time);
            ELSE
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta , now());
            END IF;
        END LOOP;
    END IF;
  RETURN NEW;
END;
$function$
;


