drop view if exists "public"."interview_types_view";

drop view if exists "public"."module_relations_view";

alter table "public"."interview_training_progress" add column "approved_user_id" uuid;

alter table "public"."interview_training_progress" add constraint "interview_training_progress_approved_user_id_fkey" FOREIGN KEY (approved_user_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_training_progress" validate constraint "interview_training_progress_approved_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.func_workflow_log_on_update_interview_module_relation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
BEGIN
    IF NEW.training_status::text = 'qualified' THEN
        FOR wa_record IN
            SELECT 
                wa.workflow_id AS workflow_id, 
                wa.id AS workflow_action_id, 
                w.interval AS interval_minutes, 
                w.phase AS phase, 
                w.trigger AS trigger, 
                json_build_object('interview_module_relation_id', NEW.id, 'email_type', c_e_t.type,'approver_id',NEW.training_approver) AS meta
            FROM interview_module i_m
            join workflow w on w.recruiter_id = i_m.recruiter_id
            JOIN workflow_action wa ON wa.workflow_id = w.id
            JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id           
            where i_m.id=NEW.module_id AND w.trigger::text ='onQualified' AND (
              c_e_t.type='onQualified_email_trainee' OR
              c_e_t.type='onQualified_slack_trainee' 
            )
        LOOP
            PERFORM create_new_workflow_action_log(
                wa_record.workflow_id, 
                wa_record.workflow_action_id, 
                wa_record.interval_minutes, 
                wa_record.phase::text, 
                wa_record.meta
            );
        END LOOP;    
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.func_workflow_log_on_update_interview_training_progress()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    required_shadow numeric;
    required_rshadow numeric;
    total_shadow numeric;
    total_rshadow numeric;
BEGIN

  select i_m_r.number_of_reverse_shadow as req_rshadow, i_m_r.number_of_shadow as req_shadow, m_r_v.shadow_confirmed_count, m_r_v.reverse_shadow_confirmed_count
  into   required_rshadow, required_shadow,total_shadow, total_rshadow
  from interview_session_relation 
  left join interview_module_relation i_m_r on i_m_r.id = interview_session_relation.interview_module_relation_id
  left join module_relations_view m_r_v on m_r_v.id = interview_session_relation.interview_module_relation_id
  where interview_session_relation.id=NEW.session_relation_id;


  IF NEW.is_attended = true AND required_shadow <=total_shadow and required_rshadow <= total_rshadow AND  THEN
      FOR wa_record IN    
          SELECT 
              wa.workflow_id AS workflow_id, 
              wa.id AS workflow_action_id, 
              w.interval AS interval_minutes, 
              w.phase AS phase, 
              w.trigger AS trigger, 
              json_build_object('session_relation_id', NEW.session_relation_id, 'email_type', c_e_t.type) AS meta
          FROM workflow w
          JOIN workflow_action wa ON wa.workflow_id = w.id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          where w.trigger::text ='onTrainingComplete' and (
            c_e_t.type='onTrainingComplete_email_approverForTraineeMeetingQualification' or 
            c_e_t.type='onTrainingComplete_slack_approverForTraineeMeetingQualification' 
          )
      LOOP
          PERFORM create_new_workflow_action_log(
              wa_record.workflow_id, 
              wa_record.workflow_action_id, 
              wa_record.interval_minutes, 
              wa_record.phase::text, 
              wa_record.meta
          );
      END LOOP;    
  END IF;
 RETURN NEW;
END;
$function$
;

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

create or replace view "public"."interview_types_view" as  SELECT intmod.id,
    intmod.name,
    intmod.department_id,
    intmod.created_by,
    intmod.is_archived,
    intmod.description,
    intmod.recruiter_id,
    departments.name AS department_name,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('user_id', ru.user_id, 'first_name', ru.first_name, 'last_name', ru.last_name, 'email', ru.email, 'profile_image', ru.profile_image, 'position', ru."position")) AS jsonb_agg
           FROM recruiter_user ru
          WHERE (ru.user_id IN ( SELECT intmodrel.user_id
                   FROM interview_module_relation intmodrel
                  WHERE ((intmodrel.module_id = intmod.id) AND (intmodrel.is_archived = false))))), '[]'::jsonb) AS users,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'confirmed'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS upcoming_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'completed'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS completed_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'cancelled'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS canceled_meeting_count
   FROM (interview_module intmod
     LEFT JOIN departments ON ((departments.id = intmod.department_id)))
  ORDER BY intmod.created_at DESC;


create or replace view "public"."module_relations_view" as  WITH interview_data AS (
         SELECT interview_module_relation.id,
            interview_module_relation.pause_json,
            interview_module_relation.training_status AS module_training_status,
            interview_module_relation.user_id,
            interview_module_relation.module_id,
            interview_module_relation.number_of_shadow,
            interview_module_relation.number_of_reverse_shadow,
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


CREATE OR REPLACE FUNCTION public.new_get_interview_schedule_by_meeting_id(target_meeting_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    schedule_data JSONB;
    cancel_data JSONB;
    result_data JSONB;
BEGIN
    BEGIN
        SELECT 
            jsonb_build_object(
                'interview_meeting', row_to_json(intmeet),
                'interview_session', row_to_json(intses),
                'schedule', row_to_json(insc),
                'candidates', (
                    SELECT json_build_object(
                        'id', cand.id,
                        'email', cand.email,
                        'first_name' , cand.first_name,
                        'last_name' , cand.last_name,
                        'timezone' , cand.timezone
                    )
                    ),
                'interview_module', row_to_json(intmod),
                'job', (
                    SELECT json_build_object(
                        'id', pj.id,
                        'created_at', pj.created_at, 
                        'job_title', pj.job_title, 
                        'description', pj.description 
                    ) 
                ),
                'users', COALESCE((
                    SELECT jsonb_agg(
                         CASE WHEN intses.session_type = 'debrief' THEN
                            jsonb_build_object(
                            'id', debuser.user_id,
                            'first_name', debuser.first_name,
                            'last_name', debuser.last_name,
                            'email', debuser.email,
                            'profile_image', debuser.profile_image,
                            'position', debuser.position,
                            'department', '',
                            'interview_session_relation', row_to_json(isr),
                            'location', '',
                            'scheduling_settings', debuser.scheduling_settings,
                            'weekly_meetings', (
                                SELECT json_agg(json_build_object(
                                    'start_time', im2.start_time,
                                    'end_time', im2.end_time
                                )) 
                                FROM interview_session_relation intsr2
                                JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                                JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                                JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                                JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                                WHERE recuser2.user_id = debuser.user_id
                                AND intsr2.is_confirmed = true
                                AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
                                AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
                            )
                        )::jsonb
                            ELSE
                            jsonb_build_object(
                            'id', ru.user_id,
                            'first_name', ru.first_name,
                            'last_name', ru.last_name,
                            'email', ru.email,
                            'profile_image', ru.profile_image,
                            'position', ru.position,
                            'department', '',
                            'interview_session_relation', row_to_json(isr),
                            'location', '',
                            'scheduling_settings', ru.scheduling_settings,
                            'weekly_meetings', (
                                SELECT json_agg(json_build_object(
                                    'start_time', im2.start_time,
                                    'end_time', im2.end_time
                                )) 
                                FROM interview_session_relation intsr2
                                JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                                JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                                JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                                JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                                WHERE recuser2.user_id = ru.user_id
                                AND intsr2.is_confirmed = true
                                AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
                                AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
                            )
                        )::jsonb
                            END

                       
                    )
                    FROM interview_session_relation isr
                    LEFT JOIN interview_module_relation inm ON inm.id = isr.interview_module_relation_id
                    LEFT JOIN recruiter_user ru ON ru.user_id = inm.user_id
                    LEFT JOIN recruiter_user debuser ON debuser.user_id = isr.user_id
                    WHERE isr.session_id = intses.id
                ), '[]'::jsonb),
                'hiring_manager', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.hiring_manager
                ),
                'interview_coordinator', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.interview_coordinator
                ),
                'recruiter', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.recruiter
                ),
                'recruiting_coordinator', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.recruiting_coordinator
                ),
                'sourcer', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.sourcer
                ),
                 'organizer', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=intmeet.organizer_id
                )
            )
        INTO schedule_data
        FROM interview_meeting intmeet
        LEFT JOIN interview_session intses ON intses.meeting_id = intmeet.id 
        LEFT JOIN interview_module intmod ON intmod.id = intses.module_id
        LEFT JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id  
        LEFT JOIN applications app ON insc.application_id = app.id
        LEFT JOIN candidates cand ON app.candidate_id = cand.id 
        LEFT JOIN candidate_files cf ON cf.id = app.candidate_file_id  
        LEFT JOIN public_jobs pj ON pj.id = app.job_id
        WHERE intmeet.id = target_meeting_id
        GROUP BY intmeet.id, intses.id, intmod.id, insc.id, app.id, cand.id, cf.id, pj.id;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                schedule_data := NULL;
    END;

    BEGIN
        SELECT jsonb_agg( 
            jsonb_build_object(
                'interview_session_cancel', row_to_json(intsescan),
                'interview_session_relation', row_to_json(intsesrel),
                'recruiter_user',(
                     CASE WHEN intsescan.session_relation_id is NULL THEN
                    json_build_object(
                        'id', canceluser.user_id,
                        'first_name', canceluser.first_name,
                        'last_name', canceluser.last_name,
                        'email', canceluser.email,
                        'profile_image', canceluser.profile_image,
                        'position', canceluser.position
                    )
                    ELSE  json_build_object(
                        'id', recuser.user_id,
                        'first_name', recuser.first_name,
                        'last_name', recuser.last_name,
                        'email', recuser.email,
                        'profile_image', recuser.profile_image,
                        'position', recuser.position
                    )
                    END
                    ), 
                'candidate', row_to_json(cand)
                    ))
        INTO cancel_data
        FROM interview_session_cancel intsescan
        LEFT JOIN interview_session intses ON intses.id = intsescan.session_id 
        LEFT JOIN interview_meeting intmeet ON intmeet.id = intses.meeting_id
        LEFT JOIN interview_session_relation intsesrel ON intsesrel.id = intsescan.session_relation_id
        LEFT JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
        LEFT JOIN recruiter_user recuser ON recuser.user_id = intmodrel.user_id
        LEFT JOIN recruiter_user canceluser ON canceluser.user_id = intsescan.cancel_user_id
        LEFT JOIN interview_schedule intsch ON intsch.id = intsescan.schedule_id
        LEFT JOIN applications app ON app.id = intsch.application_id
        LEFT JOIN candidates cand ON cand.id = app.candidate_id
        WHERE intmeet.id = target_meeting_id;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                cancel_data := NULL;
    END;

    result_data := jsonb_build_object(
        'schedule_data', schedule_data,
        'cancel_data', cancel_data
    );

    RETURN result_data;
    
     -- Ensure correct grouping
END;
$function$
;

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

CREATE OR REPLACE FUNCTION public.workflow_action_log_cron()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    url_x text;
    headers_x jsonb;
    wa_record record;
BEGIN
    SELECT decrypted_secret 
    INTO  url_x
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    
    url_x := concat(url_x,'/api/workflow-cron' );

    headers_x := '{"Content-Type": "application/json"}'::jsonb;

    FOR wa_record IN
        SELECT json_build_object('id', w_a_l.id,'workflow_id', w_a_l.workflow_id, 'workflow_action_id', w_a_l.workflow_action_id, 'meta', w_a_l.meta, 'payload', w_a.payload, 'execution_time', w_a_l.execute_at ) AS body,
               w_a_l.id AS id,
               w_a_l.tries AS tries
        FROM workflow_action_logs w_a_l
        JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
        WHERE (w_a_l.status = 'not started' AND w_a_l.execute_at < CURRENT_TIMESTAMP + INTERVAL '1 minute')
           OR (w_a_l.status = 'failed' AND w_a_l.tries <= 3 AND w_a_l.started_at > CURRENT_TIMESTAMP - INTERVAL '6 minutes')
    LOOP
        PERFORM net.http_post(
            url := url_x,
            headers := headers_x,
            body := wa_record.body::jsonb
        );

        UPDATE workflow_action_logs
        SET status = 'processing', tries = wa_record.tries + 1, started_at = NOW()
        WHERE id = wa_record.id;
    END LOOP;

    RETURN true;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_meeting()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    if NEW.status::text = 'confirmed' then
      FOR wa_record IN
          SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase,w.trigger as trigger, json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', NEW.id, 'start_time', NEW.start_time, 'candidate_id', a.candidate_id, 'email_type', c_e_t.type, 'recruiter_user_id', NEW.organizer_id, 'session_id', (select i_m_s.id from interview_session i_m_s where i_m_s.meeting_id = NEW.id)) as meta
          FROM 
          interview_schedule i_s 
          JOIN applications a ON i_s.application_id = a.id
          JOIN workflow_job_relation war ON war.job_id = a.job_id
          JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          JOIN workflow w ON war.workflow_id = w.id
          WHERE i_s.id = NEW.interview_schedule_id AND (
            (w.trigger::text = 'interviewStart' AND (c_e_t.type = 'interviewStart_email_applicant' OR c_e_t.type = 'interviewStart_email_organizer')) 
            OR w.trigger::text = 'candidateBook'
            OR w.trigger::text ='interviewEnd' AND (
              c_e_t.type = 'interviewEnd_slack_organizerForMeetingStatus'  OR 
              c_e_t.type = 'interviewEnd_email_organizerForMeetingStatus' OR 
              c_e_t.type = 'interviewEnd_email_shadowTraineeForMeetingAttendence' OR 
              c_e_t.type = 'interviewEnd_email_rShadowTraineeForMeetingAttendence' OR 
              c_e_t.type = 'interviewEnd_slack_rShadowTraineeForMeetingAttendence' OR
              c_e_t.type = 'interviewEnd_slack_shadowTraineeForMeetingAttendence'
              )
            )
      LOOP
          IF wa_record.trigger::text='interviewEnd' THEN PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, NEW.end_time);
          ELSE PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, NEW.start_time);
          END IF;
      END LOOP;
    END if;
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


